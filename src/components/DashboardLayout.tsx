'use client';
import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import TopNavBar from './TopNavBar';
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
      
      {/* Top Navigation Bar */}
      <TopNavBar 
        userEmail={userEmail}
        subscriptionStatus={subscriptionStatus}
        onMobileMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />
      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed h-full z-50 pt-40 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:w-64 lg:z-40
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64
      `}>
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
        />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-40 p-3 lg:p-4 min-h-screen">
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
