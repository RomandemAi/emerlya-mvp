import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { BlogPostUpdate } from '@/lib/types';

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { post_id, ...updateData } = body as BlogPostUpdate & { post_id: string };

    if (!post_id) {
      return NextResponse.json({ 
        error: 'Missing required field: post_id' 
      }, { status: 400 });
    }

    // First, verify the blog post exists and user owns the brand
    const { data: existingPost, error: fetchError } = await supabase
      .from('brand_blog_posts')
      .select(`
        id,
        brand_id,
        brands!inner(
          id,
          profile_id
        )
      `)
      .eq('id', post_id)
      .single();

    if (fetchError || !existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Check if user owns the brand
    if ((existingPost.brands as any).profile_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Prepare update data (only include defined fields)
    const cleanUpdateData: any = {};
    if (updateData.title !== undefined) cleanUpdateData.title = updateData.title;
    if (updateData.content !== undefined) cleanUpdateData.content = updateData.content;
    if (updateData.tags !== undefined) cleanUpdateData.tags = updateData.tags;
    if (updateData.status !== undefined) cleanUpdateData.status = updateData.status;
    if (updateData.seo_title !== undefined) cleanUpdateData.seo_title = updateData.seo_title;
    if (updateData.excerpt !== undefined) cleanUpdateData.excerpt = updateData.excerpt;

    if (Object.keys(cleanUpdateData).length === 0) {
      return NextResponse.json({ 
        error: 'No valid fields provided for update' 
      }, { status: 400 });
    }

    // Update the blog post
    const { data: updatedPost, error: updateError } = await supabase
      .from('brand_blog_posts')
      .update(cleanUpdateData)
      .eq('id', post_id)
      .select()
      .single();

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Blog post updated successfully',
      blog_post: updatedPost 
    });

  } catch (error) {
    console.error('Blog update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
