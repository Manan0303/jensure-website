import type { Metadata } from 'next'
import SectionContainer from '@/components/layout/SectionContainer'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Jensure',
  description: 'Terms and conditions governing the use of Jensure services, including AI automation builds, AI Departments, and the 2-week free trial offer.',
}

const SECTIONS = [
  {
    title: '1. Agreement to Terms',
    body: `By engaging Jensure for any service, including automation builds, AI Department deployments, or discovery audits, you agree to these Terms and Conditions. These terms apply to all clients, visitors, and users of jensure.com and its associated services.`
  },
  {
    title: '2. Services Provided',
    body: `Jensure provides AI automation systems, AI Department builds, and workflow automation consulting services. The scope of each engagement is defined in a written proposal or service agreement issued before work begins. Services may include, but are not limited to: automated outreach systems, reporting pipelines, CRM integrations, multi-channel automation, and custom AI agent deployments.`
  },
  {
    title: '3. Free Trial Terms',
    body: `Jensure offers a 2-week free trial on eligible automation builds. During this period, the system is deployed and operational at no charge. At the end of the trial period, you may choose to continue the service by making payment, or discontinue with no obligation. Jensure reserves the right to determine which services qualify for the free trial. The free trial applies to new engagements only and cannot be combined with other promotions.`
  },
  {
    title: '4. Payment and Pricing',
    body: `Pricing is outlined in your individual proposal. Targeted automations are typically priced as one-time builds starting from $100. AI Department builds are offered as monthly engagements starting from $1,500 per month. Payment terms are specified in the proposal or service agreement. Jensure reserves the right to update pricing for new engagements with notice.`
  },
  {
    title: '5. Client Responsibilities',
    body: `Clients are responsible for providing accurate information about their operations, tools, and requirements. Access to third-party platforms (CRMs, email accounts, LinkedIn, databases) needed for automation must be provided in a timely manner. Delays in providing access or information may affect delivery timelines.`
  },
  {
    title: '6. Intellectual Property',
    body: `All automation systems, workflows, and agent configurations built by Jensure and fully paid for by the client become the client's property upon final payment. Jensure retains the right to use methodologies, frameworks, and general approaches developed during engagements for other clients, without sharing proprietary client data or configurations.`
  },
  {
    title: '7. Data and Confidentiality',
    body: `Jensure treats all client business information, operational data, and system configurations as confidential. We do not share client data with third parties except where required to deliver the agreed service (for example, connecting to a third-party API). Clients should not share login credentials that provide access beyond what is required for the automation build.`
  },
  {
    title: '8. Limitation of Liability',
    body: `Jensure builds automation systems in good faith based on information provided by the client. We are not liable for outcomes resulting from inaccurate data, third-party platform changes, API deprecations, or client actions taken outside the agreed system design. Our liability is limited to the amount paid for the specific service in question.`
  },
  {
    title: '9. Termination',
    body: `Either party may terminate a monthly engagement with 14 days written notice. One-time builds are non-refundable once work has commenced. If Jensure determines that a client is using the service in a manner that violates these terms or applicable law, Jensure may terminate the engagement immediately.`
  },
  {
    title: '10. Changes to Terms',
    body: `Jensure reserves the right to update these Terms and Conditions at any time. Continued use of services after changes are posted constitutes acceptance of the updated terms. Material changes will be communicated directly to active clients.`
  },
  {
    title: '11. Governing Law',
    body: `These terms are governed by applicable law. Any disputes will first be attempted to be resolved through good-faith discussion. For inquiries or disputes, contact us at info@jensure.com.`
  },
  {
    title: '12. Contact',
    body: `For questions about these Terms and Conditions, reach us at info@jensure.com. We typically respond within one business day.`
  },
]

export default function TermsPage() {
  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 lg:px-16 bg-brand-bg border-b border-white/8">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight mb-4">Terms and Conditions</h1>
          <p className="text-brand-text/55 text-sm">Last updated: March 2026</p>
        </div>
      </section>

      <SectionContainer className="bg-brand-surface">
        <div className="max-w-3xl mx-auto space-y-10">
          {SECTIONS.map(({ title, body }) => (
            <div key={title} className="border-b border-white/8 pb-10 last:border-0">
              <h2 className="text-lg font-semibold text-brand-text mb-3">{title}</h2>
              <p className="text-sm text-brand-text/60 leading-relaxed">{body}</p>
            </div>
          ))}

          <div className="pt-4">
            <p className="text-xs text-brand-text/30">
              Questions? Email us at{' '}
              <a href="mailto:info@jensure.com" className="text-brand-cta hover:opacity-80">info@jensure.com</a>
            </p>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
