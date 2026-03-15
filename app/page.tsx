import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import WhatIsJensure from '@/components/sections/WhatIsJensure'
import AIDepartmentsSection from '@/components/sections/AIDepartmentsSection'
import GTMSystemsSection from '@/components/sections/GTMSystemsSection'
import AutomationCategoriesSection from '@/components/sections/AutomationCategoriesSection'
import IndustriesSection from '@/components/sections/IndustriesSection'
import AutomationDiscoverySection from '@/components/sections/AutomationDiscoverySection'
import BeforeAfterSection from '@/components/sections/BeforeAfterSection'
import CaseStudyPreviewSection from '@/components/sections/CaseStudyPreviewSection'
import FinalCTASection from '@/components/sections/FinalCTASection'

export const metadata: Metadata = {
  title: 'Jensure — AI Operational Infrastructure',
  description: 'Jensure builds AI Departments that automate business operations. Replace repetitive work with intelligent agent systems that run your marketing, sales, finance, and operations.',
  openGraph: {
    title: 'Jensure — AI Operational Infrastructure',
    description: 'Jensure builds AI Departments that automate business operations. Replace repetitive work with intelligent agent systems.',
    url: 'https://jensure.com',
    type: 'website'
  }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsJensure />
      <AIDepartmentsSection />
      <BeforeAfterSection />
      <GTMSystemsSection />
      <AutomationCategoriesSection />
      <IndustriesSection />
      <AutomationDiscoverySection />
      <CaseStudyPreviewSection />
      <FinalCTASection />
    </>
  )
}
