'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CheckoutSuccessHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCheckoutSuccess = async () => {
      const success = searchParams.get('success');
      const sessionId = searchParams.get('session_id');

      if (success === 'true' && sessionId) {
        console.log('Processing checkout success with session:', sessionId);
        
        try {
          const response = await fetch('/api/checkout-success', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Checkout success processed:', data);
            
            // Reload the page to show updated subscription status
            window.location.href = '/';
          } else {
            console.error('Failed to process checkout success');
          }
        } catch (error) {
          console.error('Error processing checkout success:', error);
        }
      }
    };

    handleCheckoutSuccess();
  }, [searchParams]);

  // Check if we're showing success message
  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');

  if (success === 'true') {
    return (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Processing your subscription...</span>
        </div>
      </div>
    );
  }

  if (canceled === 'true') {
    return (
      <div className="fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Checkout was canceled</span>
        </div>
      </div>
    );
  }

  return null;
}
