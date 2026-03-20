import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Jensure | AI Automation Orchestration for Business Operations',
  description: 'Jensure builds AI Departments that automate business operations. Learn about our mission, approach, and the team behind the platform.',
  openGraph: {
    title: 'About Jensure | AI Automation Orchestration',
    description: 'We build AI Departments — coordinated agent systems that automate your entire business operations.',
    url: 'https://www.jensure.com/about',
  },
  alternates: { canonical: 'https://www.jensure.com/about' }
}

export default function AboutPage() {
  return <AboutContent />
}
