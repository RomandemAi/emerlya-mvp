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
    
    // Test with a very simple, safe prompt - try DALL-E 3 first, fall back to DALL-E 2
    let response;
    let modelUsed;
    try {
      console.log('Testing DALL-E 3...');
      response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "a simple red circle on white background",
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "natural",
      });
      modelUsed = "dall-e-3";
    } catch (dalleError: any) {
      if (dalleError?.error?.code === 'model_not_found' || dalleError?.status === 403) {
        console.log('DALL-E 3 not available, trying DALL-E 2...');
        response = await openai.images.generate({
          model: "dall-e-2",
          prompt: "a simple red circle on white background",
          n: 1,
          size: "1024x1024",
        });
        modelUsed = "dall-e-2";
      } else {
        throw dalleError;
      }
    }

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
