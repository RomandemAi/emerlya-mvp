'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { stripe } from '../lib/stripe';
import { createClient } from '../lib/supabase/actions';

export async function createBrand(formData: FormData) {
  const supabase = await createClient();

  // Get the current user's session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error('You must be logged in to create a brand');
  }

  // Extract form data
  const brandName = formData.get('brand_name') as string;
  const personaConfigJson = formData.get('persona_config_json') as string;
  const documents = formData.get('documents') as string;

  if (!brandName || !personaConfigJson || !documents) {
    throw new Error('All fields are required');
  }

  // Validate JSON format
  let parsedPersonaConfig;
  try {
    parsedPersonaConfig = JSON.parse(personaConfigJson);
  } catch {
    throw new Error('Persona configuration must be valid JSON');
  }

  try {
    // First, ensure the user has a profile record
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', session.user.id)
      .single();

    if (!existingProfile) {
      // Create profile if it doesn't exist
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: session.user.id,
          subscription_status: null,
          stripe_customer_id: null,
        });

      if (profileError) {
        throw new Error('Failed to create user profile');
      }
    }

    // Insert the new brand into the brands table
    const { data: brandData, error: brandError } = await supabase
      .from('brands')
      .insert({
        profile_id: session.user.id,
        name: brandName,
        persona_config_json: parsedPersonaConfig,
      })
      .select('id')
      .single();

    if (brandError || !brandData) {
      throw new Error('Failed to create brand');
    }

    // Insert the documents into the documents table
    const { error: documentError } = await supabase
      .from('documents')
      .insert({
        brand_id: brandData.id,
        content: documents,
        status: 'pending',
      });

    if (documentError) {
      throw new Error('Failed to save documents');
    }

    // Revalidate the dashboard to show the new brand
    revalidatePath('/');

  } catch (error) {
    console.error('Error creating brand:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create brand');
  }
}

export async function createStripePortalSession() {
  const supabase = await createClient();

  // Get the current user's session (same pattern as createBrand)
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return redirect('/login');
  }

  const user = session.user;

  // First, ensure the user has a profile record
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single();

  if (!existingProfile) {
    // Create profile if it doesn't exist
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        subscription_status: null,
        stripe_customer_id: null,
      });

    if (profileError) {
      throw new Error('Failed to create user profile');
    }
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    throw new Error('User profile not found.');
  }

  let customerId = profile.stripe_customer_id;
  if (!customerId) {
    // Create a new customer in Stripe
    const customer = await stripe.customers.create({ email: user.email });
    customerId = customer.id;
    // Save the new customer ID in our database
    await supabase
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', user.id);
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
  });

  return portalSession.url;
}

export async function createCheckoutSession() {
  try {
    console.log('Starting checkout session creation...');
    
    const supabase = await createClient();

    // Get the current user's session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Session error:', sessionError);
      throw new Error('Failed to get user session');
    }

    if (!session) {
      console.error('No active session found');
      throw new Error('You must be logged in to upgrade');
    }

    const user = session.user;
    console.log('Creating checkout for user:', user.email);

    // First, ensure the user has a profile record
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!existingProfile) {
      console.log('Creating new user profile...');
      // Create profile if it doesn't exist
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          subscription_status: null,
          stripe_customer_id: null,
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw new Error('Failed to create user profile');
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
      throw new Error('Failed to fetch user profile');
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
          throw new Error('Failed to save customer information');
        }
      } catch (stripeError) {
        console.error('Stripe customer creation error:', stripeError);
        throw new Error('Failed to create Stripe customer');
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
      return checkoutSession.id;

    } catch (stripeError) {
      console.error('Stripe checkout creation error:', stripeError);
      throw new Error('Failed to create checkout session');
    }

  } catch (error) {
    console.error('=== CHECKOUT SESSION ERROR ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : error);
    console.error('Full error:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Check if it's a Stripe error
    if (error && typeof error === 'object' && 'type' in error) {
      console.error('Stripe error type:', error.type);
      if ('code' in error) {
        console.error('Stripe error code:', error.code);
      }
    }
    
    // Re-throw with a user-friendly message
    let message = 'Failed to create checkout session';
    
    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('Invalid price')) {
        message = 'Invalid pricing configuration. Please contact support.';
      } else if (error.message.includes('No such price')) {
        message = 'Pricing not found. Please contact support.';
      } else if (error.message.includes('Customer')) {
        message = 'Customer account error. Please try again.';
      } else if (error.message.includes('rate_limit')) {
        message = 'Too many requests. Please wait a moment and try again.';
      } else {
        message = `Checkout error: ${error.message}`;
      }
    }
    
    throw new Error(message);
  }
}
