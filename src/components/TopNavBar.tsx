'use client';
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from './LogoutButton';

interface TopNavBarProps {
  userEmail: string;
  subscriptionStatus?: string | null;
}

export default function TopNavBar({ userEmail, subscriptionStatus }: TopNavBarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-3 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Home Link */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Emerlya AI
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Dashboard
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </Link>
          <Link href="/api-docs" className="text-gray-600 hover:text-gray-900 transition-colors">
            API
          </Link>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-3 px-4 py-2 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {userEmail.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-gray-900 truncate max-w-32">
                {userEmail.split('@')[0]}
              </div>
              <div className="text-xs text-gray-500">
                {subscriptionStatus === 'active' ? 'Pro Plan' : 'Free Plan'}
              </div>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 backdrop-blur-xl bg-white/90 border border-gray-200 rounded-2xl shadow-xl z-50">
              <div className="p-4 border-b border-gray-200">
                <div className="text-sm font-medium text-gray-900 truncate">{userEmail}</div>
                <div className="text-xs text-gray-500">
                  {subscriptionStatus === 'active' ? (
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Pro Plan
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                      Free Plan
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-2">
                <Link 
                  href="/dashboard"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <span className="mr-3">🎭</span>
                  My Dashboard
                </Link>
                
                {/* Mobile Navigation Links */}
                <div className="md:hidden border-t border-gray-200 mt-2 pt-2">
                  <Link 
                    href="/about"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <span className="mr-3">📖</span>
                    About
                  </Link>
                  <Link 
                    href="/pricing"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <span className="mr-3">💰</span>
                    Pricing
                  </Link>
                  <Link 
                    href="/features"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <span className="mr-3">⭐</span>
                    Features
                  </Link>
                  <Link 
                    href="/blog"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <span className="mr-3">📝</span>
                    Blog
                  </Link>
                  <Link 
                    href="/contact"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <span className="mr-3">📞</span>
                    Contact
                  </Link>
                  <Link 
                    href="/api-docs"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <span className="mr-3">🔧</span>
                    API Docs
                  </Link>
                </div>
                
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div onClick={() => setIsUserMenuOpen(false)}>
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}
