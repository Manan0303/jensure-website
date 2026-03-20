'use client'

import { useEffect, useState } from 'react'

type Tab = 'audit' | 'discovery' | 'contact'

interface AuditItem { _id: string; name: string; email: string; company: string; message?: string; createdAt: string }
interface DiscoveryItem { _id: string; industry: string; companySize: string; timeConsumingTask: string; employeeCount: number; hoursWeekly: number; createdAt: string }
interface ContactItem { _id: string; name: string; email: string; message: string; createdAt: string }

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function EnquiriesPage() {
  const [tab, setTab] = useState<Tab>('audit')
  const [data, setData] = useState<{ auditRequests: AuditItem[]; discoverySubmissions: DiscoveryItem[]; contacts: ContactItem[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/submissions').then(r => r.json()).then(setData).finally(() => setLoading(false))
  }, [])

  async function handleDelete(type: string, id: string) {
    if (!confirm('Delete this enquiry?')) return
    setDeleting(id)
    await fetch(`/api/admin/submissions/${id}?type=${type}`, { method: 'DELETE' })
    setData(prev => {
      if (!prev) return prev
      return {
        auditRequests: type === 'audit' ? prev.auditRequests.filter(x => x._id !== id) : prev.auditRequests,
        discoverySubmissions: type === 'discovery' ? prev.discoverySubmissions.filter(x => x._id !== id) : prev.discoverySubmissions,
        contacts: type === 'contact' ? prev.contacts.filter(x => x._id !== id) : prev.contacts,
      }
    })
    setDeleting(null)
  }

  const tabCls = (t: Tab) => `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tab === t ? 'bg-brand-accent/20 text-brand-accent' : 'text-brand-text/50 hover:text-brand-text'}`

  if (loading) return <div className="text-brand-text/40 text-sm">Loading enquiries…</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-text">Enquiries</h1>
        <span className="text-sm text-brand-text/40">{(data?.auditRequests.length ?? 0) + (data?.discoverySubmissions.length ?? 0) + (data?.contacts.length ?? 0)} total</span>
      </div>

      <div className="flex gap-2">
        <button className={tabCls('audit')} onClick={() => setTab('audit')}>
          Audit Requests ({data?.auditRequests.length ?? 0})
        </button>
        <button className={tabCls('discovery')} onClick={() => setTab('discovery')}>
          Discovery Forms ({data?.discoverySubmissions.length ?? 0})
        </button>
        <button className={tabCls('contact')} onClick={() => setTab('contact')}>
          Contact Messages ({data?.contacts.length ?? 0})
        </button>
      </div>

      <div className="bg-brand-surface border border-white/8 rounded-xl overflow-hidden">
        {tab === 'audit' && (
          <table className="w-full text-sm">
            <thead className="border-b border-white/8 bg-white/[0.03]">
              <tr>
                {['Name', 'Email', 'Company', 'Message', 'Date', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-brand-text/40 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {!data?.auditRequests.length && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-text/30">No audit requests yet.</td></tr>
              )}
              {data?.auditRequests.map(r => (
                <tr key={r._id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3 text-brand-text font-medium">{r.name}</td>
                  <td className="px-4 py-3 text-brand-text/60">{r.email}</td>
                  <td className="px-4 py-3 text-brand-text/60">{r.company}</td>
                  <td className="px-4 py-3 text-brand-text/40 max-w-xs truncate">{r.message ?? '—'}</td>
                  <td className="px-4 py-3 text-brand-text/40 whitespace-nowrap">{fmt(r.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete('audit', r._id)} disabled={deleting === r._id}
                      className="text-xs text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-40">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'discovery' && (
          <table className="w-full text-sm">
            <thead className="border-b border-white/8 bg-white/[0.03]">
              <tr>
                {['Industry', 'Company Size', 'Task', 'Employees', 'Hrs/Week', 'Date', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-brand-text/40 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {!data?.discoverySubmissions.length && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-brand-text/30">No discovery submissions yet.</td></tr>
              )}
              {data?.discoverySubmissions.map(d => (
                <tr key={d._id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3 text-brand-text">{d.industry}</td>
                  <td className="px-4 py-3 text-brand-text/60">{d.companySize}</td>
                  <td className="px-4 py-3 text-brand-text/60 max-w-xs truncate">{d.timeConsumingTask}</td>
                  <td className="px-4 py-3 text-brand-text/60">{d.employeeCount}</td>
                  <td className="px-4 py-3 text-brand-text/60">{d.hoursWeekly}</td>
                  <td className="px-4 py-3 text-brand-text/40 whitespace-nowrap">{fmt(d.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete('discovery', d._id)} disabled={deleting === d._id}
                      className="text-xs text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-40">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'contact' && (
          <table className="w-full text-sm">
            <thead className="border-b border-white/8 bg-white/[0.03]">
              <tr>
                {['Name', 'Email', 'Message', 'Date', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-brand-text/40 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {!data?.contacts.length && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-brand-text/30">No contact messages yet.</td></tr>
              )}
              {data?.contacts.map(c => (
                <tr key={c._id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3 text-brand-text font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-brand-text/60">{c.email}</td>
                  <td className="px-4 py-3 text-brand-text/40 max-w-sm truncate">{c.message}</td>
                  <td className="px-4 py-3 text-brand-text/40 whitespace-nowrap">{fmt(c.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete('contact', c._id)} disabled={deleting === c._id}
                      className="text-xs text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-40">
                      Delete
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
