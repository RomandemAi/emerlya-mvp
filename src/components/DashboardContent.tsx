'use client';
import { useState } from 'react';
import Link from 'next/link';
import CreateBrandForm from './CreateBrandForm';

interface Brand {
  id: string;
  name: string;
  created_at: string;
}

interface DashboardContentProps {
  brands: Brand[];
}

export default function DashboardContent({ brands }: DashboardContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">My Brands</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Create New Brand
        </button>
      </div>
      
      <div>
        {brands.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎭</div>
            <p className="text-gray-400 text-lg mb-2">You haven&apos;t created any brands yet.</p>
            <p className="text-gray-500 text-sm">Create your first brand to start generating AI-powered content!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <div key={brand.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{brand.name}</h3>
                  <p className="text-gray-400 text-sm">
                    Created {new Date(brand.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Link 
                    href={`/brands/${brand.id}`}
                    className="block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold rounded-lg transition-colors"
                  >
                    ✨ Generate Content
                  </Link>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded transition-colors">
                      📄 Documents
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded transition-colors">
                      ⚙️ Settings
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateBrandForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
