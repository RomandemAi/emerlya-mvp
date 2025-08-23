'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import LogoutButton from './LogoutButton';
import {
  ModernUserIcon,
  ModernInfoIcon,
  ModernDollarIcon,
  ModernStarIcon,
  ModernPencilIcon,
  ModernPhoneIcon,
  ModernWrenchIcon
} from './ModernIcons';

interface UnifiedNavBarProps {
  onMobileMenuClick?: () => void;
}

export default function UnifiedNavBar({ onMobileMenuClick }: UnifiedNavBarProps) {
  const { user, loading } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-3 backdrop-blur-xl bg-primary/90 border-b border-primary/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Mobile Menu Button */}
        {onMobileMenuClick && (
          <button
            onClick={onMobileMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Open mobile menu"
            title="Open mobile menu"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        
        {/* Logo and Home Link */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <img 
              src="/emerlya-logo.svg" 
              alt="Emerlya AI Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <span className="text-xl font-semibold text-white font-heading hover:text-accent transition-colors">
            Emerlya AI
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {user && (
            <Link href="/dashboard" className="text-white/80 hover:text-accent transition-colors font-medium">
              Dashboard
            </Link>
          )}
          <Link href="/about" className="text-white/80 hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/features" className="text-white/80 hover:text-accent transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-white/80 hover:text-accent transition-colors">
            Pricing
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

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-8 h-8 bg-white/20 rounded-lg animate-pulse"></div>
          ) : user ? (
            /* Logged In User Menu */
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 px-4 py-2 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl hover:bg-white/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-heading">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-white truncate max-w-32">
                    {user.email?.split('@')[0]}
                  </div>
                  <div className="text-xs text-white/70">
                    Pro Plan
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

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 backdrop-blur-xl bg-white/90 border border-white/50 rounded-2xl shadow-xl z-50">
                  <div className="p-4 border-b border-gray-200/50">
                    <div className="text-sm font-medium text-primary truncate">{user.email}</div>
                    <div className="text-xs text-gray-600">
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                        Pro Plan
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <Link 
                      href="/dashboard"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <ModernUserIcon className="mr-3" size="sm" />
                      My Dashboard
                    </Link>
                    
                    {/* Mobile Navigation Links */}
                    <div className="md:hidden border-t border-gray-200/50 mt-2 pt-2">
                      <Link 
                        href="/about"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ModernInfoIcon className="mr-3" size="sm" />
                        About
                      </Link>
                      <Link 
                        href="/features"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ModernStarIcon className="mr-3" size="sm" />
                        Features
                      </Link>
                      <Link 
                        href="/pricing"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ModernDollarIcon className="mr-3" size="sm" />
                        Pricing
                      </Link>
                      <Link 
                        href="/blog"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ModernPencilIcon className="mr-3" size="sm" />
                        Blog
                      </Link>
                      <Link 
                        href="/contact"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ModernPhoneIcon className="mr-3" size="sm" />
                        Contact
                      </Link>
                      <Link 
                        href="/api-docs"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-xl transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ModernWrenchIcon className="mr-3" size="sm" />
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
          ) : (
            /* Not Logged In */
            <div className="flex items-center space-x-4">
              <Link href="/demo">
                <button className="px-5 py-2 bg-accent text-primary rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                  Request Demo
                </button>
              </Link>
              <Link href="/login">
                <button className="px-5 py-2 border border-white/30 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200">
                  Login
                </button>
              </Link>
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
