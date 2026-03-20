'use client'

import { motion } from 'framer-motion'
import SectionContainer from '@/components/layout/SectionContainer'
import { INDUSTRIES } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
})

const STEPS = [
  { step: '01', title: 'We review your operations', body: 'Tell us about your business and the tasks consuming the most time. We come prepared.' },
  { step: '02', title: 'We identify automation opportunities', body: 'We map which tasks are automatable, estimate the time savings, and prioritize by impact.' },
  { step: '03', title: 'We propose a build', body: 'You receive a clear proposal: which AI Department or automation to build, how it works, and what it delivers.' }
]

export default function BookACallContent() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 20% 50%, rgba(0,229,204,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(61,90,254,0.12) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p {...fadeUp(0)} className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Automation Audit</motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            Book a Free AI Automation Audit.
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-lg text-brand-text/60 max-w-2xl leading-relaxed">
            A focused review of your operations. No commitment required. We identify what can be automated and what it would deliver.
          </motion.p>
        </div>
      </section>

      {/* What to expect + Contact */}
      <SectionContainer className="bg-brand-surface">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: steps */}
          <motion.div {...fadeUp()}>
            <h2 className="text-2xl font-bold text-brand-text tracking-tight mb-8">What to expect</h2>
            <div className="space-y-8">
              {STEPS.map(({ step, title, body }, i) => (
                <motion.div key={step} {...fadeUp(i * 0.1)} className="flex gap-5">
                  <div className="text-3xl font-bold text-white/10 flex-shrink-0">{step}</div>
                  <div>
                    <h3 className="font-semibold text-brand-text mb-1">{title}</h3>
                    <p className="text-sm text-brand-text/55 leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.35)} className="mt-10 pt-8 border-t border-white/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-text/40 mb-4">Industries we work with</p>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.slice(0, 10).map((ind) => (
                  <span key={ind.id} className="text-xs bg-brand-surface-2 border border-white/8 rounded-full px-3 py-1 text-brand-text/60">
                    {ind.icon} {ind.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: email CTA */}
          <motion.div {...fadeUp(0.15)}>
            <div className="bg-brand-surface-2 border border-white/10 rounded-xl p-8">
              <h2 className="text-xl font-bold text-brand-text mb-2">Start the conversation</h2>
              <p className="text-sm text-brand-text/50 mb-8">Send us an email with your business name and the operations you want to automate. We respond within one business day.</p>

              <a
                href="mailto:info@jensure.com?subject=Automation Audit Request&body=Hi Jensure,%0A%0AI'd like to request a free automation audit.%0A%0ABusiness name: %0AIndustry: %0AMain bottleneck: "
                className="block w-full bg-brand-cta text-brand-bg font-semibold py-4 px-6 rounded-xl text-center text-sm hover:opacity-90 transition-opacity"
              >
                Email info@jensure.com
              </a>

              <div className="mt-6 space-y-3">
                {[
                  'We respond within 1 business day',
                  'No commitment or sales pressure',
                  'Free 30-minute audit call included',
                  'Try free for 2 weeks. Pay only if it delivers.',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-brand-text/50">
                    <span className="text-brand-cta text-xs">✓</span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/8">
                <p className="text-xs text-brand-text/30 text-center">Or reach us directly at</p>
                <p className="text-center mt-1">
                  <a href="mailto:info@jensure.com" className="text-brand-cta text-sm font-medium hover:opacity-80">
                    info@jensure.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </>
  )
}
