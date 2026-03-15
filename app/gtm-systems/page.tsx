'use client'

import { motion } from 'framer-motion'
import AgentDiagram from '@/components/ui/AgentDiagram'
import CTAButton from '@/components/ui/CTAButton'
import { GTM_COMPONENTS, AI_DEPARTMENTS } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
})

const USE_CASES = [
  { industry: 'SaaS', description: 'ICP accounts identified, contacts enriched, personalized email sequences sent, demo calls booked — sales team receives qualified meetings only.' },
  { industry: 'Marketing Agency', description: 'LinkedIn outreach to CMOs, case study sequences, automated follow-ups, discovery calls booked directly to the founder\'s calendar.' },
  { industry: 'Ecommerce Brand', description: 'Affiliate and wholesale partner outreach automated — identify prospects, send outreach, track responses, book calls without manual input.' }
]

const CHANNELS = [
  { name: 'Email', icon: '📧', color: '#3D5AFE', desc: 'Personalized sequences with behavioral triggers' },
  { name: 'LinkedIn', icon: '🔗', color: '#0077B5', desc: 'Connection + message campaigns at scale' },
  { name: 'SMS / WhatsApp', icon: '💬', color: '#00E5CC', desc: 'High-intent follow-up via direct message' },
  { name: 'Cold Call Scheduling', icon: '📞', color: '#6B85FF', desc: 'Auto-scheduled calls from warm sequences' },
  { name: 'Social DMs', icon: '📲', color: '#FF6B6B', desc: 'Targeted outreach via Instagram and X/Twitter' }
]

const PIPELINE_STAGES = [
  'Identify target accounts',
  'Enrich contact data',
  'Determine best channel per lead',
  'Send personalized outreach',
  'Follow up automatically',
  'Route hot leads to sales',
  'Book meetings on response',
  'Report pipeline metrics'
]

export default function GTMSystemsPage() {
  const marketingDept = AI_DEPARTMENTS[0]

  const gtmSubAgents = [
    { name: 'Lead Generation Agent', description: 'Identifies and captures leads from inbound and intent signals.' },
    { name: 'Email Outreach Agent', description: 'Sends personalized sequences with automated follow-up logic.' },
    { name: 'LinkedIn Agent', description: 'Manages LinkedIn outreach and follow-ups at scale.' },
    { name: 'Lead Enrichment Agent', description: 'Appends company, role, and contact data to every lead.' },
    { name: 'Meeting Scheduling Agent', description: 'Books meetings directly from outreach sequences.' },
    { name: 'Analytics Agent', description: 'Tracks pipeline metrics and campaign performance.' }
  ]

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 70% 30%, rgba(0,229,204,0.15) 0%, transparent 50%), radial-gradient(circle at 10% 60%, rgba(61,90,254,0.15) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p {...fadeUp(0)} className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">GTM Systems</motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            Automated go-to-market systems.
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-lg text-brand-text/60 max-w-2xl leading-relaxed">
            GTM Systems generate and manage leads across every channel — without a team manually running outreach. Your pipeline fills itself.
          </motion.p>
        </div>
      </section>

      {/* What GTM Systems do */}
      <section className="bg-brand-surface px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp()}>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">What GTM Systems Do</p>
              <h2 className="text-3xl font-bold text-brand-text tracking-tight mb-5">Your pipeline runs itself.</h2>
              <p className="text-brand-text/60 leading-relaxed mb-6">
                A GTM System is a connected set of AI agents that identifies, enriches, contacts, and follows up with potential customers automatically. It runs within your AI Marketing Department, coordinated by the CMO Agent.
              </p>
              <p className="text-brand-text/60 leading-relaxed">
                The system maintains a consistent pipeline of opportunities — measurable at every stage — without requiring a full-time sales or marketing team to operate it.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.15)} className="bg-brand-surface-2 border border-white/10 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-brand-text mb-4">Pipeline stages automated</h3>
              <ol className="space-y-3">
                {PIPELINE_STAGES.map((step, i) => (
                  <li key={step} className="flex items-center gap-3 text-sm text-brand-text/70">
                    <span className="w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Multi-Channel Outreach Orchestration */}
      <section className="bg-brand-bg px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Multi-Channel Outreach Orchestration</p>
            <h2 className="text-4xl font-bold text-brand-text tracking-tight mb-4">
              One orchestrator. Every channel.
            </h2>
            <p className="text-brand-text/55 max-w-2xl mx-auto">
              The GTM Master Agent determines the best channel for each lead based on their profile and engagement. Outreach is coordinated across all channels without overlap or conflict.
            </p>
          </motion.div>

          {/* Orchestration diagram */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col items-center gap-8">
            {/* Central orchestrator */}
            <div className="bg-brand-surface-2 border-2 border-brand-accent/40 rounded-2xl px-8 py-5 text-center shadow-glow-accent max-w-sm w-full">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-1">GTM Master Agent</div>
              <div className="font-bold text-brand-text text-lg">Outreach Orchestrator</div>
              <div className="text-xs text-brand-text/50 mt-1">Selects channel · Times messages · Tracks responses · Escalates to sales</div>
            </div>

            {/* Connection line */}
            <div className="relative w-full max-w-4xl flex justify-center">
              <div className="w-px h-6 bg-brand-accent/30" />
              <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
            </div>

            {/* Channel cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-4xl">
              {CHANNELS.map((ch, i) => (
                <motion.div
                  key={ch.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-brand-surface border border-white/10 rounded-xl p-4 text-center hover:border-white/20 transition-colors"
                >
                  <div className="text-2xl mb-2">{ch.icon}</div>
                  <div className="text-sm font-semibold text-brand-text mb-1">{ch.name}</div>
                  <div className="text-xs text-brand-text/45 leading-snug">{ch.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Result */}
            <div className="w-full max-w-4xl flex justify-center">
              <div className="w-px h-6 bg-brand-cta/30" />
            </div>
            <div className="bg-brand-surface-2 border border-brand-cta/30 rounded-xl px-8 py-4 text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-1">Outcome</div>
              <div className="font-bold text-brand-text">Qualified meetings booked into your calendar</div>
              <div className="text-xs text-brand-text/50 mt-1">No manual outreach. No missed follow-ups. Consistent pipeline.</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agent Diagram */}
      <section className="bg-brand-surface px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Agent Structure</p>
            <h2 className="text-3xl font-bold text-brand-text tracking-tight">The GTM agent architecture</h2>
          </motion.div>
          <AgentDiagram
            masterAgent={marketingDept.masterAgent}
            subAgents={gtmSubAgents}
          />
        </div>
      </section>

      {/* Components */}
      <section className="bg-brand-bg px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-2">System Components</p>
            <h2 className="text-3xl font-bold text-brand-text tracking-tight mb-2">Each component runs independently.</h2>
            <p className="text-brand-text/55">Connects to the next stage of your pipeline automatically.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GTM_COMPONENTS.map((c, i) => (
              <motion.div
                key={c.id}
                {...fadeUp(i * 0.06)}
                className="bg-brand-surface border border-white/8 rounded-xl p-5 flex flex-col gap-2 hover:border-brand-accent/30 transition-colors"
              >
                <div className="text-xl">{c.icon}</div>
                <h3 className="text-sm font-semibold text-brand-text">{c.title}</h3>
                <p className="text-xs text-brand-text/50 leading-relaxed">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-brand-surface px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-2">Use Cases</p>
            <h2 className="text-3xl font-bold text-brand-text tracking-tight">Across industries.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {USE_CASES.map(({ industry, description }, i) => (
              <motion.div
                key={industry}
                {...fadeUp(i * 0.1)}
                className="border border-white/8 bg-brand-surface-2 rounded-xl p-6 hover:border-brand-cta/30 transition-colors"
              >
                <span className="text-xs font-semibold text-brand-cta uppercase tracking-wider">{industry}</span>
                <p className="mt-3 text-sm text-brand-text/60 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-surface-2 relative overflow-hidden px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl bg-brand-cta" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-brand-text tracking-tight mb-4">Build your GTM System.</h2>
          <p className="text-brand-text/60 mb-8">Book a free audit and we will design a GTM System matched to your target market and existing tools.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </section>
    </>
  )
}
