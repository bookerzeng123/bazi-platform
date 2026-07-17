/**
 * AI API 调用（国内可用版本）
 * 支持：硅基流动 / 智谱AI / Groq（海外）
 * 统一 OpenAI 兼容格式
 */

import { NextRequest } from 'next/server'

// ================== 配置区 ==================
// 选择使用哪个 API（取消注释即可切换）

// 方案一：硅基流动（国内推荐，最便宜）
const SF_API_KEY = process.env.SF_API_KEY || ''
const SF_BASE_URL = 'https://api.siliconflow.cn/v1'
const SF_MODEL = 'Qwen/Qwen2.5-72B-Instruct'  // Qwen2.5-72B，性价比最高

// 方案二：智谱 AI（免费额度）
const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY || ''
const ZHIPU_BASE_URL = 'https://open.bigmodel.cn/api/paas/v4'

// 方案三：Groq（海外用户，速度快）
// const GROQ_API_KEY = process.env.GROQ_API_KEY || ''
// const GROQ_BASE_URL = 'https://api.groq.com/openai/v1'
// const GROQ_MODEL = 'llama-3.3-70b-versatile'

// ================== 硅基流动 ==================
export async function callSiliconFlow(prompt: string, apiKey?: string): Promise<string> {
  const key = apiKey || SF_API_KEY
  if (!key) {
    throw new Error('缺少硅基流动 API Key。请在硅基流动（siliconflow.cn）注册并获取 Key，填入环境变量 SF_API_KEY')
  }

  const response = await fetch(`${SF_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: SF_MODEL,
      messages: [
        {
          role: 'system',
          content: '你是一位拥有40年经验的专业中文八字命理大师，精通《渊海子平》《滴天髓》《穷通宝鉴》。说话沉稳专业，引用古语，结合现代生活给出建议。请用中文回答。'
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(`硅基流动 API 错误: ${response.status} - ${JSON.stringify(error)}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || '抱歉，暂时无法生成解读，请稍后再试。'
}

// ================== 智谱 AI ==================
export async function callZhipu(prompt: string, apiKey?: string): Promise<string> {
  const key = apiKey || ZHIPU_API_KEY
  if (!key) {
    throw new Error('缺少智谱 AI API Key。请在 bigmodel.cn 注册并获取 Key，填入环境变量 ZHIPU_API_KEY')
  }

  const response = await fetch(`${ZHIPU_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'glm-4-flash',    // 免费模型
      messages: [
        { role: 'system', content: '你是一位拥有40年经验的专业中文八字命理大师。请用中文回答。' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(`智谱 AI API 错误: ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || '抱歉，暂时无法生成解读。'
}

// ================== Groq（海外用户用） ==================
export async function callGroq(prompt: string, apiKey?: string): Promise<string> {
  // Groq 当前在国内不可用，如需使用请通过 VPN
  throw new Error('Groq 在国内无法访问。请切换到硅基流动（siliconflow.cn）或智谱 AI（bigmodel.cn）')
}

// ================== 统一入口 ==================
/**
 * 自动选择可用的 API
 * 优先：硅基流动 > 智谱 > 本地分析
 */
export async function callAI(prompt: string): Promise<{ text: string; provider: string }> {
  // 优先使用硅基流动
  if (SF_API_KEY) {
    try {
      const text = await callSiliconFlow(prompt)
      return { text, provider: '硅基流动 SiliconFlow' }
    } catch (e) {
      console.warn('硅基流动调用失败，尝试智谱...', e)
    }
  }

  // 其次使用智谱
  if (ZHIPU_API_KEY) {
    try {
      const text = await callZhipu(prompt)
      return { text, provider: '智谱 AI' }
    } catch (e) {
      console.warn('智谱调用失败，使用本地分析...', e)
    }
  }

  // 没有 API Key，返回提示
  throw new Error('NO_API_KEY')
}
