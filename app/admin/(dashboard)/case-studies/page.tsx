'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface CaseStudy {
  _id: string; title: string; slug: string; industry: string;
  status: 'draft' | 'published'; createdAt: string
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function CaseStudiesPage() {
  const [items, setItems] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [seeding, setSeeding] = useState(false)

  function loadItems() {
    return fetch('/api/cms/case-studies?status=all&limit=100')
      .then(r => r.json()).then(d => setItems(d.caseStudies ?? [])).finally(() => setLoading(false))
  }

  useEffect(() => { loadItems() }, [])

  async function handleSeed() {
    if (!confirm('Seed the 3 static case studies into the database?')) return
    setSeeding(true)
    const res = await fetch('/api/cms/case-studies/seed', { method: 'POST' })
    const data = await res.json()
    alert(data.message ?? 'Done')
    await loadItems()
    setSeeding(false)
  }

  async function handleDelete(slug: string) {
    if (!confirm('Delete this case study permanently?')) return
    setDeleting(slug)
    await fetch(`/api/cms/case-studies/${slug}`, { method: 'DELETE' })
    setItems(prev => prev.filter(x => x.slug !== slug))
    setDeleting(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-text">Case Studies</h1>
        <div className="flex gap-2">
          <button onClick={handleSeed} disabled={seeding}
            className="border border-white/15 text-brand-text/70 hover:text-brand-text hover:border-white/30 px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-40">
            {seeding ? 'Seeding…' : 'Seed Static Case Studies'}
          </button>
          <Link href="/admin/case-studies/new"
            className="bg-brand-cta text-brand-bg text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
            + New Case Study
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
                {['Title', 'Industry', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-brand-text/40 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-brand-text/30">No case studies yet. Create your first one.</td></tr>
              )}
              {items.map(cs => (
                <tr key={cs._id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3 text-brand-text font-medium max-w-sm">
                    <span className="truncate block max-w-[280px]">{cs.title}</span>
                    <span className="text-xs text-brand-text/30">{cs.slug}</span>
                  </td>
                  <td className="px-4 py-3 text-brand-text/60">{cs.industry}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                      cs.status === 'published'
                        ? 'bg-brand-cta/10 text-brand-cta border-brand-cta/20'
                        : 'bg-white/5 text-brand-text/40 border-white/10'
                    }`}>{cs.status}</span>
                  </td>
                  <td className="px-4 py-3 text-brand-text/40 whitespace-nowrap">{fmt(cs.createdAt)}</td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <Link href={`/admin/case-studies/${cs.slug}`} className="text-xs text-brand-cta hover:opacity-80">Edit</Link>
                    <button onClick={() => handleDelete(cs.slug)} disabled={deleting === cs.slug}
                      className="text-xs text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-40">
                      {deleting === cs.slug ? '…' : 'Delete'}
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
