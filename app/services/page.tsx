import type { Metadata } from 'next'
import ServicesContent from './ServicesContent'

export const metadata: Metadata = {
  title: 'AI Automation Services | AI Departments, Workflows & Agents | Jensure',
  description: 'Jensure builds AI Departments, GTM automation systems, and targeted workflow automations. Starting from $100. Built for your specific operations.',
  openGraph: {
    title: 'AI Automation Services | Jensure',
    description: 'AI Departments, GTM systems, and targeted automations starting from $100.',
    url: 'https://www.jensure.com/services',
  },
  alternates: { canonical: 'https://www.jensure.com/services' }
}

export default function ServicesPage() {
  return <ServicesContent />
}
