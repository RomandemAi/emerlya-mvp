import { createClient } from '../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Generator from '../../../components/Generator';
import DashboardLayout from '../../../components/DashboardLayout';

export default async function BrandPage({ params }: { params: Promise<{ brandId: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login');
  }

  // Fetch the brand details and verify ownership
  const { data: brand, error } = await supabase
    .from('brands')
    .select('name, persona_config_json')
    .eq('id', resolvedParams.brandId)
    .eq('profile_id', session.user.id) // Ensure user owns this brand
    .single();

  // Also fetch the user's subscription status
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', session.user.id)
    .single();

  if (error || !brand) {
    return (
      <DashboardLayout userEmail={session.user.email || ''}>
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-red-400 text-lg mb-4">❌ Brand not found</div>
          <p className="text-gray-400 mb-6">
            The brand you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
          </p>
          <Link 
            href="/"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userEmail={session.user.email || ''}>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <Link 
            href="/"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
          >
            ← Back to Dashboard
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Generate Content for: <span className="text-blue-400">{brand.name}</span>
        </h1>
        <p className="text-gray-400">
          Create on-brand content using AI powered by your brand&apos;s personality and documents.
        </p>
      </div>

      {/* Display Brand Persona Info */}
      {brand.persona_config_json && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            🎭 Brand Persona Active
          </h3>
          <div className="text-sm text-gray-300">
            <p>This AI will generate content matching your brand&apos;s unique voice and personality.</p>
          </div>
        </div>
      )}

      <Generator 
        brandId={resolvedParams.brandId} 
        subscriptionStatus={profile?.subscription_status || null}
      />
    </DashboardLayout>
  );
}
