import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';
import { createClient } from '../../../lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== CHECKOUT API ROUTE START ===');
    console.log('Environment:', process.env.NODE_ENV);
    
    // Get cookies from request headers
    const cookieHeader = request.headers.get('cookie');
    console.log('Cookie header present:', !!cookieHeader);
    
    const supabase = await createClient();

    // Get the current user
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
          email: user.email,
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

    // Create Stripe Checkout Session
    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        client_reference_id: user.id,
        line_items: [
          {
            price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?canceled=true`,
      });

      console.log('Checkout session created successfully:', checkoutSession.id);
      console.log('=== CHECKOUT API ROUTE SUCCESS ===');
      
      return NextResponse.json({ 
        sessionId: checkoutSession.id,
        error: null 
      });

    } catch (stripeError: any) {
      console.error('Stripe checkout creation error:', stripeError);
      
      // Check for specific Stripe errors
      let errorMessage = 'Failed to create checkout session';
      
      if (stripeError?.message?.includes('Invalid price')) {
        errorMessage = 'Invalid pricing configuration. Please contact support.';
      } else if (stripeError?.message?.includes('No such price')) {
        errorMessage = 'Pricing not found. Please contact support.';
      } else if (stripeError?.message?.includes('Customer')) {
        errorMessage = 'Customer account error. Please try again.';
      } else if (stripeError?.message?.includes('rate_limit')) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (stripeError?.message) {
        errorMessage = `Checkout error: ${stripeError.message}`;
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('=== CHECKOUT API ROUTE ERROR ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { error: error?.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
