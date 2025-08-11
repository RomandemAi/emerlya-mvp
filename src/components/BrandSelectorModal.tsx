'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Brand {
  id: string;
  name: string;
  created_at: string;
  persona_config_json?: any;
}

interface BrandSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  brands: Brand[];
  onCreateNew: () => void;
}

export default function BrandSelectorModal({ 
  isOpen, 
  onClose, 
  brands, 
  onCreateNew 
}: BrandSelectorModalProps) {
  const router = useRouter();

  const handleBrandSelect = (brandId: string) => {
    router.push(`/brands/${brandId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <span>Choose a Brand to Generate Content</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {brands.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🎭</div>
            <h3 className="text-2xl font-bold text-primary mb-4">No Brands Yet</h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Create your first brand to start generating amazing content that matches your unique voice.
            </p>
            <button
              onClick={() => {
                onClose();
                onCreateNew();
              }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
            >
              <span>✨</span>
              Create Your First Brand
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => handleBrandSelect(brand.id)}
                  className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-left"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-primary group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {brand.name}
                    </h3>
                    <div className="w-3 h-3 bg-gradient-to-r from-accent to-accent/80 rounded-full shadow-sm"></div>
                  </div>
                  
                  <p className="text-gray-500 text-sm font-medium mb-4">
                    Created {new Date(brand.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>

                  <div className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl group-hover:shadow-lg transition-all duration-200 text-sm font-medium">
                    <span className="mr-2">🚀</span>
                    Start Creating
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center border-t border-gray-200 pt-6">
              <p className="text-gray-600 mb-4">Want to create content for a new brand?</p>
              <button
                onClick={() => {
                  onClose();
                  onCreateNew();
                }}
                className="px-6 py-3 bg-white/60 backdrop-blur-md border border-white/50 text-primary hover:text-primary/80 hover:bg-white/80 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 font-medium flex items-center gap-2 mx-auto"
              >
                <span>➕</span>
                Create New Brand
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
