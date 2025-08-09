'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '../../lib/supabase/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function LoginForm() {
  const searchParams = useSearchParams();
  
  // Check for error parameters immediately on component initialization
  const hasError = searchParams.get('error') !== null;
  const initialErrorCode = searchParams.get('error_code');
  const initialError = searchParams.get('error');
  const initialMessage = searchParams.get('message');
  const initialErrorDescription = searchParams.get('error_description');
  
  // Determine initial error message and whether to hide Auth component
  const getInitialErrorState = () => {
    if (!hasError) return { message: null, showHint: false };
    
    if (initialErrorCode === 'otp_expired' || initialError === 'access_denied') {
      return {
        message: initialMessage ? decodeURIComponent(initialMessage) : 'Your magic link has expired or was already used. This can happen if your email client previewed the link. Please request a new one below.',
        showHint: true
      };
    }
    
    switch (initialError) {
      case 'no_code':
        return {
          message: initialMessage ? decodeURIComponent(initialMessage) : 'Authentication link is invalid or expired.',
          showHint: true
        };
      case 'auth_failed':
        return {
          message: initialMessage ? decodeURIComponent(initialMessage) : 'Authentication failed. Please try again.',
          showHint: false
        };
      case 'no_session':
        return {
          message: 'Session could not be created. Please try signing in again.',
          showHint: false
        };
      case 'unexpected':
        return {
          message: 'An unexpected error occurred. Please try again.',
          showHint: false
        };
      default:
        return {
          message: initialErrorDescription ? decodeURIComponent(initialErrorDescription) : 'Authentication error. Please try again.',
          showHint: false
        };
    }
  };
  
  const initialErrorState = getInitialErrorState();
  
  const [errorMessage, setErrorMessage] = useState<string | null>(initialErrorState.message);
  const [showResendHint, setShowResendHint] = useState(initialErrorState.showHint);
  const [hideAuthComponent, setHideAuthComponent] = useState(hasError);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (hasError) {
      // Clear URL parameters immediately
      window.history.replaceState({}, '', '/login');

      // Clear error message and show Auth component again after 20 seconds
      const timeout = setTimeout(() => {
        setErrorMessage(null);
        setShowResendHint(false);
        setHideAuthComponent(false);
      }, 20000);

      return () => clearTimeout(timeout);
    }
  }, [hasError]);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Save email for callback resend if link expires
      localStorage.setItem('emerlya_pending_email', email);
      
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Check your email for the magic link!');
        setEmail('');
        // After success, show the Auth component again after a delay
        setTimeout(() => {
          setHideAuthComponent(false);
          setSuccessMessage(null);
        }, 5000);
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
                💡 <strong>Tip:</strong> Enter your email below to get a new login link. 
                Make sure to click the link quickly and avoid email preview features that might consume it.
              </p>
            </div>
          )}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center">
            <div className="text-green-500 mr-3">✅</div>
            <div className="text-green-700 text-sm">{successMessage}</div>
          </div>
        </div>
      )}

      {/* Show custom form when Auth component is hidden due to errors */}
      {hideAuthComponent ? (
        <div className="space-y-4">
          <form onSubmit={handleSendMagicLink} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your email address"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
          <button
            onClick={() => {
              setHideAuthComponent(false);
              setErrorMessage(null);
              setShowResendHint(false);
            }}
            className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to sign in
          </button>
        </div>
      ) : (
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
      )}
      
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
