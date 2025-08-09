import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  console.log('=== AUTH CALLBACK ROUTE HIT ===');
  console.log('Request URL:', request.url);
  
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorCode = searchParams.get('error_code')
  const errorDescription = searchParams.get('error_description')
  
  console.log('Search params:', Object.fromEntries(searchParams.entries()));
  console.log('Code parameter:', code);

  // Handle Supabase auth errors
  if (error) {
    console.error('=== SUPABASE AUTH ERROR ===')
    console.error('Error:', error)
    console.error('Error Code:', errorCode)
    console.error('Error Description:', errorDescription)
    
    let redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/login?error=${error}`
    
    // Add specific error handling for common cases
    if (errorCode === 'otp_expired') {
      redirectUrl += '&error_code=otp_expired&message=' + encodeURIComponent('Your magic link has expired. This can happen if the link was already used or if your email client previewed it. Please request a new one.')
    } else if (errorCode) {
      redirectUrl += `&error_code=${errorCode}`
    }
    
    if (errorDescription) {
      redirectUrl += `&error_description=${encodeURIComponent(errorDescription)}`
    }
    
    return NextResponse.redirect(redirectUrl)
  }

  if (!code) {
    console.error('=== NO CODE PROVIDED ===')
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=no_code&message=${encodeURIComponent('No authentication code received. Please try again.')}`)
  }

  try {
    const cookieStore = await cookies()
    
    // Create response object that we'll modify with cookies
    const response = NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL!)
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const value = cookieStore.get(name)?.value
            console.log(`[Auth Callback] Getting cookie ${name}:`, value ? 'exists' : 'missing')
            return value
          },
          set(name: string, value: string, options: CookieOptions) {
            console.log(`[Auth Callback] Setting cookie ${name} with domain:`, process.env.NODE_ENV === 'production' ? '.emerlya.com' : 'localhost')
            
            // Set cookie on the request (for downstream usage)
            cookieStore.set({ 
              name, 
              value, 
              ...options,
              // CRITICAL: Use same domain configuration as middleware
              domain: process.env.NODE_ENV === 'production' ? '.emerlya.com' : undefined,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              httpOnly: true,
              path: '/',
            })
            
            // Also set on the response to ensure it's sent to the client
            response.cookies.set({
              name,
              value,
              ...options,
              domain: process.env.NODE_ENV === 'production' ? '.emerlya.com' : undefined,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              httpOnly: true,
              path: '/',
            })
          },
          remove(name: string, options: CookieOptions) {
            console.log(`[Auth Callback] Removing cookie ${name}`)
            
            cookieStore.set({ 
              name, 
              value: '', 
              ...options,
              domain: process.env.NODE_ENV === 'production' ? '.emerlya.com' : undefined,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              httpOnly: true,
              path: '/',
              maxAge: 0,
            })
            
            response.cookies.set({
              name,
              value: '',
              ...options,
              domain: process.env.NODE_ENV === 'production' ? '.emerlya.com' : undefined,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              httpOnly: true,
              path: '/',
              maxAge: 0,
            })
          },
        },
      }
    )

    console.log('Exchanging code for session...')
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Supabase auth exchange error:', error.message)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=auth_failed&message=${encodeURIComponent(error.message)}`)
    }

    if (!data.session) {
      console.error('No session created after successful exchange')
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=no_session`)
    }

    console.log('Session created for user:', data.user?.email)
    console.log('Session access token exists:', !!data.session.access_token)
    console.log('Session refresh token exists:', !!data.session.refresh_token)

    // Force set the session for better persistence on Netlify
    try {
      console.log('Force-setting session for persistence...')
      await supabase.auth.setSession(data.session)
      
      // Additional verification - get the session again to ensure it's set
      const { data: verifyData, error: verifyError } = await supabase.auth.getSession()
      if (verifyData.session) {
        console.log('✅ Session verified after force-set:', verifyData.session.user?.email)
      } else {
        console.warn('⚠️ Session verification failed after force-set:', verifyError?.message)
      }
      
      // Get user to ensure auth is working
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userData.user) {
        console.log('✅ User verified:', userData.user.email)
      } else {
        console.warn('⚠️ User verification failed:', userError?.message)
      }
    } catch (setError) {
      console.error('Failed to force-set session:', setError)
    }

    console.log('=== AUTH CALLBACK COMPLETE - REDIRECTING TO DASHBOARD ===')
    
    // List all cookies being set
    const allCookies = cookieStore.getAll()
    console.log('Cookies after auth:', allCookies.map(c => ({ name: c.name, hasValue: !!c.value })))
    
    // Add small delay to ensure cookies are set before redirect
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Return the response with all the cookies set
    return response

  } catch (error) {
    console.error('Auth callback unexpected error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=unexpected`)
  }
}
