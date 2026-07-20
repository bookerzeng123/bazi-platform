import { NextRequest, NextResponse } from 'next/server'
import { calculateBazi } from '@/lib/bazi'
import { callAI } from '@/lib/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { year, month, day, hour, minute, gender, question, name } = body

    // 验证必要参数
    if (!year || !month || !day || typeof hour !== 'number') {
      return NextResponse.json(
        { error: '请提供完整的出生时间（年、月、日、时）' },
        { status: 400 }
      )
    }

    // 验证数值范围
    if (year < 1900 || year > 2100) {
      return NextResponse.json(
        { error: '年份需在 1900-2100 之间' },
        { status: 400 }
      )
    }

    if (month < 1 || month > 12) {
      return NextResponse.json(
        { error: '月份需在 1-12 之间' },
        { status: 400 }
      )
    }

    if (day < 1 || day > 31) {
      return NextResponse.json(
        { error: '日期需在 1-31 之间' },
        { status: 400 }
      )
    }

    if (hour < 0 || hour > 23) {
      return NextResponse.json(
        { error: '时辰需在 0-23 之间' },
        { status: 400 }
      )
    }

    // 计算八字
    const bazi = calculateBazi(
      Number(year),
      Number(month),
      Number(day),
      Number(hour),
      Number(minute) || 0,
      gender === 'male' ? 'male' : 'female'
    )

    // 构建基础分析
    const basicAnalysis = buildBasicAnalysis(bazi)

    // 尝试调用 AI 进行深度解读
    let aiAnalysis = ''
    let aiProvider = ''
    let aiError = ''
    
    try {
      const prompt = buildAIPrompt(bazi, question, name)
      const aiResult = await callAI(prompt)
      aiAnalysis = aiResult.text
      aiProvider = aiResult.provider
    } catch (e: any) {
      console.error('AI 解读失败:', e)
      aiError = e.message
      // AI 失败时使用基础分析
    }

    return NextResponse.json({
      success: true,
      bazi,
      analysis: basicAnalysis,
      aiAnalysis: aiAnalysis || null,
      aiProvider: aiProvider || null,
      aiError: aiError || null,
      message: aiAnalysis ? '八字排盘成功，已生成 AI 深度解读' : '八字排盘成功',
    })
  } catch (error: any) {
    console.error('排盘错误:', error)
    return NextResponse.json(
      { error: '排盘失败：' + error.message },
      { status: 500 }
    )
  }
}

// 构建基础分析
function buildBasicAnalysis(bazi: any): string {
  return `
## 命盘概述

您的八字为：**${bazi.yearPillar.gan}${bazi.yearPillar.zhi}**年 **${bazi.monthPillar.gan}${bazi.monthPillar.zhi}**月 **${bazi.dayPillar.gan}${bazi.dayPillar.zhi}**日 **${bazi.hourPillar.gan}${bazi.hourPillar.zhi}**时

- **生肖**：${bazi.zodiac}
- **日主**：${bazi.dayPillar.gan}（五行属${getWuxing(bazi.dayPillar.gan)}）
- **日主强弱**：${bazi.dayMasterStrength.level}（${bazi.dayMasterStrength.explanation}）

## 十神分析

| 柱位 | 干支 | 十神 |
|------|------|------|
| 年柱 | ${bazi.yearPillar.gan}${bazi.yearPillar.zhi} | ${bazi.tenGods.year} |
| 月柱 | ${bazi.monthPillar.gan}${bazi.monthPillar.zhi} | ${bazi.tenGods.month}（月令）|
| 日柱 | ${bazi.dayPillar.gan}${bazi.dayPillar.zhi} | 日主 |
| 时柱 | ${bazi.hourPillar.gan}${bazi.hourPillar.zhi} | ${bazi.tenGods.hour} |

## 用神与忌神

- **用神**（有利）：${bazi.usefulGod.join('、')}
- **忌神**（不利）：${bazi.harmfulGod.join('、')}

## 大运走势

${bazi.daYun.slice(0, 5).map((dy: any) => `- ${dy.age}：${dy.ganZhi}（${dy.startYear}年起）`).join('\n')}

## 五行统计

- 木：${bazi.wuXingCount['木'].toFixed(1)}分
- 火：${bazi.wuXingCount['火'].toFixed(1)}分
- 土：${bazi.wuXingCount['土'].toFixed(1)}分
- 金：${bazi.wuXingCount['金'].toFixed(1)}分
- 水：${bazi.wuXingCount['水'].toFixed(1)}分
  `.trim()
}

// 构建 AI Prompt
function buildAIPrompt(bazi: any, question: string, name: string): string {
  return `您是一位拥有40年经验的专业八字命理大师，精通《渊海子平》《滴天髓》《穷通宝鉴》等经典命理著作。

请为以下命盘进行深度解读：

【基本信息】
${name ? `姓名：${name}` : ''}
八字：${bazi.yearPillar.gan}${bazi.yearPillar.zhi}年 ${bazi.monthPillar.gan}${bazi.monthPillar.zhi}月 ${bazi.dayPillar.gan}${bazi.dayPillar.zhi}日 ${bazi.hourPillar.gan}${bazi.hourPillar.zhi}时
生肖：${bazi.zodiac}
日主：${bazi.dayPillar.gan}（${bazi.dayMasterStrength.level}）

【十神配置】
年柱：${bazi.tenGods.year}
月柱：${bazi.tenGods.month}
时柱：${bazi.tenGods.hour}

【用神忌神】
用神：${bazi.usefulGod.join('、')}
忌神：${bazi.harmfulGod.join('、')}

${question ? `【用户问题】\n${question}` : ''}

请从以下几个方面进行详细解读：
1. 性格特点分析
2. 事业发展建议
3. 财运分析
4. 感情婚姻指导
5. 健康注意事项
6. ${question ? '针对用户问题的具体建议' : '近期运势提示'}

请用专业但易懂的语言，适当引用古语，结合现代生活给出实用建议。字数控制在800-1200字。`
}

function getWuxing(gan: string): string {
  const map: Record<string, string> = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水',
  }
  return map[gan] || '未知'
}
