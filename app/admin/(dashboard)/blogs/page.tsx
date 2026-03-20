'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface BlogPost {
  _id: string
  title: string
  slug: string
  category: string
  status: 'draft' | 'published'
  author: string
  createdAt: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [seeding, setSeeding] = useState(false)

  async function loadPosts() {
    setLoading(true)
    const res = await fetch('/api/cms/blog?status=all&limit=100')
    const data = await res.json()
    if (data.error) { setError(data.error); setLoading(false); return }
    setPosts(data.posts ?? [])
    setLoading(false)
  }

  useEffect(() => { loadPosts() }, [])

  async function handleSeed() {
    if (!confirm('Seed all 15 static blog posts into the database?')) return
    setSeeding(true)
    const res = await fetch('/api/cms/blog/seed', { method: 'POST' })
    const data = await res.json()
    alert(data.message ?? 'Done')
    await loadPosts()
    setSeeding(false)
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return
    setDeleting(slug)
    const res = await fetch(`/api/cms/blog/${slug}`, { method: 'DELETE' })
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.slug !== slug))
    } else {
      alert('Failed to delete post.')
    }
    setDeleting(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">Blog Posts</h1>
          <p className="text-brand-text/50 text-sm mt-1">{posts.length} posts total</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="border border-white/15 text-brand-text/70 hover:text-brand-text hover:border-white/30 px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-40"
          >
            {seeding ? 'Seeding…' : 'Seed Static Posts'}
          </button>
          <Link
            href="/admin/blogs/new"
            className="bg-brand-cta text-brand-bg font-medium px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            + New Post
          </Link>
        </div>
      </div>

      {loading && <div className="text-brand-text/40 text-sm py-12 text-center">Loading…</div>}
      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">{error}</div>}

      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-16 text-brand-text/30 text-sm">
          No blog posts yet. <Link href="/admin/blogs/new" className="text-brand-accent underline">Create the first one.</Link>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left text-xs text-brand-text/40 font-medium px-5 py-3">Title</th>
                <th className="text-left text-xs text-brand-text/40 font-medium px-5 py-3">Category</th>
                <th className="text-left text-xs text-brand-text/40 font-medium px-5 py-3">Status</th>
                <th className="text-left text-xs text-brand-text/40 font-medium px-5 py-3">Date</th>
                <th className="text-right text-xs text-brand-text/40 font-medium px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="text-brand-text text-sm font-medium">{post.title}</div>
                    <div className="text-brand-text/40 text-xs mt-0.5">{post.slug}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-brand-surface-2 border border-white/8 text-brand-text/60 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      post.status === 'published'
                        ? 'bg-brand-cta/10 text-brand-cta border border-brand-cta/20'
                        : 'bg-white/5 text-brand-text/50 border border-white/10'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-brand-text/40 text-sm">{formatDate(post.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blogs/${post.slug}`}
                        className="text-xs text-brand-accent hover:text-brand-accent/80 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        disabled={deleting === post.slug}
                        className="text-xs text-red-400/70 hover:text-red-400 transition-colors disabled:opacity-40"
                      >
                        {deleting === post.slug ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
