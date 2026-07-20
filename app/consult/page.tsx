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

    // 验证
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
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30秒超时
      
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

  return (
    <div>
      <nav className="nav">
        <Link href="/" className="nav-logo">命理大师</Link>
        <Link href="/" className="nav-link">← 返回首页</Link>
      </nav>

      <div className="consult-page">
        <h1 className="page-title">八字命盘解读</h1>

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
              <label>出生时间（公历）</label>
              <div className="form-row">
                <div>
                  <input
                    type="number"
                    placeholder="年"
                    value={form.year}
                    onChange={e => updateField('year', e.target.value)}
                    min="1900"
                    max="2100"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="月"
                    value={form.month}
                    onChange={e => updateField('month', e.target.value)}
                    min="1"
                    max="12"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="日"
                    value={form.day}
                    onChange={e => updateField('day', e.target.value)}
                    min="1"
                    max="31"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="时"
                    value={form.hour}
                    onChange={e => updateField('hour', e.target.value)}
                    min="0"
                    max="23"
                  />
                </div>
              </div>
              <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                示例：1990年8月15日14时 → 年:1990 月:8 日:15 时:14
              </p>
            </div>

            <div className="form-group">
              <label>性别（影响大运排法）</label>
              <div className="gender-row">
                <label className={`gender-option ${form.gender === 'male' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === 'male'}
                    onChange={() => updateField('gender', 'male')}
                  />
                  <span style={{ fontSize: '1.2rem' }}>☰</span>
                  <span>男命</span>
                </label>
                <label className={`gender-option ${form.gender === 'female' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === 'female'}
                    onChange={() => updateField('gender', 'female')}
                  />
                  <span style={{ fontSize: '1.2rem' }}>☱</span>
                  <span>女命</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>想问的问题（可选）</label>
              <textarea
                rows={3}
                placeholder="例如：我的事业运如何？今年有没有姻缘？"
                value={form.question}
                onChange={e => updateField('question', e.target.value)}
              />
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              borderRadius: '8px',
              padding: '1rem 1.5rem',
              marginBottom: '1.5rem',
              borderLeft: '4px solid var(--gold)'
            }}>
              <p style={{ fontWeight: 'bold', color: 'var(--ink-black)', marginBottom: '0.3rem' }}>
                💰 收费标准
              </p>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                基础排盘 <strong style={{ color: 'var(--cinnabar)' }}>免费</strong> · 
                AI 深度解读 <strong style={{ color: 'var(--cinnabar)' }}>¥39/次</strong>
              </p>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '正在排盘，请稍候...' : '开始八字排盘'}
            </button>
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
                    <div className="bazi-hidden">藏：{pillar.hiddenStems.join(' ')}</div>
                  </div>
                ))}
              </div>

              {/* 详细分析 */}
              <div className="analysis-content">
                <h2>🎯 日主强弱分析</h2>
                <p>
                  <strong>日主强度：</strong>{baziDisplay.dayMasterStrength.level}
                  （得分：{baziDisplay.dayMasterStrength.score}）
                </p>
                <p>{baziDisplay.dayMasterStrength.explanation}</p>

                <h2>✨ 用神与忌神</h2>
                <p><strong>用神（有利）：</strong>{baziDisplay.usefulGod.join('、')}</p>
                <p><strong>忌神（不利）：</strong>{baziDisplay.harmfulGod.join('、')}</p>

                <h2>🌟 大运走势</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                  {baziDisplay.daYun.slice(0, 5).map((dy: any, i: number) => (
                    <div key={i} style={{ textAlign: 'center', padding: '1rem', background: '#FAFAFA', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>{dy.age}</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--ink-black)' }}>{dy.ganZhi}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>{dy.startYear}年起</div>
                    </div>
                  ))}
                </div>

                <h2>📊 五行统计</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                  {Object.entries(baziDisplay.wuXingCount).map(([wx, count]) => (
                    <div key={wx} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem' }}>
                        {wx === '木' ? '🌲' : wx === '火' ? '🔥' : wx === '土' ? '🏔️' : wx === '金' ? '⚔️' : '💧'}
                      </div>
                      <div style={{ fontWeight: 'bold' }}>{wx}</div>
                      <div style={{ color: '#666' }}>{Number(count).toFixed(1)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI 解读 */}
              {result.aiAnalysis ? (
                <div style={{ padding: '2rem', background: '#f8f8f8', borderTop: '3px solid #D4AF37' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🤖</span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>AI 深度解读</h3>
                    {result.aiProvider && (
                      <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: 'auto' }}>
                        由 {result.aiProvider} 提供
                      </span>
                    )}
                  </div>
                  <div style={{ 
                    lineHeight: 2, 
                    whiteSpace: 'pre-wrap',
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}>
                    {result.aiAnalysis}
                  </div>
                </div>
              ) : result.aiError ? (
                <div style={{ padding: '2rem', background: '#FFF3E0', borderTop: '3px solid #E65100' }}>
                  <h4 style={{ color: '#E65100', marginBottom: '0.5rem' }}>⚠️ AI 解读暂时不可用</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    {result.aiError === 'NO_API_KEY' 
                      ? '管理员尚未配置 AI API Key，请联系管理员开启此功能。' 
                      : 'AI 服务暂时不可用，请稍后重试。'}
                  </p>
                </div>
              ) : (
                /* 未解锁 AI 解读时的支付引导 */
                <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', borderTop: '3px solid #D4AF37' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔮</div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      解锁 AI 深度解读
                    </h3>
                    <p style={{ color: '#666', marginBottom: '1rem', maxWidth: '400px', margin: '0 auto 1rem' }}>
                      获取专业命理大师级别的详细分析：性格特点、事业建议、财运预测、姻缘指导、健康提示
                    </p>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      background: '#0070BA',
                      color: 'white',
                      padding: '0.875rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      <span>💳</span>
                      <span>PayPal 支付 $5.99 解锁</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.75rem' }}>
                      安全支付 · 即时解锁 · 永久查看
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
