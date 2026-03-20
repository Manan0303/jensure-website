import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { auth } from '@/auth'
import AuditRequest from '@/models/AuditRequest'
import DiscoverySubmission from '@/models/DiscoverySubmission'
import Contact from '@/models/Contact'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    await connectDB()

    let result
    if (type === 'audit') result = await AuditRequest.findByIdAndDelete(id)
    else if (type === 'discovery') result = await DiscoverySubmission.findByIdAndDelete(id)
    else if (type === 'contact') result = await Contact.findByIdAndDelete(id)
    else return NextResponse.json({ error: 'Invalid type' }, { status: 400 })

    if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/admin/submissions/[id]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
