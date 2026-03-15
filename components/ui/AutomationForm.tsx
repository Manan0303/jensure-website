'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CTAButton from './CTAButton'
import type { AutomationResult } from '@/lib/utils'
import { INDUSTRIES } from '@/lib/constants'

const COMPANY_SIZES = [
  '1–10 employees',
  '11–50 employees',
  '51–200 employees',
  '201–500 employees',
  '500+ employees'
]

interface FormState {
  industry: string
  companySize: string
  timeConsumingTask: string
  employeeCount: string
  hoursWeekly: string
}

export default function AutomationForm() {
  const [form, setForm] = useState<FormState>({
    industry: '',
    companySize: '',
    timeConsumingTask: '',
    employeeCount: '',
    hoursWeekly: ''
  })
  const [result, setResult] = useState<AutomationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/automation-discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: form.industry,
          companySize: form.companySize,
          timeConsumingTask: form.timeConsumingTask,
          employeeCount: Number(form.employeeCount),
          hoursWeekly: Number(form.hoursWeekly)
        })
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      const data: AutomationResult = await response.json()
      setResult(data)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-brand-surface-2 px-4 py-2.5 text-sm text-brand-text placeholder:text-brand-text/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 transition'

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-text/70 mb-1.5">Industry</label>
            <select name="industry" value={form.industry} onChange={handleChange} required className={inputClass}>
              <option value="">Select your industry</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind.id} value={ind.name}>{ind.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-text/70 mb-1.5">Company Size</label>
            <select name="companySize" value={form.companySize} onChange={handleChange} required className={inputClass}>
              <option value="">Select company size</option>
              {COMPANY_SIZES.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-text/70 mb-1.5">
            Most Time-Consuming Task
          </label>
          <input
            type="text"
            name="timeConsumingTask"
            value={form.timeConsumingTask}
            onChange={handleChange}
            required
            placeholder="e.g. Manually creating weekly reports from spreadsheets"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-text/70 mb-1.5">
              Employees Performing This Task
            </label>
            <input
              type="number"
              name="employeeCount"
              value={form.employeeCount}
              onChange={handleChange}
              required
              min={1}
              placeholder="e.g. 3"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-text/70 mb-1.5">
              Hours Spent Weekly
            </label>
            <input
              type="number"
              name="hoursWeekly"
              value={form.hoursWeekly}
              onChange={handleChange}
              required
              min={1}
              placeholder="e.g. 10"
              className={inputClass}
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-brand-error bg-brand-error/10 border border-brand-error/30 rounded-lg px-4 py-2.5">
            {error}
          </p>
        )}

        <CTAButton type="submit" disabled={loading} size="large" className="w-full justify-center">
          {loading ? 'Calculating...' : 'Calculate Automation Opportunity'}
        </CTAButton>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 rounded-xl border border-brand-cta/30 bg-brand-surface-2 p-8"
          >
            <h3 className="text-lg font-semibold text-brand-text mb-1">Your Automation Opportunity</h3>
            <p className="text-sm text-brand-text/50 mb-6">Based on 70% automatable work assumption</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: `${result.weeklyHoursSaved}h`, label: 'Hours saved weekly' },
                { value: `${result.annualHoursSaved}h`, label: 'Hours saved annually' },
                { value: `${result.annualDaysSaved}`, label: 'Working days saved' },
                { value: `${result.annualFTESaved}`, label: 'FTE equivalent saved' }
              ].map(({ value, label }) => (
                <div key={label} className="text-center bg-brand-surface border border-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-brand-cta">{value}</div>
                  <div className="text-xs text-brand-text/50 mt-1">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 text-center">
              <p className="text-sm text-brand-text/60 mb-4">
                Ready to reclaim this time? Book a free automation audit to see exactly what to build.
              </p>
              <CTAButton href="/book-a-call" variant="primary" size="large">
                Book Automation Audit
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
