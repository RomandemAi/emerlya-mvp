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
        // Handle OAuth callback (Google, etc.)
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href)
        
        if (error) {
          console.error('OAuth callback error:', error)
          setState('error')
          setMessage('Authentication failed. Please try signing in again.')
          return
        }

        // Success - check if we have a session
        if (data?.session) {
          setState('success')
          setMessage('Successfully signed in! Redirecting to your dashboard...')
          
          // Redirect to dashboard after a brief moment
          setTimeout(() => {
            router.push('/dashboard')
          }, 1500)
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

    handleOAuthCallback()
  }, [router, supabase.auth])

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
