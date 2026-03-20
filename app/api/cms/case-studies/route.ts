import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { CaseStudySchema } from '@/lib/validators'
import { generateSlug } from '@/lib/utils'
import CaseStudy from '@/models/CaseStudy'
import { auth } from '@/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') ?? 'published'
    const industry = searchParams.get('industry')
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '10')
    const skip = (page - 1) * limit

    await connectDB()

    const filter: Record<string, unknown> = {}
    if (status !== 'all') filter.status = status
    if (industry) filter.industry = industry

    const [caseStudies, total] = await Promise.all([
      CaseStudy.find(filter)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-problem -solution')
        .lean(),
      CaseStudy.countDocuments(filter)
    ])

    return NextResponse.json({ caseStudies, total, page, totalPages: Math.ceil(total / limit) })
  } catch (err) {
    console.error('[GET /api/cms/case-studies]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()

    if (!body.slug && body.title) {
      body.slug = generateSlug(body.title)
    }

    const parsed = CaseStudySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    await connectDB()
    const caseStudy = await new CaseStudy(parsed.data).save()

    return NextResponse.json({ caseStudy }, { status: 201 })
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as { code: number }).code === 11000) {
      return NextResponse.json({ error: 'A case study with this slug already exists' }, { status: 409 })
    }
    console.error('[POST /api/cms/case-studies]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
