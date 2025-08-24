import { createClient } from '../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import BrandContentCreator from '../../../components/BrandContentCreator';
import DashboardLayout from '../../../components/DashboardLayout';

// Force dynamic rendering and disable caching to always get fresh subscription status
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BrandPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ brandId: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login');
  }

  // Fetch the brand details and verify ownership
  const { data: brand, error } = await supabase
    .from('brands')
    .select('id, name, persona_config_json')
    .eq('id', resolvedParams.brandId)
    .eq('profile_id', session.user.id) // Ensure user owns this brand
    .single();

  // Also fetch the user's subscription status and all brands for layout
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', session.user.id)
    .single();

  // Fetch all brands for the layout
  const { data: allBrands } = await supabase
    .from('brands')
    .select('id, name, created_at')
    .eq('profile_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error || !brand) {
    return (
      <DashboardLayout 
        userEmail={session.user.email || ''}
        subscriptionStatus={profile?.subscription_status || null}
        brands={allBrands || []}
      >
        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-12 shadow-2xl border border-white/50 text-center max-w-lg">
            <div className="text-6xl mb-6">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Brand not found</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The brand you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
            </p>
            <Link 
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <span className="mr-2">←</span>
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      userEmail={session.user.email || ''}
      subscriptionStatus={profile?.subscription_status || null}
      brands={allBrands || []}
    >
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="mr-2">←</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create Content for
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {brand.name}
            </span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Generate text content and AI images that match your brand's unique voice, style, and personality.
          </p>
        </div>
      </div>

      {/* Display Brand Persona Info */}
      {brand.persona_config_json && (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-6 shadow-2xl border border-white/50 mb-8">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span className="text-xl">🎭</span>
            <span>Brand Persona Active</span>
          </h3>
          <div className="text-gray-600 leading-relaxed">
            <p>This AI will generate content matching your brand&apos;s unique voice and personality.</p>
          </div>
        </div>
      )}

      <BrandContentCreator 
        brand={brand}
        brandId={resolvedParams.brandId} 
        subscriptionStatus={profile?.subscription_status || null}
        mode={resolvedSearchParams.mode}
      />
    </DashboardLayout>
  );
}
