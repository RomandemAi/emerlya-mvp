'use client';

import React, { useState } from 'react';
import { 
  RobotIcon, 
  BlockIcon, 
  WarningIcon, 
  LoadingIcon,
  LightbulbIcon,
  CopyIcon,
  CheckIcon,
  DollarIcon,
  RocketIcon,
  TypeIcon,
  DownloadIcon
} from './icons';
import TopUpModal from './TopUpModal';
import CanvasEditor from './CanvasEditor';

interface ImageGeneratorProps {
  brandId?: string;
  brandName?: string;
  subscriptionStatus?: string | null;
}

export default function ImageGenerator({ brandId, brandName, subscriptionStatus }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<{
    url: string;
    revisedPrompt?: string;
    id?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState('');
  const [error, setError] = useState('');
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [showCanvasEditor, setShowCanvasEditor] = useState(false);
  
  // Image settings with smart presets
  const [size, setSize] = useState('auto');
  const [quality, setQuality] = useState('standard');
  const [style, setStyle] = useState('vivid');
  
  // Smart size detection from prompt
  const detectSizeFromPrompt = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();
    
    // Social media formats
    if (lowerPrompt.includes('instagram') || lowerPrompt.includes('ig post') || lowerPrompt.includes('square post')) {
      return '1024x1024'; // Square
    }
    if (lowerPrompt.includes('instagram story') || lowerPrompt.includes('ig story')) {
      return '1024x1792'; // Vertical story
    }
    if (lowerPrompt.includes('twitter') || lowerPrompt.includes('x post') || lowerPrompt.includes('tweet')) {
      return '1792x1024'; // Horizontal
    }
    if (lowerPrompt.includes('linkedin') || lowerPrompt.includes('facebook post')) {
      return '1792x1024'; // Horizontal
    }
    if (lowerPrompt.includes('youtube thumbnail') || lowerPrompt.includes('thumbnail')) {
      return '1792x1024'; // Horizontal
    }
    if (lowerPrompt.includes('banner') || lowerPrompt.includes('header') || lowerPrompt.includes('cover')) {
      return '1792x1024'; // Horizontal
    }
    if (lowerPrompt.includes('portrait') || lowerPrompt.includes('vertical')) {
      return '1024x1792'; // Vertical
    }
    if (lowerPrompt.includes('landscape') || lowerPrompt.includes('horizontal') || lowerPrompt.includes('wide')) {
      return '1792x1024'; // Horizontal
    }
    
    return '1024x1024'; // Default square
  };
  
  // Feedback states
  const [copyFeedback, setCopyFeedback] = useState('');

  // Check if user has an active subscription
  const hasActiveSubscription = subscriptionStatus === 'active';

  const handleCopyPrompt = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (error) {
      setCopyFeedback('Failed to copy');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setGeneratedImage(null);
    setSubscriptionError('');
    setError('');

    // Auto-detect size from prompt
    const smartSize = detectSizeFromPrompt(prompt);
    const finalSize = size === 'auto' ? smartSize : size;
    
    // Update size state if auto-detected differently
    if (size === 'auto' && smartSize !== size) {
      setSize(smartSize);
    }

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: brandName ? `${prompt.trim()} (for ${brandName} brand)` : prompt.trim(),
          size: finalSize,
          quality,
          style,
          brand_id: brandId
        }),
      });

      const result = await response.json();

      if (response.status === 402) {
        setSubscriptionError(result.message || 'Subscription required to generate images');
        return;
      }

      if (response.status === 400 && result.error === 'content_policy_violation') {
        setError('Your prompt violates content policy. Please try a more appropriate prompt.');
        return;
      }

      if (response.status === 429) {
        setError('Rate limit exceeded. Please wait a moment before trying again.');
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || 'Failed to generate image');
      }

      setGeneratedImage({
        url: result.image_url,
        revisedPrompt: result.revised_prompt,
        id: result.id
      });

    } catch (error: any) {
      console.error('Error generating image:', error);
      
      // Try to get more specific error info from the response
      if (error.message?.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else if (error.message?.includes('429')) {
        setError('Rate limit exceeded. Please wait a moment before trying again.');
      } else if (error.message?.includes('401')) {
        setError('Authentication error. Please refresh the page and try again.');
      } else if (error.message?.includes('billing')) {
        setError('Billing issue detected. Please check your OpenAI account billing status.');
      } else {
        setError(error.message || 'Failed to generate image. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage?.url) return;

    try {
      // Use a proxy approach for CORS issues
      const response = await fetch('/api/download-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: generatedImage.url
        }),
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `emerlya-generated-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback: open image in new tab
      window.open(generatedImage?.url, '_blank');
    }
  };

  const openCanvasEditor = () => {
    if (!generatedImage?.url) return;
    setEditingImage(generatedImage.url);
    setShowCanvasEditor(true);
  };

  const handleCanvasSave = (canvasData: any) => {
    console.log('Canvas design saved:', canvasData);
    // Here you could save the canvas data to your backend
  };

  const handleCanvasExport = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    console.log('Canvas design exported:', filename);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Subscription Error Display */}
      {subscriptionError && (
        <div className="backdrop-blur-xl bg-red-50/60 border border-red-200 rounded-3xl p-6 shadow-2xl mb-8">
          <div className="flex items-start gap-4">
            <BlockIcon className="text-red-500" size={32} />
            <div className="flex-1">
              <h3 className="text-red-700 font-bold text-lg mb-3">Subscription Required</h3>
              <p className="text-red-600 mb-4 leading-relaxed">{subscriptionError}</p>
              <button 
                onClick={() => window.location.href = '/pricing'}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="backdrop-blur-xl bg-red-50/60 border border-red-200 rounded-3xl p-6 shadow-2xl mb-8">
          <div className="flex items-start gap-4">
            <WarningIcon className="text-red-500" size={32} />
            <div className="flex-1">
              <h3 className="text-red-700 font-bold text-lg mb-3">Generation Error</h3>
              <p className="text-red-600 leading-relaxed">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Paywall for non-subscribers */}
      {!hasActiveSubscription && !subscriptionError && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl border border-white/50 mb-8">
          <div className="text-center">
            <RobotIcon className="text-gray-400 mb-4 mx-auto" size={64} />
            <h2 className="text-2xl font-bold text-primary mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Premium AI Image Generation
              </span>
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Create stunning, high-quality images with DALL-E 3. Generate professional visuals that match your brand's style and voice.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/pricing'}
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 mx-auto"
              >
                <RocketIcon size={18} />
                Upgrade to Premium
              </button>
              <p className="text-sm text-gray-500">
                Current status: <span className="capitalize font-medium">{subscriptionStatus || 'Free'}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Generation Form - Only show if subscribed */}
      {hasActiveSubscription && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="prompt" className="block font-semibold text-primary mb-3">
                Image Description
              </label>
              <textarea
                id="prompt"
                className="w-full p-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent resize-none leading-relaxed transition-all duration-200"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create... Try: 'Instagram post about coffee', 'Twitter banner for tech company', 'YouTube thumbnail for cooking video', or 'LinkedIn post graphic about AI'"
                maxLength={1000}
                disabled={isLoading}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Be specific and descriptive for best results</span>
                <span>{prompt.length}/1000</span>
              </div>
            </div>

            {/* Image Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="auto">🎯 Auto (Smart Detection)</option>
                  <option value="1024x1024">📱 Square (Instagram Post)</option>
                  <option value="1024x1792">📲 Portrait (Instagram Story)</option>
                  <option value="1792x1024">🖥️ Landscape (X/Twitter, YouTube)</option>
                </select>
                {size === 'auto' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Will auto-detect format from your prompt (e.g., "Instagram post", "Twitter banner")
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="standard">Standard</option>
                  <option value="hd">HD (Higher Cost)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="vivid">Vivid (More Creative)</option>
                  <option value="natural">Natural (More Realistic)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="w-full px-6 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <LoadingIcon size={20} />
                  Generating Image...
                </>
              ) : (
                <>
                  <RobotIcon size={20} />
                  Generate Image with DALL-E 3
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Generated Image Display */}
      {generatedImage && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-primary flex items-center gap-3">
              <RobotIcon className="text-primary" size={24} />
              <span>Generated Image</span>
            </h3>
            
            <div className="flex items-center gap-3">
              <button
                onClick={openCanvasEditor}
                className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-xl font-medium transition-all duration-200 hover:shadow-md"
                title="Edit with text overlay"
              >
                <TypeIcon size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={downloadImage}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-medium transition-all duration-200 hover:shadow-md"
                title="Download image"
              >
                <DownloadIcon size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-gray-200">
            <img
              src={generatedImage.url}
              alt="Generated image"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          {generatedImage.revisedPrompt && generatedImage.revisedPrompt !== prompt && (
            <div className="mt-4 p-4 bg-blue-50/80 border border-blue-200 rounded-xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900 mb-2">DALL-E 3 Enhanced Prompt:</h4>
                  <p className="text-blue-800 text-sm leading-relaxed">{generatedImage.revisedPrompt}</p>
                </div>
                <button
                  onClick={() => handleCopyPrompt(generatedImage.revisedPrompt!)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm transition-all duration-200"
                >
                  {copyFeedback ? (
                    <>
                      <CheckIcon size={14} />
                      <span>{copyFeedback}</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      {!generatedImage && !isLoading && hasActiveSubscription && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-6 shadow-2xl border border-white/50">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
            <LightbulbIcon className="text-primary" size={24} />
            <span>Image Generation Tips</span>
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">1</span>
              <span><strong>Be specific:</strong> Include details about style, colors, mood, and composition</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">2</span>
              <span><strong>Choose the right size:</strong> Square for social media, landscape for banners, portrait for posters</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">3</span>
              <span><strong>Style matters:</strong> "Vivid" for creative/artistic images, "Natural" for realistic photos</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">4</span>
              <span><strong>Quality:</strong> Use HD for professional/commercial use (costs more)</span>
            </li>
          </ul>
        </div>
      )}

      {/* Top-up Modal */}
      {showTopUpModal && (
        <TopUpModal
          isOpen={showTopUpModal}
          onClose={() => setShowTopUpModal(false)}
        />
      )}

      {/* Canvas Editor Modal */}
      {showCanvasEditor && editingImage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                <TypeIcon size={24} />
                Canvas Editor
              </h2>
              <button
                onClick={() => {
                  setShowCanvasEditor(false);
                  setEditingImage(null);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200"
              >
                ✕
              </button>
            </div>
            <div className="p-6 max-h-[calc(95vh-120px)] overflow-y-auto">
              <CanvasEditor
                imageUrl={editingImage}
                brandName={brandName}
                brandColors={['#1E293B', '#22D3EE', '#64748B']} // Using our theme colors
                onSave={handleCanvasSave}
                onExport={handleCanvasExport}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
