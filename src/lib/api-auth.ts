import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { validateApiKey, logApiUsage } from './api-server-actions';
import { API_TIERS } from './api-keys';

export interface ApiContext {
  user_id: string;
  api_key_id: string;
  tier: string;
  rate_limit_per_minute: number;
  requests_remaining: number;
}

/**
 * Extract API key from request headers
 */
function extractApiKey(request: NextRequest): string | null {
  // Check Authorization header: "Bearer emr_live_..."
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Check X-API-Key header
  const apiKeyHeader = request.headers.get('x-api-key');
  if (apiKeyHeader) {
    return apiKeyHeader;
  }
  
  return null;
}

/**
 * Authenticate API request and return context
 */
export async function authenticateApiRequest(
  request: NextRequest
): Promise<{ success: boolean; context?: ApiContext; error?: string; status?: number }> {
  try {
    // Extract API key
    const apiKey = extractApiKey(request);
    if (!apiKey) {
      return {
        success: false,
        error: 'API key required. Include it in Authorization header as "Bearer your_key" or X-API-Key header.',
        status: 401
      };
    }
    
    // Validate key format
    if (!apiKey.startsWith('emr_live_') || apiKey.length !== 40) {
      return {
        success: false,
        error: 'Invalid API key format.',
        status: 401
      };
    }
    
    // Hash the key for lookup
    const keyHash = createHash('sha256').update(apiKey).digest('hex');
    
    // Validate key in database
    const validation = await validateApiKey(keyHash);
    if (!validation.valid) {
      return {
        success: false,
        error: 'Invalid or expired API key.',
        status: 401
      };
    }
    
    // Check rate limits
    if (validation.rate_limit_exceeded) {
      return {
        success: false,
        error: `Rate limit exceeded. ${validation.requests_remaining || 0} requests remaining this month.`,
        status: 429
      };
    }
    
    // Get tier info for rate limiting
    const tierInfo = API_TIERS[validation.tier!] || API_TIERS.free;
    
    return {
      success: true,
      context: {
        user_id: validation.user_id!,
        api_key_id: keyHash, // We'll store hash as ID for logging
        tier: validation.tier!,
        rate_limit_per_minute: tierInfo.rate_limit_per_minute,
        requests_remaining: validation.requests_remaining || 0
      }
    };
    
  } catch (error) {
    console.error('API authentication error:', error);
    return {
      success: false,
      error: 'Authentication service unavailable.',
      status: 503
    };
  }
}

/**
 * Create API error response
 */
export function createApiErrorResponse(
  message: string, 
  status: number = 400,
  code?: string
): NextResponse {
  return NextResponse.json(
    {
      ok: false,
      error: {
        message,
        code: code || `API_ERROR_${status}`,
        status
      }
    },
    { status }
  );
}

/**
 * Create API success response
 */
export function createApiSuccessResponse(
  data: any,
  metadata?: Record<string, any>
): NextResponse {
  return NextResponse.json({
    ok: true,
    data,
    metadata: {
      timestamp: new Date().toISOString(),
      ...metadata
    }
  });
}

/**
 * Middleware wrapper for API routes
 */
export function withApiAuth(
  handler: (request: NextRequest, context: ApiContext) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const startTime = Date.now();
    let apiContext: ApiContext | undefined;
    let statusCode = 200;
    
    try {
      // Authenticate request
      const auth = await authenticateApiRequest(request);
      
      if (!auth.success) {
        statusCode = auth.status || 401;
        return createApiErrorResponse(auth.error!, statusCode);
      }
      
      apiContext = auth.context!;
      
      // Call the actual handler
      const response = await handler(request, apiContext);
      statusCode = response.status;
      
      return response;
      
    } catch (error) {
      console.error('API handler error:', error);
      statusCode = 500;
      return createApiErrorResponse('Internal server error', 500);
      
    } finally {
      // Log the API usage
      if (apiContext) {
        const responseTime = Date.now() - startTime;
        const endpoint = request.nextUrl.pathname;
        const method = request.method;
        
        // Log usage (fire and forget)
        logApiUsage(
          apiContext.api_key_id,
          apiContext.user_id,
          endpoint,
          method,
          statusCode,
          responseTime,
          0, // tokens_used - will be filled by specific endpoints
          0, // words_generated - will be filled by specific endpoints
          {
            user_agent: request.headers.get('user-agent'),
            ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
            tier: apiContext.tier
          }
        ).catch(console.error);
      }
    }
  };
}

/**
 * Rate limiting based on tier
 */
export async function checkRateLimit(
  apiContext: ApiContext,
  customLimit?: number
): Promise<{ allowed: boolean; remaining: number; resetTime: Date }> {
  // For now, we'll use the monthly limit from the database
  // In production, you'd want to implement proper per-minute rate limiting
  // using Redis or similar
  
  const limit = customLimit || apiContext.requests_remaining;
  const remaining = Math.max(0, limit - 1);
  
  // Reset time is end of current month
  const now = new Date();
  const resetTime = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  
  return {
    allowed: limit > 0,
    remaining,
    resetTime
  };
}
