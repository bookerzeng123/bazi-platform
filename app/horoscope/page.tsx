'use client'

import { useState } from 'react'
import Link from 'next/link'

const ZODIAC_SIGNS = [
  { name: '白羊座', date: '3.21-4.19', element: '火', icon: '♈', traits: '热情、冲动、勇敢' },
  { name: '金牛座', date: '4.20-5.20', element: '土', icon: '♉', traits: '稳重、务实、固执' },
  { name: '双子座', date: '5.21-6.21', element: '风', icon: '♊', traits: '聪明、善变、好奇' },
  { name: '巨蟹座', date: '6.22-7.22', element: '水', icon: '♋', traits: '敏感、顾家、情绪化' },
  { name: '狮子座', date: '7.23-8.22', element: '火', icon: '♌', traits: '自信、慷慨、爱面子' },
  { name: '处女座', date: '8.23-9.22', element: '土', icon: '♍', traits: '完美、细致、挑剔' },
  { name: '天秤座', date: '9.23-10.23', element: '风', icon: '♎', traits: '优雅、犹豫、公正' },
  { name: '天蝎座', date: '10.24-11.22', element: '水', icon: '♏', traits: '神秘、执着、占有欲' },
  { name: '射手座', date: '11.23-12.21', element: '火', icon: '♐', traits: '自由、乐观、粗心' },
  { name: '摩羯座', date: '12.22-1.19', element: '土', icon: '♑', traits: '务实、野心、保守' },
  { name: '水瓶座', date: '1.20-2.18', element: '风', icon: '♒', traits: '独立、创新、叛逆' },
  { name: '双鱼座', date: '2.19-3.20', element: '水', icon: '♓', traits: '浪漫、幻想、善良' },
]

function getZodiacSign(month: number, day: number) {
  const dates = [
    { sign: 0, lastDay: 19 },   // 白羊座 3.21-4.19
    { sign: 1, lastDay: 20 },   // 金牛座 4.20-5.20
    { sign: 2, lastDay: 21 },   // 双子座 5.21-6.21
    { sign: 3, lastDay: 22 },   // 巨蟹座 6.22-7.22
    { sign: 4, lastDay: 22 },   // 狮子座 7.23-8.22
    { sign: 5, lastDay: 22 },   // 处女座 8.23-9.22
    { sign: 6, lastDay: 23 },   // 天秤座 9.23-10.23
    { sign: 7, lastDay: 22 },   // 天蝎座 10.24-11.22
    { sign: 8, lastDay: 21 },   // 射手座 11.23-12.21
    { sign: 9, lastDay: 19 },   // 摩羯座 12.22-1.19
    { sign: 10, lastDay: 18 },  // 水瓶座 1.20-2.18
    { sign: 11, lastDay: 20 },  // 双鱼座 2.19-3.20
  ]
  
  const idx = month - 1
  if (day <= dates[idx].lastDay) {
    return ZODIAC_SIGNS[dates[idx].sign]
  } else {
    return ZODIAC_SIGNS[(dates[idx].sign + 1) % 12]
  }
}

function generateHoroscope(sign: string) {
  const fortunes = [
    { aspect: '综合运势', level: 4, desc: '今日整体运势不错，适合处理重要事务。' },
    { aspect: '爱情运势', level: 3, desc: '感情平稳，单身者有机会遇到心仪对象。' },
    { aspect: '事业运势', level: 5, desc: '工作效率高，容易获得上司认可。' },
    { aspect: '财运运势', level: 3, desc: '正财稳定，偏财一般，不宜冒险投资。' },
    { aspect: '健康运势', level: 4, desc: '身体状况良好，注意劳逸结合。' },
  ]
  
  const lucky = {
    number: Math.floor(Math.random() * 99) + 1,
    color: ['红色', '蓝色', '绿色', '黄色', '紫色', '白色'][Math.floor(Math.random() * 6)],
    direction: ['东', '南', '西', '北', '东南', '西北'][Math.floor(Math.random() * 6)],
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
          <h1 className="page-title">星座运势</h1>
          <p className="breadcrumb">
            <Link href="/">首页</Link> / 星座运势
          </p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3 className="form-section-title">选择出生日期</h3>
              <div className="form-row" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div className="form-group">
                  <label>月份</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    placeholder="1-12"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>日期</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="1-31"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              查看今日运势
            </button>
          </form>

          {/* 结果展示 */}
          {result && (
            <div style={{ marginTop: '2rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(139,0,0,0.1) 0%, rgba(212,175,55,0.1) 100%)',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                marginBottom: '1.5rem',
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{result.sign.icon}</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {result.sign.name}
                </h2>
                <p style={{ color: '#666' }}>{result.sign.date} · {result.sign.element}象星座</p>
                <p style={{ marginTop: '0.5rem', color: '#888' }}>{result.sign.traits}</p>
              </div>

              {/* 运势详情 */}
              <div style={{ display: 'grid', gap: '1rem' }}>
                {result.horoscope.fortunes.map((f: any, i: number) => (
                  <div key={i} style={{
                    padding: '1rem',
                    background: '#f8f8f8',
                    borderRadius: '8px',
                    borderLeft: '4px solid #D4AF37',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold' }}>{f.aspect}</span>
                      <span>{'⭐'.repeat(f.level)}{'☆'.repeat(5 - f.level)}</span>
                    </div>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* 幸运信息 */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                background: '#1a1a1a',
                borderRadius: '8px',
                color: 'white',
                textAlign: 'center',
              }}>
                <h4 style={{ color: '#D4AF37', marginBottom: '1rem' }}>✨ 今日幸运</h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>幸运数字</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37' }}>{result.horoscope.lucky.number}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>幸运颜色</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37' }}>{result.horoscope.lucky.color}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>吉利方位</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37' }}>{result.horoscope.lucky.direction}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 星座列表 */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>十二星座</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
          }}>
            {ZODIAC_SIGNS.map((sign) => (
              <div key={sign.name} style={{
                padding: '1rem',
                background: 'white',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}>
                <div style={{ fontSize: '2rem' }}>{sign.icon}</div>
                <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{sign.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>{sign.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
