import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Test OpenAI connection
function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function GET(req: NextRequest) {
  try {
    console.log('🔍 Testing OpenAI connection...');
    
    // Check API key
    const hasKey = !!process.env.OPENAI_API_KEY;
    const keyLength = process.env.OPENAI_API_KEY?.length || 0;
    const keyPrefix = process.env.OPENAI_API_KEY?.substring(0, 7) || 'none';
    
    console.log('🔍 API Key info:', { hasKey, keyLength, keyPrefix });
    
    if (!hasKey) {
      return NextResponse.json({
        success: false,
        error: 'No OpenAI API key found',
        debug: { hasKey, keyLength, keyPrefix }
      });
    }
    
    // Test OpenAI client
    const openai = getOpenAIClient();
    
    // Try a simple models list call
    const models = await openai.models.list();
    const hasDALLE3 = models.data.some(model => model.id === 'dall-e-3');
    
    return NextResponse.json({
      success: true,
      message: 'OpenAI connection works',
      debug: {
        hasKey,
        keyLength,
        keyPrefix,
        modelsCount: models.data.length,
        hasDALLE3,
        someModels: models.data.slice(0, 5).map(m => m.id)
      }
    });
    
  } catch (error: any) {
    console.error('❌ OpenAI test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      debug: {
        errorType: error.constructor.name,
        errorCode: error.code,
        errorStatus: error.status
      }
    }, { status: 500 });
  }
}
