import { NextRequest, NextResponse } from 'next/server'
import { calculateBazi } from '@/lib/bazi'
import { buildExpertPrompt } from '@/lib/prompt'
import { callAI } from '@/lib/api'

function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]) as Promise<T>
}

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

    // Calculate the Four Pillars
    const bazi = calculateBazi(gy, gm, gd, gh, 0, genderVal)

    // Map BaziResult to prompt format
    const yearPillar = `${bazi.yearPillar.gan}${bazi.yearPillar.zhi}`
    const monthPillar = `${bazi.monthPillar.gan}${bazi.monthPillar.zhi}`
    const dayPillar = `${bazi.dayPillar.gan}${bazi.dayPillar.zhi}`
    const hourPillar = `${bazi.hourPillar.gan}${bazi.hourPillar.zhi}`
    const dayMaster = bazi.dayPillar.gan
    const zodiacAnimal = bazi.zodiac
    const dayMasterElement = dayMaster in { '甲': 1, '乙': 1, '丙': 1, '丁': 1, '戊': 1 } ? 'Wood' :
      dayMaster === '己' || dayMaster === '庚' ? 'Earth' :
      dayMaster === '辛' ? 'Metal' :
      dayMaster === '壬' || dayMaster === '癸' ? 'Water' : 'Unknown'

    // Build AI prompt
    const prompt = buildExpertPrompt({
      yearPillar,
      monthPillar,
      dayPillar,
      hourPillar,
      zodiacAnimal,
      dayMaster,
      dayMasterElement,
      dayMasterStrength: {
        level: bazi.dayMasterStrength.level,
        score: bazi.dayMasterStrength.score,
        reason: bazi.dayMasterStrength.explanation,
      },
      tenGods: {
        year: bazi.tenGods.year,
        month: bazi.tenGods.month,
        day: bazi.tenGods.day,
        hour: bazi.tenGods.hour,
      },
      usefulGod: bazi.usefulGod[0] || '',
      harmfulGod: bazi.harmfulGod[0] || '',
      wuXingScores: bazi.wuXingCount,
      daYun: bazi.daYun.map(d => ({
        pillar: d.ganZhi,
        ageStart: d.startYear,
        ageEnd: d.startYear + 9,
      })),
      liuNian: bazi.liuNian.map(l => ({
        pillar: l.ganZhi,
        year: l.year,
      })),
      gender: genderVal,
      question: question || '',
    })

    // Try AI analysis
    let aiText: string | null = null
    let aiError: string | null = null

    console.log('[AI Debug] SF_API_KEY exists:', !!process.env.SF_API_KEY)
    console.log('[AI Debug] ZHIPU_API_KEY exists:', !!process.env.ZHIPU_API_KEY)

    try {
      const result = await timeout(callAI(prompt), 30000)
      aiText = result.text
      console.log('[AI Debug] Success from:', result.provider)
    } catch (err: any) {
      console.error('[AI Debug] Error:', err.message)
      if (err.message === 'NO_API_KEY' || err.message?.includes('401') || err.message?.includes('403')) {
        aiError = 'NO_API_KEY'
      } else if (err.message === 'timeout') {
        aiError = 'TIMEOUT'
      } else {
        aiError = err.message || 'UNKNOWN_ERROR'
      }
    }

    // Return full bazi result + AI
    return NextResponse.json({
      yearPillar,
      monthPillar,
      dayPillar,
      hourPillar,
      zodiacAnimal,
      dayMaster,
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
      daYun: bazi.daYun.map(d => ({
        pillar: d.ganZhi,
        ageStart: d.startYear,
        ageEnd: d.startYear + 9,
      })),
      liuNian: bazi.liuNian.map(l => ({
        pillar: l.ganZhi,
        year: l.year,
      })),
      aiAnalysis: aiText,
      aiError,
    })

  } catch (err: any) {
    console.error('[consult API error]', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
