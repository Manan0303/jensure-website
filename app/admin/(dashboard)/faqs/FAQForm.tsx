'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = ['general', 'ai-agents', 'sales', 'marketing', 'operations', 'jensure']

interface FAQFormProps {
  mode: 'new' | 'edit'
  id?: string
  initialData?: { question: string; answer: string; keywords: string[]; category: string; status: 'draft' | 'published' }
}

export default function FAQForm({ mode, id, initialData }: FAQFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [question, setQuestion] = useState(initialData?.question ?? '')
  const [answer, setAnswer] = useState(initialData?.answer ?? '')
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords ?? [])
  const [kwInput, setKwInput] = useState('')
  const [category, setCategory] = useState(initialData?.category ?? 'general')
  const [status, setStatus] = useState<'draft' | 'published'>(initialData?.status ?? 'draft')

  function addKeyword(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = kwInput.trim()
      if (val && !keywords.includes(val)) setKeywords([...keywords, val])
      setKwInput('')
    }
  }

  async function handleSave(publishStatus: 'draft' | 'published') {
    setError(''); setSaving(true)
    const payload = { question, answer, keywords, category, status: publishStatus }
    const res = mode === 'new'
      ? await fetch('/api/cms/faqs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      : await fetch(`/api/cms/faqs/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return }
    setStatus(publishStatus)
    router.push('/admin/faqs')
    router.refresh()
  }

  const inputCls = 'w-full bg-brand-bg border border-white/10 text-brand-text rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent/60 transition-colors placeholder:text-brand-text/25'

  return (
    <div className="flex flex-col gap-6">
      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">&#9888; {error}</div>}

      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0 space-y-5">
          <div>
            <label className="block text-xs text-brand-text/50 mb-1.5 font-medium">Question</label>
            <input type="text" value={question} onChange={e => setQuestion(e.target.value)}
              placeholder="What is…?" className="w-full bg-transparent border-b border-white/15 text-brand-text text-xl font-semibold py-2 focus:outline-none focus:border-brand-accent/60 transition-colors placeholder:text-brand-text/20" />
          </div>

          <div>
            <label className="block text-xs text-brand-text/50 mb-1.5 font-medium">Answer</label>
            <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={6}
              placeholder="Write a clear, concise answer…" className={inputCls} />
          </div>

          <div>
            <label className="block text-xs text-brand-text/50 mb-1.5 font-medium">SEO Keywords</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {keywords.map(k => (
                <span key={k} className="flex items-center gap-1 bg-brand-accent/15 text-brand-accent text-xs px-2 py-0.5 rounded-full">
                  {k}
                  <button type="button" onClick={() => setKeywords(keywords.filter(x => x !== k))} className="hover:text-red-400">×</button>
                </span>
              ))}
            </div>
            <input type="text" value={kwInput} onChange={e => setKwInput(e.target.value)} onKeyDown={addKeyword}
              placeholder="Type keyword and press Enter…" className={inputCls} />
          </div>
        </div>

        <div className="w-64 shrink-0 space-y-4">
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

          <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8"><p className="text-sm font-medium text-brand-text">Category</p></div>
            <div className="p-4">
              <select value={category} onChange={e => setCategory(e.target.value)} className={inputCls}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <button type="button" onClick={() => router.push('/admin/faqs')}
            className="w-full text-sm text-brand-text/40 hover:text-brand-text/70 transition-colors py-1">
            ← Back to FAQs
          </button>
        </div>
      </div>
    </div>
  )
}
