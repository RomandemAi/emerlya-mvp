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
      <div className="flex justify-between items-center mb-5">
        <div>
                  <h1 className="text-lg md:text-xl font-bold font-heading text-gray-900 mb-2">
          {activeTab === 'brands' ? 'AI Content Creation' :
           activeTab === 'library' ? 'Content Library' :
           activeTab === 'analytics' ? 'Analytics & Insights' :
           activeTab === 'calendar' ? 'Content Calendar' :
           'API Access'}
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          {activeTab === 'brands' ? 'Create amazing text content and images with AI. Manage your brand identities and generate content that matches your unique voice.' :
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
      <div className="flex space-x-0.5 mb-5 bg-gray-100 rounded-lg p-0.5">
        {[
          { key: 'brands' as const, label: 'Create', icon: <SparklesIcon size={20} /> },
          { key: 'library' as const, label: 'Library', icon: <DocumentIcon size={20} /> },
          { key: 'analytics' as const, label: 'Analytics', icon: <BarChartIcon size={20} /> },
          { key: 'calendar' as const, label: 'Calendar', icon: <CalendarIcon size={20} /> },
          { key: 'api' as const, label: 'API', icon: <KeyIcon size={20} /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === tab.key
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
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
