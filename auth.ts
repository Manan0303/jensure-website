import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'
import { authConfig } from './auth.config'

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid email or password'
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new InvalidLoginError()
        }

        await connectDB()

        const user = await AdminUser.findOne({
          email: (credentials.email as string).toLowerCase().trim(),
        }).lean()

        if (!user) throw new InvalidLoginError()

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        )

        if (!passwordMatch) throw new InvalidLoginError()

        return { id: user._id.toString(), email: user.email, name: 'Admin' }
      },
    }),
  ],
  session: { strategy: 'jwt' },
})
