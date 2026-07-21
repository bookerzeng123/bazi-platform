# LemonSqueezy 收款设置指南（10分钟完成）

## 为什么选 LemonSqueezy

- ✅ **个人可入驻**（不需要公司）
- ✅ **代收税**（自动算 VAT/sales tax）
- ✅ **支持 PayPal/月度打款**（结算到你的 PayPal 或银行）
- ✅ **不收月费**（只抽 5% + $0.50/笔）
- ✅ **中文后台**（自动翻译）
- ✅ **支持一次性付款和订阅**
- ✅ **几分钟开通**

## 注册步骤

### 1. 注册（5分钟）
1. 打开 https://www.lemonsqueezy.com
2. 点 "Start selling"
3. 用邮箱注册（推荐 Gmail 或国内邮箱都行）
4. 邮箱验证 → 完善 profile

### 2. 收款信息（5分钟）
1. 进入 Dashboard → Settings → Payouts
2. 选择 "PayPal" 绑定（最简单）
3. 输入你的 PayPal 邮箱
4. 完成验证（PayPal 会扣 $0.01 测试）

### 3. 创建产品（5分钟）
1. Dashboard → Products → New Product
2. 填写：
   - **Name**: Aether · Deep Reading
   - **Description**: A 1,800-word analysis of your Four Pillars birth chart
   - **Price**: $4.99 USD
   - **Type**: One-time payment
3. 创建后系统给你一个 checkout URL，类似：
   ```
   https://aether-readings.lemonsqueezy.com/checkout/buy/xxxx-xxxx-xxxx
   ```
4. **复制这个 URL**（下一步要用）

### 4. 配置到网站
打开 `app/consult/page.tsx`，找到这行：
```ts
href="https://aether-readings.lemonsqueezy.com/checkout/buy/REPLACE_WITH_YOUR_PRODUCT_ID"
```
把 `REPLACE_WITH_YOUR_PRODUCT_ID` 替换成你的真实 URL，然后：
1. 保存文件
2. 推送到 GitHub
3. Railway 自动部署

## 提现方式

- 累计满 $50 后自动打款（每周一次）
- 打到 PayPal 后你可以：
  - 直接消费
  - 转账到国内银行卡（通过 Payoneer / 万里汇 WorldFirst）

## 万里汇（WorldFirst）回国路径

如果你要把 PayPal 里的美元换成人民币到中国银行卡：
- **费率**：0.3% - 0.4%（非常便宜）
- **不占** 5 万美元外汇额度
- **到账**：1-2 个工作日
- **网址**：https://www.worldfirst.com

## 收款测试

第一次跑通流程：
1. 在 LemonSqueezy 创建一个 $0.99 测试产品
2. 自己用 PayPal 付一次（会立即扣 $0.99 测试）
3. 验证网站按钮跳转到正确的 checkout 页
4. 测试成功后改回 $4.99 正式产品

## 注意事项

⚠️ **不要在网站说明里写 "guarantee" / "guaranteed"**（LemonSqueezy 政策）
⚠️ **不要用 "fortune telling" / "psychic"** （会被风控）
✅ 用 "insight" / "analysis" / "personalized reading"

## 当前占位符

我的代码里现在是：
```
https://aether-readings.lemonsqueezy.com/checkout/buy/REPLACE_WITH_YOUR_PRODUCT_ID
```

你注册后，把 `REPLACE_WITH_YOUR_PRODUCT_ID` 换成你的真实路径即可。
