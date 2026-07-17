'use client'
import { useState } from 'react'
import Link from 'next/link'

interface FormData {
  name: string
  year: string
  month: string
  day: string
  hour: string
  minute: string
  gender: '鐢? | '濂?
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
    gender: '鐢?,
    question: '',
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)

    // 绠€鍗曢獙璇?    if (!form.year || !form.month || !form.day || !form.hour) {
      setError('璇峰～鍐欏畬鏁寸殑鍑虹敓鏃堕棿')
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
        throw new Error(data.error || '瑙ｈ鐢熸垚澶辫触')
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

  // 鐢熸垚鍏瓧灞曠ず
  const baziDisplay = result?.bazi

  return (
    <div>
      <nav className="nav">
        <Link href="/" className="nav-logo">鍛界悊澶у笀</Link>
        <Link href="/" className="nav-link">鈫?杩斿洖棣栭〉</Link>
      </nav>

      <div className="consult-page">
        <h1 className="page-title">路 鍏瓧鍛界洏瑙ｈ 路</h1>

        <div className="form-card">
          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>鎮ㄧ殑绉板懠锛堝彲閫夛級</label>
              <input
                type="text"
                placeholder="鏂逛究绉板懠鎮?
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>鍑虹敓鏃堕棿</label>
              <div className="form-row">
                <div>
                  <input type="text" placeholder="骞? value={form.year} onChange={e => updateField('year', e.target.value)} maxLength={4} />
                </div>
                <div>
                  <input type="text" placeholder="鏈? value={form.month} onChange={e => updateField('month', e.target.value)} maxLength={2} />
                </div>
                <div>
                  <input type="text" placeholder="鏃? value={form.day} onChange={e => updateField('day', e.target.value)} maxLength={2} />
                </div>
                <div>
                  <input type="text" placeholder="鏃? value={form.hour} onChange={e => updateField('hour', e.target.value)} maxLength={2} />
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <input type="text" placeholder="鍒嗭紙鍙笉濉紝绮剧‘鍒版椂锛? value={form.minute} onChange={e => updateField('minute', e.target.value)} maxLength={2} style={{ width: '100%' }} />
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 6 }}>
                绀轰緥锛?990骞?8鏈?15鏃?14鏃?鈫?骞?1990 鏈?8 鏃?15 鏃?14
              </p>
            </div>

            <div className="form-group">
              <label>鎬у埆锛堝奖鍝嶅ぇ杩愭柟鍚戯級</label>
              <div className="gender-row">
                <label className={`gender-option ${form.gender === '鐢? ? 'selected' : ''}`}>
                  <input type="radio" name="gender" value="鐢? checked={form.gender === '鐢?} onChange={() => updateField('gender', '鐢?)} />
                  鈽?鐢峰懡
                </label>
                <label className={`gender-option ${form.gender === '濂? ? 'selected' : ''}`}>
                  <input type="radio" name="gender" value="濂? checked={form.gender === '濂?} onChange={() => updateField('gender', '濂?)} />
                  鈽?濂冲懡
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>鎯抽棶鐨勯棶棰橈紙鍙€夛紝璁╄В璇绘洿鏈夐拡瀵规€э級</label>
              <textarea
                rows={3}
                placeholder="渚嬪锛氭垜鐨勪簨涓氳繍濡備綍锛熶粖骞存湁娌℃湁濮荤紭锛熻储杩愬ソ鍚楋紵"
                value={form.question}
                onChange={e => updateField('question', e.target.value)}
              />
            </div>

            <div style={{ background: 'rgba(201,168,76,0.06)', borderRadius: 6, padding: '12px 16px', marginBottom: 16 }}>
              <p style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: 4 }}>馃挵 鏀惰垂鏍囧噯</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                鍏瓧瑙ｈ <strong style={{ color: 'var(--gold)' }}>39鍏?娆?/strong><br />
                鍖呭惈锛氬洓鏌辫瑙?+ 澶ц繍娴佸勾 + 鐢ㄧ蹇岀 + 浜虹敓寤鸿
              </p>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '鍛界洏鐢熸垚涓紝璇风◢鍊?..' : '鏀粯 楼39 骞惰幏鍙栬В璇?}
            </button>

            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 12 }}>
              鐐瑰嚮鏀粯鍗宠〃绀哄悓鎰忔垜浠殑鏈嶅姟鏉℃
            </p>
          </form>
        </div>

        {/* 缁撴灉灞曠ず */}
        {result && baziDisplay && (
          <div className="result-section">
            <div className="result-card">
              <div className="result-header">
                <div className="result-title">鍛界洏瑙ｈ缁撴灉</div>
                <div className="result-time">
                  {form.name || '缂樹富'} 路 {form.year}骞磠form.month}鏈坽form.day}鏃form.hour}鏃?路 {form.gender}
                </div>
              </div>

              {/* 鍥涙煴灞曠ず */}
              <div className="bazi-grid">
                {[
                  { label: '骞存煴', pillar: baziDisplay.yearPillar, tenGod: baziDisplay.tenGods.year },
                  { label: '鏈堟煴', pillar: baziDisplay.monthPillar, tenGod: baziDisplay.tenGods.month },
                  { label: '鏃ユ煴', pillar: baziDisplay.dayPillar, tenGod: baziDisplay.tenGods.day },
                  { label: '鏃舵煴', pillar: baziDisplay.hourPillar, tenGod: baziDisplay.tenGods.hour },
                ].map(({ label, pillar, tenGod }) => (
                  <div key={label} className="bazi-pillar">
                    <div className="bazi-pillar-label">{label}</div>
                    <div className="bazi-ganzhi">{pillar.gan}{pillar.zhi}</div>
                    <div className="bazi-tenGod">{tenGod}</div>
                    <div className="bazi-hidden">钘忥細{pillar.hiddenStems.join('')}</div>
                  </div>
                ))}
              </div>

              {/* AI 瑙ｈ */}
              <div className="analysis-content">
                {result.analysis.split('\n').map((line: string, i: number) => {
                  if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>
                  if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>
                  if (!line.trim()) return <br key={i} />
                  return <p key={i}>{line}</p>
                })}
              </div>

              {/* 鏀粯寮曞 */}
              <div className="payment-box">
                <h4>馃挕 瀹屾暣瑙ｈ闇€鏀粯 楼39</h4>
                <p>浠ヤ笂涓哄熀纭€棰勮锛屽畬鏁村懡鐩樿В璇诲寘鍚缁嗗ぇ杩愭祦骞村垎鏋?/p>
                <a
                  href="https://paypal.me/yourpaypalid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paypal-btn"
                >
                  PayPal 鏀粯 楼39
                </a>
                <p style={{ marginTop: 10, fontSize: '0.8rem' }}>
                  鎴栬仈绯?Telegram: @yourid 鑾峰彇瀹屾暣鎶ュ憡
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
