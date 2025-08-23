import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
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
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Gracefully handle session refresh - don't crash for anonymous users
  try {
    await supabase.auth.getSession()
  } catch (error: unknown) {
    // Log the error for debugging but don't crash the request
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.warn('Auth session refresh failed:', errorMessage)
    
    // For refresh token errors, just continue - user will need to log in again
    if (
      (error as { code?: string })?.code === 'refresh_token_not_found' || 
      (error as { name?: string })?.name === 'AuthApiError' ||
      errorMessage.includes('refresh_token_not_found')
    ) {
      // Clear any invalid cookies for Supabase auth
      response.cookies.delete('sb-localhost-auth-token')
      response.cookies.delete('sb-localhost-auth-token.0')
      response.cookies.delete('sb-localhost-auth-token.1')
    }
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
     * - api routes that don't need auth
     */
    '/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)',
  ],
}
