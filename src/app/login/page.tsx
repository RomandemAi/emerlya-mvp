'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '../../lib/supabase/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function LoginForm() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showResendHint, setShowResendHint] = useState(false);
  const [cleanUrl, setCleanUrl] = useState(false);

  useEffect(() => {
    const error = searchParams.get('error');
    const errorCode = searchParams.get('error_code');
    const message = searchParams.get('message');
    const errorDescription = searchParams.get('error_description');
    
    if (error && !cleanUrl) {
      // Check for OTP expired error specifically
      if (errorCode === 'otp_expired' || error === 'access_denied') {
        setErrorMessage(message ? decodeURIComponent(message) : 'Your magic link has expired or was already used. This can happen if your email client previewed the link. Please request a new one below.');
        setShowResendHint(true);
      } else {
        switch (error) {
          case 'no_code':
            setErrorMessage(message ? decodeURIComponent(message) : 'Authentication link is invalid or expired.');
            setShowResendHint(true);
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
            setErrorMessage(errorDescription ? decodeURIComponent(errorDescription) : 'Authentication error. Please try again.');
        }
      }

      // Immediately clear URL parameters to prevent Supabase Auth UI from reading them
      window.history.replaceState({}, '', '/login');
      setCleanUrl(true);

      // Clear error message after 15 seconds
      const timeout = setTimeout(() => {
        setErrorMessage(null);
        setShowResendHint(false);
      }, 15000);

      return () => clearTimeout(timeout);
    }
  }, [searchParams, cleanUrl]);

  return (
    <div className="w-full max-w-md p-10 backdrop-blur-xl bg-white/60 rounded-3xl shadow-2xl border border-white/50">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-3xl">E</span>
        </div>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-3">
        Welcome to Emerlya AI
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Sign in to access your intelligent content platform
      </p>
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <div className="text-red-500 mr-3">⚠️</div>
            <div className="text-red-700 text-sm">{errorMessage}</div>
          </div>
          {showResendHint && (
            <div className="mt-3 pt-3 border-t border-red-200">
              <p className="text-xs text-red-600">
                💡 <strong>Tip:</strong> Enter your email below and click &quot;Send magic link&quot; to get a new login link. 
                Make sure to click the link quickly and avoid email preview features that might consume it.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="auth-container">
        <style jsx global>{`
          .auth-container .supabase-auth-ui_ui-button {
            background: linear-gradient(to right, #6366f1, #a855f7) !important;
            border: none !important;
            border-radius: 12px !important;
            font-weight: 500 !important;
            transition: all 0.2s !important;
            padding: 12px !important;
          }
          .auth-container .supabase-auth-ui_ui-button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3) !important;
          }
          .auth-container input {
            background: white !important;
            border: 1px solid #e5e7eb !important;
            border-radius: 12px !important;
            padding: 12px !important;
            font-size: 16px !important;
          }
          .auth-container input:focus {
            border-color: #6366f1 !important;
            outline: none !important;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
          }
          .auth-container label {
            color: #374151 !important;
            font-weight: 500 !important;
            margin-bottom: 6px !important;
          }
        `}</style>
        
        <Auth
          supabaseClient={createClient()}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#6366f1',
                  brandAccent: '#4f46e5',
                }
              }
            }
          }}
          theme="light"
          providers={[]}
          view="magic_link"
          redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`}
        />
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-600">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Emerlya AI
            </span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form Container */}
      <div className="flex flex-col justify-center items-center min-h-screen pt-20">
        <Suspense fallback={
          <div className="w-full max-w-md p-10 backdrop-blur-xl bg-white/60 rounded-3xl shadow-2xl border border-white/50">
            <div className="text-gray-600 text-center">Loading...</div>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200/50 py-4 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>© 2025 Emerlya AI. All rights reserved. | Built with ❤️ in the EU 🇪🇺</p>
        </div>
      </footer>
    </div>
  );
}
