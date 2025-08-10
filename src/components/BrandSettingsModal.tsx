'use client';
import { useState } from 'react';
import { updateBrand, deleteBrand } from '@/app/actions';

interface Brand {
  id: string;
  name: string;
  persona_config_json?: any;
}

interface BrandSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: Brand;
  onBrandUpdated: () => void;
  onBrandDeleted: () => void;
}

export default function BrandSettingsModal({ 
  isOpen, 
  onClose, 
  brand, 
  onBrandUpdated, 
  onBrandDeleted 
}: BrandSettingsModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse existing brand data
  const existingData = brand.persona_config_json || {};

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      formData.append('brand_id', brand.id);
      await updateBrand(formData);
      onBrandUpdated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteBrand(brand.id);
      onBrandDeleted();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <span>Brand Settings</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {!showDeleteConfirm ? (
          <form action={handleSubmit}>
            <div className="space-y-6">
              {/* Brand Name */}
              <div>
                <label htmlFor="brand_name" className="block text-lg font-semibold text-gray-900 mb-3">
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brand_name"
                  name="brand_name"
                  required
                  defaultValue={brand.name}
                  className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Enter brand name"
                />
              </div>

              {/* Brand Tone */}
              <div>
                <label htmlFor="tone" className="block text-lg font-semibold text-gray-900 mb-3">
                  Brand&apos;s Tone
                </label>
                <input
                  type="text"
                  id="tone"
                  name="tone"
                  required
                  defaultValue={existingData.tone || ''}
                  className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="e.g., Witty and informal, Professional and authoritative"
                />
              </div>

              {/* Writing Style */}
              <div>
                <label htmlFor="style" className="block text-lg font-semibold text-gray-900 mb-3">
                  Writing Style
                </label>
                <input
                  type="text"
                  id="style"
                  name="style"
                  required
                  defaultValue={existingData.style || ''}
                  className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="e.g., Uses emojis and short sentences, Formal with complex vocabulary"
                />
              </div>

              {/* Target Audience */}
              <div>
                <label htmlFor="target_audience" className="block text-lg font-semibold text-gray-900 mb-3">
                  Target Audience
                </label>
                <input
                  type="text"
                  id="target_audience"
                  name="target_audience"
                  required
                  defaultValue={existingData.target_audience || ''}
                  className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="e.g., Gen Z tech enthusiasts, C-suite executives"
                />
              </div>

              {/* Words to Avoid */}
              <div>
                <label htmlFor="words_to_avoid" className="block text-lg font-semibold text-gray-900 mb-3">
                  Words to Avoid
                </label>
                <textarea
                  id="words_to_avoid"
                  name="words_to_avoid"
                  rows={3}
                  defaultValue={existingData.words_to_avoid || ''}
                  className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200 text-lg"
                  placeholder="e.g., synergy, leverage, basically"
                />
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <div className="text-red-700 font-medium">{error}</div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-3 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 font-medium flex items-center gap-2"
              >
                <span>🗑️</span>
                Delete Brand
              </button>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete Brand</h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Are you sure you want to delete &quot;<strong>{brand.name}</strong>&quot;? This action cannot be undone and will permanently remove all associated data.
            </p>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <div className="text-red-700 font-medium">{error}</div>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <span>🗑️</span>
                    Delete Forever
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
