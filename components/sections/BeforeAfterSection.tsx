'use client'

import { motion } from 'framer-motion'
import SectionContainer from '@/components/layout/SectionContainer'

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Define your ICP',
    body: 'We map your ideal customer: industry, company size, job title, geography, and tech stack. Your targeting becomes surgical, not scattered.'
  },
  {
    step: '02',
    title: 'Source verified contacts',
    body: '97% accurate emails, direct phone numbers, and LinkedIn profiles. Sourced fresh per campaign, not from a stale database. No bounces.'
  },
  {
    step: '03',
    title: 'Launch multi-channel sequences',
    body: 'Email sequences, LinkedIn outreach, and WhatsApp follow-ups running in coordinated sequence. Every message personalised. Every domain warmed and deliverability guaranteed.'
  },
  {
    step: '04',
    title: 'Meetings arrive in your calendar',
    body: 'Qualified prospects who fit your ICP and have expressed interest. Your team handles the close. Nothing else.'
  },
]

interface WorkflowItem {
  label: string
  detail: string
}

const BEFORE_ITEMS: WorkflowItem[] = [
  { label: 'Manual prospect research', detail: '3+ hours a day on LinkedIn, databases, and Google' },
  { label: 'Cold emails written one by one', detail: 'Inconsistent, low volume, barely personalised' },
  { label: 'LinkedIn outreach by hand', detail: 'Connection requests forgotten, follow-ups missed' },
  { label: 'WhatsApp messages sent manually', detail: 'Only happens when someone remembers to do it' },
  { label: 'Leads go cold between channels', detail: 'No coordination. Same prospect gets contradictory messages or none at all.' },
]

const AFTER_ITEMS: WorkflowItem[] = [
  { label: 'Qualified prospects identified and contacted daily', detail: 'AI agent sources from LinkedIn, intent signals, and verified databases' },
  { label: 'Personalised email sequences fire automatically', detail: 'Right message, right time. Nobody touches it.' },
  { label: 'LinkedIn outreach runs in parallel', detail: 'Connect, message, follow-up. All coordinated without anyone logging in.' },
  { label: 'WhatsApp triggered when email goes unanswered', detail: 'Multi-channel follow-up with zero manual effort from your side' },
  { label: 'Team wakes up to booked meetings', detail: 'AI handles prospecting. Your team handles closing.' },
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
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-cta mb-3">The Difference</p>
        <h2 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight">
          Your entire sales and marketing team. Running 24/7. Without you touching it.
        </h2>
        <p className="mt-4 text-lg text-brand-text/55 max-w-2xl mx-auto">Tell us your ICP. We handle everything else, from first touchpoint to booked meeting.</p>
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

      {/* How GTM process works */}
      <div className="mt-20 pt-16 border-t border-white/8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-cta mb-3">How It Works</p>
          <h3 className="text-3xl md:text-4xl font-bold text-brand-text tracking-tight">
            ICP to booked meeting. Four steps.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PROCESS_STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative"
            >
              <div className="text-4xl font-bold text-white/8 mb-3">{s.step}</div>
              <h4 className="text-base font-semibold text-brand-text mb-2">{s.title}</h4>
              <p className="text-sm text-brand-text/55 leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Guarantees bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { icon: '✓', label: '97% contact data accuracy', sub: 'Fresh sourced per campaign, not recycled databases' },
            { icon: '✓', label: 'Guaranteed inbox deliverability', sub: 'Domains warmed, sequences tested, reputation protected' },
            { icon: '✓', label: '2-week free pilot', sub: 'Pay only if you see results. No retainer before proof.' },
          ].map((g) => (
            <div key={g.label} className="flex items-start gap-3 bg-brand-cta/5 border border-brand-cta/20 rounded-xl px-5 py-4">
              <span className="text-brand-cta font-bold text-lg mt-0.5">{g.icon}</span>
              <div>
                <p className="text-sm font-semibold text-brand-text">{g.label}</p>
                <p className="text-xs text-brand-text/50 mt-0.5 leading-relaxed">{g.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  )
}
