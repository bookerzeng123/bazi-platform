/**
 * 农历转换 - 使用 lunar-javascript 库
 * 所有八字计算均通过库的 EightChar 保证准确
 */

import { Solar, Lunar } from 'lunar-javascript'

export const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
export const DI_ZHI  = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
export const SHENG_XIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

export interface LunarDate {
  year: number
  month: number
  day: number
  isLeap: boolean
  ganZhiYear: string
  ganZhiMonth: string
  ganZhiDay: string
  ganZhiHour: string
  yearShengXiao: string
}

/**
 * 将公历日期转换为农历信息
 */
export function toLunar(year: number, month: number, day: number): LunarDate {
  const solar = Solar.fromYmd(year, month, day)
  const lunar = solar.getLunar()

  // lunar-javascript: getMonth() 返回负数表示闰月（如 -4 = 闰四月）
  const rawMonth = lunar.getMonth()
  const isLeap = rawMonth < 0
  const lunarMonth = Math.abs(rawMonth)

  // 年柱、月柱、日柱、时柱全部用库的 EightChar（最准确）
  const ec = lunar.getEightChar()

  return {
    year: lunar.getYear(),
    month: lunarMonth,
    day: lunar.getDay(),
    isLeap,
    ganZhiYear:  ec.getYear(),
    ganZhiMonth:  ec.getMonth(),
    ganZhiDay:   ec.getDay(),
    ganZhiHour:  ec.getTime(),
    yearShengXiao: lunar.getYearShengXiao(),
  }
}

/**
 * 获取时辰干支（使用库的 EightChar，基于真实生日）
 */
export function getHourGanZhi(birthYear: number, birthMonth: number, birthDay: number, hour: number): string {
  const solar = Solar.fromYmdHms(birthYear, birthMonth, birthDay, hour, 0, 0)
  const lunar = solar.getLunar()
  return lunar.getEightChar().getTime()
}

/**
 * 获取日干支
 */
export function getDayGanZhi(year: number, month: number, day: number): string {
  const solar = Solar.fromYmd(year, month, day)
  const lunar = solar.getLunar()
  return lunar.getEightChar().getDay()
}

export { Solar, Lunar }
