import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { CaseStudyUpdateSchema } from '@/lib/validators'
import CaseStudy from '@/models/CaseStudy'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    await connectDB()
    const caseStudy = await CaseStudy.findOne({ slug }).lean()

    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }

    return NextResponse.json({ caseStudy })
  } catch (err) {
    console.error('[GET /api/cms/case-studies/[slug]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    const parsed = CaseStudyUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    await connectDB()
    const caseStudy = await CaseStudy.findOneAndUpdate({ slug }, parsed.data, { new: true })

    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }

    return NextResponse.json({ caseStudy })
  } catch (err) {
    console.error('[PUT /api/cms/case-studies/[slug]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    await connectDB()
    const caseStudy = await CaseStudy.findOneAndDelete({ slug })

    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/cms/case-studies/[slug]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
