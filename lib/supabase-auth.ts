import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export function createClient(request: NextRequest) {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieList = await cookieStore
          return cookieList.get(name)?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          const cookieList = await cookieStore
          cookieList.set(name, value, {
            ...options,
            // Make sure we preserve the path and other options
            path: options.path ?? '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          })
        },
        async remove(name: string, options: CookieOptions) {
          const cookieList = await cookieStore
          cookieList.set(name, '', {
            ...options,
            path: options.path ?? '/',
            expires: new Date(0),
          })
        },
      },
    }
  )
}

export async function updateSession(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const supabase = createClient(request)
    const { data: { session } } = await supabase.auth.getSession()

    // Protected paths that require authentication
    const protectedPaths = ["/workspace", "/settings", "/snippets"]
    const isProtectedPath = protectedPaths.some(path => 
      requestUrl.pathname.startsWith(path)
    )

    // Handle authentication for protected paths
    if (isProtectedPath && !session) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", requestUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Redirect authenticated users from login/signup to workspace
    if (session && (
      requestUrl.pathname === "/login" || 
      requestUrl.pathname === "/signup"
    )) {
      return NextResponse.redirect(new URL("/workspace", request.url))
    }

    // Allow the request to continue
    return NextResponse.next()
  } catch (error) {
    // Handle any errors that occur during session check
    console.error('Error checking auth session:', error)
    return NextResponse.next()
  }
}
