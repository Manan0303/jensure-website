import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'

// Middleware uses lightweight config — no mongoose, no DB calls, JWT-only
const { auth } = NextAuth(authConfig)

export const middleware = auth((req) => {
  const { pathname } = req.nextUrl
  const isLoginPage = pathname === '/admin/login'

  if (req.auth && isLoginPage) {
    return Response.redirect(new URL('/admin', req.nextUrl.origin))
  }
})

export const config = {
  matcher: ['/admin/:path*'],
}
