// src/app/api/generate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';
import { 
  getProfile, 
  getMemory, 
  getSettings, 
  retrieveChunks 
} from '../../../lib/brand';
import { styleSystemPrompt } from '../../../lib/prompts';
import { callOpenAI } from '../../../lib/openai';
import { trackAnalyticsEvent } from '../../../lib/analytics';

// Force dynamic rendering to use Node.js runtime instead of edge
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    console.log('=== ENHANCED GENERATE API START ===');
    
    // Check OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('CRITICAL: OPENAI_API_KEY is not set!');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      console.error('No session found in generate route');
      return new Response('Unauthorized', { status: 401 });
    }

    // Check subscription status
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', session.user.id)
      .single();

    if (profileError || !profile) {
      console.error('Failed to fetch user profile for subscription check:', profileError);
      return new Response('Profile not found', { status: 403 });
    }

    // Enforce paywall - only active subscribers can generate content
    if (profile.subscription_status !== 'active') {
      return new Response(
        JSON.stringify({
          error: 'subscription_required',
          message: 'An active subscription is required to generate content. Please upgrade your plan to continue.',
          subscription_status: profile.subscription_status || 'none'
        }),
        { 
          status: 402, // Payment Required
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse request body
    const { 
      brand_id, 
      user_prompt, 
      type = 'post', 
      wordCount = 120,
      tone 
    } = await req.json();

    if (!brand_id || !user_prompt) {
      return new Response('Missing brand_id or user_prompt', { status: 400 });
    }

    console.log(`🚀 Generating ${type} content for brand: ${brand_id}`);
    console.log(`📝 Prompt: "${user_prompt.substring(0, 100)}..."`);

    // Track analytics event
    await trackAnalyticsEvent({
      user_id: session.user.id,
      brand_id,
      event_type: 'content_generated',
      content_type: type,
      word_count: wordCount,
      metadata: {
        prompt_length: user_prompt.length,
        tone: tone || 'default'
      }
    });

    // Gather all brand intelligence data in parallel
    const [brandProfile, brandMemory, brandSettings, relevantChunks] = await Promise.all([
      getProfile(brand_id),
      getMemory(brand_id),
      getSettings(brand_id),
      retrieveChunks(brand_id, user_prompt, 8) // Get more context
    ]);

    console.log('📊 Brand data loaded:', {
      hasProfile: !!brandProfile,
      memoryFacts: brandMemory.length,
      chunks: relevantChunks.length,
      settings: !!brandSettings
    });

    // Fall back to legacy persona if new profile doesn't exist
    let systemPrompt;
    if (brandProfile && brandMemory.length > 0) {
      // Use new enhanced system prompt
      console.log('✨ Using enhanced brand intelligence system');
      systemPrompt = styleSystemPrompt(brandProfile, brandMemory, brandSettings);
    } else {
      // Fall back to legacy system
      console.log('⚠️ Falling back to legacy persona system');
      const { data: brandData, error: brandError } = await supabase
        .from('brands')
        .select('persona_config_json')
        .eq('id', brand_id)
        .single();

      if (brandError || !brandData?.persona_config_json) {
        throw new Error(`Could not fetch brand data: ${brandError?.message}`);
      }

      systemPrompt = `You are an AI content generator for a brand.
Your personality and writing style are defined by the following JSON rules:
${JSON.stringify(brandData.persona_config_json, null, 2)}

You will be given a user's prompt and generate content that perfectly matches the brand's voice.
Adhere strictly to the persona rules. Do not break character.`;
    }

    // Build user prompt with context
    const contextParts = [];
    if (relevantChunks.length > 0) {
      contextParts.push('BRAND CONTEXT:');
      contextParts.push(relevantChunks.map(c => `- ${c.chunk}`).join('\n'));
      contextParts.push('');
    }

    contextParts.push(`CONTENT TYPE: ${type}`);
    contextParts.push(`TARGET LENGTH: ${wordCount} words`);
    if (tone) {
      contextParts.push(`TONE PREFERENCE: ${tone}`);
    }
    contextParts.push('');
    contextParts.push(`USER REQUEST:\n${user_prompt}`);

    const finalUserPrompt = contextParts.join('\n');

    // Generate content with streaming
    console.log('🤖 Calling OpenAI for generation...');
    
    const response = await callOpenAI(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: finalUserPrompt }
      ],
      {
        temperature: 0.7,
        maxTokens: Math.min(2000, wordCount * 4), // Rough token estimate
        stream: true
      }
    );

    // Handle streaming response
    if ('choices' in response) {
      // Non-streaming response (fallback)
      const content = response.choices[0]?.message?.content || '';
      return new Response(content, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    } else {
      // Streaming response
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of response) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
              
              if (chunk.choices[0]?.finish_reason === 'stop') {
                break;
              }
            }
          } catch (streamError) {
            console.error('Streaming error:', streamError);
            controller.error(streamError);
          } finally {
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no',
        },
      });
    }

  } catch (error: unknown) {
    console.error('=== ENHANCED GENERATE API ERROR ===');
    console.error('Error in generate route:', error);
    const err = error as any;
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate content',
        details: err.message || 'Unknown error',
        type: err.constructor?.name || 'Unknown'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
