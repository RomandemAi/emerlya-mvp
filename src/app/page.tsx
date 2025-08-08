import { redirect } from 'next/navigation';
import DashboardLayout from '../components/DashboardLayout';
import DashboardContent from '../components/DashboardContent';
import { createClient } from '../lib/supabase/server';

export default async function Home() {
  console.log('=== HOME PAGE ACCESSED ===');
  
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log('User check result:', { 
    hasUser: !!user, 
    userEmail: user?.email,
    error: userError 
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
