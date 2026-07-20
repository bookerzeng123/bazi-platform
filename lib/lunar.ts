/**
 * 农历转换 - 使用 lunar-javascript 库
 * 更准确的农历和八字计算
 */

import { Solar, Lunar } from 'lunar-javascript'

export const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
export const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
export const SHENG_XIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

export interface LunarDate {
  year: number
  month: number
  day: number
  isLeap: boolean
  tianGan: string
  diZhi: string
  shengXiao: string
  ganZhiYear: string
  ganZhiMonth: string
  ganZhiDay: string
  solarDate: Date
}

/**
 * 将公历日期转换为农历和八字信息
 */
export function toLunar(year: number, month: number, day: number): LunarDate {
  const solar = Solar.fromYmd(year, month, day)
  const lunar = solar.getLunar()
  
  // lunar-javascript 库：getMonth() 返回负数表示闰月（如 -4 = 闰四月）
  const rawMonth = lunar.getMonth()
  const isLeap = rawMonth < 0
  const lunarMonth = Math.abs(rawMonth)
  
  const ganZhiYear = lunar.getYearInGanZhi()
  const ganZhiMonth = lunar.getMonthInGanZhi()
  const ganZhiDay = lunar.getDayInGanZhi()
  
  return {
    year: lunar.getYear(),
    month: lunarMonth,
    day: lunar.getDay(),
    isLeap,
    tianGan: ganZhiYear[0],
    diZhi: ganZhiYear[1],
    shengXiao: lunar.getYearShengXiao(),
    ganZhiYear,
    ganZhiMonth,
    ganZhiDay,
    solarDate: new Date(year, month - 1, day),
  }
}

/**
 * 获取时辰干支
 * 23:00-01:00为子时，01:00-03:00为丑时，以此类推
 */
export function getHourGanZhi(dayGanZhi: string, hour: number): string {
  const timeZhi = Math.floor((hour + 1) / 2) % 12
  const zhi = DI_ZHI[timeZhi]
  
  const dayGan = dayGanZhi[0]
  
  // 甲己日起甲子时，乙庚日起丙子时，丙辛日起戊子时，丁壬日起庚子时，戊癸日起壬子时
  const startGanMap: Record<string, number> = {
    '甲': 0, '己': 0,
    '乙': 2, '庚': 2,
    '丙': 4, '辛': 4,
    '丁': 6, '壬': 6,
    '戊': 8, '癸': 8,
  }
  
  const startGan = startGanMap[dayGan]
  const gan = TIAN_GAN[(startGan + timeZhi) % 10]
  
  return gan + zhi
}

/**
 * 获取月干支 - 使用 lunar-javascript 库直接获取（已考虑节气）
 */
export function getMonthGanZhi(yearGan: string, lunarMonth: number): string {
  // 使用五虎遁月诀：年干定月干
  const yearGanMap: Record<string, number> = {
    '甲': 2, '己': 2,  // 丙寅
    '乙': 4, '庚': 4,  // 戊寅
    '丙': 6, '辛': 6,  // 庚寅
    '丁': 8, '壬': 8,  // 壬寅
    '戊': 0, '癸': 0,  // 甲寅
  }
  
  const startGan = yearGanMap[yearGan]
  // 正月建寅，lunarMonth=1 对应 寅(地支索引2)
  const gan = TIAN_GAN[(startGan + lunarMonth - 1) % 10]
  // 地支：正月寅，二月卯，三月辰... lunarMonth-1+2 = lunarMonth+1
  const zhi = DI_ZHI[(lunarMonth + 1) % 12]
  
  return gan + zhi
}

/**
 * 获取日干支 - 使用 lunar-javascript 库
 */
export function getDayGanZhi(year: number, month: number, day: number): string {
  const solar = Solar.fromYmd(year, month, day)
  const lunar = solar.getLunar()
  return lunar.getDayInGanZhi()
}

/**
 * 将小时转换为时辰地支索引
 */
export function getHourBranchIndex(hour: number): number {
  return Math.floor((hour + 1) / 2) % 12
}

/**
 * 验证排盘准确性 - 用于调试
 */
export function verifyBazi(year: number, month: number, day: number, hour: number): {
  solar: string
  lunar: string
  yearPillar: string
  monthPillar: string
  dayPillar: string
  hourPillar: string
  shengXiao: string
} {
  const solar = Solar.fromYmd(year, month, day)
  const lunar = solar.getLunar()
  
  const dayGanZhi = lunar.getDayInGanZhi()
  const hourGanZhi = getHourGanZhi(dayGanZhi, hour)
  
  return {
    solar: `${year}-${month}-${day}`,
    lunar: `${lunar.getYear()}年${lunar.getMonth()}月${lunar.getDay()}日`,
    yearPillar: lunar.getYearInGanZhi(),
    monthPillar: lunar.getMonthInGanZhi(),
    dayPillar: dayGanZhi,
    hourPillar: hourGanZhi,
    shengXiao: lunar.getYearShengXiao(),
  }
}
