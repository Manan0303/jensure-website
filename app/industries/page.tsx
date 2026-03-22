'use client'

import { motion } from 'framer-motion'
import SectionContainer from '@/components/layout/SectionContainer'
import IndustryCard from '@/components/ui/IndustryCard'
import CTAButton from '@/components/ui/CTAButton'
import { INDUSTRIES } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
})

const UNIVERSAL_PROBLEMS = [
  {
    icon: '↻',
    title: 'Repetitive follow-ups',
    detail: 'Hours spent chasing people who would respond to the right message at the right time — if anyone remembered to send it.'
  },
  {
    icon: '⊞',
    title: 'Manual data entry',
    detail: 'Someone in your team is copying information from one system to another, every single day. That person could be doing something that actually matters.'
  },
  {
    icon: '⏱',
    title: 'Reports compiled by hand',
    detail: 'Your team spends three hours every week building a report that a system could generate in 30 seconds.'
  },
  {
    icon: '◎',
    title: 'Leads that go cold',
    detail: 'Prospects who showed interest but never heard back in time. Not because your team did not care — because there was too much to track manually.'
  },
]

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 70% 20%, rgba(0,229,204,0.14) 0%, transparent 50%), radial-gradient(circle at 10% 70%, rgba(61,90,254,0.18) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p {...fadeUp(0)} className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-4">Industries</motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-text tracking-tight mb-6 max-w-4xl leading-[1.05]">
            Your competitors are already automating.{' '}
            <span className="text-brand-cta">The question is how far behind you are.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-lg md:text-xl text-brand-text/60 max-w-2xl leading-relaxed mb-12">
            Every industry has the same core problem: talented people spending hours on work that follows a pattern. We find it, automate it, and give you the time back.
          </motion.p>

          {/* Stat bar */}
          <motion.div
            {...fadeUp(0.24)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
          >
            {[
              { value: '17', label: 'Industries we work in' },
              { value: '40+', label: 'Hours saved per team, per week' },
              { value: '14 days', label: 'From audit to first automation live' },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-brand-cta/30 pl-4">
                <div className="text-3xl font-bold text-brand-text">{value}</div>
                <div className="text-sm text-brand-text/45 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Universal problems */}
      <SectionContainer className="bg-brand-surface">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">The Pattern We See Everywhere</p>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight mb-4">
            Different industries. The same four problems.
          </h2>
          <p className="text-brand-text/55 max-w-2xl mx-auto">
            We have worked across 17 industries. The specific tools and workflows differ. But these four operational problems show up every time, in every sector, costing more than anyone tracks.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {UNIVERSAL_PROBLEMS.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp(i * 0.08)}
              className="bg-brand-surface-2 border border-brand-error/20 rounded-xl p-6 hover:border-brand-error/40 transition-colors"
            >
              <div className="text-2xl text-brand-error mb-4">{p.icon}</div>
              <h3 className="text-sm font-bold text-brand-text mb-2">{p.title}</h3>
              <p className="text-xs text-brand-text/50 leading-relaxed">{p.detail}</p>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp(0.35)} className="mt-8 text-center">
          <p className="text-sm text-brand-text/40">
            Every one of these is fully automatable. None of them require human judgement. All of them stop the moment you build the right system.
          </p>
        </motion.div>
      </SectionContainer>

      {/* Industry Grid */}
      <SectionContainer className="bg-brand-bg">
        <motion.div {...fadeUp()} className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Find Your Industry</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text tracking-tight">
                We have built automations in 17 sectors.
              </h2>
              <p className="mt-2 text-brand-text/50">Each card shows the exact problem Jensure solves and how.</p>
            </div>
            <CTAButton href="/book-a-call" variant="secondary">Get Your Industry Audit</CTAButton>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((industry, i) => (
            <motion.div key={industry.id} {...fadeUp(Math.min(i * 0.04, 0.4))}>
              <IndustryCard
                icon={industry.icon}
                name={industry.name}
                painPoint={industry.painPoint}
                automationExample={industry.automationExample}
              />
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* How it works across industries */}
      <SectionContainer className="bg-brand-surface">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">The Principle</p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text tracking-tight mb-5">
              If it follows a pattern, it can be automated.
            </h2>
            <p className="text-brand-text/60 leading-relaxed mb-4">
              The businesses we work with are not short on talented people. They are short on time, because talented people are doing work that machines can handle. We find that work and remove it.
            </p>
            <p className="text-brand-text/60 leading-relaxed mb-4">
              The pattern is always the same: receive an input, apply a rule, produce an output, trigger the next step. Whether that happens in a hospital, an agency, a bank, or an ecommerce warehouse makes no difference to the system.
            </p>
            <p className="text-sm text-brand-cta font-medium leading-relaxed">
              The moment you free your team from predictable work, you find out what they are actually capable of.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="space-y-4">
            {[
              { step: '01', title: 'We audit your operations', desc: 'One conversation, 45 minutes. We identify which tasks are repetitive, rule-based, and consuming the most time across your team.' },
              { step: '02', title: 'We build the automation', desc: 'Custom-built for your tools, your workflows, and your specific industry processes. Not a template. Built for you.' },
              { step: '03', title: 'It runs without you', desc: 'The system goes live. Your team stops doing the manual work. We monitor, refine, and ensure it holds. You pay only if it delivers.' },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex gap-4 bg-brand-surface-2 border border-white/8 rounded-xl p-5 hover:border-brand-cta/25 transition-colors"
              >
                <span className="text-2xl font-bold text-white/10 flex-shrink-0 w-8">{step}</span>
                <div>
                  <h3 className="text-sm font-bold text-brand-text mb-1">{title}</h3>
                  <p className="text-xs text-brand-text/50 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-bg">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-4">Your Industry Is Next</p>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight mb-5">
            Tell us what you do. We will show you what to stop doing manually.
          </h2>
          <p className="text-brand-text/55 mb-10 leading-relaxed">
            One free audit. We review your specific operations and identify the exact workflows that are costing you the most time. No pitch, no obligation — just a clear picture of what is automatable.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CTAButton href="/book-a-call" variant="primary" size="large">Get Your Free Automation Audit</CTAButton>
            <CTAButton href="/case-studies" variant="secondary" size="large">See What We Have Built</CTAButton>
          </div>
          <p className="mt-6 text-xs text-brand-text/30">2-week free pilot. Pay only when you see results. No contracts.</p>
        </div>
      </SectionContainer>
    </>
  )
}
