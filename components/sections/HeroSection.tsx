'use client'

import { motion } from 'framer-motion'
import CTAButton from '@/components/ui/CTAButton'
import AgentNetworkBackground from '@/components/ui/AgentNetworkBackground'

const METRICS = [
  { label: 'Prospects sourced', value: '247', sub: 'today', bar: 82 },
  { label: 'Email deliverability', value: '99.7%', sub: 'this campaign', bar: 99 },
  { label: 'Meetings booked', value: '12', sub: 'this week', bar: 60 },
]

export default function HeroSection() {
  return (
    <section
      className="relative pt-32 pb-24 md:pt-44 md:pb-32 px-6 md:px-12 lg:px-16 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 20% 30%, rgba(61,90,254,0.22) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(0,229,204,0.15) 0%, transparent 45%), linear-gradient(135deg, #090D24, #111633, #0B1A3B)'
      }}
    >
      {/* Agent network background */}
      <AgentNetworkBackground />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/10 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cta animate-pulse" />
              <span className="text-xs font-medium text-brand-text/80 tracking-wide uppercase">Agentic AI for Business Operations</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-brand-text"
            >
              Human and AI, working as one.{' '}
              <span className="text-brand-accent">Build in weeks what used to take years.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-brand-text/65 max-w-xl leading-relaxed mb-10"
            >
              Jensure pairs dedicated specialists with AI systems. Our team leads strategy. AI handles execution. The balance shifts to whatever your business needs, always the combination that actually delivers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <CTAButton href="/book-a-call" variant="primary" size="large">
                  Book Automation Audit
                </CTAButton>
                <CTAButton href="/gtm-systems" variant="secondary" size="large">
                  Explore GTM Automation
                </CTAButton>
              </div>
              <p className="text-xs text-brand-text/35">
                2-week free pilot. If you do not see measurable results, you do not pay. No contracts, no lock-in.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-14 pt-8 border-t border-white/10 flex flex-wrap gap-10"
            >
              {[
                { value: '97%', label: 'Contact data accuracy per campaign' },
                { value: '3×', label: 'More qualified meetings booked' },
                { value: '14 days', label: 'Free pilot, pay only for results' }
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-brand-text">{value}</div>
                  <div className="text-sm text-brand-text/50 mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: live campaign panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="bg-brand-surface/70 backdrop-blur-xl border border-white/12 rounded-2xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brand-cta animate-pulse" />
                  <span className="text-xs font-semibold text-brand-text/70 uppercase tracking-wider">Client Campaign</span>
                </div>
                <span className="text-xs text-brand-cta/60 font-mono border border-brand-cta/20 bg-brand-cta/5 rounded px-2 py-0.5">Sample output</span>
              </div>
              <p className="text-[10px] text-brand-text/25 mb-5">Example of what your outreach dashboard looks like with Jensure</p>

              {/* Metrics */}
              <div className="space-y-5 mb-6">
                {METRICS.map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-brand-text/60">{m.label}</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-bold text-brand-text">{m.value}</span>
                        <span className="text-xs text-brand-text/35">{m.sub}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${m.bar}%` }}
                        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-brand-accent to-brand-cta"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Channel activity */}
              <div className="border-t border-white/8 pt-5 mb-5">
                <p className="text-xs text-brand-text/40 uppercase tracking-wider mb-3">Active channels</p>
                <div className="flex gap-2 flex-wrap">
                  {['Email', 'LinkedIn', 'WhatsApp'].map((ch) => (
                    <span key={ch} className="text-xs bg-brand-cta/10 border border-brand-cta/25 text-brand-cta rounded-full px-3 py-1 font-medium">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Latest event */}
              <div className="bg-brand-cta/8 border border-brand-cta/20 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-brand-cta mb-0.5">Meeting booked</p>
                <p className="text-xs text-brand-text/50">Prospect replied to LinkedIn follow-up. Call scheduled for tomorrow 10am.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
