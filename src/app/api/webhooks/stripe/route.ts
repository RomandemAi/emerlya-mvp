import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

console.log('Webhook configured:', !!webhookSecret);

export async function POST(req: NextRequest) {
  try {
    // Get the raw body as text for signature verification
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      console.error('No Stripe signature found');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    // If webhook secret is not configured, skip signature verification (for development)
    if (!webhookSecret) {
      console.warn('WARNING: Webhook secret not configured. Skipping signature verification.');
      console.warn('This is acceptable for checkout-success flow but webhooks won\'t be secure.');
      
      // Parse the body as JSON to create an event object
      try {
        event = JSON.parse(body) as Stripe.Event;
      } catch (parseError) {
        console.error('Failed to parse webhook body:', parseError);
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
      }
    } else {
      // Verify the webhook signature
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err);
        console.error('Error details:', err.message);
        // Log the error but don't fail completely - we have checkout-success as backup
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    }

    // Initialize Supabase with service role to bypass RLS
    const { createClient: createServiceClient } = require('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
    
    let supabase;
    if (supabaseUrl && supabaseServiceKey) {
      supabase = createServiceClient(supabaseUrl, supabaseServiceKey);
    } else {
      // Fallback to regular client if service key not available
      console.warn('Service key not available, using regular client');
      supabase = await createClient();
    }

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        
        // Determine subscription status
        let status = 'inactive';
        if (subscription.status === 'active') {
          status = 'active';
        } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
          status = 'canceled';
        } else if (subscription.status === 'past_due' || subscription.status === 'incomplete') {
          status = 'past_due';
        }

        // Update the user's profile in Supabase
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_status: status,
            stripe_customer_id: customerId,
          })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Error updating subscription status:', error);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }

        console.log(`Subscription ${event.type} processed for customer ${customerId}: ${status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Set subscription status to canceled
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_status: 'canceled',
          })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Error updating subscription status:', error);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }

        console.log(`Subscription deleted for customer ${customerId}`);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Ensure subscription is active when payment succeeds
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_status: 'active',
          })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Error updating subscription status after payment:', error);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }

        console.log(`Payment succeeded for customer ${customerId}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Set subscription status to past_due when payment fails
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_status: 'past_due',
          })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Error updating subscription status after failed payment:', error);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }

        console.log(`Payment failed for customer ${customerId}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
