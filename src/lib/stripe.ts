import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil', // Keep existing API version
  typescript: true,
  host: 'api.stripe.com',
  port: 443,
  protocol: 'https'
});
