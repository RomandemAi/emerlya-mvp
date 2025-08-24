import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function GET() {
  try {
    console.log('🔍 Testing DALL-E API connection...');
    
    const openai = getOpenAIClient();
    
    // Test DALL-E 3 (Tier 2 account with access)
    console.log('Testing DALL-E 3 (Tier 2 account)...');
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "a simple red circle on white background",
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural",
    });
    const modelUsed = "dall-e-3";

    console.log('✅ DALL-E test successful');
    
    return NextResponse.json({
      success: true,
      message: `DALL-E API is working correctly with ${modelUsed}`,
      modelUsed,
      imageGenerated: !!response.data?.[0]?.url,
      debugInfo: {
        hasApiKey: !!process.env.OPENAI_API_KEY,
        keyLength: process.env.OPENAI_API_KEY?.length || 0,
        responseDataLength: response.data?.length || 0
      }
    });

  } catch (error: any) {
    console.error('❌ DALL-E test failed:', {
      message: error?.message,
      code: error?.error?.code,
      type: error?.error?.type,
      status: error?.status,
      fullError: error
    });

    return NextResponse.json({
      success: false,
      error: error?.message || 'Unknown error',
      code: error?.error?.code,
      type: error?.error?.type,
      status: error?.status,
      debugInfo: {
        hasApiKey: !!process.env.OPENAI_API_KEY,
        keyLength: process.env.OPENAI_API_KEY?.length || 0
      }
    }, { status: 500 });
  }
}
