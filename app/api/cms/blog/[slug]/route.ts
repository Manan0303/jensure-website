import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { BlogPostUpdateSchema } from '@/lib/validators'
import { estimateReadTime } from '@/lib/utils'
import BlogPost from '@/models/BlogPost'
import { auth } from '@/auth'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    await connectDB()
    const post = await BlogPost.findOne({ slug }).lean()

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ post })
  } catch (err) {
    console.error('[GET /api/cms/blog/[slug]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { slug } = await params
    const body = await request.json()
    const parsed = BlogPostUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const updateData: Record<string, unknown> = { ...parsed.data }
    if (parsed.data.content) {
      updateData.readTimeMinutes = estimateReadTime(parsed.data.content)
    }

    await connectDB()
    const post = await BlogPost.findOneAndUpdate({ slug }, updateData, { new: true })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ post })
  } catch (err) {
    console.error('[PUT /api/cms/blog/[slug]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { slug } = await params
    await connectDB()
    const post = await BlogPost.findOneAndDelete({ slug })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/cms/blog/[slug]]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
