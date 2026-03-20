'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = [
  { label: 'AI Automation', value: 'ai-automation' },
  { label: 'AI Agents', value: 'ai-agents' },
  { label: 'Workflow Automation', value: 'workflow-automation' },
  { label: 'Infrastructure', value: 'infrastructure' },
  { label: 'Case Studies', value: 'case-studies' },
]

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

interface BlogFormProps {
  mode: 'new' | 'edit'
  initialData?: {
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    author: string
    status: 'draft' | 'published'
  }
  originalSlug?: string
}

export default function BlogForm({ mode, initialData, originalSlug }: BlogFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState(initialData?.title ?? '')
  const [slug, setSlug] = useState(initialData?.slug ?? '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? '')
  const [content, setContent] = useState(initialData?.content ?? '')
  const [category, setCategory] = useState(initialData?.category ?? 'ai-automation')
  const [author, setAuthor] = useState(initialData?.author ?? 'Jensure')
  const [status, setStatus] = useState<'draft' | 'published'>(initialData?.status ?? 'draft')

  function handleTitleChange(val: string) {
    setTitle(val)
    if (mode === 'new') setSlug(slugify(val))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = { title, slug, excerpt, content, category, author, status }

    const res = mode === 'new'
      ? await fetch('/api/cms/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch(`/api/cms/blog/${originalSlug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

    const data = await res.json()
    setSaving(false)

    if (!res.ok) {
      setError(data.error ?? 'Failed to save post.')
      return
    }

    router.push('/admin/blogs')
    router.refresh()
  }

  const inputCls = 'w-full bg-brand-surface-2 border border-white/10 text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-accent/60 transition-colors'
  const labelCls = 'block text-sm text-brand-text/70 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelCls}>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className={inputCls}
            placeholder="How AI Agents Are Replacing Manual Ops"
          />
        </div>
        <div>
          <label className={labelCls}>Slug *</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className={inputCls}
            placeholder="how-ai-agents-replace-manual-ops"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={labelCls}>Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Status *</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
            className={inputCls}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Excerpt *</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          rows={2}
          className={inputCls}
          placeholder="A short summary shown on the blog listing page…"
        />
      </div>

      <div>
        <label className={labelCls}>Content *</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={20}
          className={`${inputCls} font-mono text-xs leading-relaxed`}
          placeholder="Write your full blog post content here…"
        />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/8">
        <button
          type="button"
          onClick={() => router.push('/admin/blogs')}
          className="text-sm text-brand-text/50 hover:text-brand-text transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-cta text-brand-bg font-medium px-6 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? 'Saving…' : mode === 'new' ? 'Publish Post' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
