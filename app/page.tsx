import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import ProductsSection from '@/components/sections/ProductsSection'
import GTMWorkflowSection from '@/components/sections/GTMWorkflowSection'
import BeforeAfterSection from '@/components/sections/BeforeAfterSection'
import CaseStudyPreviewSection from '@/components/sections/CaseStudyPreviewSection'
import FinalCTASection from '@/components/sections/FinalCTASection'

export const metadata: Metadata = {
  title: 'AI GTM & Sales Automation | AI Departments for Business | Jensure',
  description: 'Jensure pairs dedicated specialists with AI to run your GTM, sales outreach, and digital marketing. 97% accurate prospect data. Multi-channel outreach. Guaranteed deliverability. 2-week free pilot.',
  openGraph: {
    title: 'AI GTM & Sales Automation | AI Departments for Business | Jensure',
    description: 'Human specialists and AI systems working together to run your GTM, sales, and marketing. Qualified meetings. 97% accurate data. 2-week free pilot.',
    url: 'https://www.jensure.com',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Jensure AI GTM and Sales Automation' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI GTM & Sales Automation | Jensure',
    description: 'GTM, sales outreach, and digital marketing. Human + AI. 2-week free pilot.',
  },
  alternates: { canonical: 'https://www.jensure.com' }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <GTMWorkflowSection />
      <BeforeAfterSection />
      <CaseStudyPreviewSection />
      <FinalCTASection />
    </>
  )
}
