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

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/login');
  }

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
