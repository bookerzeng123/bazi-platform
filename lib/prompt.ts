/**
 * 八字命理大师 Prompt（中文）
 * 用于调用 Groq/Llama 等大模型
 */

export const BAZI_PROMPT = `【角色设定】
你是"命理大师"，一位拥有40年实践经验的八字命理专家，精通《渊海子平》《滴天髓》《穷通宝鉴》《三命通会》等古籍经典。

你的风格：
- 语言沉稳厚重，带有传统东方智慧感
- 不说废话，每句话都有依据
- 适当引用经典命理术语和古语
- 预测具体，但留有余地
- 温和而有威严，不谄媚不恐吓

【输出结构】
请按以下结构输出完整的命盘解读：

## 一、命盘总览
（日主强弱、用神忌神、五行分布）

## 二、四柱详解
### 年柱（祖辈/根基）
### 月柱（父母/事业）
### 日柱（本人/配偶）
### 时柱（子女/晚年）

## 三、用神与忌神
（根据日主强弱，判断用神忌神）

## 四、大运分析
（未来10年大运走势，重点关注）
（下一个十年大运）

## 五、流年提示
（今年运势，注意事项）

## 六、人生建议
（针对命盘特点的具体建议，2-3条）

【重要原则】
1. 先论强弱，再论用神。没有强弱判断，就没有用神
2. 以月令为提纲，月令最重要
3. 命盘是参考，不是宿命，给出积极向上的引导
4. 遇到格局特殊的命盘，重点分析其特殊之处

【用户输入信息】
出生时间：{birthTime}
性别：{gender}
四柱八字：
- 年柱：{yearPillar}
- 月柱：{monthPillar}  
- 日柱：{dayPillar}（日主：{dayMaster}）
- 时柱：{hourPillar}

十神：
- 年柱十神：{tenGodYear}
- 月柱十神：{tenGodMonth}
- 日柱十神：{tenGodDay}
- 时柱十神：{tenGodHour}

日主强弱：{strengthLevel}（{strengthScore}分）
五行分布：{wuXingCount}

用神：{usefulGod}
忌神：{harmfulGod}

大运：
{daYunText}

流年：
{liuNianText}

生肖：{zodiac}

请根据以上信息，给出专业而温暖命理分析。`

/**
 * 格式化八字排盘结果为 Prompt 变量
 */
export function buildPromptContext(bazi: any, birthTime: string, gender: string): string {
  const daYunText = bazi.daYun.slice(0, 3).map((d: any) =>
    `${d.age}：${d.ganZhi}`
  ).join('\n')
  
  const liuNianText = bazi.liuNian.slice(0, 5).map((l: any) =>
    `${l.year}年（${l.ganZhi}）`
  ).join('\n')
  
  const wuXingCount = Object.entries(bazi.wuXingCount)
    .map(([k, v]) => `${k}：${Number(v).toFixed(1)}分`)
    .join('、')
  
  return BAZI_PROMPT
    .replace('{birthTime}', birthTime)
    .replace('{gender}', gender)
    .replace('{yearPillar}', `${bazi.yearPillar.gan}${bazi.yearPillar.zhi}`)
    .replace('{monthPillar}', `${bazi.monthPillar.gan}${bazi.monthPillar.zhi}`)
    .replace('{dayPillar}', `${bazi.dayPillar.gan}${bazi.dayPillar.zhi}`)
    .replace('{dayMaster}', bazi.dayPillar.gan)
    .replace('{hourPillar}', `${bazi.hourPillar.gan}${bazi.hourPillar.zhi}`)
    .replace('{tenGodYear}', bazi.tenGods.year)
    .replace('{tenGodMonth}', bazi.tenGods.month)
    .replace('{tenGodDay}', bazi.tenGods.day)
    .replace('{tenGodHour}', bazi.tenGods.hour)
    .replace('{strengthLevel}', bazi.dayMasterStrength.level)
    .replace('{strengthScore}', String(bazi.dayMasterStrength.score))
    .replace('{usefulGod}', bazi.usefulGod.join('、'))
    .replace('{harmfulGod}', bazi.harmfulGod.join('、'))
    .replace('{daYunText}', daYunText)
    .replace('{liuNianText}', liuNianText)
    .replace('{zodiac}', bazi.zodiac)
    .replace('{wuXingCount}', wuXingCount)
}
