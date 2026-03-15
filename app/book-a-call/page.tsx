'use client'

import { motion } from 'framer-motion'
import SectionContainer from '@/components/layout/SectionContainer'
import BookACallForm from '@/components/ui/BookACallForm'
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

export default function BookACallPage() {
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
            Book your free automation audit.
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-lg text-brand-text/60 max-w-2xl leading-relaxed">
            A focused review of your operations. No commitment required. We identify what can be automated and what it would deliver.
          </motion.p>
        </div>
      </section>

      {/* What to expect + Form */}
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

            <motion.div {...fadeUp(0.45)} className="mt-8 p-5 bg-brand-surface-2 border border-brand-cta/20 rounded-xl">
              <p className="text-sm italic text-brand-text/60 leading-relaxed">
                &ldquo;Jensure — Jack of all trades, master of all. We approach every business function with the same philosophy: if it follows a pattern, it can be systematised.&rdquo;
              </p>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div {...fadeUp(0.15)}>
            <div className="bg-brand-surface-2 border border-white/10 rounded-xl p-8">
              <h2 className="text-xl font-bold text-brand-text mb-2">Request your audit</h2>
              <p className="text-sm text-brand-text/50 mb-6">No commitment. We respond within one business day.</p>
              <BookACallForm />
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </>
  )
}
