'use client'

import { motion } from 'framer-motion'
import SectionContainer from '@/components/layout/SectionContainer'

interface WorkflowItem {
  label: string
  detail: string
}

const BEFORE_ITEMS: WorkflowItem[] = [
  { label: 'Manual prospect research', detail: '3+ hours/day on LinkedIn, databases, and Google' },
  { label: 'Cold emails written one by one', detail: 'Inconsistent, low volume, limited personalisation' },
  { label: 'LinkedIn outreach by hand', detail: 'Connection requests forgotten, follow-ups missed' },
  { label: 'WhatsApp messages sent manually', detail: 'Only happens when someone remembers' },
  { label: 'Leads go cold between channels', detail: 'No coordination — same prospect gets contradictory messages' },
]

const AFTER_ITEMS: WorkflowItem[] = [
  { label: '500+ qualified prospects identified daily', detail: 'AI agent sources from LinkedIn, intent signals, and databases' },
  { label: 'Personalised email sequences fire automatically', detail: 'Right message, right time — no one touches it' },
  { label: 'LinkedIn outreach runs in parallel', detail: 'Connect, message, follow-up — all coordinated automatically' },
  { label: 'WhatsApp triggered when email goes unanswered', detail: 'Multi-channel follow-up with zero manual effort' },
  { label: 'Team wakes up to booked meetings', detail: 'AI handles prospecting. You handle closing.' },
]

function WorkflowRow({
  item,
  variant,
  delay
}: {
  item: WorkflowItem
  variant: 'before' | 'after'
  delay: number
}) {
  const isBefore = variant === 'before'

  return (
    <motion.div
      initial={{ opacity: 0, x: isBefore ? -16 : 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-200 group ${
        isBefore
          ? 'border-brand-error/20 bg-brand-error/5 hover:border-brand-error/40'
          : 'border-brand-cta/20 bg-brand-cta/5 hover:border-brand-cta/40'
      }`}
    >
      <div
        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
          isBefore ? 'bg-brand-error/20 text-brand-error' : 'bg-brand-cta/20 text-brand-cta'
        }`}
      >
        {isBefore ? '✕' : '✓'}
      </div>
      <div>
        <div className={`text-sm font-semibold ${isBefore ? 'text-brand-error' : 'text-brand-cta'}`}>
          {item.label}
        </div>
        <div className="text-xs text-brand-text/50 mt-0.5">{item.detail}</div>
      </div>
    </motion.div>
  )
}

export default function BeforeAfterSection() {
  return (
    <SectionContainer id="before-after" className="bg-brand-surface-2">
      <div className="text-center mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">The Difference</p>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight">
          Before and after a Jensure AI Department.
        </h2>
        <p className="mt-4 text-brand-text/55 max-w-2xl mx-auto">The same sales goal. Completely different execution.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Before */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-error" />
            <h3 className="text-base font-semibold text-brand-text/70 uppercase tracking-wide text-sm">Before</h3>
          </div>
          <div className="space-y-3">
            {BEFORE_ITEMS.map((item, i) => (
              <WorkflowRow key={item.label} item={item} variant="before" delay={i * 0.08} />
            ))}
          </div>
        </div>

        {/* After */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-cta" />
            <h3 className="text-base font-semibold text-brand-text/70 uppercase tracking-wide text-sm">After Jensure</h3>
          </div>
          <div className="space-y-3">
            {AFTER_ITEMS.map((item, i) => (
              <WorkflowRow key={item.label} item={item} variant="after" delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
