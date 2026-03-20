import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'

const FAQS = [
  { q: 'How much does AI automation cost?', a: 'Targeted workflow automations start from $100. Full AI Department builds covering an entire business function like sales, marketing, or operations start from $1,500/month. Every engagement begins with a 2-week free trial. You only pay if it delivers results.' },
  { q: 'How long does it take to deploy an AI Department?', a: 'A single targeted automation takes 1 to 3 weeks. A full AI Department covering multiple workflows takes 3 to 6 weeks depending on integrations and complexity.' },
  { q: 'What is the difference between Jensure and off-the-shelf automation tools?', a: 'Tools like Zapier and Make connect apps with simple if-then rules. Jensure builds complete operational systems with AI agents that handle variation, coordinate across channels, and run entire workflows end-to-end without human involvement.' },
  { q: 'Which business functions can be automated?', a: 'Marketing (content, SEO, social, ads), Sales (outreach, follow-ups, pipeline), Operations (reporting, data sync, document processing), Finance (invoicing, reconciliation), and HR (onboarding, communications).' },
  { q: 'Do I need technical knowledge to work with Jensure?', a: 'No. You describe your workflow in plain language. We handle the architecture, integration, and deployment. You receive a running system.' },
  { q: 'What results can I realistically expect?', a: 'Based on client deployments: reporting time reduced from hours to minutes, outreach volume increased 10x, admin time reduced by 70 to 80%, and teams refocused on strategic work within weeks of going live.' },
]

export default function HomepageFAQSection() {
  return (
    <SectionContainer id="faq" className="bg-brand-bg">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">FAQ</p>
          <h2 className="text-4xl font-bold text-brand-text tracking-tight">Questions about AI automation.</h2>
        </div>
        <div className="space-y-6">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="border-b border-white/8 pb-6 last:border-0">
              <h3 className="font-semibold text-brand-text mb-2">{q}</h3>
              <p className="text-sm text-brand-text/60 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <CTAButton href="/book-a-call" variant="primary">Book Free Automation Audit</CTAButton>
        </div>
      </div>
    </SectionContainer>
  )
}
