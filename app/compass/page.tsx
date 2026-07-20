'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// 二十四山向（每山15°，从子山正中0°起）
const MOUNTAINS_24 = [
  { name: '子', angle: 0, type: '水', wuxing: '水' },
  { name: '癸', angle: 15, type: '水', wuxing: '水' },
  { name: '丑', angle: 30, type: '土', wuxing: '土' },
  { name: '艮', angle: 60, type: '土', wuxing: '土' },
  { name: '寅', angle: 90, type: '木', wuxing: '木' },
  { name: '甲', angle: 105, type: '木', wuxing: '木' },
  { name: '卯', angle: 120, type: '木', wuxing: '木' },
  { name: '乙', angle: 135, type: '木', wuxing: '木' },
  { name: '辰', angle: 150, type: '土', wuxing: '土' },
  { name: '巽', angle: 165, type: '木', wuxing: '木' },
  { name: '巳', angle: 180, type: '火', wuxing: '火' },
  { name: '丙', angle: 195, type: '火', wuxing: '火' },
  { name: '午', angle: 210, type: '火', wuxing: '火' },
  { name: '丁', angle: 225, type: '火', wuxing: '火' },
  { name: '未', angle: 240, type: '土', wuxing: '土' },
  { name: '坤', angle: 255, type: '土', wuxing: '土' },
  { name: '申', angle: 270, type: '金', wuxing: '金' },
  { name: '庚', angle: 285, type: '金', wuxing: '金' },
  { name: '酉', angle: 300, type: '金', wuxing: '金' },
  { name: '辛', angle: 315, type: '金', wuxing: '金' },
  { name: '戌', angle: 330, type: '土', wuxing: '土' },
  { name: '乾', angle: 345, type: '金', wuxing: '金' },
  { name: '亥', angle: 0, type: '水', wuxing: '水' },
  { name: '壬', angle: 15, type: '水', wuxing: '水' },
]

// 八方位吉凶分析
const DIRECTIONS = [
  { name: '北', angle: 0, wuxing: '水', color: '#1E88E5', desc: '事业、官运、智慧', good: true },
  { name: '东北', angle: 45, wuxing: '土', color: '#8D6E63', desc: '文昌、学业、出路', good: false },
  { name: '东', angle: 90, wuxing: '木', color: '#43A047', desc: '健康、家庭、贵人', good: true },
  { name: '东南', angle: 135, wuxing: '木', color: '#66BB6A', desc: '财运、人缘、名声', good: true },
  { name: '南', angle: 180, wuxing: '火', color: '#E53935', desc: '名声、地位、文昌', good: true },
  { name: '西南', angle: 225, wuxing: '土', color: '#A1887F', desc: '感情、婚姻、财运', good: false },
  { name: '西', angle: 270, wuxing: '金', color: '#FFB300', desc: '子孙、喜悦、桃花', good: true },
  { name: '西北', angle: 315, wuxing: '金', color: '#FFCA28', desc: '贵人、助力、事业', good: true },
]

// 2026年九宫飞星（九宫飞星每年变化）
const FLYING_STARS_2026 = [
  { position: '正北', star: 7, name: '七赤', type: '凶', desc: '破军星，主口舌、盗贼', color: '#E53935' },
  { position: '正南', star: 9, name: '九紫', type: '吉', desc: '右弼星，主喜庆、姻缘', color: '#E91E63' },
  { position: '正东', star: 3, name: '三碧', type: '凶', desc: '禄存星，主官非、争吵', color: '#FF5722' },
  { position: '正西', star: 5, name: '五黄', type: '大凶', desc: '廉贞星，主疾病、灾祸', color: '#B71C1C' },
  { position: '东南', star: 1, name: '一白', type: '吉', desc: '贪狼星，主财运、桃花', color: '#2196F3' },
  { position: '东北', star: 4, name: '四绿', type: '平', desc: '文昌星，主学业、文书', color: '#4CAF50' },
  { position: '西南', star: 2, name: '二黑', type: '凶', desc: '巨门星，主病符、阴灵', color: '#795548' },
  { position: '西北', star: 6, name: '六白', type: '吉', desc: '武曲星，主事业、贵人', color: '#607D8B' },
  { position: '中宫', star: 8, name: '八白', type: '吉', desc: '左辅星，主财运、田产', color: '#FF9800' },
]

function getMountainInfo(angle: number) {
  // 找出最接近的山
  let closest = MOUNTAINS_24[0]
  let minDiff = 360
  for (const m of MOUNTAINS_24) {
    let diff = Math.abs(m.angle - angle)
    if (diff > 180) diff = 360 - diff
    if (diff < minDiff) {
      minDiff = diff
      closest = m
    }
  }
  return closest
}

function getDirectionInfo(angle: number) {
  // 八方位各占45°
  const idx = Math.round(angle / 45) % 8
  return DIRECTIONS[idx]
}

export default function CompassPage() {
  const [compassAngle, setCompassAngle] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [phoneDirection, setPhoneDirection] = useState<string | null>(null)

  useEffect(() => {
    // 模拟罗盘旋转动画
    if (!isAnimating) return
    const interval = setInterval(() => {
      setCompassAngle(prev => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [isAnimating])

  useEffect(() => {
    // 尝试获取设备方向
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      const handleOrientation = (e: any) => {
        if (e.alpha !== null) {
          setCompassAngle(360 - e.alpha)
          setPhoneDirection(getDirectionInfo(360 - e.alpha).name)
        }
      }
      window.addEventListener('deviceorientation', handleOrientation)
      return () => window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  const handleManualAngle = (angle: number) => {
    setIsAnimating(false)
    setCompassAngle(angle)
  }

  const mountain = getMountainInfo(compassAngle)
  const direction = getDirectionInfo(compassAngle)

  const wuxingColor: Record<string, string> = {
    '木': '#4CAF50',
    '火': '#E53935',
    '土': '#795548',
    '金': '#FFB300',
    '水': '#1E88E5',
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
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 mb-4">
            风水罗盘
          </h1>
          <p className="text-slate-400 text-lg">传统风水学与现代科技结合，洞察空间能量</p>
        </div>

        {/* 罗盘主体 */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-amber-500/20 p-8 mb-8">
          {/* 罗盘SVG */}
          <div className="relative w-full aspect-square max-w-md mx-auto mb-8">
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
              {/* 最外圈 - 二十四山 */}
              <circle cx="200" cy="200" r="190" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3"/>
              
              {/* 罗盘刻度 */}
              {Array.from({ length: 360 }, (_, i) => {
                const angle = (i - 90) * Math.PI / 180
                const isMain = i % 30 === 0
                const isMedium = i % 15 === 0 && !isMain
                const isSmall = i % 5 === 0 && !isMedium && !isMain
                const r1 = isMain ? 165 : isMedium ? 172 : isSmall ? 178 : 182
                const r2 = 188
                return (
                  <line
                    key={i}
                    x1={200 + r1 * Math.cos(angle)}
                    y1={200 + r1 * Math.sin(angle)}
                    x2={200 + r2 * Math.cos(angle)}
                    y2={200 + r2 * Math.sin(angle)}
                    stroke={isMain ? '#D4AF37' : isMedium ? '#D4AF3780' : '#D4AF3730'}
                    strokeWidth={isMain ? 2 : 1}
                  />
                )
              })}

              {/* 天干地支标注 */}
              {MOUNTAINS_24.filter((_, i) => i % 2 === 0).map((m, i) => {
                const angle = (m.angle - 90) * Math.PI / 180
                const r = 155
                return (
                  <text
                    key={m.name}
                    x={200 + r * Math.cos(angle)}
                    y={200 + r * Math.sin(angle)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={wuxingColor[m.wuxing] || '#D4AF37'}
                    fontSize="14"
                    fontWeight="bold"
                    transform={`rotate(${m.angle}, ${200 + r * Math.cos(angle)}, ${200 + r * Math.sin(angle)})`}
                  >
                    {m.name}
                  </text>
                )
              })}

              {/* 五行圆环 */}
              <circle cx="200" cy="200" r="125" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
              
              {/* 内圈 - 八卦 */}
              <circle cx="200" cy="200" r="80" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="1.5"/>
              
              {/* 指针 - 动态旋转 */}
              <g transform={`rotate(${compassAngle}, 200, 200)`}>
                <polygon points="200,50 195,200 200,220 205,200" fill="#E53935" opacity="0.9"/>
                <polygon points="200,350 195,200 200,180 205,200" fill="#1a1a1a" stroke="#666" strokeWidth="1"/>
                <circle cx="200" cy="200" r="8" fill="#D4AF37"/>
              </g>

              {/* 中心点 */}
              <circle cx="200" cy="200" r="4" fill="#D4AF37"/>

              {/* 北东南西标注 */}
              {['北', '东', '南', '西'].map((dir, i) => {
                const angle = (i * 90 - 90) * Math.PI / 180
                const r = 195
                return (
                  <text
                    key={dir}
                    x={200 + r * Math.cos(angle)}
                    y={200 + r * Math.sin(angle)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#E53935"
                    fontSize="16"
                    fontWeight="bold"
                  >
                    {dir}
                  </text>
                )
              })}
            </svg>

            {/* 当前读数 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 px-6 py-2 rounded-full border border-amber-500/50">
              <span className="text-amber-400 font-bold text-xl">{compassAngle.toFixed(1)}°</span>
              <span className="text-slate-400 ml-2">{mountain.name}山 {mountain.wuxing}气</span>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => { setIsAnimating(!isAnimating); if (!isAnimating) setPhoneDirection(null) }}
              className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors"
            >
              {isAnimating ? '⏸ 暂停' : '▶ 开始'}
            </button>
            <button
              onClick={() => { setIsAnimating(false); setPhoneDirection(null); handleManualAngle(0) }}
              className="px-6 py-2 border border-amber-500 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
            >
              指北
            </button>
            <button
              onClick={() => { setIsAnimating(false); setPhoneDirection(null); handleManualAngle(90) }}
              className="px-6 py-2 border border-amber-500 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
            >
              指东
            </button>
          </div>

          {/* 手机陀螺仪提示 */}
          {phoneDirection && (
            <div className="text-center text-green-400 text-sm mb-4">
              📱 检测到设备方向：{phoneDirection} — 点击"暂停"可手动调整
            </div>
          )}

          {/* 当前方位分析 */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-amber-400 font-bold mb-4 text-center">📍 {direction.name} — {mountain.name}山 {mountain.type}卦</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                <div className="text-slate-400 text-sm mb-1">五行</div>
                <div className="text-3xl" style={{ color: wuxingColor[direction.wuxing] }}>{direction.wuxing}</div>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                <div className="text-slate-400 text-sm mb-1">吉凶</div>
                <div className={`text-3xl ${direction.good ? 'text-green-400' : 'text-red-400'}`}>
                  {direction.good ? '吉' : '平'}
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm text-center mt-4">{direction.desc}</p>
          </div>
        </div>

        {/* 2026年九宫飞星 */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6 mb-8">
          <h2 className="text-xl font-bold text-amber-400 mb-4 text-center">🌟 2026年九宫飞星</h2>
          <div className="grid grid-cols-3 gap-3">
            {FLYING_STARS_2026.map((star) => (
              <div key={star.position} className="bg-slate-900/50 rounded-lg p-3 text-center border border-slate-700">
                <div className="text-slate-500 text-xs mb-1">{star.position}</div>
                <div className="text-2xl font-bold" style={{ color: star.color }}>{star.name}</div>
                <div className={`text-xs mt-1 ${star.type === '吉' ? 'text-green-400' : star.type === '大凶' ? 'text-red-600' : 'text-yellow-400'}`}>
                  {star.type}
                </div>
                <div className="text-slate-500 text-xs mt-1">{star.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 方位说明 */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6">
          <h2 className="text-xl font-bold text-amber-400 mb-4 text-center">🧭 八方位吉凶一览</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DIRECTIONS.map((dir) => (
              <div key={dir.name} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: dir.color }}>
                    {dir.name[0]}
                  </div>
                  <div>
                    <div className="text-slate-200 font-medium">{dir.name}</div>
                    <div className="text-xs" style={{ color: dir.color }}>{dir.wuxing}气</div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded ${dir.good ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {dir.good ? '✓ 吉利方位' : '○ 需注意'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
