import { NextRequest, NextResponse } from 'next/server'
import { calculateBazi } from '@/lib/bazi'
import { buildExpertPrompt } from '@/lib/prompt'
import { callAI } from '@/lib/api'

// ============================================================
// In-memory async analysis store
// Works within a single Railway Node.js instance
// ============================================================
const analysisStore = new Map<string, {
  aiText: string | null
  aiError: string | null
  done: boolean
  startedAt: number
}>()

// Cleanup stale entries older than 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [id, entry] of analysisStore) {
    if (now - entry.startedAt > 600_000) analysisStore.delete(id)
  }
}, 120_000)

// ============================================================
// POST /api/consult — returns bazi immediately, starts AI async
// ============================================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { birthYear, birthMonth, birthDay, birthHour, gender, question } = body

    if (!birthYear || !birthMonth || !birthDay || !birthHour) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const gy = parseInt(birthYear), gm = parseInt(birthMonth), gd = parseInt(birthDay), gh = parseInt(birthHour)
    if (isNaN(gy) || isNaN(gm) || isNaN(gd) || isNaN(gh) ||
        gy < 1900 || gy > 2030 || gm < 1 || gm > 12 || gd < 1 || gd > 31 || gh < 0 || gh > 23) {
      return NextResponse.json({ error: 'Invalid birth data' }, { status: 400 })
    }

    const genderVal = gender === 'female' ? 'female' : 'male'
    const bazi = calculateBazi(gy, gm, gd, gh, 0, genderVal)

    const yearPillar = `${bazi.yearPillar.gan}${bazi.yearPillar.zhi}`
    const monthPillar = `${bazi.monthPillar.gan}${bazi.monthPillar.zhi}`
    const dayPillar = `${bazi.dayPillar.gan}${bazi.dayPillar.zhi}`
    const hourPillar = `${bazi.hourPillar.gan}${bazi.hourPillar.zhi}`
    const zodiacAnimal = bazi.zodiac
    const dayMaster = bazi.dayPillar.gan
    const dayMasterElement =
      ['甲','乙','丙','丁','戊'].includes(dayMaster) ? 'Wood' :
      dayMaster === '己' || dayMaster === '庚' ? 'Earth' :
      dayMaster === '辛' ? 'Metal' : 'Water'

    const baziResult = {
      yearPillar, monthPillar, dayPillar, hourPillar,
      zodiacAnimal,
      dayMaster: dayMaster,
      dayMasterElement,
      dayMasterStrength: {
        level: bazi.dayMasterStrength.level,
        score: bazi.dayMasterStrength.score,
        reason: bazi.dayMasterStrength.explanation,
      },
      tenGods: bazi.tenGods,
      usefulGod: bazi.usefulGod[0] || '',
      harmfulGod: bazi.harmfulGod[0] || '',
      wuXingScores: bazi.wuXingCount,
      hiddenStems: {
        year: bazi.yearPillar.hiddenStems,
        month: bazi.monthPillar.hiddenStems,
        day: bazi.dayPillar.hiddenStems,
        hour: bazi.hourPillar.hiddenStems,
      },
      daYun: bazi.daYun.map(d => ({ pillar: d.ganZhi, ageStart: d.startYear, ageEnd: d.startYear + 9 })),
      liuNian: bazi.liuNian.map(l => ({ pillar: l.ganZhi, year: l.year })),
    }

    // Generate a unique analysis ID
    const analysisId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    // Initialize store entry
    analysisStore.set(analysisId, { aiText: null, aiError: null, done: false, startedAt: Date.now() })

    // Fire AI call asynchronously (non-blocking)
    const prompt = buildExpertPrompt({
      ...baziResult,
      dayMaster: dayMaster,
      gender: genderVal,
      question: question || '',
    })

    callAI(prompt).then(result => {
      const entry = analysisStore.get(analysisId)
      if (entry) {
        // Strip <thinking>...</thinking> blocks so the user only sees the polished reading
        const cleaned = result.text.replace(/<thinking>[\s\S]*?<\/thinking>/gi, '').trim()
        entry.aiText = cleaned
        entry.done = true
      }
    }).catch((err: any) => {
      const entry = analysisStore.get(analysisId)
      if (entry) {
        entry.aiError = err.message?.includes('timeout') ? 'TIMEOUT' :
          err.message?.includes('NO_API_KEY') ? 'NO_API_KEY' : err.message || 'UNKNOWN_ERROR'
        entry.done = true
      }
    })

    // Return bazi result immediately + analysisId for polling
    return NextResponse.json({ ...baziResult, analysisId, aiStatus: 'processing' })

  } catch (err: any) {
    console.error('[consult API error]', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}

// ============================================================
// GET /api/consult?analysisId=xxx — poll for AI result
// ============================================================
export async function GET(req: NextRequest) {
  const analysisId = req.nextUrl.searchParams.get('analysisId')
  if (!analysisId) {
    return NextResponse.json({ error: 'Missing analysisId' }, { status: 400 })
  }

  const entry = analysisStore.get(analysisId)
  if (!entry) {
    return NextResponse.json({ error: 'Analysis not found' }, { status: 404 })
  }

  if (!entry.done) {
    // Still processing
    const elapsed = Math.floor((Date.now() - entry.startedAt) / 1000)
    return NextResponse.json({ aiStatus: 'processing', elapsed })
  }

  // Done
  return NextResponse.json({
    aiStatus: 'done',
    aiAnalysis: entry.aiText,
    aiError: entry.aiError,
  })
}
