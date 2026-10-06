import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ReviewPilot — Your Google reviews, replied to automatically',
  description:
    'ReviewPilot connects to your Google Business Profile and automatically responds to every review within 24 hours. Built for local businesses in Merseyside. £29/mo, no contract.',
  openGraph: {
    title: 'ReviewPilot — Your Google reviews, replied to automatically',
    description:
      'Stop ignoring your Google reviews. ReviewPilot responds to every one automatically — in your voice, within 24 hours. £29/mo, no contract.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
