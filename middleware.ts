import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export const middleware = auth((req) => {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'

  // Redirect unauthenticated users trying to access /admin/*
  if (isAdminRoute && !isLoginPage && !req.auth) {
    const loginUrl = new URL('/admin/login', req.nextUrl.origin)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect already-authenticated users away from login page
  if (isLoginPage && req.auth) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*'],
}
