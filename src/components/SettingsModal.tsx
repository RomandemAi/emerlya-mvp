'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ModernSettingsIcon,
  ModernUserIcon,
  ModernPencilIcon,
  ModernSparklesIcon
} from './ModernIcons';
import {
  XMarkIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  TrashIcon,
  ChartBarIcon,
  FolderIcon
} from '@heroicons/react/24/outline';

interface Brand {
  id: string;
  name: string;
  created_at: string;
  persona_config_json?: any;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  subscriptionStatus: string | null;
  brands: Brand[];
  onBrandUpdate: () => void;
}

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  userEmail, 
  subscriptionStatus, 
  brands,
  onBrandUpdate 
}: SettingsModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'account' | 'brands'>('account');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [showBrandSettings, setShowBrandSettings] = useState(false);

  const handleBrandEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setShowBrandSettings(true);
  };

  const handleBrandDelete = async (brandId: string) => {
    if (!confirm('Are you sure you want to delete this brand? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/brands/${brandId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete brand');
      }

      onBrandUpdate();
    } catch (error) {
      console.error('Error deleting brand:', error);
      alert('Failed to delete brand. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
            <ModernSettingsIcon size="lg" />
            <span>Settings</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'account'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ModernUserIcon className="mr-2" size="sm" />
            Account Settings
          </button>
          <button
            onClick={() => setActiveTab('brands')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'brands'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserCircleIcon className="w-5 h-5 mr-2" />
            Brand Settings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'account' ? (
          <div className="space-y-6">
            {/* Account Information */}
            <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/50">
              <h3 className="text-xl font-bold text-primary mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium border border-gray-200">
                    {userEmail}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Status</label>
                  <div className="flex items-center gap-3">
                    {subscriptionStatus === 'active' ? (
                      <div className="inline-flex items-center px-4 py-2 rounded-xl bg-green-100 text-green-800 font-medium border border-green-200">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Pro Plan Active
                      </div>
                    ) : (
                      <div className="inline-flex items-center px-4 py-2 rounded-xl bg-gray-100 text-gray-800 font-medium border border-gray-200">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                        Free Plan
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/50">
              <h3 className="text-xl font-bold text-primary mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Email Notifications</label>
                    <p className="text-sm text-gray-600">Receive updates about your content generation</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Content Analytics</label>
                    <p className="text-sm text-gray-600">Track performance metrics for generated content</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/50">
              <h3 className="text-xl font-bold text-primary mb-4">Account Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-xl transition-all duration-200 text-left font-medium">
                  <EnvelopeIcon className="w-4 h-4 mr-2 inline" />
                  Change Email Address
                </button>
                <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-xl transition-all duration-200 text-left font-medium">
                  <LockClosedIcon className="w-4 h-4 mr-2 inline" />
                  Update Password
                </button>
                <button className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 border border-red-200 rounded-xl transition-all duration-200 text-left font-medium">
                  <TrashIcon className="w-4 h-4 mr-2 inline" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Brand Overview */}
            <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary">Your Brands</h3>
                <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                  {brands.length} brands
                </span>
              </div>
              
              {brands.length === 0 ? (
                <div className="text-center py-8">
                  <div className="mb-3 flex justify-center">
                    <UserCircleIcon className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-gray-600">No brands created yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {brands.map((brand) => (
                    <div key={brand.id} className="bg-white/80 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary">{brand.name}</h4>
                        <p className="text-sm text-gray-600">
                          Created {new Date(brand.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBrandEdit(brand)}
                          className="px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent hover:text-accent/80 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                          <ModernPencilIcon className="mr-1 inline" size="sm" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleBrandDelete(brand.id)}
                          className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                          <TrashIcon className="w-4 h-4 mr-1 inline" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Brand Settings Actions */}
            <div className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/50">
              <h3 className="text-xl font-bold text-primary mb-4">Brand Management</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    onClose();
                    // This would trigger the create brand modal
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl transition-all duration-200 text-left font-medium flex items-center gap-3"
                >
                  <ModernSparklesIcon size="sm" />
                  Create New Brand
                </button>
                <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-xl transition-all duration-200 text-left font-medium flex items-center gap-3">
                  <ChartBarIcon className="w-4 h-4" />
                  Export Brand Data
                </button>
                <button className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-xl transition-all duration-200 text-left font-medium flex items-center gap-3">
                  <FolderIcon className="w-4 h-4" />
                  Import Brand Configuration
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 text-primary hover:text-primary/80 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
