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
  RocketIcon 
} from './icons';
import TopUpModal from './TopUpModal';

interface ImageGeneratorProps {
  brandId?: string;
  subscriptionStatus?: string | null;
}

export default function ImageGenerator({ brandId, subscriptionStatus }: ImageGeneratorProps) {
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
  
  // Image settings
  const [size, setSize] = useState('1024x1024');
  const [quality, setQuality] = useState('standard');
  const [style, setStyle] = useState('vivid');
  
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

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          size,
          quality,
          style
          // brand_id removed - images belong to user, not specific brand
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
      setError(error.message || 'Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage?.url) return;

    try {
      const response = await fetch(generatedImage.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
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
                placeholder="Describe the image you want to create... (e.g., 'A modern logo for a tech startup, minimalist design, blue and white colors')"
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
                  <option value="1024x1024">Square (1024×1024)</option>
                  <option value="1024x1792">Portrait (1024×1792)</option>
                  <option value="1792x1024">Landscape (1792×1024)</option>
                </select>
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
                onClick={downloadImage}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-medium transition-all duration-200 hover:shadow-md"
                title="Download image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
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
    </div>
  );
}
