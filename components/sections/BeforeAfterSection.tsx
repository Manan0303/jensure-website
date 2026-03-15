'use client'

import { motion } from 'framer-motion'
import SectionContainer from '@/components/layout/SectionContainer'

interface WorkflowItem {
  label: string
  detail: string
}

const BEFORE_ITEMS: WorkflowItem[] = [
  { label: 'Manual data entry', detail: '3–5 hours daily across teams' },
  { label: 'Report preparation', detail: 'Half a day every Monday morning' },
  { label: 'Lead follow-ups', detail: 'Missed or delayed, revenue left on the table' },
  { label: 'Invoice processing', detail: 'Errors, delays, finance bottleneck' },
  { label: 'Onboarding tasks', detail: 'HR manually sends same emails every time' }
]

const AFTER_ITEMS: WorkflowItem[] = [
  { label: 'Data flows automatically', detail: 'Synced in real-time across all systems' },
  { label: 'Reports generate themselves', detail: 'Delivered to inboxes before the week starts' },
  { label: 'Follow-ups happen on schedule', detail: 'Every lead touched, every time' },
  { label: 'Invoices processed instantly', detail: 'No manual intervention, no delays' },
  { label: 'Onboarding runs without HR', detail: 'Triggered workflows handle every step' }
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
          Before and after AI Departments.
        </h2>
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
