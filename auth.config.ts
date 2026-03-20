import type { NextAuthConfig } from 'next-auth'

/**
 * Lightweight auth config — no DB or mongoose imports.
 * Used by middleware (Edge Runtime) for JWT verification only.
 * Redirect logic is handled explicitly in middleware.ts — NOT here.
 */
export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  providers: [],
} satisfies NextAuthConfig
