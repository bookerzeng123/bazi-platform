import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { year, month, day, hour, minute, gender, question } = body

    if (!year || !month || !day || !hour) {
      return NextResponse.json({ error: '缺少必要的出生时间信息' }, { status: 400 })
    }

    // 模拟返回（后续接入 AI）
    return NextResponse.json({
      success: true,
      message: '八字排盘功能即将上线',
      bazi: null,
      analysis: '感谢您的耐心等待！完整版八字解读正在开发中...'
    })
  } catch (error) {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}