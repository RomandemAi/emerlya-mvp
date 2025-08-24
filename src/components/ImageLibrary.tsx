'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { RobotIcon, WarningIcon, DocumentIcon } from './icons';

interface ImageItem {
  id: string;
  original_prompt: string;
  revised_prompt?: string;
  image_url: string;
  size: string;
  quality: string;
  style: string;
  model: string;
  created_at: string;
}

export default function ImageLibrary() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('brand_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching images:', error);
        // If table doesn't exist, show empty state instead of error
        if (error.message?.includes('relation "brand_images" does not exist')) {
          setImages([]);
          setError('');
        } else {
          setError('Failed to load image library');
        }
        return;
      }

      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to load image library');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('brand_images')
        .delete()
        .eq('id', imageId);

      if (error) {
        console.error('Error deleting image:', error);
        return;
      }

      setImages(prev => prev.filter(img => img.id !== imageId));
      setSelectedImage(null);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const downloadImage = async (imageUrl: string, imageName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${imageName}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
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
        <span className="ml-3 text-gray-600">Loading your image library...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <WarningIcon className="text-red-500" size={24} />
          <div>
            <h3 className="text-red-800 font-semibold">Error Loading Images</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <RobotIcon className="mx-auto text-gray-400 mb-4" size={64} />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Images Yet</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Your generated images will appear here. Create stunning visuals with DALL-E 3!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Image Library</h2>
        <div className="text-sm text-gray-600">
          {images.length} {images.length === 1 ? 'image' : 'images'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="backdrop-blur-xl bg-white/60 rounded-2xl p-4 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-square relative mb-3 rounded-xl overflow-hidden">
              <img
                src={image.image_url}
                alt={image.original_prompt}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-800 line-clamp-2 leading-relaxed">
                {image.original_prompt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatDate(image.created_at)}</span>
                <span className="capitalize">{image.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Image Details</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedImage.image_url}
                    alt={selectedImage.original_prompt}
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Original Prompt:</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedImage.original_prompt}
                    </p>
                  </div>
                  
                  {selectedImage.revised_prompt && selectedImage.revised_prompt !== selectedImage.original_prompt && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Enhanced Prompt:</h4>
                      <p className="text-gray-700 bg-blue-50 p-3 rounded-lg text-sm">
                        {selectedImage.revised_prompt}
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Size:</span>
                      <span className="ml-2 text-gray-600">{selectedImage.size}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Quality:</span>
                      <span className="ml-2 text-gray-600 capitalize">{selectedImage.quality}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Style:</span>
                      <span className="ml-2 text-gray-600 capitalize">{selectedImage.style}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Model:</span>
                      <span className="ml-2 text-gray-600">{selectedImage.model}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Created: {formatDate(selectedImage.created_at)}
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => downloadImage(selectedImage.image_url, `image-${selectedImage.id}`)}
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(selectedImage.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
