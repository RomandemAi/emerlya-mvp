import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

const cookieDomain = (() => {
  try {
    if (process.env.NEXT_PUBLIC_COOKIE_DOMAIN) return process.env.NEXT_PUBLIC_COOKIE_DOMAIN
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SITE_URL) {
      return `.${new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname}`
    }
  } catch {
    // If parsing fails, fall back to undefined
  }
  return undefined
})()

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // Set cookie with production settings
            cookieStore.set({
              name,
              value,
              ...options,
              // Use configured cookie domain or derive from NEXT_PUBLIC_SITE_URL in production
              domain: cookieDomain,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              httpOnly: true,
              path: '/',
            })
          } catch {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({
              name,
              value: '',
              ...options,
              // Use same domain logic for removal
              domain: cookieDomain,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              httpOnly: true,
              path: '/',
              maxAge: 0,
            })
          } catch {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  )
}
