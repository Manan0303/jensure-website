import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jensure.com'),
  title: {
    default: 'AI Automation Agency | AI Departments for Business | Jensure',
    template: '%s | Jensure'
  },
  description: 'Jensure builds AI Departments — coordinated agent systems that automate your marketing, sales, operations, and finance. Replace repetitive work with AI that runs 24/7.',
  openGraph: {
    type: 'website',
    siteName: 'Jensure',
    title: 'AI Automation Agency | AI Departments for Business | Jensure',
    description: 'Jensure builds AI Departments — coordinated agent systems that automate your marketing, sales, operations, and finance. Replace repetitive work with AI that runs 24/7.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jensure'
  },
  robots: { index: true, follow: true }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-brand-bg text-brand-text font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Jensure',
              url: 'https://www.jensure.com',
              logo: 'https://www.jensure.com/logo.png',
              description: 'Jensure builds AI Departments that automate marketing, sales, operations, finance, and HR workflows for businesses.',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@jensure.com',
                contactType: 'sales'
              }
            })
          }}
        />
      </body>
    </html>
  )
}
