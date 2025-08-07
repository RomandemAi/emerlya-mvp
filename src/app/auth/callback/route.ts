import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  console.log('=== AUTH CALLBACK ROUTE HIT ===');
  console.log('Request URL:', request.url);
  
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  console.log('Search params:', Object.fromEntries(searchParams.entries()));
  console.log('Code parameter:', code);

  if (!code) {
    console.error('=== NO CODE PROVIDED ===')
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=no_code`)
  }

  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Supabase auth exchange error:', error.message)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=auth_failed&message=${encodeURIComponent(error.message)}`)
    }

    if (!data.session) {
      console.error('No session created after successful exchange')
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=no_session`)
    }

    console.log('Auth callback successful for user:', data.user?.email)
    
    // Successful authentication - redirect to dashboard
    return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL!)

  } catch (error) {
    console.error('Auth callback unexpected error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login?error=unexpected`)
  }
}
