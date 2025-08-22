// src/app/api/brand/chat/send/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../../lib/supabase/server';
import { openai } from '../../../../../lib/openai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Environment variables for model configuration
const MODEL_CHAT = process.env.MODEL_CHAT || 'gpt-4o';
const MODEL_SUMMARY = process.env.MODEL_SUMMARY || 'gpt-4o';
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'text-embedding-3-small';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { 
      brandId, 
      threadId, 
      userMessage, 
      type = 'post', 
      wordCount = 120 
    } = await req.json();

    if (!brandId || !threadId || !userMessage) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields: brandId, threadId, userMessage' },
        { status: 400 }
      );
    }

    // Validate thread belongs to user's brand (RLS will filter)
    const { data: thread, error: threadError } = await supabase
      .from('brand_chat_threads')
      .select('id, brand_id')
      .eq('id', threadId)
      .eq('brand_id', brandId)
      .single();

    if (threadError || !thread) {
      return NextResponse.json(
        { ok: false, error: 'Thread not found or access denied' },
        { status: 403 }
      );
    }

    // Step 1: Insert user message
    const { data: userMsg, error: userMsgError } = await supabase
      .from('brand_chat_messages')
      .insert({
        thread_id: threadId,
        brand_id: brandId,
        role: 'user',
        content: userMessage,
        model: null, // User messages don't have a model
        tokens: null,
        metadata: { type, wordCount },
        is_pinned: false,
        is_training: true
      })
      .select('id')
      .single();

    if (userMsgError) {
      console.error('Failed to insert user message:', userMsgError);
      return NextResponse.json(
        { ok: false, error: 'Failed to save user message' },
        { status: 500 }
      );
    }

    // Step 2: Fetch context in parallel
    const [
      brandResult,
      memoryResult,
      summaryResult,
      pinnedResult,
      recentResult
    ] = await Promise.all([
      // Brand persona config
      supabase
        .from('brands')
        .select('persona_config_json')
        .eq('id', brandId)
        .single(),
      
      // Brand memory (ordered by importance)
      supabase
        .from('brand_memory')
        .select('key, value, importance')
        .eq('brand_id', brandId)
        .order('importance', { ascending: false })
        .limit(10),
      
      // Thread summary
      supabase
        .from('brand_chat_summaries')
        .select('summary')
        .eq('thread_id', threadId)
        .single(),
      
      // Pinned messages in this thread
      supabase
        .from('brand_chat_messages')
        .select('role, content')
        .eq('thread_id', threadId)
        .eq('is_pinned', true)
        .order('created_at', { ascending: true }),
      
      // Last 15 recent messages (excluding the one we just inserted)
      supabase
        .from('brand_chat_messages')
        .select('role, content')
        .eq('thread_id', threadId)
        .neq('id', userMsg.id)
        .order('created_at', { ascending: false })
        .limit(15)
    ]);

    // Step 3: Build system prompt
    let systemPrompt = `You are an AI assistant for a specific brand. Generate content that matches the brand's voice, tone, and personality.`;

    // Add brand persona if available
    if (brandResult.data?.persona_config_json) {
      systemPrompt += `\n\nBRAND PERSONALITY:\n${JSON.stringify(brandResult.data.persona_config_json, null, 2)}`;
    }

    // Add brand memory
    if (memoryResult.data && memoryResult.data.length > 0) {
      systemPrompt += `\n\nBRAND MEMORY (Key Facts):`;
      memoryResult.data.forEach(memory => {
        systemPrompt += `\n- ${memory.key}: ${memory.value} (importance: ${memory.importance})`;
      });
    }

    // Add content generation guidelines
    systemPrompt += `\n\nCONTENT GUIDELINES:
- Content Type: ${type}
- Target Length: ${wordCount} words
- Stay true to the brand's voice and personality
- Use the brand memory to inform your responses
- Be helpful, accurate, and engaging`;

    // Step 4: Build conversation messages
    const messages: any[] = [{ role: 'system', content: systemPrompt }];

    // Add summary if available
    if (summaryResult.data?.summary) {
      messages.push({
        role: 'system',
        content: `PREVIOUS CONVERSATION SUMMARY:\n${summaryResult.data.summary}`
      });
    }

    // Add pinned messages
    if (pinnedResult.data && pinnedResult.data.length > 0) {
      pinnedResult.data.forEach(msg => {
        messages.push({ role: msg.role, content: msg.content });
      });
    }

    // Add recent messages (reverse to chronological order)
    if (recentResult.data && recentResult.data.length > 0) {
      const recentMessages = recentResult.data.reverse();
      recentMessages.forEach(msg => {
        messages.push({ role: msg.role, content: msg.content });
      });
    }

    // Add current user message
    messages.push({ role: 'user', content: userMessage });

    // Step 5: Call OpenAI
    console.log(`🤖 Calling OpenAI with ${MODEL_CHAT} for thread ${threadId}`);
    
    const completion = await openai.chat.completions.create({
      model: MODEL_CHAT,
      messages,
      temperature: 0.6,
      max_tokens: Math.min(2000, wordCount * 4),
      stream: false // We need the full response to save and create embeddings
    });

    const assistantContent = completion.choices[0]?.message?.content || '';
    const tokensUsed = completion.usage?.total_tokens || 0;

    if (!assistantContent) {
      return NextResponse.json(
        { ok: false, error: 'No response generated' },
        { status: 500 }
      );
    }

    // Step 6: Save assistant reply
    const { data: assistantMsg, error: assistantMsgError } = await supabase
      .from('brand_chat_messages')
      .insert({
        thread_id: threadId,
        brand_id: brandId,
        role: 'assistant',
        content: assistantContent,
        model: MODEL_CHAT,
        tokens: tokensUsed,
        metadata: { type, wordCount },
        is_pinned: false,
        is_training: true
      })
      .select('id')
      .single();

    if (assistantMsgError) {
      console.error('Failed to insert assistant message:', assistantMsgError);
      return NextResponse.json(
        { ok: false, error: 'Failed to save assistant message' },
        { status: 500 }
      );
    }

    // Step 7: Create embeddings for both messages
    try {
      const [userEmbedding, assistantEmbedding] = await Promise.all([
        openai.embeddings.create({
          model: EMBEDDING_MODEL,
          input: userMessage,
        }),
        openai.embeddings.create({
          model: EMBEDDING_MODEL,
          input: assistantContent,
        })
      ]);

      // Insert embeddings in batch
      const { error: embeddingError } = await supabase
        .from('brand_chat_embeddings')
        .insert([
          {
            brand_id: brandId,
            thread_id: threadId,
            message_id: userMsg.id,
            embedding: userEmbedding.data[0].embedding
          },
          {
            brand_id: brandId,
            thread_id: threadId,
            message_id: assistantMsg.id,
            embedding: assistantEmbedding.data[0].embedding
          }
        ]);

      if (embeddingError) {
        console.error('Failed to insert embeddings:', embeddingError);
        // Don't fail the request, just log the error
      }
    } catch (embeddingError) {
      console.error('Error creating embeddings:', embeddingError);
      // Don't fail the request, embeddings are optional
    }

    // Step 8: Update thread timestamp
    await supabase
      .from('brand_chat_threads')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', threadId);

    return NextResponse.json({
      ok: true,
      content: assistantContent,
      tokensUsed,
      messageId: assistantMsg.id
    });

  } catch (error: any) {
    console.error('Error in chat/send:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
