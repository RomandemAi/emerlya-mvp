'use client';

import { useState } from 'react';
import { ModernBoltIcon, ModernSparklesIcon } from './ModernIcons';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsage?: {
    words_used: number;
    words_limit: number;
    words_credits: number;
  };
}

export default function TopUpModal({ isOpen, onClose, currentUsage }: TopUpModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('small');

  const packages = [
    {
      id: 'small',
      words: 10000,
      price: '$10',
      value: 'Most Popular',
      description: 'Perfect for immediate needs',
      pricePerWord: '$0.001 per word',
      color: 'bg-accent'
    },
    {
      id: 'medium', 
      words: 30000,
      price: '$25',
      value: 'Best Value',
      description: 'Great for heavy usage',
      pricePerWord: '$0.0008 per word',
      color: 'bg-purple-600'
    }
  ];

  const handlePurchase = async (packageType: string) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package_type: packageType
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.checkout_url) {
          // Redirect to Stripe checkout
          window.location.href = result.checkout_url;
        }
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Top-up error:', error);
      alert('Failed to process top-up. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Top Up Your Words</h2>
            <p className="text-gray-600 mt-1">Add more words to continue creating content</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ×
          </button>
        </div>

        {/* Current Usage */}
        {currentUsage && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Your Current Usage</h3>
            <div className="text-sm text-gray-600">
              <div>Words Used: <span className="font-medium">{currentUsage.words_used.toLocaleString()}</span></div>
              <div>Available: <span className="font-medium">{(currentUsage.words_limit - currentUsage.words_used).toLocaleString()}</span></div>
              {currentUsage.words_credits > 0 && (
                <div>Credits: <span className="font-medium text-green-600">+{currentUsage.words_credits.toLocaleString()}</span></div>
              )}
            </div>
          </div>
        )}

        {/* Package Options */}
        <div className="space-y-4 mb-6">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                selectedPackage === pkg.id 
                  ? 'border-accent bg-accent/5' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {/* Best Value Badge */}
              {pkg.value && (
                <div className={`absolute -top-2 left-4 px-3 py-1 ${pkg.color} text-white text-xs font-medium rounded-full`}>
                  {pkg.value}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPackage === pkg.id 
                      ? 'border-accent bg-accent' 
                      : 'border-gray-300'
                  }`}>
                    {selectedPackage === pkg.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <ModernSparklesIcon size="sm" />
                      <span className="font-semibold text-gray-900">
                        {pkg.words.toLocaleString()} Words
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                    <p className="text-xs text-gray-500">{pkg.pricePerWord}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{pkg.price}</div>
                  <div className="text-sm text-gray-500">One-time</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Button */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={() => handlePurchase(selectedPackage)}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-accent to-accent/90 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <ModernBoltIcon size="sm" />
                <span>Purchase Words</span>
              </>
            )}
          </button>
        </div>

        {/* Info */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Secure payment processed by Stripe</p>
          <p>Words will be added to your account immediately after payment</p>
        </div>
      </div>
    </div>
  );
}
