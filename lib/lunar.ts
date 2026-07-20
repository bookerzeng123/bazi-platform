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
  
  const ganZhiYear = lunar.getYearInGanZhi()
  const ganZhiMonth = lunar.getMonthInGanZhi()
  const ganZhiDay = lunar.getDayInGanZhi()
  
  return {
    year: lunar.getYear(),
    month: lunar.getMonth(),
    day: lunar.getDay(),
    isLeap: lunar.getMonth() !== lunar.getMonth(),
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
  const solar = Solar.fromYmd(2024, 1, 1)
  const lunar = solar.getLunar()
  
  // 使用库计算时辰
  const timeZhi = Math.floor((hour + 1) / 2) % 12
  const zhi = DI_ZHI[timeZhi]
  
  // 时干根据日干推算
  const dayGan = dayGanZhi[0]
  const dayGanIdx = TIAN_GAN.indexOf(dayGan)
  
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
 * 获取月干支
 */
export function getMonthGanZhi(yearGan: string, lunarMonth: number): string {
  // 年干定月干：甲己之年丙作首，乙庚之岁戊为头...
  const yearGanMap: Record<string, number> = {
    '甲': 2, '己': 2,  // 丙
    '乙': 4, '庚': 4,  // 戊
    '丙': 6, '辛': 6,  // 庚
    '丁': 8, '壬': 8,  // 壬
    '戊': 0, '癸': 0,  // 甲
  }
  
  const startGan = yearGanMap[yearGan]
  const gan = TIAN_GAN[(startGan + lunarMonth - 1) % 10]
  const zhi = DI_ZHI[(lunarMonth + 1) % 12]
  
  return gan + zhi
}

/**
 * 获取日干支
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
