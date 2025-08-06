'use client';
import { useState } from 'react';
import { createBrand } from '@/app/actions';

interface CreateBrandFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBrandForm({ isOpen, onClose }: CreateBrandFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createBrand(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Brand</h2>
        
        <form action={handleSubmit}>
          <div className="space-y-4">
            {/* Brand Name */}
            <div>
              <label htmlFor="brand_name" className="block text-sm font-medium text-white mb-2">
                Brand Name
              </label>
              <input
                type="text"
                id="brand_name"
                name="brand_name"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter brand name"
              />
            </div>

            {/* Persona JSON */}
            <div>
              <label htmlFor="persona_config_json" className="block text-sm font-medium text-white mb-2">
                Persona Configuration (JSON)
              </label>
              <textarea
                id="persona_config_json"
                name="persona_config_json"
                required
                rows={8}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='{"tone": "professional", "style": "friendly", "target_audience": "business professionals"}'
              />
            </div>

            {/* Documents Content */}
            <div>
              <label htmlFor="documents" className="block text-sm font-medium text-white mb-2">
                Source Documents
              </label>
              <textarea
                id="documents"
                name="documents"
                required
                rows={10}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste your source documents content here..."
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-600 text-white rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Brand'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
