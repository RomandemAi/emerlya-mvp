'use client';

import React, { useState } from 'react';
import { SparklesIcon, RobotIcon } from './icons';
import ImageGenerator from './ImageGenerator';

interface UnifiedContentCreatorProps {
  brands: any[];
  subscriptionStatus?: string | null;
  onCreateBrand: () => void;
}

export default function UnifiedContentCreator({ 
  brands, 
  subscriptionStatus, 
  onCreateBrand 
}: UnifiedContentCreatorProps) {
  const [creationMode, setCreationMode] = useState<'text' | 'image'>('text');

  if (brands.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-16 shadow-2xl border border-white/50 max-w-2xl mx-auto">
          <div className="text-8xl mb-8">🎭</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create Your First Brand?</h3>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Transform your content creation process with AI that understands your brand's unique personality and voice.
          </p>
          <button
            onClick={onCreateBrand}
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-medium text-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            Get Started Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Creation Mode Toggle */}
      <div className="flex items-center justify-center px-4 md:px-0">
        <div className="flex w-full max-w-xs bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setCreationMode('text')}
            className={`flex-1 px-3 md:px-6 py-2 md:py-3 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-1 md:gap-2 ${
              creationMode === 'text'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <SparklesIcon size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="hidden sm:inline">Text Content</span>
            <span className="sm:hidden">Text</span>
          </button>
          <button
            onClick={() => setCreationMode('image')}
            className={`flex-1 px-3 md:px-6 py-2 md:py-3 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-1 md:gap-2 ${
              creationMode === 'image'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <RobotIcon size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="hidden sm:inline">AI Images</span>
            <span className="sm:hidden">Images</span>
          </button>
        </div>
      </div>

      {/* Content Based on Mode */}
      {creationMode === 'image' ? (
        <ImageGenerator subscriptionStatus={subscriptionStatus} />
      ) : (
        // Text Content Creation - Show Brands
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brands.map((brand) => (
            <div key={brand.id} className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 truncate pr-2">
                    {brand.name}
                  </h3>
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm flex-shrink-0"></div>
                </div>
                <p className="text-gray-500 text-xs font-medium">
                  {new Date(brand.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="space-y-3">
                <a 
                  href={`/brands/${brand.id}`}
                  className="w-full px-4 py-3 bg-gradient-to-r from-primary to-accent text-white text-center text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <SparklesIcon size={16} />
                  <span>Create Amazing Content</span>
                </a>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center space-x-1"
                  >
                    <span>📄</span>
                    <span>Docs</span>
                  </button>
                  <button
                    className="px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center space-x-1"
                  >
                    <span>⚙️</span>
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
