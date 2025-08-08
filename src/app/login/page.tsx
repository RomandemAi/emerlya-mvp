'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '../../lib/supabase/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function LoginForm() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    
    if (error) {
      switch (error) {
        case 'no_code':
          setErrorMessage('Authentication link is invalid or expired.');
          break;
        case 'auth_failed':
          setErrorMessage(message ? decodeURIComponent(message) : 'Authentication failed. Please try again.');
          break;
        case 'no_session':
          setErrorMessage('Session could not be created. Please try signing in again.');
          break;
        case 'unexpected':
          setErrorMessage('An unexpected error occurred. Please try again.');
          break;
        default:
          setErrorMessage('Authentication error. Please try again.');
      }

      // Clear error message after 10 seconds
      const timeout = setTimeout(() => {
        setErrorMessage(null);
        // Clear URL parameters
        window.history.replaceState({}, '', '/login');
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-md p-8 bg-black bg-opacity-50 backdrop-blur-lg rounded-xl border border-gray-700">
      <h1 className="text-4xl font-bold text-white text-center mb-2">
        Lymera AI
      </h1>
      <p className="text-md text-gray-300 text-center mb-8">
        Welcome back. Sign in to access your AI co-founder.
      </p>
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg">
          <div className="flex items-center">
            <div className="text-red-400 mr-3">⚠️</div>
            <div className="text-red-200 text-sm">{errorMessage}</div>
          </div>
        </div>
      )}

      <Auth
        supabaseClient={createClient()}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={[]}
        view="magic_link"
        redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`}
      />
    </div>
  );
}

export default function Login() {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%), url('/login-bg.jpg')",
        backgroundBlendMode: "overlay"
      }}
    >
      <Suspense fallback={
        <div className="w-full max-w-md p-8 bg-black bg-opacity-50 backdrop-blur-lg rounded-xl border border-gray-700">
          <div className="text-white text-center">Loading...</div>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
