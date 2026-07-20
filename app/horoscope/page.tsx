'use client'

import { useState } from 'react'
import Link from 'next/link'

const ZODIAC_SIGNS = [
  { name: '摩羯座', date: '12.22-1.19', element: '土', icon: '♑', traits: '务实、野心、保守', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: '水瓶座', date: '1.20-2.18', element: '风', icon: '♒', traits: '独立、创新、叛逆', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: '双鱼座', date: '2.19-3.20', element: '水', icon: '♓', traits: '浪漫、幻想、善良', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: '白羊座', date: '3.21-4.19', element: '火', icon: '♈', traits: '热情、冲动、勇敢', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: '金牛座', date: '4.20-5.20', element: '土', icon: '♉', traits: '稳重、务实、固执', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: '双子座', date: '5.21-6.21', element: '风', icon: '♊', traits: '聪明、善变、好奇', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
  { name: '巨蟹座', date: '6.22-7.22', element: '水', icon: '♋', traits: '敏感、顾家、情绪化', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
  { name: '狮子座', date: '7.23-8.22', element: '火', icon: '♌', traits: '自信、慷慨、爱面子', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: '处女座', date: '8.23-9.22', element: '土', icon: '♍', traits: '完美、细致、挑剔', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: '天秤座', date: '9.23-10.23', element: '风', icon: '♎', traits: '优雅、犹豫、公正', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
  { name: '天蝎座', date: '10.24-11.22', element: '水', icon: '♏', traits: '神秘、执着、占有欲', startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
  { name: '射手座', date: '11.23-12.21', element: '火', icon: '♐', traits: '自由、乐观、粗心', startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 },
]

function getZodiacSign(month: number, day: number) {
  // 遍历查找匹配的星座
  for (const sign of ZODIAC_SIGNS) {
    // 跨年的星座（摩羯座）
    if (sign.startMonth === 12 && sign.endMonth === 1) {
      if ((month === 12 && day >= sign.startDay) || (month === 1 && day <= sign.endDay)) {
        return sign
      }
    } else {
      // 正常情况
      if ((month === sign.startMonth && day >= sign.startDay) ||
          (month === sign.endMonth && day <= sign.endDay)) {
        return sign
      }
    }
  }
  // 默认返回摩羯座（如果日期刚好是12.22-1.19之间但没匹配到）
  return ZODIAC_SIGNS[0]
}

function generateHoroscope(signName: string) {
  // 基于星座名称生成固定的伪随机运势（同一天同一星座结果相同）
  const seed = signName.charCodeAt(0) + new Date().getDate()
  
  const fortuneTemplates = [
    { aspect: '综合运势', desc: ['运势旺盛，诸事顺遂', '平稳发展，稳扎稳打', '略有波动，谨慎行事', '机遇与挑战并存', '贵人相助，事半功倍'] },
    { aspect: '爱情运势', desc: ['桃花朵朵，缘分到来', '感情升温，甜蜜美满', '平淡是真，细水长流', '需要沟通，化解误会', '专注自我，静待良缘'] },
    { aspect: '事业运势', desc: ['事业腾飞，升职加薪', '工作顺利，获得认可', '稳扎稳打，积累经验', '遇到瓶颈，需要突破', '调整方向，重新出发'] },
    { aspect: '财运运势', desc: ['财源广进，投资获利', '正财稳定，偏财可期', '收支平衡，理性消费', '谨慎理财，避免风险', '开源节流，积累财富'] },
    { aspect: '健康运势', desc: ['精力充沛，状态极佳', '身体健康，注意保养', '劳逸结合，避免过劳', '注意饮食，调理肠胃', '加强锻炼，增强体质'] },
  ]
  
  const fortunes = fortuneTemplates.map((t, i) => ({
    aspect: t.aspect,
    level: ((seed + i) % 3) + 3, // 3-5星
    desc: t.desc[(seed + i) % t.desc.length],
  }))
  
  const colors = ['红色', '蓝色', '绿色', '黄色', '紫色', '白色', '粉色', '橙色']
  const directions = ['东', '南', '西', '北', '东南', '西北', '东北', '西南']
  
  const lucky = {
    number: ((seed * 7) % 99) + 1,
    color: colors[seed % colors.length],
    direction: directions[seed % directions.length],
  }
  
  return { fortunes, lucky }
}

export default function HoroscopePage() {
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const m = parseInt(month)
    const d = parseInt(day)
    
    if (!m || !d || m < 1 || m > 12 || d < 1 || d > 31) {
      return
    }
    
    const sign = getZodiacSign(m, d)
    const horoscope = generateHoroscope(sign.name)
    
    setResult({ sign, horoscope })
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
            星座运势
          </h1>
          <p className="text-slate-400 text-lg">探索十二星座的每日运势指引</p>
        </div>

        {/* 表单卡片 */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">选择出生日期</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs mb-1">月份</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    placeholder="1-12"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 text-center placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">日期</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="1-31"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    required
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 text-center placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              查看今日运势
            </button>
          </form>

          {/* 结果展示 */}
          {result && (
            <div className="mt-8 space-y-6">
              {/* 星座信息 */}
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-2xl border border-amber-500/30 p-8 text-center">
                <div className="text-6xl mb-4">{result.sign.icon}</div>
                <h2 className="text-2xl font-bold text-amber-400 mb-2">{result.sign.name}</h2>
                <p className="text-slate-400">{result.sign.date} · {result.sign.element}象星座</p>
                <p className="text-slate-500 mt-2">{result.sign.traits}</p>
              </div>

              {/* 运势详情 */}
              <div className="grid gap-4">
                {result.horoscope.fortunes.map((f: any, i: number) => (
                  <div key={i} className="bg-slate-900/50 rounded-xl p-4 border-l-4 border-amber-500">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-amber-400 font-medium">{f.aspect}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <span key={j} className={j < f.level ? 'text-amber-400' : 'text-slate-600'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* 幸运信息 */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 border border-amber-500/20">
                <h4 className="text-amber-400 font-bold text-center mb-4">✨ 今日幸运</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-slate-500 text-xs mb-1">幸运数字</div>
                    <div className="text-2xl font-bold text-amber-400">{result.horoscope.lucky.number}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs mb-1">幸运颜色</div>
                    <div className="text-2xl font-bold text-amber-400">{result.horoscope.lucky.color}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs mb-1">吉利方位</div>
                    <div className="text-2xl font-bold text-amber-400">{result.horoscope.lucky.direction}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 星座列表 */}
        <div>
          <h2 className="text-center text-2xl font-bold text-amber-400 mb-6">十二星座</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ZODIAC_SIGNS.map((sign) => (
              <div
                key={sign.name}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                onClick={() => {
                  setMonth(sign.startMonth.toString())
                  setDay(sign.startDay.toString())
                }}
              >
                <div className="text-3xl mb-2">{sign.icon}</div>
                <div className="text-slate-200 font-medium">{sign.name}</div>
                <div className="text-slate-500 text-xs">{sign.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
