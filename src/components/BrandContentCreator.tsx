'use client';

import { useState } from 'react';
import Generator from './Generator';
import ImageGenerator from './ImageGenerator';
import BrandSettingsModal from './BrandSettingsModal';
import { SparklesIcon, RobotIcon } from './icons';

interface Brand {
  id: string;
  name: string;
  persona_config_json?: any;
}

interface BrandContentCreatorProps {
  brand: Brand;
  brandId: string;
  subscriptionStatus: string | null;
  mode?: string; // 'text', 'images', or undefined (defaults to text)
  onBrandUpdated?: () => void;
}

export default function BrandContentCreator({ 
  brand, 
  brandId, 
  subscriptionStatus, 
  mode,
  onBrandUpdated 
}: BrandContentCreatorProps) {
  const [activeMode, setActiveMode] = useState<'text' | 'images' | 'settings'>(
    mode === 'images' ? 'images' : mode === 'settings' ? 'settings' : 'text'
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      {/* Mode Selection */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="flex bg-gray-100 rounded-xl p-1 max-w-md w-full">
            <button
              onClick={() => setActiveMode('text')}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeMode === 'text'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <SparklesIcon size={18} />
              <span>Text Content</span>
            </button>
            <button
              onClick={() => setActiveMode('images')}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeMode === 'images'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <RobotIcon size={18} />
              <span>AI Images</span>
            </button>
            <button
              onClick={() => setActiveMode('settings')}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeMode === 'settings'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Based on Mode */}
      {activeMode === 'text' && (
        <Generator 
          brandId={brandId} 
          subscriptionStatus={subscriptionStatus}
        />
      )}

      {activeMode === 'images' && (
        <ImageGenerator 
          subscriptionStatus={subscriptionStatus}
          brandId={brandId}
          brandName={brand.name}
        />
      )}

      {activeMode === 'settings' && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl border border-white/50">
          <div className="text-center">
            <div className="text-6xl mb-6">⚙️</div>
            <h3 className="text-2xl font-bold text-primary mb-4">Brand Settings</h3>
            <p className="text-gray-600 mb-6">
              Configure your brand's voice, style, and personality to create more targeted content.
            </p>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Open Brand Settings
            </button>
          </div>
        </div>
      )}

      {/* Brand Settings Modal */}
      <BrandSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        brand={brand}
        onBrandUpdated={() => {
          if (onBrandUpdated) onBrandUpdated();
          setIsSettingsOpen(false);
        }}
        onBrandDeleted={() => {
          // Redirect back to dashboard if brand is deleted
          window.location.href = '/dashboard';
        }}
      />
    </>
  );
}
