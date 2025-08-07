'use client';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase/client';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return <button onClick={handleSignOut}>Logout</button>;
}
