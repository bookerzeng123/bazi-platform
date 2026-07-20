'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CompassPage() {
  const [direction, setDirection] = useState(0)
  const [location, setLocation] = useState<string>('')

  useEffect(() => {
    // 模拟罗盘旋转
    const interval = setInterval(() => {
      setDirection(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const directions = [
    { name: '北', angle: 0, wuxing: '水', color: '#1E88E5' },
    { name: '东北', angle: 45, wuxing: '土', color: '#8D6E63' },
    { name: '东', angle: 90, wuxing: '木', color: '#43A047' },
    { name: '东南', angle: 135, wuxing: '木', color: '#43A047' },
    { name: '南', angle: 180, wuxing: '火', color: '#E53935' },
    { name: '西南', angle: 225, wuxing: '土', color: '#8D6E63' },
    { name: '西', angle: 270, wuxing: '金', color: '#FFB300' },
    { name: '西北', angle: 315, wuxing: '金', color: '#FFB300' },
  ]

  const currentDirection = directions.find(d => {
    const diff = Math.abs(direction - d.angle)
    return diff < 22.5 || diff > 337.5
  }) || directions[0]

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

        <div className="form-card">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            {/* 罗盘 */}
            <div style={{
              width: '300px',
              height: '300px',
              margin: '0 auto 2rem',
              position: 'relative',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}>
              {/* 外圈刻度 */}
              <div style={{
                position: 'absolute',
                inset: '10px',
                borderRadius: '50%',
                border: '2px solid #D4AF37',
              }}>
                {/* 方向标记 */}
                {directions.map((d, i) => (
                  <div
                    key={d.name}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${d.angle}deg) translateY(-130px) translateX(-50%)`,
                      color: d.color,
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                    }}
                  >
                    {d.name}
                  </div>
                ))}
              </div>
              
              {/* 内圈 */}
              <div style={{
                position: 'absolute',
                inset: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(212,175,55,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* 旋转指针 */}
                <div style={{
                  width: '4px',
                  height: '100px',
                  background: 'linear-gradient(to top, transparent, #E53935)',
                  transform: `rotate(${direction}deg)`,
                  transformOrigin: 'bottom center',
                  position: 'absolute',
                  top: '10px',
                }} />
                
                {/* 中心点 */}
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: '#D4AF37',
                  borderRadius: '50%',
                  position: 'relative',
                  zIndex: 10,
                }} />
              </div>
            </div>

            {/* 当前方向信息 */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(139,0,0,0.1) 0%, rgba(212,175,55,0.1) 100%)',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: currentDirection.color }}>
                {currentDirection.name}
              </div>
              <div style={{ color: '#666', marginTop: '0.5rem' }}>
                五行属性：<span style={{ color: currentDirection.color, fontWeight: 'bold' }}>{currentDirection.wuxing}</span>
              </div>
            </div>

            {/* 方位分析 */}
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>📍 方位吉凶分析</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}>
                <div style={{
                  padding: '1rem',
                  background: '#E8F5E9',
                  borderRadius: '8px',
                  borderLeft: '4px solid #43A047',
                }}>
                  <div style={{ fontWeight: 'bold', color: '#43A047' }}>吉方</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                    东南方利财运<br />
                    西南方利感情
                  </div>
                </div>
                <div style={{
                  padding: '1rem',
                  background: '#FFEBEE',
                  borderRadius: '8px',
                  borderLeft: '4px solid #E53935',
                }}>
                  <div style={{ fontWeight: 'bold', color: '#E53935' }}>凶方</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                    正北方需谨慎<br />
                    避免重大决策
                  </div>
                </div>
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
      </div>
    </div>
  )
}
