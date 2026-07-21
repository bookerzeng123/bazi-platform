/**
 * Optimized Bazi Reading Prompt — reduced ~30% tokens
 */

export function buildExpertPrompt(baziData: {
  yearPillar: string; monthPillar: string; dayPillar: string; hourPillar: string;
  zodiacAnimal: string; dayMaster: string; dayMasterElement: string;
  dayMasterStrength: { level: string; score: number; reason: string };
  tenGods: Record<string, string>;
  usefulGod: string; harmfulGod: string;
  wuXingScores: Record<string, number>;
  daYun: Array<{ pillar: string; ageStart: number; ageEnd: number }>;
  liuNian: Array<{ pillar: string; year: number }>;
  gender: string; question?: string;
}): string {
  const d = baziData
  const g = d.gender === 'male' ? 'Yang' : 'Yin'

  const chart = [
    `Four Pillars: ${d.yearPillar} ${d.monthPillar} ${d.dayPillar} ${d.hourPillar}`,
    `Day Master: ${d.dayMaster} (${d.dayMasterElement}, ${g}) · Year: ${d.zodiacAnimal}`,
    `Strength: ${d.dayMasterStrength.level} (${d.dayMasterStrength.score}/10) · ${d.dayMasterStrength.reason}`,
    `Ten Gods: ${Object.entries(d.tenGods).map(([k,v]) => `${k}:${v}`).join(' ')}`,
    `Use/Harm: ${d.usefulGod} / ${d.harmfulGod} · Five: ${Object.entries(d.wuXingScores).map(([e,s]) => `${e}${s}`).join(' ')}`,
    `Luck: ${d.daYun.map(p => `${p.pillar}(${p.ageStart}-${p.ageEnd})`).join('→')}`,
    `Year: ${d.liuNian.slice(0,3).map(l => `${l.pillar}(${l.year})`).join('→')}`,
    d.question ? `Q: "${d.question}"` : 'No question asked.'
  ].join('\n')

  return `You are a master of Bazi (Yuan Hai Zi Ping / Di Tian Sui / Qiong Tong Bao Jian). Respond only in English, 300-400 words.

CHART:
${chart}

Write a personal reading covering: (1) Chart overview & Day Master nature (2) Dominant Ten Gods as personality (3) Useful/Harmful elements in daily life (4) Current decade luck & next 3 years (5) One closing truth.

Be specific, honest, compassionate. End with one actionable step for the next 7 days.`
}
