'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Error getting session:', error.message);
        }
        setUser(session?.user ?? null);
      } catch (error) {
        console.warn('Error in getInitialSession:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle sign out
        if (event === 'SIGNED_OUT') {
          setUser(null);
          // Clear any persisted data
          localStorage.removeItem('emerlya_otp_email');
        }
        
        // Handle sign in
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
        }
        
        // Handle token refresh
        if (event === 'TOKEN_REFRESHED' && session?.user) {
          setUser(session.user);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
      }
      // Always clear user state, even if there was an error
      setUser(null);
      // Clear any persisted data
      localStorage.removeItem('emerlya_otp_email');
    } catch (error) {
      console.error('Error in signOut:', error);
      // Still clear user state on error
      setUser(null);
      localStorage.removeItem('emerlya_otp_email');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
