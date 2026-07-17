'use client'
import Link from 'next/link'

const MODULES = [
  {
    name: '八字命盘',
    desc: '生辰八字精批，大运流年分析，用神忌神判断',
    icon: '☰',
    href: '/consult',
    status: '在线',
    color: '#c9a84c',
  },
  {
    name: '罗盘定向',
    desc: '风水方位分析，家居布局建议',
    icon: '◎',
    href: '#',
    status: '即将上线',
    color: '#7a9ec9',
  },
  {
    name: '星座星盘',
    desc: '西方占星术，太阳星座+上升星座解读',
    icon: '☆',
    href: '#',
    status: '即将上线',
    color: '#9a7ac9',
  },
  {
    name: '占卜问卦',
    desc: '六爻起卦，梅花易数，卦象解读',
    icon: '☲',
    href: '#',
    status: '即将上线',
    color: '#c97a7a',
  },
  {
    name: '风水堪舆',
    desc: '阳宅布局，阴宅选址，户型分析',
    icon: '⛰',
    href: '#',
    status: '即将上线',
    color: '#7ac98a',
  },
]

export default function HomePage() {
  return (
    <div>
      <nav className="nav">
        <span className="nav-logo">命理大师</span>
        <Link href="/consult" className="nav-link">立即咨询 →</Link>
      </nav>

      <section className="hero">
        <h1 className="hero-title">命理大师</h1>
        <p className="hero-sub">八字 · 罗盘 · 星座 · 占卜 · 风水</p>
        <Link href="/consult" className="hero-btn">开始命盘解读</Link>
      </section>

      <div className="container">
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 600, margin: '0 auto 20px' }}>
          基于千年命理古籍与现代 AI 技术，为您提供专业的八字命盘分析。
          <br />八字解读 39 元/次，包含四柱详解、大运流年、用神忌神。
        </p>

        <hr className="divider" />

        <div className="modules">
          {MODULES.map((m) => (
            <div key={m.name} className="module-card">
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{m.icon}</div>
              <h3 style={{ color: m.color }}>{m.name}</h3>
              <p>{m.desc}</p>
              <div style={{ marginTop: '12px', fontSize: '0.8rem', color: m.status === '在线' ? 'var(--green)' : 'var(--text-secondary)' }}>
                {m.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>命理大师 · 仅供参考，尽信书则不如无书</p>
        <p style={{ marginTop: 6 }}>Powered by AI · 八字算法基于《渊海子平》</p>
      </footer>
    </div>
  )
}
