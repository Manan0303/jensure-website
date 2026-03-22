import type { Metadata } from 'next'
import SectionContainer from '@/components/layout/SectionContainer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Jensure',
  description: 'Privacy policy for Jensure. Learn how we collect, use, and protect your data when you use our AI automation services and website.',
  alternates: { canonical: 'https://www.jensure.com/privacy' }
}

const SECTIONS = [
  {
    title: '1. Who We Are',
    body: `Jensure is an AI automation company that builds AI Departments and workflow automation systems for businesses. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit jensure.com or engage with our services. Our contact email is info@jensure.com.`
  },
  {
    title: '2. Information We Collect',
    body: `We collect information you provide directly to us, including: your name, email address, company name, and any details you share when requesting an automation audit, submitting our Automation Discovery form, or contacting us by email. We also collect anonymised usage data through standard web analytics (page views, referral sources, session duration) to understand how visitors use our site. We do not collect payment information directly — any payment processing is handled by third-party providers.`
  },
  {
    title: '3. How We Use Your Information',
    body: `We use the information we collect to: respond to audit and service enquiries, calculate and return your automation opportunity estimate, communicate about proposals, project progress, and results, improve the content and performance of our website, and send relevant updates about Jensure services where you have indicated interest. We do not sell, rent, or share your personal information with third parties for marketing purposes.`
  },
  {
    title: '4. Automation Discovery Form',
    body: `When you submit the Automation Discovery form on our website, we store your inputs (industry, company size, task description, employee count, hours per week) and the calculated output. This data is used to understand the types of automation opportunities our visitors are exploring and to improve our service offering. It may also be referenced if you subsequently book an audit with us.`
  },
  {
    title: '5. Data Storage and Security',
    body: `Your data is stored securely on our servers. We use industry-standard security measures to protect against unauthorised access, disclosure, alteration, or destruction. Access to stored data is restricted to the Jensure team on a need-to-know basis. While no method of transmission over the internet is 100% secure, we take all reasonable steps to protect your personal information.`
  },
  {
    title: '6. Cookies and Analytics',
    body: `Our website may use cookies and similar tracking technologies to improve your browsing experience and collect anonymised usage data. Essential cookies are required for the site to function. Analytics cookies help us understand visitor behaviour in aggregate. You can disable cookies in your browser settings, though this may affect certain site functionality.`
  },
  {
    title: '7. Third-Party Services',
    body: `We use third-party services to operate our website and deliver our services, including hosting providers, database services, and email platforms. These providers are contractually required to handle your data in accordance with applicable data protection laws. We do not authorise them to use your data for their own purposes.`
  },
  {
    title: '8. Your Rights',
    body: `You have the right to access the personal information we hold about you, request correction of inaccurate data, request deletion of your data where we have no legitimate reason to retain it, and withdraw consent for us to contact you at any time. To exercise any of these rights, email us at info@jensure.com and we will respond within 5 business days.`
  },
  {
    title: '9. Data Retention',
    body: `We retain personal information for as long as necessary to deliver our services and meet our legal obligations. Enquiry and audit request data is retained for up to 2 years. You may request deletion of your data at any time by contacting us at info@jensure.com.`
  },
  {
    title: '10. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated policy on this page with a revised effective date. Continued use of our website or services after changes are posted constitutes acceptance of the updated policy.`
  },
  {
    title: '11. Contact',
    body: `If you have any questions about this Privacy Policy or how we handle your data, contact us at info@jensure.com. We are committed to handling your information with care and transparency.`
  },
]

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16"
        style={{ background: 'linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-brand-text/50 text-sm">Effective date: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <SectionContainer className="bg-brand-bg">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-text/60 leading-relaxed mb-12">
            Your privacy matters to us. This policy explains plainly what data we collect, why we collect it, and how it is handled. If anything is unclear, email us at{' '}
            <a href="mailto:info@jensure.com" className="text-brand-cta hover:opacity-80 transition-opacity">info@jensure.com</a>.
          </p>

          <div className="space-y-10">
            {SECTIONS.map(({ title, body }) => (
              <div key={title} className="border-t border-white/8 pt-8">
                <h2 className="text-lg font-semibold text-brand-text mb-3">{title}</h2>
                <p className="text-brand-text/60 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/8 text-center">
            <p className="text-sm text-brand-text/40">
              Questions? Email{' '}
              <a href="mailto:info@jensure.com" className="text-brand-cta hover:opacity-80 transition-opacity">info@jensure.com</a>
            </p>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
