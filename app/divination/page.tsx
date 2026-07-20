'use client'

import { useState } from 'react'
import Link from 'next/link'

const GUA = [
  { name: '乾', en: 'Qian', meaning: 'Heaven', nature: 'Creative', element: 'Metal', trigram: '☰' },
  { name: '坤', en: 'Kun', meaning: 'Earth', nature: 'Receptive', element: 'Earth', trigram: '☷' },
  { name: '屯', en: 'Zhun', meaning: 'Difficulty', nature: 'Initiating', element: 'Water', trigram: '☵' },
  { name: '蒙', en: 'Meng', meaning: 'Youth', nature: 'Unformed', element: 'Water', trigram: '☵' },
  { name: '需', en: 'Xu', meaning: 'Waiting', nature: 'Nourishing', element: 'Water', trigram: '☵' },
  { name: '讼', en: 'Song', meaning: 'Contention', nature: 'Conflict', element: 'Water', trigram: '☵' },
  { name: '师', en: 'Shi', meaning: 'Army', nature: 'Organization', element: 'Water', trigram: '☵' },
  { name: '比', en: 'Bi', meaning: 'Union', nature: 'Cooperation', element: 'Water', trigram: '☵' },
  { name: '小畜', en: 'Xiao Xu', meaning: 'Restraint', nature: 'Gathering', element: 'Wind', trigram: '☴' },
  { name: '履', en: 'Lv', meaning: 'Treading', nature: 'Conduct', element: 'Metal', trigram: '☰' },
  { name: '泰', en: 'Tai', meaning: 'Peace', nature: 'Harmony', element: 'Earth', trigram: '☷' },
  { name: '否', en: 'Pi', meaning: 'Obstruction', nature: 'Block', element: 'Heaven', trigram: '☰' },
]

const GUA_INTERPRETATIONS: Record<string, { title: string; judgment: string; image: string; line: string; meaning: string }> = {
  '乾为天': { title: 'Heaven Over Heaven', judgment: 'Qian represents the supreme creative force — pure yang energy in its most complete form. The superior person aligns with this force through self-improvement and constant renewal.', image: '九条阳爻重叠而上，无尽创造力流动。天行健，君子以自强不息。', line: 'A reading of Qian speaks to a moment of maximum potency. Strength, clarity, and forward motion are your allies. Proceed with confidence — but temper it with wisdom, for even heaven has its limits.', meaning: 'Pure creation. Maximum potential. A time of strength and clarity.' },
  '坤为地': { title: 'Earth Below Earth', judgment: 'Kun is the great receptive mother — the field that receives and nurtures. The superior person cultivates virtue through receptivity, supporting others without seeking recognition.', image: '六条阴爻顺承而下载，天地之广，母性之德。', line: 'Kun calls for patience and receptivity. Yield, but do not surrender. Support the forces of creation by tending what needs tending. Your strength is in your steadiness.', meaning: 'Pure receptivity. Nurturing. A time for patience and care.' },
  '水雷屯': { title: 'Difficulty at the Beginning', judgment: 'Thunder rising from the depths — the moment of birth is full of difficulty. The trigram of water below thunder represents the initial struggle of all new ventures.', image: '上雨下雷，震卦初始，万物萌动之艰。', line: 'You stand at the beginning of something significant. The path is not yet clear, and obstacles are real. The advice of Kun: proceed with caution, seek guidance, and do not force the moment. Good fortune comes to those who are patient at the threshold.', meaning: 'Difficult beginnings. Careful progress required. A time of gestation.' },
  '山水蒙': { title: 'Youthful Folly', judgment: 'A mountain above water — the spring of wisdom has not yet opened. The trigram of mountain over water represents unformed minds and untapped potential.', image: '山下出泉，蒙昧初开，求我之心。', line: 'The answer lies in seeking knowledge and guidance — not in pretending to know what you do not. Seek the master. Ask the honest question. The moment you admit what you do not know is the moment learning begins.', meaning: 'Ignorance seeking education. A blank slate awaiting form.' },
  '水天需': { title: 'Waiting', judgment: 'Water above heaven — clouds gather but rain has not yet fallen. The trigram represents nourishment that has not yet materialized, patience in the face of anticipation.', image: '云上于天，待时而雨，饮食之需。', line: 'You wait for something you need. The wait is not passive — it is active preparation. Use this time to gather resources, refine your readiness, and cultivate inner certainty. When the moment comes, you will be prepared.', meaning: 'Nutritive waiting. Anticipation. A time of preparation.' },
  '天水讼': { title: 'Contention', judgment: 'Heaven above, water below — they move in opposite directions. The trigram represents the natural conflict that arises when opposing forces meet.', image: '上天下水，二者相违，讼之象。', line: 'Conflict is not inherently wrong, but it must be handled with justice rather than aggression. If you go to law, seek the middle path. Better still: is there a way to withdraw gracefully? Conflict won is often not truly won.', meaning: 'Conflict. Dispute. A time to tread carefully in negotiations.' },
  '地水师': { title: 'The Army', judgment: 'Earth above, water below — the gathering of masses like water flowing into a low place. The trigram represents organization, leadership, and collective force.', image: '地中有水，众阴并聚，师旅之象。', line: 'Organization and leadership are called for. Choose your commander with care — one unjust person can undo the work of many. A just cause, led by a righteous leader, brings victory without excessive casualties.', meaning: 'Collective force. Leadership. A time for clear command.' },
  '水地比': { title: 'Intimacy', judgment: 'Water above, earth below — water rests upon the earth, seeking the lowest place. The trigram represents harmony through mutual trust and close association.', image: '地上有水，亲比之象，万物相亲。', line: 'The answer speaks to closeness, trust, and the value of choosing your inner circle carefully. The ruler must show sincere devotion to attract the devotion of the wise. Seek those whose example you can follow, and give your own loyalty where it is truly earned.', meaning: 'Trust. Harmony. A time to deepen bonds and choose companions.' },
  '风天小畜': { title: 'The Taming Power of the Small', judgment: 'Wind above, heaven below — wind moves beneath heaven as restraint through the small. The trigram represents the power that accumulates gradually through persistent effort.', image: '风行天上，小畜之象，以小养大。', line: 'Progress is slow but real. You have gathered some strength, but not enough to move openly. Continue to accumulate quietly. Restrain the urge to spend or expand until your reserves are sufficient. Patience is not delay — it is strategy.', meaning: 'Accumulation. Restraint. A time for building reserves slowly.' },
  '天泽履': { title: 'Treading Carefully', judgment: 'Heaven above, marsh below — walking on dangerous ground with care. The trigram represents caution in the face of ambition, propriety in conduct.', image: '上天下泽，履卦，礼之用，和为贵。', line: 'The path ahead has real hazards — but also real opportunities. Tread with awareness. Respect the danger without being paralyzed by it. Walk your own path, but do not insult those who walk beside you. Propriety protects the traveler.', meaning: 'Cautious progress. Proper conduct. A time of careful navigation.' },
  '地天泰': { title: 'Peace and Harmony', judgment: 'Earth above, heaven below — they have found their proper order. The trigram represents the ideal of harmony between heaven and earth, the microcosm and macrocosm.', image: '天地交泰，阴阳和畅，万物通达。', line: 'This is a moment of unusual grace — heaven and earth are in alignment. Small things yield to greater things; the weak are nourished by the strong. Accept the gifts the moment offers. Share the prosperity with those less fortunate. Good fortune crowns the generous.', meaning: 'Peace. Harmony. Abundance. The ideal union.' },
  '天地否': { title: 'Obstruction', judgment: 'Heaven above, earth below — they have lost their connection. The trigram represents the breakdown of communication between heaven and earth, the isolation of the strong from the responsive.', image: '天地不交，否卦，阴阳闭塞。', line: 'The forces are not aligned. What was working may stop working. Those in power become arrogant; those who serve become estranged. The time calls for retreat, review, and the rebuilding of connections from the ground up. Do not mistake silence for peace.', meaning: 'Isolation. Obstruction. A time to withdraw and reflect.' },
}

function tossCoin(): number {
  const v = Math.random()
  if (v >= 0.85) return 3 // Old yang — changes
  if (v <= 0.15) return 2 // Old yin — changes
  if (v >= 0.5) return 1  // Young yang — stable
  return 0                  // Young yin — stable
}

function getLineType(val: number): { label: string; en: string; changes: boolean; symbol: string; color: string } {
  if (val === 3) return { label: '老阳', en: 'Old Yang', changes: true, symbol: '━━━ ═══', color: 'text-amber-400' }
  if (val === 2) return { label: '老阴', en: 'Old Yin', changes: true, symbol: ' - - - ═══', color: 'text-slate-400' }
  if (val === 1) return { label: '少阳', en: 'Young Yang', changes: false, symbol: '━━━ ━━━', color: 'text-amber-300' }
  return { label: '少阴', en: 'Young Yin', changes: false, symbol: ' - - -  - - -', color: 'text-slate-300' }
}

export default function DivinationPage() {
  const [coins, setCoins] = useState<number[]>([])
  const [hexagram, setHexagram] = useState<any>(null)
  const [changing, setChanging] = useState<number[]>([])
  const [question, setQuestion] = useState('')
  const [phase, setPhase] = useState<'idle' | 'tossing' | 'done'>('idle')

  const castCoins = () => {
    setPhase('tossing')
    setCoins([])
    const results: number[] = []
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const r = tossCoin()
        results.push(r)
        setCoins([...results])
      }, (i + 1) * 600)
    }
    setTimeout(() => {
      const chg: number[] = results.map((r) => (r === 2 || r === 3 ? 1 : 0))
      setChanging(chg)
      const lower = (results[0] % 2) + (results[1] % 2) * 2 + (results[2] % 2) * 4
      const upper = (results[3] % 2) + (results[4] % 2) * 2 + (results[5] % 2) * 4
      setHexagram({ lower, upper, raw: results })
      setPhase('done')
    }, 4200)
  }

  const reset = () => {
    setPhase('idle')
    setCoins([])
    setHexagram(null)
    setChanging([])
    setQuestion('')
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
          <Link href="/" className="text-slate-500 hover:text-amber-300 transition-colors text-sm">← Return</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase mb-3">I Ching · 64 Hexagrams</p>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-400 mb-4">The Oracle</h1>
          <p className="text-slate-500 text-base max-w-lg mx-auto">Cast the coins. Three thousand years of wisdom respond to your question — with clarity, not prophecy.</p>
        </div>

        {/* Coin Toss Area */}
        <div className="bg-[#0d1117]/80 backdrop-blur-sm rounded-2xl border border-slate-800 p-8 mb-8">
          {!hexagram ? (
            <div className="space-y-8">
              <div>
                <label className="block text-slate-400 text-xs tracking-widest uppercase mb-3">Your Question</label>
                <textarea
                  placeholder="What is your question for the Oracle? Ask with sincerity, receive with openness..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0a0a0f]/60 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-700 focus:border-amber-500/60 focus:outline-none transition-colors text-sm resize-none"
                />
                <p className="text-slate-700 text-xs mt-2 text-center">The Oracle responds to all sincere questions — but not all questions have the answer you want to hear.</p>
              </div>

              {/* Coin Display */}
              <div className="flex justify-center items-center gap-4 min-h-[120px]">
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const result = coins[i]
                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-500 ${
                        result !== undefined
                          ? result % 2 === 1 ? 'bg-amber-400/20 border-2 border-amber-400/60 text-amber-400' : 'bg-slate-400/20 border-2 border-slate-400/60 text-slate-400'
                          : 'bg-slate-800/60 border-2 border-slate-800 text-slate-800'
                      }`}>
                        {result !== undefined ? (result % 2 === 1 ? '☰' : '☷') : '?'}
                      </div>
                      <span className="text-slate-700 text-xs">{i < 3 ? '初一二三'[i] : '四五六'[i - 3]}</span>
                    </div>
                  )
                })}
              </div>

              <button
                onClick={castCoins}
                disabled={phase === 'tossing'}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0a0f] font-bold py-4 rounded-xl transition-all text-sm tracking-wide shadow-lg shadow-amber-500/20"
              >
                {phase === 'tossing' ? 'The Oracle is Listening...' : 'Cast the Six Coins'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Hexagram Display */}
              <div className="text-center">
                <div className="flex justify-center gap-2 mb-4">
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const val = hexagram.raw[i]
                    const lt = getLineType(val)
                    return (
                      <div key={i} className="text-center">
                        <div className={`text-3xl font-bold mb-1 ${lt.color}`}>{lt.symbol.split(' ')[0]}</div>
                        <div className={`text-3xl font-bold ${lt.symbol.includes('═') ? 'text-amber-400' : 'text-slate-400'}`}>{lt.symbol.split(' ')[1] || lt.symbol}</div>
                        <div className="text-slate-700 text-xs mt-1">{i < 3 ? ['初', '一', '二', '三'][i] : ['四', '五', '六'][i - 3]}</div>
                        {changing[i] === 1 && <div className="text-red-400 text-xs mt-0.5">↺</div>}
                      </div>
                    )
                  })}
                </div>

                {/* Hexagram Names */}
                <div className="bg-[#0a0a0f]/60 rounded-xl p-5 border border-slate-800 mt-4">
                  <div className="flex justify-center gap-3 mb-3">
                    {hexagram.raw.slice(3).map((v: number, i: number) => <span key={i} className="text-2xl">{v % 2 === 1 ? '☰' : '☷'}</span>)}
                    {hexagram.raw.slice(0, 3).map((v: number, i: number) => <span key={i} className="text-2xl">{v % 2 === 1 ? '☰' : '☷'}</span>)}
                  </div>
                  <div className="text-slate-400 text-sm mb-1">
                    Upper trigram · Lower trigram
                  </div>
                  <div className="text-amber-400 font-bold text-lg mt-3">
                    {GUA[hexagram.upper]?.name || '—'}{GUA[hexagram.lower]?.name || '—'}
                  </div>
                  <div className="text-slate-500 text-sm mt-1">
                    {GUA[hexagram.upper]?.en || '—'} over {GUA[hexagram.lower]?.en || '—'}
                  </div>
                  <div className="text-slate-600 text-xs mt-2 italic">
                    {GUA[hexagram.upper]?.trigram || '☰'} over {GUA[hexagram.lower]?.trigram || '☷'} · {GUA[hexagram.upper]?.element || '—'} · {GUA[hexagram.lower]?.nature || '—'}
                  </div>
                </div>
              </div>

              {/* Interpretation */}
              {(() => {
                const key = `${GUA[hexagram.upper]?.name || ''}${GUA[hexagram.lower]?.name || ''}`
                const interp = GUA_INTERPRETATIONS[key]
                if (!interp) return (
                  <div className="text-center text-slate-500 text-sm py-4">
                    The Oracle speaks in symbols beyond easy translation. Consult a master of the I Ching for a full interpretation of this hexagram.
                  </div>
                )
                return (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-amber-500/8 to-amber-600/5 rounded-xl p-5 border border-amber-500/30">
                      <h3 className="text-amber-400 font-bold text-sm mb-3">The Judgment</h3>
                      <p className="text-slate-400 text-sm leading-relaxed italic">"{interp.judgment}"</p>
                    </div>
                    <div className="bg-[#0a0a0f]/60 rounded-xl p-5 border border-slate-800">
                      <h3 className="text-slate-400 font-bold text-sm mb-3">The Image</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{interp.image}</p>
                    </div>
                    <div className="bg-[#0a0a0f]/60 rounded-xl p-5 border border-slate-800">
                      <h3 className="text-slate-400 font-bold text-sm mb-3">The Reading</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{interp.line}</p>
                    </div>
                    {changing.some(c => c === 1) && (
                      <div className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/20">
                        <p className="text-amber-400 text-xs mb-2 uppercase tracking-widest">Changing Lines Detected</p>
                        <p className="text-slate-500 text-xs leading-relaxed">One or more lines are in transition — their yang is becoming yin or vice versa. When changed lines appear, read the future hexagram as the true answer. The current form describes where you are; the changed form describes where you are going.</p>
                      </div>
                    )}
                  </div>
                )
              })()}

              <button
                onClick={reset}
                className="w-full border border-slate-700 hover:border-amber-500/50 text-slate-400 hover:text-amber-300 font-semibold py-3 rounded-xl transition-all text-sm"
              >
                Cast Again
              </button>
            </div>
          )}
        </div>

        {/* Explanation */}
        <div className="bg-[#0d1117]/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
          <h3 className="text-slate-300 font-bold mb-3 text-sm uppercase tracking-widest">How to Read the Oracle</h3>
          <div className="space-y-3 text-slate-500 text-sm leading-relaxed">
            <p><span className="text-amber-400">☰ Yang</span> — the creative, active, strong principle. Divided line below, unbroken above.</p>
            <p><span className="text-slate-400">☷ Yin</span> — the receptive, passive, yielding principle. Broken line with a gap in the center.</p>
            <p><span className="text-amber-400">━━━ ═══</span> Old Yang (changes) — a line at its extreme, transforming toward yin.</p>
            <p><span className="text-slate-400"> - - - ═══</span> Old Yin (changes) — a line at its limit, transforming toward yang.</p>
            <p><span className="text-amber-300">━━━ ━━━</span> Young Yang (stable) — a strong, stable yang line.</p>
            <p><span className="text-slate-300"> - - -  - - -</span> Young Yin (stable) — a yielding, stable yin line.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-center">
            <p className="text-slate-700 text-xs italic">"The I Ching never lies. It only tells the truth in the language of symbols — which requires wisdom to translate."</p>
          </div>
        </div>
      </div>
    </div>
  )
}
