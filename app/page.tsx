'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Kasamba-inspired premium psychic reading platform
// Clean, mystical, trust-focused design

const SERVICES = [
  { id: 'bazi', name: 'Four Pillars', icon: '☯', price: '$5.99', desc: 'The precise cosmic architecture written at your birth — decoded through stems, branches, and the cycles of ten thousand days.', badge: 'Most Sought', link: '/consult' },
  { id: 'compass', name: 'Feng Shui Compass', icon: '🧭', price: 'Free', desc: 'Twenty-four mountains, nine flying palaces, the breath of chi — align your space with cosmic currents.', badge: 'New', link: '/compass' },
  { id: 'horoscope', name: 'Stellar Forecast', icon: '✦', price: 'Free', desc: 'Daily celestial weather for your sign — love, career, wealth, and health, calibrated to the heavens.', badge: null, link: '/horoscope' },
  { id: 'divination', name: 'I Ching Oracle', icon: '🔮', price: '$3.99', desc: 'Cast the coins. Sixty-four hexagrams distilled from three thousand years of wisdom — the Oracle responds.', badge: null, link: '/divination' },
]

const TRUST_POINTS = [
  { icon: '📜', title: 'Lineage of Masters', desc: 'Rooted in Yuan Hai Zi Ping, Di Tian Sui, Qiong Tong Bao Jian — three thousand years of distilled wisdom.' },
  { icon: '⚙️', title: 'Precision by Design', desc: 'Lunar algorithms refined by practitioners, validated against a century of records.' },
  { icon: '🤖', title: 'Intelligence, Augmented', desc: 'Forty years of master insight, absorbed into Qwen 72B — depth no single reader can match.' },
  { icon: '🔒', title: 'Your Secrets, Sacred', desc: 'End-to-end encryption. Your birth data never leaves our protected environment.' },
  { icon: '⚡', title: 'Always at Hand', desc: 'A complete reading in seconds, not weeks. The wisdom of the ancients at modern speed.' },
  { icon: '💰', title: 'Honest Exchange', desc: 'Transparent rates. PayPal secured. No subscriptions, no hidden additions.' },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#0f0f2a] to-[#1a1a3a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg border-b border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl font-light tracking-widest text-amber-400">Æ</div>
            <span className="text-lg font-semibold tracking-wider">AETHER</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {SERVICES.map((s) => (
              <Link key={s.id} href={s.link} className="text-sm text-white/70 hover:text-amber-400 transition-colors">
                {s.name}
              </Link>
            ))}
          </nav>
          <Link href="/consult" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-2 rounded-full text-sm transition-colors">
            Get a Reading
          </Link>
        </div>
      </header>

      {/* Hero Section - Kasamba inspired */}
      <section className="relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-white/80 text-sm">Trusted by 500K+ souls worldwide</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Psychic Chat, Tarot,</span><br />
            <span className="text-amber-400">Astrology & More</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/60 mb-4">
            Find your way to love and happiness
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/consult" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-full text-lg transition-all shadow-lg shadow-amber-500/30">
              Get Your Reading →
            </Link>
            <Link href="/horoscope" className="bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all">
              Free Daily Horoscope
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 pt-16 border-t border-white/10">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400">500K+</div>
              <div className="text-white/50 text-sm mt-1">Readings Delivered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400">98%</div>
              <div className="text-white/50 text-sm mt-1">Chart Precision</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400">4.9★</div>
              <div className="text-white/50 text-sm mt-1">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Kasamba style */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Reading</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Expert guidance in Chinese metaphysics, tailored to your needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-500/10"
            >
              {service.badge && (
                <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full">
                  {service.badge}
                </div>
              )}
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{service.name}</h3>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">{service.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold">{service.price}</span>
                <span className="text-white/30 group-hover:text-amber-400 transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Section - Kasamba "Why Kasamba" style */}
      <section className="bg-black/20 border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Aether?</h2>
            <p className="text-white/60">Your journey to clarity starts with trusted guidance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TRUST_POINTS.slice(0, 3).map((point, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center text-3xl border border-white/10">
                  {point.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {TRUST_POINTS.slice(3, 6).map((point, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center text-3xl border border-white/10">
                  {point.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative bg-gradient-to-r from-purple-600/20 via-amber-500/20 to-purple-600/20 rounded-3xl p-12 text-center border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/stars.png')] opacity-10" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The stars are already written.
            </h2>
            <p className="text-xl text-white/60 mb-8">
              It is only a question of learning to read them.
            </p>
            <Link href="/consult" className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-full text-lg transition-all shadow-lg shadow-amber-500/30">
              Begin Your Reading →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-light text-amber-400">Æ</span>
                <span className="font-semibold">AETHER</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Ancient wisdom meets modern intelligence. Your path to clarity begins here.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Readings</h4>
              <div className="space-y-2">
                {SERVICES.map((s) => (
                  <Link key={s.id} href={s.link} className="block text-white/50 hover:text-amber-400 text-sm transition-colors">
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-white/50 hover:text-amber-400 text-sm transition-colors">About</Link>
                <Link href="/privacy" className="block text-white/50 hover:text-amber-400 text-sm transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block text-white/50 hover:text-amber-400 text-sm transition-colors">Terms of Service</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-sm text-white/50">
                <div>Telegram: @AetherReadings</div>
                <div>Email: hello@aether.insights</div>
                <div>WeChat: AetherOfficial</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center">
            <p className="text-white/30 text-sm">
              © 2026 Aether Insights. The stars were here long before us. They will remain long after.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
