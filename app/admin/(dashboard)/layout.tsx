import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { signOut } from '@/auth'
import Link from 'next/link'

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/enquiries', label: 'Enquiries' },
  { href: '/admin/blogs', label: 'Blogs' },
  { href: '/admin/case-studies', label: 'Case Studies' },
  { href: '/admin/faqs', label: 'FAQs' },
  { href: '/admin/settings', label: 'Settings' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-brand-bg">
      <header className="bg-brand-surface border-b border-white/8 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-accent to-brand-cta flex items-center justify-center">
                <span className="text-white font-bold text-xs">J</span>
              </div>
              <span className="text-brand-text font-semibold">Jensure Admin</span>
            </div>
            <nav className="flex items-center gap-1">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href}
                  className="px-3 py-1.5 text-sm text-brand-text/60 hover:text-brand-text hover:bg-white/5 rounded-lg transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/admin/login' }) }}>
            <button type="submit" className="text-brand-text/50 text-sm hover:text-brand-text transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
