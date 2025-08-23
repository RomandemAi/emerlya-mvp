'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function LogoutButton() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <button 
      onClick={handleSignOut}
      className="w-full px-4 py-3 text-gray-600 hover:text-gray-900 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 font-medium flex items-center justify-center space-x-2"
    >
      <span>👋</span>
      <span>Sign Out</span>
    </button>
  );
}
