'use client';
import { useState, useEffect } from 'react';

interface BrandDocument {
  id: string;
  content: string;
  status: string;
  created_at: string;
}

interface BrandDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandId: string;
  brandName: string;
}

export default function BrandDocumentsModal({ 
  isOpen, 
  onClose, 
  brandId, 
  brandName 
}: BrandDocumentsModalProps) {
  const [documents, setDocuments] = useState<BrandDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen && brandId) {
      fetchDocuments();
    }
  }, [isOpen, brandId]);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/brands/${brandId}/documents`);
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      setDocuments(data.documents || []);
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
        return '📄';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-2xl">📄</span>
            <span>Documents for {brandName}</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading documents...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Documents</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchDocuments}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Try Again
            </button>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Documents Found</h3>
            <p className="text-gray-600">This brand doesn't have any documents yet. Add some content when creating or editing the brand.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc, index) => {
              const isExpanded = expandedDocs.has(doc.id);
              return (
                <div key={doc.id} className="backdrop-blur-md bg-white/60 rounded-2xl p-6 border border-white/50 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getStatusIcon(doc.status)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Document #{index + 1}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Added {new Date(doc.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(doc.status)}`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className={`bg-gray-50 rounded-xl p-4 overflow-y-auto transition-all duration-300 ${
                    isExpanded ? 'max-h-96' : 'max-h-40'
                  }`}>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {isExpanded || doc.content.length <= 500 
                        ? doc.content
                        : doc.content.substring(0, 500) + '...'
                      }
                    </p>
                  </div>
                  
                  {doc.content.length > 500 && (
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
                      className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200"
                    >
                      {isExpanded ? 'Show less' : 'View full content'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
