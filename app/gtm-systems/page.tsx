import type { Metadata } from 'next'
import SectionContainer from '@/components/layout/SectionContainer'
import AgentDiagram from '@/components/ui/AgentDiagram'
import CTAButton from '@/components/ui/CTAButton'
import { GTM_COMPONENTS, AI_DEPARTMENTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'GTM Systems',
  description: 'Automated go-to-market systems from Jensure. Generate and manage leads across email, LinkedIn, and CRM without manual effort.',
  openGraph: {
    title: 'GTM Systems | Jensure',
    description: 'Automated go-to-market systems that generate and manage your pipeline without a team.',
    url: 'https://jensure.com/gtm-systems'
  }
}

const USE_CASES = [
  { industry: 'SaaS', description: 'ICP accounts identified, contacts enriched, personalized email sequences sent, demo calls booked — sales team receives qualified meetings only.' },
  { industry: 'Marketing Agency', description: 'LinkedIn outreach to CMOs, case study sequences, automated follow-ups, discovery calls booked directly to the founder\'s calendar.' },
  { industry: 'Ecommerce Brand', description: 'Affiliate and wholesale partner outreach automated — identify prospects, send outreach, track responses, book calls without manual input.' }
]

export default function GTMSystemsPage() {
  const marketingDept = AI_DEPARTMENTS[0]

  // GTM-specific sub agents
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
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">GTM Systems</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-black tracking-tight mb-5 max-w-3xl">
            Automated go-to-market systems.
          </h1>
          <p className="text-lg text-brand-gray-dark max-w-2xl leading-relaxed">
            GTM Systems generate and manage leads across every channel — without a team manually running outreach. Your pipeline fills itself.
          </p>
        </div>
      </section>

      {/* What are GTM Systems */}
      <SectionContainer className="bg-brand-off-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-brand-black tracking-tight mb-5">What GTM Systems do</h2>
            <p className="text-brand-gray-dark leading-relaxed mb-6">
              A GTM System is a connected set of AI agents that identifies, enriches, contacts, and follows up with potential customers automatically. It runs within your AI Marketing Department, coordinated by the CMO Agent.
            </p>
            <p className="text-brand-gray-dark leading-relaxed">
              The system maintains a consistent pipeline of opportunities — measurable at every stage — without requiring a full-time sales or marketing team to operate it.
            </p>
          </div>
          <div className="bg-white border border-brand-gray-light rounded-xl p-6">
            <h3 className="text-sm font-semibold text-brand-black mb-4">Pipeline stages automated</h3>
            <ol className="space-y-3">
              {['Identify target accounts', 'Enrich contact data', 'Send personalized outreach', 'Follow up automatically', 'Book meetings on response', 'Report pipeline metrics'].map((step, i) => (
                <li key={step} className="flex items-center gap-3 text-sm text-brand-gray-dark">
                  <span className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </SectionContainer>

      {/* Agent Diagram */}
      <SectionContainer className="bg-white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-black tracking-tight">The GTM agent structure</h2>
        </div>
        <AgentDiagram
          masterAgent={marketingDept.masterAgent}
          subAgents={gtmSubAgents}
        />
      </SectionContainer>

      {/* Components */}
      <SectionContainer className="bg-brand-off-white">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-brand-black tracking-tight mb-2">System components</h2>
          <p className="text-brand-gray-dark">Each component runs independently and connects to the next stage of your pipeline.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GTM_COMPONENTS.map((c) => (
            <div key={c.id} className="bg-white border border-brand-gray-light rounded-xl p-5 flex flex-col gap-2">
              <div className="text-xl">{c.icon}</div>
              <h3 className="text-sm font-semibold text-brand-black">{c.title}</h3>
              <p className="text-xs text-brand-gray leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Use Cases */}
      <SectionContainer className="bg-white">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-brand-black tracking-tight">Use cases</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USE_CASES.map(({ industry, description }) => (
            <div key={industry} className="border border-brand-gray-light rounded-xl p-6">
              <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">{industry}</span>
              <p className="mt-3 text-sm text-brand-gray-dark leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-black">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Build your GTM System.</h2>
          <p className="text-gray-400 mb-8">Book a free audit and we will design a GTM System matched to your target market and existing tools.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
