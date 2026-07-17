/**
 * 知识库管理（简化版 RAG）
 * 知识库放在 data/knowledge_base/*.md
 * 检索时读取相关文件作为上下文
 */

import fs from 'fs'
import path from 'path'

// 知识库目录
const KB_DIR = path.join(process.cwd(), 'data', 'knowledge_base')

// 知识库文件索引
const KB_INDEX: Record<string, string[]> = {
  bazi: [
    '基础/五行.txt',
    '基础/天干地支.txt',
    '基础/十神.txt',
    '基础/藏干.txt',
    '格局/日主强弱.txt',
    '格局/用神忌神.txt',
    '大运/大运推算.txt',
    '流年/流年分析.txt',
    '案例/男命案例.txt',
    '案例/女命案例.txt',
  ],
  fengshui: [
    '基础/八卦.txt',
    '基础/五行方位.txt',
    '阳宅/大门.txt',
    '阳宅/灶位.txt',
    '阳宅/卧床.txt',
  ],
  zhouyi: [
    '基础/六爻起卦.txt',
    '卦辞/乾为天.txt',
    '卦辞/坤为地.txt',
  ],
  xingzuo: [
    '基础/十二星座.txt',
    '基础/十二宫位.txt',
    '行星/太阳月亮.txt',
  ],
}

// 加载知识库片段（按关键词匹配）
export function loadKnowledgeContext(topic: string, keywords: string[]): string {
  const files = KB_INDEX[topic] || []
  const contexts: string[] = []
  
  for (const file of files) {
    try {
      const filePath = path.join(KB_DIR, file)
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8')
        // 简单关键词匹配
        for (const kw of keywords) {
          if (content.includes(kw)) {
            contexts.push(`【${file}】\n${content.substring(0, 500)}`)
            break
          }
        }
      }
    } catch (e) {
      // 文件不存在或读取失败，跳过
    }
  }
  
  return contexts.join('\n\n---\n\n')
}

// 返回所有知识库文件列表（用于展示）
export function listKnowledgeFiles(topic: string): string[] {
  return KB_INDEX[topic] || []
}
