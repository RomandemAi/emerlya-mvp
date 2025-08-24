'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { DocumentIcon, CopyIcon, CheckIcon, WarningIcon, RobotIcon } from './icons';
import ImageLibrary from './ImageLibrary';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: string;
  created_at: string;
  brand_id: string;
}

interface ContentLibraryProps {
  brandId?: string;
}

export default function ContentLibrary({ brandId }: ContentLibraryProps) {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copyFeedback, setCopyFeedback] = useState<{[key: string]: string}>({});

  useEffect(() => {
    fetchContentItems();
  }, [brandId]);

  const fetchContentItems = async () => {
    try {
      const supabase = createClient();
      
      let query = supabase
        .from('brand_drafts')
        .select('*')
        .order('created_at', { ascending: false });

      // If brandId is provided, filter by it
      if (brandId) {
        query = query.eq('brand_id', brandId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching content:', error);
        setError('Failed to load content library');
        return;
      }

      setContentItems(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      setError('Failed to load content library');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (content: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyFeedback({ ...copyFeedback, [itemId]: 'Copied!' });
      setTimeout(() => {
        setCopyFeedback(prev => {
          const newFeedback = { ...prev };
          delete newFeedback[itemId];
          return newFeedback;
        });
      }, 2000);
    } catch (error) {
      setCopyFeedback({ ...copyFeedback, [itemId]: 'Failed to copy' });
      setTimeout(() => {
        setCopyFeedback(prev => {
          const newFeedback = { ...prev };
          delete newFeedback[itemId];
          return newFeedback;
        });
      }, 2000);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('brand_drafts')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Error deleting content:', error);
        return;
      }

      // Remove from local state
      setContentItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">Loading your content library...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <WarningIcon className="text-red-500" size={24} />
          <div>
            <h3 className="text-red-800 font-semibold">Error Loading Content</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (contentItems.length === 0) {
    return (
      <div className="text-center py-12">
        <DocumentIcon className="mx-auto text-gray-400 mb-4" size={64} />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Content Yet</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Your generated content will appear here. Start creating content with AI to build your library!
        </p>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'content' | 'images'>('content');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Content Library</h2>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'content'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <DocumentIcon className="inline mr-2" size={16} />
              Text Content
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'images'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <RobotIcon className="inline mr-2" size={16} />
              AI Images
            </button>
          </div>
          {activeTab === 'content' && (
            <div className="text-sm text-gray-600">
              {contentItems.length} {contentItems.length === 1 ? 'item' : 'items'}
            </div>
          )}
        </div>
      </div>

      {activeTab === 'images' ? (
        <ImageLibrary />
      ) : (

      <div className="grid gap-6">
        {contentItems.map((item) => (
          <div
            key={item.id}
            className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="capitalize">{item.type}</span>
                  <span>•</span>
                  <span>{formatDate(item.created_at)}</span>
                  <span>•</span>
                  <span>{item.content.length} characters</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(item.content, item.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                  title="Copy content"
                >
                  {copyFeedback[item.id] ? (
                    <>
                      <CheckIcon size={16} />
                      <span className="text-sm">{copyFeedback[item.id]}</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={16} />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Delete content"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 border border-gray-200">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
