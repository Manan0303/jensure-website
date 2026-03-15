'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CTAButton from './CTAButton'

interface FormState {
  name: string
  email: string
  company: string
  message: string
}

export default function BookACallForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', company: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      setSuccess(true)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-brand-surface-2 px-4 py-2.5 text-sm text-brand-text placeholder:text-brand-text/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 transition'

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="w-12 h-12 bg-brand-cta/20 border border-brand-cta/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-brand-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-semibold text-brand-text mb-2">Request received</h3>
        <p className="text-sm text-brand-text/55">We will review your details and follow up within one business day.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-brand-text/60 mb-1.5">Full Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-text/60 mb-1.5">Work Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="jane@company.com" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-brand-text/60 mb-1.5">Company</label>
        <input type="text" name="company" value={form.company} onChange={handleChange} required placeholder="Acme Inc." className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-medium text-brand-text/60 mb-1.5">
          What are your biggest operational time sinks?
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the tasks your team spends the most time on each week..."
          className={inputClass}
        />
      </div>

      {error && (
        <p className="text-sm text-brand-error bg-brand-error/10 border border-brand-error/30 rounded-lg px-4 py-2.5">{error}</p>
      )}

      <CTAButton type="submit" disabled={loading} size="large" className="w-full justify-center">
        {loading ? 'Submitting...' : 'Request Automation Audit'}
      </CTAButton>

      <p className="text-xs text-brand-text/40 text-center">No commitment required. We respond within one business day.</p>
    </form>
  )
}
