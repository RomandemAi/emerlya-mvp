import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    console.log('🔍 Debug test starting...');
    
    // Test 1: Environment variables
    const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
    const keyLength = process.env.OPENAI_API_KEY?.length || 0;
    const keyPrefix = process.env.OPENAI_API_KEY?.substring(0, 10) || 'none';
    
    console.log('🔍 OpenAI Key check:', { hasOpenAIKey, keyLength, keyPrefix });
    
    // Test 2: Supabase connection
    let supabaseWorks = false;
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getSession();
      supabaseWorks = !error;
      console.log('🔍 Supabase check:', { works: supabaseWorks, hasSession: !!data?.session });
    } catch (e) {
      console.error('🔍 Supabase error:', e);
    }
    
    // Test 3: Try simple OpenAI import
    let openaiImportWorks = false;
    try {
      const OpenAI = (await import('openai')).default;
      openaiImportWorks = true;
      console.log('🔍 OpenAI import works');
    } catch (e) {
      console.error('🔍 OpenAI import error:', e);
    }
    
    return NextResponse.json({
      success: true,
      debug: {
        openai: {
          hasKey: hasOpenAIKey,
          keyLength,
          keyPrefix,
          importWorks: openaiImportWorks
        },
        supabase: {
          connectionWorks: supabaseWorks
        },
        environment: {
          nodeEnv: process.env.NODE_ENV,
          netlify: !!process.env.NETLIFY,
          vercel: !!process.env.VERCEL
        }
      }
    });
    
  } catch (error: any) {
    console.error('🔍 Debug test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      debug: {
        errorName: error.name,
        errorStack: error.stack?.split('\n').slice(0, 5),
        errorString: error.toString()
      }
    }, { status: 500 });
  }
}
