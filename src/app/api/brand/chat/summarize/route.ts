// src/app/api/brand/chat/summarize/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../../lib/supabase/server';
import { openai } from '../../../../../lib/openai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Environment variables for model configuration
const MODEL_SUMMARY = process.env.MODEL_SUMMARY || 'gpt-4o';

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

    const { threadId } = await req.json();

    if (!threadId) {
      return NextResponse.json(
        { ok: false, error: 'Missing threadId' },
        { status: 400 }
      );
    }

    // Validate thread access via RLS
    const { data: thread, error: threadError } = await supabase
      .from('brand_chat_threads')
      .select('id, brand_id')
      .eq('id', threadId)
      .single();

    if (threadError || !thread) {
      return NextResponse.json(
        { ok: false, error: 'Thread not found or access denied' },
        { status: 403 }
      );
    }

    // Fetch all messages from the thread in chronological order
    const { data: messages, error: messagesError } = await supabase
      .from('brand_chat_messages')
      .select('id, role, content, created_at')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error('Failed to fetch messages:', messagesError);
      return NextResponse.json(
        { ok: false, error: 'Failed to fetch thread messages' },
        { status: 500 }
      );
    }

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'No messages found in thread' },
        { status: 400 }
      );
    }

    // Build conversation text for summarization
    let conversationText = '';
    messages.forEach(msg => {
      const roleLabel = msg.role === 'user' ? 'Human' : 'Assistant';
      conversationText += `${roleLabel}: ${msg.content}\n\n`;
    });

    // Create summary using OpenAI
    const summaryPrompt = `Please create a concise summary of the following conversation. The summary should:
- Be no more than 250 words
- Capture the key topics discussed
- Preserve important decisions or conclusions
- Maintain the overall tone and context
- Focus on actionable insights and brand-relevant information

Conversation:
${conversationText}

Summary:`;

    console.log(`🤖 Creating summary for thread ${threadId} with ${MODEL_SUMMARY}`);

    const completion = await openai.chat.completions.create({
      model: MODEL_SUMMARY,
      messages: [
        {
          role: 'system',
          content: 'You are an expert at creating concise, informative conversation summaries. Focus on key decisions, brand insights, and actionable information.'
        },
        {
          role: 'user',
          content: summaryPrompt
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent summaries
      max_tokens: 400, // Roughly 250-300 words
    });

    const summary = completion.choices[0]?.message?.content || '';

    if (!summary) {
      return NextResponse.json(
        { ok: false, error: 'Failed to generate summary' },
        { status: 500 }
      );
    }

    // Get the last message ID for reference
    const lastMessageId = messages[messages.length - 1].id;

    // Upsert summary into brand_chat_summaries
    const { error: summaryError } = await supabase
      .from('brand_chat_summaries')
      .upsert({
        thread_id: threadId,
        summary: summary.trim(),
        last_message_id: lastMessageId,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'thread_id'
      });

    if (summaryError) {
      console.error('Failed to save summary:', summaryError);
      return NextResponse.json(
        { ok: false, error: 'Failed to save summary' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      summary: summary.trim(),
      messageCount: messages.length,
      lastMessageId
    });

  } catch (error: any) {
    console.error('Error in chat/summarize:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
