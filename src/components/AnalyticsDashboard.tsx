'use client';

import { useState, useEffect } from 'react';
import { 
  ModernChartIcon, 
  ModernSparklesIcon, 
  ModernDocumentIcon,
  ModernStarIcon,
  ModernUsersIcon 
} from './ModernIcons';

interface AnalyticsData {
  totalWords: number;
  totalContent: number;
  brandsCount: number;
  recentActivity: number;
  topContentTypes: { type: string; count: number; percentage: number }[];
  weeklyStats: { day: string; words: number; content: number }[];
  monthlyGrowth: number;
  timesSaved: number; // hours saved vs manual content creation
}

interface AnalyticsDashboardProps {
  userId?: string;
  timeRange?: '7d' | '30d' | '90d';
}

export default function AnalyticsDashboard({ userId, timeRange = '30d' }: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState(timeRange);

  // Fetch real analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      
      try {
        const response = await fetch('/api/analytics');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            const apiData = result.data;
            
            const realData: AnalyticsData = {
              totalWords: apiData.totalWords,
              totalContent: apiData.totalContent,
              brandsCount: apiData.brandProfiles,
              recentActivity: apiData.totalContent,
              topContentTypes: apiData.contentTypes || [],
              weeklyStats: apiData.weeklyActivity.map((day: any) => ({
                day: day.day,
                words: day.words,
                content: Math.ceil(day.words / 100) // Estimate content pieces from words
              })),
              monthlyGrowth: 0, // Could calculate from historical data later
              timesSaved: Math.round(apiData.timeSavedHours * 10) / 10
            };
            
            setData(realData);
          } else {
            // Fallback to default data if API fails
            setData({
              totalWords: 0,
              totalContent: 0,
              brandsCount: 0,
              recentActivity: 0,
              topContentTypes: [],
              weeklyStats: [
                { day: 'Mon', words: 0, content: 0 },
                { day: 'Tue', words: 0, content: 0 },
                { day: 'Wed', words: 0, content: 0 },
                { day: 'Thu', words: 0, content: 0 },
                { day: 'Fri', words: 0, content: 0 },
                { day: 'Sat', words: 0, content: 0 },
                { day: 'Sun', words: 0, content: 0 }
              ],
              monthlyGrowth: 0,
              timesSaved: 0
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        // Set empty data on error
        setData({
          totalWords: 0,
          totalContent: 0,
          brandsCount: 0,
          recentActivity: 0,
          topContentTypes: [],
          weeklyStats: [
            { day: 'Mon', words: 0, content: 0 },
            { day: 'Tue', words: 0, content: 0 },
            { day: 'Wed', words: 0, content: 0 },
            { day: 'Thu', words: 0, content: 0 },
            { day: 'Fri', words: 0, content: 0 },
            { day: 'Sat', words: 0, content: 0 },
            { day: 'Sun', words: 0, content: 0 }
          ],
          monthlyGrowth: 0,
          timesSaved: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedRange, userId]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const maxWords = Math.max(...data.weeklyStats.map(d => d.words));

  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ModernChartIcon size="md" />
          <h2 className="text-lg font-semibold text-gray-900">Analytics Overview</h2>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex bg-gray-100 rounded-md p-0.5">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                selectedRange === range
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range === '7d' ? '7d' : range === '30d' ? '30d' : '90d'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {/* Total Words */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
          <div className="flex items-center justify-between mb-1">
            <ModernDocumentIcon size="xs" />
            <span className="text-xs font-medium text-blue-600 bg-blue-200 px-1.5 py-0.5 rounded-full">
              +{data.monthlyGrowth}%
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">{data.totalWords.toLocaleString()}</h3>
          <p className="text-xs text-gray-600">Words Generated</p>
        </div>

        {/* Total Content */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
          <div className="flex items-center justify-between mb-1">
            <ModernSparklesIcon size="xs" />
            <span className="text-xs font-medium text-green-600 bg-green-200 px-1.5 py-0.5 rounded-full">
              {data.recentActivity} today
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">{data.totalContent}</h3>
          <p className="text-xs text-gray-600">Content Pieces</p>
        </div>

        {/* Active Brands */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
          <div className="flex items-center justify-between mb-1">
            <ModernStarIcon size="xs" />
            <span className="text-xs font-medium text-purple-600 bg-purple-200 px-1.5 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">{data.brandsCount}</h3>
          <p className="text-xs text-gray-600">Brand Profiles</p>
        </div>

        {/* Time Saved */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
          <div className="flex items-center justify-between mb-1">
            <ModernUsersIcon size="xs" />
            <span className="text-xs font-medium text-orange-600 bg-orange-200 px-1.5 py-0.5 rounded-full">
              ROI
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">{data.timesSaved}h</h3>
          <p className="text-xs text-gray-600">Time Saved</p>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Weekly Activity</h3>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-end justify-between h-24 space-x-1">
            {data.weeklyStats.map((day, index) => (
              <div key={day.day} className="flex flex-col items-center flex-1">
                <div className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all duration-500 delay-100"
                    style={{ 
                      height: `${(day.words / maxWords) * 80}px`,
                      minHeight: '3px'
                    }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-600 mt-1">{day.day}</span>
                <span className="text-xs text-gray-500">{day.words}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Content Types */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">Popular Content Types</h3>
        <div className="space-y-2">
          {data.topContentTypes.map((item, index) => (
            <div key={item.type} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-green-500' :
                  index === 2 ? 'bg-purple-500' :
                  index === 3 ? 'bg-orange-500' : 'bg-gray-500'
                }`}></div>
                <span className="text-sm font-medium text-gray-900">{item.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600">{item.count}</span>
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-purple-500' :
                      index === 3 ? 'bg-orange-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-900 w-8 text-right">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
