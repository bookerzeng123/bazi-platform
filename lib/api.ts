/**
 * AI API Call (China-accessible version)
 * Supports: SiliconFlow / ZhipuAI / Groq (overseas)
 */

const SF_API_KEY = process.env.SF_API_KEY || ''
const SF_BASE_URL = 'https://api.siliconflow.cn/v1'
const SF_MODEL = 'Qwen/Qwen2.5-72B-Instruct'

const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY || ''
const ZHIPU_BASE_URL = 'https://open.bigmodel.cn/api/paas/v4'

export async function callSiliconFlow(prompt: string, apiKey?: string): Promise<string> {
  const key = apiKey || SF_API_KEY
  if (!key) throw new Error('NO_API_KEY')

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
          content: 'You are a master of Chinese metaphysics — the Four Pillars of Destiny (Bazi), the I Ching, Feng Shui, and the classical texts of the Yuan Hai Zi Ping, the Di Tian Sui, and the Qiong Tong Bao Jian. You speak with the gravitas of a forty-year practitioner, but in the precise, reflective language of the modern reader. Your insights are practical, grounded, and never fatalistic. Respond only in English.'
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
    throw new Error(`SiliconFlow API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || 'The Oracle is silent for now. Please try again.'
}

export async function callZhipu(prompt: string, apiKey?: string): Promise<string> {
  const key = apiKey || ZHIPU_API_KEY
  if (!key) throw new Error('NO_API_KEY')

  const response = await fetch(`${ZHIPU_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'glm-4-flash',
      messages: [
        { role: 'system', content: 'You are a master of Chinese metaphysics. Speak with precision and wisdom. Respond only in English.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  })

  if (!response.ok) {
    throw new Error(`Zhipu AI API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || 'The Oracle is silent for now.'
}

export async function callAI(prompt: string): Promise<{ text: string; provider: string }> {
  if (SF_API_KEY) {
    try {
      const text = await callSiliconFlow(prompt)
      return { text, provider: 'SiliconFlow' }
    } catch (e: any) {
      if (e.message === 'NO_API_KEY') throw e
    }
  }

  if (ZHIPU_API_KEY) {
    try {
      const text = await callZhipu(prompt)
      return { text, provider: 'ZhipuAI' }
    } catch (e: any) {
      if (e.message === 'NO_API_KEY') throw e
    }
  }

  throw new Error('NO_API_KEY')
}
