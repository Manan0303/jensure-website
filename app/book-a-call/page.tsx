import type { Metadata } from 'next'
import BookACallContent from './BookACallContent'

export const metadata: Metadata = {
  title: 'Book a Free AI Automation Audit | Jensure',
  description: 'Book a free automation audit with Jensure. We review your operations, identify what to automate, and propose a build. No commitment required.',
  openGraph: {
    title: 'Book a Free AI Automation Audit | Jensure',
    description: 'Free 30-minute audit. We identify automation opportunities in your operations.',
    url: 'https://www.jensure.com/book-a-call',
  },
  alternates: { canonical: 'https://www.jensure.com/book-a-call' }
}

export default function BookACallPage() {
  return <BookACallContent />
}
