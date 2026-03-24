'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionContainer from '@/components/layout/SectionContainer'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

interface Path {
  signal: string
  action: string
}

interface Step {
  id: string
  num: string
  title: string
  stat: string
  statLabel: string
  description: string
  paths?: Path[]
}

const STEPS: Step[] = [
  {
    id: 'identify',
    num: '01',
    title: 'Lead Intelligence',
    stat: '247',
    statLabel: 'prospects matched to your ICP today',
    description:
      'Prospects are sourced and scored against your exact ICP: industry, title, company size, geography, and intent signals. Only qualified targets enter the sequence. No manual research, no guesswork.',
  },
  {
    id: 'verify',
    num: '02',
    title: 'Verified & Enriched',
    stat: '97%',
    statLabel: 'contact data accuracy guaranteed',
    description:
      'Every email address, LinkedIn profile, and phone number is verified before a single message sends. Domains are warmed. Deliverability is confirmed. No bounce rate. No reputation damage.',
  },
  {
    id: 'sequence',
    num: '03',
    title: 'Sequence Active',
    stat: '6',
    statLabel: 'coordinated touches per prospect',
    description:
      'A multi-channel sequence launches across the channels most likely to reach this specific contact. Every message is written for them, not templated. Channel selection, timing, and copy are all data-driven.',
  },
  {
    id: 'route',
    num: '04',
    title: 'Response Intelligence',
    stat: '< 60s',
    statLabel: 'to re-route based on behaviour',
    description:
      'Every open, click, reply, and silence is tracked. The system reads each signal and determines the next action without human input. Engaged prospects are fast-tracked. Those who have not responded yet are re-engaged through a different channel.',
    paths: [
      { signal: 'Signal detected', action: 'Fast-tracked toward conversion' },
      { signal: 'No response yet', action: 'Re-engaged on next channel' },
    ],
  },
  {
    id: 'book',
    num: '05',
    title: 'Meeting Confirmed',
    stat: '12',
    statLabel: 'qualified meetings booked this week',
    description:
      'A prospect who fits your ICP and has expressed genuine interest selects a time. The meeting lands in your calendar. Your team handles the close. The engine starts again on the next batch.',
  },
]

export default function GTMWorkflowSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive((p) => (p + 1) % STEPS.length), 2800)
    return () => clearInterval(t)
  }, [paused])

  const step = STEPS[active]

  return (
    <SectionContainer className="bg-brand-surface-2 overflow-hidden">
      <motion.div {...fadeUp()} className="text-center mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">GTM Automation Engine</p>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight mb-4">
          The machine behind every meeting.
        </h2>
        <p className="text-brand-text/55 max-w-2xl mx-auto">
          For every prospect in your ICP, a coordinated sequence runs from first identification to booked call. Here is the intelligence at each stage.
        </p>
      </motion.div>

      <motion.div {...fadeUp(0.1)}>
        {/* Step indicators */}
        <div className="relative mb-3">
          {/* Connecting line — desktop */}
          <div className="absolute top-6 left-[10%] right-[10%] h-px bg-white/8 hidden md:block" />

          <div className="grid grid-cols-5 gap-2">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setActive(i); setPaused(true) }}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border transition-all duration-300 ${
                    active === i
                      ? 'bg-brand-cta text-brand-bg border-brand-cta'
                      : i < active
                      ? 'bg-brand-cta/20 text-brand-cta border-brand-cta/40'
                      : 'bg-brand-surface border-white/12 text-brand-text/30 group-hover:border-white/25 group-hover:text-brand-text/50'
                  }`}
                >
                  {active === i && (
                    <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-brand-cta" />
                  )}
                  <span className="relative z-10 text-xs">{i < active ? '✓' : s.num}</span>
                </div>
                <span
                  className={`text-[11px] font-medium text-center leading-tight max-w-[72px] transition-colors ${
                    active === i ? 'text-brand-text' : 'text-brand-text/30'
                  }`}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-white/8 rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-accent to-brand-cta rounded-full"
            animate={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        {/* Active step detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-brand-surface border border-brand-cta/20 rounded-2xl p-7 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-start">
              {/* Big stat */}
              <div className="md:col-span-1 flex flex-col md:justify-center md:border-r md:border-white/8 md:pr-6">
                <div className="text-5xl font-bold text-brand-cta mb-1 leading-none">{step.stat}</div>
                <div className="text-xs text-brand-text/40 leading-snug mt-2">{step.statLabel}</div>
              </div>

              {/* Content */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-xs font-mono text-brand-text/20">{step.num}</span>
                  <h3 className="text-xl font-bold text-brand-text">{step.title}</h3>
                  <span className="flex items-center gap-1.5 text-xs text-brand-cta border border-brand-cta/25 bg-brand-cta/5 rounded-full px-2.5 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cta animate-pulse" />
                    Active
                  </span>
                </div>
                <p className="text-brand-text/60 leading-relaxed text-sm mb-4">{step.description}</p>

                {/* Branch visual — only for step 4 */}
                {step.paths && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {step.paths.map((path) => (
                      <div
                        key={path.signal}
                        className="bg-brand-cta/5 border border-brand-cta/15 rounded-xl px-4 py-3"
                      >
                        <div className="text-xs font-semibold text-brand-cta mb-1">{path.signal}</div>
                        <div className="text-xs text-brand-text/45">{path.action}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Playback control */}
        <div className="mt-5 flex items-center justify-center gap-4">
          {paused ? (
            <button
              onClick={() => setPaused(false)}
              className="flex items-center gap-2 text-xs text-brand-text/35 hover:text-brand-text/70 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <path d="M2 1.5L8.5 5L2 8.5V1.5Z" />
              </svg>
              Resume walkthrough
            </button>
          ) : (
            <span className="flex items-center gap-2 text-xs text-brand-text/25">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cta animate-pulse" />
              Auto-walkthrough running
            </span>
          )}
          <span className="text-brand-text/15 text-xs">·</span>
          <span className="text-xs text-brand-text/25 font-mono">{active + 1} / {STEPS.length}</span>
        </div>
      </motion.div>
    </SectionContainer>
  )
}
