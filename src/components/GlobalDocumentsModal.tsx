'use client';
import { useState, useEffect } from 'react';

interface BrandDocument {
  id: string;
  content: string;
  status: string;
  created_at: string;
  brand_id: string;
}

interface Brand {
  id: string;
  name: string;
  documents: BrandDocument[];
}

interface GlobalDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  brands: Array<{
    id: string;
    name: string;
    created_at: string;
  }>;
}

export default function GlobalDocumentsModal({ 
  isOpen, 
  onClose, 
  brands 
}: GlobalDocumentsModalProps) {
  const [brandsWithDocs, setBrandsWithDocs] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen && brands.length > 0) {
      fetchAllDocuments();
    }
  }, [isOpen, brands]);

  const fetchAllDocuments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const brandPromises = brands.map(async (brand) => {
        const response = await fetch(`/api/brands/${brand.id}/documents`);
        if (!response.ok) {
          throw new Error(`Failed to fetch documents for ${brand.name}`);
        }
        const data = await response.json();
        return {
          ...brand,
          documents: data.documents || []
        };
      });

      const results = await Promise.all(brandPromises);
      setBrandsWithDocs(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processed':
        return '✅';
      case 'processing':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return 'document';
    }
  };

  const totalDocuments = brandsWithDocs.reduce((total, brand) => total + brand.documents.length, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <span>All Documents</span>
            </h2>
            <p className="text-gray-600 mt-2">
              {totalDocuments} documents across {brandsWithDocs.length} brands
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading all documents...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😓</div>
            <h3 className="text-xl font-bold text-primary mb-2">Error Loading Documents</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchAllDocuments}
              className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Try Again
            </button>
          </div>
        ) : totalDocuments === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6 flex justify-center">
              <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">No Documents Yet</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Start by creating brands and adding source documents to train your AI content generation.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {brandsWithDocs.map((brand) => (
              <div key={brand.id} className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/50 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                    <h3 className="text-xl font-bold text-primary">{brand.name}</h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                      {brand.documents.length} documents
                    </span>
                  </div>
                </div>

                {brand.documents.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                    <div className="mb-3 flex justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">No documents for this brand yet</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {brand.documents.map((doc, index) => {
                      const isExpanded = expandedDocs.has(doc.id);
                      return (
                        <div key={doc.id} className="bg-white/80 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{getStatusIcon(doc.status)}</span>
                              <span className="font-medium text-primary">
                                Document #{index + 1}
                              </span>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-500 mb-3">
                            {new Date(doc.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>

                          <div className={`bg-gray-50 rounded-lg p-3 overflow-hidden transition-all duration-300 ${
                            isExpanded ? 'max-h-48 overflow-y-auto' : 'max-h-20'
                          }`}>
                            <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-wrap">
                              {isExpanded || doc.content.length <= 150 
                                ? doc.content
                                : doc.content.substring(0, 150) + '...'
                              }
                            </p>
                          </div>
                          
                          {doc.content.length > 150 && (
                            <button 
                              onClick={() => {
                                const newExpanded = new Set(expandedDocs);
                                if (isExpanded) {
                                  newExpanded.delete(doc.id);
                                } else {
                                  newExpanded.add(doc.id);
                                }
                                setExpandedDocs(newExpanded);
                              }}
                              className="mt-2 text-primary hover:text-primary/80 text-xs font-medium transition-colors duration-200"
                            >
                              {isExpanded ? 'Show less' : 'Read more'}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
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
