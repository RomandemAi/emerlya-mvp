'use client';

import { useState, useEffect } from 'react';
import { 
  ModernKeyIcon, ModernEyeIcon, ModernEyeSlashIcon, ModernCopyIcon,
  ModernTrashIcon, ModernPlusIcon, ModernCheckIcon, ModernInfoIcon
} from './ModernIcons';
import { API_TIERS } from '@/lib/api-keys';
import { TIER_LIMITS } from '@/lib/usage-types';

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  tier: string;
  is_active: boolean;
  last_used_at: string | null;
  requests_count: number;
  requests_limit: number;
  created_at: string;
}

interface ApiTier {
  name: string;
  requests_per_month: number;
  features: string[];
  price_per_month: number;
  rate_limit_per_minute: number;
}

// API_TIERS now imported from @/lib/api-keys

interface ApiKeyDashboardProps {
  userEmail: string;
  subscriptionStatus: string | null;
}

export default function ApiKeyDashboard({ userEmail, subscriptionStatus }: ApiKeyDashboardProps) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedTier, setSelectedTier] = useState('free');
  const [creating, setCreating] = useState(false);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<{ [key: string]: boolean }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Get available API tiers based on subscription
  const getAvailableApiTiers = () => {
    const userTier = subscriptionStatus || 'free';
    
    if (userTier === 'business' || userTier === 'enterprise' || userTier === 'active') {
      return ['free', 'starter', 'pro', 'enterprise'];
    } else if (userTier === 'professional') {
      return ['free', 'starter', 'pro'];
    } else if (userTier === 'essentials') {
      return ['free', 'starter'];
    } else {
      return ['free'];
    }
  };

  // Check if user can access API features
  const canAccessApi = () => {
    const userTier = subscriptionStatus || 'free';
    const tierFeatures = TIER_LIMITS[userTier]?.features || [];
    return tierFeatures.includes('API access') || userTier === 'active' || userTier === 'business' || userTier === 'enterprise';
  };

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/user/api-keys');
      if (response.ok) {
        const data = await response.json();
        setApiKeys(data.keys || []);
      } else {
        setError('Failed to fetch API keys');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;
    
    setCreating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newKeyName.trim(),
          tier: selectedTier
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setNewApiKey(data.key);
        setNewKeyName('');
        await fetchApiKeys();
      } else {
        setError(data.error || 'Failed to create API key');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to deactivate this API key? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/user/api-keys/${keyId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchApiKeys();
      } else {
        setError('Failed to delete API key');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const copyToClipboard = async (text: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const getTierColor = (tier: string) => {
    const colors = {
      free: 'bg-gray-100 text-gray-800',
      starter: 'bg-blue-100 text-blue-800',
      pro: 'bg-purple-100 text-purple-800',
      enterprise: 'bg-orange-100 text-orange-800'
    };
    return colors[tier as keyof typeof colors] || colors.free;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">API Keys</h2>
          <p className="text-sm text-gray-600">
            Manage your API keys for programmatic access to Emerlya AI
          </p>
          {!canAccessApi() && (
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                🔒 API access is available with Business plan or higher. 
                <a href="/pricing" className="font-medium underline hover:no-underline ml-1">
                  Upgrade your plan
                </a>
              </p>
            </div>
          )}
        </div>
        {canAccessApi() && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            <ModernPlusIcon size="xs" />
            <span>Create API Key</span>
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* API Keys List */}
      {apiKeys.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ModernKeyIcon size="lg" className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No API Keys</h3>
          {canAccessApi() ? (
            <>
              <p className="text-gray-600 mb-4">Create your first API key to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create API Key
              </button>
            </>
          ) : (
            <p className="text-gray-600">API access requires Business plan or higher</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div key={key.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-gray-900">{key.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(key.tier)}`}>
                      {API_TIERS[key.tier]?.name || key.tier}
                    </span>
                    {!key.is_active && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Inactive
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {showKey[key.id] ? key.key_prefix.replace('...', '••••••••') : key.key_prefix}
                    </code>
                    <button
                      onClick={() => toggleKeyVisibility(key.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title={showKey[key.id] ? 'Hide key' : 'Show key'}
                    >
                      {showKey[key.id] ? (
                        <ModernEyeSlashIcon size="xs" />
                      ) : (
                        <ModernEyeIcon size="xs" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(key.key_prefix, key.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Copy key prefix"
                    >
                      {copiedKey === key.id ? (
                        <ModernCheckIcon size="xs" className="text-green-600" />
                      ) : (
                        <ModernCopyIcon size="xs" />
                      )}
                    </button>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Usage: {key.requests_count.toLocaleString()} / {key.requests_limit.toLocaleString()} requests this month</div>
                    <div>Created: {formatDate(key.created_at)}</div>
                    {key.last_used_at && (
                      <div>Last used: {formatDate(key.last_used_at)}</div>
                    )}
                  </div>

                  {/* Usage bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Monthly Usage</span>
                      <span>{((key.requests_count / key.requests_limit) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (key.requests_count / key.requests_limit) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {key.is_active && (
                  <button
                    onClick={() => handleDeleteKey(key.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Deactivate key"
                  >
                    <ModernTrashIcon size="xs" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New API Key</h3>
            
            {newApiKey ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ModernCheckIcon size="sm" className="text-green-600" />
                    <span className="font-medium text-green-800">API Key Created!</span>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Copy this key now - it won't be shown again:
                  </p>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-white border border-green-200 rounded px-3 py-2 text-sm font-mono">
                      {newApiKey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(newApiKey, 'new')}
                      className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      {copiedKey === 'new' ? (
                        <ModernCheckIcon size="xs" />
                      ) : (
                        <ModernCopyIcon size="xs" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setNewApiKey(null);
                    }}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production API, Development, Mobile App"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Tier
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {getAvailableApiTiers().map((tier) => {
                      const info = API_TIERS[tier];
                      return (
                        <option key={tier} value={tier}>
                          {info.name} - {info.requests_per_month.toLocaleString()} requests/month
                          {info.price_per_month > 0 && ` - €${info.price_per_month}/month`}
                        </option>
                      );
                    })}
                  </select>
                  
                  {selectedTier && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm text-blue-800">
                        <div className="font-medium mb-1">{API_TIERS[selectedTier].name} Features:</div>
                        <ul className="space-y-1">
                          {API_TIERS[selectedTier].features.map((feature, idx) => (
                            <li key={idx}>• {feature}</li>
                          ))}
                        </ul>
                        <div className="mt-2 text-xs">
                          Rate limit: {API_TIERS[selectedTier].rate_limit_per_minute} requests/minute
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateKey}
                    disabled={!newKeyName.trim() || creating}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {creating ? 'Creating...' : 'Create Key'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* API Documentation Link */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ModernInfoIcon size="sm" className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">API Documentation</h4>
            <p className="text-sm text-blue-700 mb-2">
              Learn how to integrate Emerlya AI into your applications
            </p>
            <a 
              href="/api-docs" 
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              View API Documentation →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
