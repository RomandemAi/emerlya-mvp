'use client';
import { useState, FormEvent, ChangeEvent } from 'react';

interface GeneratorProps {
  brandId: string;
  subscriptionStatus?: string | null;
}

export default function Generator({ brandId, subscriptionStatus }: GeneratorProps) {
  const [input, setInput] = useState('');
  const [completion, setCompletion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState('');

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

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand_id: brandId,
          user_prompt: input,
        }),
      });

      // Handle subscription required error
      if (response.status === 402) {
        const errorData = await response.json();
        setSubscriptionError(errorData.message || 'Subscription required to generate content');
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
    <div className="max-w-4xl mx-auto">
      {/* Subscription Error Display */}
      {subscriptionError && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-red-400 text-xl">🚫</span>
            <div className="flex-1">
              <h3 className="text-red-400 font-semibold mb-2">Subscription Required</h3>
              <p className="text-red-300 mb-4">{subscriptionError}</p>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Manage Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paywall for non-subscribers */}
      {!hasActiveSubscription && !subscriptionError && (
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500 rounded-lg p-8 mb-8">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🔒</span>
            <h2 className="text-2xl font-bold text-white mb-4">Premium Feature</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              AI content generation is available to subscribers only. Upgrade your plan to unlock unlimited AI-powered content creation with your brand&apos;s unique voice.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/'}
                className="block w-full sm:inline-block sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                🚀 Upgrade to Premium
              </button>
              <p className="text-sm text-gray-400">
                Current status: <span className="capitalize">{subscriptionStatus || 'Free'}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content Generation Form - Only show if subscribed */}
      {hasActiveSubscription && (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Content Prompt
            </label>
            <textarea
              id="prompt"
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={5}
              value={input}
              onChange={handleInputChange}
              placeholder="Enter your content prompt... (e.g., &apos;Write a blog post about sustainable fashion trends&apos;)"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                ✨ Generate Content
              </>
            )}
          </button>
        </form>
      )}

      {/* Generated Content Display */}
      {(completion || isLoading) && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              🤖 Generated Content
            </h3>
            {isLoading && (
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <div className="animate-pulse w-2 h-2 bg-green-400 rounded-full"></div>
                Streaming...
              </div>
            )}
          </div>
          
          <div className="bg-gray-900 rounded p-4 min-h-[100px]">
            {completion ? (
              <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                {completion}
              </p>
            ) : isLoading ? (
              <div className="flex items-center text-gray-400">
                <div className="animate-pulse">Waiting for response...</div>
              </div>
            ) : null}
          </div>
          
          {completion && !isLoading && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                ✅ Content generation completed • {completion.length} characters
              </p>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      {!completion && !isLoading && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-3">💡 How it Works</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              Enter your content prompt above (be specific for best results)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              The AI will use your brand&apos;s persona and uploaded documents for context
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              Watch as content streams in real-time with your brand&apos;s unique voice
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
