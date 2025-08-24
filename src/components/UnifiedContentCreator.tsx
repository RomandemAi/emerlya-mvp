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
      {/* Brand Selection - Content Creation */}
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
              {/* Primary Action - Text Content */}
              <a 
                href={`/brands/${brand.id}`}
                className="w-full px-4 py-3 bg-gradient-to-r from-primary to-accent text-white text-center text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <SparklesIcon size={16} />
                <span>Create Text Content</span>
              </a>
              
              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    // TODO: Open image generator with brand context
                    window.location.href = `/brands/${brand.id}?mode=images`;
                  }}
                  className="px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center space-x-1"
                >
                  <RobotIcon size={14} />
                  <span>AI Images</span>
                </button>
                <button
                  onClick={() => {
                    window.location.href = `/brands/${brand.id}?mode=settings`;
                  }}
                  className="px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center space-x-1"
                >
                  <span>⚙️</span>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
