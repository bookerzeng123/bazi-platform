'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const ZODIAC_SIGNS = [
  { name: '摩羯座', date: '12.22-1.19', element: '土', icon: '♑', traits: '务实、野心、保守', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, planet: '土星' },
  { name: '水瓶座', date: '1.20-2.18', element: '风', icon: '♒', traits: '独立、创新、叛逆', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, planet: '天王星' },
  { name: '双鱼座', date: '2.19-3.20', element: '水', icon: '♓', traits: '浪漫、幻想、善良', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, planet: '海王星' },
  { name: '白羊座', date: '3.21-4.19', element: '火', icon: '♈', traits: '热情、冲动、勇敢', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, planet: '火星' },
  { name: '金牛座', date: '4.20-5.20', element: '土', icon: '♉', traits: '稳重、务实、固执', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, planet: '金星' },
  { name: '双子座', date: '5.21-6.21', element: '风', icon: '♊', traits: '聪明、善变、好奇', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21, planet: '水星' },
  { name: '巨蟹座', date: '6.22-7.22', element: '水', icon: '♋', traits: '敏感、顾家、情绪化', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22, planet: '月亮' },
  { name: '狮子座', date: '7.23-8.22', element: '火', icon: '♌', traits: '自信、慷慨、爱面子', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, planet: '太阳' },
  { name: '处女座', date: '8.23-9.22', element: '土', icon: '♍', traits: '完美、细致、挑剔', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, planet: '水星' },
  { name: '天秤座', date: '9.23-10.23', element: '风', icon: '♎', traits: '优雅、犹豫、公正', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23, planet: '金星' },
  { name: '天蝎座', date: '10.24-11.22', element: '水', icon: '♏', traits: '神秘、执着、占有欲', startMonth: 10, startDay: 24, endMonth: 11, endDay: 22, planet: '冥王星' },
  { name: '射手座', date: '11.23-12.21', element: '火', icon: '♐', traits: '自由、乐观、粗心', startMonth: 11, startDay: 23, endMonth: 12, endDay: 21, planet: '木星' },
]

function getZodiacSign(month: number, day: number) {
  for (const sign of ZODIAC_SIGNS) {
    if (sign.startMonth === 12 && sign.endMonth === 1) {
      if ((month === 12 && day >= sign.startDay) || (month === 1 && day <= sign.endDay)) {
        return sign
      }
    } else {
      if ((month === sign.startMonth && day >= sign.startDay) ||
          (month === sign.endMonth && day <= sign.endDay)) {
        return sign
      }
    }
  }
  return ZODIAC_SIGNS[0]
}

// 12星座的每日运势模板（基于星座特质 + 每日变化）
const HOROSCOPE_TEMPLATES: Record<string, {
  overall: string[]
  love: string[]
  career: string[]
  money: string[]
  health: string[]
}> = {
  '白羊座': {
    overall: [
      '今日火星能量充沛，你将充满活力与斗志。适合主动出击、把握机会。',
      '今天的你可能会有些急躁，但你的热情会感染周围的人。',
      '金星进入你的关系宫，今天与人合作会有意外的惊喜。',
      '今日水星逆行的影响显现，注意沟通时容易产生误会。',
    ],
    love: [
      '单身者今天魅力四射，有机会在社交场合遇到心动对象。建议主动一些，命运掌握在自己手中。已有伴侣的你，今天与爱人有共同话题，可以一起规划未来。',
      '今天的你可能会对伴侣有些挑剔，但请记住，爱需要包容。建议换个角度看待对方的小缺点。',
      '桃花旺盛的一天，单身者可能会收到意外的表白或暗示。已有伴侣的你，今天感情升温，适合共度美好时光。',
    ],
    career: [
      '今日事业运强劲，你的工作能力得到领导的认可，可能会被委以重任。把握机会，展现你的领导力。',
      '工作中可能会遇到一些挑战，但凭借你的勇气和决断力，能够顺利化解。建议保持冷静，三思后行。',
      '今天适合团队协作，你的创意会得到同事的响应。下午会有一个重要的会议或决策，需要你全力以赴。',
    ],
    money: [
      '今日财运不错，正财稳定，可能会有奖金或额外收入。偏财方面，适合小额投资，不宜大额冒险。',
      '今天可能会有意外支出，建议理性消费，避免冲动购物。可以把省下的钱存起来作为备用。',
      '财运旺盛的一天，可能会有来自朋友的财务好消息。也可能收到欠款或分红。但请记住，理财需谨慎。',
    ],
    health: [
      '今日身体状况良好，精力充沛，适合进行高强度运动或户外活动。注意多喝水，保持良好的作息。',
      '今天可能会有些疲劳，建议早点休息。可以做些轻柔的瑜伽或冥想来放松身心。',
      '健康运势上升，适合开始新的健身计划或饮食习惯。保持积极的心态，身体会越来越健康。',
    ],
  },
  '金牛座': {
    overall: [
      '今日金星照耀，你的气质格外吸引人。适合处理财务问题或与心爱的人共度时光。',
      '今天的你比较稳定踏实，适合完成需要耐心的任务。不要被外界的喧嚣打扰你的节奏。',
      '土星的影响让你今天比较有责任感，但也可能感到压力。记得适当放松，不要把自己逼得太紧。',
      '今日创意十足，你的艺术细胞活跃，可以尝试一些新的创作或装饰家居。',
    ],
    love: [
      '今日爱情运势上升，你与伴侣之间的感情更加稳定。可以为对方准备一份小礼物，表达你的心意。单身者今天可能会遇到一个稳重踏实的对象。',
      '今天与伴侣可能会有一些小摩擦，建议坦诚沟通，把心里的想法说出来，不要憋在心里。',
      '桃花暗藏的一天，单身者可能会在工作中遇到心仪的对象。已有伴侣的你，今天的感情生活平淡而幸福。',
    ],
    career: [
      '今日工作进展顺利，你的努力得到了回报。可能会得到领导的表扬或同事的认可。继续保持这种状态。',
      '今天可能会遇到一些工作上的瓶颈，建议换个思路，或者向有经验的同事请教。',
      '你的专业能力得到客户的认可，今天可能会签下一个重要的合同或达成合作。',
    ],
    money: [
      '今日财运极佳，适合进行长期投资或理财规划。你的理财能力今天特别强，可以好好规划未来的财务。',
      '今天可能会有意外之财，比如收到红包或奖金。但请理性对待，不要因为一时兴起就乱花钱。',
      '财运平稳的一天，没有大起大落。建议把注意力放在如何增加收入上，而不是削减开支。',
    ],
    health: [
      '今日身体状况良好，适合享受美食或户外活动。但请注意控制饮食，不要暴饮暴食。',
      '可能会有颈椎或肩膀的不适，建议多做一些伸展运动。工作间隙起身活动一下。',
      '健康运势上升，适合尝试新的运动或饮食习惯。可以多喝水，多吃蔬菜水果。',
    ],
  },
  '双子座': {
    overall: [
      '今日水星能量活跃，你的思维敏捷，沟通能力出色。适合谈判、写作、教学等需要表达的工作。',
      '今天你可能会有些心不在焉，建议集中注意力完成手头的任务。',
      '好奇心旺盛的一天，你可能会接触到新的知识或技能。保持学习的热情，会有意外的收获。',
      '今日社交运不错，适合参加聚会或拓展人脉。你的幽默感会让你成为人群中的焦点。',
    ],
    love: [
      '今日爱情运势上升，单身者今天可能会遇到一个能与你畅聊的人。注意，缘分往往在不经意间出现。已有伴侣的你，今天与爱人的沟通顺畅。',
      '今天可能会因为一些小事与伴侣产生分歧。建议耐心倾听对方的想法，而不是急于表达自己的观点。',
      '桃花旺盛的一天，你的魅力吸引了不少人的注意。但请谨慎选择，不要被表面现象迷惑。',
    ],
    career: [
      '今日工作效率极高，你的创意和想法得到团队的认可。适合进行头脑风暴或策划会议。',
      '今天可能会有多个项目同时进行，建议合理安排时间，分清主次。',
      '你的沟通能力今天特别出色，适合进行演讲、汇报或谈判。可能会有意外的好消息。',
    ],
    money: [
      '今日财运一般，没有大起大落。建议把注意力放在如何增加收入上，而不是削减开支。',
      '今天可能会有一些意外支出，比如朋友借钱或购买必需品。建议量入为出，不要超支。',
      '财运上升的一天，你可能会有一些不错的投资机会。但请理性分析，不要盲目跟风。',
    ],
    health: [
      '今日身体状况良好，但要注意用眼卫生。长时间看电脑或手机后，记得让眼睛休息一下。',
      '可能会有些神经紧张，建议做一些放松的活动，比如听音乐、看电影或散步。',
      '健康运势上升，适合多进行户外活动，呼吸新鲜空气。',
    ],
  },
  '巨蟹座': {
    overall: [
      '今日月亮能量充沛，你的直觉特别敏锐。适合处理与家庭、情感相关的事务。',
      '今天的你比较情绪化，容易被外界的事情影响。建议保持内心的平静。',
      '家庭运势上升，今天适合与家人共度时光，加深彼此的感情。',
      '今日直觉准确，可以凭借自己的感觉做出重要决定。相信你的内心。',
    ],
    love: [
      '今日爱情运势极佳，单身者今天可能会遇到一个温柔体贴的对象。已有伴侣的你，今天与爱人的感情升温。',
      '今天可能会因为一些过去的回忆而感到伤感。建议把注意力放在当下，不要沉溺于过去。',
      '桃花暗藏的一天，你的温柔和善良吸引着周围的人。保持真实的自己，会遇到对的人。',
    ],
    career: [
      '今日工作运势平稳，你与同事之间的关系融洽。适合进行需要团队协作的任务。',
      '今天可能会有一些工作上的情绪波动。建议保持冷静，不要把个人情绪带到工作中。',
      '你的细心和体贴今天得到了同事的认可。可能会被安排一些重要但需要耐心的工作。',
    ],
    money: [
      '今日财运一般，建议保守理财，不要进行高风险的投资。',
      '今天可能会有一些来自家人的财务支持或建议。可以参考，但最终决定要自己做。',
      '财运上升的一天，你可能会有一些节省开支的好方法。可以学习一些理财技巧。',
    ],
    health: [
      '今日身体状况良好，但要注意肠胃健康。避免吃太多辛辣或油腻的食物。',
      '可能会有些情绪低落，建议找朋友倾诉或做一些让自己开心的事。',
      '健康运势上升，适合多陪伴家人，或者给家里做一顿美味的饭菜。',
    ],
  },
  '狮子座': {
    overall: [
      '今日太阳能量充沛，你充满自信和魅力。适合展示自己、争取机会。',
      '今天的你可能有些高傲，建议虚心听取他人的建议。',
      '创造力旺盛的一天，你的想法独特而吸引人。适合进行艺术创作或策划活动。',
      '今日社交运极佳，你将成为人群中的焦点。但请注意不要太强势。',
    ],
    love: [
      '今日爱情运势上升，单身者今天魅力四射，可能会收到表白。已有伴侣的你，今天可以给爱人一个惊喜。',
      '今天可能会因为太强势而让伴侣感到压力。建议温柔一些，多倾听对方的心声。',
      '桃花旺盛的一天，你的热情和自信吸引着周围的人。保持这份魅力，会遇到心仪的对象。',
    ],
    career: [
      '今日工作运势极佳，你的能力得到领导的认可。可能会被委以重任或得到晋升的机会。',
      '今天可能会有些过于自信，导致忽略了一些细节。建议虚心接受同事的反馈。',
      '你的领导力今天得到充分发挥，适合主持会议或带领团队完成重要项目。',
    ],
    money: [
      '今日财运不错，可能会有意外之财或投资回报。但请理性对待，不要过于冒险。',
      '今天可能会有一些大额支出，比如购买奢侈品或娱乐消费。建议量力而行。',
      '财运上升的一天，你的赚钱能力得到提升。可以尝试一些新的理财方式。',
    ],
    health: [
      '今日身体状况良好，精力充沛，适合进行各种运动。',
      '可能会有心脏或血压方面的小问题，建议注意休息，避免过度劳累。',
      '健康运势上升，适合进行户外活动或旅行。但请注意防晒。',
    ],
  },
  '处女座': {
    overall: [
      '今日水星能量活跃，你的分析能力出色。适合处理需要细心和耐心的工作。',
      '今天的你可能会有些挑剔，对自己和他人要求过高。建议放松一些，不要太追求完美。',
      '工作运势上升，今天适合整理思路、规划未来。你的条理性让你事半功倍。',
      '今日健康运势上升，适合关注自己的身体健康，开始一些好的习惯。',
    ],
    love: [
      '今日爱情运势平稳，单身者今天可能会遇到一个认真负责的对象。已有伴侣的你，今天与爱人的感情稳定。',
      '今天可能会因为太挑剔而让伴侣感到压力。建议接受对方的不完美。',
      '桃花暗藏的一天，你对细节的关注吸引着某些人。但请注意不要过于挑剔。',
    ],
    career: [
      '今日工作效率极高，你的细心和专业得到客户的认可。可能会有重要的项目交付。',
      '今天可能会有些工作压力，建议合理安排时间，不要把自己逼得太紧。',
      '你的分析能力今天特别出色，适合处理复杂的数据或策划方案。',
    ],
    money: [
      '今日财运不错，你的理财能力得到发挥。可以进行一些稳健的投资。',
      '今天可能会有一些节省开支的好方法。可以记录一下自己的花费，找到优化的空间。',
      '财运平稳的一天，没有大起大落。建议把注意力放在如何增加收入上。',
    ],
    health: [
      '今日身体状况良好，但要注意肠胃健康。避免吃太多加工食品。',
      '可能会有些紧张或焦虑，建议做一些放松的活动，比如瑜伽或冥想。',
      '健康运势上升，适合进行体检或开始一些健康的生活习惯。',
    ],
  },
  '天秤座': {
    overall: [
      '今日金星能量充沛，你的魅力和气质格外吸引人。适合社交、谈判或处理人际关系。',
      '今天的你可能会有些犹豫不决，建议果断一些，相信自己的判断。',
      '艺术细胞活跃的一天，你的审美能力出色，可以尝试一些艺术创作。',
      '今日合作运极佳，适合与他人合作完成重要的项目。',
    ],
    love: [
      '今日爱情运势极佳，单身者今天可能会遇到一个优雅迷人的对象。已有伴侣的你，今天感情升温。',
      '今天可能会因为太在意对方的感受而忽略了自己的需求。建议坦诚表达自己的想法。',
      '桃花旺盛的一天，你的魅力让周围的人心动。保持这份自信，会遇到对的人。',
    ],
    career: [
      '今日工作运势上升，你与同事之间的关系融洽。适合进行需要团队协作的任务。',
      '今天可能会有一些需要做出选择的时刻。建议权衡利弊，做出最适合自己的决定。',
      '你的协调能力今天得到充分发挥，适合处理复杂的人际关系或调解矛盾。',
    ],
    money: [
      '今日财运不错，可能会有一些意外的收入或回报。但请理性对待。',
      '今天可能会有一些花钱的机会，比如购买艺术品或参加社交活动。建议量力而行。',
      '财运上升的一天，你的理财能力得到提升。可以学习一些新的理财知识。',
    ],
    health: [
      '今日身体状况良好，但要注意肾脏健康。多喝水，避免熬夜。',
      '可能会有些皮肤问题，建议注意保湿和防晒。',
      '健康运势上升，适合进行一些美妆或护肤工作。让自己更美丽。',
    ],
  },
  '天蝎座': {
    overall: [
      '今日冥王星能量充沛，你的洞察力特别敏锐。适合处理需要深入分析的事务。',
      '今天的你可能有些神秘，让人难以捉摸。建议适当展现真实的自己。',
      '直觉准确的一天，可以凭借自己的感觉做出重要决定。',
      '今日研究运势上升，适合深入研究某个领域或解决复杂的问题。',
    ],
    love: [
      '今日爱情运势上升，单身者今天可能会遇到一个神秘而有魅力的对象。已有伴侣的你，今天感情升温。',
      '今天可能会因为占有欲太强而让伴侣感到压力。建议给对方一些空间。',
      '桃花暗藏的一天，你的深邃和神秘吸引着某些人。保持真实的自己。',
    ],
    career: [
      '今日工作运势极佳，你的深度和洞察力得到领导的认可。适合处理复杂的项目。',
      '今天可能会有一些需要保密的事务，你的谨慎让你能够胜任。',
      '你的研究能力今天特别出色，适合进行数据分析或策略规划。',
    ],
    money: [
      '今日财运不错，可能会有一些意外之财。但请理性对待，不要过于冒险。',
      '今天可能会有一些投资机会。建议做好充分的调研，不要盲目跟风。',
      '财运上升的一天，你的理财能力得到提升。可以学习一些高深的理财技巧。',
    ],
    health: [
      '今日身体状况良好，但要注意生殖系统健康。',
      '可能会有一些情绪波动，建议做一些让自己放松的事。',
      '健康运势上升，适合进行一些深度的放松活动，比如冥想或瑜伽。',
    ],
  },
  '射手座': {
    overall: [
      '今日木星能量充沛，你充满乐观和冒险精神。适合尝试新事物或拓展视野。',
      '今天的你可能会有些粗心大意，建议注意细节，避免出错。',
      '旅行运势上升，今天适合计划一次旅行或探索新的领域。',
      '今日学习运势极佳，适合学习新的知识或技能。',
    ],
    love: [
      '今日爱情运势上升，单身者今天可能会遇到一个乐观开朗的对象。已有伴侣的你，今天可以一起尝试新活动。',
      '今天可能会因为太爱自由而让伴侣感到不安。建议给对方一些安全感。',
      '桃花旺盛的一天，你的热情和幽默吸引着周围的人。保持这份魅力。',
    ],
    career: [
      '今日工作运势上升，你的乐观和积极感染着团队。适合进行需要创意的工作。',
      '今天可能会有一些新的机会或挑战。建议保持开放的心态，敢于尝试。',
      '你的视野今天特别开阔，适合进行战略规划或拓展业务。',
    ],
    money: [
      '今日财运不错，可能会有一些意外之财或投资回报。但请理性对待。',
      '今天可能会有一些花钱的机会，比如旅行或学习。建议量力而行。',
      '财运上升的一天，你可以尝试一些新的理财方式，但要做好风险评估。',
    ],
    health: [
      '今日身体状况良好，精力充沛，适合进行户外活动或运动。',
      '可能会有一些肝脏或臀部的小问题，建议注意休息和饮食。',
      '健康运势上升，适合进行一次旅行或户外探险。',
    ],
  },
  '摩羯座': {
    overall: [
      '今日土星能量稳定，你的责任感强，做事踏实。适合处理需要耐心的工作。',
      '今天的你可能有些严肃，建议放松一些，享受生活的乐趣。',
      '事业运势上升，今天适合规划未来或做出重要的决定。',
      '今日目标明确，你的努力会得到回报。',
    ],
    love: [
      '今日爱情运势平稳，单身者今天可能会遇到一个稳重踏实的对象。已有伴侣的你，今天感情稳定。',
      '今天可能会因为工作太忙而忽略了伴侣的感受。建议抽出时间陪伴对方。',
      '桃花暗藏的一天，你的稳重和可靠吸引着某些人。保持这份品质。',
    ],
    career: [
      '今日工作运势极佳，你的努力得到领导的认可。可能会被委以重任或得到晋升。',
      '今天可能会有一些重要的决策或会议。建议做好充分的准备。',
      '你的专业能力今天得到充分发挥，适合处理复杂的项目。',
    ],
    money: [
      '今日财运不错，你的理财能力得到发挥。可以进行一些稳健的投资。',
      '今天可能会有一些节省开支的好方法。建议制定一个预算计划。',
      '财运上升的一天，你的收入可能会有所增加。但请理性消费。',
    ],
    health: [
      '今日身体状况良好，但要注意骨骼和关节健康。',
      '可能会有一些压力或疲劳，建议适当放松，不要把自己逼得太紧。',
      '健康运势上升，适合进行一些有规律的运动或饮食习惯。',
    ],
  },
  '水瓶座': {
    overall: [
      '今日天王星能量活跃，你的创意十足。适合进行创新或尝试新事物。',
      '今天的你可能有些叛逆，建议在表达自己的想法时注意方式。',
      '社交运势上升，今天适合参加聚会或拓展人脉。',
      '今日独立自主，你的独特见解会得到他人的认可。',
    ],
    love: [
      '今日爱情运势上升，单身者今天可能会遇到一个独立而有趣的对象。已有伴侣的你，今天需要给对方一些空间。',
      '今天可能会因为太独立而让伴侣感到疏远。建议多表达一些情感。',
      '桃花旺盛的一天，你的独特魅力吸引着周围的人。保持真实的自己。',
    ],
    career: [
      '今日工作运势上升，你的创意和想法得到团队的认可。适合进行头脑风暴。',
      '今天可能会有一些新的项目或机会。建议保持开放的心态，敢于尝试。',
      '你的创新能力今天得到充分发挥，适合进行技术或艺术创作。',
    ],
    money: [
      '今日财运一般，建议保守理财，不要进行高风险的投资。',
      '今天可能会有一些意外支出。建议理性消费，避免冲动购物。',
      '财运上升的一天，你可能会有一些新的赚钱机会。但请做好调研。',
    ],
    health: [
      '今日身体状况良好，但要注意血液循环。多运动，保持良好的作息。',
      '可能会有一些神经紧张或焦虑，建议做一些放松的活动。',
      '健康运势上升，适合尝试一些新的运动或健康习惯。',
    ],
  },
  '双鱼座': {
    overall: [
      '今日海王星能量充沛，你的直觉和想象力特别活跃。适合进行艺术创作或处理情感事务。',
      '今天的你可能有些敏感，容易被外界的事情影响。建议保持内心的平静。',
      '创意十足的一天，你的艺术细胞活跃，可以尝试一些创作。',
      '今日直觉准确，可以凭借自己的感觉做出重要决定。',
    ],
    love: [
      '今日爱情运势极佳，单身者今天可能会遇到一个浪漫温柔的对象。已有伴侣的你，今天感情升温。',
      '今天可能会因为太敏感而误解伴侣的意图。建议直接沟通，不要猜测。',
      '桃花旺盛的一天，你的温柔和善良吸引着周围的人。保持这份品质。',
    ],
    career: [
      '今日工作运势平稳，你的创造力和想象力得到发挥。适合进行需要创意的任务。',
      '今天可能会有一些情绪化，影响工作效率。建议保持冷静，理性处理问题。',
      '你的艺术细胞今天得到充分发挥，适合进行创作或设计工作。',
    ],
    money: [
      '今日财运一般，建议保守理财。不要被一时的冲动影响财务决策。',
      '今天可能会有一些意外支出。建议理性消费，避免购买不必要的东西。',
      '财运上升的一天，你可能会有一些艺术或创意方面的收入。',
    ],
    health: [
      '今日身体状况良好，但要注意脚部健康。多泡脚，促进血液循环。',
      '可能会有一些情绪波动，建议做一些让自己放松的事，比如听音乐或泡澡。',
      '健康运势上升，适合进行一些艺术或灵性活动，让身心得到放松。',
    ],
  },
}

// 星座特质影响运势的调整因子
const ZODIAC_MODIFIERS: Record<string, { love: number; career: number; money: number; health: number; overall: number }> = {
  '白羊座': { overall: 1, love: 0, career: 1, money: 0, health: 1 },
  '金牛座': { overall: 0, love: 1, career: 0, money: 1, health: 0 },
  '双子座': { overall: 0, love: 0, career: 1, money: -1, health: 0 },
  '巨蟹座': { overall: 0, love: 1, career: 0, money: 0, health: 0 },
  '狮子座': { overall: 1, love: 1, career: 1, money: 0, health: 0 },
  '处女座': { overall: 0, love: -1, career: 1, money: 0, health: 0 },
  '天秤座': { overall: 0, love: 1, career: 0, money: 0, health: 0 },
  '天蝎座': { overall: 0, love: 0, career: 1, money: 0, health: -1 },
  '射手座': { overall: 1, love: 0, career: 0, money: 0, health: 1 },
  '摩羯座': { overall: 0, love: -1, career: 1, money: 1, health: 0 },
  '水瓶座': { overall: 0, love: 0, career: 0, money: -1, health: 0 },
  '双鱼座': { overall: 0, love: 1, career: -1, money: -1, health: 0 },
}

// 基于文本内容判断星级（确保星级与文案一致）
function analyzeTextRating(text: string, baseRating: number, zodiacMod: number): number {
  let rating = baseRating + zodiacMod
  
  // 积极关键词
  const positiveKeywords = ['极佳', '旺盛', '极佳', '上升', '顺利', '强劲', '稳定', '极佳', '出色', '极佳', '好运', '美丽', '幸福', '收获']
  // 平淡关键词
  const neutralKeywords = ['平稳', '一般', '不错', '可以', '稳定', '平稳', '普通']
  // 消极关键词
  const negativeKeywords = ['瓶颈', '挑战', '压力', '注意', '避免', '小心', '不安', '紧张', '不佳', '低落', '不足']
  
  let positiveCount = 0
  let negativeCount = 0
  
  for (const kw of positiveKeywords) {
    if (text.includes(kw)) positiveCount++
  }
  for (const kw of negativeKeywords) {
    if (text.includes(kw)) negativeCount++
  }
  
  if (positiveCount > negativeCount) rating = Math.min(5, rating + 1)
  else if (negativeCount > positiveCount) rating = Math.max(1, rating - 1)
  
  return Math.max(1, Math.min(5, rating))
}

function generateHoroscope(signName: string, date: Date) {
  const templates = HOROSCOPE_TEMPLATES[signName]
  if (!templates) {
    return null
  }
  
  const modifiers = ZODIAC_MODIFIERS[signName] || { love: 0, career: 0, money: 0, health: 0, overall: 0 }
  
  // 基于日期生成稳定的伪随机种子
  const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  const seed = signName.charCodeAt(0) * 1000 + signName.charCodeAt(1) * 100 + dayKey.split('-').reduce((a, b) => a + parseInt(b), 0)
  
  // 选择今日运势文案
  const overallIdx = seed % templates.overall.length
  const loveIdx = seed % templates.love.length
  const careerIdx = seed % templates.career.length
  const moneyIdx = seed % templates.money.length
  const healthIdx = seed % templates.health.length
  
  const overallText = templates.overall[overallIdx]
  const loveText = templates.love[loveIdx]
  const careerText = templates.career[careerIdx]
  const moneyText = templates.money[moneyIdx]
  const healthText = templates.health[healthIdx]
  
  // 基于文案内容计算星级（确保星级与文案一致）
  const overallRating = analyzeTextRating(overallText, 3, modifiers.overall)
  const loveRating = analyzeTextRating(loveText, 3, modifiers.love)
  const careerRating = analyzeTextRating(careerText, 3, modifiers.career)
  const moneyRating = analyzeTextRating(moneyText, 3, modifiers.money)
  const healthRating = analyzeTextRating(healthText, 3, modifiers.health)
  
  // 幸运信息
  const colors = ['红色', '蓝色', '绿色', '黄色', '紫色', '白色', '粉色', '橙色', '金色', '银色']
  const directions = ['东', '南', '西', '北', '东南', '东北', '西南', '西北']
  const foods = ['苹果', '葡萄', '西瓜', '草莓', '蓝莓', '芒果', '橙子', '柠檬', '猕猴桃', '樱桃']
  const activities = ['阅读', '冥想', '运动', '听音乐', '散步', '瑜伽', '写日记', '烹饪', '园艺', '摄影']
  
  const lucky = {
    number: ((seed * 7) % 99) + 1,
    color: colors[seed % colors.length],
    direction: directions[seed % directions.length],
    food: foods[(seed * 3) % foods.length],
    activity: activities[(seed * 5) % activities.length],
  }
  
  // 今日建议
  const advice = generateAdvice(overallRating, loveRating, careerRating, moneyRating, healthRating)
  
  return {
    fortunes: [
      { aspect: '综合运势', level: overallRating, desc: overallText },
      { aspect: '爱情运势', level: loveRating, desc: loveText },
      { aspect: '事业运势', level: careerRating, desc: careerText },
      { aspect: '财运运势', level: moneyRating, desc: moneyText },
      { aspect: '健康运势', level: healthRating, desc: healthText },
    ],
    lucky,
    advice,
  }
}

function generateAdvice(overall: number, love: number, career: number, money: number, health: number): string {
  const avg = (overall + love + career + money + health) / 5
  
  if (avg >= 4) {
    return '今日运势极佳，是行动的好日子！把握机会，主动出击。但也要注意不要过于冲动，三思而后行会带来更好的结果。'
  } else if (avg >= 3) {
    return '今日运势平稳，没有大起大落。保持平常心，按部就班地完成手头的工作。稳中求进，是今日的关键词。'
  } else {
    return '今日运势偏低，建议低调行事。避免做出重大决定，多花时间反思和调整。给自己一些耐心，明天会更好。'
  }
}

export default function HoroscopePage() {
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [result, setResult] = useState<any>(null)
  const [today, setToday] = useState('')

  useEffect(() => {
    const now = new Date()
    setToday(`${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const m = parseInt(month)
    const d = parseInt(day)
    
    if (!m || !d || m < 1 || m > 12 || d < 1 || d > 31) {
      return
    }
    
    const sign = getZodiacSign(m, d)
    const horoscope = generateHoroscope(sign.name, new Date())
    
    setResult({ sign, horoscope, birthMonth: m, birthDay: d })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* 导航栏 */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-lg">
              命
            </div>
            <span className="text-amber-400 font-bold text-xl tracking-wider">命理大师</span>
          </Link>
          <Link href="/" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
            ← 返回首页
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* 标题区 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 mb-4">
            星座运势
          </h1>
          <p className="text-slate-400 text-lg">探索十二星座的每日运势指引 · {today}</p>
        </div>

        {/* 表单卡片 */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">选择出生日期</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs mb-1">月份</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    placeholder="1-12"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 text-center placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">日期</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="1-31"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    required
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 text-center placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              查看今日运势
            </button>
          </form>

          {/* 结果展示 */}
          {result && (
            <div className="mt-8 space-y-6">
              {/* 星座信息 */}
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-2xl border border-amber-500/30 p-8 text-center">
                <div className="text-6xl mb-4">{result.sign.icon}</div>
                <h2 className="text-2xl font-bold text-amber-400 mb-2">{result.sign.name}</h2>
                <p className="text-slate-400">{result.sign.date} · {result.sign.element}象星座 · 守护星 {result.sign.planet}</p>
                <p className="text-slate-500 mt-2">{result.sign.traits}</p>
              </div>

              {/* 运势详情 */}
              <div className="grid gap-4">
                {result.horoscope.fortunes.map((f: any, i: number) => (
                  <div key={i} className="bg-slate-900/50 rounded-xl p-5 border-l-4 border-amber-500">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-amber-400 font-bold text-lg">{f.aspect}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <span key={j} className={`text-xl ${j < f.level ? 'text-amber-400' : 'text-slate-600'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* 今日建议 */}
              <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl p-5 border border-amber-500/30">
                <h4 className="text-amber-400 font-bold mb-2 flex items-center gap-2">
                  <span>💡</span>
                  <span>今日建议</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">{result.horoscope.advice}</p>
              </div>

              {/* 幸运信息 */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 border border-amber-500/20">
                <h4 className="text-amber-400 font-bold text-center mb-4">✨ 今日幸运</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                  <div>
                    <div className="text-slate-500 text-xs mb-1">幸运数字</div>
                    <div className="text-2xl font-bold text-amber-400">{result.horoscope.lucky.number}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs mb-1">幸运颜色</div>
                    <div className="text-2xl font-bold text-amber-400">{result.horoscope.lucky.color}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs mb-1">吉利方位</div>
                    <div className="text-2xl font-bold text-amber-400">{result.horoscope.lucky.direction}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs mb-1">幸运食物</div>
                    <div className="text-2xl font-bold text-amber-400">{result.horoscope.lucky.food}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs mb-1">适宜活动</div>
                    <div className="text-2xl font-bold text-amber-400">{result.horoscope.lucky.activity}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 星座列表 */}
        <div>
          <h2 className="text-center text-2xl font-bold text-amber-400 mb-6">十二星座</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ZODIAC_SIGNS.map((sign) => (
              <div
                key={sign.name}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                onClick={() => {
                  setMonth(sign.startMonth.toString())
                  setDay(sign.startDay.toString())
                }}
              >
                <div className="text-3xl mb-2">{sign.icon}</div>
                <div className="text-slate-200 font-medium">{sign.name}</div>
                <div className="text-slate-500 text-xs">{sign.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
