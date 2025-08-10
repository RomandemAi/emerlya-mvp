'use client';
import { createClient } from '../../lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Load email from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('emerlya_otp_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setStep('otp');
    }
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const sendOTP = async (isResend = false) => {
    if (!email) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: undefined
        }
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        // Save email to localStorage
        localStorage.setItem('emerlya_otp_email', email);
        setSuccessMessage(isResend ? 'New code sent to your email!' : 'Check your email for the 6-digit code!');
        setStep('otp');
        setResendCooldown(60); // 60 second cooldown
        // Clear OTP input
        setOtp(['', '', '', '', '', '']);
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setErrorMessage('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email'
      });

      if (error) {
        if (error.message.toLowerCase().includes('expired')) {
          setErrorMessage('Code has expired. Please request a new one.');
        } else if (error.message.toLowerCase().includes('invalid')) {
          setErrorMessage('Invalid code. Please check and try again.');
        } else {
          setErrorMessage(error.message);
        }
        // Clear the OTP input on error
        setOtp(['', '', '', '', '', '']);
      } else if (data?.session) {
        setSuccessMessage('Successfully signed in! Redirecting...');
        // Clear localStorage
        localStorage.removeItem('emerlya_otp_email');
        // Redirect to dashboard
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setErrorMessage('Authentication failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      setOtp(['', '', '', '', '', '']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when all digits are entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      setTimeout(() => {
        const code = newOtp.join('');
        setOtp(newOtp);
        // Trigger verification after state update
        handleVerifyOTP(code);
      }, 100);
    }
  };

  const handleVerifyOTP = async (code?: string) => {
    const otpCode = code || otp.join('');
    if (otpCode.length !== 6) {
      setErrorMessage('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'email'
      });

      if (error) {
        if (error.message.toLowerCase().includes('expired')) {
          setErrorMessage('Code has expired. Please request a new one.');
        } else if (error.message.toLowerCase().includes('invalid')) {
          setErrorMessage('Invalid code. Please check and try again.');
        } else {
          setErrorMessage(error.message);
        }
        setOtp(['', '', '', '', '', '']);
      } else if (data?.session) {
        setSuccessMessage('Successfully signed in! Redirecting...');
        localStorage.removeItem('emerlya_otp_email');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setErrorMessage('Authentication failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      setOtp(['', '', '', '', '', '']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
    // Handle enter
    if (e.key === 'Enter') {
      verifyOTP();
    }
  };

  const resetToEmailStep = () => {
    setStep('email');
    setOtp(['', '', '', '', '', '']);
    setErrorMessage(null);
    setSuccessMessage(null);
    localStorage.removeItem('emerlya_otp_email');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendOTP();
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

      {/* Progress indicator */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${step === 'email' ? 'bg-indigo-600' : 'bg-green-500'}`}></div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className={`w-3 h-3 rounded-full ${step === 'otp' ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
        </div>
        <span className="ml-3 text-sm text-gray-600">
          Step {step === 'email' ? '1' : '2'} of 2
        </span>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <div className="text-red-500 mr-3">⚠️</div>
            <div className="text-red-700 text-sm">{errorMessage}</div>
          </div>
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

      {step === 'email' ? (
        <div className="space-y-6">
          <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                placeholder="your@email.com"
                required
                disabled={isLoading}
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send 6-Digit Code'}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter the 6-digit code sent to {email}
            </label>
            <div className="flex space-x-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg font-semibold"
                  disabled={isLoading}
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => verifyOTP()}
            disabled={isLoading || otp.some(digit => !digit)}
            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => sendOTP(true)}
              disabled={isLoading || resendCooldown > 0}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
            </button>
            
            <button
              onClick={resetToEmailStep}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Use different email
            </button>
          </div>
        </div>
      )}

      {/* Google OAuth Option */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-600 mb-4">Or continue with</p>
        <button
          onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
              }
            });
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Continue with Google</span>
        </button>
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
