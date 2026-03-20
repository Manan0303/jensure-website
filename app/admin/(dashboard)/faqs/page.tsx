'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface FAQ { _id: string; question: string; category: string; status: 'draft' | 'published'; createdAt: string }

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function FAQsPage() {
  const [items, setItems] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/cms/faqs?status=all&limit=100')
      .then(r => r.json()).then(d => setItems(d.faqs ?? [])).finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this FAQ?')) return
    setDeleting(id)
    await fetch(`/api/cms/faqs/${id}`, { method: 'DELETE' })
    setItems(prev => prev.filter(x => x._id !== id))
    setDeleting(null)
  }

  async function seedFAQs() {
    if (!confirm('Seed 8 default FAQs?')) return
    await fetch('/api/cms/faqs/seed', { method: 'POST' })
    const d = await fetch('/api/cms/faqs?status=all&limit=100').then(r => r.json())
    setItems(d.faqs ?? [])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-text">FAQs</h1>
        <div className="flex gap-2">
          {items.length === 0 && (
            <button onClick={seedFAQs} className="border border-white/15 text-brand-text/70 text-sm px-4 py-2 rounded-lg hover:border-white/30 transition-colors">
              Seed Default FAQs
            </button>
          )}
          <Link href="/admin/faqs/new" className="bg-brand-cta text-brand-bg text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
            + New FAQ
          </Link>
        </div>
      </div>

      <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
        {loading ? (
          <div className="px-6 py-10 text-center text-brand-text/40 text-sm">Loading…</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-white/8 bg-white/[0.03]">
              <tr>
                {['Question', 'Category', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-brand-text/40 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-brand-text/30">No FAQs yet. Create one or seed defaults.</td></tr>
              )}
              {items.map(faq => (
                <tr key={faq._id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3 text-brand-text max-w-sm">
                    <span className="truncate block max-w-[380px]">{faq.question}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-white/5 text-brand-text/50 px-2 py-0.5 rounded border border-white/10">{faq.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${faq.status === 'published' ? 'bg-brand-cta/10 text-brand-cta border-brand-cta/20' : 'bg-white/5 text-brand-text/40 border-white/10'}`}>
                      {faq.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-brand-text/40 whitespace-nowrap">{fmt(faq.createdAt)}</td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <Link href={`/admin/faqs/${faq._id}`} className="text-xs text-brand-cta hover:opacity-80">Edit</Link>
                    <button onClick={() => handleDelete(faq._id)} disabled={deleting === faq._id}
                      className="text-xs text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-40">
                      {deleting === faq._id ? '…' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
