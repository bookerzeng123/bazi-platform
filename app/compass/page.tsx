'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// 二十四山向
const MOUNTAINS_24 = [
  { name: '壬', angle: 337.5, type: '水' },
  { name: '子', angle: 0, type: '水' },
  { name: '癸', angle: 22.5, type: '水' },
  { name: '丑', angle: 45, type: '土' },
  { name: '艮', angle: 67.5, type: '土' },
  { name: '寅', angle: 90, type: '木' },
  { name: '甲', angle: 112.5, type: '木' },
  { name: '卯', angle: 135, type: '木' },
  { name: '乙', angle: 157.5, type: '木' },
  { name: '辰', angle: 180, type: '土' },
  { name: '巽', angle: 202.5, type: '木' },
  { name: '巳', angle: 225, type: '火' },
  { name: '丙', angle: 247.5, type: '火' },
  { name: '午', angle: 270, type: '火' },
  { name: '丁', angle: 292.5, type: '火' },
  { name: '未', angle: 315, type: '土' },
  { name: '坤', angle: 337.5, type: '土' },
  { name: '申', angle: 0, type: '金' },
  { name: '庚', angle: 22.5, type: '金' },
  { name: '酉', angle: 45, type: '金' },
  { name: '辛', angle: 67.5, type: '金' },
  { name: '戌', angle: 90, type: '土' },
  { name: '乾', angle: 112.5, type: '金' },
  { name: '亥', angle: 135, type: '水' },
]

// 八方位
const DIRECTIONS = [
  { name: '北', angle: 0, wuxing: '水', color: '#1E88E5', desc: '事业、官运' },
  { name: '东北', angle: 45, wuxing: '土', color: '#8D6E63', desc: '智慧、学业' },
  { name: '东', angle: 90, wuxing: '木', color: '#43A047', desc: '健康、家庭' },
  { name: '东南', angle: 135, wuxing: '木', color: '#43A047', desc: '财运、人缘' },
  { name: '南', angle: 180, wuxing: '火', color: '#E53935', desc: '名声、地位' },
  { name: '西南', angle: 225, wuxing: '土', color: '#8D6E63', desc: '感情、婚姻' },
  { name: '西', angle: 270, wuxing: '金', color: '#FFB300', desc: '子孙、喜悦' },
  { name: '西北', angle: 315, wuxing: '金', color: '#FFB300', desc: '贵人、助力' },
]

// 2026年九宫飞星
const FLYING_STARS_2026 = [
  { position: '中宫', star: 2, name: '二黑', type: '凶', desc: '病符星，主疾病' },
  { position: '正北', star: 7, name: '七赤', type: '凶', desc: '破军星，主盗贼' },
  { position: '西南', star: 9, name: '九紫', type: '吉', desc: '右弼星，主喜庆' },
  { position: '正东', star: 4, name: '四绿', type: '平', desc: '文曲星，主学业' },
  { position: '东南', star: 5, name: '五黄', type: '凶', desc: '廉贞星，主灾祸' },
  { position: '中西北', star: 6, name: '六白', type: '吉', desc: '武曲星，主偏财' },
  { position: '正西', star: 8, name: '八白', type: '吉', desc: '左辅星，主正财' },
  { position: '东北', star: 1, name: '一白', type: '吉', desc: '贪狼星，主桃花' },
  { position: '正南', star: 3, name: '三碧', type: '凶', desc: '禄存星，主是非' },
]

export default function CompassPage() {
  const [direction, setDirection] = useState(0)
  const [location, setLocation] = useState('')
  const [isAnimating, setIsAnimating] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'compass' | 'flyingstar'>('compass')

  useEffect(() => {
    if (!isAnimating) return
    const interval = setInterval(() => {
      setDirection(prev => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [isAnimating])

  const getCurrentDirection = () => {
    const normalized = (direction % 360 + 360) % 360
    return DIRECTIONS.reduce((closest, dir) => {
      const diff = Math.abs(normalized - dir.angle)
      const closestDiff = Math.abs(normalized - closest.angle)
      return diff < closestDiff ? dir : closest
    })
  }

  const currentDir = getCurrentDirection()

  const getMountain = (angle: number) => {
    const normalized = (angle % 360 + 360) % 360
    return MOUNTAINS_24.reduce((closest, m) => {
      const diff = Math.abs(normalized - m.angle)
      const closestDiff = Math.abs(normalized - closest.angle)
      return diff < closestDiff ? m : closest
    })
  }

  return (
    <div>
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="logo">
            <div className="logo-icon">☯</div>
            <span className="logo-text">命理大师</span>
          </Link>
          <Link href="/" className="nav-cta">返回首页</Link>
        </div>
      </nav>

      <div className="consult-page">
        <div className="page-header">
          <h1 className="page-title">风水罗盘</h1>
          <p className="breadcrumb">
            <Link href="/">首页</Link> / 风水罗盘
          </p>
        </div>

        {/* 标签切换 */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setSelectedTab('compass')}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              borderRadius: '8px',
              background: selectedTab === 'compass' ? 'linear-gradient(135deg, #8B0000 0%, #A52A2A 100%)' : '#f0f0f0',
              color: selectedTab === 'compass' ? 'white' : '#666',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            🧭 电子罗盘
          </button>
          <button
            onClick={() => setSelectedTab('flyingstar')}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              borderRadius: '8px',
              background: selectedTab === 'flyingstar' ? 'linear-gradient(135deg, #8B0000 0%, #A52A2A 100%)' : '#f0f0f0',
              color: selectedTab === 'flyingstar' ? 'white' : '#666',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            ⭐ 九宫飞星
          </button>
        </div>

        {selectedTab === 'compass' ? (
          <div className="form-card">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              {/* 罗盘 */}
              <div style={{
                width: '320px',
                height: '320px',
                margin: '0 auto 2rem',
                position: 'relative',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)',
              }}>
                {/* 外圈刻度 */}
                <div style={{
                  position: 'absolute',
                  inset: '15px',
                  borderRadius: '50%',
                  border: '2px solid #D4AF37',
                }}>
                  {/* 二十四山向 */}
                  {MOUNTAINS_24.map((m, i) => {
                    const angle = m.angle - direction
                    const rad = (angle * Math.PI) / 180
                    const x = 50 + 42 * Math.sin(rad)
                    const y = 50 - 42 * Math.cos(rad)
                    return (
                      <div
                        key={m.name}
                        style={{
                          position: 'absolute',
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)',
                          fontSize: '0.75rem',
                          color: m.type === '水' ? '#1E88E5' : m.type === '木' ? '#43A047' : m.type === '火' ? '#E53935' : m.type === '金' ? '#FFB300' : '#8D6E63',
                          fontWeight: 'bold',
                        }}
                      >
                        {m.name}
                      </div>
                    )
                  })}
                  
                  {/* 八方位 */}
                  {DIRECTIONS.map((d) => {
                    const angle = d.angle - direction
                    const rad = (angle * Math.PI) / 180
                    const x = 50 + 35 * Math.sin(rad)
                    const y = 50 - 35 * Math.cos(rad)
                    return (
                      <div
                        key={d.name}
                        style={{
                          position: 'absolute',
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)',
                          fontSize: '0.9rem',
                          color: d.color,
                          fontWeight: 'bold',
                        }}
                      >
                        {d.name}
                      </div>
                    )
                  })}
                </div>
                
                {/* 内圈 */}
                <div style={{
                  position: 'absolute',
                  inset: '50px',
                  borderRadius: '50%',
                  border: '1px solid rgba(212,175,55,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {/* 八卦符号 */}
                  {['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'].map((gua, i) => {
                    const angle = i * 45 - direction
                    const rad = (angle * Math.PI) / 180
                    const x = 50 + 25 * Math.sin(rad)
                    const y = 50 - 25 * Math.cos(rad)
                    return (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)',
                          fontSize: '1.2rem',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {gua}
                      </div>
                    )
                  })}
                  
                  {/* 中心点 */}
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E8C1 100%)',
                    borderRadius: '50%',
                    position: 'relative',
                    zIndex: 10,
                    boxShadow: '0 0 20px rgba(212,175,55,0.5)',
                  }} />
                </div>
                
                {/* 指针 */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '0',
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '15px solid #E53935',
                  zIndex: 20,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                }} />
              </div>

              {/* 控制按钮 */}
              <div style={{ marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: isAnimating ? '#E53935' : '#43A047',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {isAnimating ? '⏸ 停止' : '▶ 开始'}
                </button>
              </div>

              {/* 当前方向信息 */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(139,0,0,0.1) 0%, rgba(212,175,55,0.1) 100%)',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>当前方位</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: currentDir.color }}>
                      {currentDir.name}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>精确角度</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {Math.round(direction % 360)}°
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>二十四山</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37' }}>
                      {getMountain(direction).name}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                  <span style={{ color: '#666' }}>五行属性：</span>
                  <span style={{ color: currentDir.color, fontWeight: 'bold' }}>{currentDir.wuxing}</span>
                  <span style={{ color: '#666', marginLeft: '1rem' }}>主掌：</span>
                  <span style={{ fontWeight: 'bold' }}>{currentDir.desc}</span>
                </div>
              </div>

              {/* 方位分析 */}
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>📍 八方位吉凶分析（2026年）</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                }}>
                  {DIRECTIONS.map((d) => (
                    <div key={d.name} style={{
                      padding: '1rem',
                      background: d.name === currentDir.name ? `${d.color}15` : '#f8f8f8',
                      borderRadius: '8px',
                      borderLeft: `4px solid ${d.color}`,
                      border: d.name === currentDir.name ? `2px solid ${d.color}` : 'none',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold', color: d.color }}>{d.name}</span>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>{d.wuxing}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>{d.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 输入位置 */}
              <div style={{ marginTop: '2rem' }}>
                <input
                  type="text"
                  placeholder="输入您的位置（如：北京、上海）"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '0.75rem 1rem',
                    border: '2px solid #e5e5e5',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <button className="submit-btn" style={{ marginTop: '1rem', maxWidth: '400px' }}>
                获取详细风水分析
              </button>
            </div>
          </div>
        ) : (
          /* 九宫飞星 */
          <div className="form-card">
            <div style={{ padding: '2rem' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>2026年（丙午年）九宫飞星图</h3>
              
              {/* 九宫格 */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                maxWidth: '400px',
                margin: '0 auto 2rem',
              }}>
                {[
                  FLYING_STARS_2026[7], FLYING_STARS_2026[0], FLYING_STARS_2026[1],
                  FLYING_STARS_2026[6], FLYING_STARS_2026[8], FLYING_STARS_2026[2],
                  FLYING_STARS_2026[5], FLYING_STARS_2026[4], FLYING_STARS_2026[3],
                ].map((star, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: star.type === '吉' ? '#E8F5E9' : star.type === '凶' ? '#FFEBEE' : '#FFF3E0',
                      borderRadius: '8px',
                      border: `2px solid ${star.type === '吉' ? '#43A047' : star.type === '凶' ? '#E53935' : '#FF9800'}`,
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>{star.position}</div>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold',
                      color: star.type === '吉' ? '#43A047' : star.type === '凶' ? '#E53935' : '#FF9800'
                    }}>
                      {star.star}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{star.name}</div>
                  </div>
                ))}
              </div>

              {/* 飞星说明 */}
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {FLYING_STARS_2026.filter(s => s.position !== '中宫').map((star) => (
                  <div key={star.position} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    background: star.type === '吉' ? '#E8F5E9' : star.type === '凶' ? '#FFEBEE' : '#FFF3E0',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: star.type === '吉' ? '#43A047' : star.type === '凶' ? '#E53935' : '#FF9800',
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                      {star.star}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold' }}>{star.position} · {star.name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>{star.desc}</div>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      background: star.type === '吉' ? '#43A047' : star.type === '凶' ? '#E53935' : '#FF9800',
                      color: 'white',
                    }}>
                      {star.type}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f8f8', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>💡 2026年风水建议</h4>
                <ul style={{ paddingLeft: '1.5rem', color: '#666', lineHeight: 1.8 }}>
                  <li><strong>正西（八白财位）</strong>：今年财位，宜摆放招财物品</li>
                  <li><strong>东北（一白桃花）</strong>：桃花位，单身者可催旺姻缘</li>
                  <li><strong>东南（五黄煞位）</strong>：今年凶位，宜静不宜动</li>
                  <li><strong>正南（三碧是非）</strong>：是非位，避免红色装饰</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
