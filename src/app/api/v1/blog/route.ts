import { NextRequest } from 'next/server';
import { withApiAuth, createApiErrorResponse, createApiSuccessResponse, ApiContext } from '@/lib/api-auth';
import { getProfile, getMemory, getSettings } from '@/lib/brand';
import { callOpenAI } from '@/lib/openai';
import { trackAnalyticsEvent } from '@/lib/analytics';
import { checkUsageLimit } from '@/lib/usage';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function blogHandler(request: NextRequest, context: ApiContext) {
  try {
    const body = await request.json();
    const {
      brand_id,
      title,
      outline,
      word_count = 800,
      tone,
      include_intro = true,
      include_conclusion = true,
      seo_keywords = []
    } = body;

    // Validate required fields
    if (!brand_id || !title) {
      return createApiErrorResponse(
        'Missing required fields: brand_id and title are required',
        400,
        'MISSING_FIELDS'
      );
    }

    if (word_count < 100 || word_count > 3000) {
      return createApiErrorResponse(
        'Word count must be between 100 and 3000 for blog posts',
        400,
        'INVALID_WORD_COUNT'
      );
    }

    // Check usage limits
    const usageCheck = await checkUsageLimit(context.user_id, word_count);
    if (!usageCheck.allowed) {
      return createApiErrorResponse(
        usageCheck.reason || 'Usage limit exceeded',
        429,
        'USAGE_LIMIT_EXCEEDED'
      );
    }

    // Create Supabase client and verify brand access
    const supabase = await createClient();
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

    // Build blog-specific system prompt
    const systemPrompt = `You are an expert content writer for ${profile.name || 'this brand'}.

BRAND VOICE & STYLE:
${profile.description || 'No specific brand description provided'}

WRITING GUIDELINES:
- Tone: ${tone || settings?.tone || 'professional'}
- Target word count: ${word_count} words
- Include SEO keywords naturally: ${seo_keywords.join(', ') || 'None specified'}
- Structure: ${include_intro ? 'Include introduction, ' : ''}main content${include_conclusion ? ', and conclusion' : ''}

BRAND MEMORY & CONTEXT:
${memory || 'No specific brand memory provided'}

Create a comprehensive, engaging blog post that maintains the brand voice throughout.`;

    // Build user prompt
    const userPrompt = `Write a blog post with the title: "${title}"

${outline ? `Follow this outline:\n${outline}\n` : ''}

Requirements:
- Target length: ${word_count} words
- ${include_intro ? 'Start with an engaging introduction' : 'Jump straight into the main content'}
- Use clear headings and subheadings
- ${include_conclusion ? 'End with a strong conclusion and call-to-action' : 'End naturally without a formal conclusion'}
- Write in a ${tone || 'professional'} tone
${seo_keywords.length > 0 ? `- Naturally incorporate these keywords: ${seo_keywords.join(', ')}` : ''}

Create content that would rank well in search engines while maintaining readability and brand consistency.`;

    // Generate blog content
    const response = await callOpenAI(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      {
        temperature: 0.7,
        maxTokens: Math.min(6000, word_count * 6), // Blogs need more tokens
        stream: false
      }
    );

    // Collect response
    let content = '';
    const reader = response.body?.getReader();
    
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content += new TextDecoder().decode(value);
      }
    }

    // Track analytics
    await trackAnalyticsEvent({
      user_id: context.user_id,
      brand_id,
      event_type: 'content_generated',
      content_type: 'blog',
      word_count: word_count,
      metadata: {
        api_tier: context.tier,
        title: title,
        has_outline: !!outline,
        seo_keywords_count: seo_keywords.length,
        tone: tone || 'default',
        via: 'api'
      }
    });

    return createApiSuccessResponse(
      {
        title,
        content: content.trim(),
        brand_id,
        word_count,
        tone: tone || settings?.tone || 'professional',
        seo_keywords: seo_keywords,
        structure: {
          has_intro: include_intro,
          has_conclusion: include_conclusion,
          has_outline: !!outline
        }
      },
      {
        api_tier: context.tier,
        requests_remaining: context.requests_remaining,
        brand_name: brandData.name,
        content_type: 'blog'
      }
    );

  } catch (error) {
    console.error('API blog error:', error);
    return createApiErrorResponse(
      'Blog generation failed',
      500,
      'GENERATION_FAILED'
    );
  }
}

export const POST = withApiAuth(blogHandler);
