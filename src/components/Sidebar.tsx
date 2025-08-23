'use client';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import ManageBillingButton from './ManageBillingButton';
import UpgradeButton from './UpgradeButton';
import {
  ModernUserIcon,
  ModernHomeIcon,
  ModernInfoIcon,
  ModernDollarIcon,
  ModernStarIcon,
  ModernPencilIcon,
  ModernPhoneIcon,
  ModernWrenchIcon,
  ModernSparklesIcon,
  ModernDocumentIcon,
  ModernSettingsIcon
} from './ModernIcons';

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
    <div className="h-full backdrop-blur-xl bg-white/90 border-r border-white/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/50">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <img 
              src="/emerlya-logo.svg" 
              alt="Emerlya AI Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <span className="text-xl font-semibold font-heading text-primary hover:text-accent transition-colors">
              Emerlya AI
            </span>
            <div className="text-xs text-gray-500">Dashboard</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <nav className="space-y-3">
          {/* Dashboard Section */}
          <div>
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 text-primary font-medium transition-all duration-200 hover:shadow-md text-sm"
            >
              <ModernUserIcon size="xs" />
              <span>My Brands</span>
            </Link>
          </div>

          {/* Website Section */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              Website
            </div>
            <div className="space-y-0.5">
              <Link 
                href="/"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-primary/5 transition-all duration-200 hover:text-primary text-sm"
              >
                <ModernHomeIcon size="xs" />
                <span>Home</span>
              </Link>
              <Link 
                href="/about"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-primary/5 transition-all duration-200 hover:text-primary text-sm"
              >
                <ModernInfoIcon size="xs" />
                <span>About</span>
              </Link>
              <Link 
                href="/pricing"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-primary/5 transition-all duration-200 hover:text-primary text-sm"
              >
                <ModernDollarIcon size="xs" />
                <span>Pricing</span>
              </Link>
              <Link 
                href="/features"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-primary/5 transition-all duration-200 hover:text-primary text-sm"
              >
                <ModernStarIcon size="xs" />
                <span>Features</span>
              </Link>
              <Link 
                href="/blog"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-primary/5 transition-all duration-200 hover:text-primary text-sm"
              >
                <ModernPencilIcon size="xs" />
                <span>Blog</span>
              </Link>
              <Link 
                href="/contact"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-primary/5 transition-all duration-200 hover:text-primary text-sm"
              >
                <ModernPhoneIcon size="xs" />
                <span>Contact</span>
              </Link>
              <Link 
                href="/api-docs"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-primary/5 transition-all duration-200 hover:text-primary text-sm"
              >
                <ModernWrenchIcon size="xs" />
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
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-primary/5 transition-all duration-200 hover:text-primary text-sm w-full text-left"
              >
                <ModernSparklesIcon size="xs" />
                <span>Generate Content</span>
              </button>
              <button 
                onClick={onDocumentsClick}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-primary/5 transition-all duration-200 hover:text-primary text-sm w-full text-left"
              >
                <ModernDocumentIcon size="xs" />
                <span>Documents</span>
              </button>
              <button 
                onClick={onSettingsClick}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-primary/5 transition-all duration-200 hover:text-primary text-sm w-full text-left"
              >
                <ModernSettingsIcon size="xs" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* User Profile & Actions */}
      <div className="p-6 border-t border-white/50 space-y-4">
        <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-neutral/50 to-neutral/30 border border-white/50">
          <div className="text-sm font-medium font-heading text-primary mb-1">Account</div>
          <div className="text-xs text-gray-600 truncate">{userEmail}</div>
          <div className="mt-2">
            {subscriptionStatus === 'active' ? (
              <div className="inline-flex items-center px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium">
                <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
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
