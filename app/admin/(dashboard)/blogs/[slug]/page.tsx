import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogForm from '../BlogForm'

async function getBlogPost(slug: string) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/cms/blog/${slug}`, { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  return data.post ?? null
}

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) notFound()

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blogs" className="text-brand-text/40 hover:text-brand-text text-sm transition-colors">
          ← Blogs
        </Link>
        <span className="text-brand-text/20">/</span>
        <h1 className="text-2xl font-bold text-brand-text">Edit Post</h1>
      </div>
      <div className="bg-brand-surface border border-white/8 rounded-xl p-8">
        <BlogForm
          mode="edit"
          originalSlug={slug}
          initialData={{
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            author: post.author ?? 'Jensure',
            status: post.status,
          }}
        />
      </div>
    </div>
  )
}
