import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
    console.log('🧪 Simple image test endpoint called');
    
    const supabase = await createClient();
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();
    console.log('🔍 Session check:', session ? 'authenticated' : 'not authenticated');
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if brand_images table exists
    const { data: tableCheck, error: tableError } = await supabase
      .from('brand_images')
      .select('id')
      .limit(1);

    console.log('🔍 Table check:', { 
      hasData: !!tableCheck, 
      error: tableError?.message,
      tableExists: !tableError 
    });

    // Check OpenAI API key
    const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
    console.log('🔍 OpenAI key check:', { 
      hasKey: hasOpenAIKey,
      keyLength: process.env.OPENAI_API_KEY?.length || 0 
    });

    return NextResponse.json({
      success: true,
      session: !!session,
      tableExists: !tableError,
      hasOpenAIKey,
      message: 'Test completed successfully'
    });

  } catch (error: any) {
    console.error('❌ Test error:', error);
    return NextResponse.json(
      { 
        error: 'test_failed',
        message: error?.message || 'Test failed'
      },
      { status: 500 }
    );
  }
}
