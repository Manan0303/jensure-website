import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { FAQUpdateSchema } from '@/lib/validators'
import FAQ from '@/models/FAQ'
import { auth } from '@/auth'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectDB()
    const faq = await FAQ.findById(id).lean()
    if (!faq) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ faq })
  } catch (err) {
    console.error('[GET /api/cms/faqs/[id]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = FAQUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', errors: parsed.error.flatten().fieldErrors }, { status: 400 })
    }
    await connectDB()
    const faq = await FAQ.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!faq) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ faq })
  } catch (err) {
    console.error('[PUT /api/cms/faqs/[id]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    await connectDB()
    const faq = await FAQ.findByIdAndDelete(id)
    if (!faq) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/cms/faqs/[id]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
