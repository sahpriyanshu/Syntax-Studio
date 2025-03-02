import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token

  // Paths that require authentication
  const protectedPaths = ["/workspace", "/settings", "/snippets"]
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Handle authentication for protected paths
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users from login/signup to workspace
  if (isAuthenticated && (
    request.nextUrl.pathname === "/login" || 
    request.nextUrl.pathname === "/signup"
  )) {
    return NextResponse.redirect(new URL("/workspace", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/workspace/:path*",
    "/settings/:path*",
    "/snippets/:path*",
    "/login",
    "/signup",
  ],
}
