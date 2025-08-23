'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ModernBoltIcon, 
  ModernSparklesIcon, 
  ModernDocumentIcon,
  ModernStarIcon 
} from './ModernIcons';

interface UsageData {
  words_used: number;
  content_pieces: number;
  words_limit: number;
  content_limit: number;
  subscription_status: string;
  percentage_used: number;
  can_generate: boolean;
  days_remaining: number;
  tier_features: string[];
  all_tiers: Record<string, any>;
}

export default function UsageDashboard() {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/usage');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setUsage(result.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch usage:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!usage) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-500">Unable to load usage data</p>
      </div>
    );
  }

  const getTierName = (status: string) => {
    switch (status) {
      case 'active': return 'Pro';
      case 'enterprise': return 'Enterprise';
      default: return 'Free';
    }
  };

  const getTierColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-accent';
      case 'enterprise': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Current Usage Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Usage Overview</h2>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(usage.subscription_status)} bg-gray-100`}>
            {getTierName(usage.subscription_status)} Plan
          </div>
        </div>

        {/* Words Usage */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Words Used</span>
            <span className="text-sm text-gray-500">
              {usage.words_used.toLocaleString()} / {usage.words_limit.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(usage.percentage_used)}`}
              style={{ width: `${Math.min(usage.percentage_used, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {usage.days_remaining} days remaining this month
          </p>
        </div>

        {/* Content Pieces */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Content Pieces</span>
            <span className="text-sm text-gray-500">
              {usage.content_pieces} / {usage.content_limit}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getUsageColor((usage.content_pieces / usage.content_limit) * 100)}`}
              style={{ width: `${Math.min((usage.content_pieces / usage.content_limit) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Limit Warning */}
        {!usage.can_generate && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 text-red-800">
              <ModernBoltIcon size="sm" />
              <span className="font-medium">Usage Limit Reached</span>
            </div>
            <p className="text-red-700 text-sm mt-1">
              You've reached your monthly limit. Upgrade to continue generating content.
            </p>
          </div>
        )}

        {/* Near Limit Warning */}
        {usage.can_generate && usage.percentage_used >= 80 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 text-yellow-800">
              <ModernSparklesIcon size="sm" />
              <span className="font-medium">Approaching Limit</span>
            </div>
            <p className="text-yellow-700 text-sm mt-1">
              You've used {usage.percentage_used}% of your monthly allowance. Consider upgrading soon.
            </p>
          </div>
        )}
      </div>

      {/* Upgrade Options */}
      {(usage.subscription_status === 'free' || !usage.can_generate) && (
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upgrade Your Plan</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            {/* Pro Plan */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <ModernStarIcon size="sm" />
                <span className="font-medium text-gray-900">Pro Plan</span>
              </div>
              <p className="text-2xl font-bold text-accent mb-2">$29/month</p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• 50,000 words/month</li>
                <li>• 500 content pieces</li>
                <li>• Unlimited brands</li>
                <li>• Priority support</li>
              </ul>
              <Link 
                href="/pricing"
                className="w-full bg-accent text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors flex items-center justify-center"
              >
                Upgrade to Pro
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <ModernBoltIcon size="sm" />
                <span className="font-medium text-gray-900">Enterprise</span>
              </div>
              <p className="text-2xl font-bold text-purple-600 mb-2">Custom</p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Unlimited everything</li>
                <li>• Custom integrations</li>
                <li>• Dedicated support</li>
                <li>• Custom analytics</li>
              </ul>
              <Link 
                href="/contact"
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Current Plan Features */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Plan Features</h3>
        <div className="grid gap-2">
          {usage.tier_features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
