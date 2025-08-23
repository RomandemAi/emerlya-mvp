'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface TopUpButtonProps {
  packageType: 'small' | 'medium' | 'large';
  words: number;
  price: number;
  className?: string;
  children: React.ReactNode;
}

export default function TopUpButton({ 
  packageType, 
  words, 
  price, 
  className = '', 
  children 
}: TopUpButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTopUp = async () => {
    setIsLoading(true);
    try {
      console.log(`Starting top-up purchase: ${packageType} (${words} words for €${price})`);
      
      // Call the top-up API
      const response = await fetch('/api/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          package_type: packageType,
          words,
          price: price * 100, // Convert to cents for Stripe
        }),
      });

      const result = await response.json();
      console.log('Top-up result:', result);
      
      // Check if there's an error in the response
      if (result.error) {
        // If authentication is required, redirect to login
        if (response.status === 401) {
          console.log('Authentication required, redirecting to login...');
          router.push('/login?redirect=pricing');
          return;
        }
        
        throw new Error(result.error);
      }
      
      if (!result.sessionId && !result.url) {
        throw new Error('No checkout session returned from server');
      }

      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      console.log('Redirecting to Stripe checkout...');

      // Redirect to Stripe Checkout
      if (result.url) {
        window.location.href = result.url;
      } else {
        const { error } = await stripe.redirectToCheckout({
          sessionId: result.sessionId,
        });

        if (error) {
          console.error('Error redirecting to checkout:', error);
          alert(`Checkout redirect failed: ${error.message || 'Please try again.'}`);
        }
      }
    } catch (error) {
      console.error('Error in top-up process:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to start top-up checkout: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleTopUp}
      disabled={isLoading}
      className={`${className} ${
        isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transition-all duration-300'
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
