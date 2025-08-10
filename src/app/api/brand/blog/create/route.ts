import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { BlogPostCreate } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: BlogPostCreate = await request.json();
    const { brand_id, title, content, topic, tags = [], status = 'draft', author_type, seo_title, excerpt } = body;

    if (!brand_id || !title) {
      return NextResponse.json({ 
        error: 'Missing required fields: brand_id and title are required' 
      }, { status: 400 });
    }

    // Verify brand ownership
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id, name')
      .eq('id', brand_id)
      .eq('profile_id', user.id)
      .single();

    if (brandError || !brand) {
      return NextResponse.json({ error: 'Brand not found or unauthorized' }, { status: 404 });
    }

    let finalContent = content;
    let finalAuthorType = author_type || 'manual';
    let finalTags = tags;
    let finalSeoTitle = seo_title || title;

    // For now, require content to be provided (AI generation will be added later)
    if (!finalContent) {
      return NextResponse.json({ 
        error: 'Content is required. AI generation feature coming soon.' 
      }, { status: 400 });
    }

    // Insert the blog post
    const { data: blogPost, error: insertError } = await supabase
      .from('brand_blog_posts')
      .insert({
        brand_id,
        title,
        content: finalContent,
        excerpt,
        tags: finalTags,
        status,
        author_type: finalAuthorType,
        topic,
        seo_title: finalSeoTitle
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      blog_post: blogPost 
    });

  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
