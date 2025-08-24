'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CreateBrandForm from './CreateBrandForm';
import BrandSettingsModal from './BrandSettingsModal';
import BrandDocumentsModal from './BrandDocumentsModal';
import AnalyticsDashboard from './AnalyticsDashboard';
import ContentCalendar from './ContentCalendar';
import ApiKeyDashboard from './ApiKeyDashboard';
import ContentLibrary from './ContentLibrary';
import UnifiedContentCreator from './UnifiedContentCreator';
import { SparklesIcon, BarChartIcon, CalendarIcon, KeyIcon, DocumentIcon } from './icons';

interface Brand {
  id: string;
  name: string;
  created_at: string;
  persona_config_json?: any;
}

interface DashboardContentProps {
  brands: Brand[];
  userEmail: string;
  subscriptionStatus: string | null;
}

export default function DashboardContent({ brands, userEmail, subscriptionStatus }: DashboardContentProps) {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
      const [activeTab, setActiveTab] = useState<'brands' | 'library' | 'analytics' | 'calendar' | 'api'>('brands');

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg md:text-xl font-bold font-heading text-gray-900 mb-2 truncate">
            {activeTab === 'brands' ? 'Select Your Brand' :
             activeTab === 'library' ? 'Content Library' :
             activeTab === 'analytics' ? 'Analytics & Insights' :
             activeTab === 'calendar' ? 'Content Calendar' :
             'API Access'}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
            {activeTab === 'brands' ? 'Choose a brand to create content for. Each brand has its own unique voice, style, and personality that AI will match.' :
             activeTab === 'library' ? 'Browse and manage all your generated content - text and images in one place.' :
             activeTab === 'analytics' ? 'Track your content performance and see how much time you\'ve saved with AI.' :
             activeTab === 'calendar' ? 'Plan, schedule, and organize your content creation workflow.' :
             'Manage API keys and integrate Emerlya AI into your applications.'}
          </p>
        </div>
        {activeTab === 'brands' && (
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center space-x-1.5"
          >
            <SparklesIcon size={16} />
            <span>Create Brand</span>
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-0.5 mb-5 bg-gray-100 rounded-lg p-0.5 overflow-x-auto">
        {[
          { key: 'brands' as const, label: 'Create', icon: <SparklesIcon size={18} className="md:w-5 md:h-5" /> },
          { key: 'library' as const, label: 'Library', icon: <DocumentIcon size={18} className="md:w-5 md:h-5" /> },
          { key: 'analytics' as const, label: 'Analytics', icon: <BarChartIcon size={18} className="md:w-5 md:h-5" /> },
          { key: 'calendar' as const, label: 'Calendar', icon: <CalendarIcon size={18} className="md:w-5 md:h-5" /> },
          { key: 'api' as const, label: 'API', icon: <KeyIcon size={18} className="md:w-5 md:h-5" /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 min-w-0 px-2 md:px-3 py-2 md:py-2.5 rounded-md text-xs md:text-sm font-medium transition-all flex flex-col md:flex-row items-center justify-center space-y-0.5 md:space-y-0 md:space-x-1.5 ${
              activeTab === tab.key
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <span className="flex-shrink-0">{tab.icon}</span>
            <span className="truncate text-[10px] md:text-xs leading-tight">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'library' && (
        <ContentLibrary />
      )}
      

      
      {activeTab === 'brands' && (
        <UnifiedContentCreator
          brands={brands}
          subscriptionStatus={subscriptionStatus}
          onCreateBrand={() => setIsCreateModalOpen(true)}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsDashboard />
      )}

      {activeTab === 'calendar' && (
        <ContentCalendar />
      )}

      {activeTab === 'api' && (
        <ApiKeyDashboard 
          userEmail={userEmail} 
          subscriptionStatus={subscriptionStatus} 
        />
      )}

      <CreateBrandForm 
        isOpen={isCreateModalOpen} 
        onClose={() => {
          setIsCreateModalOpen(false);
          router.refresh(); // Refresh to show new brand
        }} 
      />

      {selectedBrand && (
        <>
          <BrandSettingsModal
            isOpen={isSettingsModalOpen}
            onClose={() => {
              setIsSettingsModalOpen(false);
              setSelectedBrand(null);
            }}
            brand={selectedBrand}
            onBrandUpdated={() => {
              router.refresh(); // Refresh to show updated brand
            }}
            onBrandDeleted={() => {
              router.refresh(); // Refresh to remove deleted brand
            }}
          />

          <BrandDocumentsModal
            isOpen={isDocumentsModalOpen}
            onClose={() => {
              setIsDocumentsModalOpen(false);
              setSelectedBrand(null);
            }}
            brandId={selectedBrand.id}
            brandName={selectedBrand.name}
          />
        </>
      )}
    </>
  );
}
