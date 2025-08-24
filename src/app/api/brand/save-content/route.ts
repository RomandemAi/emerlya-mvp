import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { brand_id, title, content, type = 'generated' } = await req.json();

    console.log('Save content request:', { brand_id, title: title?.substring(0, 50), contentLength: content?.length, type });

    if (!brand_id || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: brand_id, title, content' },
        { status: 400 }
      );
    }

    // Verify the brand belongs to the user (RLS will handle this)
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', brand_id)
      .single();

    if (brandError || !brand) {
      return NextResponse.json(
        { error: 'Brand not found or access denied' },
        { status: 404 }
      );
    }

    // Save the generated content to brand_drafts table
    const { data: savedContent, error: saveError } = await supabase
      .from('brand_drafts')
      .insert({
        brand_id,
        title: title.trim(),
        content: content.trim(),
        type
      })
      .select('id')
      .single();

    if (saveError) {
      console.error('Error saving content:', saveError);
      console.error('Save error details:', {
        message: saveError.message,
        details: saveError.details,
        hint: saveError.hint,
        code: saveError.code
      });
      return NextResponse.json(
        { 
          error: 'Failed to save content',
          details: saveError.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: savedContent.id,
      message: 'Content saved successfully'
    });

  } catch (error) {
    console.error('Save content API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
