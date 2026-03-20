import type { Metadata } from 'next'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'

export const metadata: Metadata = {
  title: 'AI Agents for Business | What They Are and How They Work | Jensure',
  description: 'AI agents are autonomous software systems that execute business tasks without human instruction. Learn how AI agents work, the difference from chatbots, and how to deploy them.',
  openGraph: {
    title: 'AI Agents for Business | Jensure',
    description: 'Learn how AI agents automate business operations from lead generation to reporting to customer communication.',
    url: 'https://www.jensure.com/ai-agents',
  },
  alternates: { canonical: 'https://www.jensure.com/ai-agents' }
}

const AGENT_TYPES = [
  { name: 'Outreach Agent', role: 'Sales', description: 'Identifies prospects, enriches contact data, sends personalised multi-channel sequences, and books meetings without human input per lead.' },
  { name: 'Reporting Agent', role: 'Operations', description: 'Pulls data from connected systems on a schedule, formats it into structured reports, and distributes to stakeholders automatically.' },
  { name: 'Content Agent', role: 'Marketing', description: 'Takes a brief, researches keywords, drafts content, applies SEO optimisation, and schedules for publication.' },
  { name: 'Document Agent', role: 'Operations', description: 'Reads incoming documents, extracts structured data, validates it, and writes it directly to target systems.' },
  { name: 'Follow-up Agent', role: 'Sales', description: 'Monitors lead status across CRM and communication channels, triggers follow-up messages at the right intervals.' },
  { name: 'Analytics Agent', role: 'Marketing', description: 'Aggregates performance data across campaigns and channels, generates weekly summaries with insights.' },
]

const FAQS = [
  { q: 'What is an AI agent?', a: 'An AI agent is an autonomous software system that executes a defined process when triggered by a condition without requiring a human to initiate each action. Unlike a chatbot, an AI agent acts proactively.' },
  { q: 'How are AI agents different from chatbots?', a: 'A chatbot responds to prompts. An AI agent executes tasks. If a lead has not responded in three days, an AI agent sends a follow-up automatically. A chatbot waits to be asked.' },
  { q: 'What tasks can AI agents perform?', a: 'AI agents can perform any task that follows a predictable pattern: outreach, data entry, report generation, document processing, scheduling, content creation, and more.' },
  { q: 'How do AI agents coordinate with each other?', a: 'In a Jensure AI Department, a Master Agent coordinates multiple Sub Agents. Each Sub Agent handles a specific task. The Master Agent sequences them, passes context, and handles exceptions.' },
  { q: 'What is a Master Agent?', a: 'A Master Agent is the department-level AI that manages the overall workflow. It activates Sub Agents in the right order, monitors outcomes, and reports results like a department head.' },
  { q: 'How long does it take to deploy an AI agent?', a: 'A targeted single-purpose agent typically takes 1–2 weeks to deploy. A full AI Department takes 3–6 weeks depending on the number of integrations and workflow complexity.' },
]

export default function AIAgentsPage() {
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
            <span className="text-brand-cta">AI Agents</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">AI Agents for Business</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            What are AI agents and what can they do for your business?
          </h1>
          <p className="text-lg text-brand-text/60 max-w-2xl leading-relaxed mb-8">
            AI agents are autonomous software systems that execute business tasks without waiting for human instruction. They are triggered by conditions, run defined processes, and produce outputs continuously, without breaks.
          </p>
          <CTAButton href="/book-a-call" variant="primary">Get AI Agents Built for Your Business</CTAButton>
        </div>
      </section>

      {/* What is an AI agent */}
      <SectionContainer className="bg-brand-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-text mb-6">The difference between a tool and an agent</h2>
          <p className="text-brand-text/65 leading-relaxed mb-4">A tool requires a human to use it. An agent acts on its own.</p>
          <p className="text-brand-text/65 leading-relaxed mb-4">When a lead enters your CRM, an AI outreach agent does not wait for a sales rep to notice. It enriches the lead data, generates a personalised message, sends it via the right channel, and schedules follow-ups all within minutes of the lead arriving.</p>
          <p className="text-brand-text/65 leading-relaxed mb-6">This is not automation in the traditional sense. Traditional automation follows rigid if-then rules. AI agents understand context, adapt their outputs to specific inputs, and handle variation the way a trained employee would but at machine speed and without limits.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-5">
              <p className="text-sm font-semibold text-red-400 mb-3">Tool / Chatbot</p>
              <ul className="space-y-2 text-sm text-brand-text/55">
                <li>• Waits for human input</li>
                <li>• Responds to prompts</li>
                <li>• One interaction at a time</li>
                <li>• Requires someone to operate it</li>
              </ul>
            </div>
            <div className="bg-brand-cta/5 border border-brand-cta/15 rounded-xl p-5">
              <p className="text-sm font-semibold text-brand-cta mb-3">AI Agent</p>
              <ul className="space-y-2 text-sm text-brand-text/55">
                <li>• Triggered by conditions, not prompts</li>
                <li>• Executes complete workflows</li>
                <li>• Runs for all leads simultaneously</li>
                <li>• Operates without human involvement</li>
              </ul>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Agent types */}
      <SectionContainer className="bg-brand-bg">
        <h2 className="text-3xl font-bold text-brand-text mb-3">Types of AI agents Jensure deploys</h2>
        <p className="text-brand-text/55 mb-10 max-w-2xl">Each agent is built for a specific function. In an AI Department, multiple agents work under a Master Agent that coordinates the full workflow.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENT_TYPES.map((agent) => (
            <div key={agent.name} className="bg-brand-surface border border-white/8 rounded-xl p-6 hover:border-brand-accent/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-brand-text">{agent.name}</h3>
                <span className="text-xs bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-full">{agent.role}</span>
              </div>
              <p className="text-sm text-brand-text/55 leading-relaxed">{agent.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* FAQ */}
      <SectionContainer className="bg-brand-surface">
        <h2 className="text-3xl font-bold text-brand-text mb-10">Frequently asked questions about AI agents</h2>
        <div className="max-w-3xl space-y-6">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="border-b border-white/8 pb-6 last:border-0">
              <h3 className="font-semibold text-brand-text mb-2">{q}</h3>
              <p className="text-sm text-brand-text/60 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-surface-2">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-text mb-4">Ready to deploy AI agents in your business?</h2>
          <p className="text-brand-text/60 mb-8">Book a free audit. We identify which processes to automate first and propose the right agent architecture for your operations.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Free Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
