'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import TopUpModal from './TopUpModal';

interface GeneratorProps {
  brandId: string;
  subscriptionStatus?: string | null;
}

export default function Generator({ brandId, subscriptionStatus }: GeneratorProps) {
  const [input, setInput] = useState('');
  const [completion, setCompletion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState('');
  const [usageError, setUsageError] = useState('');
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [usageData, setUsageData] = useState<any>(null);

  // Check if user has an active subscription
  const hasActiveSubscription = subscriptionStatus === 'active';

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setCompletion('');
    setSubscriptionError('');
    setUsageError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand_id: brandId,
          user_prompt: input,
          wordCount: 400, // Request longer content
        }),
      });

      // Handle subscription required error
      if (response.status === 402) {
        const errorData = await response.json();
        setSubscriptionError(errorData.message || 'Subscription required to generate content');
        return;
      }

      // Handle usage limit exceeded error
      if (response.status === 429) {
        const errorData = await response.json();
        setUsageError(errorData.message || 'Usage limit exceeded. Please upgrade your plan.');
        setUsageData(errorData.usage); // Store usage data for top-up modal
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setCompletion(prev => prev + chunk);
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setCompletion('Error: Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Subscription Error Display */}
      {subscriptionError && (
        <div className="backdrop-blur-xl bg-red-50/60 border border-red-200 rounded-3xl p-6 shadow-2xl mb-8">
          <div className="flex items-start gap-4">
            <span className="text-red-500 text-2xl">🚫</span>
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

      {/* Usage Limit Error Display */}
      {usageError && (
        <div className="backdrop-blur-xl bg-yellow-50/60 border border-yellow-200 rounded-3xl p-6 shadow-2xl mb-8">
          <div className="flex items-start gap-4">
            <span className="text-yellow-500 text-2xl">⚠️</span>
            <div className="flex-1">
              <h3 className="text-yellow-700 font-bold text-lg mb-3">Usage Limit Reached</h3>
              <p className="text-yellow-600 mb-4 leading-relaxed">{usageError}</p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowTopUpModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  💰 Top Up Words
                </button>
                <button 
                  onClick={() => window.location.href = '/pricing'}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Paywall for non-subscribers */}
      {!hasActiveSubscription && !subscriptionError && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl border border-white/50 mb-8">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🔒</span>
            <h2 className="text-2xl font-bold text-primary mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Premium Feature
              </span>
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              AI content generation is available to subscribers only. Upgrade your plan to unlock unlimited AI-powered content creation with your brand&apos;s unique voice.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              >
                🚀 Upgrade to Premium
              </button>
              <p className="text-sm text-gray-500">
                Current status: <span className="capitalize font-medium">{subscriptionStatus || 'Free'}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content Generation Form - Only show if subscribed */}
      {hasActiveSubscription && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="prompt" className="block font-semibold text-primary mb-3">
                Content Prompt
              </label>
              <textarea
                id="prompt"
                className="w-full p-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent resize-none leading-relaxed transition-all duration-200"
                rows={4}
                value={input}
                onChange={handleInputChange}
                placeholder="Enter your content prompt... (e.g., 'Write a blog post about sustainable fashion trends')"
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Generate Content</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Generated Content Display */}
      {(completion || isLoading) && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-6 shadow-2xl border border-white/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-primary flex items-center gap-3">
              <span>🤖</span>
              <span>Generated Content</span>
            </h3>
            {isLoading && (
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <div className="animate-pulse w-3 h-3 bg-gradient-to-r from-accent to-accent/80 rounded-full"></div>
                Streaming...
              </div>
            )}
          </div>
          
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 min-h-[200px] border border-gray-200">
            {completion ? (
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {completion}
              </p>
            ) : isLoading ? (
              <div className="flex items-center text-gray-500">
                <div className="animate-pulse">Waiting for response...</div>
              </div>
            ) : null}
          </div>
          
          {completion && !isLoading && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-medium">
                ✅ Content generation completed • {completion.length} characters
              </p>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      {!completion && !isLoading && hasActiveSubscription && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-6 shadow-2xl border border-white/50">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
            <span>💡</span>
            <span>How it Works</span>
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">1</span>
              <span className="leading-relaxed">Enter your content prompt above (be specific for best results)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">2</span>
              <span className="leading-relaxed">The AI will use your brand&apos;s persona and uploaded documents for context</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">3</span>
              <span className="leading-relaxed">Watch as content streams in real-time with your brand&apos;s unique voice</span>
            </li>
          </ul>
        </div>
      )}

      {/* Top-Up Modal */}
      <TopUpModal 
        isOpen={showTopUpModal}
        onClose={() => setShowTopUpModal(false)}
        currentUsage={usageData}
      />
    </div>
  );
}
