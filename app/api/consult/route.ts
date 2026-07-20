import { NextRequest, NextResponse } from 'next/server'
import { calculateBazi } from '@/lib/bazi'
import { buildPromptContext } from '@/lib/prompt'
import { callAI } from '@/lib/api'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, year, month, day, hour, minute, gender, question } = body

    // 解析出生时间
    const birthYear  = parseInt(year)
    const birthMonth = parseInt(month)
    const birthDay   = parseInt(day)
    const birthHour  = parseInt(hour)
    const birthMinute = parseInt(minute || '0')

    if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay) || isNaN(birthHour)) {
      return NextResponse.json({ error: '出生时间格式不正确' }, { status: 400 })
    }

    if (birthYear < 1900 || birthYear > 2050) {
      return NextResponse.json({ error: '年份需在1900-2050之间' }, { status: 400 })
    }

    // 排盘
    const bazi = calculateBazi(birthYear, birthMonth, birthDay, birthHour, birthMinute, gender)

    // 构建出生时间描述
    const birthTime = `${birthYear}年${birthMonth}月${birthDay}日${birthHour}时${birthMinute > 0 ? birthMinute + '分' : ''}`

    // 获取 API Key（支持多种服务商）
    const apiKey = process.env.SF_API_KEY || process.env.ZHIPU_API_KEY || process.env.GROQ_API_KEY || ''

    let analysis: string

    if (apiKey) {
      // 有 API Key：调用 AI 生成完整解读
      const prompt = buildPromptContext(bazi, birthTime, gender)

      // 如果用户有问题，追加到 prompt
      const finalPrompt = question
        ? prompt + `\n\n【用户额外问题】\n${question}\n请结合命盘，重点回答这个问题。`
        : prompt

      try {
        const aiResult = await callAI(finalPrompt)
        analysis = aiResult.text
      } catch (apiErr: any) {
        if (apiErr.message === 'NO_API_KEY') {
          // 没有配置任何 API Key，返回本地分析
          analysis = generateLocalAnalysis(bazi, birthTime, gender, question)
        } else {
          // API 调用失败，返回本地排盘 + 简要分析
          analysis = generateLocalAnalysis(bazi, birthTime, gender, question)
        }
      }
    } else {
      // 无 API Key：返回本地计算的简要分析
      analysis = generateLocalAnalysis(bazi, birthTime, gender, question)
    }

    return NextResponse.json({
      bazi,
      birthTime,
      gender,
      analysis,
      hasFullAccess: !!apiKey,
    })

  } catch (err: any) {
    console.error('Consult API error:', err)
    return NextResponse.json({ error: '服务器错误，请稍后再试' }, { status: 500 })
  }
}

/**
 * 本地生成简要分析（无 AI 时使用）
 */
function generateLocalAnalysis(bazi: any, birthTime: string, gender: string, question?: string): string {
  const { dayMasterStrength, usefulGod, harmfulGod, wuXingCount, tenGods, daYun } = bazi
  const { yearPillar, monthPillar, dayPillar, hourPillar } = bazi

  const wuxingStr = Object.entries(wuXingCount)
    .map(([k, v]) => `${k}${Number(v).toFixed(1)}分`)
    .join('、')

  const firstDaYun = daYun[0]
  const currentLiuNian = bazi.liuNian[0]

  let text = `【命理大师 · 八字命盘解读】

缘主您好，欢迎来到命理大师。
以下是基于您提供的出生时间排出的命盘分析及简要解读。

## 一、命盘总览

出生时间：${birthTime} · ${gender}命
四柱八字：${yearPillar.gan}${yearPillar.zhi}  ${monthPillar.gan}${monthPillar.zhi}  ${dayPillar.gan}${dayPillar.zhi}  ${hourPillar.gan}${hourPillar.zhi}
生肖属相：${bazi.zodiac}

日主分析：${dayMasterStrength.level}（${dayMasterStrength.explanation}）
五行分布：${wuxingStr}

## 二、十神概览

年柱（祖辈）：${tenGods.year} · ${yearPillar.hiddenStems.join('')}
月柱（父母/事业）：${tenGods.month} · ${monthPillar.hiddenStems.join('')}
日柱（本人/配偶）：${tenGods.day} · ${dayPillar.hiddenStems.join('')}
时柱（子女/晚年）：${tenGods.hour} · ${hourPillar.hiddenStems.join('')}

## 三、用神与忌神

用神（对您有利的）：${usefulGod.join('、')}
忌神（需要注意的）：${harmfulGod.join('、')}

## 四、大运走势

${firstDaYun ? `当前大运（${firstDaYun.age}）：${firstDaYun.ganZhi}
该大运期间需注意：${firstDaYun.gan}旺则事业顺利，${firstDaYun.zhi}旺则需注意人际关系。` : '暂无大运数据'}

## 五、流年提示

${currentLiuNian ? `流年（${currentLiuNian.year}年）：${currentLiuNian.ganZhi}
今年天干${currentLiuNian.gan}，地支${currentLiuNian.zhi}，建议关注事业发展与财运。` : ''}

${question ? `## 六、您的问题

「${question}」

此命盘显示：您命中带有独特的生命能量。具体需要结合您的命盘格局做进一步分析，建议预约付费完整解读，获取针对性的指导。` : ''}

---

⚠️ 以上为基础预览。完整的命盘解读包含详细性格分析、大运逐运解读、流年吉凶判断以及针对性的人生建议。
请支付 ¥39 获取完整报告。

如需完整深度解读，欢迎联系我们。
`

  return text
}
