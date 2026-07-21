'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// 24 Mountain compass directions - correct angles
const MOUNTAINS_24 = [
  { name: '子', en: 'Zi', angle: 0, direction: 'N', element: 'Water' },
  { name: '癸', en: 'Gui', angle: 15, direction: 'NNE', element: 'Water' },
  { name: '丑', en: 'Chou', angle: 30, direction: 'NNE', element: 'Earth' },
  { name: '艮', en: 'Gen', angle: 45, direction: 'NE', element: 'Earth' },
  { name: '寅', en: 'Yin', angle: 60, direction: 'NE', element: 'Wood' },
  { name: '甲', en: 'Jia', angle: 75, direction: 'ENE', element: 'Wood' },
  { name: '卯', en: 'Mao', angle: 90, direction: 'E', element: 'Wood' },
  { name: '乙', en: 'Yi', angle: 105, direction: 'ESE', element: 'Wood' },
  { name: '辰', en: 'Chen', angle: 120, direction: 'ESE', element: 'Earth' },
  { name: '巽', en: 'Xun', angle: 135, direction: 'SE', element: 'Wood' },
  { name: '巳', en: 'Si', angle: 150, direction: 'SE', element: 'Fire' },
  { name: '丙', en: 'Bing', angle: 165, direction: 'SSE', element: 'Fire' },
  { name: '午', en: 'Wu', angle: 180, direction: 'S', element: 'Fire' },
  { name: '丁', en: 'Ding', angle: 195, direction: 'SSW', element: 'Fire' },
  { name: '未', en: 'Wei', angle: 210, direction: 'SW', element: 'Earth' },
  { name: '坤', en: 'Kun', angle: 225, direction: 'SW', element: 'Earth' },
  { name: '申', en: 'Shen', angle: 240, direction: 'WSW', element: 'Metal' },
  { name: '庚', en: 'Geng', angle: 255, direction: 'WSW', element: 'Metal' },
  { name: '酉', en: 'You', angle: 270, direction: 'W', element: 'Metal' },
  { name: '辛', en: 'Xin', angle: 285, direction: 'WNW', element: 'Metal' },
  { name: '戌', en: 'Xu', angle: 300, direction: 'WNW', element: 'Earth' },
  { name: '乾', en: 'Qian', angle: 315, direction: 'NW', element: 'Metal' },
  { name: '亥', en: 'Hai', angle: 330, direction: 'NW', element: 'Water' },
  { name: '壬', en: 'Ren', angle: 345, direction: 'NNW', element: 'Water' },
]

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

// Nine Flying Stars for 2026
const FLYING_STARS_2026: Record<string, { star: number; nature: string; desc: string; luck: string }> = {
  'North': { star: 6, nature: 'Metal', desc: 'Six Whites — Guardian. Brings stability, authority, and protection. Place metal objects to activate.', luck: 'Auspicious for career and authority. Good for leadership positions.' },
  'NE': { star: 7, nature: 'Metal', desc: 'Seven Reds — Warrior. Brings courage, assertiveness, and competitive advantage. May create conflict if misused.', luck: 'Strong for action-oriented pursuits. Handle with care — intensity can turn to aggression.' },
  'East': { star: 9, nature: 'Fire', desc: 'Nine Purples — Future Success. The most auspicious star for growth, expansion, and aspirational success.', luck: 'Excellent for business expansion, career advancement, and long-term planning.' },
  'SE': { star: 1, nature: 'Water', desc: 'One Black — Academic. Governs knowledge, wisdom, career in official fields, and scholarly pursuits.', luck: 'Favorable for study, examinations, and careers in government or education.' },
  'South': { star: 8, nature: 'Earth', desc: 'Eight Whites — Wealth. The prosperity star. Attracts abundance, savings, and financial security.', luck: 'Excellent for wealth accumulation. Activate with earth tones and round shapes.' },
  'SW': { star: 2, nature: 'Earth', desc: 'Two Black — Sickness. The illness star. Needs careful management. Avoid placing sharp or active objects here.', luck: 'Challenging. Minimize activity in this area. Use gentle, calming remedies.' },
  'West': { star: 3, nature: 'Wood', desc: 'Three Jade — Conflict. Brings arguments, legal issues, and rivalry. Needs wood-element remedies to soften.', luck: 'Tense energy. Avoid major decisions or negotiations in this area. Use plants to neutralize.' },
  'NW': { star: 4, nature: 'Wood', desc: 'Four Greens — Scholarly. Brings creativity, artistic talent, and romantic opportunities.', luck: 'Good for creative work, romance, and artistic pursuits. Place fresh flowers or green plants.' },
  'Center': { star: 5, nature: 'Earth', desc: 'Five Yellow — Calculation. The most significant afflictive star. Requires careful feng shui treatment.', luck: 'The most challenging position. Consult a feng shui master before making changes here.' },
}

const STAR_LUCK: Record<number, string> = {
  1: 'Neutral — Scholarly',
  2: 'Inauspicious — Sickness',
  3: 'Tense — Conflict',
  4: 'Auspicious — Romance',
  5: 'Dangerous — Affliction',
  6: 'Auspicious — Authority',
  7: 'Intense — Warrior',
  8: 'Auspicious — Wealth',
  9: 'Most Auspicious — Success',
}

export default function CompassPage() {
  const [rotation, setRotation] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [selectedMountain, setSelectedMountain] = useState<any>(null)

  const animate = () => {
    setAnimating(true)
    setRotation((r) => r + 360)
    setTimeout(() => setAnimating(false), 2000)
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
          <Link href="/" className="text-slate-500 hover:text-amber-300 transition-colors text-sm tracking-wide">← Return</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase mb-3">Feng Shui</p>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-400 mb-4">The Space Harmony</h1>
          <p className="text-slate-500 text-base max-w-lg mx-auto">Twenty-four mountains. Nine flying palaces. The geometry of cosmic harmony, mapped for your space.</p>
        </div>

        {/* Compass */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col items-center">
            {/* Compass SVG */}
            <div className="relative w-full max-w-md">
              <svg viewBox="0 0 400 400" className="w-full drop-shadow-2xl">
                {/* Outer ring */}
                <circle cx="200" cy="200" r="195" fill="none" stroke="#1e293b" strokeWidth="4"/>
                <circle cx="200" cy="200" r="185" fill="#0a0a0f" stroke="#334155" strokeWidth="1.5"/>
                <circle cx="200" cy="200" r="165" fill="none" stroke="#1e293b" strokeWidth="1"/>
                <circle cx="200" cy="200" r="145" fill="none" stroke="#1e293b" strokeWidth="1"/>
                <circle cx="200" cy="200" r="125" fill="none" stroke="#1e293b" strokeWidth="1"/>
                <circle cx="200" cy="200" r="105" fill="none" stroke="#1e293b" strokeWidth="1"/>

                {/* Degree marks */}
                {Array.from({ length: 360 }, (_, i) => {
                  const rad = (i - 90) * Math.PI / 180
                  const isMajor = i % 15 === 0
                  const isMid = i % 5 === 0
                  const r1 = isMajor ? 175 : isMid ? 180 : 185
                  return <line key={i} x1={200 + r1 * Math.cos(rad)} y1={200 + r1 * Math.sin(rad)} x2={200 + 185 * Math.cos(rad)} y2={200 + 185 * Math.sin(rad)} stroke={isMajor ? '#f59e0b' : '#334155'} strokeWidth={isMajor ? 2 : 1}/>
                })}

                {/* Mountain labels - rotated */}
                <g transform={`rotate(${rotation}, 200, 200)`} style={{ transition: animating ? 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none' }}>
                  {MOUNTAINS_24.map((m) => {
                    const rad = (m.angle - 90) * Math.PI / 180
                    const x = 200 + 155 * Math.cos(rad)
                    const y = 200 + 155 * Math.sin(rad)
                    return (
                      <g key={m.name} onClick={() => setSelectedMountain(m)} className="cursor-pointer" opacity={selectedMountain?.name === m.name ? 1 : 0.7}>
                        <text
                          x={x} y={y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#f59e0b"
                          fontSize="11"
                          fontWeight="bold"
                          transform={`rotate(${m.angle}, ${x}, ${y})`}
                          style={{ userSelect: 'none' }}
                        >{m.name}</text>
                        <text
                          x={x} y={y + 12}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#64748b"
                          fontSize="7"
                          transform={`rotate(${m.angle}, ${x}, ${y + 12})`}
                          style={{ userSelect: 'none' }}
                        >{m.en}</text>
                      </g>
                    )
                  })}
                </g>

                {/* Inner ring with elements */}
                <g transform={`rotate(${rotation}, 200, 200)`} style={{ transition: animating ? 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none' }}>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                    const rad = (deg - 90) * Math.PI / 180
                    const el = ['Water', 'Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Metal', 'Metal'][i]
                    const col = { Water: '#3b82f6', Wood: '#22c55e', Fire: '#ef4444', Earth: '#f59e0b', Metal: '#94a3b8' }[el]
                    const x = 200 + 88 * Math.cos(rad)
                    const y = 200 + 88 * Math.sin(rad)
                    return (
                      <g key={deg}>
                        <circle cx={x} cy={y} r="22" fill="#0d1117" stroke={col} strokeWidth="1.5" opacity="0.8"/>
                        <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={col} fontSize="18" style={{ userSelect: 'none' }}>
                          {ELEMENT_ICONS[el]}
                        </text>
                      </g>
                    )
                  })}
                </g>

                {/* Direction labels */}
                {[
                  { d: 'N', deg: 0, x: 200, y: 28 },
                  { d: 'S', deg: 180, x: 200, y: 378 },
                  { d: 'E', deg: 90, x: 378, y: 200 },
                  { d: 'W', deg: 270, x: 22, y: 200 },
                  { d: 'NE', deg: 45, x: 326, y: 74 },
                  { d: 'NW', deg: 315, x: 74, y: 74 },
                  { d: 'SE', deg: 135, x: 326, y: 326 },
                  { d: 'SW', deg: 225, x: 74, y: 326 },
                ].map((dir) => (
                  <text key={dir.d} x={dir.x} y={dir.y} textAnchor="middle" dominantBaseline="middle" fill="#f59e0b" fontSize="13" fontWeight="bold" style={{ userSelect: 'none' }}>{dir.d}</text>
                ))}

                {/* Center */}
                <circle cx="200" cy="200" r="28" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
                <circle cx="200" cy="200" r="12" fill="#0a0a0f" stroke="#f59e0b" strokeWidth="1"/>
                <text x="200" y="200" textAnchor="middle" dominantBaseline="middle" fill="#f59e0b" fontSize="10" style={{ userSelect: 'none' }}>中</text>

                {/* Pointer needle */}
                <g transform={`rotate(${rotation}, 200, 200)`} style={{ transition: animating ? 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none' }}>
                  <polygon points="200,55 196,200 200,220 204,200" fill="#f59e0b" opacity="0.9"/>
                  <polygon points="200,220 196,200 200,200 204,200" fill="#334155" opacity="0.9"/>
                </g>
              </svg>
            </div>

            <button
              onClick={animate}
              className="mt-6 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-[#0a0a0f] font-bold px-8 py-3 rounded-full transition-all text-sm shadow-lg shadow-amber-500/20"
            >
              {animating ? 'Rotating...' : 'Rotate Compass'}
            </button>
          </div>

          {/* Side panels */}
          <div className="lg:w-96 space-y-6">
            {/* Selected Mountain */}
            {selectedMountain ? (
              <div className="bg-[#0d1117]/80 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-amber-300 mb-1">{selectedMountain.name}</div>
                  <div className="text-slate-500 text-sm">{selectedMountain.en} · {selectedMountain.direction} · {selectedMountain.angle}°</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs uppercase tracking-widest">Element</span>
                    <span className={`${ELEMENT_COLORS[selectedMountain.element]} text-sm font-medium`}>
                      {ELEMENT_ICONS[selectedMountain.element]} {selectedMountain.element}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs uppercase tracking-widest">Angle</span>
                    <span className="text-slate-300 text-sm">{selectedMountain.angle}°</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs uppercase tracking-widest">Direction</span>
                    <span className="text-slate-300 text-sm">{selectedMountain.direction}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <p className="text-slate-500 text-xs leading-relaxed">
                    The {selectedMountain.name} mountain governs the {selectedMountain.direction.toLowerCase()} sector of your space. In feng shui, each mountain carries specific energetic qualities that influence different aspects of life.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#0d1117]/60 backdrop-blur-sm rounded-2xl border border-slate-800 p-6 text-center">
                <div className="text-3xl mb-3">🧭</div>
                <p className="text-slate-500 text-sm">Tap a mountain on the compass to see its details and feng shui meaning.</p>
              </div>
            )}

            {/* Nine Flying Stars 2026 */}
            <div className="bg-[#0d1117]/80 backdrop-blur-sm rounded-2xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-slate-200 font-bold text-lg">Nine Flying Stars</h3>
                  <p className="text-slate-600 text-xs mt-0.5">2026 Annual Layout</p>
                </div>
                <span className="bg-amber-500/10 text-amber-400 text-xs px-3 py-1 rounded-full border border-amber-500/30">Current</span>
              </div>
              <div className="space-y-3">
                {Object.entries(FLYING_STARS_2026).map(([dir, info]) => {
                  const luckColor = info.star >= 8 ? 'text-green-400' : info.star <= 3 ? 'text-red-400' : info.star === 5 ? 'text-red-500' : 'text-amber-400'
                  return (
                    <div key={dir} className={`${ELEMENT_BG[info.nature]} border rounded-xl p-3`}>
                      <div className="flex items-start justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-xs font-medium">{dir}</span>
                          <span className={`text-sm font-bold ${luckColor}`}>★ {info.star}</span>
                        </div>
                        <span className={`${ELEMENT_COLORS[info.nature]} text-xs`}>{ELEMENT_ICONS[info.nature]} {info.nature}</span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{info.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
