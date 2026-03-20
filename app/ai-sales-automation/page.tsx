import type { Metadata } from 'next'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'

export const metadata: Metadata = {
  title: 'AI Sales Automation | Automated Outreach, Follow-ups & Pipeline | Jensure',
  description: 'Automate your entire sales outreach with AI. Personalised email sequences, LinkedIn automation, WhatsApp follow-ups, and CRM sync all running without a sales team.',
  openGraph: {
    title: 'AI Sales Automation | Jensure',
    description: 'Deploy an AI sales agent that prospects, reaches out, and books meetings automatically across email, LinkedIn, and WhatsApp.',
    url: 'https://www.jensure.com/ai-sales-automation',
  },
  alternates: { canonical: 'https://www.jensure.com/ai-sales-automation' }
}

const WORKFLOW_STEPS = [
  { step: '01', title: 'Prospect identification', body: 'AI agent sources qualified leads from LinkedIn Sales Navigator, Apollo, intent data platforms, and company databases filtered against your ideal customer profile.' },
  { step: '02', title: 'Lead enrichment', body: 'Each lead is enriched with company size, revenue, tech stack, decision-maker contact details, and recent company activity in seconds.' },
  { step: '03', title: 'Personalised email sequence', body: 'First email drafted based on enrichment data. Follow-up sequence scheduled at optimal intervals. Messages pause automatically when a reply is received.' },
  { step: '04', title: 'LinkedIn outreach in parallel', body: 'Connection request sent with a personalised note. If accepted, message sequence begins. If no reply after 5 days, follow-up triggered.' },
  { step: '05', title: 'WhatsApp follow-up', body: 'When email and LinkedIn go unanswered past a set threshold, WhatsApp message triggered. Final touchpoint before the lead is paused.' },
  { step: '06', title: 'Meeting booked, CRM updated', body: 'When prospect responds positively, meeting link sent automatically. CRM updated with all interactions in real time. Pipeline always current.' },
]

const FAQS = [
  { q: 'What is AI sales automation?', a: 'AI sales automation uses intelligent agents to handle prospect research, outreach, follow-ups, and CRM management removing the manual effort from the top of the sales funnel.' },
  { q: 'Can AI really write personalised sales emails?', a: 'Yes. AI agents use enrichment data (company news, role, industry, tech stack) to write contextually relevant emails. The output is not generic it is specific to each prospect.' },
  { q: 'Does AI sales automation work for cold outreach?', a: 'It is most effective for cold outreach because it eliminates the consistency problem. Every prospect receives follow-ups on schedule. No lead goes cold due to a busy week.' },
  { q: 'What channels can be automated?', a: 'Email, LinkedIn (connection requests, messages, InMail), and WhatsApp. The AI Department coordinates all three so there are no conflicting messages.' },
  { q: 'Will prospects know it is automated?', a: 'Not if the system is built correctly. Messages are personalised per recipient using real data. The goal is personalisation at scale not generic blasting.' },
  { q: 'How is this different from tools like Instantly or Lemlist?', a: 'Tools like Instantly automate email sequences. Jensure builds a complete AI Sales Department including prospect sourcing, multi-channel coordination, CRM sync, and reporting as an integrated system, not a collection of separate tools.' },
]

export default function AISalesAutomationPage() {
  return (
    <>
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 20% 40%, rgba(0,229,204,0.12) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs text-brand-text/40 mb-4">
            <Link href="/" className="hover:text-brand-text/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-cta">AI Sales Automation</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">AI Sales Automation</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            Your entire sales outreach, automated across every channel.
          </h1>
          <p className="text-lg text-brand-text/60 max-w-2xl leading-relaxed mb-4">
            Jensure builds AI Sales Departments that prospect, enrich, reach out, and follow up across email, LinkedIn, and WhatsApp automatically, simultaneously, for every lead in your pipeline.
          </p>
          <p className="text-sm text-brand-text/40 mb-8">Your team focuses on closing. The AI handles everything before the call.</p>
          <CTAButton href="/book-a-call" variant="primary">Automate Your Sales Outreach</CTAButton>
        </div>
      </section>

      {/* How it works */}
      <SectionContainer className="bg-brand-surface">
        <h2 className="text-3xl font-bold text-brand-text mb-3">How the AI Sales Department works</h2>
        <p className="text-brand-text/55 mb-10 max-w-2xl">From first touchpoint to booked meeting every step automated.</p>
        <div className="space-y-6 max-w-3xl">
          {WORKFLOW_STEPS.map(({ step, title, body }) => (
            <div key={step} className="flex gap-6 items-start">
              <div className="text-3xl font-bold text-white/10 flex-shrink-0 w-12">{step}</div>
              <div className="bg-brand-surface-2 border border-white/8 rounded-xl p-5 flex-1 hover:border-brand-accent/20 transition-colors">
                <h3 className="font-semibold text-brand-text mb-2">{title}</h3>
                <p className="text-sm text-brand-text/55 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Before/After */}
      <SectionContainer className="bg-brand-bg">
        <h2 className="text-3xl font-bold text-brand-text mb-10">Sales team before and after automation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-6">
            <p className="text-sm font-semibold text-red-400 mb-4">Without AI Sales Automation</p>
            <ul className="space-y-3 text-sm text-brand-text/60">
              {['3+ hours/day on manual prospecting', '50–80 emails sent per week per rep', 'LinkedIn managed separately by hand', 'Follow-ups happen when someone remembers', 'CRM always behind on updates', 'Pipeline reports compiled manually every Friday'].map(item => (
                <li key={item} className="flex items-start gap-2"><span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-brand-cta/5 border border-brand-cta/15 rounded-xl p-6">
            <p className="text-sm font-semibold text-brand-cta mb-4">With Jensure AI Sales Department</p>
            <ul className="space-y-3 text-sm text-brand-text/60">
              {['500+ qualified leads identified daily automatically', '1,000+ personalised touchpoints per week', 'Email, LinkedIn, WhatsApp coordinated by one agent', 'Every lead followed up no exceptions', 'CRM updated in real time with zero manual entry', 'Pipeline report delivered Monday 8am automatically'].map(item => (
                <li key={item} className="flex items-start gap-2"><span className="text-brand-cta mt-0.5 flex-shrink-0">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>

      {/* FAQ */}
      <SectionContainer className="bg-brand-surface">
        <h2 className="text-3xl font-bold text-brand-text mb-10">Questions about AI sales automation</h2>
        <div className="max-w-3xl space-y-6">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="border-b border-white/8 pb-6 last:border-0">
              <h3 className="font-semibold text-brand-text mb-2">{q}</h3>
              <p className="text-sm text-brand-text/60 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="bg-brand-surface-2">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-text mb-4">Book a free sales automation audit.</h2>
          <p className="text-brand-text/60 mb-8">We map your current outreach process, identify where AI agents fit, and propose a build. No commitment required.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Free Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
