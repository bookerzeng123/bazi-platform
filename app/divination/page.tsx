'use client'

import { useState } from 'react'
import Link from 'next/link'

// 八卦
const GUA = [
  { name: '乾', symbol: '☰', nature: '天', wuxing: '金' },
  { name: '兑', symbol: '☱', nature: '泽', wuxing: '金' },
  { name: '离', symbol: '☲', nature: '火', wuxing: '火' },
  { name: '震', symbol: '☳', nature: '雷', wuxing: '木' },
  { name: '巽', symbol: '☴', nature: '风', wuxing: '木' },
  { name: '坎', symbol: '☵', nature: '水', wuxing: '水' },
  { name: '艮', symbol: '☶', nature: '山', wuxing: '土' },
  { name: '坤', symbol: '☷', nature: '地', wuxing: '土' },
]

// 六十四卦名称
const GUA_64: Record<string, string> = {
  '乾乾': '乾为天', '乾兑': '天泽履', '乾离': '天火同人', '乾震': '天雷无妄',
  '乾巽': '天风姤', '乾坎': '天水讼', '乾艮': '天山遁', '乾坤': '天地否',
  '兑乾': '泽天夬', '兑兑': '兑为泽', '兑离': '泽火革', '兑震': '泽雷随',
  '兑巽': '泽风大过', '兑坎': '泽水困', '兑艮': '泽山咸', '兑坤': '泽地萃',
  '离乾': '火天大有', '离兑': '火泽睽', '离离': '离为火', '离震': '火雷噬嗑',
  '离巽': '火风鼎', '离坎': '火水未济', '离艮': '火山旅', '离坤': '火地晋',
  '震乾': '雷天大壮', '震兑': '雷泽归妹', '震离': '雷火丰', '震震': '震为雷',
  '震巽': '雷风恒', '震坎': '雷水解', '震艮': '雷山小过', '震坤': '雷地豫',
  '巽乾': '风天小畜', '巽兑': '风泽中孚', '巽离': '风火家人', '巽震': '风雷益',
  '巽巽': '巽为风', '巽坎': '风水涣', '巽艮': '风山渐', '巽坤': '风地观',
  '坎乾': '水天需', '坎兑': '水泽节', '坎离': '水火既济', '坎震': '水雷屯',
  '坎巽': '水风井', '坎坎': '坎为水', '坎艮': '水山蹇', '坎坤': '水地比',
  '艮乾': '山天大畜', '艮兑': '山泽损', '艮离': '山火贲', '艮震': '山雷颐',
  '艮巽': '山风蛊', '艮坎': '山水蒙', '艮艮': '艮为山', '艮坤': '山地剥',
  '坤乾': '地天泰', '坤兑': '地泽临', '坤离': '地火明夷', '坤震': '地雷复',
  '坤巽': '地风升', '坤坎': '地水师', '坤艮': '地山谦', '坤坤': '坤为地',
}

// 摇卦 - 模拟铜钱摇卦
function tossCoin(): number {
  // 0 = 阴，1 = 阳
  const coins = [Math.random() > 0.5 ? 1 : 0, Math.random() > 0.5 ? 1 : 0, Math.random() > 0.5 ? 1 : 0]
  const sum = coins.reduce((a, b) => a + b, 0)
  // 3阳 = 老阳(变)，2阳1阴 = 少阴，1阳2阴 = 少阳，3阴 = 老阴(变)
  if (sum === 3) return 3 // 老阳 ⚊ 变 ⚋
  if (sum === 2) return 1 // 少阴 ⚋
  if (sum === 1) return 0 // 少阳 ⚊
  return 2 // 老阴 ⚋ 变 ⚊
}

// 生成卦象
function generateGua(): { upper: number; lower: number; lines: number[]; changing: number[] } {
  const lines: number[] = []
  const changing: number[] = []
  
  for (let i = 0; i < 6; i++) {
    const line = tossCoin()
    // 0,1 = 阳爻，2,3 = 阴爻
    lines.push(line <= 1 ? 1 : 0)
    // 3 = 老阳变阴，2 = 老阴变阳
    if (line === 3) changing.push(i)
    if (line === 2) changing.push(i)
  }
  
  // 上卦（4,5,6爻），下卦（1,2,3爻）
  const upper = lines[3] * 4 + lines[4] * 2 + lines[5]
  const lower = lines[0] * 4 + lines[1] * 2 + lines[2]
  
  return { upper, lower, lines, changing }
}

// 获取卦辞解释
function getGuaInterpretation(guaName: string): string {
  const interpretations: Record<string, string> = {
    '乾为天': '元亨利贞。大吉之卦，象征天行健，君子以自强不息。',
    '坤为地': '元亨，利牝马之贞。柔顺之卦，象征地势坤，君子以厚德载物。',
    '水雷屯': '元亨利贞，勿用有攸往，利建侯。事物初生，艰难但充满希望。',
    '山水蒙': '亨。匪我求童蒙，童蒙求我。启蒙教育，需要耐心等待时机。',
    '水天需': '有孚，光亨，贞吉。利涉大川。等待时机，保持诚信必获成功。',
    '天水讼': '有孚，窒惕，中吉，终凶。利见大人，不利涉大川。争执之事，宜和解。',
    '地水师': '贞，丈人吉，无咎。军队出征，需要德高望重之人领导。',
    '水地比': '吉。原筮元永贞，无咎。不宁方来，后夫凶。亲比团结，但需择善而从。',
    '风天小畜': '亨。密云不雨，自我西郊。小有蓄积，但尚未成熟。',
    '天泽履': '履虎尾，不咥人，亨。谨慎行事，虽有危险但能平安度过。',
    '地天泰': '小往大来，吉亨。天地交泰，阴阳和畅，万事亨通。',
    '天地否': '否之匪人，不利君子贞，大往小来。天地不交，闭塞不通，需守正待时。',
  }
  return interpretations[guaName] || '此卦象征事物的变化发展，需结合具体问事来解读。'
}

export default function DivinationPage() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<any>(null)
  const [tossing, setTossing] = useState(false)

  const handleToss = async () => {
    if (!question.trim()) {
      alert('请先输入您想问的问题')
      return
    }
    
    setTossing(true)
    
    // 模拟摇卦动画
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const gua = generateGua()
    const guaName = GUA_64[GUA[gua.upper].name + GUA[gua.lower].name] || '未知'
    
    setResult({
      gua,
      guaName,
      upper: GUA[gua.upper],
      lower: GUA[gua.lower],
      interpretation: getGuaInterpretation(guaName),
    })
    
    setTossing(false)
  }

  const renderYao = (line: number, index: number, isChanging: boolean) => {
    const isYang = line === 1
    return (
      <div key={index} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0.5rem 0',
        position: 'relative',
      }}>
        <span style={{
          position: 'absolute',
          left: 0,
          fontSize: '0.85rem',
          color: '#666',
          width: '40px',
          textAlign: 'right',
        }}>
          {['初', '二', '三', '四', '五', '上'][index]}爻
        </span>
        {isYang ? (
          <div style={{
            width: '100px',
            height: '4px',
            background: isChanging ? '#E53935' : '#1a1a1a',
            borderRadius: '2px',
          }} />
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{
              width: '45px',
              height: '4px',
              background: isChanging ? '#E53935' : '#1a1a1a',
              borderRadius: '2px',
            }} />
            <div style={{
              width: '45px',
              height: '4px',
              background: isChanging ? '#E53935' : '#1a1a1a',
              borderRadius: '2px',
            }} />
          </div>
        )}
        {isChanging && (
          <span style={{
            position: 'absolute',
            right: 0,
            fontSize: '0.75rem',
            color: '#E53935',
            padding: '2px 6px',
            border: '1px solid #E53935',
            borderRadius: '4px',
          }}>
            变
          </span>
        )}
      </div>
    )
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
          <h1 className="page-title">六爻占卜</h1>
          <p className="breadcrumb">
            <Link href="/">首页</Link> / 六爻占卜
          </p>
        </div>

        <div className="form-card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔮</div>
            <h3 style={{ marginBottom: '0.5rem' }}>在线摇卦</h3>
            <p style={{ color: '#666' }}>心中默念您想问的问题，然后点击摇卦</p>
          </div>

          <div className="form-group">
            <label>您想问的问题</label>
            <textarea
              rows={3}
              placeholder="例如：今年的事业发展如何？这段感情能成吗？"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>

          <button 
            onClick={handleToss}
            className="submit-btn"
            disabled={tossing}
            style={{ marginBottom: '1rem' }}
          >
            {tossing ? '正在摇卦...' : '开始摇卦'}
          </button>

          {/* 卦象结果 */}
          {result && (
            <div style={{ marginTop: '2rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                color: 'white',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                marginBottom: '1.5rem',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  {result.upper.symbol}{result.lower.symbol}
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '0.5rem' }}>
                  {result.guaName}
                </h2>
                <p style={{ opacity: 0.8 }}>
                  {result.upper.name}为{result.upper.nature}（上卦）· 
                  {result.lower.name}为{result.lower.nature}（下卦）
                </p>
              </div>

              {/* 卦象 */}
              <div style={{
                background: '#f8f8f8',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
              }}>
                <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>本卦</h4>
                {result.gua.lines.map((line: number, i: number) => 
                  renderYao(line, i, result.gua.changing.includes(i))
                )}
              </div>

              {/* 卦辞解释 */}
              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(139,0,0,0.05) 0%, rgba(212,175,55,0.05) 100%)',
                borderRadius: '8px',
                borderLeft: '4px solid #8B0000',
              }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#8B0000' }}>卦辞解读</h4>
                <p style={{ lineHeight: 1.8 }}>{result.interpretation}</p>
              </div>

              {/* 针对问题的建议 */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                background: '#E8F5E9',
                borderRadius: '8px',
                borderLeft: '4px solid #43A047',
              }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#43A047' }}>针对您的问题</h4>
                <p style={{ lineHeight: 1.8 }}>
                  您询问的是「{question}」。根据此卦象，{result.gua.changing.length > 0 
                    ? '卦中有变爻，说明事情会有变化发展，需要灵活应对。' 
                    : '卦象稳定，事情发展较为平顺。'}
                  建议您保持诚心，顺势而为，时机成熟自然水到渠成。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 使用说明 */}
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8f8f8', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '1rem' }}>📖 使用说明</h4>
          <ul style={{ paddingLeft: '1.5rem', color: '#666', lineHeight: 1.8 }}>
            <li>六爻占卜是中国古老的预测方法，通过三枚铜钱的正反面组合成卦</li>
            <li>摇卦前请静心凝神，心中默念您想问的具体问题</li>
            <li>一卦一事，不要同时问多个问题</li>
            <li>同一问题短期内不宜重复占卜</li>
            <li>卦象仅供参考，最终决策还需结合实际情况</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
