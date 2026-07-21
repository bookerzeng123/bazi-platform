import Link from 'next/link'

export const metadata = {
  title: 'Aether — Personal Insights Through Ancient Wisdom',
}

const categories = [
  { slug: '/consult',    icon: '☯', name: 'Four Pillars',         tag: 'Most Sought', price: '$5.99', live: true,  blurb: 'The precise architecture of your birth moment, decoded through stems, branches, and the cycles of time.' },
  { slug: '/compass',    icon: '🧭', name: 'Space Harmony',        tag: 'New',         price: 'Free',  live: true,  blurb: 'Twenty-four mountains, nine palaces — align your space with the geometry of the earth.' },
  { slug: '/horoscope',  icon: '✦',  name: 'Stellar Reflections',  tag: 'Daily',       price: 'Free',  live: true,  blurb: 'A daily reading of the celestial weather — love, work, wealth, and health, calibrated to the heavens.' },
  { slug: '/divination', icon: '🔮', name: 'I Ching Wisdom',        tag: 'Classic',     price: '$3.99', live: true,  blurb: 'Cast the coins. Sixty-four hexagrams distilled from three thousand years of contemplation.' },
  { slug: '#',           icon: '🌙', name: 'Dream Cartography',    tag: 'Soon',        price: '—',     live: false, blurb: 'Map the symbols your sleeping mind offers — a gentle practice of inner listening.' },
  { slug: '#',           icon: '🔢', name: 'Life Path Numbers',    tag: 'Soon',        price: '—',     live: false, blurb: 'The numerological patterns that echo through your dates, names, and turning points.' },
  { slug: '#',           icon: '🪬', name: 'Relationship Mirror',  tag: 'Soon',        price: '—',     live: false, blurb: 'Reflect on the patterns between you and another — through the lens of elemental compatibility.' },
  { slug: '#',           icon: '📜', name: 'Annual Cycle',         tag: 'Soon',        price: '—',     live: false, blurb: 'A long-form reflection on the year ahead — its textures, its invitations, its quiet warnings.' },
]

const modes = [
  {
    initial: 'C',
    name: 'The Classic',
    sub: 'Lineage of the Yuan Hai Zi Ping',
    rating: '4.9',
    readings: '128,402',
    intro: 'A traditional voice — slow, careful, weighted with the authority of three thousand years of commentary.',
    price: '$5.99',
    badge: 'Most chosen',
    color: 'from-amber-500/20 to-amber-700/10',
  },
  {
    initial: 'R',
    name: 'The Reflective',
    sub: 'Modern philosophical lens',
    rating: '4.8',
    readings: '94,201',
    intro: 'A contemporary voice — reframing classical patterns in the language of psychology, choices, and self-knowledge.',
    price: '$4.99',
    badge: 'Popular',
    color: 'from-rose-500/20 to-rose-700/10',
  },
  {
    initial: 'P',
    name: 'The Poetic',
    sub: 'Literary, imagistic, slow',
    rating: '4.9',
    readings: '67,118',
    intro: 'A lyrical voice — speaking in metaphor, paradox, and the long sentences of contemplation.',
    price: '$4.99',
    badge: 'For writers',
    color: 'from-violet-500/20 to-violet-700/10',
  },
  {
    initial: 'A',
    name: 'The Practical',
    sub: 'Grounded, actionable',
    rating: '4.7',
    readings: '52,889',
    intro: 'A direct voice — translating patterns into specific suggestions for the week, the meeting, the conversation.',
    price: '$3.99',
    badge: 'For doers',
    color: 'from-emerald-500/20 to-emerald-700/10',
  },
]

const trust = [
  {
    icon: '📜',
    title: 'A Lineage of Texts',
    body: 'Every reading draws from the Yuan Hai Zi Ping, the Di Tian Sui, the Qiong Tong Bao Jian — three thousand years of contemplation, distilled into language a modern reader can hold.',
  },
  {
    icon: '⚙️',
    title: 'Precision by Design',
    body: 'Our lunar algorithms are validated against a century of almanacs. Every chart is cross-checked before a single word of interpretation is written.',
  },
  {
    icon: '🤝',
    title: 'An Honest Exchange',
    body: 'No subscriptions. No upsells. No claims that a chart can predict a person. You pay once for one reading — and we tell you plainly what these traditions can and cannot do.',
  },
]

const testimonials = [
  {
    quote: '"I came in skeptical. I left with a new way of thinking about a year that had been hard to name. The framing of the Five Elements gave me language I didn\'t have before."',
    name: '— A reader, Singapore',
  },
  {
    quote: '"What I appreciated most was the honesty. It didn\'t tell me what would happen. It told me what the old patterns suggest — and left the rest to me. That felt respectful."',
    name: '— A reader, Toronto',
  },
  {
    quote: '"The hexagram I drew turned out to be the one I needed to sit with that week. I\'ve come back three times. Each time, something lands differently."',
    name: '— A reader, Berlin',
  },
]

const articles = [
  { tag: 'On the Four Pillars', title: 'What the Year Pillar Actually Tells You', read: '6 min' },
  { tag: 'On Space',            title: 'Why the Front Door Matters More Than the Bedroom', read: '5 min' },
  { tag: 'On the Stars',        title: 'A Quiet Defense of Sun-Sign Astrology',     read: '7 min' },
  { tag: 'On the Hexagrams',    title: 'The 64 as a Practice, Not a Prediction',   read: '8 min' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-amber-500/30">
      {/* ── 1. Top promo bar ─────────────────────────────────────── */}
      <div className="border-b border-amber-500/15 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center text-sm">
          <span className="text-amber-400">✦</span>
          <span className="text-slate-300">
            First reading <span className="font-semibold text-amber-300">50% off</span> with code{' '}
            <span className="rounded bg-amber-500/15 px-2 py-0.5 font-mono font-bold text-amber-200">FIRSTLIGHT</span>
          </span>
          <Link href="/consult" className="hidden text-amber-400 underline-offset-2 hover:underline sm:inline">
            Claim →
          </Link>
        </div>
      </div>

      {/* ── 2. Sticky navigation ────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-amber-500/10 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-500/40 bg-gradient-to-br from-amber-400/20 to-amber-700/10 text-xl font-light text-amber-300">
              Æ
            </div>
            <span className="text-lg font-light tracking-[0.2em] text-slate-100">AETHER</span>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
            <Link href="/consult"    className="hover:text-amber-300">Four Pillars</Link>
            <Link href="/compass"    className="hover:text-amber-300">Space Harmony</Link>
            <Link href="/horoscope"  className="hover:text-amber-300">Stellar</Link>
            <Link href="/divination" className="hover:text-amber-300">I Ching</Link>
            <a href="#articles"      className="hover:text-amber-300">Journal</a>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <button className="hidden text-slate-300 hover:text-amber-300 sm:inline">Sign in</button>
            <Link
              href="/consult"
              className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 font-medium text-amber-200 transition hover:bg-amber-500/20"
            >
              Begin
            </Link>
          </div>
        </div>
      </nav>

      {/* ── 3. Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* glows */}
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-rose-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-amber-300">
            <span>Ancient Wisdom</span>
            <span className="h-1 w-1 rounded-full bg-amber-400" />
            <span>Modern Intelligence</span>
          </div>

          <h1 className="mb-6 text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl">
            <span className="block bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 bg-clip-text text-transparent">
              The Quiet Art
            </span>
            <span className="mt-2 block text-slate-300">of Knowing Yourself</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            A reading of the architecture of your life — drawn from the Four Pillars, the geometry of space, and the
            old hexagrams. Not destiny as it is told. <span className="text-slate-300">Patterns as they are understood.</span>
          </p>

          {/* search bar */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-amber-500/20 bg-[#12121a]/80 p-2 shadow-2xl shadow-amber-500/5 backdrop-blur">
            <div className="flex flex-col items-stretch gap-2 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-[#0a0a0f] px-4 py-3">
                <span className="text-amber-400">✦</span>
                <input
                  type="text"
                  placeholder="Enter your birth date — e.g. 1995-03-21"
                  className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
              <select className="rounded-xl border border-amber-500/20 bg-[#0a0a0f] px-4 py-3 text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500/40">
                <option>Four Pillars</option>
                <option>Space Harmony</option>
                <option>Stellar Reflections</option>
                <option>I Ching</option>
              </select>
              <Link
                href="/consult"
                className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3 text-center font-semibold text-[#0a0a0f] transition hover:from-amber-300 hover:to-amber-500"
              >
                Begin →
              </Link>
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            ✦ First reading half-price · No subscription · For entertainment and self-discovery
          </p>
        </div>

        {/* stats strip */}
        <div className="relative border-y border-amber-500/10 bg-[#0e0e16]/60">
          <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-amber-500/10 px-4 py-6 text-center">
            <div>
              <div className="text-2xl font-light text-amber-300 sm:text-3xl">342K+</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">Souls Illuminated</div>
            </div>
            <div>
              <div className="text-2xl font-light text-amber-300 sm:text-3xl">98%</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">Chart Precision</div>
            </div>
            <div>
              <div className="text-2xl font-light text-amber-300 sm:text-3xl">4.9 ★</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">Across All Readings</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Categories grid (Kasamba signature) ──────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400/80">The Traditions</p>
          <h2 className="text-3xl font-light text-slate-100 sm:text-4xl">Eight Lenses, One Practice</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Each tradition offers a different angle on the same inquiry. Begin with what calls to you.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => {
            const Card = (
              <div
                className={`group relative h-full rounded-2xl border border-amber-500/15 bg-gradient-to-br from-[#12121a] to-[#0e0e16] p-6 transition ${
                  c.live ? 'hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5' : 'opacity-60'
                }`}
              >
                {c.tag && (
                  <span
                    className={`absolute right-4 top-4 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                      c.tag === 'Most Sought'
                        ? 'bg-amber-500/20 text-amber-300'
                        : c.tag === 'Soon'
                        ? 'bg-slate-700/50 text-slate-500'
                        : 'bg-rose-500/15 text-rose-300'
                    }`}
                  >
                    {c.tag}
                  </span>
                )}

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/5 text-2xl">
                  {c.icon}
                </div>
                <h3 className="mb-1 text-lg font-medium text-slate-100">{c.name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-400">{c.blurb}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-amber-300">{c.price}</span>
                  <span className={c.live ? 'text-amber-400 group-hover:translate-x-1 transition' : 'text-slate-600'}>
                    {c.live ? 'Explore →' : 'Soon'}
                  </span>
                </div>
              </div>
            )

            return c.live ? (
              <Link key={c.name} href={c.slug}>{Card}</Link>
            ) : (
              <div key={c.name}>{Card}</div>
            )
          })}
        </div>
      </section>

      {/* ── 5. Featured insight modes (replaces fake advisors) ──── */}
      <section className="border-y border-amber-500/10 bg-[#0e0e16] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-3 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400/80">The Modes</p>
            <h2 className="text-3xl font-light text-slate-100 sm:text-4xl">Four Voices, One Chart</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Each reading is shaped by a different sensibility. Choose the one that matches the moment — or read all four and notice what changes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {modes.map((m) => (
              <div
                key={m.name}
                className={`relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br ${m.color} p-6 transition hover:border-amber-500/40`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-400/40 bg-[#0a0a0f] text-2xl font-light text-amber-300">
                    {m.initial}
                  </div>
                  <div className="rounded-full border border-amber-500/20 bg-[#0a0a0f]/50 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-300">
                    {m.badge}
                  </div>
                </div>

                <h3 className="text-lg font-medium text-slate-100">{m.name}</h3>
                <p className="mt-0.5 text-xs italic text-amber-300/80">{m.sub}</p>

                <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="text-slate-200">{m.rating}</span>
                  </span>
                  <span className="text-slate-600">·</span>
                  <span>{m.readings} readings</span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">{m.intro}</p>

                <div className="mt-5 flex items-center justify-between border-t border-amber-500/10 pt-4">
                  <span className="text-lg font-semibold text-amber-300">{m.price}</span>
                  <Link
                    href="/consult"
                    className="rounded-full border border-amber-500/40 px-3 py-1 text-xs uppercase tracking-wider text-amber-200 transition hover:bg-amber-500/10"
                  >
                    Try this voice →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-slate-500">
            A note on honesty — the modes are not different people. They are different framings of a single intelligence,
            each shaped by a particular tradition. You will always know which one is speaking.
          </p>
        </div>
      </section>

      {/* ── 6. Trust three-column ───────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400/80">Why Aether</p>
          <h2 className="text-3xl font-light text-slate-100 sm:text-4xl">What We Will and Will Not Promise</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {trust.map((t) => (
            <div key={t.title} className="rounded-2xl border border-amber-500/15 bg-[#12121a] p-8">
              <div className="mb-4 text-4xl">{t.icon}</div>
              <h3 className="mb-3 text-xl font-medium text-slate-100">{t.title}</h3>
              <p className="leading-relaxed text-slate-400">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. About long-form ──────────────────────────────────── */}
      <section className="border-y border-amber-500/10 bg-gradient-to-b from-[#0e0e16] to-[#0a0a0f] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400/80">About Aether</p>
          <h2 className="mb-8 text-3xl font-light text-slate-100 sm:text-4xl">A Practice, Not a Prediction</h2>
          <div className="space-y-5 text-left text-slate-300 sm:text-lg leading-relaxed">
            <p>
              Aether began with a simple question. <em>What if the old frameworks — the Four Pillars, the I Ching,
              the geometry of space — were treated not as fortune-telling, but as a contemplative technology?</em> A
              way of paying attention to the patterns of a life, the way a poem pays attention to a season.
            </p>
            <p>
              We are not psychics. We are not predictors. We are a small group of engineers, translators, and readers
              who believe the classical Chinese tradition has something genuinely useful to offer modern self-knowledge —
              if it is presented honestly, with its limits clearly marked.
            </p>
            <p>
              Every reading is built in three layers. A precise algorithm calculates the chart. A curated knowledge
              base supplies the textual authority. A language model — trained on commentary, not on claims — renders the
              whole thing in language a modern reader can actually use.
            </p>
            <p>
              What we will tell you: the patterns the tradition sees, what they have meant for others, and the questions
              the chart is quietly asking of you. What we will not tell you: what will happen, when, and to whom. The
              old masters themselves were careful about this. We try to be careful too.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. Testimonials ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400/80">Reflections</p>
          <h2 className="text-3xl font-light text-slate-100 sm:text-4xl">From the People Who Have Read With Us</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border border-amber-500/15 bg-[#12121a] p-8">
              <div className="mb-4 text-amber-400">★★★★★</div>
              <p className="mb-6 text-slate-300 leading-relaxed">{t.quote}</p>
              <p className="text-sm text-slate-500">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Featured articles ────────────────────────────────── */}
      <section id="articles" className="border-t border-amber-500/10 bg-[#0e0e16] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400/80">The Journal</p>
              <h2 className="text-3xl font-light text-slate-100 sm:text-4xl">Long-Form Reading</h2>
            </div>
            <a href="#" className="hidden text-sm text-amber-400 hover:text-amber-300 sm:inline">
              All articles →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {articles.map((a, i) => (
              <article
                key={i}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-amber-500/15 bg-[#12121a] transition hover:border-amber-500/40"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-violet-500/10" />
                <div className="p-5">
                  <p className="mb-2 text-xs uppercase tracking-wider text-amber-400/80">{a.tag}</p>
                  <h3 className="mb-3 text-base font-medium leading-snug text-slate-100 group-hover:text-amber-300">
                    {a.title}
                  </h3>
                  <p className="text-xs text-slate-500">{a.read} read</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Final CTA banner ────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10" />
        <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-amber-500/20 blur-[100px]" />
        <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-rose-500/20 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-6 text-4xl font-light leading-tight text-slate-100 sm:text-5xl">
            The chart is already written.
            <br />
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              It is only a question of learning to read it.
            </span>
          </h2>
          <p className="mb-10 text-lg text-slate-400">
            First reading half-price. No subscription. Three minutes to a full chart.
          </p>
          <Link
            href="/consult"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-8 py-4 text-base font-semibold text-[#0a0a0f] transition hover:from-amber-300 hover:to-amber-500"
          >
            Begin the Reading →
          </Link>
        </div>
      </section>

      {/* ── 11. Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-amber-500/10 bg-[#08080d] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-lg font-light text-amber-300">
                  Æ
                </div>
                <span className="text-base font-light tracking-[0.2em]">AETHER</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Personal insights through the lens of classical Chinese wisdom. For entertainment and self-discovery.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">Readings</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/consult"    className="hover:text-amber-300">Four Pillars</Link></li>
                <li><Link href="/compass"    className="hover:text-amber-300">Space Harmony</Link></li>
                <li><Link href="/horoscope"  className="hover:text-amber-300">Stellar Reflections</Link></li>
                <li><Link href="/divination" className="hover:text-amber-300">I Ching Wisdom</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-amber-300">About</a></li>
                <li><a href="#" className="hover:text-amber-300">How we read</a></li>
                <li><a href="#" className="hover:text-amber-300">Terms</a></li>
                <li><a href="#" className="hover:text-amber-300">Privacy</a></li>
                <li><a href="#" className="hover:text-amber-300">Refund</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>Telegram: <span className="text-slate-400">@AetherReadings</span></li>
                <li>Email: <span className="text-slate-400">hello@aether.insights</span></li>
                <li>WeChat: <span className="text-slate-400">AetherOfficial</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-amber-500/10 pt-8 text-xs text-slate-600 sm:flex-row">
            <p>© 2026 Aether Insights. The stars were here long before us. They will remain long after.</p>
            <p>For entertainment and self-discovery. Not a substitute for professional advice.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
