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

    // 简单验证
    if (!form.year || !form.month || !form.day || !form.hour) {
      setError('请填写完整的出生时间')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || '解读生成失败')
      }
      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: keyof FormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  // 生成八字展示
  const baziDisplay = result?.bazi

  return (
    <div>
      <nav className="nav">
        <Link href="/" className="nav-logo">命理大师</Link>
        <Link href="/" className="nav-link">← 返回首页</Link>
      </nav>

      <div className="consult-page">
        <h1 className="page-title">· 八字命盘解读 ·</h1>

        <div className="form-card">
          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>您的称呼（可选）</label>
              <input
                type="text"
                placeholder="方便称呼您"
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>出生时间</label>
              <div className="form-row">
                <div>
                  <input type="text" placeholder="年" value={form.year} onChange={e => updateField('year', e.target.value)} maxLength={4} />
                </div>
                <div>
                  <input type="text" placeholder="月" value={form.month} onChange={e => updateField('month', e.target.value)} maxLength={2} />
                </div>
                <div>
                  <input type="text" placeholder="日" value={form.day} onChange={e => updateField('day', e.target.value)} maxLength={2} />
                </div>
                <div>
                  <input type="text" placeholder="时" value={form.hour} onChange={e => updateField('hour', e.target.value)} maxLength={2} />
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <input type="text" placeholder="分（可不填，精确到时）" value={form.minute} onChange={e => updateField('minute', e.target.value)} maxLength={2} style={{ width: '100%' }} />
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 6 }}>
                示例：1990年 8月 15日 14时 → 年:1990 月:8 日:15 时:14
              </p>
            </div>

            <div className="form-group">
              <label>性别（影响大运方向）</label>
              <div className="gender-row">
                <label className={`gender-option ${form.gender === 'male' ? 'selected' : ''}`}>
                  <input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={() => updateField('gender', 'male')} />
                  ☰ 男命
                </label>
                <label className={`gender-option ${form.gender === 'female' ? 'selected' : ''}`}>
                  <input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={() => updateField('gender', 'female')} />
                  ☱ 女命
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>想问的问题（可选，让解读更有针对性）</label>
              <textarea
                rows={3}
                placeholder="例如：我的事业运如何？今年有没有姻缘？财运好吗？"
                value={form.question}
                onChange={e => updateField('question', e.target.value)}
              />
            </div>

            <div style={{ background: 'rgba(201,168,76,0.06)', borderRadius: 6, padding: '12px 16px', marginBottom: 16 }}>
              <p style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: 4 }}>💰 收费标准</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                八字解读 <strong style={{ color: 'var(--gold)' }}>39元/次</strong><br />
                包含：四柱详解 + 大运流年 + 用神忌神 + 人生建议
              </p>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '命盘生成中，请稍候...' : '支付 ¥39 并获取解读'}
            </button>

            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 12 }}>
              点击支付即表示同意我们的服务条款
            </p>
          </form>
        </div>

        {/* 结果展示 */}
        {result && baziDisplay && (
          <div className="result-section">
            <div className="result-card">
              <div className="result-header">
                <div className="result-title">命盘解读结果</div>
                <div className="result-time">
                  {form.name || '缘主'} · {form.year}年{form.month}月{form.day}日{form.hour}时 · {form.gender === 'male' ? '男' : '女'}
                </div>
              </div>

              {/* 四柱展示 */}
              <div className="bazi-grid">
                {[
                  { label: '年柱', pillar: baziDisplay.yearPillar, tenGod: baziDisplay.tenGods.year },
                  { label: '月柱', pillar: baziDisplay.monthPillar, tenGod: baziDisplay.tenGods.month },
                  { label: '日柱', pillar: baziDisplay.dayPillar, tenGod: baziDisplay.tenGods.day },
                  { label: '时柱', pillar: baziDisplay.hourPillar, tenGod: baziDisplay.tenGods.hour },
                ].map(({ label, pillar, tenGod }) => (
                  <div key={label} className="bazi-pillar">
                    <div className="bazi-pillar-label">{label}</div>
                    <div className="bazi-ganzhi">{pillar.gan}{pillar.zhi}</div>
                    <div className="bazi-tenGod">{tenGod}</div>
                    <div className="bazi-hidden">藏：{pillar.hiddenStems.join('')}</div>
                  </div>
                ))}
              </div>

              {/* AI 解读 */}
              <div className="analysis-content">
                {result.analysis.split('\n').map((line: string, i: number) => {
                  if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>
                  if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>
                  if (!line.trim()) return <br key={i} />
                  return <p key={i}>{line}</p>
                })}
              </div>

              {/* 支付引导 */}
              <div className="payment-box">
                <h4>💡 完整解读需支付 ¥39</h4>
                <p>以上为基础预览，完整命盘解读包含详细大运流年分析</p>
                <a
                  href="https://paypal.me/yourpaypalid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paypal-btn"
                >
                  PayPal 支付 ¥39
                </a>
                <p style={{ marginTop: 10, fontSize: '0.8rem' }}>
                  或联系 Telegram: @yourid 获取完整报告
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
