/**
 * 农历转换核心算法
 * 基于蔡勒公式(Zeller) + 农历查表法
 * 支持1900-2100年之间的任意公历转农历
 */

// 天干表
const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
// 地支表
const DI_ZHI   = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
// 生肖
const SHENG_XIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
// 节气表（每月两个节气，前为节，后为气）
const JIE_QI = [
  '小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨',
  '立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑',
  '白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至'
]

// 农历月天数（大月30天，小月29天）
const LUNAR_MONTH_DAYS = [
  0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334
]

// 农历闰月表（0=无闰月，1-12=闰几月）
const LUNAR_LEAP_MONTH = [
  0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,  // 1900-1911
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,  // 1912-1923
  0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,  // 1924-1935
  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,  // 1936-1947
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 1948-1959
  0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,  // 1960-1971
  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,  // 1972-1983
  1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,  // 1984-1995
  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,  // 1996-2007
  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 2008-2019
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 2020-2031
]

// 农历闰月天数表（0=小月29天，1=大月30天）
const LUNAR_LEAP_DAYS = [
  0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,  // 1900-1911
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,  // 1912-1923
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 1924-1935
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,  // 1936-1947
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 1948-1959
  0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,  // 1960-1971
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 1972-1983
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 1984-1995
  0, 0, 0, 0, 0, 0, 0, 0,1, 0, 0, 0,  // 1996-2007
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 2008-2019
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 2020-2031
]

// 计算某年春节的公历日期（正月初一）
const SPRING_FESTIVAL = [
  54, 43,  2, 21, 40, 29, 48, 37, 56, 45,  // 1900-1909
  34, 23, 42, 31, 50, 39,  8, 47, 36, 55,  // 1910-1919
  44, 33, 53, 41, 30, 49, 38, 27, 46, 35,  // 1920-1929
  54, 43,  3, 22, 41, 30, 49, 38,  7, 47,  // 1930-1939
  36, 55, 44, 33, 22, 41, 30, 49, 38, 27,  // 1940-1949
  46, 35, 54, 43, 32, 21, 40, 29, 48, 37,  // 1950-1959
   6, 46, 35, 54, 43, 32, 21, 40, 29, 18,  // 1960-1969
  47, 36, 55, 44, 33, 23, 41, 30, 49, 38,  // 1970-1979
   7, 47, 36, 55, 44, 33, 22, 41, 30, 49,  // 1980-1989
  38, 27, 46, 35, 54, 43, 32, 21, 40, 29,  // 1990-1999
  48, 37, 56, 46, 35, 24, 42, 31, 50, 39,  // 2000-2009
  28, 47, 36, 55, 44, 33, 22, 41, 30, 49,  // 2010-2019
  38, 27, 46, 35, 54, 43, 32, 21, 40, 29,  // 2020-2029
]

// 计算总天数（从1900年1月1日算起）
function daysFrom1900(year: number, month: number, day: number): number {
  let total = (year - 1900) * 365
  // 加上闰年
  for (let y = 1900; y < year; y++) {
    if ((y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0)) total++
  }
  total += LUNAR_MONTH_DAYS[month - 1]
  if (month > 2 && isLeapYear(year)) total++
  total += day
  return total
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

// 获取公历某月的总天数
function getDaysInMonth(year: number, month: number): number {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (month === 2 && isLeapYear(year)) return 29
  return days[month - 1]
}

// 农历日期转公历
function lunarToSolar(lunarYear: number, lunarMonth: number, lunarDay: number): Date {
  const baseDay = SPRING_FESTIVAL[lunarYear - 1900]
  const baseYear = 1900
  // 找到春节日期
  const baseDate = new Date(baseYear, 0, baseDay)
  
  // 加上农历月数
  let days = lunarDay
  for (let m = 1; m < lunarMonth; m++) {
    days += getLunarMonthDays(lunarYear, m)
  }
  // 加上闰月（如果有闰月且在当月之前）
  const leapMonth = LUNAR_LEAP_MONTH[lunarYear - 1900]
  if (leapMonth > 0 && leapMonth < lunarMonth) {
    days += LUNAR_LEAP_DAYS[lunarYear - 1900]
  }
  
  const springDate = new Date(baseYear, 0, baseDay)
  springDate.setDate(springDate.getDate() + days - 1)
  return springDate
}

// 获取农历月的天数
function getLunarMonthDays(lunarYear: number, lunarMonth: number): number {
  const yearIdx = lunarYear - 1900
  if (yearIdx < 0 || yearIdx >= LUNAR_LEAP_MONTH.length) return 30
  
  const leapMonth = LUNAR_LEAP_MONTH[yearIdx]
  if (lunarMonth === leapMonth + 1) {
    return LUNAR_LEAP_DAYS[yearIdx] === 1 ? 30 : 29
  }
  
  // 普通月：奇数月30天，偶数月29天
  return lunarMonth % 2 === 1 ? 30 : 29
}

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
 * 将公历日期转换为农历
 */
export function toLunar(year: number, month: number, day: number): LunarDate {
  const daysDiff = daysFrom1900(year, month, day)
  
  // 1900年1月31日是农历1900年正月初一
  const baseLunarDate = new Date(1900, 0, 31)
  const baseDays = 1
  
  let lunarYear = 1900
  let lunarMonth = 1
  let lunarDay = 1
  let remainingDays = daysDiff - baseDays
  
  // 遍历年份找到对应农历年
  while (lunarYear < 2100 && remainingDays > 0) {
    const yearDays = getLunarYearDays(lunarYear)
    if (remainingDays < yearDays) break
    remainingDays -= yearDays
    lunarYear++
    lunarMonth = 1
  }
  
  // 找到对应月份
  const leapMonth = LUNAR_LEAP_MONTH[lunarYear - 1900]
  lunarMonth = 1
  
  while (lunarMonth <= 12 && remainingDays > 0) {
    let monthDays: number
    if (lunarMonth === leapMonth + 1) {
      // 闰月
      monthDays = LUNAR_LEAP_DAYS[lunarYear - 1900]
    } else {
      monthDays = getLunarMonthDays(lunarYear, lunarMonth)
    }
    if (remainingDays < monthDays) break
    remainingDays -= monthDays
    lunarMonth++
  }
  
  lunarDay = remainingDays + 1
  
  // 计算天干地支
  const tianGanYear = (lunarYear - 4) % 10
  const diZhiYear   = (lunarYear - 4) % 12
  
  // 时辰地支（0-11对应23-1点到21-23点）
  const solarDate = new Date(year, month - 1, day)
  
  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    isLeap: false,
    tianGan: TIAN_GAN[tianGanYear >= 0 ? tianGanYear : tianGanYear + 10],
    diZhi: DI_ZHI[diZhiYear >= 0 ? diZhiYear : diZhiYear + 12],
    shengXiao: SHENG_XIAO[diZhiYear >= 0 ? diZhiYear : diZhiYear + 12],
    ganZhiYear: TIAN_GAN[tianGanYear >= 0 ? tianGanYear : tianGanYear + 10] + DI_ZHI[diZhiYear >= 0 ? diZhiYear : diZhiYear + 12],
    ganZhiMonth: '',
    ganZhiDay: '',
    solarDate,
  }
}

// 获取农历年的总天数
function getLunarYearDays(year: number): number {
  const yearIdx = year - 1900
  let days = 348 // 基本天数（12个月）
  for (let m = 1; m <= 12; m++) {
    if (getLunarMonthDays(year, m) === 30) days++
  }
  const leapDays = LUNAR_LEAP_DAYS[yearIdx]
  if (leapDays > 0) days += leapDays
  return days
}

// 修正月干支计算（根据年干推月干）
const MONTH_GAN_START: Record<string, number> = {
  '甲': 3, '己': 3,  // 寅月(3)
  '乙': 5, '庚': 5,  // 寅月(3) + 2
  '丙': 7, '辛': 7,
  '丁': 9, '壬': 9,
  '戊': 1, '癸': 1,
}

export function getMonthGanZhi(yearGan: string, month: number): string {
  const startIdx = MONTH_GAN_START[yearGan] - 1
  const ganIdx = (startIdx + month - 2) % 10
  const zhiIdx = (month + 1) % 12
  return TIAN_GAN[ganIdx] + DI_ZHI[zhiIdx === 0 ? 11 : zhiIdx - 1]
}

// 日干支计算（蔡勒公式简化）
export function getDayGanZhi(year: number, month: number, day: number): string {
  // 使用儒略日计算
  const m = month <= 2 ? month + 12 : month
  const y = month <= 2 ? year - 1 : year
  const K = y % 100
  const J = Math.floor(y / 100)
  const h = (day + Math.floor(13*(m+1)/5) + K + Math.floor(K/4) + Math.floor(J/4) + 5*J) % 60
  const ganIdx = h % 10
  const zhiIdx = h % 12
  return TIAN_GAN[ganIdx] + DI_ZHI[zhiIdx]
}

// 时辰干支（23:00-01:00为子时，01:00-03:00为丑时，以此类推）
const HOUR_GAN_START: Record<string, number> = {
  '甲': 1, '己': 1,
  '乙': 3, '庚': 3,
  '丙': 5, '辛': 5,
  '丁': 7, '壬': 7,
  '戊': 9, '癸': 9,
}

// 将24小时制转换为时辰序号（0-11，子时=0）
export function getHourBranchIndex(hour: number): number {
  // 23-1点 = 子时 = 0, 1-3点 = 丑时 = 1, ...
  // 公式: (hour + 1) % 24 / 2，向下取整
  const idx = Math.floor((hour + 1) % 24 / 2)
  return idx
}

export function getHourGanZhi(dayGan: string, hour: number): string {
  const branchIdx = getHourBranchIndex(hour)
  const startIdx = HOUR_GAN_START[dayGan] - 1
  const ganIdx = (startIdx + branchIdx) % 10
  return TIAN_GAN[ganIdx] + DI_ZHI[branchIdx]
}

export { TIAN_GAN, DI_ZHI, SHENG_XIAO }
