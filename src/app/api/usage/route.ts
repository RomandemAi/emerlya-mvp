import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUsage } from '@/lib/usage';
import { TIER_LIMITS } from '@/lib/usage-types';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const usage = await getCurrentUsage(session.user.id);

    if (!usage) {
      return NextResponse.json(
        { error: 'Failed to fetch usage data' },
        { status: 500 }
      );
    }

    // Add tier information
    const tierInfo = TIER_LIMITS[usage.subscription_status] || TIER_LIMITS['free'];

    return NextResponse.json({
      success: true,
      data: {
        ...usage,
        tier_features: tierInfo.features,
        all_tiers: TIER_LIMITS
      }
    });

  } catch (error) {
    console.error('Usage API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
