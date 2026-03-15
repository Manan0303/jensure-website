import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'

// Placeholder post content — replaced by MongoDB fetch once CMS is seeded
const BLOG_POSTS: Record<string, {
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  readTimeMinutes: number
  publishedAt: string
  metaTitle?: string
  metaDescription?: string
}> = {
  'what-is-an-ai-department': {
    title: 'What is an AI Department?',
    excerpt: 'Most automation advice focuses on individual tools. AI Departments take a different approach — building orchestrated agent systems that run entire business functions.',
    category: 'AI Departments',
    author: 'Jensure',
    readTimeMinutes: 5,
    publishedAt: '2026-02-10',
    content: `
Most automation advice focuses on individual tools — a tool for email, a tool for scheduling, a tool for reporting. The result is a collection of disconnected software that still requires humans to coordinate between them.

AI Departments take a different approach.

**The core idea**

An AI Department is a coordinated system of AI agents that collectively run a business function — the way a real team would, but without the manual overhead.

Each department has two layers:

- A **Master Agent** — the department head. It understands the department's objectives, coordinates the sub-agents, and ensures work gets done in the right sequence.
- **Sub Agents** — specialized agents, each responsible for a specific operational task.

**An example: the AI Marketing Department**

The CMO Agent (Master) oversees all marketing operations. Below it:

- The Inbound Lead Agent monitors forms and routes qualified leads
- The Content Creation Agent generates blog posts and marketing materials on schedule
- The SEO Agent optimizes content and conducts keyword research
- The Social Media Agent schedules posts across all platforms
- The Analytics Agent compiles performance reports

None of these agents require human coordination. The CMO Agent ensures they work in sequence and that outputs feed the next stage.

**Why this matters**

The reason most automation fails is that it automates individual tasks without connecting them. Automating your email but not your CRM sync still leaves gaps that humans have to fill.

AI Departments eliminate the gaps. The system is designed as a complete operational unit, not a collection of individual automations.

**Who should consider an AI Department?**

Any business with a well-defined operational function that currently requires multiple people to manage. Marketing, sales, operations, finance, HR — each of these can be built as an AI Department once the workflows are mapped and the tools are connected.

The first step is always the same: an operational audit to identify which tasks are repetitive, predictable, and consuming the most employee time.
    `.trim()
  },
  'how-gtm-automation-works': {
    title: 'How GTM Automation Works',
    excerpt: 'A go-to-market system is not a collection of disconnected tools. It is a connected pipeline where each stage feeds the next — automatically.',
    category: 'GTM Systems',
    author: 'Jensure',
    readTimeMinutes: 6,
    publishedAt: '2026-02-24',
    content: `
Go-to-market is one of the most operationally intensive functions in any business. Finding potential customers, enriching their contact data, reaching out with relevant messages, following up, booking meetings — each stage requires consistent execution across hundreds or thousands of prospects.

Most businesses do this manually, or with a stack of tools that require constant human attention to operate.

GTM automation replaces that with a connected pipeline that runs end-to-end without manual input.

**The stages of a GTM System**

**1. Lead identification**
The system identifies potential customers based on your ideal customer profile — using intent signals, company data, job titles, and industry filters. No manual prospecting required.

**2. Lead enrichment**
Every identified lead is automatically enriched with company size, revenue range, tech stack, decision-maker contact information, and relevant context. This takes seconds per lead.

**3. Outreach**
Personalized outreach messages are generated and sent — email sequences, LinkedIn messages — tailored to the specific lead based on their enrichment data. Not generic templates.

**4. Follow-up**
Leads that do not respond are automatically followed up at the right intervals. The system tracks response status and escalates or pauses sequences based on engagement.

**5. Meeting booking**
When a prospect responds positively, the system books a meeting directly based on your calendar availability. No back-and-forth required.

**6. CRM sync**
Every interaction, status update, and meeting is automatically logged in your CRM. Your pipeline data stays current without manual entry.

**7. Analytics**
The system reports on open rates, reply rates, meetings booked, and pipeline value — so you can see exactly what is working.

**What this means in practice**

Your sales or business development team stops doing outbound work and starts receiving qualified meetings. The system runs the prospecting, enrichment, outreach, and follow-up. Humans handle the conversations that convert to revenue.

This is the difference between a team that spends its time on manual outreach and one that spends its time closing deals.
    `.trim()
  },
  'automating-operations-vs-adding-tools': {
    title: 'Automating Operations vs. Adding Tools',
    excerpt: 'Adding more software rarely reduces operational complexity. Building systems that connect and coordinate your existing tools does.',
    category: 'Operations',
    author: 'Jensure',
    readTimeMinutes: 4,
    publishedAt: '2026-03-05',
    content: `
When businesses face operational bottlenecks, the default solution is to add another tool. A new CRM, a new project management app, a new automation platform.

The result is usually more complexity, not less. More tools to maintain, more integrations to manage, more training required, and still the same humans coordinating between them.

**The distinction that matters**

Adding tools gives your team more capabilities. Building systems removes the need for your team to exercise those capabilities manually.

These are fundamentally different outcomes.

A reporting tool gives your analyst the ability to generate a report faster. A reporting system generates the report automatically, on schedule, and distributes it without anyone touching it.

**What makes an automation system different from a tool**

A tool requires a human to operate it each time. A system runs a defined process end-to-end, triggered by inputs, without ongoing human involvement.

The test is simple: if a person has to decide when to use it, it is a tool. If it runs when a condition is met, it is a system.

**Why most automation projects fail**

Most automation projects automate the wrong thing: they automate the execution of a task while leaving the coordination of that task to humans.

Example: automating the creation of a weekly report is useful. But if a human still has to initiate the process, check the data sources, review the output, and distribute it — you have automated 20% of the work.

A complete system handles all of it: pulling data from the right sources on schedule, validating it, generating the output, and distributing it to the right people. No human in the loop.

**The right starting point**

The question is not "what tool can we add?" The question is: "which process, if fully automated, would have the highest impact on our operations?"

That process then gets designed as a system — with inputs, logic, outputs, and distribution built in from the start — not bolted on after the fact.

This is what distinguishes an operational automation from an operational improvement.
    `.trim()
  }
}

const PUBLISHED_SLUGS = Object.keys(BLOG_POSTS)

export async function generateStaticParams() {
  return PUBLISHED_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS[slug]
  if (!post) return { title: 'Post Not Found', robots: { index: false, follow: false } }

  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    robots: { index: true, follow: true },
    alternates: { canonical: `https://jensure.com/blog/${slug}` },
    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      type: 'article',
      url: `https://jensure.com/blog/${slug}`,
      publishedTime: new Date(post.publishedAt).toISOString()
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt
    }
  }
}

function renderContent(content: string) {
  // Simple markdown-like rendering for the placeholder posts
  return content.split('\n\n').map((paragraph, i) => {
    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
      return <h3 key={i} className="text-xl font-bold text-brand-black mt-8 mb-3">{paragraph.replace(/\*\*/g, '')}</h3>
    }
    // Handle inline bold
    const parts = paragraph.split(/(\*\*.*?\*\*)/g)
    return (
      <p key={i} className="text-brand-gray-dark leading-relaxed mb-4">
        {parts.map((part, j) =>
          part.startsWith('**') ? <strong key={j} className="font-semibold text-brand-black">{part.replace(/\*\*/g, '')}</strong> : part
        )}
      </p>
    )
  })
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = BLOG_POSTS[slug]
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: 'Jensure' },
    publisher: {
      '@type': 'Organization',
      name: 'Jensure',
      logo: { '@type': 'ImageObject', url: 'https://jensure.com/logo.png' }
    },
    datePublished: new Date(post.publishedAt).toISOString(),
    url: `https://jensure.com/blog/${slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://jensure.com/blog/${slug}` }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <>
      <Script
        id="blog-post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">{post.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight mt-3 mb-5">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-brand-gray pb-8 border-b border-brand-gray-light">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{post.readTimeMinutes} min read</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <SectionContainer className="bg-white !pt-10">
        <article className="max-w-3xl mx-auto prose prose-gray max-w-none">
          <p className="text-xl text-brand-gray-dark leading-relaxed mb-8 font-medium">{post.excerpt}</p>
          {renderContent(post.content)}
        </article>
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
