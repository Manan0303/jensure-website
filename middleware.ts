import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

export const middleware = auth((req) => {
  const { pathname } = req.nextUrl
  const isLoginPage = pathname === '/admin/login'
  const isLoggedIn = !!req.auth

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl.origin))
  }

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin', '/admin/(.+)'],
}
