'use server';

import { createClient } from '@/lib/supabase/server';

export interface AnalyticsEvent {
  user_id: string;
  brand_id?: string;
  event_type: 'content_generated' | 'blog_created' | 'chat_message' | 'brand_created';
  content_type?: 'post' | 'blog' | 'chat' | 'other';
  word_count?: number;
  tokens_used?: number;
  metadata?: Record<string, any>;
}

export async function trackAnalyticsEvent(event: AnalyticsEvent) {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('user_analytics')
      .insert({
        user_id: event.user_id,
        brand_id: event.brand_id,
        event_type: event.event_type,
        content_type: event.content_type,
        word_count: event.word_count,
        tokens_used: event.tokens_used,
        metadata: event.metadata,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Analytics tracking error:', error);
    }
  } catch (error) {
    console.error('Failed to track analytics:', error);
  }
}

export async function getAnalyticsData(userId: string) {
  try {
    const supabase = await createClient();
    
    // Get analytics for the last 90 days
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    const { data, error } = await supabase
      .from('user_analytics')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', ninetyDaysAgo.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch analytics:', error);
      return null;
    }

    // Process the data
    const totalWords = data
      .filter(event => event.word_count)
      .reduce((sum, event) => sum + (event.word_count || 0), 0);

    const totalContent = data.length;

    const brandProfiles = await getBrandCount(userId);

    // Calculate time saved (assuming 150 words per minute writing speed)
    const timeSavedMinutes = totalWords / 150;
    const timeSavedHours = timeSavedMinutes / 60;

    // Get weekly activity
    const weeklyActivity = getWeeklyActivity(data);

    // Get popular content types
    const contentTypes = getContentTypeStats(data);

    return {
      totalWords,
      totalContent,
      brandProfiles,
      timeSavedHours,
      weeklyActivity,
      contentTypes
    };

  } catch (error) {
    console.error('Analytics data error:', error);
    return null;
  }
}

async function getBrandCount(userId: string) {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from('brands')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  return count || 0;
}

function getWeeklyActivity(data: any[]) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activity = days.map(day => ({ day, words: 0 }));

  data.forEach(event => {
    if (event.word_count && event.created_at) {
      const date = new Date(event.created_at);
      const dayIndex = (date.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
      activity[dayIndex].words += event.word_count;
    }
  });

  return activity;
}

function getContentTypeStats(data: any[]) {
  const types: Record<string, number> = {};
  
  data.forEach(event => {
    const type = event.content_type || 'other';
    types[type] = (types[type] || 0) + 1;
  });

  return Object.entries(types).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
    percentage: Math.round((count / data.length) * 100)
  }));
}
