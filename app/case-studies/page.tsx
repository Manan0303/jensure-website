'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'
import { CASE_STUDY_PREVIEWS } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
})

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 20% 40%, rgba(61,90,254,0.15) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p {...fadeUp(0)} className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Case Studies</motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            Automation in practice.
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-lg text-brand-text/60 max-w-2xl leading-relaxed">
            Concrete examples of how Jensure removes operational bottlenecks and replaces manual work with systems that run automatically.
          </motion.p>
        </div>
      </section>

      {/* Case Study Cards */}
      <SectionContainer className="bg-brand-surface">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDY_PREVIEWS.map((cs, i) => (
            <motion.div key={cs.slug} {...fadeUp(i * 0.1)}>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group bg-brand-surface-2 border border-white/8 rounded-xl p-7 flex flex-col gap-4 hover:border-brand-accent/40 transition-all duration-200 hover:shadow-card-hover block"
              >
                <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">{cs.industry}</span>
                <h2 className="text-xl font-bold text-brand-text leading-snug group-hover:text-brand-cta transition-colors">
                  {cs.headline}
                </h2>
                <div className="mt-auto pt-5 border-t border-white/8 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-brand-text">{cs.metric}</span>
                  <span className="text-sm text-brand-text/50">{cs.metricLabel}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* What makes these results */}
      <SectionContainer className="bg-brand-bg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">The Pattern</p>
            <h2 className="text-3xl font-bold text-brand-text tracking-tight mb-5">
              The same underlying architecture, different industries.
            </h2>
            <p className="text-brand-text/60 leading-relaxed mb-4">
              Every case study starts with the same question: which specific tasks are consuming the most time and following the most predictable pattern?
            </p>
            <p className="text-brand-text/60 leading-relaxed mb-6">
              Once those tasks are identified, the architecture is the same across industries: an AI Department with a Master Agent coordinating Sub Agents against the mapped workflow. The output is a system that runs the process end-to-end without ongoing human instruction.
            </p>
            <p className="text-sm italic text-brand-text/40">Jensure — Jack of all trades, master of all.</p>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="space-y-4">
            {[
              { step: '01', title: 'Operational audit', desc: 'Identify which tasks are repetitive, rule-based, and time-intensive.' },
              { step: '02', title: 'Workflow mapping', desc: 'Map the exact sequence from trigger to output, including all data sources and decision points.' },
              { step: '03', title: 'System design', desc: 'Architect the AI Department with the right Master Agent and Sub Agents.' },
              { step: '04', title: 'Build and deploy', desc: 'Connect systems, build agents, test against real data, and hand over the running system.' }
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 bg-brand-surface border border-white/8 rounded-xl px-5 py-4">
                <div className="text-2xl font-bold text-white/10 flex-shrink-0">{step}</div>
                <div>
                  <div className="font-semibold text-brand-text text-sm">{title}</div>
                  <div className="text-xs text-brand-text/50 mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl bg-brand-cta" />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-text tracking-tight mb-4">Want results like these?</h2>
          <p className="text-brand-text/60 mb-8">Book a free automation audit and we will identify what is possible in your specific operation.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
