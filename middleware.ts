import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

export const middleware = auth((req) => {
  const { pathname } = req.nextUrl
  const isLoginPage = pathname === '/admin/login'
  const isLoggedIn = !!req.auth

  // Already logged in — redirect away from login page
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl.origin))
  }

  // Not logged in — redirect to login page (except login page itself)
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  // Matches /admin and /admin/* but NOT /api/* or static files
  matcher: ['/admin', '/admin/(.+)'],
}
