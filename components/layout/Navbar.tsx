'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'
import CTAButton from '@/components/ui/CTAButton'

const BLOG_CATEGORIES = [
  { label: 'AI Automation', href: '/blog/ai-automation' },
  { label: 'AI Agents', href: '/blog/ai-agents' },
  { label: 'Workflow Automation', href: '/blog/workflow-automation' },
  { label: 'AI Infrastructure', href: '/blog/infrastructure' },
  { label: 'Case Studies', href: '/blog/case-studies' }
]

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'AI Departments', href: '/ai-departments' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Blog', href: '/blog', hasDropdown: true }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false)
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleBlogMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setBlogDropdownOpen(true)
  }

  const handleBlogMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setBlogDropdownOpen(false), 150)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-bg/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-brand-bg/60 backdrop-blur-xl border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-brand-text text-lg tracking-tight">
            <span className="w-7 h-7 bg-brand-accent rounded-md flex items-center justify-center text-white text-base font-bold leading-none">J</span>
            Jensure
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleBlogMouseEnter}
                  onMouseLeave={handleBlogMouseLeave}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-brand-text/70 hover:text-brand-text transition-colors rounded-md hover:bg-white/5">
                    {item.label}
                    <motion.svg
                      animate={{ rotate: blogDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="mt-0.5"
                    >
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {blogDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 py-2 rounded-xl bg-brand-surface/90 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40"
                      >
                        <Link
                          href="/blog"
                          className="block px-4 py-2 text-sm text-brand-text/60 hover:text-brand-text hover:bg-white/5 transition-colors font-medium"
                        >
                          All Posts
                        </Link>
                        <div className="my-1.5 mx-4 border-t border-white/8" />
                        {BLOG_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className="block px-4 py-2 text-sm text-brand-text/70 hover:text-brand-cta hover:bg-brand-cta/5 transition-colors"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm text-brand-text/70 hover:text-brand-text transition-colors rounded-md hover:bg-white/5"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <CTAButton href="/book-a-call" variant="primary" size="default">
              Book Automation Audit
            </CTAButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-brand-text/70 hover:text-brand-text transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-1">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-brand-bg/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <nav className="px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) =>
                item.hasDropdown ? (
                  <div key={item.href}>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-brand-text/70 hover:text-brand-text transition-colors rounded-lg hover:bg-white/5"
                      onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
                    >
                      {item.label}
                      <motion.svg
                        animate={{ rotate: mobileBlogOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {mobileBlogOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4"
                        >
                          <Link
                            href="/blog"
                            className="block px-3 py-2 text-sm text-brand-text/50 hover:text-brand-text transition-colors"
                            onClick={() => setMenuOpen(false)}
                          >
                            All Posts
                          </Link>
                          {BLOG_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              className="block px-3 py-2 text-sm text-brand-text/60 hover:text-brand-cta transition-colors"
                              onClick={() => setMenuOpen(false)}
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2.5 text-sm text-brand-text/70 hover:text-brand-text transition-colors rounded-lg hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-3 border-t border-white/10 mt-2">
                <CTAButton href="/book-a-call" variant="primary" className="w-full justify-center" onClick={() => setMenuOpen(false)}>
                  Book Automation Audit
                </CTAButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
