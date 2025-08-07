import { redirect } from 'next/navigation';
import DashboardLayout from '../components/DashboardLayout';
import DashboardContent from '../components/DashboardContent';
import { createClient } from '../lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
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

  return (
    <DashboardLayout userEmail={session.user.email || ''}>
      <DashboardContent brands={brands || []} />
    </DashboardLayout>
  );
}
