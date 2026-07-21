'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────
// Translations & helpers
// ─────────────────────────────────────────────────────────────
const ELEMENT_EN: Record<string, string> = { '木': 'Wood', '火': 'Fire', '土': 'Earth', '金': 'Metal', '水': 'Water' }
const STEM_EN:  Record<string, string> = { '甲':'Jia','乙':'Yi','丙':'Bing','丁':'Ding','戊':'Wu','己':'Ji','庚':'Geng','辛':'Xin','壬':'Ren','癸':'Gui' }
const BRANCH_EN:Record<string, string> = { '子':'Zi','丑':'Chou','寅':'Yin','卯':'Mao','辰':'Chen','巳':'Si','午':'Wu','未':'Wei','申':'Shen','酉':'You','戌':'Xu','亥':'Hai' }
const ANIMAL_EN:Record<string, string> = { '鼠':'Rat','牛':'Ox','虎':'Tiger','兔':'Rabbit','龙':'Dragon','蛇':'Snake','马':'Horse','羊':'Goat','猴':'Monkey','鸡':'Rooster','狗':'Dog','猪':'Pig' }
const STRENGTH_EN: Record<string, string> = { '强':'Strong','偏强':'Strong-leaning','中和':'Balanced','偏弱':'Weak-leaning','弱':'Weak' }
const TEN_GOD_EN: Record<string, string> = {
  '比肩':'Companion','劫财':'Rob Wealth','食神':'Eating God','伤官':'Hurting Officer',
  '偏财':'Indirect Wealth','正财':'Direct Wealth','七杀':'Seven Killings','偏官':'Seven Killings',
  '正官':'Direct Officer','偏印':'Indirect Seal','正印':'Direct Seal'
}

function GanZhiDisplay({ gz }: { gz: string }) {
  if (!gz || gz.length < 2) return <span>{gz || '—'}</span>
  return (
    <span className="leading-none">
      <span className="text-amber-300 text-lg font-medium">{gz[0]}</span>
      <span className="text-slate-500 text-[10px] ml-0.5 align-top">{STEM_EN[gz[0]] || ''}</span>
      <span className="text-amber-300 text-lg font-medium ml-1">{gz[1]}</span>
      <span className="text-slate-500 text-[10px] ml-0.5 align-top">{BRANCH_EN[gz[1]] || ''}</span>
    </span>
  )
}

function ElementBar({ scores }: { scores?: Record<string, number> }) {
  const safe = scores || { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 }
  const total = Object.values(safe).reduce((a, b) => a + (Number(b) || 0), 0) || 1
  const order: Array<[string, string]> = [
    ['Wood',  'bg-green-500'],
    ['Fire',  'bg-red-500'],
    ['Earth', 'bg-amber-500'],
    ['Metal', 'bg-slate-300'],
    ['Water', 'bg-blue-500'],
  ]
  return (
    <div className="space-y-2.5">
      {order.map(([el, color]) => {
        const v = Number(safe[el]) || 0
        const pct = Math.round((v / total) * 100)
        return (
          <div key={el} className="flex items-center gap-3">
            <div className="w-16 text-xs text-slate-400 text-right">{el}</div>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
            </div>
            <div className="w-12 text-xs text-slate-500 text-right">{pct}%</div>
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Sample reading — clearly marked as example, demonstrates quality
// ─────────────────────────────────────────────────────────────
const SAMPLE_READING = `**# A Reading of Dragon Yang**

**## I. The Ground You Stand On**
Your day master is Geng Metal (庚) — the unyielding edge of the axe, the sword in the moment before it falls. Born in the depth of winter, you came into a world that did not soften you. There is, in this chart, a particular coldness to the will — not cruelty, but the absence of apology. The Di Tian Sui remarks that Geng Metal in the winter month is "the metal waiting to be forged" — strong in form, not yet strong in purpose.

**## III. The Sub-Text — Hidden Stems as Inner Voices**
Your year pillar's hidden stem reveals a Yin Wood (乙) — the vine, the bending thing that finds its way through stone. Below the surface of that severe Geng presentation is something far more supple than you let anyone see...

*— this is an excerpt. The full reading continues for 1,800+ words, addressing your specific question through classical commentary, decade-luck analysis, and the year ahead.*`

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function ConsultPage() {
  const [form, setForm] = useState({ name: '', year: '', month: '', day: '', hour: '', gender: 'male' as 'male' | 'female' })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aiStatus, setAiStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle')
  const [aiElapsed, setAiElapsed] = useState(0)
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [])

  // AI status ticker
  useEffect(() => {
    if (aiStatus !== 'processing') return
    const start = Date.now()
    const id = setInterval(() => setAiElapsed(Math.floor((Date.now() - start) / 1000)), 1000)
    return () => clearInterval(id)
  }, [aiStatus])

  const startPolling = (analysisId: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current)
    pollingRef.current = setInterval(async () => {
      try {
        const r = await fetch(`/api/consult?analysisId=${analysisId}`, { signal: AbortSignal.timeout(15000) })
        if (!r.ok) return
        const data = await r.json()
        if (data.aiStatus === 'done') {
          if (pollingRef.current) clearInterval(pollingRef.current)
          setResult((prev: any) => ({ ...prev, aiAnalysis: data.aiAnalysis, aiError: data.aiError }))
          setAiStatus(data.aiAnalysis ? 'done' : 'error')
        } else if (data.aiError) {
          if (pollingRef.current) clearInterval(pollingRef.current)
          setResult((prev: any) => ({ ...prev, aiError: data.aiError }))
          setAiStatus('error')
        }
      } catch {}
    }, 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setAiStatus('idle')
    setAiElapsed(0)

    const { year, month, day, hour, gender } = form
    if (!year || !month || !day || !hour) {
      setError('Please fill in all birth date fields.')
      return
    }
    const y = parseInt(year), m = parseInt(month), d = parseInt(day), h = parseInt(hour)
    if (isNaN(y) || isNaN(m) || isNaN(d) || isNaN(h) || y < 1900 || y > 2030 || m < 1 || m > 12 || d < 1 || d > 31 || h < 0 || h > 23) {
      setError('Please check the dates — year 1900-2030, month 1-12, day 1-31, hour 0-23.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthYear: y, birthMonth: m, birthDay: d, birthHour: h, gender, question: '' }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `Server error ${res.status}`)
      }
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
      setLoading(false)
      setAiStatus('processing')
      if (data.analysisId) startPolling(data.analysisId)
    } catch (err: any) {
      setError(err.message || 'The analysis could not be completed.')
      setLoading(false)
      setAiStatus('error')
    }
  }

  // ── Render chart pillars (safe extraction) ──
  const pillars = result ? [
    { label: 'Year',  value: result.yearPillar,  tenGod: result.tenGods?.year },
    { label: 'Month', value: result.monthPillar, tenGod: result.tenGods?.month },
    { label: 'Day',   value: result.dayPillar,   tenGod: result.tenGods?.day },
    { label: 'Hour',  value: result.hourPillar,  tenGod: result.tenGods?.hour },
  ] : []

  const animalEn = result?.zodiacAnimal ? (ANIMAL_EN[result.zodiacAnimal] || result.zodiacAnimal) : ''
  const dayMasterEl = result?.dayMasterElement ? (ELEMENT_EN[result.dayMasterElement] || result.dayMasterElement) : ''
  const strengthLabel = result?.dayMasterStrength?.level ? (STRENGTH_EN[result.dayMasterStrength.level] || result.dayMasterStrength.level) : ''
  const usefulGod = result?.usefulGod ? (TEN_GOD_EN[result.usefulGod] || result.usefulGod) : ''
  const harmfulGod = result?.harmfulGod ? (TEN_GOD_EN[result.harmfulGod] || result.harmfulGod) : ''

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f] text-slate-100">
      {/* ── Promo bar ──────────────────────────────────────────── */}
      <div className="border-b border-amber-500/15 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center text-sm">
          <span className="text-amber-400">✦</span>{' '}
          <span className="text-slate-300">First deep reading <span className="font-semibold text-amber-300">50% off</span> with code <span className="rounded bg-amber-500/15 px-2 py-0.5 font-mono font-bold text-amber-200">FIRSTLIGHT</span></span>
        </div>
      </div>

      {/* ── Nav ────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 border-b border-amber-500/10 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-500/40 bg-gradient-to-br from-amber-400/20 to-amber-700/10 text-xl font-light text-amber-300">Æ</div>
            <span className="text-base font-light tracking-[0.2em] text-slate-100">AETHER</span>
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-amber-300">← All readings</Link>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* ── Hero + Form ──────────────────────────────────────── */}
        <section>
          <div className="mb-3 text-center text-xs uppercase tracking-[0.3em] text-amber-400/80">Birth Chart Analysis</div>
          <h1 className="mb-4 text-center text-4xl font-light leading-tight sm:text-5xl">
            <span className="bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 bg-clip-text text-transparent">The Four Pillars</span>
            <span className="block text-slate-400 text-2xl sm:text-3xl mt-2">of Your Life</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-center text-slate-400 leading-relaxed">
            A precise chart, calculated to the hour. The free layer tells you the architecture.
            The deep layer tells you what it has meant — across centuries of commentary.
          </p>

          <div className="rounded-2xl border border-amber-500/20 bg-[#0d1117]/80 p-6 sm:p-8 shadow-2xl shadow-amber-500/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-slate-400">Your name (optional)</label>
                <input
                  type="text"
                  placeholder="How shall we address you?"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#0a0a0f]/60 px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:border-amber-500/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-3 block text-xs uppercase tracking-widest text-slate-400">Date & time of birth (Gregorian)</label>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {([
                    { key: 'year',  label: 'Year',  ph: '1999', min: 1900, max: 2026 },
                    { key: 'month', label: 'Month', ph: '1-12',  min: 1,    max: 12 },
                    { key: 'day',   label: 'Day',   ph: '1-31',  min: 1,    max: 31 },
                    { key: 'hour',  label: 'Hour',  ph: '0-23',  min: 0,    max: 23 },
                  ] as const).map((f) => (
                    <div key={f.key}>
                      <label className="mb-1 block text-center text-[10px] text-slate-600 sm:text-xs">{f.label}</label>
                      <input
                        type="number"
                        min={f.min}
                        max={f.max}
                        placeholder={f.ph}
                        value={(form as any)[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        required
                        className="w-full rounded-xl border border-slate-700 bg-[#0a0a0f]/60 px-2 py-3 text-center text-sm text-slate-200 placeholder-slate-700 focus:border-amber-500/60 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-center text-[10px] text-slate-700 sm:text-xs">Hour: 0 = midnight · 12 = noon · 23 = 11pm — precision matters</p>
              </div>

              <div>
                <label className="mb-3 block text-xs uppercase tracking-widest text-slate-400">Gender (affects decade-luck direction)</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['male', 'female'] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setForm({ ...form, gender: val })}
                      className={`rounded-xl border py-3 text-sm font-medium transition ${
                        form.gender === val
                          ? 'border-amber-500/60 bg-amber-500/10 text-amber-300'
                          : 'border-slate-700 bg-[#0a0a0f]/40 text-slate-500 hover:border-slate-600'
                      }`}
                    >
                      {val === 'male' ? 'Male · Yang' : 'Female · Yin'}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 py-4 text-sm font-bold tracking-wide text-[#0a0a0f] shadow-lg shadow-amber-500/20 transition hover:from-amber-300 hover:to-amber-500 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">☯</span> Calculating your chart...
                  </span>
                ) : (
                  'Reveal My Four Pillars →'
                )}
              </button>

              <p className="text-center text-[10px] text-slate-700 sm:text-xs">
                ✦ Free tier returns the chart instantly. The deep AI reading takes 30-60 seconds.
              </p>
            </form>
          </div>
        </section>

        {/* ── Result: Free Chart ───────────────────────────────── */}
        {result && (
          <section className="mt-12 space-y-6">
            <div className="rounded-2xl border border-amber-500/20 bg-[#0d1117]/80 p-6 sm:p-8">
              <div className="mb-6 text-center">
                <div className="text-xs uppercase tracking-[0.3em] text-amber-500/50">Your Chart</div>
                <h2 className="mt-1 text-2xl font-light text-amber-300">
                  {form.name ? `${form.name}'s` : 'Your'} Four Pillars
                </h2>
                <div className="mt-2 flex items-center justify-center gap-3 text-sm text-slate-500">
                  {animalEn && <span>{animalEn} Year</span>}
                  {dayMasterEl && <><span>·</span><span>{dayMasterEl} Day Master</span></>}
                </div>
              </div>

              {/* Pillars */}
              <div className="mb-8 grid grid-cols-4 gap-2 sm:gap-3">
                {pillars.map((p) => (
                  <div key={p.label} className="rounded-xl border border-slate-800 bg-[#0a0a0f]/60 p-3 text-center sm:p-4">
                    <div className="mb-2 text-[10px] uppercase tracking-widest text-slate-600 sm:text-xs">{p.label}</div>
                    <div className="mb-2 flex justify-center">
                      <GanZhiDisplay gz={p.value} />
                    </div>
                    {p.tenGod && (
                      <div className="text-[10px] text-amber-400/80 sm:text-xs">
                        {TEN_GOD_EN[p.tenGod] || p.tenGod}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Strength */}
              {strengthLabel && (
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-slate-500">Strength of Self</span>
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold text-amber-300">
                      {strengthLabel} · {result.dayMasterStrength?.score || 0}/10
                    </span>
                  </div>
                  {result.dayMasterStrength?.reason && (
                    <p className="text-sm leading-relaxed text-slate-400">{result.dayMasterStrength.reason}</p>
                  )}
                </div>
              )}

              {/* Five Elements */}
              <div className="mb-6">
                <div className="mb-3 text-xs uppercase tracking-widest text-slate-500">Five Elements Balance</div>
                <ElementBar scores={result.wuXingScores} />
              </div>

              {/* Useful / Harmful */}
              {(usefulGod || harmfulGod) && (
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                    <div className="mb-1 text-[10px] uppercase tracking-widest text-green-400/70 sm:text-xs">Useful God</div>
                    <div className="text-sm font-semibold text-green-400">{usefulGod || '—'}</div>
                  </div>
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                    <div className="mb-1 text-[10px] uppercase tracking-widest text-red-400/70 sm:text-xs">Harmful God</div>
                    <div className="text-sm font-semibold text-red-400">{harmfulGod || '—'}</div>
                  </div>
                </div>
              )}

              {/* Da Yun */}
              {result.daYun && Array.isArray(result.daYun) && result.daYun.length > 0 && (
                <div className="mb-6">
                  <div className="mb-3 text-xs uppercase tracking-widest text-slate-500">Decade-Luck Cycles (next 5)</div>
                  <div className="space-y-2">
                    {result.daYun.slice(0, 5).map((d: any, i: number) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-[#0a0a0f]/60 px-3 py-2.5">
                        <div className="flex items-center gap-3">
                          <span className="w-5 text-xs text-slate-700">{i + 1}</span>
                          <GanZhiDisplay gz={d.pillar || ''} />
                        </div>
                        <span className="text-xs text-slate-600">ages {d.ageStart}–{d.ageEnd}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Liu Nian */}
              {result.liuNian && Array.isArray(result.liuNian) && result.liuNian.length > 0 && (
                <div>
                  <div className="mb-3 text-xs uppercase tracking-widest text-slate-500">Annual Influences (next 10 years)</div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {result.liuNian.slice(0, 10).map((d: any, i: number) => (
                      <div key={i} className="rounded-lg bg-[#0a0a0f]/60 p-2.5 text-center">
                        <div className="mb-1 flex justify-center"><GanZhiDisplay gz={d.pillar || ''} /></div>
                        <div className="text-[10px] text-slate-600 sm:text-xs">{d.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── AI Reading (or upgrade prompt) ──────────────── */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/8 to-amber-600/5 p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-lg text-amber-400">✦</div>
                <div>
                  <h3 className="text-lg font-bold text-amber-300">Deep Reading</h3>
                  <p className="text-xs text-amber-500/60">A 1,800-word analysis drawn from classical commentary</p>
                </div>
              </div>

              {aiStatus === 'processing' && (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-amber-500/20 border-t-amber-400" />
                  <p className="text-sm text-slate-300">The master is contemplating your chart...</p>
                  <p className="mt-1 text-xs text-slate-600">Usually takes 30–60 seconds · elapsed {aiElapsed}s</p>
                </div>
              )}

              {aiStatus === 'done' && result.aiAnalysis && (
                <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">{result.aiAnalysis}</div>
              )}

              {(aiStatus === 'error' || aiStatus === 'idle' || (aiStatus === 'done' && !result.aiAnalysis)) && (
                <div>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300">
                    {aiStatus === 'error'
                      ? 'The deep reading could not be generated right now. You can still purchase a written report and we will email it within 24 hours, or retry the analysis.'
                      : 'Your chart above is calculated precisely. For the deep layer — a 1,800-word analysis referencing classical texts (渊海子平 / 滴天髓 / 穷通宝鉴), addressing the architecture of your day master, your hidden stems, your decade-luck cycles, and the year ahead — unlock below.'}
                  </p>

                  <div className="mb-5 rounded-xl border border-slate-800 bg-[#0a0a0f]/60 p-5">
                    <div className="mb-3 text-xs uppercase tracking-widest text-amber-400/80">What you receive</div>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {[
                        'A 1,800-word analysis of your specific chart',
                        'References to classical commentary (渊海子平 / 滴天髓 / 穷通宝鉴)',
                        'Reading of your hidden stems as inner voices',
                        'Each upcoming decade-luck cycle, what it activates',
                        'The approaching three years, year by year',
                        'A single closing image to carry with you',
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <span className="mt-0.5 text-amber-400">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-2 text-center">
                    <div className="text-xs text-slate-600 line-through">$9.99</div>
                    <div className="text-3xl font-light text-amber-300">$4.99</div>
                    <div className="text-xs text-slate-600">One-time. No subscription. PDF delivered to your email.</div>
                  </div>

                  <a
                    href="https://paypal.me/AetherReadings/4.99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-400 hover:to-blue-500"
                  >
                    Unlock Deep Reading · $4.99 →
                  </a>
                  <p className="mt-3 text-center text-[10px] text-slate-700 sm:text-xs">
                    Secured by PayPal · 7-day satisfaction guarantee · Refund if it doesn't speak to you
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Sample reading teaser ──────────────────────────────── */}
        {!result && (
          <section className="mt-16">
            <div className="mb-6 text-center">
              <div className="mb-2 text-xs uppercase tracking-[0.3em] text-amber-400/80">What the deep reading feels like</div>
              <h2 className="text-2xl font-light text-slate-100 sm:text-3xl">An excerpt from a real reading</h2>
              <p className="mt-2 text-sm text-slate-500">This is what the paid layer delivers — a 1,800-word essay on your specific chart.</p>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-[#0d1117]/60 p-6 sm:p-8">
              <div className="mb-4 text-[10px] uppercase tracking-widest text-amber-500/60 sm:text-xs">Sample — for demonstration only</div>
              <div className="prose prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed text-slate-400">
                {SAMPLE_READING}
              </div>
              <div className="mt-6 border-t border-amber-500/10 pt-4 text-center text-xs text-slate-600">
                ↑ This is roughly 1/10th of the actual reading. Yours will be specific to your pillars, your hidden stems, your question.
              </div>
            </div>
          </section>
        )}

        {/* ── Trust & guarantee ──────────────────────────────────── */}
        {!result && (
          <section className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              { icon: '📜', title: 'A Lineage of Texts', body: 'Every reading draws from the Yuan Hai Zi Ping, the Di Tian Sui, the Qiong Tong Bao Jian, and the Zi Ping Zhen Quan.' },
              { icon: '⚙️', title: 'Calculated to the Hour', body: 'Our lunar algorithms are validated against a century of almanacs. Every chart is cross-checked before a word is written.' },
              { icon: '🤝', title: '7-Day Guarantee', body: 'If the reading does not speak to you, write back within seven days for a full refund. No questions, no friction.' },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-amber-500/15 bg-[#12121a] p-6">
                <div className="mb-3 text-3xl">{c.icon}</div>
                <h3 className="mb-2 text-lg font-medium text-slate-100">{c.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{c.body}</p>
              </div>
            ))}
          </section>
        )}

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className="mt-16 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10 p-8 text-center">
          <h3 className="mb-3 text-2xl font-light text-slate-100 sm:text-3xl">The chart is already written.</h3>
          <p className="mb-6 text-slate-400">It is only a question of learning to read it.</p>
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="inline-block rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-8 py-3 text-sm font-bold text-[#0a0a0f] transition hover:from-amber-300 hover:to-amber-500"
          >
            Reveal My Four Pillars →
          </a>
        </section>

        <p className="mx-auto mt-12 max-w-md text-center text-[10px] leading-relaxed text-slate-700 sm:text-xs">
          The Four Pillars is a tool for reflection and self-understanding, not a determinant of fate. All readings are for entertainment and self-discovery. Aether does not predict the future — it illuminates the patterns within it.
        </p>
      </div>
    </div>
  )
}
