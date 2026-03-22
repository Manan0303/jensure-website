'use client'

import { useEffect, useState } from 'react'

interface AuditRequest {
  _id: string
  name: string
  email: string
  company: string
  message?: string
  createdAt: string
}

interface DiscoverySubmission {
  _id: string
  industry: string
  companySize: string
  timeConsumingTask: string
  employeeCount: number
  hoursWeekly: number
  result: {
    weeklyHoursSaved: number
    annualHoursSaved: number
    annualDaysSaved: number
    annualFTESaved: number
  }
  createdAt: string
}

interface Contact {
  _id: string
  name: string
  email: string
  message: string
  createdAt: string
}

type Tab = 'audit' | 'discovery' | 'contacts'

function Badge({ count }: { count: number }) {
  return (
    <span className="ml-2 bg-brand-accent/20 text-brand-accent text-xs font-medium px-2 py-0.5 rounded-full">
      {count}
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center py-16 text-brand-text/30 text-sm">
      No {label} yet.
    </div>
  )
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('audit')
  const [auditRequests, setAuditRequests] = useState<AuditRequest[]>([])
  const [discoverySubmissions, setDiscoverySubmissions] = useState<DiscoverySubmission[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/submissions')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setAuditRequests(data.auditRequests ?? [])
        setDiscoverySubmissions(data.discoverySubmissions ?? [])
        setContacts(data.contacts ?? [])
      })
      .catch(() => setError('Failed to load submissions.'))
      .finally(() => setLoading(false))
  }, [])

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'audit', label: 'Audit Requests', count: auditRequests.length },
    { key: 'discovery', label: 'Discovery Forms', count: discoverySubmissions.length },
    { key: 'contacts', label: 'Contact Messages', count: contacts.length },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-text">Submissions</h1>
        <p className="text-brand-text/50 text-sm mt-1">All form submissions from jensure.com</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {tabs.map((t) => (
          <div key={t.key} className="bg-brand-surface border border-white/8 rounded-xl p-5">
            <div className="text-3xl font-bold text-brand-text">{loading ? '—' : t.count}</div>
            <div className="text-brand-text/50 text-sm mt-1">{t.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-brand-surface border border-white/8 rounded-xl p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              tab === t.key
                ? 'bg-brand-accent text-white'
                : 'text-brand-text/60 hover:text-brand-text'
            }`}
          >
            {t.label}
            {!loading && <Badge count={t.count} />}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading && (
        <div className="text-brand-text/40 text-sm py-12 text-center">Loading…</div>
      )}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && tab === 'audit' && (
        auditRequests.length === 0 ? <EmptyState label="audit requests" /> : (
          <div className="space-y-3">
            {auditRequests.map((r) => (
              <div key={r._id} className="bg-brand-surface border border-white/8 rounded-xl p-5 hover:border-brand-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium text-brand-text">{r.name}</div>
                    <div className="text-brand-text/50 text-sm mt-0.5">{r.email} · {r.company}</div>
                    {r.message && <div className="text-brand-text/60 text-sm mt-2 border-t border-white/5 pt-2">{r.message}</div>}
                  </div>
                  <div className="text-brand-text/30 text-xs whitespace-nowrap shrink-0">{formatDate(r.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {!loading && !error && tab === 'discovery' && (
        discoverySubmissions.length === 0 ? <EmptyState label="discovery submissions" /> : (
          <div className="space-y-3">
            {discoverySubmissions.map((s) => (
              <div key={s._id} className="bg-brand-surface border border-white/8 rounded-xl p-5 hover:border-brand-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-medium text-brand-text">{s.industry}</span>
                      <span className="text-xs bg-brand-surface-2 border border-white/8 text-brand-text/60 px-2 py-0.5 rounded-full">{s.companySize}</span>
                    </div>
                    <div className="text-brand-text/60 text-sm mt-1">{s.timeConsumingTask}</div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-3 text-sm">
                      <span className="text-brand-text/40">Employees on task</span>
                      <span className="text-brand-text/80">{s.employeeCount}</span>
                      <span className="text-brand-text/40">Hours/week</span>
                      <span className="text-brand-text/80">{s.hoursWeekly}h</span>
                      <span className="text-brand-text/40">Weekly hours saved</span>
                      <span className="text-brand-cta font-medium">{s.result.weeklyHoursSaved}h</span>
                      <span className="text-brand-text/40">Annual FTE saved</span>
                      <span className="text-brand-cta font-medium">{s.result.annualFTESaved}</span>
                    </div>
                  </div>
                  <div className="text-brand-text/30 text-xs whitespace-nowrap shrink-0">{formatDate(s.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {!loading && !error && tab === 'contacts' && (
        contacts.length === 0 ? <EmptyState label="contact messages" /> : (
          <div className="space-y-3">
            {contacts.map((c) => (
              <div key={c._id} className="bg-brand-surface border border-white/8 rounded-xl p-5 hover:border-brand-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium text-brand-text">{c.name}</div>
                    <div className="text-brand-text/50 text-sm mt-0.5">{c.email}</div>
                    <div className="text-brand-text/60 text-sm mt-2 border-t border-white/5 pt-2">{c.message}</div>
                  </div>
                  <div className="text-brand-text/30 text-xs whitespace-nowrap shrink-0">{formatDate(c.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}
