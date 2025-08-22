'use client';
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from './LogoutButton';
import {
  UserIcon,
  InformationCircleIcon,
  CurrencyDollarIcon,
  StarIcon,
  PencilIcon,
  PhoneIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

interface TopNavBarProps {
  userEmail: string;
  subscriptionStatus?: string | null;
  onMobileMenuClick?: () => void;
}

export default function TopNavBar({ userEmail, subscriptionStatus, onMobileMenuClick }: TopNavBarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-3 backdrop-blur-xl bg-primary/90 border-b border-primary/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Mobile Menu Button */}
        {onMobileMenuClick && (
          <button
            onClick={onMobileMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        
        {/* Logo and Home Link */}
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

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className="text-white/80 hover:text-accent transition-colors font-medium">
            Dashboard
          </Link>
          <Link href="/about" className="text-white/80 hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/pricing" className="text-white/80 hover:text-accent transition-colors">
            Pricing
          </Link>
          <Link href="/features" className="text-white/80 hover:text-accent transition-colors">
            Features
          </Link>
          <Link href="/blog" className="text-white/80 hover:text-accent transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="text-white/80 hover:text-accent transition-colors">
            Contact
          </Link>
          <Link href="/api-docs" className="text-white/80 hover:text-accent transition-colors">
            API
          </Link>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-3 px-4 py-2 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl hover:bg-white/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-heading">
                {userEmail.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-white truncate max-w-32">
                {userEmail.split('@')[0]}
              </div>
              <div className="text-xs text-white/70">
                {subscriptionStatus === 'active' ? 'Pro Plan' : 'Free Plan'}
              </div>
            </div>
            <svg 
              className={`w-4 h-4 text-white/70 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 backdrop-blur-xl bg-white/90 border border-white/50 rounded-2xl shadow-xl z-50">
              <div className="p-4 border-b border-gray-200/50">
                <div className="text-sm font-medium text-primary truncate">{userEmail}</div>
                <div className="text-xs text-gray-600">
                  {subscriptionStatus === 'active' ? (
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
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
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <UserIcon className="w-4 h-4 mr-3 text-gray-600" />
                  My Dashboard
                </Link>
                
                {/* Mobile Navigation Links */}
                <div className="md:hidden border-t border-gray-200/50 mt-2 pt-2">
                  <Link 
                    href="/about"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <InformationCircleIcon className="w-4 h-4 mr-3 text-gray-600" />
                    About
                  </Link>
                  <Link 
                    href="/pricing"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <CurrencyDollarIcon className="w-4 h-4 mr-3 text-gray-600" />
                    Pricing
                  </Link>
                  <Link 
                    href="/features"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <StarIcon className="w-4 h-4 mr-3 text-gray-600" />
                    Features
                  </Link>
                  <Link 
                    href="/blog"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <PencilIcon className="w-4 h-4 mr-3 text-gray-600" />
                    Blog
                  </Link>
                  <Link 
                    href="/contact"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <PhoneIcon className="w-4 h-4 mr-3 text-gray-600" />
                    Contact
                  </Link>
                  <Link 
                    href="/api-docs"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <WrenchScrewdriverIcon className="w-4 h-4 mr-3 text-gray-600" />
                    API Docs
                  </Link>
                </div>
                
                <div className="border-t border-gray-200/50 mt-2 pt-2">
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
