# 八字命理网站平台 - 构建记录

## 任务目标
为用户构建一个面向全球用户的八字命理咨询网站，500元预算内完成。

## 需求确认
- 无编程基础 → 提供完整可部署代码
- 精确到时辰（23:00-01:00细分）→ 算法已支持
- 先做八字板块 → 第一优先级
- 需要模板和框架 → 已提供

## 技术方案
- 排盘算法：公历→农历→天干地支（自实现）
- AI模型：Groq llama-3.3-70b（免费额度）
- 前端框架：Next.js 14
- 托管：Vercel（免费）
- 知识库：文件系统+RAG（简化实现）
- 收款：PayPal.Me（手续费约4%）

## 已完成文件
- lib/lunar.ts - 农历转换核心算法（八字排盘基础）
- lib/bazi.ts - 八字排盘算法（四柱、十神、大运、流年）
- lib/prompt.ts - 命理大师专家Prompt模板
- lib/api.ts - Groq API调用封装
- lib/knowledge.ts - 知识库检索（RAG简化版）
- app/consult/page.tsx - 咨询页面（含表单+结果展示）
- app/page.tsx - 首页（5个板块展示）
- app/api/consult/route.ts - 核心API（排盘+AI解读）
- data/knowledge_base/ - 8个知识库文件（八字核心知识）
- README.md - 完整部署文档
- instructions/部署操作指南.md - 分步操作指南

## 预算分配
- 域名：~$10/年（Cloudflare/Namecheap）
- Vercel：$0（免费版）
- Groq API：$0（免费额度30美元/月）
- PayPal：$0（月费0）
- 合计：~$70/年

## 部署路径
GitHub → Vercel → 自定义域名 → 上线

## 核心原理
八字"训练"本质 = 排盘算法（确定性）+ 知识库（RAG）+ 专家Prompt
无需训练模型，基于开源大模型即可达到专业解读水平。
