import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]">
      {/* Navigation */}
      <nav className="bg-[#0a0a0f]/80 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center text-[#0a0a0f] font-bold text-lg shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
              Æ
            </div>
            <span className="text-amber-300 font-bold text-xl tracking-[0.2em] uppercase">Aether</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-amber-300 font-medium tracking-wide">Home</Link>
            <Link href="/consult" className="text-slate-400 hover:text-amber-300 transition-colors tracking-wide">Four Pillars</Link>
            <Link href="/compass" className="text-slate-400 hover:text-amber-300 transition-colors tracking-wide">Compass</Link>
            <Link href="/horoscope" className="text-slate-400 hover:text-amber-300 transition-colors tracking-wide">Stars</Link>
            <Link href="/divination" className="text-slate-400 hover:text-amber-300 transition-colors tracking-wide">Oracle</Link>
          </div>
          <Link href="/consult" className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0a0a0f] font-bold px-6 py-2.5 rounded-full transition-all text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40">
            Begin Journey
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] animate-pulse"/>
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}/>
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-amber-400/3 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '3s' }}/>
          <div className="absolute bottom-10 left-10 text-amber-500/5 text-[200px] leading-none select-none font-serif">☰</div>
          <div className="absolute top-16 right-16 text-amber-500/5 text-[160px] leading-none select-none font-serif">☷</div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-amber-500/8 border border-amber-500/25 rounded-full px-5 py-2 mb-10">
            <span className="text-amber-400/80 text-xs tracking-[0.25em] uppercase">Ancient Wisdom · Modern Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.05] tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400">The Quiet Art</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 text-4xl md:text-5xl lg:text-6xl">of Knowing</span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            An exploration of your personality patterns and life tendencies — drawn from the Four Pillars, environmental harmony, and classical philosophy. For entertainment and self-reflection only.
          </p>

          <div className="flex justify-center gap-14 mb-14">
            {[
              { n: '500K+', l: 'Users Worldwide' },
              { n: '98%', l: 'Chart Precision' },
              { n: '4.9 ★', l: 'Average Rating' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-400">{s.n}</div>
                <div className="text-slate-600 text-xs mt-1 tracking-widest uppercase">{s.l}</div>
              </div>
            ))}
          </div>

          <Link href="/consult" className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 text-[#0a0a0f] font-bold text-base px-12 py-4 rounded-full transition-all shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.03] tracking-wide">
            Explore My Profile
            <span className="text-xl">→</span>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"/>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-amber-500/60 text-xs tracking-[0.3em] uppercase mb-4">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-200">Four paths to clarity</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link href="/consult" className="group bg-[#0d1117]/80 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-amber-500/40 p-7 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-300/20 to-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">☯</div>
            <h3 className="text-lg font-bold text-slate-200 mb-2 tracking-wide">Four Pillars</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Your birth chart decoded — a personalized analysis of personality, strengths, and life patterns through classical Chinese wisdom.</p>
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-semibold text-sm">$5.99</span>
              <span className="text-red-400/70 text-xs px-2 py-0.5 rounded-full border border-red-400/30 bg-red-400/10">Most Popular</span>
            </div>
          </Link>

          <Link href="/compass" className="group bg-[#0d1117]/80 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-amber-500/40 p-7 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400/20 to-green-500/20 border border-green-500/30 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">🧭</div>
            <h3 className="text-lg font-bold text-slate-200 mb-2 tracking-wide">Space Harmony</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Environmental harmony insights — explore how your living space can support balance and well-being through classical principles.</p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-semibold text-sm">Free</span>
              <span className="text-green-400/70 text-xs px-2 py-0.5 rounded-full border border-green-400/30 bg-green-400/10">New</span>
            </div>
          </Link>

          <Link href="/horoscope" className="group bg-[#0d1117]/80 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-amber-500/40 p-7 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">✦</div>
            <h3 className="text-lg font-bold text-slate-200 mb-2 tracking-wide">Daily Insights</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Daily insights for your sign — patterns and suggestions for self-reflection across life domains.</p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-semibold text-sm">Free</span>
            </div>
          </Link>

          <Link href="/divination" className="group bg-[#0d1117]/80 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-amber-500/40 p-7 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400/20 to-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">🔮</div>
            <h3 className="text-lg font-bold text-slate-200 mb-2 tracking-wide">I Ching Wisdom</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Classical hexagram wisdom for modern reflection — sixty-four patterns for thoughtful decision-making.</p>
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-semibold text-sm">$3.99</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-[#0d1117]/50 border-y border-slate-800/50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-amber-500/60 text-xs tracking-[0.3em] uppercase mb-4">The Difference</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-200">Why Choose Aether</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '📜', title: 'Classical Foundation', desc: 'Rooted in the Yuan Hai Zi Ping, the Di Tian Sui, the Qiong Tong Bao Jian — three thousand years of cultural wisdom for your reflection.' },
              { icon: '⚙️', title: 'Precision by Design', desc: 'Our lunar algorithms draw from the lunar-javascript library, refined by cultural scholars and validated against historical references.' },
              { icon: '🤖', title: 'Intelligence, Augmented', desc: 'Decades of cultural expertise, enhanced by Qwen 72B AI — comprehensive analysis no single source can match.' },
              { icon: '🔒', title: 'Your Secrets, Sacred', desc: 'End-to-end encryption. Your birth data never leaves our protected environment. Not sold, not shared, not remembered.' },
              { icon: '⚡', title: 'Always at Hand', desc: 'A complete analysis in moments. Ancient wisdom; modern accessibility.' },
              { icon: '💰', title: 'Honest Exchange', desc: 'Transparent rates. PayPal secured. No subscriptions, no hidden fees. Pay only for the reports you choose.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 bg-[#0a0a0f]/50 rounded-xl p-5 border border-slate-800/60 hover:border-amber-500/20 transition-colors">
                <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="text-slate-200 font-semibold mb-1 tracking-wide">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-4">The stars are already written.</h2>
          <p className="text-slate-500 mb-8 text-lg">It is only a question of learning to read them.</p>
          <Link href="/consult" className="inline-flex items-center gap-3 border border-amber-500/50 text-amber-300 hover:bg-amber-500/10 font-semibold px-10 py-4 rounded-full transition-all tracking-wide">
            Begin Your Journey
            <span className="text-amber-400">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-[#0a0a0f] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#0a0a0f] font-bold text-sm">Æ</div>
                <span className="text-amber-300 font-bold text-lg tracking-[0.2em] uppercase">Aether</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">Personal insights through cultural wisdom — for thoughtful self-reflection.</p>
            </div>
            <div>
              <h4 className="text-slate-400 font-semibold mb-4 text-sm tracking-wider uppercase">Readings</h4>
              <ul className="space-y-2.5">
                <li><Link href="/consult" className="text-slate-600 hover:text-amber-400 transition-colors text-sm">Four Pillars</Link></li>
                <li><Link href="/compass" className="text-slate-600 hover:text-amber-400 transition-colors text-sm">Space Harmony</Link></li>
                <li><Link href="/horoscope" className="text-slate-600 hover:text-amber-400 transition-colors text-sm">Daily Insights</Link></li>
                <li><Link href="/divination" className="text-slate-600 hover:text-amber-400 transition-colors text-sm">I Ching Wisdom</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-400 font-semibold mb-4 text-sm tracking-wider uppercase">Company</h4>
              <ul className="space-y-2.5">
                <li><Link href="#" className="text-slate-600 hover:text-amber-400 transition-colors text-sm">About Aether</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-amber-400 transition-colors text-sm">Terms of Service</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-amber-400 transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-amber-400 transition-colors text-sm">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-400 font-semibold mb-4 text-sm tracking-wider uppercase">Connect</h4>
              <ul className="space-y-2.5">
                <li className="text-slate-600 text-sm">Telegram: @AetherReadings</li>
                <li className="text-slate-600 text-sm">Email: hello@aether.insights</li>
                <li className="text-slate-600 text-sm">WeChat: AetherOfficial</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/60 pt-8 text-center">
            <p className="text-slate-700 text-sm">© 2026 Aether Insights. All reports are for entertainment and self-reflection purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
