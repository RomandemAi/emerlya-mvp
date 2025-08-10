import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../../lib/supabase/server';
import { getAuthenticatedUser } from '../../../../../lib/supabase/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ brandId: string }> }
) {
  try {
    const supabase = await createClient();
    
    // Get the current user using safe auth check
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { error: 'You must be logged in to view documents' },
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const { brandId } = resolvedParams;

    if (!brandId) {
      return NextResponse.json(
        { error: 'Brand ID is required' },
        { status: 400 }
      );
    }

    // First verify that the user owns this brand
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', brandId)
      .eq('profile_id', user.id)
      .single();

    if (brandError || !brand) {
      return NextResponse.json(
        { error: 'Brand not found or access denied' },
        { status: 404 }
      );
    }

    // Fetch documents for this brand
    const { data: documents, error: documentsError } = await supabase
      .from('documents')
      .select('id, content, status, created_at')
      .eq('brand_id', brandId)
      .order('created_at', { ascending: false });

    if (documentsError) {
      console.error('Error fetching documents:', documentsError);
      return NextResponse.json(
        { error: 'Failed to fetch documents' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      documents: documents || [],
      count: documents?.length || 0
    });

  } catch (error) {
    console.error('Documents API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
