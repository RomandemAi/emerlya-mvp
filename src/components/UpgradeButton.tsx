'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { StarIcon } from '@heroicons/react/24/outline';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function UpgradeButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      console.log('Starting upgrade process...');
      
      // Call the API route instead of server action
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: Include cookies
      });

      const result = await response.json();
      console.log('Checkout result:', result);
      
      // Check if there's an error in the response
      if (result.error) {
        // If authentication is required, redirect to login
        if (result.requiresAuth || response.status === 401) {
          console.log('Authentication required, redirecting to login...');
          router.push('/login');
          return;
        }
        
        // Otherwise show the error
        throw new Error(result.error);
      }
      
      if (!result.sessionId) {
        throw new Error('No session ID returned from server');
      }

      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      console.log('Redirecting to Stripe checkout...');

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: result.sessionId,
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
      className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center space-x-2"
    >
      <StarIcon className="w-4 h-4" />
      <span>
        {isLoading ? 'Loading...' : 'Upgrade to Pro'}
      </span>
      {isLoading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      )}
    </button>
  );
}
