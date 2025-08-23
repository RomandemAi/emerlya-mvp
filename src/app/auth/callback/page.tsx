'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const [state, setState] = useState<'loading'|'success'|'error'>('loading')
  const [message, setMessage] = useState('Processing authentication...')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Get the current URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const error_description = urlParams.get('error_description')
        
        // Handle error cases first
        if (error_description) {
          console.error('OAuth error from provider:', error_description)
          setState('error')
          setMessage('Authentication failed. Please try signing in again.')
          return
        }

        if (!code) {
          console.error('No auth code found in callback URL')
          setState('error')
          setMessage('Invalid authentication response. Please try signing in again.')
          return
        }

        // Exchange code for session
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href)
        
        if (error) {
          console.error('OAuth callback error:', error)
          setState('error')
          setMessage('Authentication failed. Please try signing in again.')
          return
        }

        // Success - check if we have a session
        if (data?.session?.user) {
          setState('success')
          setMessage('Successfully signed in! Redirecting to your dashboard...')
          
          // Force refresh the session to ensure it's properly set
          await supabase.auth.getSession()
          
          // Use window.location for more reliable redirect after auth
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 1000)
        } else {
          setState('error')
          setMessage('No session was created. Please try signing in again.')
        }
      } catch (e: unknown) {
        console.error('Unexpected error during OAuth callback:', e)
        setState('error')
        setMessage('An unexpected error occurred. Please try again.')
      }
    }

    // Small delay to ensure DOM is ready, especially important on mobile
    const timer = setTimeout(handleOAuthCallback, 100)
    return () => clearTimeout(timer)
  }, [router, supabase.auth])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 backdrop-blur-xl bg-white/60 rounded-3xl shadow-2xl border border-white/50">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
            {/* Data Flow E Logo */}
            <div className="relative">
              <span className="text-white font-bold text-3xl font-heading relative z-10">E</span>
              {/* Animated data particles */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute w-1.5 h-1.5 bg-accent rounded-full animate-pulse" style={{top: '20%', left: '15%', animationDelay: '0s'}}></div>
                <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{top: '60%', left: '80%', animationDelay: '0.5s'}}></div>
                <div className="absolute w-1 h-1 bg-accent rounded-full animate-pulse" style={{top: '80%', left: '25%', animationDelay: '1s'}}></div>
                <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top: '35%', left: '70%', animationDelay: '1.5s'}}></div>
                <div className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{top: '45%', left: '40%', animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Authentication
        </h1>

        {/* Status Message */}
        <div className={`mb-6 p-4 rounded-xl ${
          state === 'loading' ? 'bg-blue-50 border border-blue-200' :
          state === 'success' ? 'bg-green-50 border border-green-200' :
          'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start">
            <div className="mr-3 mt-0.5">
              {state === 'loading' && '⏳'}
              {state === 'success' && '✅'}
              {state === 'error' && '❌'}
            </div>
            <div className={`text-sm ${
              state === 'loading' ? 'text-blue-700' :
              state === 'success' ? 'text-green-700' :
              'text-red-700'
            }`}>
              {message}
            </div>
          </div>
        </div>

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
      </div>
    </div>
  )
}
