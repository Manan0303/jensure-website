import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import TrustBar from '@/components/sections/TrustBar'
import ProductsSection from '@/components/sections/ProductsSection'
import BeforeAfterSection from '@/components/sections/BeforeAfterSection'
import WhiteLabelSection from '@/components/sections/WhiteLabelSection'
import AutomationDiscoverySection from '@/components/sections/AutomationDiscoverySection'
import CaseStudyPreviewSection from '@/components/sections/CaseStudyPreviewSection'
import FinalCTASection from '@/components/sections/FinalCTASection'

export const metadata: Metadata = {
  title: 'AI GTM & Sales Automation | AI Departments for Business | Jensure',
  description: 'Jensure runs your GTM, sales outreach, and digital marketing on AI. 97% accurate prospect data. Multi-channel outreach. Guaranteed deliverability. White-label available. 2-week free pilot.',
  openGraph: {
    title: 'AI GTM & Sales Automation | AI Departments for Business | Jensure',
    description: 'Jensure runs your GTM, sales outreach, and digital marketing on AI. Qualified meetings. 97% accurate data. Guaranteed deliverability. 2-week free pilot.',
    url: 'https://www.jensure.com',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Jensure AI GTM and Sales Automation' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI GTM & Sales Automation | Jensure',
    description: 'GTM, sales outreach, and digital marketing on AI. 97% accurate data. 2-week free pilot.',
  },
  alternates: { canonical: 'https://www.jensure.com' }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProductsSection />
      <BeforeAfterSection />
      <WhiteLabelSection />
      <AutomationDiscoverySection />
      <CaseStudyPreviewSection />
      <FinalCTASection />
    </>
  )
}
