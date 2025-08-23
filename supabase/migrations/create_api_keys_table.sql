-- Create API keys table for managing user API access
CREATE TABLE api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL, -- User-friendly name for the key
  key_hash VARCHAR(255) NOT NULL UNIQUE, -- Hashed version of the API key
  key_prefix VARCHAR(20) NOT NULL, -- First few chars for display (emr_xxxx...)
  tier VARCHAR(50) NOT NULL DEFAULT 'free', -- free, pro, enterprise
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_used_at TIMESTAMP WITH TIME ZONE,
  requests_count INTEGER DEFAULT 0,
  requests_limit INTEGER DEFAULT 1000, -- Monthly request limit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE, -- Optional expiration date
  
  -- Additional metadata
  metadata JSONB DEFAULT '{}',
  
  CONSTRAINT valid_tier CHECK (tier IN ('free', 'starter', 'pro', 'enterprise'))
);

-- Create indexes for performance
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_active ON api_keys(is_active) WHERE is_active = true;
CREATE INDEX idx_api_keys_tier ON api_keys(tier);

-- Enable Row Level Security
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own API keys" ON api_keys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own API keys" ON api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own API keys" ON api_keys
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API keys" ON api_keys
  FOR DELETE USING (auth.uid() = user_id);

-- Create API usage tracking table
CREATE TABLE api_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  api_key_id UUID NOT NULL REFERENCES api_keys(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint VARCHAR(255) NOT NULL,
  method VARCHAR(10) NOT NULL,
  status_code INTEGER NOT NULL,
  response_time_ms INTEGER,
  tokens_used INTEGER DEFAULT 0,
  words_generated INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Request metadata
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'
);

-- Create indexes for API usage
CREATE INDEX idx_api_usage_api_key_id ON api_usage(api_key_id);
CREATE INDEX idx_api_usage_user_id ON api_usage(user_id);
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at);
CREATE INDEX idx_api_usage_endpoint ON api_usage(endpoint);

-- Enable RLS for API usage
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for API usage
CREATE POLICY "Users can view their own API usage" ON api_usage
  FOR SELECT USING (auth.uid() = user_id);

-- Function to clean up old API usage data (keep last 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_api_usage()
RETURNS void AS $$
BEGIN
  DELETE FROM api_usage 
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Create function to increment API key usage
CREATE OR REPLACE FUNCTION increment_api_key_usage(key_hash_param VARCHAR)
RETURNS void AS $$
BEGIN
  UPDATE api_keys 
  SET 
    requests_count = requests_count + 1,
    last_used_at = NOW(),
    updated_at = NOW()
  WHERE key_hash = key_hash_param AND is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Create function to get API key with rate limit check
CREATE OR REPLACE FUNCTION validate_api_key(key_hash_param VARCHAR)
RETURNS TABLE(
  user_id UUID,
  tier VARCHAR,
  requests_count INTEGER,
  requests_limit INTEGER,
  is_active BOOLEAN,
  expires_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ak.user_id,
    ak.tier,
    ak.requests_count,
    ak.requests_limit,
    ak.is_active,
    ak.expires_at
  FROM api_keys ak
  WHERE ak.key_hash = key_hash_param
    AND ak.is_active = true
    AND (ak.expires_at IS NULL OR ak.expires_at > NOW());
END;
$$ LANGUAGE plpgsql;
