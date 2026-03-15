import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { AuditRequestSchema } from '@/lib/validators'
import AuditRequest from '@/models/AuditRequest'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = AuditRequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    await connectDB()
    await new AuditRequest(parsed.data).save()

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[POST /api/audit]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
