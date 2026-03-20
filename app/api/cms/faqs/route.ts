import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { FAQSchema } from '@/lib/validators'
import FAQ from '@/models/FAQ'
import { auth } from '@/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') ?? 'published'
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '20')
    const skip = (page - 1) * limit

    await connectDB()
    const filter: Record<string, unknown> = {}
    if (status !== 'all') filter.status = status
    if (category) filter.category = category

    const [faqs, total] = await Promise.all([
      FAQ.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
        .select('-answer').lean(),
      FAQ.countDocuments(filter)
    ])
    return NextResponse.json({ faqs, total, page, totalPages: Math.ceil(total / limit) })
  } catch (err) {
    console.error('[GET /api/cms/faqs]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const parsed = FAQSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', errors: parsed.error.flatten().fieldErrors }, { status: 400 })
    }
    await connectDB()
    const faq = await new FAQ(parsed.data).save()
    return NextResponse.json({ faq }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/cms/faqs]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
