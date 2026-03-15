import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'
import {
  ALL_BLOG_POSTS,
  BLOG_CATEGORIES,
  getPostBySlug,
  getPostsByCategory,
  type BlogPost
} from '@/lib/blog-data'

export async function generateStaticParams() {
  const postSlugs = ALL_BLOG_POSTS.map((p) => ({ slug: p.slug }))
  const categorySlugs = BLOG_CATEGORIES.map((c) => ({ slug: c.slug }))
  return [...postSlugs, ...categorySlugs]
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  // Category page
  const category = BLOG_CATEGORIES.find((c) => c.slug === slug)
  if (category) {
    return {
      title: `${category.label} — Blog`,
      description: `Browse all Jensure articles on ${category.label}.`,
      openGraph: {
        title: `${category.label} | Jensure Blog`,
        description: `Browse all Jensure articles on ${category.label}.`,
        url: `https://jensure.com/blog/${slug}`
      }
    }
  }

  // Individual post
  const post = getPostBySlug(slug)
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function renderContent(content: string) {
  return content.split('\n\n').map((paragraph, i) => {
    if (!paragraph.trim()) return null

    // Standalone bold line = subheading
    if (/^\*\*[^*]+\*\*$/.test(paragraph.trim())) {
      return (
        <h3 key={i} className="text-xl font-bold text-brand-text mt-8 mb-3">
          {paragraph.replace(/\*\*/g, '')}
        </h3>
      )
    }

    // Numbered list item
    if (/^\d+\./.test(paragraph.trim())) {
      return (
        <div key={i} className="flex gap-3 mb-3">
          <span className="text-brand-cta font-bold flex-shrink-0">{paragraph.match(/^\d+/)?.[0]}.</span>
          <p className="text-brand-text/65 leading-relaxed">
            {renderInline(paragraph.replace(/^\d+\.\s*/, ''))}
          </p>
        </div>
      )
    }

    // Bullet list
    if (paragraph.trim().startsWith('- ')) {
      const items = paragraph.split('\n').filter((l) => l.trim().startsWith('- '))
      return (
        <ul key={i} className="space-y-2 mb-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-brand-text/65 text-sm leading-relaxed">
              <span className="text-brand-cta mt-1 flex-shrink-0">✓</span>
              {renderInline(item.replace(/^-\s*/, ''))}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <p key={i} className="text-brand-text/65 leading-relaxed mb-4">
        {renderInline(paragraph)}
      </p>
    )
  })
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith('**') ? (
      <strong key={i} className="font-semibold text-brand-text">
        {part.replace(/\*\*/g, '')}
      </strong>
    ) : (
      part
    )
  )
}

// ── Category listing page ────────────────────────────────────────────────────

function CategoryPage({ slug }: { slug: string }) {
  const category = BLOG_CATEGORIES.find((c) => c.slug === slug)!
  const posts = getPostsByCategory(slug)

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 20% 40%, rgba(61,90,254,0.15) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/blog" className="text-xs font-semibold text-brand-cta/70 hover:text-brand-cta transition-colors mb-3 inline-flex items-center gap-1">
            ← Blog
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Category</p>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            {category.label}
          </h1>
          <p className="text-lg text-brand-text/60 max-w-2xl leading-relaxed">
            {posts.length} article{posts.length !== 1 ? 's' : ''} on {category.label.toLowerCase()} from Jensure.
          </p>
        </div>
      </section>

      {/* Posts */}
      <SectionContainer className="bg-brand-surface">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-brand-surface-2 border border-white/8 rounded-xl p-6 flex flex-col gap-4 hover:border-brand-accent/40 transition-all duration-200 block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">{post.category}</span>
                <span className="text-xs text-brand-text/35">{post.readTimeMinutes} min read</span>
              </div>
              <h2 className="text-lg font-bold text-brand-text leading-snug group-hover:text-brand-cta transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-brand-text/55 leading-relaxed flex-grow">{post.excerpt}</p>
              <div className="mt-auto pt-4 border-t border-white/8 flex items-center justify-between text-xs text-brand-text/35">
                <span>{post.author}</span>
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </Link>
          ))}
        </div>
      </SectionContainer>

      {/* Other categories */}
      <SectionContainer className="bg-brand-bg">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-text/40 mb-4">Other categories</p>
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.filter((c) => c.slug !== slug).map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                className="text-sm bg-brand-surface border border-white/8 rounded-full px-4 py-1.5 text-brand-text/60 hover:border-brand-accent/40 hover:text-brand-text transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl bg-brand-cta" />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-text tracking-tight mb-4">Ready to automate your operations?</h2>
          <p className="text-brand-text/60 mb-8">Book a free audit and we will identify exactly what to build for your business.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}

// ── Individual post page ─────────────────────────────────────────────────────

function PostPage({ post, slug }: { post: BlogPost; slug: string }) {
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

  const categoryMeta = BLOG_CATEGORIES.find((c) => c.slug === post.categorySlug)

  return (
    <>
      <Script
        id="blog-post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 20% 50%, rgba(61,90,254,0.12) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/blog" className="text-xs text-brand-text/40 hover:text-brand-text/70 transition-colors">Blog</Link>
            <span className="text-brand-text/20">/</span>
            {categoryMeta && (
              <>
                <Link href={`/blog/${post.categorySlug}`} className="text-xs text-brand-accent hover:text-brand-accent/80 transition-colors">{post.category}</Link>
              </>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text tracking-tight mt-3 mb-5 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-brand-text/40 pb-8 border-b border-white/10">
            <span className="font-medium text-brand-text/60">{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{post.readTimeMinutes} min read</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <SectionContainer className="bg-brand-bg !pt-10">
        <article className="max-w-3xl mx-auto">
          <p className="text-xl text-brand-text/75 leading-relaxed mb-10 font-medium border-l-4 border-brand-accent pl-5">
            {post.excerpt}
          </p>
          <div className="prose-custom">
            {renderContent(post.content)}
          </div>
        </article>
      </SectionContainer>

      {/* Related category */}
      {categoryMeta && (
        <SectionContainer className="bg-brand-surface !py-10">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-xs text-brand-text/40 uppercase tracking-widest mb-1">More in this category</p>
              <p className="font-semibold text-brand-text">{categoryMeta.label}</p>
            </div>
            <Link
              href={`/blog/${post.categorySlug}`}
              className="text-sm text-brand-accent hover:text-brand-cta transition-colors font-medium"
            >
              View all →
            </Link>
          </div>
        </SectionContainer>
      )}

      {/* CTA */}
      <SectionContainer className="bg-brand-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl bg-brand-cta" />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-text tracking-tight mb-4">Ready to automate your operations?</h2>
          <p className="text-brand-text/60 mb-8">Book a free audit and we will identify exactly what to build for your business.</p>
          <CTAButton href="/book-a-call" variant="primary" size="large">Book Automation Audit</CTAButton>
        </div>
      </SectionContainer>
    </>
  )
}

// ── Route handler ────────────────────────────────────────────────────────────

export default async function BlogSlugPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Check if this is a category slug
  const isCategory = BLOG_CATEGORIES.some((c) => c.slug === slug)
  if (isCategory) return <CategoryPage slug={slug} />

  // Otherwise look up individual post
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return <PostPage post={post} slug={slug} />
}
