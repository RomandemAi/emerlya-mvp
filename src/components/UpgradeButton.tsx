'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from '../app/actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function UpgradeButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      console.log('Starting upgrade process...');
      
      const sessionId = await createCheckoutSession();
      console.log('Received session ID:', sessionId);
      
      if (!sessionId) {
        throw new Error('No session ID returned from server');
      }

      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      console.log('Redirecting to Stripe checkout...');

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
        alert(`Checkout redirect failed: ${error.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error in upgrade process:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to start checkout: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={isLoading}
      className="flex items-center gap-3 w-full p-3 text-left text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="text-lg">⭐</span>
      <span className="font-medium">
        {isLoading ? 'Loading...' : 'Upgrade to Pro'}
      </span>
      {isLoading && (
        <div className="ml-auto animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      )}
    </button>
  );
}
