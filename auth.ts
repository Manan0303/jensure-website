import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid email or password'
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminEmail || !adminPassword) {
          throw new Error('Admin credentials not configured')
        }

        if (
          credentials.email !== adminEmail ||
          credentials.password !== adminPassword
        ) {
          throw new InvalidLoginError()
        }

        return { id: '1', email: adminEmail, name: 'Admin' }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
      const isLoginPage = request.nextUrl.pathname === '/admin/login'
      if (isAdminRoute && !isLoginPage) return !!auth
      return true
    },
  },
  session: { strategy: 'jwt' },
})
