import Link from 'next/link'
import JensureLogo from '@/components/ui/JensureLogo'

const FOOTER_LINKS = {
  Product: [
    { label: 'AI Departments', href: '/ai-departments' },
    { label: 'GTM Systems', href: '/gtm-systems' },
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries' }
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' }
  ],
  Resources: [
    { label: 'Book Automation Audit', href: '/book-a-call' },
    { label: 'Automation Discovery', href: '/#automation-discovery' }
  ]
}

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <JensureLogo size="sm" />
            </Link>
            <p className="text-sm text-brand-text/50 max-w-xs leading-relaxed">
              AI Operational Infrastructure. We build AI Departments that run business functions automatically.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-brand-text/40 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-text/60 hover:text-brand-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-text/40">
            © {new Date().getFullYear()} Jensure. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-brand-text/40 hover:text-brand-text transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-brand-text/40 hover:text-brand-text transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
