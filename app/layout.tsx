import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aether — The Quiet Art of Knowing',
  description: 'A reading of the architecture of your fate, drawn from the Four Pillars, the geometry of Feng Shui, and the old hexagrams. Interpreted by masters. Illuminated by intelligence.',
  keywords: 'Bazi, Four Pillars, Feng Shui, Horoscope, I Ching, Chinese astrology, destiny, divination, AI astrology',
  openGraph: {
    title: 'Aether — The Quiet Art of Knowing',
    description: 'Where the ancient masters meet modern intelligence. Bazi, Feng Shui, Horoscope, I Ching.',
    type: 'website',
  },
  themeColor: '#0a0a0f',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
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
