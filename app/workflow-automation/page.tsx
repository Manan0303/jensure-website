import type { Metadata } from 'next'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'

export const metadata: Metadata = {
  title: 'Workflow Automation for Business | AI-Powered Workflows | Jensure',
  description: 'Automate your business workflows with AI. From data entry to reporting to customer onboarding — Jensure builds workflow automation systems that run end-to-end without human input.',
  openGraph: {
    title: 'Workflow Automation for Business | Jensure',
    description: 'AI-powered workflow automation for reporting, onboarding, data sync, invoicing, and more.',
    url: 'https://www.jensure.com/workflow-automation',
  },
  alternates: { canonical: 'https://www.jensure.com/workflow-automation' }
}

const WORKFLOWS = [
  { title: 'Automated Reporting', description: 'Pull data from CRM, ERP, and analytics tools on a schedule. Format into your report template. Distribute to stakeholders automatically. No manual compilation.', timeSaved: '6 hrs/week' },
  { title: 'Lead Follow-up Sequences', description: 'When a lead enters your CRM, trigger a defined sequence of messages across email, LinkedIn, and WhatsApp. Pause on reply. Resume if no response.', timeSaved: '8 hrs/week' },
  { title: 'Customer Onboarding', description: 'Every new customer receives the right communications at the right time. Welcome, setup instructions, check-ins, re-engagement — all triggered by data signals.', timeSaved: '5 hrs/week' },
  { title: 'Invoice Generation', description: 'When a project milestone is hit, invoice generated from template, populated with correct data, sent to client. Payment reminders triggered automatically past due date.', timeSaved: '4 hrs/week' },
  { title: 'Data Synchronisation', description: 'Keep records consistent across CRM, accounting tools, project management, and databases in real time. No manual copy-paste, no discrepancies.', timeSaved: '5 hrs/week' },
  { title: 'Document Processing', description: 'Contracts, intake forms, invoices, applications — extract structured data automatically. Validate against expected formats. Write directly to target systems.', timeSaved: '7 hrs/week' },
  { title: 'Meeting Summaries', description: 'Every meeting recorded, transcribed, summarised, and distributed within minutes of ending. Action items extracted and created as tasks in your project tool.', timeSaved: '3 hrs/week' },
  { title: 'Content Production Pipeline', description: 'Topic brief to published post — research, draft, SEO optimisation, formatting, and scheduling handled by AI agents. Content production without a content team.', timeSaved: '10 hrs/week' },
]

const FAQS = [
  { q: 'What is workflow automation?', a: 'Workflow automation replaces the manual steps in a recurring business process with an automated system that runs from trigger to output without human input.' },
  { q: 'How is AI workflow automation different from traditional automation?', a: 'Traditional automation follows fixed rules and breaks when inputs vary. AI workflow automation handles variation — reading unstructured data, adapting messages to specific contexts, and making decisions based on conditions.' },
  { q: 'What is the first workflow I should automate?', a: 'The one with the highest weekly time cost and the most predictable pattern. Reporting and lead follow-ups are typically the fastest wins with the clearest ROI.' },
  { q: 'How long does it take to build a workflow automation?', a: 'A single targeted workflow takes 1–3 weeks. A complete AI Department covering multiple workflows takes 3–6 weeks.' },
  { q: 'What tools and systems can you integrate?', a: 'We integrate with any system that has an API or export capability — CRMs (Salesforce, HubSpot, Pipedrive), ERPs, accounting tools (Xero, QuickBooks), project management (Asana, Monday, Notion), email (Gmail, Outlook), and more.' },
  { q: 'How much does workflow automation cost?', a: 'Targeted single-workflow automations start from $100. Full AI Department builds covering multiple workflows start from $1,500/month. Every engagement starts with a free audit.' },
]

export default function WorkflowAutomationPage() {
  return (
    <>
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 20% 40%, rgba(61,90,254,0.15) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs text-brand-text/40 mb-4">
            <Link href="/" className="hover:text-brand-text/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-cta">Workflow Automation</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Workflow Automation</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            Workflow automation that runs your business end-to-end.
          </h1>
          <p className="text-lg text-brand-text/60 max-w-2xl leading-relaxed mb-8">
            Every recurring process in your business that follows a pattern can be automated. Jensure builds the systems — from trigger to output — so they run without human involvement.
          </p>
          <CTAButton href="/book-a-call" variant="primary">Automate Your Workflows</CTAButton>
        </div>
      </section>

      {/* Workflows */}
      <SectionContainer className="bg-brand-surface">
        <h2 className="text-3xl font-bold text-brand-text mb-3">The workflows businesses automate first</h2>
        <p className="text-brand-text/55 mb-10 max-w-2xl">Ranked by time savings and implementation speed. Each workflow below is live in production at Jensure client businesses.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WORKFLOWS.map((w) => (
            <div key={w.title} className="bg-brand-surface-2 border border-white/8 rounded-xl p-6 hover:border-brand-accent/20 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-semibold text-brand-text">{w.title}</h3>
                <span className="text-xs bg-brand-cta/10 text-brand-cta px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">Saves {w.timeSaved}</span>
              </div>
              <p className="text-sm text-brand-text/55 leading-relaxed">{w.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* FAQ */}
      <SectionContainer className="bg-brand-bg">
        <h2 className="text-3xl font-bold text-brand-text mb-10">Workflow automation questions</h2>
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
          <h2 className="text-4xl font-bold text-brand-text mb-4">Start with a free workflow audit.</h2>
          <p className="text-brand-text/60 mb-8">We identify which of your workflows will deliver the most value when automated, and build them fast.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Free Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
