'use client';

import { useState } from 'react';
import { createStripePortalSession } from '../app/actions';

export default function ManageBillingButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      const portalUrl = await createStripePortalSession();
      // Redirect to Stripe Customer Portal
      window.location.href = portalUrl;
    } catch (error) {
      console.error('Error opening billing portal:', error);
      alert('Failed to open billing portal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleManageBilling}
      disabled={isLoading}
      className="w-full px-4 py-3 text-gray-600 hover:text-gray-900 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-medium flex items-center justify-center space-x-2"
    >
      <span>💳</span>
      <span>
        {isLoading ? 'Loading...' : 'Manage Billing'}
      </span>
      {isLoading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
      )}
    </button>
  );
}
