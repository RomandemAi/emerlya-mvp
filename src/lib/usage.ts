'use server';

import { createClient } from '@/lib/supabase/server';
import { UsageStats, TIER_LIMITS } from './usage-types';

export async function getCurrentUsage(userId: string): Promise<UsageStats | null> {
  try {
    const supabase = await createClient();
    
    // Get user's subscription status and word credits
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_status, word_credits')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      console.error('Failed to fetch user profile:', profileError);
      return null;
    }

    const subscriptionStatus = profile.subscription_status || 'free';
    const wordCredits = profile.word_credits || 0;
    const limits = TIER_LIMITS[subscriptionStatus] || TIER_LIMITS['free'];

    // Get current month's usage
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: analytics, error: analyticsError } = await supabase
      .from('user_analytics')
      .select('word_count')
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString());

    if (analyticsError) {
      console.error('Failed to fetch analytics:', analyticsError);
      return null;
    }

    // Calculate usage
    const wordsUsed = analytics
      ?.filter(record => record.word_count)
      .reduce((sum, record) => sum + (record.word_count || 0), 0) || 0;

    const contentPieces = analytics?.length || 0;

    // Calculate days remaining in month
    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    const daysRemaining = Math.ceil((endOfMonth.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    // Calculate available words (base limit + credits)
    const totalWordsAvailable = limits.words_per_month + wordCredits;
    const percentageUsed = Math.round((wordsUsed / totalWordsAvailable) * 100);
    const canGenerate = wordsUsed < totalWordsAvailable && contentPieces < limits.content_per_month;

    return {
      words_used: wordsUsed,
      content_pieces: contentPieces,
      words_limit: totalWordsAvailable, // Base limit + credits
      content_limit: limits.content_per_month,
      words_credits: wordCredits,
      subscription_status: subscriptionStatus,
      percentage_used: percentageUsed,
      can_generate: canGenerate,
      days_remaining: daysRemaining
    };

  } catch (error) {
    console.error('Usage tracking error:', error);
    return null;
  }
}

export async function checkUsageLimit(userId: string, wordCount: number): Promise<{
  allowed: boolean;
  reason?: string;
  usage?: UsageStats;
}> {
  try {
    const usage = await getCurrentUsage(userId);
    
    if (!usage) {
      return { allowed: false, reason: 'Unable to check usage limits' };
    }

    // Check if adding this content would exceed limits
    const newWordTotal = usage.words_used + wordCount;
    const newContentTotal = usage.content_pieces + 1;

    if (newWordTotal > usage.words_limit) {
      return {
        allowed: false,
        reason: `This would exceed your monthly word limit of ${usage.words_limit.toLocaleString()} words. You've used ${usage.words_used.toLocaleString()} words this month.`,
        usage
      };
    }

    if (newContentTotal > usage.content_limit) {
      return {
        allowed: false,
        reason: `This would exceed your monthly content limit of ${usage.content_limit} pieces. You've created ${usage.content_pieces} pieces this month.`,
        usage
      };
    }

    return { allowed: true, usage };

  } catch (error) {
    console.error('Usage limit check error:', error);
    return { allowed: false, reason: 'Unable to verify usage limits' };
  }
}
