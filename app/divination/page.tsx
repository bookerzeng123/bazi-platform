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
    // 乾宫八卦
    '乾为天': '元亨利贞。大吉之卦，象征天行健，君子以自强不息。事业：大吉大利，万事如意；爱情：情投意合，但不可傲慢；财运：财源广进，但需正当获取。',
    '天风姤': '女壮，勿用取女。邂逅相遇，不宜急于求成。事业：机遇来临，但需谨慎把握；爱情：偶遇有缘人，但需深入了解；财运：意外之财，但不可贪心。',
    '天山遁': '亨，小利贞。退避保全，以退为进。事业：时运不济，宜守不宜攻；爱情：暂时分离，等待时机；财运：保守理财，不宜冒险。',
    '天地否': '否之匪人，不利君子贞，大往小来。天地不交，闭塞不通，需守正待时。事业：困难重重，需耐心等待；爱情：沟通不畅，需加强理解；财运：入不敷出，需节俭度日。',
    '风地观': '盥而不荐，有孚颙若。观察审视，审时度势。事业：宜静观其变，不可轻举妄动；爱情：观察对方，了解透彻；财运：观望市场，等待良机。',
    '山地剥': '不利有攸往。剥落衰败，需防微杜渐。事业：运势下滑，需谨慎行事；爱情：感情变淡，需用心经营；财运：破财之兆，需守财为上。',
    '火地晋': '康侯用锡马蕃庶，昼日三接。晋升发展，前途光明。事业：步步高升，贵人相助；爱情：感情升温，好事将近；财运：收入增加，投资有利。',
    '火天大有': '元亨。大有收获，富有天下。事业：大获成功，名利双收；爱情：美满幸福，白头偕老；财运：财运亨通，富贵荣华。',
    
    // 坤宫八卦
    '坤为地': '元亨，利牝马之贞。柔顺之卦，象征地势坤，君子以厚德载物。事业：以柔克刚，稳步发展；爱情：温柔体贴，相敬如宾；财运：稳健理财，积少成多。',
    '地雷复': '亨。出入无疾，朋来无咎。反复其道，七日来复。事业：东山再起，重获新生；爱情：破镜重圆，和好如初；财运：失而复得，转亏为盈。',
    '地泽临': '元亨，利贞。至于八月有凶。居高临下，督导管理。事业：领导有方，事业兴旺；爱情：主动追求，把握良机；财运：管理得当，收益可观。',
    '地天泰': '小往大来，吉亨。天地交泰，阴阳和畅，万事亨通。事业：顺风顺水，事半功倍；爱情：情投意合，百年好合；财运：财源广进，左右逢源。',
    '雷天大壮': '利贞。大壮之时，不可妄动。事业：实力雄厚，但需谦逊；爱情：热情奔放，但需克制；财运：财运旺盛，但需节制。',
    '泽天夬': '扬于王庭，孚号有厉。决断分离，需果断行事。事业：当断则断，不受其乱；爱情：感情破裂，需果断分手；财运：及时止损，避免更大损失。',
    '水天需': '有孚，光亨，贞吉。利涉大川。等待时机，保持诚信必获成功。事业：时机未到，需耐心等待；爱情：缘分未到，不可强求；财运：投资需等待，不可急躁。',
    '水地比': '吉。原筮元永贞，无咎。不宁方来，后夫凶。亲比团结，但需择善而从。事业：团结合作，共同发展；爱情：相亲相爱，但需慎重选择；财运：合伙经营，利益共享。',
    
    // 震宫八卦
    '震为雷': '亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。事业：有惊无险，化险为夷；爱情：感情波动，但最终和好；财运：有得有失，总体平稳。',
    '雷地豫': '利建侯行师。心情愉悦，但不可沉溺。事业：顺风顺水，但需防骄戒躁；爱情：甜蜜幸福，但需居安思危；财运：收入稳定，但需未雨绸缪。',
    '雷水解': '利西南。无所往，其来复吉。有攸往，夙吉。解除困难，重获自由。事业：困境解除，前途光明；爱情：误会消除，重归于好；财运：周转灵活，债务清偿。',
    '雷风恒': '亨，无咎，利贞。利有攸往。持之以恒，方能成功。事业：坚持不懈，终有所成；爱情：天长地久，白头偕老；财运：稳健经营，积少成多。',
    '地风升': '元亨，用见大人，勿恤，南征吉。步步高升，前途无量。事业：平步青云，飞黄腾达；爱情：感情升温，好事将近；财运：收入递增，投资获利。',
    '水风井': '改邑不改井，无丧无得。往来井井。井养无穷，需不断进取。事业：基础稳固，但需创新；爱情：平淡是真，细水长流；财运：收入稳定，但需开源。',
    '泽风大过': '栋桡，利有攸往，亨。过度极端，需调整平衡。事业：压力过大，需适当减压；爱情：感情过浓，需给彼此空间；财运：投资过度，需分散风险。',
    '泽雷随': '元亨，利贞，无咎。随时而动，顺应时势。事业：灵活应变，随遇而安；爱情：随缘而安，不可强求；财运：随机应变，把握时机。',
    
    // 巽宫八卦
    '巽为风': '小亨，利攸往，利见大人。谦逊顺从，以柔克刚。事业：以退为进，以柔克刚；爱情：温柔体贴，相敬如宾；财运：稳健理财，积少成多。',
    '风天小畜': '亨。密云不雨，自我西郊。小有蓄积，但尚未成熟。事业：小有成就，但需继续努力；爱情：感情萌芽，需耐心培养；财运：小有积蓄，但不可挥霍。',
    '风火家人': '利女贞。家庭和睦，万事兴旺。事业：内部团结，外部发展；爱情：家庭幸福，白头偕老；财运：家庭理财，稳健增收。',
    '风雷益': '利有攸往，利涉大川。受益增益，助人为乐。事业：贵人相助，事半功倍；爱情：相互扶持，共同成长；财运：投资获利，财源广进。',
    '天雷无妄': '元亨，利贞。其匪正有眚，不利有攸往。不可妄动，顺其自然。事业：脚踏实地，不可投机取巧；爱情：真诚相待，不可虚情假意；财运：正当收入，不可贪心。',
    '火雷噬嗑': '亨。利用狱。咬合咀嚼，去除障碍。事业：克服困难，扫除障碍；爱情：消除误会，重归于好；财运：解决债务，资金周转。',
    '山雷颐': '贞吉。观颐，自求口实。颐养天年，修身养性。事业：养精蓄锐，等待时机；爱情：用心经营，细水长流；财运：节俭度日，积少成多。',
    '山风蛊': '元亨，利涉大川。先甲三日，后甲三日。腐败生虫，需革新除弊。事业：整顿改革，去除积弊；爱情：感情变质，需重新培养；财运：清理旧账，重新开始。',
    
    // 坎宫八卦
    '坎为水': '习坎，有孚，维心亨，行有尚。重重困难，但可克服。事业：困难重重，但终能克服；爱情：一波三折，但终成正果；财运：财运不佳，需谨慎理财。',
    '水泽节': '亨。苦节不可贞。适度节制，不可过度。事业：适度控制，不可过度；爱情：适当距离，不可过黏；财运：节俭有度，不可吝啬。',
    '水雷屯': '元亨利贞，勿用有攸往，利建侯。事物初生，艰难但充满希望。事业：创业艰难，但前途光明；爱情：感情初生，需用心培养；财运：初期投入，后期回报。',
    '水火既济': '亨，小利贞，初吉终乱。事情已成，但需防微杜渐。事业：功成名就，但需防骄戒躁；爱情：修成正果，但需用心经营；财运：收入稳定，但需未雨绸缪。',
    '泽火革': '己日乃孚。元亨，利贞，悔亡。变革创新，除旧布新。事业：改革创新，焕发新生；爱情：改变观念，重获新生；财运：转变思路，财源广进。',
    '雷火丰': '亨，王假之，勿忧，宜日中。丰盛壮大，但需防盛极而衰。事业：事业鼎盛，但需居安思危；爱情：感情浓烈，但需细水长流；财运：财运亨通，但需未雨绸缪。',
    '地火明夷': '利艰贞。光明受损，需韬光养晦。事业：时运不济，需低调行事；爱情：感情受挫，需耐心等待；财运：破财之兆，需守财为上。',
    '地水师': '贞，丈人吉，无咎。军队出征，需要德高望重之人领导。事业：团队合作，共同发展；爱情：需长辈指点，不可盲目；财运：合伙经营，利益共享。',
    
    // 离宫八卦
    '离为火': '利贞，亨。畜牝牛，吉。光明美丽，但需依附正道。事业：前途光明，但需正道；爱情：热情似火，但需持久；财运：投资光明产业，获利丰厚。',
    '火山旅': '小亨，旅贞吉。旅途奔波，需谨言慎行。事业：奔波劳碌，但有所获；爱情：异地恋，需加强沟通；财运：流动之财，不宜固定投资。',
    '火风鼎': '元吉，亨。鼎新革故，去故取新。事业：改革创新，焕发新生；爱情：改变观念，重获新生；财运：转变思路，财源广进。',
    '水火未济': '亨，小狐汔济，濡其尾，无攸利。事情未成，需继续努力。事业：尚未成功，需继续努力；爱情：感情未稳，需用心经营；财运：财运未开，需耐心等待。',
    '山水蒙': '亨。匪我求童蒙，童蒙求我。启蒙教育，需要耐心等待时机。事业：学习进修，提升自我；爱情：感情懵懂，需慢慢培养；财运：投资学习，长远回报。',
    '风水涣': '亨。王假有庙，利涉大川，利贞。涣散分离，需凝聚人心。事业：人心涣散，需加强团结；爱情：感情淡化，需重新点燃；财运：分散投资，降低风险。',
    '天水讼': '有孚，窒惕，中吉，终凶。利见大人，不利涉大川。争执之事，宜和解。事业：避免争执，以和为贵；爱情：避免争吵，沟通解决；财运：避免纠纷，守财为上。',
    '天火同人': '同人于野，亨。利涉大川，利君子贞。团结合作，共同发展。事业：团结合作，共创辉煌；爱情：志同道合，白头偕老；财运：合伙经营，利益共享。',
    
    // 艮宫八卦
    '艮为山': '艮其背，不获其身，行其庭，不见其人，无咎。适可而止，动静得宜。事业：该止则止，不可冒进；爱情：适可而止，不可强求；财运：见好就收，不可贪心。',
    '山火贲': '亨。小利有攸往。修饰美化，但需实质。事业：注重形象，但更重实力；爱情：注重外表，但更重内涵；财运：投资美化，但需实用。',
    '山天大畜': '利贞，不家食吉，利涉大川。大有蓄积，厚积薄发。事业：积累实力，等待时机；爱情：感情深厚，修成正果；财运：积蓄丰厚，投资有利。',
    '山泽损': '有孚，元吉，无咎，可贞，利有攸往。损己利人，但终有所得。事业：有所牺牲，但终有回报；爱情：付出真心，终获真情；财运：先损后得，投资长远。',
    '火泽睽': '小事吉。乖背离异，求同存异。事业：意见不合，需沟通协调；爱情：性格差异，需互相包容；财运：投资分歧，需统一意见。',
    '天泽履': '履虎尾，不咥人，亨。谨慎行事，虽有危险但能平安度过。事业：谨慎小心，步步为营；爱情：小心经营，避免冲突；财运：稳健投资，避免风险。',
    '风泽中孚': '豚鱼吉，利涉大川，利贞。诚信立身，以心换心。事业：诚信为本，事业兴旺；爱情：真诚相待，白头偕老；财运：诚信经营，财源广进。',
    '风山渐': '女归吉，利贞。循序渐进，不可急躁。事业：循序渐进，稳步发展；爱情：慢慢培养，水到渠成；财运：稳健投资，积少成多。',
    
    // 兑宫八卦
    '兑为泽': '亨，利贞。喜悦愉快，但不可沉溺。事业：心情愉悦，工作顺利；爱情：甜蜜幸福，但需居安思危；财运：收入稳定，但需未雨绸缪。',
    '泽水困': '亨，贞，大人吉，无咎，有言不信。困难重重，但可解脱。事业：陷入困境，需寻求帮助；爱情：感情困顿，需沟通交流；财运：资金周转困难，需开源节流。',
    '泽地萃': '亨。王假有庙，利见大人，亨，利贞。聚集荟萃，众志成城。事业：人才聚集，事业兴旺；爱情：缘分聚集，喜结良缘；财运：财源聚集，收入丰厚。',
    '泽山咸': '亨，利贞，取女吉。感应相通，心心相印。事业：感应时机，把握良机；爱情：一见钟情，感情深厚；财运：感应市场，投资获利。',
    '水山蹇': '利西南，不利东北；利见大人，贞吉。艰难险阻，需寻求帮助。事业：困难重重，需贵人相助；爱情：感情受阻，需耐心等待；财运：财运不佳，需守财为上。',
    '地山谦': '亨，君子有终。谦虚谨慎，终有所成。事业：谦虚低调，事业有成；爱情：谦和待人，感情美满；财运：谦虚理财，财源广进。',
    '雷山小过': '亨，利贞，可小事，不可大事。小有过越，但不可过度。事业：小有成就，但不可冒进；爱情：小有波折，但终能克服；财运：小有收益，但不可贪心。',
    '雷泽归妹': '征凶，无攸利。少女出嫁，但非正配。事业：急于求成，反而不利；爱情：感情冲动，需慎重考虑；财运：投资冲动，容易亏损。',
  }
  return interpretations[guaName] || '此卦象征事物的变化发展，需结合具体问事来解读。建议静心思考，顺应天时，量力而行。'
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
