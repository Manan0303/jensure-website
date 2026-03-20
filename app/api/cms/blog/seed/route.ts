import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { auth } from '@/auth'
import BlogPost from '@/models/BlogPost'
import { ALL_BLOG_POSTS } from '@/lib/blog-data'
import { estimateReadTime } from '@/lib/utils'

/** Convert the custom markdown-like format used in blog-data.ts to clean HTML for TipTap */
function toHtml(text: string): string {
  const bold = (t: string) => t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  const italic = (t: string) => t.replace(/\*(.+?)\*/g, '<em>$1</em>')
  const inline = (t: string) => italic(bold(t))

  return text
    .split('\n\n')
    .filter((p) => p.trim())
    .map((para) => {
      const t = para.trim()

      // Standalone bold line → h2
      if (/^\*\*[^*\n]+\*\*$/.test(t)) {
        return `<h2>${t.replace(/\*\*/g, '')}</h2>`
      }

      // Bullet list block
      const lines = t.split('\n')
      if (lines.length > 1 && lines.every((l) => !l.trim() || l.trim().startsWith('- '))) {
        const lis = lines
          .filter((l) => l.trim().startsWith('- '))
          .map((l) => `<li><p>${inline(l.replace(/^-\s*/, ''))}</p></li>`)
          .join('')
        return `<ul>${lis}</ul>`
      }

      // Single bullet
      if (t.startsWith('- ')) {
        return `<ul><li><p>${inline(t.replace(/^-\s*/, ''))}</p></li></ul>`
      }

      return `<p>${inline(t)}</p>`
    })
    .join('')
}

export async function POST() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()

    const existingSlugs = new Set(
      (await BlogPost.find({}, 'slug').lean()).map((p: { slug: string }) => p.slug)
    )

    const toInsert = ALL_BLOG_POSTS
      .filter((p) => !existingSlugs.has(p.slug))
      .map((p) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: toHtml(p.content),
        category: p.categorySlug,
        tags: [],
        author: p.author,
        status: 'published' as const,
        publishedAt: new Date(p.publishedAt),
        readTimeMinutes: estimateReadTime(p.content),
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
      }))

    if (toInsert.length === 0) {
      return NextResponse.json({ message: 'All posts already seeded', seeded: 0 })
    }

    await BlogPost.insertMany(toInsert, { ordered: false })
    return NextResponse.json({ message: 'Seeded successfully', seeded: toInsert.length })
  } catch (err) {
    console.error('[POST /api/cms/blog/seed]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
