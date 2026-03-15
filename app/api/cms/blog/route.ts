import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { BlogPostSchema } from '@/lib/validators'
import { generateSlug, estimateReadTime } from '@/lib/utils'
import BlogPost from '@/models/BlogPost'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') ?? 'published'
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '10')
    const skip = (page - 1) * limit

    await connectDB()

    const filter: Record<string, unknown> = { status }
    if (category) filter.category = category

    const [posts, total] = await Promise.all([
      BlogPost.find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-content')
        .lean(),
      BlogPost.countDocuments(filter)
    ])

    return NextResponse.json({ posts, total, page, totalPages: Math.ceil(total / limit) })
  } catch (err) {
    console.error('[GET /api/cms/blog]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Auto-generate slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = generateSlug(body.title)
    }

    const parsed = BlogPostSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const readTimeMinutes = estimateReadTime(parsed.data.content)

    await connectDB()
    const post = await new BlogPost({ ...parsed.data, readTimeMinutes }).save()

    return NextResponse.json({ post }, { status: 201 })
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as { code: number }).code === 11000) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 })
    }
    console.error('[POST /api/cms/blog]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
