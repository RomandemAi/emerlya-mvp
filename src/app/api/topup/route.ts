import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

// Top-up packages
const TOPUP_PACKAGES = {
  'small': {
    words: 10000,
    price: 1000, // $10.00 in cents
    name: '10,000 Words Top-Up',
    description: 'Perfect for occasional extra content needs'
  },
  'medium': {
    words: 30000,
    price: 2500, // $25.00 in cents (better value)
    name: '30,000 Words Top-Up',
    description: 'Great value for heavy content creators'
  }
};

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { package_type } = await req.json();

    if (!package_type || !TOPUP_PACKAGES[package_type as keyof typeof TOPUP_PACKAGES]) {
      return NextResponse.json(
        { error: 'Invalid package type' },
        { status: 400 }
      );
    }

    const selectedPackage = TOPUP_PACKAGES[package_type as keyof typeof TOPUP_PACKAGES];

    // Create Stripe checkout session
    const session_data = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment', // One-time payment, not subscription
      customer_email: session.user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPackage.name,
              description: selectedPackage.description,
              metadata: {
                words: selectedPackage.words.toString(),
                type: 'word_topup'
              }
            },
            unit_amount: selectedPackage.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        user_id: session.user.id,
        package_type: package_type,
        words_to_add: selectedPackage.words.toString(),
        type: 'word_topup'
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?topup_success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?topup_cancelled=true`,
    });

    return NextResponse.json({
      success: true,
      checkout_url: session_data.url,
      session_id: session_data.id
    });

  } catch (error) {
    console.error('Top-up API error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
