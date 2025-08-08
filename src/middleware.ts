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
          // Cookie options optimized for Netlify production
          const cookieOptions = {
            ...options,
            sameSite: 'lax' as const,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            path: '/',
          }
          
          request.cookies.set({ 
            name, 
            value,
            ...cookieOptions 
          })
          
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          
          response.cookies.set({ 
            name, 
            value,
            ...cookieOptions 
          })
        },
        remove(name: string, options: CookieOptions) {
          const cookieOptions = {
            ...options,
            sameSite: 'lax' as const,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            path: '/',
          }
          
          request.cookies.set({ 
            name, 
            value: '',
            ...cookieOptions 
          })
          
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          
          response.cookies.set({ 
            name, 
            value: '',
            ...cookieOptions 
          })
        },
      },
    }
  )

  // This will refresh the session if expired - critical for Server Components
  // Using try-catch to handle cases where no session exists
  try {
    await supabase.auth.getUser()
  } catch (error) {
    // Log for debugging but don't throw - let the page handle auth
    if (process.env.NODE_ENV === 'development') {
      console.log('Middleware: No active session or session refresh failed')
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
     * - public files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
