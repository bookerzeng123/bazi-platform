/**
 * 八字排盘核心
 * 输入：公历出生时间
 * 输出：完整命盘
 */

import { toLunar, getMonthGanZhi, getDayGanZhi, getHourGanZhi, DI_ZHI, SHENG_XIAO } from './lunar'

export interface BaziResult {
  // 四柱
  yearPillar:    { gan: string; zhi: string; hiddenStems: string[] }
  monthPillar:   { gan: string; zhi: string; hiddenStems: string[] }
  dayPillar:     { gan: string; zhi: string; hiddenStems: string[] }
  hourPillar:    { gan: string; zhi: string; hiddenStems: string[] }
  // 十神
  tenGods: { year: string; month: string; day: string; hour: string }
  // 日主强弱
  dayMasterStrength: {
    score: number       // -10 到 +10
    level: '弱' | '偏弱' | '中和' | '偏强' | '强'
    explanation: string
  }
  // 用神忌神
  usefulGod: string[]
  harmfulGod: string[]
  // 大运
  daYun: Array<{ age: string; startYear: number; gan: string; zhi: string; ganZhi: string }>
  // 流年
  liuNian: Array<{ year: number; gan: string; zhi: string; ganZhi: string }>
  // 五行统计
  wuXingCount: Record<string, number>
  // 生肖
  zodiac: string
  // 命宫
  mingGong: string
  // 胎元
  taiYuan: string
  // 身宫
  shenGong: string
}

const DAY_GAN_IDX: Record<string, number> = {
  '甲': 0, '丙': 2, '戊': 4, '庚': 6, '壬': 8,
  '乙': 1, '丁': 3, '己': 5, '辛': 7, '癸': 9,
}

// 十神映射表（日干为参照）
const TEN_GODS: Record<string, string[]> = {
  '甲': ['比','劫','食','伤','财','才','官','杀','印','枭'],
  '乙': ['劫','比','伤','食','才','财','杀','官','枭','印'],
  '丙': ['比','劫','食','伤','财','才','官','杀','印','枭'],
  '丁': ['劫','比','伤','食','才','财','杀','官','枭','印'],
  '戊': ['比','劫','食','伤','财','才','官','杀','印','枭'],
  '己': ['劫','比','伤','食','才','财','杀','官','枭','印'],
  '庚': ['比','劫','食','伤','财','才','官','杀','印','枭'],
  '辛': ['劫','比','伤','食','才','财','杀','官','枭','印'],
  '壬': ['比','劫','食','伤','财','才','官','杀','印','枭'],
  '癸': ['劫','比','伤','食','才','财','杀','官','枭','印'],
}

// 地支藏干表
const ZANGAN: Record<string, string[]> = {
  '子': ['癸'],
  '丑': ['己','癸','辛'],
  '寅': ['甲','丙','戊'],
  '卯': ['乙'],
  '辰': ['戊','乙','癸'],
  '巳': ['丙','庚','戊'],
  '午': ['丁','己'],
  '未': ['己','丁','乙'],
  '申': ['庚','壬','戊'],
  '酉': ['辛'],
  '戌': ['戊','辛','丁'],
  '亥': ['壬','甲'],
}

// 地支五行
const ZHI_WUXING: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
}

// 天干五行
const GAN_WUXING: Record<string, string> = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火',
  '戊': '土', '己': '土', '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
}

// 五行强度（日干 vs 其他柱）
const WUXING_STRENGTH: Record<string, number> = {
  '木': 0, '火': 1, '土': 2, '金': 3, '水': 4,
}

// 生成大运（每步大运管10年）
function generateDaYun(year: number, monthGan: string, monthZhi: string, birthYear: number, isMale: boolean): Array<{ age: string; startYear: number; gan: string; zhi: string; ganZhi: string }> {
  const zhiCycle = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']
  const zhiIdx = zhiCycle.indexOf(monthZhi)
  const ganCycle = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']
  const ganIdx = ganCycle.indexOf(monthGan)
  
  const ganStep = isMale ? 1 : -1
  const zhiStep = isMale ? 1 : -1
  
  const result = []
  for (let i = 0; i < 10; i++) {
    const newGanIdx = ((ganIdx + ganStep * (i + 1)) % 10 + 10) % 10
    const newZhiIdx = ((zhiIdx + zhiStep * (i + 1)) % 12 + 12) % 12
    const startAge = (i + 1) * 10 - 9
    const startYear = birthYear + (i + 1) * 10
    result.push({
      age: `${startAge}-${startAge + 9}岁`,
      startYear,
      gan: ganCycle[newGanIdx],
      zhi: zhiCycle[newZhiIdx],
      ganZhi: ganCycle[newGanIdx] + zhiCycle[newZhiIdx],
    })
  }
  return result
}

// 生成流年（未来10年）
function generateLiuNian(birthYear: number, dayGan: string): Array<{ year: number; gan: string; zhi: string; ganZhi: string }> {
  const ganCycle = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']
  const zhiCycle = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']
  const yearGanIdx = (birthYear - 4) % 10
  const yearZhiIdx = (birthYear - 4) % 12
  
  const result = []
  for (let i = 0; i < 10; i++) {
    const gy = (yearGanIdx + i) % 10
    const gz = (yearZhiIdx + i) % 12
    result.push({
      year: birthYear + i,
      gan: ganCycle[gy >= 0 ? gy : gy + 10],
      zhi: zhiCycle[gz >= 0 ? gz : gz + 12],
      ganZhi: ganCycle[gy >= 0 ? gy : gy + 10] + zhiCycle[gz >= 0 ? gz : gz + 12],
    })
  }
  return result
}

// 计算日主强弱（简化版）
function calcDayMasterStrength(
  dayGan: string,
  yearZhi: string, monthZhi: string, dayZhi: string, hourZhi: string,
  yearGan: string, monthGan: string, hourGan: string,
  isMale: boolean
): { score: number; level: '弱' | '偏弱' | '中和' | '偏强' | '强'; explanation: string } {
  let score = 0
  const dayWx = GAN_WUXING[dayGan]
  
  // 月令权重最大（最重要）
  const monthWx = ZHI_WUXING[monthZhi]
  const monthGans = ZANGAN[monthZhi]
  const monthBonus = (monthWx === dayWx || monthGans.includes(dayGan)) ? 3 : -3
  
  // 其他三柱
  const pillars = [yearZhi, dayZhi, hourZhi]
  const pillarGans = [yearGan, dayGan, hourGan]
  
  pillars.forEach((z, i) => {
    const wx = ZHI_WUXING[z]
    if (wx === dayWx) score += 1
    if (ZANGAN[z].includes(dayGan)) score += 1
  })
  
  // 天干助身
  pillarGans.forEach(g => {
    if (g === dayGan) score += 1
  })
  
  // 时辰
  const hourWx = ZHI_WUXING[hourZhi]
  if (hourWx === dayWx || ZANGAN[hourZhi].includes(dayGan)) score += 1
  
  score += monthBonus
  
  let level: '弱' | '偏弱' | '中和' | '偏强' | '强'
  let explanation: string
  
  if (score <= -2) {
    level = '弱'
    explanation = '日主极弱，需印星生助，比劫扶持'
  } else if (score <= 0) {
    level = '偏弱'
    explanation = '日主偏弱，宜补印扶身，忌财官过重'
  } else if (score <= 2) {
    level = '中和'
    explanation = '日主中和，五行平衡，运势平稳'
  } else if (score <= 4) {
    level = '偏强'
    explanation = '日主偏强，宜泄不宜补，可用食伤财星'
  } else {
    level = '强'
    explanation = '日主极强，亟需食伤泄秀或官杀克制'
  }
  
  return { score, level, explanation }
}

// 计算用神忌神
function calcUsefulHarmful(
  strength: { score: number; level: string },
  dayGan: string, monthZhi: string, yearZhi: string, hourZhi: string
): { useful: string[]; harmful: string[] } {
  const dayWx = GAN_WUXING[dayGan]
  const monthWx = ZHI_WUXING[monthZhi]
  const monthGans = ZANGAN[monthZhi]
  
  // 五行相生相克
  const wuxing = ['木', '火', '土', '金', '水']
  const dayIdx = WUXING_STRENGTH[dayWx]
  const birthIdx = dayIdx
  
  // 印星（生我的）
  const yin = wuxing[(dayIdx + 4) % 5]
  // 比劫（和我一样的）
  const bijie = dayWx
  // 食伤（我生的）
  const shishang = wuxing[(dayIdx + 1) % 5]
  // 财星（克我的）
  const caixing = wuxing[(dayIdx + 3) % 5]
  // 官杀（克日主最强的）
  const guansha = wuxing[(dayIdx + 2) % 5]
  
  if (strength.level === '弱' || strength.level === '偏弱') {
    return {
      useful: [yin === dayWx ? '印星' + yin + '（同气相助）' : '印星' + yin, bijie + '（比肩劫财助身）'],
      harmful: [caixing + '（财星耗身）', guansha + '（官杀攻身）'],
    }
  } else if (strength.level === '强' || strength.level === '偏强') {
    return {
      useful: [shishang + '（食伤泄秀）', caixing + '（财星耗身）'],
      harmful: [yin + '（印星生身更旺）', bijie + '（比劫助身）'],
    }
  }
  return {
    useful: ['五行平衡即可'],
    harmful: ['无特别忌讳'],
  }
}

// 计算五行统计
function countWuXing(
  yearGan: string, yearZhi: string,
  monthGan: string, monthZhi: string,
  dayGan: string, dayZhi: string,
  hourGan: string, hourZhi: string
): Record<string, number> {
  const counts: Record<string, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 }
  const gans = [yearGan, monthGan, dayGan, hourGan]
  const zhis = [yearZhi, dayZhi, monthZhi, hourZhi]
  
  gans.forEach(g => { counts[GAN_WUXING[g]]++ })
  zhis.forEach(z => { counts[ZHI_WUXING[z]]++; ZANGAN[z].forEach(sg => { counts[GAN_WUXING[sg]] += 0.5 }) })
  
  return counts
}

/**
 * 核心排盘函数
 */
export function calculateBazi(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number,
  birthMinute: number,
  gender: '男' | '女'
): BaziResult {
  const isMale = gender === '男'
  const lunar = toLunar(birthYear, birthMonth, birthDay)
  const { tianGan: yearGan, diZhi: yearZhi } = lunar
  
  // 计算月干支
  const monthGan = getMonthGanZhi(yearGan, lunar.month)
  const monthZhi = DI_ZHI[(lunar.month - 1) % 12]
  
  // 计算日干支
  const dayGanZhi = getDayGanZhi(birthYear, birthMonth, birthDay)
  const dayGan = dayGanZhi[0]
  const dayZhi = dayGanZhi[1]
  
  // 计算时干支
  const hourGanZhi = getHourGanZhi(dayGan, birthHour)
  const hourGan = hourGanZhi[0]
  const hourZhi = hourGanZhi[1]
  
  // 十神
  const dayGanIdx = DAY_GAN_IDX[dayGan]
  const tenGodMap = TEN_GODS[dayGan]
  
  function getTenGod(g: string): string {
    const idx = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'].indexOf(g)
    return tenGodMap[idx]
  }
  
  // 藏干
  function getHiddenStems(z: string): string[] {
    return ZANGAN[z] || []
  }
  
  const strength = calcDayMasterStrength(
    dayGan, yearZhi, monthZhi, dayZhi, hourZhi,
    yearGan, monthGan, hourGan, isMale
  )
  
  const { useful, harmful } = calcUsefulHarmful(strength, dayGan, monthZhi, yearZhi, hourZhi)
  const wuXingCount = countWuXing(yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi)
  
  return {
    yearPillar:   { gan: yearGan,  zhi: yearZhi,  hiddenStems: getHiddenStems(yearZhi) },
    monthPillar:  { gan: monthGan, zhi: monthZhi, hiddenStems: getHiddenStems(monthZhi) },
    dayPillar:    { gan: dayGan,   zhi: dayZhi,   hiddenStems: getHiddenStems(dayZhi) },
    hourPillar:   { gan: hourGan,  zhi: hourZhi,  hiddenStems: getHiddenStems(hourZhi) },
    tenGods: {
      year:  getTenGod(yearGan),
      month: getTenGod(monthGan),
      day:   getTenGod(dayGan),
      hour:  getTenGod(hourGan),
    },
    dayMasterStrength: strength,
    usefulGod: useful,
    harmfulGod: harmful,
    daYun: generateDaYun(birthYear, monthGan, monthZhi, birthYear, isMale),
    liuNian: generateLiuNian(birthYear, dayGan),
    wuXingCount,
    zodiac: SHENG_XIAO[DI_ZHI.indexOf(yearZhi)],
    mingGong: '',
    taiYuan: '',
    shenGong: '',
  }
}
