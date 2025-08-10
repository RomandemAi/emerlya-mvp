'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CreateBrandForm from './CreateBrandForm';
import BrandSettingsModal from './BrandSettingsModal';
import BrandDocumentsModal from './BrandDocumentsModal';

interface Brand {
  id: string;
  name: string;
  created_at: string;
  persona_config_json?: any;
}

interface DashboardContentProps {
  brands: Brand[];
}

export default function DashboardContent({ brands }: DashboardContentProps) {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  return (
    <>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
              Brand Portfolio
            </span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Manage your brand identities and generate AI-powered content that matches your unique voice.
          </p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-medium text-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex items-center space-x-2"
        >
          <span>✨</span>
          <span>Create New Brand</span>
        </button>
      </div>
      
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
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-medium text-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
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
                    <h3 className="text-lg font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 truncate pr-2">
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
                    className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center space-x-2"
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
