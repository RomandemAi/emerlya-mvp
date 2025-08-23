import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';
import { createClient } from '../../../lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== CHECKOUT API ROUTE START ===');
    console.log('Environment:', process.env.NODE_ENV);
    
    // Parse request body to get plan information
    const body = await request.json().catch(() => ({}));
    const { planName, priceId } = body;
    console.log('Plan requested:', planName, 'Price ID:', priceId);
    
    // Get cookies from request headers
    const cookieHeader = request.headers.get('cookie');
    console.log('Cookie header present:', !!cookieHeader);
    
    const supabase = await createClient();

    // CRITICAL: First refresh the session from cookies (required for Netlify serverless)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Session refresh error:', sessionError);
      return NextResponse.json(
        { error: 'Session refresh failed', requiresAuth: true },
        { status: 401 }
      );
    }

    if (!session) {
      console.error('No session found in cookies');
      return NextResponse.json(
        { error: 'No active session', requiresAuth: true },
        { status: 401 }
      );
    }

    // Now get the user from the refreshed session
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error('Auth error in checkout:', authError);
      return NextResponse.json(
        { error: 'Authentication error', requiresAuth: true },
        { status: 401 }
      );
    }

    if (!user) {
      console.error('No authenticated user found during checkout');
      return NextResponse.json(
        { error: 'You must be logged in to upgrade', requiresAuth: true },
        { status: 401 }
      );
    }

    console.log('Creating checkout for user:', user.email);

    // Ensure the user has a profile record
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!existingProfile) {
      console.log('Creating profile for user:', user.id);
      const { error: createError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          subscription_status: 'inactive',
        });

      if (createError) {
        console.error('Profile creation error:', createError);
        return NextResponse.json(
          { error: 'Failed to create user profile' },
          { status: 500 }
        );
      }
    }

    // Get or create Stripe customer
    const { data: profile, error: profileFetchError } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (profileFetchError) {
      console.error('Profile fetch error:', profileFetchError);
      return NextResponse.json(
        { error: 'Failed to fetch user profile' },
        { status: 500 }
      );
    }

    let customerId = profile?.stripe_customer_id;
    
    if (!customerId) {
      console.log('Creating new Stripe customer...');
      try {
        // Create a new customer in Stripe
        const customer = await stripe.customers.create({ 
          email: user.email,
          metadata: {
            supabase_user_id: user.id
          }
        });
        customerId = customer.id;
        console.log('Created Stripe customer:', customerId);
        
        // Save the new customer ID in our database
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ stripe_customer_id: customerId })
          .eq('id', user.id);

        if (updateError) {
          console.error('Customer ID update error:', updateError);
          return NextResponse.json(
            { error: 'Failed to save customer information' },
            { status: 500 }
          );
        }
      } catch (stripeError) {
        console.error('Stripe customer creation error:', stripeError);
        return NextResponse.json(
          { error: 'Failed to create Stripe customer' },
          { status: 500 }
        );
      }
    }

    console.log('Creating Stripe checkout session...');
    
    // Determine which price ID to use based on plan
    // For now, we'll use the same price ID for all paid plans
    // TODO: Set up different price IDs in Stripe for different plans
    let finalPriceId = priceId || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
    
    // Plan mapping (when we have multiple price IDs)
    const priceMapping: Record<string, string> = {
      'Essentials': process.env.NEXT_PUBLIC_STRIPE_ESSENTIALS_PRICE_ID || finalPriceId || '',
      'Professional': process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID || finalPriceId || '',
      'Business': process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID || finalPriceId || '',
    };
    
    // Use plan-specific price ID if available
    if (planName && priceMapping[planName]) {
      finalPriceId = priceMapping[planName];
    }
    
    console.log('Using Price ID:', finalPriceId);
    console.log('Price ID starts with:', finalPriceId?.substring(0, 10));
    console.log('Full environment check:');
    console.log('- Stripe Secret Key starts with:', process.env.STRIPE_SECRET_KEY?.substring(0, 10));
    console.log('- Publishable Key starts with:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 10));
    console.log('- Site URL:', process.env.NEXT_PUBLIC_SITE_URL);

    if (!finalPriceId) {
      console.error('CRITICAL: Price ID is undefined!');
      return NextResponse.json(
        { error: 'Price ID not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Create Stripe Checkout Session
    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        client_reference_id: user.id,
        line_items: [
          {
            price: finalPriceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?canceled=true`,
        metadata: {
          supabase_user_id: user.id
        }
      });

      console.log('Checkout session created successfully:', checkoutSession.id);
      console.log('=== CHECKOUT API ROUTE SUCCESS ===');
      
      return NextResponse.json({ 
        sessionId: checkoutSession.id,
        error: null 
      });

    } catch (stripeError: unknown) {
      console.error('Stripe checkout creation error:', stripeError);
      
      // Check for specific Stripe errors
      let errorMessage = 'Failed to create checkout session';
      
      const errorMsg = stripeError instanceof Error ? stripeError.message : 
                       typeof stripeError === 'object' && stripeError !== null && 'message' in stripeError 
                       ? String((stripeError as {message: unknown}).message) : '';
      
      if (errorMsg.includes('Invalid price')) {
        errorMessage = 'Invalid pricing configuration. Please contact support.';
      } else if (errorMsg.includes('No such price')) {
        errorMessage = 'Pricing not found. Please contact support.';
      } else if (errorMsg.includes('Customer')) {
        errorMessage = 'Customer account error. Please try again.';
      } else if (errorMsg.includes('rate_limit')) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (errorMsg) {
        errorMessage = `Checkout error: ${errorMsg}`;
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

  } catch (error: unknown) {
    console.error('=== CHECKOUT API ROUTE ERROR ===');
    console.error('Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
