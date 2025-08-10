'use client';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import ManageBillingButton from './ManageBillingButton';
import UpgradeButton from './UpgradeButton';

interface SidebarProps {
  userEmail: string;
  subscriptionStatus: string | null;
  onGenerateClick?: () => void;
  onDocumentsClick?: () => void;
  onSettingsClick?: () => void;
}

export default function Sidebar({ 
  userEmail, 
  subscriptionStatus,
  onGenerateClick,
  onDocumentsClick,
  onSettingsClick
}: SidebarProps) {
  return (
    <div className="h-full backdrop-blur-xl bg-white/80 border-r border-gray-200/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <div>
            <span className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Emerlya AI
            </span>
            <div className="text-xs text-gray-500">Dashboard</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-6 overflow-y-auto">
        <nav className="space-y-4">
          {/* Dashboard Section */}
          <div>
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-indigo-700 font-medium transition-all duration-200 hover:shadow-md"
            >
              <span>🎭</span>
              <span>My Brands</span>
            </Link>
          </div>

          {/* Website Section */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
              Website
            </div>
            <div className="space-y-1">
              <Link 
                href="/"
                className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:text-gray-900"
              >
                <span>🏠</span>
                <span>Home</span>
              </Link>
              <Link 
                href="/about"
                className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:text-gray-900"
              >
                <span>📖</span>
                <span>About</span>
              </Link>
              <Link 
                href="/pricing"
                className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:text-gray-900"
              >
                <span>💰</span>
                <span>Pricing</span>
              </Link>
              <Link 
                href="/features"
                className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:text-gray-900"
              >
                <span>⭐</span>
                <span>Features</span>
              </Link>
              <Link 
                href="/blog"
                className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:text-gray-900"
              >
                <span>📝</span>
                <span>Blog</span>
              </Link>
              <Link 
                href="/contact"
                className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:text-gray-900"
              >
                <span>📞</span>
                <span>Contact</span>
              </Link>
              <Link 
                href="/api-docs"
                className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:text-gray-900"
              >
                <span>🔧</span>
                <span>API Docs</span>
              </Link>
            </div>
          </div>
          
          {/* Quick Actions Section */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
              Quick Actions
            </div>
            <div className="space-y-1">
              <button 
                onClick={onGenerateClick}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:text-gray-900 w-full text-left"
              >
                <span>✨</span>
                <span>Generate Content</span>
              </button>
              <button 
                onClick={onDocumentsClick}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:text-gray-900 w-full text-left"
              >
                <span>📄</span>
                <span>Documents</span>
              </button>
              <button 
                onClick={onSettingsClick}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:text-gray-900 w-full text-left"
              >
                <span>⚙️</span>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* User Profile & Actions */}
      <div className="p-6 border-t border-gray-200/50 space-y-4">
        <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200">
          <div className="text-sm font-medium text-gray-900 mb-1">Account</div>
          <div className="text-xs text-gray-600 truncate">{userEmail}</div>
          <div className="mt-2">
            {subscriptionStatus === 'active' ? (
              <div className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-800 text-xs font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Pro Plan
              </div>
            ) : (
              <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-medium">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Free Plan
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          {subscriptionStatus === 'active' ? (
            <ManageBillingButton />
          ) : (
            <UpgradeButton />
          )}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
