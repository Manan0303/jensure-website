'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
}

export default function BookConsultationModal({ open, onClose, title = 'Book Audit Consultation', subtitle = 'Our team will reach out within 24 hours.' }: Props) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (!open) {
      setTimeout(() => setStatus('idle'), 300)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const field = 'w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/30 focus:outline-none focus:border-brand-cta/50 transition-colors'

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-lg bg-brand-surface border border-white/12 rounded-2xl p-8 shadow-2xl">

              {status === 'success' ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-brand-cta/15 border border-brand-cta/30 flex items-center justify-center mx-auto mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-cta">
                      <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-brand-text mb-2">You are all set.</h3>
                  <p className="text-brand-text/55 text-sm leading-relaxed mb-6">
                    Our team will review your details and reach out within 24 hours to schedule your audit consultation.
                  </p>
                  <button
                    onClick={onClose}
                    className="text-sm text-brand-text/50 hover:text-brand-text transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-brand-text mb-1">{title}</h3>
                      <p className="text-sm text-brand-text/50">{subtitle}</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-1.5 text-brand-text/40 hover:text-brand-text transition-colors rounded-lg hover:bg-white/5"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        required
                        placeholder="Full name"
                        className={field}
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      />
                      <input
                        required
                        type="email"
                        placeholder="Work email"
                        className={field}
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                    <input
                      required
                      placeholder="Company name"
                      className={field}
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    />
                    <textarea
                      required
                      rows={4}
                      placeholder="What would you like to automate? (outreach, reporting, admin work...)"
                      className={`${field} resize-none`}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />

                    {status === 'error' && (
                      <p className="text-xs text-red-400">Something went wrong. Email us directly at info@jensure.com</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-brand-cta text-brand-bg font-semibold py-3.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {status === 'loading' ? 'Submitting...' : 'Request Consultation'}
                    </button>

                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-1">
                      {['No commitment required', '14-day free trial available', 'Response within 24 hours'].map(t => (
                        <span key={t} className="flex items-center gap-1.5 text-xs text-brand-text/40">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-brand-cta">
                            <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {t}
                        </span>
                      ))}
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
