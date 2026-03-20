/**
 * One-time admin setup endpoint.
 *
 * Usage (call once after first deploy):
 *   POST /api/admin/init
 *   Headers: { "x-setup-token": "<ADMIN_SETUP_TOKEN>" }
 *   Body:    { "email": "you@jensure.com", "password": "yourStrongPassword" }
 *
 * - Only works if no AdminUser exists in the database yet.
 * - Protected by ADMIN_SETUP_TOKEN env var — remove this var from Vercel after setup.
 * - Password is bcrypt-hashed (cost 12) before storage. Plain password is never saved.
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'

export async function POST(request: NextRequest) {
  const setupToken = process.env.ADMIN_SETUP_TOKEN

  if (!setupToken) {
    return NextResponse.json(
      { error: 'Setup is disabled. ADMIN_SETUP_TOKEN is not configured.' },
      { status: 403 }
    )
  }

  const tokenFromHeader = request.headers.get('x-setup-token')
  if (tokenFromHeader !== setupToken) {
    return NextResponse.json({ error: 'Invalid setup token.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { error: 'email and password are required.' },
      { status: 400 }
    )
  }

  if ((body.password as string).length < 12) {
    return NextResponse.json(
      { error: 'Password must be at least 12 characters.' },
      { status: 400 }
    )
  }

  await connectDB()

  const existing = await AdminUser.findOne({})
  if (existing) {
    return NextResponse.json(
      { error: 'Admin already exists. Setup can only run once.' },
      { status: 409 }
    )
  }

  const passwordHash = await bcrypt.hash(body.password as string, 12)

  await AdminUser.create({
    email: (body.email as string).toLowerCase().trim(),
    passwordHash,
  })

  return NextResponse.json(
    { success: true, message: 'Admin created. Remove ADMIN_SETUP_TOKEN from Vercel env vars now.' },
    { status: 201 }
  )
}
