/**
 * 八字排盘核心 - 使用 lunar-javascript 库
 * 更准确的八字计算
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
    score: number
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

// 天干索引
const GAN_IDX: Record<string, number> = {
  '甲': 0, '乙': 1, '丙': 2, '丁': 3, '戊': 4,
  '己': 5, '庚': 6, '辛': 7, '壬': 8, '癸': 9,
}

// 十神映射表（日干为参照）
const TEN_GODS: Record<string, string[]> = {
  '甲': ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'],
  '乙': ['劫财', '比肩', '伤官', '食神', '正财', '偏财', '正官', '七杀', '正印', '偏印'],
  '丙': ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'],
  '丁': ['劫财', '比肩', '伤官', '食神', '正财', '偏财', '正官', '七杀', '正印', '偏印'],
  '戊': ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'],
  '己': ['劫财', '比肩', '伤官', '食神', '正财', '偏财', '正官', '七杀', '正印', '偏印'],
  '庚': ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'],
  '辛': ['劫财', '比肩', '伤官', '食神', '正财', '偏财', '正官', '七杀', '正印', '偏印'],
  '壬': ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'],
  '癸': ['劫财', '比肩', '伤官', '食神', '正财', '偏财', '正官', '七杀', '正印', '偏印'],
}

// 地支藏干表
const ZANGAN: Record<string, string[]> = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '庚', '戊'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲'],
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

// 五行相生相克关系
const WUXING_SHENG: Record<string, string> = {
  '木': '火', '火': '土', '土': '金', '金': '水', '水': '木',
}
const WUXING_KE: Record<string, string> = {
  '木': '土', '土': '水', '水': '火', '火': '金', '金': '木',
}

// 获取十神名称
function getTenGod(dayGan: string, targetGan: string): string {
  const dayIdx = GAN_IDX[dayGan]
  const targetIdx = GAN_IDX[targetGan]
  const diff = (targetIdx - dayIdx + 10) % 10
  return TEN_GODS[dayGan][diff]
}

// 生成大运
function generateDaYun(
  birthYear: number,
  monthGan: string,
  monthZhi: string,
  isMale: boolean,
  yearGan: string
): Array<{ age: string; startYear: number; gan: string; zhi: string; ganZhi: string }> {
  const ganCycle = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const zhiCycle = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  
  const yearGanIdx = GAN_IDX[yearGan]
  const isYang = yearGanIdx % 2 === 0 // 甲丙戊庚壬为阳
  
  // 阳男阴女顺排，阴男阳女逆排
  const isForward = (isYang && isMale) || (!isYang && !isMale)
  
  const ganIdx = ganCycle.indexOf(monthGan)
  const zhiIdx = zhiCycle.indexOf(monthZhi)
  
  const result = []
  for (let i = 0; i < 10; i++) {
    const step = i + 1
    const newGanIdx = isForward
      ? (ganIdx + step) % 10
      : (ganIdx - step + 10) % 10
    const newZhiIdx = isForward
      ? (zhiIdx + step) % 12
      : (zhiIdx - step + 12) % 12
    
    const startAge = step * 10 - 9
    const startYear = birthYear + startAge - 1
    
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

// 生成流年
function generateLiuNian(startYear: number): Array<{ year: number; gan: string; zhi: string; ganZhi: string }> {
  const ganCycle = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const zhiCycle = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  
  const result = []
  for (let i = 0; i < 10; i++) {
    const year = startYear + i
    const ganIdx = (year - 4) % 10
    const zhiIdx = (year - 4) % 12
    result.push({
      year,
      gan: ganCycle[ganIdx],
      zhi: zhiCycle[zhiIdx],
      ganZhi: ganCycle[ganIdx] + zhiCycle[zhiIdx],
    })
  }
  return result
}

// 计算日主强弱
function calcDayMasterStrength(
  dayGan: string,
  monthZhi: string,
  yearZhi: string,
  dayZhi: string,
  hourZhi: string
): { score: number; level: '弱' | '偏弱' | '中和' | '偏强' | '强'; explanation: string } {
  let score = 0
  const dayWx = GAN_WUXING[dayGan]
  
  // 月令最重要（得令）
  const monthWx = ZHI_WUXING[monthZhi]
  if (monthWx === dayWx) score += 3
  else if (WUXING_SHENG[monthWx] === dayWx) score += 2
  else if (WUXING_KE[monthWx] === dayWx) score -= 2
  
  // 地支藏干（得地）
  const zhis = [yearZhi, dayZhi, hourZhi]
  zhis.forEach(z => {
    const zhiGans = ZANGAN[z]
    zhiGans.forEach(g => {
      if (g === dayGan) score += 1.5
      else if (GAN_WUXING[g] === dayWx) score += 1
      else if (WUXING_SHENG[GAN_WUXING[g]] === dayWx) score += 0.5
    })
  })
  
  let level: '弱' | '偏弱' | '中和' | '偏强' | '强'
  let explanation: string
  
  if (score <= -2) {
    level = '弱'
    explanation = '日主极弱，需印星生助，比劫扶持'
  } else if (score <= 0) {
    level = '偏弱'
    explanation = '日主偏弱，宜补印扶身，忌财官过重'
  } else if (score <= 3) {
    level = '中和'
    explanation = '日主中和，五行平衡，运势平稳'
  } else if (score <= 5) {
    level = '偏强'
    explanation = '日主偏强，宜泄不宜补，可用食伤财星'
  } else {
    level = '强'
    explanation = '日主极强，亟需食伤泄秀或官杀克制'
  }
  
  return { score: Math.round(score), level, explanation }
}

// 计算用神忌神
function calcUsefulHarmful(
  strength: { level: string },
  dayGan: string
): { useful: string[]; harmful: string[] } {
  const dayWx = GAN_WUXING[dayGan]
  
  // 印星（生我的）
  const yin = Object.keys(WUXING_SHENG).find(k => WUXING_SHENG[k] === dayWx) || ''
  // 比劫（同我）
  const bijie = dayWx
  // 食伤（我生的）
  const shishang = WUXING_SHENG[dayWx]
  // 财星（我克的）
  const caixing = Object.keys(WUXING_KE).find(k => WUXING_KE[k] === dayWx) || ''
  // 官杀（克我的）
  const guansha = WUXING_KE[dayWx]
  
  if (strength.level === '弱' || strength.level === '偏弱') {
    return {
      useful: [`${yin}（印星生身）`, `${bijie}（比劫助身）`],
      harmful: [`${caixing}（财星耗身）`, `${guansha}（官杀攻身）`],
    }
  } else if (strength.level === '强' || strength.level === '偏强') {
    return {
      useful: [`${shishang}（食伤泄秀）`, `${caixing}（财星耗身）`],
      harmful: [`${yin}（印星生身更旺）`, `${bijie}（比劫助身）`],
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
  
  // 天干五行
  counts[GAN_WUXING[yearGan]]++
  counts[GAN_WUXING[monthGan]]++
  counts[GAN_WUXING[dayGan]]++
  counts[GAN_WUXING[hourGan]]++
  
  // 地支本气
  counts[ZHI_WUXING[yearZhi]]++
  counts[ZHI_WUXING[monthZhi]]++
  counts[ZHI_WUXING[dayZhi]]++
  counts[ZHI_WUXING[hourZhi]]++
  
  // 地支藏干（中气和余气权重较低）
  const allZhis = [yearZhi, monthZhi, dayZhi, hourZhi]
  allZhis.forEach(z => {
    const gans = ZANGAN[z]
    gans.slice(1).forEach(g => {
      counts[GAN_WUXING[g]] += 0.5
    })
  })
  
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
  gender: 'male' | 'female'
): BaziResult {
  const isMale = gender === 'male'
  
  // 获取农历信息
  const lunar = toLunar(birthYear, birthMonth, birthDay)
  
  // 年柱
  const yearGanZhi = lunar.ganZhiYear
  const yearGan = yearGanZhi[0]
  const yearZhi = yearGanZhi[1]
  
  // 月柱 - 使用 lunar-javascript 库直接获取（更准确，已考虑节气）
  const monthGanZhi = lunar.ganZhiMonth
  const monthGan = monthGanZhi[0]
  const monthZhi = monthGanZhi[1]
  
  // 日柱
  const dayGanZhi = getDayGanZhi(birthYear, birthMonth, birthDay)
  const dayGan = dayGanZhi[0]
  const dayZhi = dayGanZhi[1]
  
  // 时柱
  const hourGanZhi = getHourGanZhi(dayGanZhi, birthHour)
  const hourGan = hourGanZhi[0]
  const hourZhi = hourGanZhi[1]
  
  // 十神
  const tenGods = {
    year: getTenGod(dayGan, yearGan),
    month: getTenGod(dayGan, monthGan),
    day: '日主',
    hour: getTenGod(dayGan, hourGan),
  }
  
  // 日主强弱
  const strength = calcDayMasterStrength(dayGan, monthZhi, yearZhi, dayZhi, hourZhi)
  
  // 用神忌神
  const { useful, harmful } = calcUsefulHarmful(strength, dayGan)
  
  // 五行统计
  const wuXingCount = countWuXing(
    yearGan, yearZhi,
    monthGan, monthZhi,
    dayGan, dayZhi,
    hourGan, hourZhi
  )
  
  return {
    yearPillar: { gan: yearGan, zhi: yearZhi, hiddenStems: ZANGAN[yearZhi] },
    monthPillar: { gan: monthGan, zhi: monthZhi, hiddenStems: ZANGAN[monthZhi] },
    dayPillar: { gan: dayGan, zhi: dayZhi, hiddenStems: ZANGAN[dayZhi] },
    hourPillar: { gan: hourGan, zhi: hourZhi, hiddenStems: ZANGAN[hourZhi] },
    tenGods,
    dayMasterStrength: strength,
    usefulGod: useful,
    harmfulGod: harmful,
    daYun: generateDaYun(birthYear, monthGan, monthZhi, isMale, yearGan),
    liuNian: generateLiuNian(birthYear),
    wuXingCount,
    zodiac: lunar.shengXiao,
    mingGong: '',
    taiYuan: '',
    shenGong: '',
  }
}
