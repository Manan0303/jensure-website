'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const TiptapEditor = dynamic(() => import('./TiptapEditor'), { ssr: false })

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

  async function handleSave(publishStatus: 'draft' | 'published') {
    setError('')
    setSaving(true)

    const payload = { title, slug, excerpt, content, category, author, status: publishStatus }

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
      setError(data.error ?? 'Something went wrong. Please try again.')
      return
    }

    router.push('/admin/blogs')
    router.refresh()
  }

  const inputCls = 'w-full bg-brand-bg border border-white/10 text-brand-text rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent/60 transition-colors placeholder:text-brand-text/25'

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
          ⚠ {error}
        </div>
      )}

      {/* Two-column layout */}
      <div className="flex gap-6 items-start">

        {/* LEFT — Main content area */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Title */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title…"
              className="w-full bg-transparent border-b border-white/15 text-brand-text text-2xl font-semibold py-2 focus:outline-none focus:border-brand-accent/60 transition-colors placeholder:text-brand-text/20"
            />
          </div>

          {/* Slug */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-brand-text/40 shrink-0">URL slug:</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className="flex-1 bg-brand-surface border border-white/8 text-brand-cta rounded px-2 py-1 text-xs font-mono focus:outline-none focus:border-brand-accent/60"
            />
          </div>

          {/* Rich text editor */}
          <div>
            <p className="text-xs text-brand-text/40 mb-2">Content</p>
            <TiptapEditor
              initialContent={initialData?.content}
              onChange={setContent}
            />
          </div>
        </div>

        {/* RIGHT — Settings sidebar */}
        <div className="w-72 shrink-0 space-y-4">

          {/* Publish box */}
          <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8">
              <p className="text-sm font-medium text-brand-text">Publish</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-text/50">Status</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  status === 'published'
                    ? 'bg-brand-cta/15 text-brand-cta border border-brand-cta/20'
                    : 'bg-white/5 text-brand-text/50 border border-white/10'
                }`}>{status}</span>
              </div>
              <button
                type="button"
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="w-full border border-white/15 text-brand-text/70 hover:text-brand-text hover:border-white/30 py-2 rounded-lg text-sm transition-colors disabled:opacity-40"
              >
                {saving ? 'Saving…' : 'Save Draft'}
              </button>
              <button
                type="button"
                onClick={() => handleSave('published')}
                disabled={saving}
                className="w-full bg-brand-cta text-brand-bg font-semibold py-2 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {saving ? 'Publishing…' : status === 'published' ? 'Update' : 'Publish'}
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8">
              <p className="text-sm font-medium text-brand-text">Category</p>
            </div>
            <div className="p-4 space-y-2">
              {CATEGORIES.map((c) => (
                <label key={c.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    value={c.value}
                    checked={category === c.value}
                    onChange={() => setCategory(c.value)}
                    className="accent-brand-accent"
                  />
                  <span className="text-sm text-brand-text/70 group-hover:text-brand-text transition-colors">{c.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8">
              <p className="text-sm font-medium text-brand-text">Excerpt</p>
              <p className="text-xs text-brand-text/40 mt-0.5">Shown on the blog listing page</p>
            </div>
            <div className="p-4">
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="Short summary of your post…"
                className={inputCls}
              />
              <p className="text-xs text-brand-text/30 mt-1 text-right">{excerpt.length} / 200</p>
            </div>
          </div>

          {/* Author */}
          <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8">
              <p className="text-sm font-medium text-brand-text">Author</p>
            </div>
            <div className="p-4">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={inputCls}
                placeholder="Jensure"
              />
            </div>
          </div>

          {/* Cancel */}
          <button
            type="button"
            onClick={() => router.push('/admin/blogs')}
            className="w-full text-sm text-brand-text/40 hover:text-brand-text/70 transition-colors py-1"
          >
            ← Back to all posts
          </button>
        </div>
      </div>
    </div>
  )
}
