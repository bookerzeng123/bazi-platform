'use client'

import { useState } from 'react'
import Link from 'next/link'

// Five elements translation
const ELEMENT_NAMES: Record<string, string> = {
  '木': 'Wood',
  '火': 'Fire',
  '土': 'Earth',
  '金': 'Metal',
  '水': 'Water',
}

const ELEMENT_COLORS: Record<string, string> = {
  Wood: 'text-green-400',
  Fire: 'text-red-400',
  Earth: 'text-amber-400',
  Metal: 'text-slate-300',
  Water: 'text-blue-400',
}

const ELEMENT_BG: Record<string, string> = {
  Wood: 'bg-green-400/10 border-green-400/30',
  Fire: 'bg-red-400/10 border-red-400/30',
  Earth: 'bg-amber-400/10 border-amber-400/30',
  Metal: 'bg-slate-400/10 border-slate-400/30',
  Water: 'bg-blue-400/10 border-blue-400/30',
}

const ELEMENT_ICONS: Record<string, string> = {
  Wood: '🌿',
  Fire: '🔥',
  Earth: '⛰',
  Metal: '⚪',
  Water: '🌊',
}

// Ten gods translation
const TEN_GODS_EN: Record<string, string> = {
  '比肩': 'Companion',
  '劫财': 'Rob Wealth',
  '食神': 'Eating God',
  '伤官': 'Hurting Officer',
  '偏财': 'Indirect Wealth',
  '正财': 'Direct Wealth',
  '七杀': 'Seven Killings',
  '偏官': 'Seven Killings',
  '正官': 'Direct Officer',
  '偏印': 'Indirect Seal',
  '正印': 'Direct Seal',
}

// Stem translations
const STEM_NAMES: Record<string, string> = {
  '甲': 'Jia', '乙': 'Yi', '丙': 'Bing', '丁': 'Ding', '戊': 'Wu',
  '己': 'Ji', '庚': 'Geng', '辛': 'Xin', '壬': 'Ren', '癸': 'Gui',
}

// Branch translations
const BRANCH_NAMES: Record<string, string> = {
  '子': 'Zi', '丑': 'Chou', '寅': 'Yin', '卯': 'Mao', '辰': 'Chen',
  '巳': 'Si', '午': 'Wu', '未': 'Wei', '申': 'Shen', '酉': 'You',
  '戌': 'Xu', '亥': 'Hai',
}

// Animal translations
const ANIMAL_NAMES: Record<string, string> = {
  '鼠': 'Rat', '牛': 'Ox', '虎': 'Tiger', '兔': 'Rabbit',
  '龙': 'Dragon', '蛇': 'Snake', '马': 'Horse', '羊': 'Goat',
  '猴': 'Monkey', '鸡': 'Rooster', '狗': 'Dog', '猪': 'Pig',
}

// Strength labels
const STRENGTH_LABELS: Record<string, { label: string; color: string }> = {
  'Strong': { label: 'Strong', color: 'text-green-400 bg-green-400/10 border border-green-400/30' },
  'Medium': { label: 'Balanced', color: 'text-amber-400 bg-amber-400/10 border border-amber-400/30' },
  'Weak': { label: 'Weak', color: 'text-red-400 bg-red-400/10 border border-red-400/30' },
}

function GanZhiLabel({ gz }: { gz: string }) {
  if (!gz || gz.length < 2) return <span>{gz}</span>
  const gan = gz[0]
  const zhi = gz[1]
  const stemEn = STEM_NAMES[gan] || gan
  const branchEn = BRANCH_NAMES[zhi] || zhi
  return (
    <span>
      <span className="text-amber-300">{gan}</span>
      <span className="text-slate-500 text-xs ml-0.5">{stemEn}</span>
      <span className="text-slate-400 mx-0.5">/</span>
      <span className="text-amber-300">{zhi}</span>
      <span className="text-slate-500 text-xs ml-0.5">{branchEn}</span>
    </span>
  )
}

function ElementBadge({ element }: { element: string }) {
  const en = ELEMENT_NAMES[element] || element
  return (
    <span className={`${ELEMENT_BG[en]} px-2 py-0.5 rounded text-xs font-medium ${ELEMENT_COLORS[en]}`}>
      {ELEMENT_ICONS[en]} {en}
    </span>
  )
}

function FiveElementBar({ scores }: { scores: Record<string, number> }) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1
  const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water']
  return (
    <div className="space-y-2">
      {elements.map((el) => {
        const pct = Math.round((scores[el] || 0) / total * 100)
        const barColor = el === 'Wood' ? 'bg-green-500' : el === 'Fire' ? 'bg-red-500' : el === 'Earth' ? 'bg-amber-500' : el === 'Metal' ? 'bg-slate-400' : 'bg-blue-500'
        return (
          <div key={el} className="flex items-center gap-3">
            <div className="w-14 text-xs text-slate-500 text-right">{ELEMENT_ICONS[el]} {el}</div>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }}/>
            </div>
            <div className="w-10 text-xs text-slate-500 text-right">{pct}%</div>
          </div>
        )
      })}
    </div>
  )
}

function StarRating({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`text-base ${n <= level ? 'text-amber-400' : 'text-slate-700'}`}>★</span>
      ))}
    </div>
  )
}

export default function ConsultPage() {
  const [form, setForm] = useState({ name: '', year: '', month: '', day: '', hour: '', gender: 'male' as string })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    const { year, month, day, hour, gender } = form
    if (!year || !month || !day || !hour) {
      setError('Please fill in all birth date fields.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(60000),
        body: JSON.stringify({
          birthYear: parseInt(year),
          birthMonth: parseInt(month),
          birthDay: parseInt(day),
          birthHour: parseInt(hour),
          gender,
          question: '',
        }),
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}`)
      }

      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('timeout')) {
        setError('Request timed out. Please try again.')
      } else {
        setError('The reading could not be completed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]">
      {/* Navigation */}
      <nav className="bg-[#0a0a0f]/80 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-[#0a0a0f] font-bold text-lg">Æ</div>
            <span className="text-amber-300 font-bold text-xl tracking-[0.2em] uppercase">Aether</span>
          </Link>
          <Link href="/" className="text-slate-500 hover:text-amber-300 transition-colors text-sm tracking-wide">
            ← Return
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase mb-3">Bazi Reading</p>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-400 mb-4">The Four Pillars</h1>
          <p className="text-slate-500 text-base max-w-lg mx-auto">A precise reading of the cosmic architecture written at the moment of your birth. Stem, branch, element, cycle — and what they say about your path.</p>
        </div>

        {/* Form */}
        <div className="bg-[#0d1117]/80 backdrop-blur-sm rounded-2xl border border-slate-800 p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-400 text-xs tracking-widest uppercase mb-2">Your Name (Optional)</label>
              <input
                type="text"
                placeholder="How shall we address you?"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#0a0a0f]/60 border border-slate-700 rounded-xl px-4 py-3.5 text-slate-200 placeholder-slate-600 focus:border-amber-500/60 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs tracking-widest uppercase mb-3">Date of Birth</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { key: 'year', label: 'Year', placeholder: '1999', min: 1900, max: 2026 },
                  { key: 'month', label: 'Month', placeholder: '1-12', min: 1, max: 12 },
                  { key: 'day', label: 'Day', placeholder: '1-31', min: 1, max: 31 },
                  { key: 'hour', label: 'Hour', placeholder: '0-23', min: 0, max: 23 },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-slate-600 text-xs mb-1 text-center">{f.label}</label>
                    <input
                      type="number"
                      min={f.min}
                      max={f.max}
                      placeholder={f.placeholder}
                      value={(form as any)[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      required
                      className="w-full bg-[#0a0a0f]/60 border border-slate-700 rounded-xl px-3 py-3 text-slate-200 text-center placeholder-slate-700 focus:border-amber-500/60 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                ))}
              </div>
              <p className="text-slate-700 text-xs mt-2 text-center">Hour: 0=midnight, 12=noon, 23=11pm</p>
            </div>

            <div>
              <label className="block text-slate-400 text-xs tracking-widest uppercase mb-3">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                {[['male', 'Male · Yang Direction'], ['female', 'Female · Yin Direction']].map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm({ ...form, gender: val })}
                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${form.gender === val
                      ? 'border-amber-500/60 bg-amber-500/10 text-amber-300'
                      : 'border-slate-700 bg-[#0a0a0f]/40 text-slate-500 hover:border-slate-600'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-slate-700 text-xs mt-2 text-center">Gender affects the direction of your decade-luck cycles</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0a0f] font-bold py-4 rounded-xl transition-all text-sm tracking-wide shadow-lg shadow-amber-500/20"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">☯</span> Reading the stars...
                </span>
              ) : (
                'Reveal My Four Pillars'
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && !result.error && (
          <div className="space-y-6">
            {/* Chart Overview */}
            <div className="bg-[#0d1117]/80 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8">
              <div className="text-center mb-6">
                <p className="text-amber-500/40 text-xs tracking-[0.3em] uppercase mb-2">Your Chart</p>
                <h2 className="text-2xl font-bold text-amber-300 mb-1">The Four Pillars of {form.name || 'Your Life'}</h2>
                <div className="flex items-center justify-center gap-4 text-slate-500 text-sm">
                  <span>{result.zodiacAnimal ? ANIMAL_NAMES[result.zodiacAnimal] || result.zodiacAnimal : ''} Year</span>
                  <span>·</span>
                  <span>{result.dayMasterElement ? ELEMENT_NAMES[result.dayMasterElement] || result.dayMasterElement : ''} Day Master</span>
                </div>
              </div>

              {/* Four Pillars Grid */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {[
                  { label: 'Year', value: result.yearPillar, stem: result.yearPillar },
                  { label: 'Month', value: result.monthPillar, stem: result.monthPillar },
                  { label: 'Day', value: result.dayPillar, stem: result.dayPillar },
                  { label: 'Hour', value: result.hourPillar, stem: result.hourPillar },
                ].map((p) => (
                  <div key={p.label} className="text-center bg-[#0a0a0f]/60 rounded-xl p-4 border border-slate-800">
                    <div className="text-slate-600 text-xs uppercase tracking-widest mb-2">{p.label}</div>
                    <div className="text-xl font-bold text-amber-300 mb-1">
                      {p.value ? <GanZhiLabel gz={p.value} /> : '—'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Day Master Strength */}
              {result.dayMasterStrength && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-xs uppercase tracking-widest">Strength of Self</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STRENGTH_LABELS[result.dayMasterStrength.level]?.color || 'text-slate-400'}`}>
                      {result.dayMasterStrength.level || '—'}
                    </span>
                  </div>
                  {result.dayMasterStrength.reason && (
                    <p className="text-slate-500 text-sm leading-relaxed">{result.dayMasterStrength.reason}</p>
                  )}
                </div>
              )}

              {/* Ten Gods */}
              {result.tenGods && (
                <div className="mb-6">
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mb-3">Ten Gods</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.entries(result.tenGods as Record<string, string>)).map(([pillar, god]) => {
                      if (!god || pillar === 'undefined') return null
                      return (
                        <div key={pillar} className="flex items-center justify-between bg-[#0a0a0f]/60 rounded-lg px-3 py-2">
                          <span className="text-slate-600 text-xs capitalize">{pillar.replace('Pillar', '')}</span>
                          <span className="text-amber-400 text-sm font-medium">{TEN_GODS_EN[god] || god}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Five Elements */}
              {result.wuXingScores && (
                <div className="mb-6">
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mb-3">Five Elements</span>
                  <FiveElementBar scores={result.wuXingScores} />
                </div>
              )}

              {/* Useful & Harmful */}
              {(result.usefulGod || result.harmfulGod) && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
                    <div className="text-green-400/60 text-xs uppercase tracking-widest mb-1">Useful God</div>
                    <div className="text-green-400 font-semibold text-sm">{TEN_GODS_EN[result.usefulGod] || result.usefulGod || '—'}</div>
                  </div>
                  <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/20">
                    <div className="text-red-400/60 text-xs uppercase tracking-widest mb-1">Harmful God</div>
                    <div className="text-red-400 font-semibold text-sm">{TEN_GODS_EN[result.harmfulGod] || result.harmfulGod || '—'}</div>
                  </div>
                </div>
              )}

              {/* Decade Luck */}
              {result.daYun && result.daYun.length > 0 && (
                <div className="mb-6">
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mb-3">Decade Luck Cycles</span>
                  <div className="space-y-2">
                    {result.daYun.slice(0, 5).map((d: any, i: number) => (
                      <div key={i} className="flex items-center justify-between bg-[#0a0a0f]/60 rounded-lg px-3 py-2.5">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-700 text-xs w-5">{i + 1}</span>
                          <span className="text-amber-300 font-medium"><GanZhiLabel gz={d.pillar} /></span>
                        </div>
                        <span className="text-slate-600 text-xs">{d.ageStart}–{d.ageEnd}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Annual Influences */}
              {result.liuNian && result.liuNian.length > 0 && (
                <div className="mb-6">
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mb-3">Annual Influences (Next 10 Years)</span>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {result.liuNian.slice(0, 10).map((d: any, i: number) => (
                      <div key={i} className="bg-[#0a0a0f]/60 rounded-lg p-2.5 text-center">
                        <div className="text-amber-300 font-medium text-sm mb-1"><GanZhiLabel gz={d.pillar} /></div>
                        <div className="text-slate-700 text-xs">{d.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Reading */}
            {result.aiAnalysis && (
              <div className="bg-gradient-to-br from-amber-500/8 to-amber-600/5 backdrop-blur-sm rounded-2xl border border-amber-500/30 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm">✦</div>
                  <div>
                    <h3 className="text-amber-300 font-bold">Deep Analysis</h3>
                    <p className="text-amber-500/50 text-xs">From Aether's AI master reader</p>
                  </div>
                </div>
                <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{result.aiAnalysis}</div>
              </div>
            )}

            {result.aiError === 'NO_API_KEY' && (
              <div className="bg-[#0d1117]/80 backdrop-blur-sm rounded-2xl border border-slate-800 p-8">
                <div className="text-center mb-5">
                  <div className="text-4xl mb-3">🔮</div>
                  <h3 className="text-slate-200 font-bold text-lg mb-2">Receive the Full Reading</h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto">A forty-year master, augmented by AI intelligence — for an analysis that goes beyond the chart into the story behind it.</p>
                </div>
                <div className="bg-[#0a0a0f]/60 rounded-xl p-5 mb-5 border border-slate-800">
                  <div className="space-y-2.5 text-sm">
                    {['Complete personality and destiny analysis', 'Career, wealth and relationship guidance', 'Optimal timing for major decisions', 'Personalized feng shui recommendations', 'Deep AI-powered insight report'].map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <span className="text-amber-400">✓</span>
                        <span className="text-slate-400">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <a
                  href="https://paypal.me/YourPayPalLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl text-center transition-all shadow-lg shadow-blue-500/20"
                >
                  Unlock Full Reading · $5.99
                </a>
                <p className="text-slate-700 text-xs text-center mt-3">Secured by PayPal · Instant access · No subscription</p>
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-slate-800 text-xs mt-12 max-w-md mx-auto leading-relaxed">
          The Four Pillars is a tool for reflection and self-understanding, not a determinant of fate. All readings are for entertainment purposes. Aether does not predict the future — it illuminates the patterns within it.
        </p>
      </div>
    </div>
  )
}
