'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  counts: { enquiries: number; blogs: number; caseStudies: number; faqs: number }
  recent: {
    audits: Array<{ _id: string; name: string; email: string; company: string; createdAt: string }>
    discovery: Array<{ _id: string; industry: string; companySize: string; createdAt: string }>
    contacts: Array<{ _id: string; name: string; email: string; createdAt: string }>
    blogs: Array<{ _id: string; title: string; slug: string; status: string; createdAt: string }>
    caseStudies: Array<{ _id: string; title: string; slug: string; industry: string; status: string; createdAt: string }>
  }
}

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} className="bg-brand-surface border border-white/8 rounded-xl p-6 hover:border-white/15 transition-colors block">
      <p className="text-3xl font-bold text-brand-text">{value}</p>
      <p className="text-sm text-brand-text/50 mt-1">{label}</p>
    </Link>
  )
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-brand-text/40 text-sm">Loading dashboard…</div>
  if (!stats) return <div className="text-red-400 text-sm">Failed to load stats.</div>

  const recentEnquiries = [
    ...stats.recent.audits.map(a => ({ id: a._id, label: a.name, sub: a.email, source: 'Audit', date: a.createdAt })),
    ...stats.recent.discovery.map(d => ({ id: d._id, label: d.industry, sub: d.companySize, source: 'Discovery', date: d.createdAt })),
    ...stats.recent.contacts.map(c => ({ id: c._id, label: c.name, sub: c.email, source: 'Contact', date: c.createdAt })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8)

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-brand-text">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Enquiries" value={stats.counts.enquiries} href="/admin/enquiries" />
        <StatCard label="Blog Posts" value={stats.counts.blogs} href="/admin/blogs" />
        <StatCard label="Case Studies" value={stats.counts.caseStudies} href="/admin/case-studies" />
        <StatCard label="FAQs" value={stats.counts.faqs} href="/admin/faqs" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
            <p className="font-medium text-brand-text text-sm">Recent Enquiries</p>
            <Link href="/admin/enquiries" className="text-xs text-brand-cta hover:opacity-80">View all</Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentEnquiries.length === 0 && <p className="px-5 py-4 text-sm text-brand-text/40">No enquiries yet.</p>}
            {recentEnquiries.map((e) => (
              <div key={e.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-brand-text">{e.label}</p>
                  <p className="text-xs text-brand-text/40">{e.sub}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-white/5 text-brand-text/50 px-2 py-0.5 rounded">{e.source}</span>
                  <p className="text-xs text-brand-text/30 mt-0.5">{fmt(e.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Content */}
        <div className="space-y-4">
          <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
              <p className="font-medium text-brand-text text-sm">Recent Blog Posts</p>
              <Link href="/admin/blogs" className="text-xs text-brand-cta hover:opacity-80">View all</Link>
            </div>
            <div className="divide-y divide-white/5">
              {stats.recent.blogs.length === 0 && <p className="px-5 py-4 text-sm text-brand-text/40">No posts yet.</p>}
              {stats.recent.blogs.map((b) => (
                <Link key={b._id} href={`/admin/blogs/${b.slug}`} className="px-5 py-3 flex items-center justify-between hover:bg-white/[0.03] transition-colors block">
                  <p className="text-sm text-brand-text truncate max-w-[220px]">{b.title}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${b.status === 'published' ? 'bg-brand-cta/10 text-brand-cta border-brand-cta/20' : 'bg-white/5 text-brand-text/40 border-white/10'}`}>{b.status}</span>
                    <span className="text-xs text-brand-text/30">{fmt(b.createdAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
              <p className="font-medium text-brand-text text-sm">Recent Case Studies</p>
              <Link href="/admin/case-studies" className="text-xs text-brand-cta hover:opacity-80">View all</Link>
            </div>
            <div className="divide-y divide-white/5">
              {stats.recent.caseStudies.length === 0 && <p className="px-5 py-4 text-sm text-brand-text/40">No case studies yet.</p>}
              {stats.recent.caseStudies.map((cs) => (
                <Link key={cs._id} href={`/admin/case-studies/${cs.slug}`} className="px-5 py-3 flex items-center justify-between hover:bg-white/[0.03] transition-colors block">
                  <div>
                    <p className="text-sm text-brand-text truncate max-w-[200px]">{cs.title}</p>
                    <p className="text-xs text-brand-text/40">{cs.industry}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${cs.status === 'published' ? 'bg-brand-cta/10 text-brand-cta border-brand-cta/20' : 'bg-white/5 text-brand-text/40 border-white/10'}`}>{cs.status}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
