import { NextRequest, NextResponse } from 'next/server';
import { withApiAuth, createApiErrorResponse, createApiSuccessResponse, ApiContext } from '@/lib/api-auth';
import { getProfile, getMemory, getSettings, retrieveChunks } from '@/lib/brand';
import { styleSystemPrompt } from '@/lib/prompts';
import { callOpenAI } from '@/lib/openai';
import { trackAnalyticsEvent } from '@/lib/analytics';
import { checkUsageLimit } from '@/lib/usage';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function generateHandler(request: NextRequest, context: ApiContext) {
  try {
    // Parse request body
    const body = await request.json();
    const {
      brand_id,
      prompt,
      type = 'post',
      word_count = 120,
      tone,
      streaming = false
    } = body;

    // Validate required fields
    if (!brand_id || !prompt) {
      return createApiErrorResponse(
        'Missing required fields: brand_id and prompt are required',
        400,
        'MISSING_FIELDS'
      );
    }

    if (typeof prompt !== 'string' || prompt.trim().length === 0) {
      return createApiErrorResponse(
        'Prompt must be a non-empty string',
        400,
        'INVALID_PROMPT'
      );
    }

    if (word_count && (word_count < 10 || word_count > 2000)) {
      return createApiErrorResponse(
        'Word count must be between 10 and 2000',
        400,
        'INVALID_WORD_COUNT'
      );
    }

    // Check user's usage limits
    const usageCheck = await checkUsageLimit(context.user_id, word_count);
    if (!usageCheck.allowed) {
      return createApiErrorResponse(
        usageCheck.reason || 'Usage limit exceeded',
        429,
        'USAGE_LIMIT_EXCEEDED'
      );
    }

    // Create Supabase client with user context
    const supabase = await createClient();
    
    // Verify brand ownership
    const { data: brandData, error: brandError } = await supabase
      .from('brands')
      .select('id, name')
      .eq('id', brand_id)
      .eq('user_id', context.user_id)
      .single();

    if (brandError || !brandData) {
      return createApiErrorResponse(
        'Brand not found or access denied',
        403,
        'BRAND_ACCESS_DENIED'
      );
    }

    // Get brand context
    const [profile, memory, settings] = await Promise.all([
      getProfile(brand_id),
      getMemory(brand_id),
      getSettings(brand_id)
    ]);

    if (!profile) {
      return createApiErrorResponse(
        'Brand profile not found',
        404,
        'BRAND_PROFILE_NOT_FOUND'
      );
    }

    // Build system prompt  
    const systemPrompt = styleSystemPrompt(
      profile,
      memory || [],
      settings
    );

    // Build user prompt
    const finalUserPrompt = `${prompt}\n\nTarget length: approximately ${word_count} words.`;

    // Generate content
    const response = await callOpenAI(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: finalUserPrompt }
      ],
      {
        temperature: 0.7,
        maxTokens: Math.min(4000, word_count * 5),
        stream: streaming
      }
    );

    // Track analytics
    await trackAnalyticsEvent({
      user_id: context.user_id,
      brand_id,
      event_type: 'content_generated',
      content_type: type,
      word_count: word_count,
      metadata: {
        api_tier: context.tier,
        prompt_length: prompt.length,
        tone: tone || 'default',
        via: 'api'
      }
    });

    if (streaming) {
      // Return streaming response
      if ('body' in response && response.body && typeof response.body === 'object') {
        return new NextResponse(response.body as ReadableStream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
            'X-API-Tier': context.tier,
            'X-Requests-Remaining': context.requests_remaining.toString()
          }
        });
      }
    } 
    
    // Collect full response
    let content = '';
    
    if ('body' in response && response.body && typeof response.body === 'object' && 'getReader' in response.body) {
      const reader = (response.body as ReadableStream).getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content += new TextDecoder().decode(value);
      }
    } else {
      // Handle non-streaming response
      content = (response as any).choices?.[0]?.message?.content || '';
    }

    return createApiSuccessResponse(
        {
          content: content.trim(),
          brand_id,
          type,
          word_count,
          tone: tone || settings?.tone || 'professional'
        },
        {
          api_tier: context.tier,
          requests_remaining: context.requests_remaining,
          brand_name: brandData.name
        }
      );

  } catch (error) {
    console.error('API generate error:', error);
    return createApiErrorResponse(
      'Content generation failed',
      500,
      'GENERATION_FAILED'
    );
  }
}

export const POST = withApiAuth(generateHandler);
