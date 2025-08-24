'use server';

import { revalidatePath } from 'next/cache';
import { stripe } from '../lib/stripe';
import { createClient } from '../lib/supabase/actions';
import { getAuthenticatedUser, ensureUserProfile } from '../lib/supabase/auth';

export async function createBrand(formData: FormData) {
  const supabase = await createClient();

  // Get the current user using safe auth check
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error('You must be logged in to create a brand');
  }

  // Extract form data
  const brandName = formData.get('brand_name') as string;
  const tone = formData.get('tone') as string;
  const style = formData.get('style') as string;
  const targetAudience = formData.get('target_audience') as string;
  const wordsToAvoid = formData.get('words_to_avoid') as string;
  const documents = formData.get('documents') as string;

  // Extract content-specific preferences
  const socialStyle = formData.get('social_style') as string;
  const socialLength = formData.get('social_length') as string;
  const blogStyle = formData.get('blog_style') as string;
  const blogStructure = formData.get('blog_structure') as string;
  const emailStyle = formData.get('email_style') as string;
  const emailGreeting = formData.get('email_greeting') as string;
  const twitterStyle = formData.get('twitter_style') as string;
  const instagramStyle = formData.get('instagram_style') as string;
  const ctaStyle = formData.get('cta_style') as string;
  const industryTerms = formData.get('industry_terms') as string;

  if (!brandName || !tone || !style || !targetAudience || !documents) {
    throw new Error('All required fields must be filled');
  }

  // Create enhanced persona configuration object with content-specific preferences
  const personaConfig = {
    // Base brand settings
    tone,
    style,
    target_audience: targetAudience,
    words_to_avoid: wordsToAvoid || '',
    
    // Content-specific preferences
    content_preferences: {
      social_media: {
        style: socialStyle || '',
        length: socialLength || 'medium'
      },
      blog_posts: {
        style: blogStyle || '',
        structure: blogStructure || ''
      },
      emails: {
        style: emailStyle || '',
        greeting: emailGreeting || ''
      },
      platforms: {
        twitter: twitterStyle || '',
        instagram: instagramStyle || ''
      },
      cta_style: ctaStyle || '',
      industry_terms: industryTerms || ''
    }
  };

  try {
    // Ensure the user has a profile record
    await ensureUserProfile(user.id);

    // Insert the new brand into the brands table
    const { data: brandData, error: brandError } = await supabase
      .from('brands')
      .insert({
        profile_id: user.id,
        name: brandName,
        persona_config_json: personaConfig,
      })
      .select('id')
      .single();

    if (brandError || !brandData) {
      console.error('Brand creation error:', brandError);
      throw new Error(`Failed to create brand: ${brandError?.message || 'Unknown error'}`);
    }

    // Insert the documents into the documents table
    const { data: documentData, error: documentError } = await supabase
      .from('documents')
      .insert({
        brand_id: brandData.id,
        content: documents,
        status: 'pending',
      })
      .select('id')
      .single();

    if (documentError || !documentData) {
      console.error('Document save error:', documentError);
      throw new Error(`Failed to save documents: ${documentError?.message || 'Unknown error'}`);
    }

    // Trigger document processing webhook
    console.log('Triggering document processing for document:', documentData.id);
    
    try {
      const webhookUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/process-document`;
      const webhookSecret = process.env.WEBHOOK_SECRET || 'default-secret';
      
      // Add timeout to webhook request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-secret': webhookSecret,
        },
        body: JSON.stringify({
          documentId: documentData.id,
          brandId: brandData.id,
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Document processing webhook failed:', errorText);
        // Don't throw here - document is saved, processing can be retried later
        console.warn('Document saved but processing failed. It can be processed later.');
      } else {
        console.log('Document processing triggered successfully');
      }
    } catch (webhookError) {
      console.error('Failed to trigger document processing:', webhookError);
      // Don't throw here - document is saved, processing can be retried later
      console.warn('Document saved but processing failed. It can be processed later.');
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

  // Get the current user using safe auth check
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error('You must be logged in to manage billing');
  }

  // Ensure the user has a profile record
  await ensureUserProfile(user.id);

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

export async function updateBrand(formData: FormData) {
  const supabase = await createClient();

  // Get the current user using safe auth check
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error('You must be logged in to update a brand');
  }

  // Extract form data
  const brandId = formData.get('brand_id') as string;
  const brandName = formData.get('brand_name') as string;
  const tone = formData.get('tone') as string;
  const style = formData.get('style') as string;
  const targetAudience = formData.get('target_audience') as string;
  const wordsToAvoid = formData.get('words_to_avoid') as string;

  // Extract content-specific preferences
  const socialStyle = formData.get('social_style') as string;
  const socialLength = formData.get('social_length') as string;
  const blogStyle = formData.get('blog_style') as string;
  const blogStructure = formData.get('blog_structure') as string;
  const emailStyle = formData.get('email_style') as string;
  const emailGreeting = formData.get('email_greeting') as string;
  const twitterStyle = formData.get('twitter_style') as string;
  const instagramStyle = formData.get('instagram_style') as string;
  const ctaStyle = formData.get('cta_style') as string;
  const industryTerms = formData.get('industry_terms') as string;

  if (!brandId || !brandName || !tone || !style || !targetAudience) {
    throw new Error('All required fields must be filled');
  }

  // Create enhanced persona configuration object with content-specific preferences
  const personaConfig = {
    // Base brand settings
    tone,
    style,
    target_audience: targetAudience,
    words_to_avoid: wordsToAvoid || '',
    
    // Content-specific preferences
    content_preferences: {
      social_media: {
        style: socialStyle || '',
        length: socialLength || 'medium'
      },
      blog_posts: {
        style: blogStyle || '',
        structure: blogStructure || ''
      },
      emails: {
        style: emailStyle || '',
        greeting: emailGreeting || ''
      },
      platforms: {
        twitter: twitterStyle || '',
        instagram: instagramStyle || ''
      },
      cta_style: ctaStyle || '',
      industry_terms: industryTerms || ''
    }
  };

  try {
    // Ensure the user has a profile record
    await ensureUserProfile(user.id);

    // Update the brand (ensure user owns the brand)
    const { error: brandError } = await supabase
      .from('brands')
      .update({
        name: brandName,
        persona_config_json: personaConfig,
      })
      .eq('id', brandId)
      .eq('profile_id', user.id); // Ensure user owns this brand

    if (brandError) {
      console.error('Brand update error:', brandError);
      throw new Error(`Failed to update brand: ${brandError.message}`);
    }

    // Revalidate the dashboard to show the updated brand
    revalidatePath('/');

  } catch (error) {
    console.error('Error updating brand:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to update brand');
  }
}

export async function deleteBrand(brandId: string) {
  const supabase = await createClient();

  // Get the current user using safe auth check
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error('You must be logged in to delete a brand');
  }

  if (!brandId) {
    throw new Error('Brand ID is required');
  }

  try {
    // Ensure the user has a profile record
    await ensureUserProfile(user.id);

    // Delete documents first (due to foreign key constraint)
    const { error: documentsError } = await supabase
      .from('documents')
      .delete()
      .eq('brand_id', brandId);

    if (documentsError) {
      console.error('Documents deletion error:', documentsError);
      throw new Error(`Failed to delete brand documents: ${documentsError.message}`);
    }

    // Delete the brand (ensure user owns the brand)
    const { error: brandError } = await supabase
      .from('brands')
      .delete()
      .eq('id', brandId)
      .eq('profile_id', user.id); // Ensure user owns this brand

    if (brandError) {
      console.error('Brand deletion error:', brandError);
      throw new Error(`Failed to delete brand: ${brandError.message}`);
    }

    // Revalidate the dashboard to remove the deleted brand
    revalidatePath('/');

  } catch (error) {
    console.error('Error deleting brand:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to delete brand');
  }
}

export async function createCheckoutSession() {
  try {
    console.log('=== CHECKOUT SESSION START ===');
    console.log('Environment:', process.env.NODE_ENV);
    
    const supabase = await createClient();

    // Get the current user using safe auth check
    const user = await getAuthenticatedUser();

    if (!user) {
      console.error('No authenticated user found during checkout');
      // Return error instead of throwing for better client handling
      return { 
        error: 'You must be logged in to upgrade',
        requiresAuth: true 
      };
    }

    console.log('Creating checkout for user:', user.email);

    // Ensure the user has a profile record
    await ensureUserProfile(user.id);

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
    console.log('=== CHECKOUT SESSION SUCCESS ===');
    return { sessionId: checkoutSession.id, error: null };

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
    
    // Return error object instead of throwing
    return { 
      error: message,
      requiresAuth: message.includes('logged in')
    };
  }
}
