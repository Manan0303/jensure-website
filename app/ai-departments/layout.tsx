import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Departments',
  description: 'Jensure builds AI Departments with a Master Agent coordinating specialized Sub Agents that run marketing, sales, operations, finance, and HR automatically.',
  openGraph: {
    title: 'AI Departments | Jensure',
    description: 'Orchestrated AI agent systems that run your business functions — marketing, sales, operations, finance, and HR.',
    url: 'https://jensure.com/ai-departments'
  }
}

export default function AIDepartmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
