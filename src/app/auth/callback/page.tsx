'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const [state, setState] = useState<'loading'|'ok'|'expired'|'error'>('loading')
  const [msg, setMsg] = useState('Signing you in…')
  const [email, setEmail] = useState<string>('')
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Get the email from localStorage
    const pending = localStorage.getItem('emerlya_pending_email') || ''
    setEmail(pending)

    const handleCallback = async () => {
      try {
        // Exchange the code for a session using the full URL
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href)
        
        if (error) {
          console.error('Auth exchange error:', error)
          
          // Check for expired token errors
          if (error.message?.toLowerCase().includes('expired') || 
              error.message?.toLowerCase().includes('otp') ||
              error.name === 'AuthApiError') {
            setState('expired')
            setMsg('Your magic link has expired or was already used. This can happen if your email client previewed the link. Please request a new one below.')
          } else {
            setState('error')
            setMsg(error.message || 'Authentication error occurred.')
          }
          return
        }

        // Success - check if we have a session
        if (data?.session) {
          setState('ok')
          setMsg('Signed in successfully! Redirecting to your dashboard...')
          
          // Clear the pending email
          localStorage.removeItem('emerlya_pending_email')
          
          // Redirect to dashboard after a brief moment
          setTimeout(() => {
            router.push('/dashboard')
          }, 1000)
        } else {
          setState('error')
          setMsg('No session was created. Please try signing in again.')
        }
      } catch (e: unknown) {
        console.error('Unexpected error during auth callback:', e)
        setState('error')
        setMsg((e as Error)?.message || 'An unexpected error occurred. Please try again.')
      }
    }

    handleCallback()
  }, [router, supabase.auth])

  async function resendMagicLink() {
    if (!email) {
      setMsg('Please enter your email address to resend the magic link.')
      return
    }

    setIsResending(true)
    setState('loading')
    setMsg('Sending a fresh magic link to your email...')

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        }
      })

      if (error) {
        setState('error')
        setMsg(`Failed to send magic link: ${error.message}`)
      } else {
        setState('ok')
        setMsg('✅ Check your inbox! A new magic link has been sent to your email.')
        // Save the email again for potential future resends
        localStorage.setItem('emerlya_pending_email', email)
      }
    } catch (e: unknown) {
      setState('error')
      setMsg(`Error: ${(e as Error)?.message || 'Failed to send magic link'}`)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 backdrop-blur-xl bg-white/60 rounded-3xl shadow-2xl border border-white/50">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">E</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Authentication
        </h1>

        {/* Status Message */}
        <div className={`mb-6 p-4 rounded-xl ${
          state === 'loading' ? 'bg-blue-50 border border-blue-200' :
          state === 'ok' ? 'bg-green-50 border border-green-200' :
          state === 'expired' ? 'bg-yellow-50 border border-yellow-200' :
          'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start">
            <div className="mr-3 mt-0.5">
              {state === 'loading' && '⏳'}
              {state === 'ok' && '✅'}
              {state === 'expired' && '⚠️'}
              {state === 'error' && '❌'}
            </div>
            <div className={`text-sm ${
              state === 'loading' ? 'text-blue-700' :
              state === 'ok' ? 'text-green-700' :
              state === 'expired' ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {msg}
            </div>
          </div>
        </div>

        {/* Resend Form - Show only for expired state */}
        {state === 'expired' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isResending}
              />
            </div>
            <button
              onClick={resendMagicLink}
              disabled={isResending || !email}
              className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? 'Sending...' : 'Send New Magic Link'}
            </button>
            <a
              href="/login"
              className="block text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to login
            </a>
          </div>
        )}

        {/* Back to login link for error state */}
        {state === 'error' && (
          <div className="mt-4">
            <a
              href="/login"
              className="block text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              ← Try signing in again
            </a>
          </div>
        )}

        {/* Tips Section */}
        {(state === 'expired' || state === 'error') && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-600">
              <strong>💡 Tips:</strong>
            </p>
            <ul className="mt-2 space-y-1 text-xs text-gray-600">
              <li>• Click the magic link as soon as you receive it</li>
              <li>• Avoid email preview features that might consume the link</li>
              <li>• Check your spam folder if you don&apos;t see the email</li>
              <li>• Contact support if issues persist</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
