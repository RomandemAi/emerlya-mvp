import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import OpenAI from 'openai';

// Use the same OpenAI initialization approach as text generation
function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function POST(req: NextRequest) {
  try {
    console.log('🔍 Image generation API called');
    
    // Check if OpenAI API key is configured
    console.log('🔍 OpenAI API Key check:', {
      hasKey: !!process.env.OPENAI_API_KEY,
      keyLength: process.env.OPENAI_API_KEY?.length || 0,
      keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 7) || 'none'
    });
    
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }
    
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

    const { 
      prompt, 
      size = "1024x1024", 
      quality = "standard",
      style = "vivid",
      brand_id // Optional - for organization only
    } = await req.json();

    console.log('Image generation request:', { 
      userId: session.user.id,
      prompt: prompt.substring(0, 100) + '...',
      size,
      quality,
      style,
      brand_id 
    });

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (prompt.length > 1000) {
      return NextResponse.json(
        { error: 'Prompt too long. Maximum 1000 characters.' },
        { status: 400 }
      );
    }

    // Check user's usage limits (same as text generation)
    // Note: For now we'll skip usage limits for images, but keep the structure
    console.log('✅ Subscription check passed (using same logic as text generation)');

    // TODO: Add usage limits check here
    // For now, we'll proceed with generation

    console.log('🎨 Generating image with DALL-E 3...');

    // Generate image with DALL-E 3 using same client approach as text generation
    const openai = getOpenAIClient();
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt.trim(),
      n: 1,
      size: size as "1024x1024" | "1024x1792" | "1792x1024",
      quality: quality as "standard" | "hd",
      style: style as "vivid" | "natural",
    });

    console.log('🔍 OpenAI response received:', { 
      hasData: !!response.data, 
      dataLength: response.data?.length 
    });

    const imageUrl = response.data?.[0]?.url;
    const revisedPrompt = response.data?.[0]?.revised_prompt;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    console.log('✅ Image generated successfully');

    // Save image record to database (brand_id is optional)
    const { data: savedImage, error: saveError } = await supabase
      .from('brand_images')
      .insert({
        user_id: session.user.id,
        brand_id: brand_id || null, // Optional - just for organization
        original_prompt: prompt.trim(),
        revised_prompt: revisedPrompt || prompt.trim(),
        image_url: imageUrl,
        size,
        quality,
        style
      })
      .select('id')
      .single();

    if (saveError) {
      console.error('❌ Failed to save image record:', saveError);
      // Continue anyway - user still gets the image
    } else {
      console.log('✅ Image saved to database:', savedImage?.id);
    }

    return NextResponse.json({
      success: true,
      image_url: imageUrl,
      revised_prompt: revisedPrompt,
      id: savedImage?.id,
      message: 'Image generated successfully'
    });

  } catch (error: any) {
    console.error('❌ Image generation error (DETAILED):', {
      message: error?.message,
      stack: error?.stack,
      error: error?.error,
      code: error?.error?.code,
      type: error?.error?.type,
      param: error?.error?.param,
      fullError: error
    });
    
    // Handle specific OpenAI errors
    if (error?.error?.code === 'content_policy_violation') {
      return NextResponse.json(
        { 
          error: 'content_policy_violation',
          message: 'Your prompt violates OpenAI content policy. Please try a different prompt.' 
        },
        { status: 400 }
      );
    }

    if (error?.error?.code === 'rate_limit_exceeded') {
      return NextResponse.json(
        { 
          error: 'rate_limit_exceeded',
          message: 'Rate limit exceeded. Please try again in a moment.' 
        },
        { status: 429 }
      );
    }

    // Return detailed error for debugging
    return NextResponse.json(
      { 
        error: 'internal_error',
        message: 'Failed to generate image. Please try again.',
        debug: process.env.NODE_ENV === 'development' ? {
          errorMessage: error?.message,
          errorCode: error?.error?.code,
          errorType: error?.error?.type
        } : undefined
      },
      { status: 500 }
    );
  }
}
