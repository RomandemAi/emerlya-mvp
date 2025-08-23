'use client';
import React, { useState, useEffect } from 'react';
import { createBrand } from '@/app/actions';

interface CreateBrandFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBrandForm({ isOpen, onClose }: CreateBrandFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await createBrand(formData);
      setSuccess(true);
      
      // Close modal after a brief success message
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Brand creation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while creating the brand';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setError(null);
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <span>Create New Brand</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200"
          >
            ✕
          </button>
        </div>
        
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Brand Created Successfully!</h3>
            <p className="text-gray-600">Your brand is being processed and will be ready shortly.</p>
          </div>
        ) : (
          <form action={handleSubmit}>
          <div className="space-y-6">
            {/* Brand Name */}
            <div>
              <label htmlFor="brand_name" className="block text-lg font-semibold text-primary mb-3">
                Brand Name
              </label>
              <input
                type="text"
                id="brand_name"
                name="brand_name"
                required
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-lg"
                placeholder="Enter brand name"
              />
            </div>

            {/* Brand Tone */}
            <div>
              <label htmlFor="tone" className="block text-lg font-semibold text-primary mb-3">
                Brand&apos;s Tone
              </label>
              <input
                type="text"
                id="tone"
                name="tone"
                required
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-lg"
                placeholder="e.g., Witty and informal, Professional and authoritative"
              />
            </div>

            {/* Writing Style */}
            <div>
              <label htmlFor="style" className="block text-lg font-semibold text-primary mb-3">
                Writing Style
              </label>
              <input
                type="text"
                id="style"
                name="style"
                required
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-lg"
                placeholder="e.g., Uses emojis and short sentences, Formal with complex vocabulary"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label htmlFor="target_audience" className="block text-lg font-semibold text-primary mb-3">
                Target Audience
              </label>
              <input
                type="text"
                id="target_audience"
                name="target_audience"
                required
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-lg"
                placeholder="e.g., Gen Z tech enthusiasts, C-suite executives"
              />
            </div>

            {/* Words to Avoid */}
            <div>
              <label htmlFor="words_to_avoid" className="block text-lg font-semibold text-primary mb-3">
                Words to Avoid
              </label>
              <textarea
                id="words_to_avoid"
                name="words_to_avoid"
                rows={3}
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent resize-none transition-all duration-200 text-lg"
                placeholder="e.g., synergy, leverage, basically"
              />
            </div>

            {/* Documents Content */}
            <div>
              <label htmlFor="documents" className="block text-lg font-semibold text-primary mb-3">
                Source Documents
              </label>
              <textarea
                id="documents"
                name="documents"
                required
                rows={8}
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent resize-none transition-all duration-200 text-lg"
                placeholder="Paste your source documents content here..."
              />
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <div className="text-red-700 font-medium">{error}</div>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 text-primary hover:text-primary/80 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Save Brand
                </>
              )}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
