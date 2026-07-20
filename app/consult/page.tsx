'use client'
import { useState } from 'react'
import Link from 'next/link'

type Gender = 'male' | 'female'

interface FormData {
  name: string
  year: string
  month: string
  day: string
  hour: string
  minute: string
  gender: Gender
  question: string
}

export default function ConsultPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
    gender: 'male',
    question: '',
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)

    const year = parseInt(form.year)
    const month = parseInt(form.month)
    const day = parseInt(form.day)
    const hour = parseInt(form.hour)

    if (!year || !month || !day || isNaN(hour)) {
      setError('请填写完整的出生时间')
      return
    }

    if (year < 1900 || year > 2100) {
      setError('年份需在 1900-2100 之间')
      return
    }

    if (month < 1 || month > 12) {
      setError('月份需在 1-12 之间')
      return
    }

    if (day < 1 || day > 31) {
      setError('日期需在 1-31 之间')
      return
    }

    if (hour < 0 || hour > 23) {
      setError('时辰需在 0-23 之间')
      return
    }

    setLoading(true)
    setError('')
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)
      
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year,
          month,
          day,
          hour,
          minute: parseInt(form.minute) || 0,
          gender: form.gender,
          question: form.question,
          name: form.name,
        }),
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || `排盘失败 (${res.status})`)
      }
      setResult(data)
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('请求超时，请稍后重试')
      } else {
        setError(err.message || '排盘失败，请检查网络连接')
      }
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: keyof FormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const baziDisplay = result?.bazi

  // 五行颜色映射
  const wuxingColors: Record<string, string> = {
    '木': '#4CAF50',
    '火': '#FF5722', 
    '土': '#8D6E63',
    '金': '#FFC107',
    '水': '#2196F3',
  }

  // 获取天干五行
  const getGanWuxing = (gan: string): string => {
    const map: Record<string, string> = {
      '甲': '木', '乙': '木',
      '丙': '火', '丁': '火',
      '戊': '土', '己': '土',
      '庚': '金', '辛': '金',
      '壬': '水', '癸': '水',
    }
    return map[gan] || ''
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* 导航栏 */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-lg">
              命
            </div>
            <span className="text-amber-400 font-bold text-xl tracking-wider">命理大师</span>
          </Link>
          <Link href="/" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
            ← 返回首页
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* 标题区 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 mb-4">
            八字命盘精批
          </h1>
          <p className="text-slate-400 text-lg">传承千年命理智慧 · 洞察人生运势轨迹</p>
        </div>

        {/* 表单卡片 */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 mb-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 称呼 */}
            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">您的称呼（可选）</label>
              <input
                type="text"
                placeholder="方便称呼您"
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>

            {/* 出生时间 */}
            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">出生时间（公历）</label>
              <div className="grid grid-cols-4 gap-3">
                <input
                  type="number"
                  placeholder="年"
                  value={form.year}
                  onChange={e => updateField('year', e.target.value)}
                  min="1900"
                  max="2100"
                  className="bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 text-center placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                />
                <input
                  type="number"
                  placeholder="月"
                  value={form.month}
                  onChange={e => updateField('month', e.target.value)}
                  min="1"
                  max="12"
                  className="bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 text-center placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                />
                <input
                  type="number"
                  placeholder="日"
                  value={form.day}
                  onChange={e => updateField('day', e.target.value)}
                  min="1"
                  max="31"
                  className="bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 text-center placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                />
                <input
                  type="number"
                  placeholder="时"
                  value={form.hour}
                  onChange={e => updateField('hour', e.target.value)}
                  min="0"
                  max="23"
                  className="bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 text-center placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
              <p className="text-slate-500 text-xs mt-2">示例：1990年8月15日14时 → 年:1990 月:8 日:15 时:14</p>
            </div>

            {/* 性别 */}
            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">性别（影响大运排法）</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => updateField('gender', 'male')}
                  className={`py-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    form.gender === 'male'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                      : 'border-slate-600 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <span className="text-xl">☰</span>
                  <span className="font-medium">男命</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateField('gender', 'female')}
                  className={`py-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    form.gender === 'female'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                      : 'border-slate-600 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <span className="text-xl">☱</span>
                  <span className="font-medium">女命</span>
                </button>
              </div>
            </div>

            {/* 问题 */}
            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">想问的问题（可选）</label>
              <textarea
                rows={3}
                placeholder="例如：我的事业运如何？今年有没有姻缘？"
                value={form.question}
                onChange={e => updateField('question', e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* 价格说明 */}
            <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-400 font-medium">💎 服务说明</p>
                  <p className="text-slate-400 text-sm mt-1">基础排盘 <span className="text-green-400">免费</span> · AI深度解读 <span className="text-amber-400">$5.99</span></p>
                </div>
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  正在排盘...
                </span>
              ) : (
                '开始八字排盘'
              )}
            </button>
          </form>
        </div>

        {/* 结果展示 */}
        {result && baziDisplay && (
          <div className="space-y-6">
            {/* 命盘总览 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 overflow-hidden">
              {/* 头部 */}
              <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-b border-amber-500/20 px-6 py-4">
                <h2 className="text-xl font-bold text-amber-400">命盘总览</h2>
                <p className="text-slate-400 text-sm mt-1">
                  {form.name || '缘主'} · {form.year}年{form.month}月{form.day}日{form.hour}时 · {form.gender === 'male' ? '男命' : '女命'} · 属{baziDisplay.zodiac}
                </p>
              </div>

              {/* 四柱 */}
              <div className="p-6">
                <div className="grid grid-cols-4 gap-0 border border-amber-500/30 rounded-lg overflow-hidden">
                  {[
                    { label: '年柱', pillar: baziDisplay.yearPillar, tenGod: baziDisplay.tenGods.year },
                    { label: '月柱', pillar: baziDisplay.monthPillar, tenGod: baziDisplay.tenGods.month },
                    { label: '日柱', pillar: baziDisplay.dayPillar, tenGod: '日主' },
                    { label: '时柱', pillar: baziDisplay.hourPillar, tenGod: baziDisplay.tenGods.hour },
                  ].map(({ label, pillar, tenGod }, idx) => (
                    <div key={label} className={`text-center py-6 ${idx < 3 ? 'border-r border-amber-500/20' : ''} bg-slate-900/30`}>
                      <div className="text-slate-500 text-xs mb-2 tracking-wider">{label}</div>
                      <div 
                        className="text-3xl font-bold mb-2"
                        style={{ color: wuxingColors[getGanWuxing(pillar.gan)] }}
                      >
                        {pillar.gan}{pillar.zhi}
                      </div>
                      <div className="inline-block px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded">
                        {tenGod}
                      </div>
                      <div className="text-slate-500 text-xs mt-2">
                        藏:{pillar.hiddenStems.join('')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 日主强弱 & 用神 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6">
                <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                  <span>🎯</span> 日主强弱
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">强度等级</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      baziDisplay.dayMasterStrength.level === '强' || baziDisplay.dayMasterStrength.level === '偏强'
                        ? 'bg-red-500/20 text-red-400'
                        : baziDisplay.dayMasterStrength.level === '弱' || baziDisplay.dayMasterStrength.level === '偏弱'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {baziDisplay.dayMasterStrength.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">得分</span>
                    <span className="text-amber-400 font-mono">{baziDisplay.dayMasterStrength.score}</span>
                  </div>
                  <p className="text-slate-400 text-sm pt-2 border-t border-slate-700">
                    {baziDisplay.dayMasterStrength.explanation}
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6">
                <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                  <span>✨</span> 用神忌神
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-slate-400 text-sm">用神（有利）</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {baziDisplay.usefulGod.map((g: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">忌神（不利）</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {baziDisplay.harmfulGod.map((g: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 大运走势 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <span>🌟</span> 大运走势
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {baziDisplay.daYun.slice(0, 5).map((dy: any, i: number) => (
                  <div key={i} className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="text-slate-500 text-xs mb-1">{dy.age}</div>
                    <div className="text-lg font-bold text-amber-400">{dy.ganZhi}</div>
                    <div className="text-slate-500 text-xs">{dy.startYear}年</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 五行统计 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <span>📊</span> 五行统计
              </h3>
              <div className="flex justify-around">
                {Object.entries(baziDisplay.wuXingCount).map(([wx, count]) => (
                  <div key={wx} className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-2"
                      style={{ 
                        backgroundColor: `${wuxingColors[wx]}20`,
                        color: wuxingColors[wx],
                        border: `2px solid ${wuxingColors[wx]}40`
                      }}
                    >
                      {wx}
                    </div>
                    <div className="text-slate-400 text-sm">{Number(count).toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI 解读或支付引导 */}
            {result.aiAnalysis ? (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-b border-amber-500/20 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                      <span>🤖</span> AI 深度解读
                    </h3>
                    {result.aiProvider && (
                      <span className="text-slate-500 text-xs">由 {result.aiProvider} 提供</span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {result.aiAnalysis}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-2xl border border-amber-500/30 p-8 text-center">
                <div className="text-5xl mb-4">🔮</div>
                <h3 className="text-2xl font-bold text-amber-400 mb-2">解锁 AI 深度解读</h3>
                <p className="text-slate-400 mb-6 max-w-md mx-auto">
                  获取专业命理大师级别的详细分析：性格特点、事业建议、财运预测、姻缘指导、健康提示
                </p>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto">
                  <span>💳</span>
                  <span>PayPal 支付 $5.99 解锁</span>
                </button>
                <p className="text-slate-500 text-sm mt-4">安全支付 · 即时解锁 · 永久查看</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
