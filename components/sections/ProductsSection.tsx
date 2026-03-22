'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'

const PRODUCTS = [
  {
    label: 'Hero Product',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: 'GTM & Sales Automation',
    tagline: 'From ICP to booked meeting. We handle the rest.',
    description: 'We define your ideal customer, source 97% accurate contact data, and launch coordinated multi-channel sequences across email, LinkedIn, and WhatsApp. Qualified meetings arrive in your calendar.',
    points: [
      '97% verified contact data — emails, phones, LinkedIn',
      'Email, LinkedIn, and WhatsApp sequences in sync',
      'Guaranteed inbox deliverability — domains warmed',
      '2-week free pilot before any commitment',
    ],
    href: '/gtm-systems',
    cta: 'Start Free Pilot',
    accent: 'text-brand-cta',
    border: 'border-brand-cta/30 hover:border-brand-cta/60',
    bg: 'bg-brand-cta/5',
    labelColor: 'text-brand-cta bg-brand-cta/10 border-brand-cta/20',
  },
  {
    label: 'Hero Product',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Digital Marketing Automation',
    tagline: 'SEO, content, ads, and social. Running without a team.',
    description: 'We build your entire digital marketing engine on AI. Content published weekly, social media scheduled automatically, ad performance monitored and adjusted, analytics reported monthly.',
    points: [
      'SEO-optimised content published on schedule',
      'Social media automated across all channels',
      'Paid ad monitoring and budget optimisation',
      'Monthly performance reports generated automatically',
    ],
    href: '/services',
    cta: 'See How It Works',
    accent: 'text-brand-accent',
    border: 'border-brand-accent/30 hover:border-brand-accent/60',
    bg: 'bg-brand-accent/5',
    labelColor: 'text-brand-accent bg-brand-accent/10 border-brand-accent/20',
  },
  {
    label: 'Platform',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="6" height="6" rx="1" /><rect x="16" y="3" width="6" height="6" rx="1" />
        <rect x="9" y="10" width="6" height="6" rx="1" /><rect x="2" y="17" width="6" height="4" rx="1" />
        <rect x="16" y="17" width="6" height="4" rx="1" />
        <line x1="5" y1="9" x2="12" y2="13" /><line x1="19" y1="9" x2="12" y2="13" />
        <line x1="8" y1="19" x2="12" y2="16" /><line x1="16" y1="19" x2="12" y2="16" />
      </svg>
    ),
    title: 'AI Departments',
    tagline: 'Every business function running on coordinated AI.',
    description: 'For businesses ready to automate entire departments. A Master Agent coordinates specialised Sub Agents across sales, marketing, operations, finance, and HR. Built on your existing tools.',
    points: [
      'Master Agent coordinating department-wide execution',
      'Sub Agents for every function: sales, ops, finance, HR',
      'Connects to your existing tools — no rip and replace',
      'Replaces repetitive headcount, not strategic thinking',
    ],
    href: '/ai-departments',
    cta: 'Explore AI Departments',
    accent: 'text-white/80',
    border: 'border-white/15 hover:border-white/30',
    bg: 'bg-white/3',
    labelColor: 'text-white/60 bg-white/8 border-white/15',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function ProductsSection() {
  return (
    <SectionContainer id="products" className="bg-brand-bg">
      <motion.div {...fadeUp()} className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-cta mb-3">What We Build</p>
        <h2 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight">
          Three products. One outcome: growth without headcount.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.title}
            {...fadeUp(i * 0.08)}
            className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-200 ${p.border} ${p.bg}`}
          >
            <div className="flex items-start justify-between mb-5">
              <div className={`p-2.5 rounded-lg border ${p.labelColor}`}>
                {p.icon}
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${p.labelColor}`}>
                {p.label}
              </span>
            </div>

            <h3 className="text-xl font-bold text-brand-text mb-1">{p.title}</h3>
            <p className={`text-sm font-medium mb-4 ${p.accent}`}>{p.tagline}</p>
            <p className="text-sm text-brand-text/55 leading-relaxed mb-6">{p.description}</p>

            <ul className="space-y-2.5 mb-8">
              {p.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-brand-text/70">
                  <svg className={`mt-0.5 flex-shrink-0 ${p.accent}`} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {pt}
                </li>
              ))}
            </ul>

            <Link
              href={p.href}
              className={`mt-auto inline-flex items-center gap-1.5 text-sm font-semibold ${p.accent} hover:gap-3 transition-all duration-200`}
            >
              {p.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M7.5 3.5L11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}
