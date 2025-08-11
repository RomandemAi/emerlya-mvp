'use client';

import { useState } from 'react';

interface BlogCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  brandId: string;
  brandName: string;
}

export function BlogCreateModal({ isOpen, onClose, onSuccess, brandId, brandName }: BlogCreateModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/brand/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand_id: brandId,
          title,
          content,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
          seo_title: seoTitle || title,
          excerpt,
          status,
          author_type: 'manual'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create blog post');
      }

      // Reset form
      setTitle('');
      setContent('');
      setTags('');
      setSeoTitle('');
      setExcerpt('');
      setStatus('draft');
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating blog post:', error);
      setError(error instanceof Error ? error.message : 'Failed to create blog post');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl border border-white/50 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <h2 className="text-xl font-semibold text-primary">Create Blog Post</h2>
              <p className="text-sm text-gray-600">Brand: {brandName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-primary mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              <div>
                <label htmlFor="seoTitle" className="block text-sm font-medium text-primary mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  id="seoTitle"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  placeholder="SEO-optimized title (optional)"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-primary mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="w-full px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <label htmlFor="tags" className="block text-sm font-medium text-primary mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  placeholder="Enter tags separated by commas (e.g., technology, innovation, business)"
                />
              </div>

              <div className="lg:col-span-2">
                <label htmlFor="excerpt" className="block text-sm font-medium text-primary mb-2">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  placeholder="Brief excerpt for the blog post (optional)"
                />
              </div>

              <div className="lg:col-span-2">
                <label htmlFor="content" className="block text-sm font-medium text-primary mb-2">
                  Content *
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-mono text-sm transition-all duration-200"
                  placeholder="Enter your blog post content here..."
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Word count: {content.trim().split(/\s+/).filter(word => word.length > 0).length}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/50">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-primary bg-white/60 backdrop-blur-md border border-white/50 rounded-xl hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !title.trim() || !content.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-accent border border-transparent rounded-xl hover:from-primary/90 hover:to-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200"
              >
                <span>💾</span>
                {isLoading ? 'Creating...' : 'Create Blog Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
