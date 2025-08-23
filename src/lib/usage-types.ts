// Types and constants for the usage system (no 'use server' here)

export interface UsageStats {
  words_used: number;
  content_pieces: number;
  words_limit: number;
  content_limit: number;
  words_credits: number; // Extra words purchased
  subscription_status: string;
  percentage_used: number;
  can_generate: boolean;
  days_remaining: number;
}

export interface TierLimits {
  words_per_month: number;
  content_per_month: number;
  api_requests_per_month: number; // Add API requests to subscription tiers
  features: string[];
}

export const TIER_LIMITS: Record<string, TierLimits> = {
  'free': {
    words_per_month: 5000,
    content_per_month: 25,
    api_requests_per_month: 0, // No API access on free plan
    features: ['Basic content generation', '1 brand', 'Email support', 'Top-up options']
  },
  'essentials': {
    words_per_month: 20000,
    content_per_month: 100,
    api_requests_per_month: 1000, // 1k API requests included
    features: ['All content types', '3 brands', 'Email support', 'Basic analytics', 'Basic API access']
  },
  'professional': {
    words_per_month: 50000,
    content_per_month: 250,
    api_requests_per_month: 5000, // 5k API requests included
    features: ['All content types', '5 brands', 'Document analysis', 'Priority support', 'Advanced analytics', 'API access']
  },
  'business': {
    words_per_month: 150000,
    content_per_month: 750,
    api_requests_per_month: 25000, // 25k API requests included
    features: ['Unlimited brands', 'Team collaboration', 'API access', 'Priority support', 'Advanced analytics']
  },
  // Legacy tier - keep for existing users (grandfathered with good API access)
  'active': { 
    words_per_month: 50000,
    content_per_month: 500,
    api_requests_per_month: 10000, // 10k API requests for legacy users
    features: ['Advanced content generation', 'Unlimited brands', 'Priority support', 'Analytics', 'API access']
  },
  'enterprise': {
    words_per_month: 1000000, // Effectively unlimited
    content_per_month: 10000,
    api_requests_per_month: 100000, // 100k API requests included
    features: ['Everything in Business', 'Custom integrations', 'Dedicated support', 'Custom analytics', 'On-premise deployment']
  }
};
