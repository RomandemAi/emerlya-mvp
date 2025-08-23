'use server';

import { createClient } from './supabase/server';
import { createHash, randomBytes } from 'crypto';
import { API_TIERS } from './api-keys';

/**
 * Generate a new API key
 */
function generateApiKey(): { key: string; hash: string; prefix: string } {
  // Generate random key: emr_live_32charRandomString
  const randomPart = randomBytes(16).toString('hex'); // 32 chars
  const key = `emr_live_${randomPart}`;
  
  // Create hash for storage
  const hash = createHash('sha256').update(key).digest('hex');
  
  // Create prefix for display (first 12 chars + ...)
  const prefix = `${key.substring(0, 12)}...`;
  
  return { key, hash, prefix };
}

/**
 * Create a new API key for a user - SERVER ACTION
 */
export async function createApiKey(
  userId: string, 
  name: string, 
  tier: string = 'free'
): Promise<{ success: boolean; data?: { id: string; key: string }; error?: string }> {
  try {
    const supabase = await createClient();
    
    // Check if user already has the maximum number of keys for their tier
    const { data: existingKeys, error: countError } = await supabase
      .from('api_keys')
      .select('id')
      .eq('user_id', userId)
      .eq('is_active', true);
    
    if (countError) {
      return { success: false, error: 'Failed to check existing keys' };
    }
    
    const maxKeysPerTier = { free: 1, starter: 3, pro: 10, enterprise: 50 };
    const maxKeys = maxKeysPerTier[tier as keyof typeof maxKeysPerTier] || 1;
    
    if (existingKeys && existingKeys.length >= maxKeys) {
      return { 
        success: false, 
        error: `Maximum ${maxKeys} API keys allowed for ${tier} tier` 
      };
    }
    
    // Generate new API key
    const { key, hash, prefix } = generateApiKey();
    const tierInfo = API_TIERS[tier] || API_TIERS.free;
    
    // Insert into database
    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: userId,
        name,
        key_hash: hash,
        key_prefix: prefix,
        tier,
        requests_limit: tierInfo.requests_per_month,
        is_active: true
      })
      .select('id')
      .single();
    
    if (error) {
      console.error('Error creating API key:', error);
      return { success: false, error: 'Failed to create API key' };
    }
    
    return { 
      success: true, 
      data: { 
        id: data.id, 
        key // Return the actual key only on creation
      } 
    };
    
  } catch (error) {
    console.error('Unexpected error creating API key:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

/**
 * Get all API keys for a user - SERVER ACTION
 */
export async function getUserApiKeys(userId: string) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching API keys:', error);
      return [];
    }
    
    return data || [];
    
  } catch (error) {
    console.error('Unexpected error fetching API keys:', error);
    return [];
  }
}

/**
 * Validate an API key and return user info - SERVER ACTION
 */
export async function validateApiKey(keyHash: string) {
  try {
    const supabase = await createClient();
    
    // Use the stored function to validate and get key info
    const { data, error } = await supabase.rpc('validate_api_key', {
      key_hash_param: keyHash
    });
    
    if (error || !data || data.length === 0) {
      return { valid: false };
    }
    
    const keyInfo = data[0];
    
    // Check if key is still active and not expired
    if (!keyInfo.is_active) {
      return { valid: false };
    }
    
    // Reset requests count if it's a new month
    const now = new Date();
    const lastReset = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Check rate limits (simple monthly check - could be enhanced)
    const requestsRemaining = keyInfo.requests_limit - keyInfo.requests_count;
    const rateLimitExceeded = requestsRemaining <= 0;
    
    return {
      valid: true,
      user_id: keyInfo.user_id,
      tier: keyInfo.tier,
      rate_limit_exceeded: rateLimitExceeded,
      requests_remaining: Math.max(0, requestsRemaining)
    };
    
  } catch (error) {
    console.error('Error validating API key:', error);
    return { valid: false };
  }
}

/**
 * Deactivate an API key - SERVER ACTION
 */
export async function deactivateApiKey(
  userId: string, 
  keyId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('api_keys')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', keyId)
      .eq('user_id', userId); // Ensure user owns the key
    
    if (error) {
      console.error('Error deactivating API key:', error);
      return { success: false, error: 'Failed to deactivate API key' };
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Unexpected error deactivating API key:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

/**
 * Log API usage - SERVER ACTION
 */
export async function logApiUsage(
  apiKeyId: string,
  userId: string,
  endpoint: string,
  method: string,
  statusCode: number,
  responseTimeMs: number = 0,
  tokensUsed: number = 0,
  wordsGenerated: number = 0,
  metadata: Record<string, any> = {}
): Promise<void> {
  try {
    const supabase = await createClient();
    
    await supabase
      .from('api_usage')
      .insert({
        api_key_id: apiKeyId,
        user_id: userId,
        endpoint,
        method,
        status_code: statusCode,
        response_time_ms: responseTimeMs,
        tokens_used: tokensUsed,
        words_generated: wordsGenerated,
        metadata
      });
      
  } catch (error) {
    console.error('Error logging API usage:', error);
    // Don't throw - logging failure shouldn't break API calls
  }
}
