import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';
import { createClient } from '../../../lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== CHECKOUT SUCCESS HANDLER ===');
    
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    // Get the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Get the subscription from the session
    const subscriptionId = session.subscription as string;
    
    if (!subscriptionId) {
      console.error('No subscription ID in session');
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 400 }
      );
    }

    // Get the subscription details
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    const customerId = subscription.customer as string;
    const userId = session.client_reference_id;

    if (!userId) {
      console.error('No user ID in session');
      return NextResponse.json(
        { error: 'User ID not found' },
        { status: 400 }
      );
    }

    console.log('Updating subscription status for user:', userId);
    console.log('Customer ID:', customerId);
    console.log('Subscription status:', subscription.status);

    // Update the user's subscription status in Supabase
    const supabase = await createClient();
    
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        subscription_status: subscription.status === 'active' ? 'active' : 'inactive',
        stripe_customer_id: customerId,
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating subscription status:', updateError);
      return NextResponse.json(
        { error: 'Failed to update subscription status' },
        { status: 500 }
      );
    }

    console.log('Successfully updated subscription status to active');
    console.log('=== CHECKOUT SUCCESS HANDLER COMPLETE ===');

    return NextResponse.json({ 
      success: true,
      subscription_status: subscription.status
    });

  } catch (error) {
    console.error('Checkout success handler error:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout success' },
      { status: 500 }
    );
  }
}
