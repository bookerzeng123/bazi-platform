import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '命理大师 - 专业八字排盘与命理分析',
  description: '传承千年东方智慧，提供八字排盘、风水罗盘、星座运势、六爻占卜等专业命理服务。AI智能解读，精准分析您的事业、财运、姻缘、健康运势。',
  keywords: '八字排盘,命理分析,风水罗盘,星座运势,六爻占卜,八字算命,命理大师,生辰八字,大运流年',
  authors: [{ name: '命理大师' }],
  creator: '命理大师',
  publisher: '命理大师',
  robots: 'index, follow',
  openGraph: {
    title: '命理大师 - 专业八字排盘与命理分析',
    description: '传承千年东方智慧，提供专业八字排盘、风水罗盘、星座运势、六爻占卜服务',
    type: 'website',
    locale: 'zh_CN',
    siteName: '命理大师',
  },
  twitter: {
    card: 'summary_large_image',
    title: '命理大师 - 专业八字排盘与命理分析',
    description: '传承千年东方智慧，提供专业八字排盘、风水罗盘、星座运势、六爻占卜服务',
  },
  alternates: {
    canonical: 'https://bazi-platform-production.up.railway.app',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#8B0000',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  )
}
