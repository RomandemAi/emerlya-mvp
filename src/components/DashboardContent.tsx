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
import { SparklesIcon, TargetIcon, BarChartIcon, CalendarIcon, KeyIcon, DocumentIcon } from './icons';

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
            {activeTab === 'brands' ? 'My Brand Portfolio' : 
             activeTab === 'analytics' ? 'Analytics & Insights' : 
             activeTab === 'calendar' ? 'Content Calendar' : 
             'API Access'}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            {activeTab === 'brands' ? 'Manage your brand identities and generate AI-powered content that matches your unique voice.' :
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
          { key: 'brands' as const, label: 'Brands', icon: <TargetIcon size={20} /> },
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
        <div>
          {brands.length === 0 ? (
          <div className="text-center py-20">
            <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-16 shadow-2xl border border-white/50 max-w-2xl mx-auto">
              <div className="text-8xl mb-8">🎭</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create Your First Brand?</h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Transform your content creation process with AI that understands your brand&apos;s unique personality and voice.
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-medium text-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                Get Started Now
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {brands.map((brand) => (
              <div key={brand.id} className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 truncate pr-2">
                      {brand.name}
                    </h3>
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-sm flex-shrink-0"></div>
                  </div>
                  <p className="text-gray-500 text-xs font-medium">
                    {new Date(brand.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Link 
                    href={`/brands/${brand.id}`}
                    className="w-full px-4 py-3 bg-gradient-to-r from-primary to-accent text-white text-center text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                  >
                    <span>✨</span>
                    <span>Create Amazing Content</span>
                  </Link>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => {
                        setSelectedBrand(brand);
                        setIsDocumentsModalOpen(true);
                      }}
                      className="px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center space-x-1"
                    >
                      <span>📄</span>
                      <span>Docs</span>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedBrand(brand);
                        setIsSettingsModalOpen(true);
                      }}
                      className="px-3 py-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center space-x-1"
                    >
                      <span>⚙️</span>
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
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
