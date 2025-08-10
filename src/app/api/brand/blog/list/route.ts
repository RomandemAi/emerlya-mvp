import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brand_id');
    const status = searchParams.get('status'); // 'draft', 'published', or null for all
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!brandId) {
      return NextResponse.json({ 
        error: 'Missing required parameter: brand_id' 
      }, { status: 400 });
    }

    // Verify brand ownership
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id, name')
      .eq('id', brandId)
      .eq('profile_id', user.id)
      .single();

    if (brandError || !brand) {
      return NextResponse.json({ error: 'Brand not found or unauthorized' }, { status: 404 });
    }

    // Build query
    let query = supabase
      .from('brand_blog_posts')
      .select('*')
      .eq('brand_id', brandId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by status if provided
    if (status && (status === 'draft' || status === 'published')) {
      query = query.eq('status', status);
    }

    const { data: blogPosts, error: listError } = await query;

    if (listError) {
      console.error('Database query error:', listError);
      return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('brand_blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('brand_id', brandId);

    if (status && (status === 'draft' || status === 'published')) {
      countQuery = countQuery.eq('status', status);
    }

    const { count, error: countError } = await countQuery;

    return NextResponse.json({ 
      success: true, 
      blog_posts: blogPosts || [],
      pagination: {
        total: count || 0,
        limit,
        offset,
        has_more: (count || 0) > offset + limit
      }
    });

  } catch (error) {
    console.error('Blog list error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
