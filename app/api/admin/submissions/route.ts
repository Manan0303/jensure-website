import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/mongodb'
import AuditRequest from '@/models/AuditRequest'
import DiscoverySubmission from '@/models/DiscoverySubmission'
import Contact from '@/models/Contact'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()

    const [auditRequests, discoverySubmissions, contacts] = await Promise.all([
      AuditRequest.find().sort({ createdAt: -1 }).limit(200).lean(),
      DiscoverySubmission.find().sort({ createdAt: -1 }).limit(200).lean(),
      Contact.find().sort({ createdAt: -1 }).limit(200).lean(),
    ])

    return NextResponse.json({ auditRequests, discoverySubmissions, contacts })
  } catch (err) {
    console.error('[GET /api/admin/submissions]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
