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
  features: string[];
}

export const TIER_LIMITS: Record<string, TierLimits> = {
  'free': {
    words_per_month: 5000,
    content_per_month: 25,
    features: ['Basic content generation', '1 brand', 'Community support']
  },
  'active': { // Pro tier
    words_per_month: 50000,
    content_per_month: 500,
    features: ['Advanced content generation', 'Unlimited brands', 'Priority support', 'Analytics', 'API access']
  },
  'enterprise': {
    words_per_month: 1000000, // Effectively unlimited
    content_per_month: 10000,
    features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'Custom analytics']
  }
};
