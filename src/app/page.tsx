import { redirect } from 'next/navigation';
import DashboardLayout from '../components/DashboardLayout';
import DashboardContent from '../components/DashboardContent';
import { createClient } from '../lib/supabase/server';
import { getAuthenticatedUser } from '../lib/supabase/auth';

export default async function Home() {
  console.log('=== HOME PAGE ACCESSED ===');
  
  const supabase = await createClient();
  
  // Use the safe auth check that doesn't throw
  const user = await getAuthenticatedUser();

  console.log('User check result:', { 
    hasUser: !!user, 
    userEmail: user?.email,
    error: user ? null : 'No user session'
  });

  if (!user) {
    console.log('=== NO USER FOUND - REDIRECTING TO LOGIN ===');
    redirect('/login');
  }

  // Fetch user's brands
  const { data: brands, error } = await supabase
    .from('brands')
    .select('id, name, created_at')
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching brands:', error);
  }

  // Fetch user's subscription status
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single();

  return (
    <DashboardLayout 
      userEmail={user.email || ''}
      subscriptionStatus={profile?.subscription_status || null}
    >
      <DashboardContent brands={brands || []} />
    </DashboardLayout>
  );
}
