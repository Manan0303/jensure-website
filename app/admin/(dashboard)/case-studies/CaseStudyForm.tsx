'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const INDUSTRIES = ['Healthcare', 'Finance', 'Manufacturing', 'E-Commerce', 'Agency', 'SaaS', 'Real Estate', 'Logistics', 'Education', 'Other']

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

interface CaseStudyFormProps {
  mode: 'new' | 'edit'
  originalSlug?: string
  initialData?: {
    title: string; slug: string; industry: string; problem: string; solution: string
    technologies: string[]; results: string[]
    metrics: { label: string; value: string }[]
    featuredImage: string; status: 'draft' | 'published'
    metaTitle: string; metaDescription: string
  }
}

export default function CaseStudyForm({ mode, originalSlug, initialData }: CaseStudyFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState(initialData?.title ?? '')
  const [slug, setSlug] = useState(initialData?.slug ?? '')
  const [industry, setIndustry] = useState(initialData?.industry ?? 'Healthcare')
  const [problem, setProblem] = useState(initialData?.problem ?? '')
  const [solution, setSolution] = useState(initialData?.solution ?? '')
  const [technologies, setTechnologies] = useState<string[]>(initialData?.technologies ?? [])
  const [techInput, setTechInput] = useState('')
  const [results, setResults] = useState<string[]>(initialData?.results ?? [''])
  const [metrics, setMetrics] = useState<{ label: string; value: string }[]>(initialData?.metrics ?? [{ label: '', value: '' }])
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage ?? '')
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle ?? '')
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription ?? '')
  const [status, setStatus] = useState<'draft' | 'published'>(initialData?.status ?? 'draft')

  function addTech(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = techInput.trim()
      if (val && !technologies.includes(val)) setTechnologies([...technologies, val])
      setTechInput('')
    }
  }

  function removeTech(t: string) { setTechnologies(technologies.filter(x => x !== t)) }

  function updateResult(i: number, val: string) {
    const arr = [...results]; arr[i] = val; setResults(arr)
  }
  function addResult() { setResults([...results, '']) }
  function removeResult(i: number) { setResults(results.filter((_, idx) => idx !== i)) }

  function updateMetric(i: number, key: 'label' | 'value', val: string) {
    const arr = [...metrics]; arr[i] = { ...arr[i], [key]: val }; setMetrics(arr)
  }
  function addMetric() { setMetrics([...metrics, { label: '', value: '' }]) }
  function removeMetric(i: number) { setMetrics(metrics.filter((_, idx) => idx !== i)) }

  async function handleSave(publishStatus: 'draft' | 'published') {
    setError(''); setSaving(true)
    const payload = {
      title, slug, industry, problem, solution,
      technologies: technologies.filter(Boolean),
      results: results.filter(Boolean),
      metrics: metrics.filter(m => m.label && m.value),
      featuredImage: featuredImage || undefined,
      status: publishStatus,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
    }
    const res = mode === 'new'
      ? await fetch('/api/cms/case-studies', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      : await fetch(`/api/cms/case-studies/${originalSlug}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return }
    setStatus(publishStatus)
    router.push('/admin/case-studies')
    router.refresh()
  }

  const inputCls = 'w-full bg-brand-bg border border-white/10 text-brand-text rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent/60 transition-colors placeholder:text-brand-text/25'
  const labelCls = 'block text-xs text-brand-text/50 mb-1.5 font-medium'

  return (
    <div className="flex flex-col gap-6">
      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">&#9888; {error}</div>}

      <div className="flex gap-6 items-start">
        {/* Left */}
        <div className="flex-1 min-w-0 space-y-5">
          <input type="text" value={title} onChange={e => { setTitle(e.target.value); if (mode === 'new') setSlug(slugify(e.target.value)) }}
            placeholder="Case study title…"
            className="w-full bg-transparent border-b border-white/15 text-brand-text text-2xl font-semibold py-2 focus:outline-none focus:border-brand-accent/60 transition-colors placeholder:text-brand-text/20" />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-brand-text/40 shrink-0">URL slug:</span>
            <input type="text" value={slug} onChange={e => setSlug(slugify(e.target.value))}
              className="flex-1 bg-brand-surface border border-white/8 text-brand-cta rounded px-2 py-1 text-xs font-mono focus:outline-none focus:border-brand-accent/60" />
          </div>

          <div>
            <label className={labelCls}>Problem Statement</label>
            <textarea value={problem} onChange={e => setProblem(e.target.value)} rows={4}
              placeholder="What problem did the client face?" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Automation Built / Solution</label>
            <textarea value={solution} onChange={e => setSolution(e.target.value)} rows={6}
              placeholder="Describe the automation system built…" className={inputCls} />
          </div>

          {/* Technologies */}
          <div>
            <label className={labelCls}>Technologies Used</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {technologies.map(t => (
                <span key={t} className="flex items-center gap-1 bg-brand-accent/15 text-brand-accent text-xs px-2 py-0.5 rounded-full">
                  {t}
                  <button type="button" onClick={() => removeTech(t)} className="hover:text-red-400">×</button>
                </span>
              ))}
            </div>
            <input type="text" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={addTech}
              placeholder="Type a technology and press Enter…" className={inputCls} />
          </div>

          {/* Results */}
          <div>
            <label className={labelCls}>Results / Impact</label>
            <div className="space-y-2">
              {results.map((r, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={r} onChange={e => updateResult(i, e.target.value)}
                    placeholder={`Result ${i + 1}…`} className={inputCls} />
                  {results.length > 1 && (
                    <button type="button" onClick={() => removeResult(i)} className="text-brand-text/30 hover:text-red-400 text-lg leading-none shrink-0">×</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addResult} className="text-xs text-brand-cta hover:opacity-80">+ Add result</button>
            </div>
          </div>

          {/* Metrics */}
          <div>
            <label className={labelCls}>Metrics (e.g. &quot;Time Saved&quot; → &quot;40%&quot;)</label>
            <div className="space-y-2">
              {metrics.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={m.label} onChange={e => updateMetric(i, 'label', e.target.value)}
                    placeholder="Label (e.g. Time Saved)" className={`${inputCls} flex-1`} />
                  <input type="text" value={m.value} onChange={e => updateMetric(i, 'value', e.target.value)}
                    placeholder="Value (e.g. 40%)" className={`${inputCls} w-32`} />
                  {metrics.length > 1 && (
                    <button type="button" onClick={() => removeMetric(i)} className="text-brand-text/30 hover:text-red-400 text-lg leading-none shrink-0">×</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addMetric} className="text-xs text-brand-cta hover:opacity-80">+ Add metric</button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-72 shrink-0 space-y-4">
          {/* Publish */}
          <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8"><p className="text-sm font-medium text-brand-text">Publish</p></div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-text/50">Status</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${status === 'published' ? 'bg-brand-cta/15 text-brand-cta border-brand-cta/20' : 'bg-white/5 text-brand-text/50 border-white/10'}`}>{status}</span>
              </div>
              <button type="button" onClick={() => handleSave('draft')} disabled={saving}
                className="w-full border border-white/15 text-brand-text/70 hover:text-brand-text hover:border-white/30 py-2 rounded-lg text-sm transition-colors disabled:opacity-40">
                {saving ? 'Saving…' : 'Save Draft'}
              </button>
              <button type="button" onClick={() => handleSave('published')} disabled={saving}
                className="w-full bg-brand-cta text-brand-bg font-semibold py-2 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-40">
                {saving ? 'Publishing…' : status === 'published' ? 'Update' : 'Publish'}
              </button>
            </div>
          </div>

          {/* Industry */}
          <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8"><p className="text-sm font-medium text-brand-text">Industry</p></div>
            <div className="p-4">
              <select value={industry} onChange={e => setIndustry(e.target.value)} className={inputCls}>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8"><p className="text-sm font-medium text-brand-text">Featured Image</p></div>
            <div className="p-4">
              <input type="text" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)}
                placeholder="Image URL…" className={inputCls} />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8">
              <p className="text-sm font-medium text-brand-text">SEO</p>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className={labelCls}>Meta Title <span className="text-brand-text/20">(max 60)</span></label>
                <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} maxLength={60} className={inputCls} placeholder="Meta title…" />
                <p className="text-xs text-brand-text/30 mt-1 text-right">{metaTitle.length}/60</p>
              </div>
              <div>
                <label className={labelCls}>Meta Description <span className="text-brand-text/20">(max 160)</span></label>
                <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} maxLength={160} rows={3} className={inputCls} placeholder="Meta description…" />
                <p className="text-xs text-brand-text/30 mt-1 text-right">{metaDescription.length}/160</p>
              </div>
            </div>
          </div>

          <button type="button" onClick={() => router.push('/admin/case-studies')}
            className="w-full text-sm text-brand-text/40 hover:text-brand-text/70 transition-colors py-1">
            ← Back to case studies
          </button>
        </div>
      </div>
    </div>
  )
}
