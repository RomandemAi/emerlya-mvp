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
      />
      
      {/* Sidebar */}
      <div className="w-80 fixed h-full z-40 pt-16">
        <Sidebar 
          userEmail={userEmail} 
          subscriptionStatus={subscriptionStatus}
          onGenerateClick={() => setIsBrandSelectorOpen(true)}
          onDocumentsClick={() => setIsDocumentsOpen(true)}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 ml-80 pt-16 p-8 min-h-screen">
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
