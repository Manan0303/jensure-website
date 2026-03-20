import type { NextAuthConfig } from 'next-auth'

/**
 * Lightweight auth config — no DB or mongoose imports.
 * Used by middleware (Edge Runtime) to verify JWT only.
 */
export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
      const isLoginPage = request.nextUrl.pathname === '/admin/login'
      if (isAdminRoute && !isLoginPage) return !!auth
      return true
    },
  },
  providers: [], // populated in auth.ts — not needed for JWT verification
} satisfies NextAuthConfig
