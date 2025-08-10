import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { post_id } = body;

    if (!post_id) {
      return NextResponse.json({ 
        error: 'Missing required field: post_id' 
      }, { status: 400 });
    }

    // First, verify the blog post exists and user owns the brand
    const { data: blogPost, error: fetchError } = await supabase
      .from('brand_blog_posts')
      .select(`
        id,
        brand_id,
        title,
        status,
        brands!inner(
          id,
          profile_id
        )
      `)
      .eq('id', post_id)
      .single();

    if (fetchError || !blogPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Check if user owns the brand
    if ((blogPost.brands as any).profile_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Check if already published
    if (blogPost.status === 'published') {
      return NextResponse.json({ 
        success: true, 
        message: 'Blog post is already published',
        blog_post: blogPost 
      });
    }

    // Update the status to published
    const { data: updatedPost, error: updateError } = await supabase
      .from('brand_blog_posts')
      .update({ status: 'published' })
      .eq('id', post_id)
      .select()
      .single();

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json({ error: 'Failed to publish blog post' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Blog post published successfully',
      blog_post: updatedPost 
    });

  } catch (error) {
    console.error('Blog publish error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
