import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { auth } from '@/auth'
import FAQ from '@/models/FAQ'

const DEFAULT_FAQS = [
  { question: 'What is AI automation for business?', answer: 'AI automation uses artificial intelligence to automate repetitive business processes such as data entry, reporting, marketing workflows, and customer communication.', keywords: ['AI automation', 'business automation', 'AI automation solutions'], category: 'general', status: 'published' as const },
  { question: 'How can AI automation improve business operations?', answer: 'AI automation improves operations by reducing manual work, increasing speed, reducing errors, and allowing teams to focus on strategic work.', keywords: ['AI automation tools', 'improve operations', 'workflow automation with AI'], category: 'general', status: 'published' as const },
  { question: 'What tasks can AI automate in a company?', answer: 'AI can automate tasks such as lead generation, content creation, customer support, document processing, reporting, and workflow management.', keywords: ['AI automation for business', 'automate tasks'], category: 'general', status: 'published' as const },
  { question: 'What are AI agents in business automation?', answer: 'AI agents are intelligent software systems that can perform specific business tasks automatically and coordinate with other agents to complete complex workflows.', keywords: ['AI agents for business', 'AI agents'], category: 'ai-agents', status: 'published' as const },
  { question: 'Is AI automation suitable for small businesses?', answer: 'Yes, AI automation can help small businesses eliminate repetitive tasks and scale operations without increasing headcount.', keywords: ['AI automation for business', 'small business'], category: 'general', status: 'published' as const },
  { question: 'How does Jensure build AI automation systems?', answer: 'Jensure builds AI departments composed of coordinated agents that automate marketing, sales, operations, finance, and HR workflows.', keywords: ['AI automation solutions', 'AI marketing automation', 'AI operations automation'], category: 'jensure', status: 'published' as const },
  { question: 'What is AI sales automation?', answer: 'AI sales automation uses intelligent agents to handle lead qualification, follow-up sequences, pipeline management, and outreach — reducing manual sales effort significantly.', keywords: ['AI sales automation', 'sales automation'], category: 'sales', status: 'published' as const },
  { question: 'What is AI marketing automation?', answer: 'AI marketing automation applies intelligent agents to content creation, SEO, social media, paid ads management, and analytics — allowing marketing to run with minimal manual oversight.', keywords: ['AI marketing automation', 'marketing automation with AI'], category: 'marketing', status: 'published' as const },
]

export async function POST() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const existing = await FAQ.countDocuments()
    if (existing > 0) return NextResponse.json({ message: 'FAQs already seeded', count: existing })
    await FAQ.insertMany(DEFAULT_FAQS)
    return NextResponse.json({ message: 'Seeded successfully', count: DEFAULT_FAQS.length })
  } catch (err) {
    console.error('[POST /api/cms/faqs/seed]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
