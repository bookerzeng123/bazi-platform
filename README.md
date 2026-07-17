# 命理大师 - 部署指南（国内版）

> ⚠️ **重要说明**：GitHub / Vercel / Groq 在国内访问受限。
> 本文档提供国内可用的完整解决方案。

---

## 📋 国内可用方案总览

| 环节 | 国内可用方案 | 网址 |
|------|------------|------|
| AI 模型 | 硅基流动 / 智谱 AI | siliconflow.cn / bigmodel.cn |
| 代码托管 | 码云 Gitee | gitee.com |
| 网站托管 | Vercel + VPN / Railway | vercel.com |
| 域名 DNS | Cloudflare | cloudflare.com |

---

## 第一步：注册硅基流动（AI 模型，5分钟）

> 国内可直接访问，无需 VPN，支持支付宝

1. 打开 https://www.siliconflow.cn
2. 点击"开始使用" → 手机号注册
3. 完成实名认证（国内身份证）
4. 进入控制台 →左侧菜单"API Keys" → 创建新 Key
5. 复制 Key，格式类似 `sk-xxxxxxxx`
6. **充值**（必须）：左侧菜单"充值" → 支付宝充值 ¥10 起

> 💰 价格参考：
> - Qwen2.5-72B：¥0.1/千 Token
> - 一次完整八字解读约消耗 500-800 Token，约 ¥0.05-0.08/次
> - ¥10 可以做 100-200 次解读

---

## 第二步：注册码云 Gitee（代码托管，5分钟）

> 国内版 GitHub，访问流畅，支持同步 GitHub

1. 打开 https://gitee.com（国内可直接访问）
2. 手机号注册账号
3. 登录后，点击右上角 "+" → 新建仓库
4. 填写：
   - 仓库名称：`bazi-platform`
   - 路径：`bazi-platform`
   - 勾选"使用 README 初始化仓库"
5. 点击"创建"

---

## 第三步：本地打包代码发给我

> 由于 GitHub 在国内被墙，我把代码打包好，
> 你只需要把文件发给我，我帮你上传到 Gitee 和 Vercel

代码已经在：`C:\Users\Administrator\bazi-platform\`

把这个文件夹打包发给我，格式任选：
- 压缩成 ZIP 发给我
- 或者直接发给我文件夹路径

---

## 第四步：我帮你完成部署

收到代码后，我会帮你：

1. 上传到 Gitee 仓库
2. 连接到 Vercel 并部署
3. 绑定你的域名
4. 配置好 AI API Key

你只需要提供：
- 你的 Gitee 用户名
- 你的 Vercel 账号（用邮箱注册即可）
- 你的域名

---

## 第五步：购买域名（国内可买）

> 国内可直接购买，支持支付宝

推荐购买渠道：
- **阿里云（万网）**：https://wanwang.aliyun.com
  - 支持支付宝，.com 约 ¥60-80/年
  - 注意：国内域名需要实名认证
  
- **Namecheap（国际）**：https://www.namecheap.com
  - 美元计价，支持支付宝
  - 不需要实名（但解析到国内服务器需备案）

- **Cloudflare Registrar**：https://dash.cloudflare.com
  - .com 约 $10/年，最便宜
  - 需要双币信用卡

---

## 第六步：配置收款（PayPal）

1. 注册 PayPal 账号：https://www.paypal.com
2. 设置 PayPal.Me 收款链接：
   - 登录 PayPal → "收款" → "获取 PayPal.Me 链接"
   - 设置你的用户名，例如 `astromind`
   - 链接格式：`https://paypal.me/你的用户名`

> ⚠️ 注意：PayPal 在国内提现需要绑定银行卡或使用万里汇（WorldFirst）等第三方工具。

---

## 费用总结

| 项目 | 费用 | 说明 |
|------|------|------|
| 硅基流动 API | ¥10（首充）| 约100-200次解读 |
| 域名 | ¥60-80/年 | .com 域名 |
| Gitee | ¥0 | 免费 |
| Vercel | ¥0 | 免费版足够 |
| PayPal | ¥0 | 无月费，4%手续费 |
| **合计** | **约 ¥70-90/年** | |

---

## 知识库扩充

知识库文件在：`data/knowledge_base/`

每当你从网上或书上看到好的命理知识：
1. 整理成文本（.txt 文件）
2. 放入对应子目录
3. 发给我，我帮你更新到网站

知识越多，AI 解读越专业。

---

## 快速操作清单

```
□ 1. 注册 siliconflow.cn → 拿 API Key → 充值 ¥10
□ 2. 注册 gitee.com → 创建仓库
□ 3. 买域名（阿里云/Namecheap）
□ 4. 注册 paypal.com → 设置 PayPal.Me
□ 5. 把代码文件夹路径发给我
□ 6. 我帮你完成上线！
```
