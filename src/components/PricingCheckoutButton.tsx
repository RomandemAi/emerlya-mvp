'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PricingCheckoutButtonProps {
  planName: string;
  priceId?: string; // Different plans might have different price IDs
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function PricingCheckoutButton({ 
  planName, 
  priceId, 
  className = '', 
  children, 
  disabled = false 
}: PricingCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    // For free plan, just redirect to login/signup
    if (planName.toLowerCase() === 'starter' || planName.toLowerCase() === 'free') {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      console.log(`Starting checkout for ${planName} plan...`);
      
      // Call the API route to create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: Include cookies for auth
        body: JSON.stringify({
          planName,
          priceId, // If we have specific price IDs for different plans
        }),
      });

      const result = await response.json();
      console.log('Checkout result:', result);
      
      // Check if there's an error in the response
      if (result.error) {
        // If authentication is required, redirect to login
        if (result.requiresAuth || response.status === 401) {
          console.log('Authentication required, redirecting to login...');
          router.push('/login?redirect=pricing');
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
      console.error('Error in checkout process:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to start checkout: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading || disabled}
      className={`${className} ${
        isLoading || disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:shadow-lg transition-all duration-200'
      }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
