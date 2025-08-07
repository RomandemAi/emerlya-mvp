import { redirect } from 'next/navigation';
import DashboardLayout from '../components/DashboardLayout';
import DashboardContent from '../components/DashboardContent';
import { createClient } from '../lib/supabase/server';

export default async function Home() {
  console.log('=== HOME PAGE ACCESSED ===');
  
  const supabase = await createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  console.log('Session check result:', { 
    hasSession: !!session, 
    userEmail: session?.user?.email,
    error: sessionError 
  });

  if (!session) {
    console.log('=== NO SESSION FOUND - REDIRECTING TO LOGIN ===');
    redirect('/login');
  }

  // Fetch user's brands
  const { data: brands, error } = await supabase
    .from('brands')
    .select('id, name, created_at')
    .eq('profile_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching brands:', error);
  }

  // Fetch user's subscription status
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', session.user.id)
    .single();

  return (
    <DashboardLayout 
      userEmail={session.user.email || ''}
      subscriptionStatus={profile?.subscription_status || null}
    >
      <DashboardContent brands={brands || []} />
    </DashboardLayout>
  );
}
