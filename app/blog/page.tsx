'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionContainer from '@/components/layout/SectionContainer'
import CTAButton from '@/components/ui/CTAButton'
import { ALL_BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/blog-data'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? ALL_BLOG_POSTS.filter((p) => p.categorySlug === activeCategory)
    : ALL_BLOG_POSTS

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 20% 40%, rgba(61,90,254,0.15) 0%, transparent 50%), linear-gradient(180deg, #0A0F2C 0%, #111633 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p {...fadeUp(0)} className="text-xs font-semibold uppercase tracking-widest text-brand-cta mb-3">Blog</motion.p>
          <motion.h1 {...fadeUp(0.08)} className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight mb-5 max-w-3xl">
            Resources on AI automation.
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-lg text-brand-text/60 max-w-2xl leading-relaxed">
            How AI Departments work, how to automate specific operations, and how businesses replace manual work with systems that run automatically.
          </motion.p>
        </div>
      </section>

      {/* Category Filter + Posts */}
      <SectionContainer className="bg-brand-surface">
        {/* Category tabs */}
        <motion.div {...fadeUp()} className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === null
                ? 'bg-brand-accent text-white shadow-glow-accent'
                : 'bg-brand-surface-2 border border-white/10 text-brand-text/70 hover:border-brand-accent/40 hover:text-brand-text'
            }`}
          >
            All Posts
          </button>
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.slug
                  ? 'bg-brand-accent text-white shadow-glow-accent'
                  : 'bg-brand-surface-2 border border-white/10 text-brand-text/70 hover:border-brand-accent/40 hover:text-brand-text'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <motion.div key={post.slug} {...fadeUp(Math.min(i * 0.05, 0.3))}>
              <Link
                href={`/blog/${post.slug}`}
                className="group bg-brand-surface-2 border border-white/8 rounded-xl p-6 flex flex-col gap-4 hover:border-brand-accent/40 transition-all duration-200 hover:shadow-card-hover block h-full"
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
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-brand-text/40">No posts in this category yet.</div>
        )}
      </SectionContainer>

      {/* CTA */}
      <SectionContainer className="bg-brand-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl bg-brand-cta" />
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
