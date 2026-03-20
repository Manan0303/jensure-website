import Link from 'next/link'
import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import BlogForm from '../BlogForm'

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectDB()
  const post = await BlogPost.findOne({ slug }).lean() as Record<string, unknown> | null

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
            title: post.title as string,
            slug: post.slug as string,
            excerpt: post.excerpt as string,
            content: post.content as string,
            category: post.category as string,
            author: (post.author as string) ?? 'Jensure',
            status: post.status as 'draft' | 'published',
            metaTitle: (post.metaTitle as string) ?? '',
            metaDescription: (post.metaDescription as string) ?? '',
            tags: (post.tags as string[]) ?? [],
          }}
        />
      </div>
    </div>
  )
}
