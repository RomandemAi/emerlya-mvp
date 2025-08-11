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
  },
  {
    brand: "FinanceForward",
    voice: "Trustworthy, Expert, Accessible",
    contentType: "LinkedIn Post",
    prompt: "Share insights about market trends",
    result: "📊 Market Update: What This Week's Economic Data Means for Your Portfolio\n\nThe latest inflation figures came in lower than expected, but here's what you need to know beyond the headlines:\n\n✅ Consumer spending remains resilient\n✅ Tech sector showing renewed strength\n✅ Interest rate environment stabilizing\n\n💡 Key takeaway: Stay focused on your long-term strategy. Market volatility creates opportunities for disciplined investors.\n\nWhat questions do you have about navigating current market conditions? Let's discuss in the comments.\n\n#InvestmentStrategy #MarketAnalysis #FinancialPlanning"
  },
  {
    brand: "Urban Eats",
    voice: "Vibrant, Food-Loving, Community-Focused",
    contentType: "Social Media Campaign",
    prompt: "Promote a new healthy menu item",
    result: "🥗 NEW ARRIVAL ALERT! 🥗\n\nMeet our Buddha Bowl Bliss – the colorful creation that's about to become your new obsession!\n\n🌈 What's inside?\n• Quinoa power base\n• Roasted sweet potato cubes\n• Crispy chickpeas\n• Fresh avocado slices\n• House-made tahini drizzle\n• Microgreens for that extra pop!\n\nNutrition meets flavor in the most Instagram-worthy way possible. Plus, it's completely plant-based and packed with 22g of protein!\n\n🎉 Available now at all locations. Tag a friend who needs to try this!\n\n#BuddhaBlowl #PlantBased #HealthyEats #FreshFlavors"
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
      
      // Faster typing on mobile devices
      const isMobile = window.innerWidth < 768;
      const typingSpeed = isMobile ? 20 : 30;
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setTypedText(text.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, typingSpeed);

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
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-3 backdrop-blur-xl bg-primary/90 border-b border-primary/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center overflow-hidden">
              {/* Data Flow E Logo */}
              <div className="relative">
                <span className="text-white font-bold text-xl font-heading relative z-10">E</span>
                {/* Animated data particles */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute w-1 h-1 bg-accent rounded-full animate-pulse" style={{top: '20%', left: '15%', animationDelay: '0s'}}></div>
                  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top: '60%', left: '80%', animationDelay: '0.5s'}}></div>
                  <div className="absolute w-0.5 h-0.5 bg-accent rounded-full animate-pulse" style={{top: '80%', left: '25%', animationDelay: '1s'}}></div>
                  <div className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{top: '35%', left: '70%', animationDelay: '1.5s'}}></div>
                </div>
              </div>
            </div>
            <span className="text-xl font-semibold text-white font-heading hover:text-accent transition-colors">
              Emerlya AI
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 px-5 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-200 hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/about" className="text-white/80 hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/features" className="text-white/80 hover:text-accent transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-white/80 hover:text-accent transition-colors">
                Pricing
              </Link>
            </div>
            <Link href="/login">
              <button className="px-5 py-2 bg-accent text-primary rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold font-heading text-white mb-6">
            Watch how AI adapts content to match your brand's unique voice across different 
            <span className="block text-accent">
              platforms and content types
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            We're building the future of intelligent content creation, helping teams craft 
            compelling stories with the power of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Demo Container */}
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Demo Area */}
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-8 shadow-xl border border-white/50">
            {/* Progress Indicators */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className={`flex items-center ${stage >= 1 ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${stage >= 1 ? 'bg-gradient-to-r from-primary to-accent' : 'bg-gray-300'}`}>
                    <span className="text-white font-semibold text-xs md:text-sm">1</span>
                  </div>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm font-medium text-gray-700">Brand</span>
                </div>
                <div className={`w-8 md:w-16 h-0.5 ${stage >= 2 ? 'bg-primary' : 'bg-gray-300'} transition-colors duration-500`}></div>
                <div className={`flex items-center ${stage >= 2 ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${stage >= 2 ? 'bg-gradient-to-r from-primary to-accent' : 'bg-gray-300'}`}>
                    <span className="text-white font-semibold text-xs md:text-sm">2</span>
                  </div>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm font-medium text-gray-700">Content</span>
                </div>
                <div className={`w-8 md:w-16 h-0.5 ${stage >= 3 ? 'bg-primary' : 'bg-gray-300'} transition-colors duration-500`}></div>
                <div className={`flex items-center ${stage >= 3 ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${stage >= 3 ? 'bg-gradient-to-r from-primary to-accent' : 'bg-gray-300'}`}>
                    <span className="text-white font-semibold text-xs md:text-sm">3</span>
                  </div>
                  <span className="ml-1 md:ml-2 text-xs md:text-sm font-medium text-gray-700">Generate</span>
                </div>
              </div>
            </div>

            {/* Demo Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - Input */}
              <div className="space-y-6">
                {/* Brand Selection */}
                <div className={`transform transition-all duration-700 ${stage >= 1 ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                  <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50">
                    <h3 className="text-base md:text-lg font-semibold text-primary mb-3">Brand Profile</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Brand Name</label>
                        <p className="text-gray-900 font-medium text-sm">{example.brand}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Brand Voice</label>
                        <p className="text-gray-900 text-sm">{example.voice}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Type Selection */}
                <div className={`transform transition-all duration-700 delay-100 ${stage >= 2 ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                  <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50">
                    <h3 className="text-base md:text-lg font-semibold text-primary mb-3">Content Request</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Content Type</label>
                        <p className="text-gray-900 font-medium text-sm">{example.contentType}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Prompt</label>
                        <p className="text-gray-900 text-sm">{example.prompt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Output */}
              <div className={`transform transition-all duration-700 delay-200 ${stage >= 3 ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-4 md:p-6 h-full border border-primary/20">
                  <h3 className="text-base md:text-lg font-semibold text-primary mb-4">AI Generated Content</h3>
                  <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
                    {stage >= 3 && (
                      <div className="space-y-3">
                        <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed break-words">
                          {typedText}
                          {isTyping && <span className="animate-pulse">|</span>}
                        </p>
                      </div>
                    )}
                  </div>
                  {!isTyping && stage >= 3 && (
                    <div className="mt-4 md:mt-6 pt-4 border-t border-primary/20">
                      <p className="text-xs md:text-sm text-primary font-medium">
                        ✨ Content generated with {example.brand}'s unique voice
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center mt-8 space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={nextExample}
                className="px-4 md:px-6 py-3 backdrop-blur-xl bg-white/80 border border-gray-200/50 text-gray-700 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-sm md:text-base"
              >
                Try Another Example
              </button>
              <Link href="/login">
                <button className="px-4 md:px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-sm md:text-base">
                  Create Your Own
                </button>
              </Link>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Brand Consistency</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every piece of content perfectly matches your brand voice and maintains consistency across all channels
              </p>
            </div>
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Generate professional content in seconds, not hours. Scale your content creation effortlessly
              </p>
            </div>
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Scale Infinitely</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Create unlimited content across all channels and platforms with intelligent automation
              </p>
            </div>
          </div>

          {/* Content Types Section */}
          <div className="mt-12">
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-8 shadow-xl border border-white/50">
              <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-6 text-center">
                Supported Content Types
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">📱</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Social Media Posts</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✉️</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Email Campaigns</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">📝</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Blog Articles</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🛍️</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Product Descriptions</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">💼</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">LinkedIn Content</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">📢</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Ad Copy</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">📊</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Reports & Articles</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🎯</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Custom Content</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="backdrop-blur-xl bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 shadow-xl border border-primary/20">
              <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">
                Ready to Transform Your Content Creation?
              </h2>
              <p className="text-base text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                Join thousands of businesses already using Emerlya AI to create consistent, high-quality content that resonates with their audience.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link href="/login">
                  <button className="px-6 md:px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-sm md:text-base w-full sm:w-auto">
                    Start Free Trial
                  </button>
                </Link>
                <Link href="/pricing">
                  <button className="px-6 md:px-8 py-3 backdrop-blur-xl bg-white/80 border border-gray-200/50 text-gray-700 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-sm md:text-base w-full sm:w-auto">
                    View Pricing
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold font-heading">E</span>
                </div>
                <span className="text-xl font-semibold font-heading text-white">Emerlya AI</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Intelligent content generation for modern teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold font-heading text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-white/80 hover:text-accent transition-colors text-sm">Features</Link></li>
                <li><Link href="/pricing" className="text-white/80 hover:text-accent transition-colors text-sm">Pricing</Link></li>
                <li><Link href="/api-docs" className="text-white/80 hover:text-accent transition-colors text-sm">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold font-heading text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-white/80 hover:text-accent transition-colors text-sm">About</Link></li>
                <li><Link href="/blog" className="text-white/80 hover:text-accent transition-colors text-sm">Blog</Link></li>
                <li><Link href="/contact" className="text-white/80 hover:text-accent transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold font-heading text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-white/80 hover:text-accent transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-white/80 hover:text-accent transition-colors text-sm">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-white/80 hover:text-accent transition-colors text-sm">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p className="text-white/80 text-sm">
              © 2025 Emerlya AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
