'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DemoExample {
  brand: string;
  voice: string;
  contentType: string;
  prompt: string;
  result: string;
}

const demoExamples: DemoExample[] = [
  {
    brand: "EcoLife Sustainable",
    voice: "Friendly, Environmental, Inspiring",
    contentType: "Instagram Post",
    prompt: "Create a post about reducing carbon footprint",
    result: "🌱 Small changes, big impact! Today we're sharing 3 simple swaps that can reduce your carbon footprint by 30%:\n\n1. 🚴 Bike to work once a week\n2. 🥗 Try Meatless Mondays\n3. 🛍️ Bring reusable bags everywhere\n\nWhich eco-warrior move will you try first? Share your green journey with us!\n\n#SustainableLiving #EcoWarrior #GreenLife #ClimateAction"
  },
  {
    brand: "TechFlow Solutions",
    voice: "Professional, Innovative, Clear",
    contentType: "Blog Introduction",
    prompt: "Write about AI in business automation",
    result: "The landscape of business automation is undergoing a revolutionary transformation. As artificial intelligence continues to evolve at an unprecedented pace, forward-thinking companies are discovering powerful new ways to streamline operations, enhance decision-making, and create exceptional customer experiences.\n\nIn this comprehensive guide, we'll explore how AI-powered automation is not just changing the game—it's rewriting the rules entirely."
  },
  {
    brand: "Wellness Journey",
    voice: "Empathetic, Motivational, Holistic",
    contentType: "Email Newsletter",
    prompt: "Welcome email for new wellness program members",
    result: "Dear Wellness Warrior,\n\nWelcome to your transformative journey! 🌟\n\nWe're absolutely thrilled you've taken this powerful step toward a healthier, more balanced you. Your decision to prioritize your well-being is not just brave—it's life-changing.\n\nOver the next few weeks, we'll be your trusted companion, sharing personalized tips, mindful practices, and science-backed strategies to help you flourish in body, mind, and spirit.\n\nRemember: Every small step counts, and you're already on your way.\n\nWith warmth and wellness,\nThe Wellness Journey Team"
  },
  {
    brand: "CraftBrew Artisans",
    voice: "Casual, Passionate, Authentic",
    contentType: "Product Description",
    prompt: "Describe a new seasonal craft beer",
    result: "Autumn Harvest Amber Ale - Our Latest Labor of Love\n\nWe've been tinkering in the brewhouse again, and boy, do we have something special for you. This isn't just another seasonal—it's autumn in a glass.\n\nPour yourself a pint and you'll catch notes of caramelized apple, a hint of cinnamon that doesn't overpower, and that smooth, malty backbone we're known for. At 5.8% ABV, it's the perfect companion for crisp evenings and good conversations.\n\nLocally sourced ingredients. Small-batch crafted. Ridiculously drinkable.\n\nAvailable on tap and in limited 4-packs while the leaves are still falling."
  }
];

export default function DemoPage() {
  const [currentExample, setCurrentExample] = useState(0);
  const [stage, setStage] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const example = demoExamples[currentExample];

  useEffect(() => {
    if (stage === 3 && !isTyping) {
      setIsTyping(true);
      setTypedText('');
      let index = 0;
      const text = example.result;
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setTypedText(text.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }
  }, [stage, example.result, isTyping]);

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % demoExamples.length);
    setStage(0);
    setTypedText('');
  };

  const startDemo = () => {
    setStage(1);
    setTimeout(() => setStage(2), 1500);
    setTimeout(() => setStage(3), 3000);
  };

  useEffect(() => {
    if (stage === 0) {
      const timer = setTimeout(() => startDemo(), 1000);
      return () => clearTimeout(timer);
    }
  }, [stage, currentExample]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Emerlya AI
            </span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/login">
              <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Demo Container */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See Emerlya AI in Action
            </h1>
            <p className="text-xl text-gray-600">
              Watch how AI adapts content to match your brand&apos;s unique voice
            </p>
          </div>

          {/* Demo Area */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl border border-white/50">
            {/* Progress Indicators */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center ${stage >= 1 ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stage >= 1 ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-semibold">1</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">Brand</span>
                </div>
                <div className={`w-16 h-0.5 ${stage >= 2 ? 'bg-indigo-600' : 'bg-gray-300'} transition-colors duration-500`}></div>
                <div className={`flex items-center ${stage >= 2 ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stage >= 2 ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-semibold">2</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">Content</span>
                </div>
                <div className={`w-16 h-0.5 ${stage >= 3 ? 'bg-indigo-600' : 'bg-gray-300'} transition-colors duration-500`}></div>
                <div className={`flex items-center ${stage >= 3 ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stage >= 3 ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">Generate</span>
                </div>
              </div>
            </div>

            {/* Demo Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - Input */}
              <div className="space-y-6">
                {/* Brand Selection */}
                <div className={`transform transition-all duration-700 ${stage >= 1 ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                  <div className="bg-white/80 rounded-2xl p-6 border border-gray-200/50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Brand Profile</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Brand Name</label>
                        <p className="text-gray-900 font-medium">{example.brand}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Brand Voice</label>
                        <p className="text-gray-900">{example.voice}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Type Selection */}
                <div className={`transform transition-all duration-700 delay-100 ${stage >= 2 ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                  <div className="bg-white/80 rounded-2xl p-6 border border-gray-200/50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Request</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Content Type</label>
                        <p className="text-gray-900 font-medium">{example.contentType}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Prompt</label>
                        <p className="text-gray-900">{example.prompt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Output */}
              <div className={`transform transition-all duration-700 delay-200 ${stage >= 3 ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 h-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Generated Content</h3>
                  <div className="min-h-[200px]">
                    {stage >= 3 && (
                      <div className="space-y-3">
                        <p className="text-gray-800 whitespace-pre-wrap">
                          {typedText}
                          {isTyping && <span className="animate-pulse">|</span>}
                        </p>
                      </div>
                    )}
                  </div>
                  {!isTyping && stage >= 3 && (
                    <div className="mt-6 pt-4 border-t border-indigo-200">
                      <p className="text-sm text-indigo-600 font-medium">
                        ✨ Content generated with {example.brand}&apos;s unique voice
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={nextExample}
                className="px-6 py-3 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                Try Another Example
              </button>
              <Link href="/login">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                  Create Your Own
                </button>
              </Link>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Brand Consistency</h3>
              <p className="text-sm text-gray-600">Every piece of content perfectly matches your brand voice</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">Generate professional content in seconds, not hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Scale Infinitely</h3>
              <p className="text-sm text-gray-600">Create unlimited content across all channels</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>© 2025 Emerlya AI. All rights reserved. | Built with ❤️ in the EU 🇪🇺</p>
        </div>
      </footer>
    </div>
  );
}
