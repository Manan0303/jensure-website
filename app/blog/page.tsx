import type { Metadata } from 'next'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on AI automation, AI Departments, GTM systems, and operational efficiency from the Jensure team.',
  openGraph: {
    title: 'Blog | Jensure',
    description: 'Insights on AI automation, AI Departments, and operational efficiency.',
    url: 'https://jensure.com/blog'
  }
}

// Placeholder posts — replaced by MongoDB fetch once CMS is seeded
const PLACEHOLDER_POSTS = [
  {
    slug: 'what-is-an-ai-department',
    title: 'What is an AI Department?',
    excerpt: 'Most automation advice focuses on individual tools. AI Departments take a different approach — building orchestrated agent systems that run entire business functions.',
    category: 'AI Departments',
    author: 'Jensure',
    readTimeMinutes: 5,
    publishedAt: '2026-02-10'
  },
  {
    slug: 'how-gtm-automation-works',
    title: 'How GTM Automation Works',
    excerpt: 'A go-to-market system is not a collection of disconnected tools. It is a connected pipeline where each stage feeds the next — automatically.',
    category: 'GTM Systems',
    author: 'Jensure',
    readTimeMinutes: 6,
    publishedAt: '2026-02-24'
  },
  {
    slug: 'automating-operations-vs-adding-tools',
    title: 'Automating Operations vs. Adding Tools',
    excerpt: 'Adding more software rarely reduces operational complexity. Building systems that connect and coordinate your existing tools does.',
    category: 'Operations',
    author: 'Jensure',
    readTimeMinutes: 4,
    publishedAt: '2026-03-05'
  }
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">Blog</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-black tracking-tight mb-5 max-w-3xl">
            Resources on AI automation.
          </h1>
          <p className="text-lg text-brand-gray-dark max-w-2xl leading-relaxed">
            How AI Departments work, how to automate specific operations, and how businesses replace manual work with systems.
          </p>
        </div>
      </section>

      {/* Posts */}
      <SectionContainer className="bg-brand-off-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-brand-gray-light rounded-xl p-6 flex flex-col gap-4 hover:border-brand-blue transition-colors"
            >
              <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">{post.category}</span>
              <h2 className="text-lg font-bold text-brand-black leading-snug group-hover:text-brand-blue transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-brand-gray leading-relaxed flex-grow">{post.excerpt}</p>
              <div className="mt-auto pt-4 border-t border-brand-gray-light flex items-center justify-between text-xs text-brand-gray">
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readTimeMinutes} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-black">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Ready to automate your operations?</h2>
          <p className="text-gray-400 mb-8">Book a free audit and we will identify exactly what to build for your business.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}
