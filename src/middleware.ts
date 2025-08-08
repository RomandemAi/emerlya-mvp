import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a response that we can modify
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Set cookie on request for downstream usage
          request.cookies.set({
            name,
            value,
            ...options,
          })
          
          // Update response to include the cookie
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          
          // Set cookie with production-ready options
          response.cookies.set({
            name,
            value,
            ...options,
            // Override with production settings
            domain: process.env.NODE_ENV === 'production' ? '.emerlya.com' : undefined,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            httpOnly: true,
            path: '/',
          })
        },
        remove(name: string, options: CookieOptions) {
          // Remove cookie from request
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          
          // Update response
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          
          // Remove cookie with production settings
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

  // Refresh session - this is critical for Server Components
  try {
    // This will refresh the session if it exists and is expired
    const { data: { user }, error } = await supabase.auth.getUser()
    
    // Log session status for debugging
    if (process.env.NODE_ENV === 'production') {
      const hasUser = !!user
      const path = request.nextUrl.pathname
      console.log(`[Middleware] Path: ${path}, User: ${hasUser ? user.email : 'none'}, Error: ${error?.message || 'none'}`)
    }
    
    // If there's an error but it's not about missing session, log it
    if (error && !error.message?.includes('session')) {
      console.error('[Middleware] Auth error:', error)
    }
  } catch (error) {
    // Log unexpected errors
    console.error('[Middleware] Unexpected error during session refresh:', error)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     * We want to run on all routes to ensure session is always fresh
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
