import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aether — Personal Insights Through Ancient Wisdom',
  description: 'Personalized analysis based on classical Chinese wisdom — explore personality patterns, strengths, and life tendencies through the Four Pillars, environmental harmony, and philosophical reflection. For entertainment and self-discovery.',
  keywords: 'birth chart analysis, four pillars, chinese philosophy, personality insights, self-reflection, cultural wisdom, life patterns',
  openGraph: {
    title: 'Aether — Personal Insights Through Ancient Wisdom',
    description: 'Personalized insights through classical Chinese cultural analysis. Entertainment and self-reflection.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
