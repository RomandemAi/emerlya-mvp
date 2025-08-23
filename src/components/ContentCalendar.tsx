'use client';

import { useState, useEffect } from 'react';
import { 
  ModernSparklesIcon, 
  ModernDocumentIcon,
  ModernSettingsIcon,
  ModernStarIcon 
} from './ModernIcons';

interface ContentItem {
  id: string;
  title: string;
  type: 'blog' | 'social' | 'email' | 'ad' | 'product';
  status: 'scheduled' | 'draft' | 'review' | 'published';
  brand: string;
  date: Date;
  wordCount?: number;
  assignee?: string;
}

interface ContentCalendarProps {
  userId?: string;
  brandId?: string;
}

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
  draft: 'bg-gray-100 text-gray-800 border-gray-200',
  review: 'bg-orange-100 text-orange-800 border-orange-200',
  published: 'bg-green-100 text-green-800 border-green-200'
};

const typeIcons = {
  blog: '📝',
  social: '📱',
  email: '📧',
  ad: '🎯',
  product: '🛍️'
};

export default function ContentCalendar({ userId, brandId }: ContentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockContent: ContentItem[] = [
      {
        id: '1',
        title: 'Q4 Product Launch Blog Post',
        type: 'blog',
        status: 'scheduled',
        brand: 'TechFlow',
        date: new Date(2025, 7, 25), // August 25, 2025
        wordCount: 1200,
        assignee: 'Sarah M.'
      },
      {
        id: '2',
        title: 'Instagram Product Showcase',
        type: 'social',
        status: 'draft',
        brand: 'EcoLife',
        date: new Date(2025, 7, 27), // August 27, 2025
        wordCount: 150
      },
      {
        id: '3',
        title: 'Newsletter: Summer Sale',
        type: 'email',
        status: 'review',
        brand: 'CraftBrew',
        date: new Date(2025, 7, 30), // August 30, 2025
        wordCount: 800,
        assignee: 'Mike K.'
      },
      {
        id: '4',
        title: 'Facebook Ad Campaign',
        type: 'ad',
        status: 'published',
        brand: 'FinanceForward',
        date: new Date(2025, 7, 22), // August 22, 2025
        wordCount: 100
      }
    ];
    setContentItems(mockContent);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getContentForDate = (date: Date | null) => {
    if (!date) return [];
    return contentItems.filter(item => 
      item.date.toDateString() === date.toDateString()
    );
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const ScheduleModal = () => {
    const [newContent, setNewContent] = useState({
      title: '',
      type: 'blog' as ContentItem['type'],
      brand: '',
      date: selectedDate || new Date(),
      status: 'scheduled' as ContentItem['status']
    });

    const handleSchedule = () => {
      const newItem: ContentItem = {
        id: Date.now().toString(),
        ...newContent,
        wordCount: 0
      };
      setContentItems(prev => [...prev, newItem]);
      setShowScheduleModal(false);
      setNewContent({
        title: '',
        type: 'blog',
        brand: '',
        date: selectedDate || new Date(),
        status: 'scheduled'
      });
    };

    if (!showScheduleModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Schedule Content</h3>
            <button
              onClick={() => setShowScheduleModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newContent.title}
                onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Content title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={newContent.type}
                onChange={(e) => setNewContent(prev => ({ ...prev, type: e.target.value as ContentItem['type'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="blog">Blog Post</option>
                <option value="social">Social Media</option>
                <option value="email">Email Campaign</option>
                <option value="ad">Advertisement</option>
                <option value="product">Product Description</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                value={newContent.brand}
                onChange={(e) => setNewContent(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Brand name..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={newContent.date.toISOString().split('T')[0]}
                onChange={(e) => setNewContent(prev => ({ ...prev, date: new Date(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowScheduleModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSchedule}
              disabled={!newContent.title || !newContent.brand}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <ModernDocumentIcon size="lg" />
          <h2 className="text-xl font-bold text-gray-900">Content Calendar</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                viewMode === 'month'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                viewMode === 'week'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Week
            </button>
          </div>
          
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center space-x-2"
          >
            <ModernSparklesIcon size="sm" />
            <span>Schedule Content</span>
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ←
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {days.map((day, index) => {
          const dayContent = day ? getContentForDate(day) : [];
          const isToday = day && day.toDateString() === today.toDateString();
          const isSelected = day && selectedDate && day.toDateString() === selectedDate.toDateString();
          
          return (
            <div
              key={index}
              onClick={() => day && setSelectedDate(day)}
              className={`min-h-[100px] p-2 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                isToday ? 'ring-2 ring-primary bg-primary/5' : ''
              } ${isSelected ? 'bg-blue-50 border-blue-200' : ''}`}
            >
              {day && (
                <>
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-primary' : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayContent.slice(0, 2).map(item => (
                      <div
                        key={item.id}
                        className={`text-xs px-2 py-1 rounded border ${statusColors[item.status]} truncate`}
                        title={item.title}
                      >
                        <span className="mr-1">{typeIcons[item.type]}</span>
                        {item.title}
                      </div>
                    ))}
                    {dayContent.length > 2 && (
                      <div className="text-xs text-gray-500 px-2">
                        +{dayContent.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 mb-3">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          
          <div className="space-y-2">
            {getContentForDate(selectedDate).map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{typeIcons[item.type]}</span>
                  <div>
                    <h5 className="font-medium text-gray-900">{item.title}</h5>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded border ${statusColors[item.status]}`}>
                    {item.status}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ModernSettingsIcon size="sm" />
                  </button>
                </div>
              </div>
            ))}
            
            {getContentForDate(selectedDate).length === 0 && (
              <p className="text-gray-500 text-center py-4">No content scheduled for this date</p>
            )}
          </div>
        </div>
      )}

      <ScheduleModal />
    </div>
  );
}
