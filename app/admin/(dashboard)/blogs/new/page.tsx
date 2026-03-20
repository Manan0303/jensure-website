import Link from 'next/link'
import BlogForm from '../BlogForm'

export default function NewBlogPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blogs" className="text-brand-text/40 hover:text-brand-text text-sm transition-colors">
          ← Blogs
        </Link>
        <span className="text-brand-text/20">/</span>
        <h1 className="text-2xl font-bold text-brand-text">New Post</h1>
      </div>
      <div className="bg-brand-surface border border-white/8 rounded-xl p-8">
        <BlogForm mode="new" />
      </div>
    </div>
  )
}
