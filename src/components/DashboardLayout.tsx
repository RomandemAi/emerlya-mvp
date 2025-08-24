'use client';
import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';

import CheckoutSuccessHandler from './CheckoutSuccessHandler';
import BrandSelectorModal from './BrandSelectorModal';
import GlobalDocumentsModal from './GlobalDocumentsModal';
import SettingsModal from './SettingsModal';
import CreateBrandForm from './CreateBrandForm';

interface Brand {
  id: string;
  name: string;
  created_at: string;
  persona_config_json?: any;
}

interface DashboardLayoutProps {
  userEmail: string;
  subscriptionStatus: string | null;
  brands: Brand[];
  children: React.ReactNode;
}

export default function DashboardLayout({
  userEmail,
  subscriptionStatus,
  brands,
  children,
}: DashboardLayoutProps) {
  const router = useRouter();
  const [isBrandSelectorOpen, setIsBrandSelectorOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateBrandOpen, setIsCreateBrandOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleBrandUpdate = () => {
    router.refresh(); // Refresh to get updated brands data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Suspense fallback={null}>
        <CheckoutSuccessHandler />
      </Suspense>
      

      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed h-full z-40 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:w-64 lg:z-40
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64
      `}>
        {/* Mobile Close Button */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden absolute top-4 right-4 z-50">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        <Sidebar 
          userEmail={userEmail} 
          subscriptionStatus={subscriptionStatus}
          onGenerateClick={() => {
            setIsBrandSelectorOpen(true);
            setIsMobileSidebarOpen(false);
          }}
          onDocumentsClick={() => {
            setIsDocumentsOpen(true);
            setIsMobileSidebarOpen(false);
          }}
          onSettingsClick={() => {
            setIsSettingsOpen(true);
            setIsMobileSidebarOpen(false);
          }}
          onMobileLinkClick={() => setIsMobileSidebarOpen(false)}
        />
      </div>
      
      {/* Mobile Header with Hamburger Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-30 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-2">
            <img 
              src="/emerlya-logo.svg" 
              alt="Emerlya AI" 
              className="w-8 h-8"
            />
            <span className="text-lg font-semibold text-primary">Emerlya AI</span>
          </div>
          
          <div className="w-10"></div> {/* Spacer for center alignment */}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-3 lg:p-4 min-h-screen pt-16 lg:pt-4">
        {children}
      </main>

      {/* Modals */}
      <BrandSelectorModal
        isOpen={isBrandSelectorOpen}
        onClose={() => setIsBrandSelectorOpen(false)}
        brands={brands}
        onCreateNew={() => {
          setIsBrandSelectorOpen(false);
          setIsCreateBrandOpen(true);
        }}
      />

      <GlobalDocumentsModal
        isOpen={isDocumentsOpen}
        onClose={() => setIsDocumentsOpen(false)}
        brands={brands}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userEmail={userEmail}
        subscriptionStatus={subscriptionStatus}
        brands={brands}
        onBrandUpdate={handleBrandUpdate}
      />

      <CreateBrandForm
        isOpen={isCreateBrandOpen}
        onClose={() => {
          setIsCreateBrandOpen(false);
          handleBrandUpdate();
        }}
      />
    </div>
  );
}
