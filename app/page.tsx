import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import WhatIsJensure from '@/components/sections/WhatIsJensure'
import AIDepartmentsSection from '@/components/sections/AIDepartmentsSection'
import GTMSystemsSection from '@/components/sections/GTMSystemsSection'
import AutomationDiscoverySection from '@/components/sections/AutomationDiscoverySection'
import BeforeAfterSection from '@/components/sections/BeforeAfterSection'
import CaseStudyPreviewSection from '@/components/sections/CaseStudyPreviewSection'
import FinalCTASection from '@/components/sections/FinalCTASection'

export const metadata: Metadata = {
  title: 'AI Automation Orchestration | Build AI Departments for Business | Jensure',
  description: 'Jensure builds AI Departments: coordinated agent systems that automate your marketing, sales, operations, finance, and HR. Starting from $100. 10+ industries.',
  openGraph: {
    title: 'AI Automation Orchestration | Build AI Departments for Business | Jensure',
    description: 'Jensure builds AI Departments that replace repetitive work with AI agents running 24/7 across marketing, sales, operations, and finance.',
    url: 'https://www.jensure.com',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Jensure AI Departments' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation Orchestration | Jensure',
    description: 'Build AI Departments that automate your business operations. Starting from $100.',
  },
  alternates: { canonical: 'https://www.jensure.com' }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsJensure />
      <BeforeAfterSection />
      <AIDepartmentsSection />
      <GTMSystemsSection />
      <AutomationDiscoverySection />
      <CaseStudyPreviewSection />
      <FinalCTASection />
    </>
  )
}
