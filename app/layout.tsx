import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '命理大师 - 八字命盘解读',
  description: '专业八字命理分析，大运流年预测，人生指引',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
