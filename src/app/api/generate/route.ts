// src/app/api/generate/route.ts

import { createClient } from '../../../lib/supabase/server';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Force dynamic rendering to use Node.js runtime instead of edge
export const dynamic = 'force-dynamic';

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // CRITICAL: Check subscription status before processing
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

    const { brand_id, user_prompt } = await req.json();

    if (!brand_id || !user_prompt) {
      return new Response('Missing brand_id or user_prompt', { status: 400 });
    }

    // 1. Fetch the brand's persona config from Supabase
    const { data: brandData, error: brandError } = await supabase
      .from('brands')
      .select('persona_config_json')
      .eq('id', brand_id)
      .single();

    if (brandError || !brandData) {
      throw new Error(`Could not fetch brand persona: ${brandError?.message}`);
    }
    const personaRules = brandData.persona_config_json;

    // 2. Vectorize the user's prompt
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: user_prompt,
    });
    const promptVector = embeddingResponse.data[0].embedding;

    // 3. Query Pinecone for relevant context
    const indexName = 'cora-mvp-index';
    const index = pinecone.index(indexName).namespace(brand_id);
    const queryResponse = await index.query({
      topK: 5,
      vector: promptVector,
      includeMetadata: true,
    });
    const context = queryResponse.matches.map(match => match.metadata?.text).join('\n---\n');

    // 4. Construct the final prompt for GPT-4o
    const systemPrompt = `You are an AI content generator for a brand.
    Your personality and writing style are defined by the following JSON rules:
    ${JSON.stringify(personaRules, null, 2)}
    
    You will be given a user's prompt and some relevant context from the brand's documents.
    Your task is to synthesize the information and generate a response that is helpful, accurate, and perfectly matches the brand's voice.
    Adhere strictly to the persona rules. Do not break character.`;

    const finalUserPrompt = `CONTEXT:
    ${context}
    
    USER PROMPT:
    ${user_prompt}`;

    // 5. Call OpenAI and stream the response
    console.log(`Generating content for brand: ${brand_id} with prompt: "${user_prompt.substring(0, 100)}..."`);
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: finalUserPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Create a robust ReadableStream for streaming the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
            
            // Handle completion
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
        'X-Accel-Buffering': 'no', // Disable Nginx buffering
      },
    });

  } catch (error) {
    console.error('Error in generate route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
