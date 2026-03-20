'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import ServiceCard from '@/components/ui/ServiceCard'
import CTAButton from '@/components/ui/CTAButton'
import { AI_DEPARTMENTS, SMALL_AUTOMATIONS, GTM_COMPONENTS } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
})

export default function ServicesContent() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 15% 50%, rgba(61,90,254,0.15) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p {...fadeUp(0)} className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Services</motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            AI Automation Services Built for Your Operations.
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-lg text-brand-text/60 max-w-2xl leading-relaxed">
            Whether you need a complete AI Department or a targeted fix for one bottleneck, Jensure builds the right system for where you are today.
          </motion.p>
          <motion.div {...fadeUp(0.28)} className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 bg-brand-cta/10 border border-brand-cta/20 rounded-full px-4 py-2">
              <span className="text-brand-cta font-semibold text-sm">Automations from $100</span>
              <span className="text-brand-text/40 text-xs">· AI Departments from $1,500/month</span>
            </span>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-4 py-2">
              <span className="text-brand-text/70 text-sm">Try free for 2 weeks. Pay only if it delivers.</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* AI Departments */}
      <SectionContainer className="bg-brand-surface">
        <motion.div {...fadeUp()} className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Full Department Builds</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-brand-text tracking-tight">AI Departments</h2>
            <CTAButton href="/ai-departments" variant="secondary">View All Departments</CTAButton>
          </div>
          <p className="mt-3 text-brand-text/55 max-w-2xl">Orchestrated agent systems that run complete business functions end-to-end. Each department has a Master Agent coordinating specialized Sub Agents.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_DEPARTMENTS.map((dept, i) => (
            <motion.div
              key={dept.id}
              {...fadeUp(i * 0.07)}
              className="bg-brand-surface-2 border border-white/8 rounded-xl p-6 flex flex-col gap-3 hover:border-brand-accent/30 transition-colors duration-200"
            >
              <div className="text-2xl">{dept.icon}</div>
              <h3 className="font-semibold text-brand-text">{dept.name}</h3>
              <p className="text-sm text-brand-text/55 leading-relaxed">{dept.masterAgent.description}</p>
              <div className="mt-2 text-xs text-brand-cta font-medium">
                {dept.subAgents.length} specialized sub agents
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* GTM Systems */}
      <SectionContainer className="bg-brand-bg">
        <motion.div {...fadeUp()} className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Pipeline Automation</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-brand-text tracking-tight">GTM Systems</h2>
            <CTAButton href="/gtm-systems" variant="secondary">Learn More</CTAButton>
          </div>
          <p className="mt-4 text-brand-text/55 max-w-2xl">Automated go-to-market systems that generate and manage leads across email, LinkedIn, and CRM without a dedicated sales team.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GTM_COMPONENTS.map((c, i) => (
            <motion.div
              key={c.id}
              {...fadeUp(i * 0.06)}
              className="bg-brand-surface border border-white/8 rounded-xl p-5 hover:border-brand-accent/30 transition-colors"
            >
              <div className="text-xl mb-2">{c.icon}</div>
              <h3 className="text-sm font-semibold text-brand-text mb-1">{c.title}</h3>
              <p className="text-xs text-brand-text/50 leading-relaxed">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* Small Automations */}
      <SectionContainer className="bg-brand-surface">
        <motion.div {...fadeUp()} className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Targeted Solutions</p>
          <h2 className="text-3xl font-bold text-brand-text tracking-tight">Small Automation Solutions</h2>
          <p className="mt-4 text-brand-text/55 max-w-2xl">Any tedious, repetitive task in your business can become a fully automated, zero-attention-needed system delivered to your doorstep. Starting from $100 with a 2-week free trial.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SMALL_AUTOMATIONS.map((a, i) => (
            <motion.div key={a.id} {...fadeUp(i * 0.06)}>
              <ServiceCard icon={a.icon} title={a.title} description={a.description} badge={a.timeSaved} />
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-20 blur-3xl bg-brand-accent" />
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-15 blur-3xl bg-brand-cta" />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-text tracking-tight mb-4">Not sure where to start?</h2>
          <p className="text-brand-text/60 mb-8">Book a free automation audit. We will identify the highest-value automation opportunities in your business.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
