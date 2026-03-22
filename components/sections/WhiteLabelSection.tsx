'use client'

import { motion } from 'framer-motion'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
})

const WHITELABEL_POINTS = [
  { title: 'Your brand, our execution', body: 'All deliverables, reports, outreach, content, go out under your agency name. Clients never know we exist.' },
  { title: 'Resellable at 2x margin', body: 'Priced to leave you 50-100% margin. Build a recurring revenue stream without building an operations team.' },
  { title: 'Client-ready reporting', body: 'Branded weekly and monthly reports delivered to you. Drop them straight into your client calls.' },
  { title: 'No conflict of interest', body: 'We will never go direct to your clients. Your relationships stay yours. We are strictly a fulfillment partner.' },
]

const DEDICATED_POINTS = [
  { title: 'One team, one account', body: 'A dedicated team assigned to your account only. They know your business, your ICP, your tone, and your goals.' },
  { title: 'Accountable for results, not activity', body: 'Your team is measured on pipeline and outcomes, not emails sent or connections made. If it is not working, we change it.' },
  { title: 'Human judgment on top of AI', body: 'AI does the execution. Your dedicated team owns the strategy, what to test, what to cut, what to scale.' },
  { title: 'Real people you can reach', body: 'Direct Slack or WhatsApp access. No ticket systems, no support queues. You talk to the people doing the work.' },
]

export default function WhiteLabelSection() {
  return (
    <SectionContainer id="whitelabel" className="bg-brand-surface">
      <motion.div {...fadeUp()} className="text-center mb-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-cta mb-3">For Agencies and Teams</p>
        <h2 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight max-w-3xl mx-auto">
          White-label our entire operation. Or get a dedicated team.
        </h2>
        <p className="mt-5 text-lg text-brand-text/55 max-w-2xl mx-auto">
          Whether you are an agency reselling GTM services or a business that wants real people accountable for results, we have a model that fits.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* White-label */}
        <motion.div
          {...fadeUp(0.08)}
          className="rounded-2xl border border-brand-accent/25 bg-brand-accent/5 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-brand-accent/15 border border-brand-accent/25 text-brand-accent">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text">White-Label Services</h3>
              <p className="text-sm text-brand-accent">For agencies and consultants</p>
            </div>
          </div>
          <ul className="space-y-5 mb-8">
            {WHITELABEL_POINTS.map((pt) => (
              <li key={pt.title}>
                <p className="text-sm font-semibold text-brand-text mb-0.5">{pt.title}</p>
                <p className="text-sm text-brand-text/55 leading-relaxed">{pt.body}</p>
              </li>
            ))}
          </ul>
          <CTAButton href="/book-a-call" variant="secondary">Enquire About White-Label</CTAButton>
        </motion.div>

        {/* Dedicated teams */}
        <motion.div
          {...fadeUp(0.16)}
          className="rounded-2xl border border-brand-cta/25 bg-brand-cta/5 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-brand-cta/15 border border-brand-cta/25 text-brand-cta">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text">Dedicated Teams</h3>
              <p className="text-sm text-brand-cta">For businesses that want accountability</p>
            </div>
          </div>
          <ul className="space-y-5 mb-8">
            {DEDICATED_POINTS.map((pt) => (
              <li key={pt.title}>
                <p className="text-sm font-semibold text-brand-text mb-0.5">{pt.title}</p>
                <p className="text-sm text-brand-text/55 leading-relaxed">{pt.body}</p>
              </li>
            ))}
          </ul>
          <CTAButton href="/book-a-call" variant="primary">Get a Dedicated Team</CTAButton>
        </motion.div>
      </div>
    </SectionContainer>
  )
}
