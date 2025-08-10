import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function DELETE(request: NextRequest) {
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

    // Delete the blog post
    const { error: deleteError } = await supabase
      .from('brand_blog_posts')
      .delete()
      .eq('id', post_id);

    if (deleteError) {
      console.error('Database delete error:', deleteError);
      return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Blog post deleted successfully'
    });

  } catch (error) {
    console.error('Blog delete error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
