// Types and tier definitions for API management

export interface ApiKey {
  id: string;
  user_id: string;
  name: string;
  key_prefix: string;
  tier: 'free' | 'starter' | 'pro' | 'enterprise';
  is_active: boolean;
  last_used_at: string | null;
  requests_count: number;
  requests_limit: number;
  created_at: string;
  expires_at: string | null;
}

export interface ApiKeyTier {
  name: string;
  requests_per_month: number;
  features: string[];
  price_per_month: number;
  rate_limit_per_minute: number;
}

export const API_TIERS: Record<string, ApiKeyTier> = {
  free: {
    name: 'Developer Free',
    requests_per_month: 500,
    features: ['Basic content generation', 'Rate limited'],
    price_per_month: 0,
    rate_limit_per_minute: 10
  },
  starter: {
    name: 'Developer Starter',
    requests_per_month: 2000,
    features: ['All content types', 'Email support', 'Basic analytics'],
    price_per_month: 9,
    rate_limit_per_minute: 50
  },
  pro: {
    name: 'Developer Pro', 
    requests_per_month: 15000,
    features: ['Advanced features', 'Webhooks', 'Priority support'],
    price_per_month: 29,
    rate_limit_per_minute: 150
  },
  enterprise: {
    name: 'Enterprise API',
    requests_per_month: 50000,
    features: ['Custom integrations', 'Dedicated support', 'SLA'],
    price_per_month: 99,
    rate_limit_per_minute: 500
  }
};

// Note: Server Action functions have been moved to api-server-actions.ts
// This file now only contains types and utility functions
