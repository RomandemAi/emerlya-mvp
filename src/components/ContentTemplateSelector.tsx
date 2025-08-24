'use client';

import React, { useState } from 'react';
import { 
  CONTENT_TEMPLATES, 
  TEMPLATE_CATEGORIES, 
  ContentTemplate,
  getTemplatesByCategory,
  searchTemplates 
} from '@/lib/content-templates';
import { ClipboardIcon, SearchIcon, LightbulbIcon, DocumentIcon } from './icons';
import { MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface ContentTemplateSelectorProps {
  onTemplateSelect: (template: ContentTemplate) => void;
  onClose: () => void;
}

export default function ContentTemplateSelector({ onTemplateSelect, onClose }: ContentTemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredTemplates = () => {
    if (searchQuery.trim()) {
      return searchTemplates(searchQuery);
    }
    if (selectedCategory === 'all') {
      return Object.values(CONTENT_TEMPLATES);
    }
    return getTemplatesByCategory(selectedCategory);
  };

  const filteredTemplates = getFilteredTemplates();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    return TEMPLATE_CATEGORIES[category as keyof typeof TEMPLATE_CATEGORIES]?.icon || <DocumentIcon size={16} />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <SparklesIcon className="w-6 h-6 text-primary" />
                <span>Content Templates</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Choose from {Object.keys(CONTENT_TEMPLATES).length}+ professional templates to get started faster
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-light"
            >
              ×
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="flex h-[600px]">
          {/* Category Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
            
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-2 ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ClipboardIcon className="mr-2 text-accent" size={20} />
              All Templates ({Object.keys(CONTENT_TEMPLATES).length})
            </button>

            {Object.entries(TEMPLATE_CATEGORIES).map(([key, category]) => {
              const templateCount = getTemplatesByCategory(key).length;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-2 ${
                    selectedCategory === key
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name} ({templateCount})
                </button>
              );
            })}
          </div>

          {/* Templates Grid */}
          <div className="flex-1 p-4 overflow-y-auto">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <SearchIcon className="text-gray-400 mb-4 mx-auto" size={64} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-600">Try adjusting your search or selecting a different category.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => onTemplateSelect(template)}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-200 cursor-pointer group"
                  >
                    {/* Template Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {template.name}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(template.difficulty)}`}>
                              {template.difficulty}
                            </span>
                            <span className="text-xs text-gray-500">
                              ~{template.estimatedWords} words
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Template Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Template Tags */}
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {template.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{template.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Required Fields Preview */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Required fields:</p>
                      <p className="text-xs text-gray-700 truncate">
                        {template.requiredFields.join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <LightbulbIcon className="inline mr-2" size={16} /> <strong>Pro Tip:</strong> Templates adapt to your brand voice automatically
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                Showing {filteredTemplates.length} templates
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
