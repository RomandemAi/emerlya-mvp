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
      className="flex items-center gap-3 w-full p-3 text-left text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="text-lg">💳</span>
      <span className="font-medium">
        {isLoading ? 'Loading...' : 'Manage Billing'}
      </span>
      {isLoading && (
        <div className="ml-auto animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      )}
    </button>
  );
}
