'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
})

const CHECK = (
  <svg className="flex-shrink-0 text-brand-cta" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CHECK_ACCENT = (
  <svg className="flex-shrink-0 text-brand-accent" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function ProductsSection() {
  return (
    <SectionContainer id="products" className="bg-brand-bg">
      <motion.div {...fadeUp()} className="mb-12">
        <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 rounded-full px-4 py-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cta" />
          <span className="text-xs font-medium text-brand-text/70 tracking-wide">Human specialists + AI execution</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight max-w-2xl">
          Built for different problems. Backed by the same team.
        </h2>
      </motion.div>

      {/* Featured: GTM & Sales Automation */}
      <motion.div {...fadeUp(0.08)} className="mb-5">
        <Link
          href="/gtm-systems"
          className="group block bg-brand-surface border border-brand-cta/35 hover:border-brand-cta/65 rounded-xl p-8 transition-all duration-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-semibold px-3 py-1 rounded-full border text-brand-cta bg-brand-cta/10 border-brand-cta/30">
                  Most Popular
                </span>
                <span className="text-xs text-brand-text/40 font-medium">GTM & Sales</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-brand-text mb-2 group-hover:text-brand-cta transition-colors">
                GTM & Sales Automation
              </h3>
              <p className="text-brand-cta font-medium mb-4">From ICP to booked meeting. We handle the rest.</p>
              <p className="text-brand-text/60 leading-relaxed mb-6">
                We define your ideal customer, source 97% accurate contact data, and launch coordinated sequences across email, LinkedIn, and WhatsApp. Qualified meetings land in your calendar — your team handles the close.
              </p>
              <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cta group-hover:gap-3 transition-all duration-200">
                Start Free Pilot
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M7.5 3.5L11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Right: feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '97% verified contact data',
                'Email, LinkedIn and WhatsApp in sync',
                'Guaranteed inbox deliverability',
                'ICP definition included',
                'Personalised copy per prospect',
                '2-week free pilot',
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-2.5 text-sm text-brand-text/70">
                  {CHECK}
                  {pt}
                </div>
              ))}
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Two cards: Digital Marketing + AI Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Digital Marketing */}
        <motion.div {...fadeUp(0.14)}>
          <Link
            href="/services"
            className="group flex flex-col h-full bg-brand-surface border border-brand-accent/30 hover:border-brand-accent/60 rounded-xl p-7 transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-semibold px-3 py-1 rounded-full border text-brand-accent bg-brand-accent/10 border-brand-accent/30">
                High Impact
              </span>
              <span className="text-xs text-brand-text/40 font-medium">Digital Marketing</span>
            </div>
            <h3 className="text-xl font-bold text-brand-text mb-1 group-hover:text-brand-accent transition-colors">
              Digital Marketing Automation
            </h3>
            <p className="text-brand-accent font-medium text-sm mb-4">SEO, content, ads, and social. Running without a full-time team.</p>
            <p className="text-sm text-brand-text/55 leading-relaxed mb-6">
              We build your digital marketing engine — content published weekly, social scheduled, ad performance monitored, analytics reported monthly. Consistent output without a dedicated hire.
            </p>
            <ul className="space-y-2.5 mb-8">
              {[
                'SEO content published on schedule',
                'Social media automated across channels',
                'Paid ad monitoring and optimisation',
                'Monthly analytics reports',
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-brand-text/65">
                  {CHECK_ACCENT}
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent group-hover:gap-3 transition-all duration-200">
              See How It Works
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M7.5 3.5L11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </motion.div>

        {/* AI Departments */}
        <motion.div {...fadeUp(0.20)}>
          <Link
            href="/ai-departments"
            className="group flex flex-col h-full bg-brand-surface border border-white/12 hover:border-white/25 rounded-xl p-7 transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-semibold px-3 py-1 rounded-full border text-white/60 bg-white/8 border-white/15">
                Platform
              </span>
              <span className="text-xs text-brand-text/40 font-medium">Full Operations</span>
            </div>
            <h3 className="text-xl font-bold text-brand-text mb-1 group-hover:text-white transition-colors">
              AI Departments
            </h3>
            <p className="text-white/60 font-medium text-sm mb-4">Every business function running on coordinated AI agents.</p>
            <p className="text-sm text-brand-text/55 leading-relaxed mb-6">
              For businesses that want to automate entire departments. A Master Agent coordinates specialised Sub Agents across sales, marketing, operations, finance, and HR — built on your existing tools.
            </p>
            <ul className="space-y-2.5 mb-8">
              {[
                'Master Agent coordinating each department',
                'Sub Agents for sales, ops, finance, HR',
                'Connects to your existing tools',
                'Custom built for your business',
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-brand-text/65">
                  <svg className="flex-shrink-0 text-white/50" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 group-hover:gap-3 transition-all duration-200">
              Explore AI Departments
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M7.5 3.5L11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </motion.div>
      </div>
    </SectionContainer>
  )
}
