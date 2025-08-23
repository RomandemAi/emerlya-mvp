import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check if api_keys table exists
    const { data: tableExists, error: tableError } = await supabase
      .from('api_keys')
      .select('count(*)', { count: 'exact', head: true });
    
    if (tableError) {
      return NextResponse.json({
        success: false,
        error: 'api_keys table does not exist or has issues',
        details: tableError.message,
        code: tableError.code
      });
    }
    
    // Get session info
    const { data: { session } } = await supabase.auth.getSession();
    
    return NextResponse.json({
      success: true,
      tableExists: true,
      hasSession: !!session,
      userId: session?.user?.id || null,
      userEmail: session?.user?.email || null
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
