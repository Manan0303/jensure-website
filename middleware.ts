import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isLoginPage = pathname === '/admin/login'

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })

  const isLoggedIn = !!token

  // Logged in → redirect away from login page
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl.origin))
  }

  // Not logged in → redirect to login page
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl.origin))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/(.+)'],
}
