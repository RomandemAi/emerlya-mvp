// src/app/api/brand/chat/start/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

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

    const { brandId, title } = await req.json();

    if (!brandId) {
      return NextResponse.json(
        { ok: false, error: 'Missing brandId' },
        { status: 400 }
      );
    }

    // Validate brand ownership - RLS will automatically filter
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', brandId)
      .single();

    if (brandError || !brand) {
      return NextResponse.json(
        { ok: false, error: 'Brand not found or access denied' },
        { status: 403 }
      );
    }

    // Create new chat thread
    const { data: thread, error: threadError } = await supabase
      .from('brand_chat_threads')
      .insert({
        brand_id: brandId,
        title: title || 'New Conversation',
        created_by: session.user.id,
      })
      .select('id')
      .single();

    if (threadError) {
      console.error('Failed to create thread:', threadError);
      return NextResponse.json(
        { ok: false, error: 'Failed to create thread' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      threadId: thread.id
    });

  } catch (error: any) {
    console.error('Error in chat/start:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
