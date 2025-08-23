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

  // Mock data for now - will be replaced with real API calls
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const mockData: AnalyticsData = {
          totalWords: 45230,
          totalContent: 127,
          brandsCount: 8,
          recentActivity: 12,
          topContentTypes: [
            { type: 'Blog Posts', count: 34, percentage: 27 },
            { type: 'Social Media', count: 28, percentage: 22 },
            { type: 'Email Campaigns', count: 25, percentage: 20 },
            { type: 'Product Descriptions', count: 22, percentage: 17 },
            { type: 'Ad Copy', count: 18, percentage: 14 }
          ],
          weeklyStats: [
            { day: 'Mon', words: 2340, content: 6 },
            { day: 'Tue', words: 1890, content: 4 },
            { day: 'Wed', words: 3200, content: 8 },
            { day: 'Thu', words: 2750, content: 7 },
            { day: 'Fri', words: 2980, content: 9 },
            { day: 'Sat', words: 1200, content: 3 },
            { day: 'Sun', words: 890, content: 2 }
          ],
          monthlyGrowth: 23.5,
          timesSaved: 76.5
        };
        setData(mockData);
        setLoading(false);
      }, 800);
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
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <ModernChartIcon size="lg" />
          <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                selectedRange === range
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Words */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <ModernDocumentIcon size="sm" />
            <span className="text-xs font-medium text-blue-600 bg-blue-200 px-2 py-1 rounded-full">
              +{data.monthlyGrowth}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{data.totalWords.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Words Generated</p>
        </div>

        {/* Total Content */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <ModernSparklesIcon size="sm" />
            <span className="text-xs font-medium text-green-600 bg-green-200 px-2 py-1 rounded-full">
              {data.recentActivity} today
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{data.totalContent}</h3>
          <p className="text-sm text-gray-600">Content Pieces</p>
        </div>

        {/* Active Brands */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <ModernStarIcon size="sm" />
            <span className="text-xs font-medium text-purple-600 bg-purple-200 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{data.brandsCount}</h3>
          <p className="text-sm text-gray-600">Brand Profiles</p>
        </div>

        {/* Time Saved */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <ModernUsersIcon size="sm" />
            <span className="text-xs font-medium text-orange-600 bg-orange-200 px-2 py-1 rounded-full">
              ROI
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{data.timesSaved}h</h3>
          <p className="text-sm text-gray-600">Time Saved</p>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-end justify-between h-32 space-x-2">
            {data.weeklyStats.map((day, index) => (
              <div key={day.day} className="flex flex-col items-center flex-1">
                <div className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all duration-500 delay-100"
                    style={{ 
                      height: `${(day.words / maxWords) * 100}px`,
                      minHeight: '4px'
                    }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-600 mt-2">{day.day}</span>
                <span className="text-xs text-gray-500">{day.words}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Content Types */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Content Types</h3>
        <div className="space-y-3">
          {data.topContentTypes.map((item, index) => (
            <div key={item.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-green-500' :
                  index === 2 ? 'bg-purple-500' :
                  index === 3 ? 'bg-orange-500' : 'bg-gray-500'
                }`}></div>
                <span className="font-medium text-gray-900">{item.type}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">{item.count} pieces</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-purple-500' :
                      index === 3 ? 'bg-orange-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-10 text-right">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
