import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* 导航栏 */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-lg shadow-lg shadow-amber-500/20">
              命
            </div>
            <span className="text-amber-400 font-bold text-xl tracking-wider">命理大师</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-amber-400 font-medium">首页</Link>
            <Link href="/consult" className="text-slate-300 hover:text-amber-400 transition-colors">八字排盘</Link>
            <Link href="/compass" className="text-slate-300 hover:text-amber-400 transition-colors">风水罗盘</Link>
            <Link href="/horoscope" className="text-slate-300 hover:text-amber-400 transition-colors">星座运势</Link>
            <Link href="/divination" className="text-slate-300 hover:text-amber-400 transition-colors">六爻占卜</Link>
          </div>
          <Link href="/consult" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold px-5 py-2 rounded-lg transition-all transform hover:scale-105 text-sm">
            立即测算
          </Link>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* 背景光效 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"/>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}/>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}/>
          {/* 祥云装饰 */}
          <div className="absolute top-10 right-10 text-amber-500/10 text-9xl font-serif">☯</div>
          <div className="absolute bottom-10 left-10 text-amber-500/10 text-9xl font-serif">☰</div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-8">
            <span className="text-amber-400">✨</span>
            <span className="text-amber-400 text-sm font-medium">传承千年东方智慧</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 leading-tight">
            探索<span className="text-amber-400">命运</span>的奥秘
          </h1>
          
          <p className="text-slate-400 text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            专业八字排盘 · 精准命理分析 · AI智能解读
          </p>

          {/* 数据统计 */}
          <div className="flex justify-center gap-12 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">50万+</div>
              <div className="text-slate-500 text-sm">用户信赖</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">98%</div>
              <div className="text-slate-500 text-sm">准确率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">4.9</div>
              <div className="text-slate-500 text-sm">用户评分</div>
            </div>
          </div>

          <Link href="/consult" className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-bold text-lg px-10 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-amber-500/30">
            <span>开始八字排盘</span>
            <span className="text-xl">→</span>
          </Link>
        </div>
      </section>

      {/* 服务项目 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-500/10 text-amber-400 text-sm font-medium px-4 py-1 rounded-full mb-4">我们的服务</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-4">专业命理服务</h2>
          <p className="text-slate-400 max-w-xl mx-auto">融合传统智慧与现代科技，为您提供精准的命理分析</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/consult" className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-amber-500/50 p-6 transition-all hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">☯</div>
            <h3 className="text-xl font-bold text-slate-200 mb-2">八字排盘</h3>
            <p className="text-slate-400 text-sm mb-4">根据生辰八字，分析您的性格、事业、财运、姻缘等人生运势</p>
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-bold">$5.99</span>
              <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">热门</span>
            </div>
          </Link>

          <Link href="/compass" className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-amber-500/50 p-6 transition-all hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🧭</div>
            <h3 className="text-xl font-bold text-slate-200 mb-2">风水罗盘</h3>
            <p className="text-slate-400 text-sm mb-4">专业电子罗盘，分析房屋方位吉凶，提供风水调理建议</p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-bold">免费</span>
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">新功能</span>
            </div>
          </Link>

          <Link href="/horoscope" className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-amber-500/50 p-6 transition-all hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">⭐</div>
            <h3 className="text-xl font-bold text-slate-200 mb-2">星座运势</h3>
            <p className="text-slate-400 text-sm mb-4">每日、每周、每月星座运势预测，了解星象对您的影响</p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-bold">免费</span>
            </div>
          </Link>

          <Link href="/divination" className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-amber-500/50 p-6 transition-all hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🔮</div>
            <h3 className="text-xl font-bold text-slate-200 mb-2">六爻占卜</h3>
            <p className="text-slate-400 text-sm mb-4">在线摇卦，梅花易数推演，解答您心中的疑惑</p>
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-bold">$3.99</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 特色优势 */}
      <section className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-500/10 text-amber-400 text-sm font-medium px-4 py-1 rounded-full mb-4">为什么选择我们</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-4">专业值得信赖</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📜', title: '古法传承', desc: '基于《渊海子平》《滴天髓》等经典命理著作，传承千年智慧' },
              { icon: '🎯', title: '精准算法', desc: '采用 lunar-javascript 库进行农历转换，确保排盘准确无误' },
              { icon: '🤖', title: 'AI 智能解读', desc: '结合大语言模型，提供专业、个性化的命理分析' },
              { icon: '🔒', title: '隐私保护', desc: '严格保护用户隐私，所有数据加密存储' },
              { icon: '⚡', title: '即时响应', desc: '秒级排盘，即时获取详细的命理分析报告' },
              { icon: '💰', title: '价格透明', desc: '明码标价，无隐藏费用，支持 PayPal 安全支付' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700 hover:border-amber-500/30 transition-colors">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="text-slate-200 font-bold mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold">命</div>
                <span className="text-amber-400 font-bold text-xl">命理大师</span>
              </div>
              <p className="text-slate-500 text-sm">传承东方智慧，服务现代生活。我们致力于将传统命理学与现代科技相结合，为用户提供专业、准确的命理分析服务。</p>
            </div>
            <div>
              <h4 className="text-slate-300 font-bold mb-3">服务项目</h4>
              <ul className="space-y-2">
                <li><Link href="/consult" className="text-slate-500 hover:text-amber-400 transition-colors text-sm">八字排盘</Link></li>
                <li><Link href="/compass" className="text-slate-500 hover:text-amber-400 transition-colors text-sm">风水罗盘</Link></li>
                <li><Link href="/horoscope" className="text-slate-500 hover:text-amber-400 transition-colors text-sm">星座运势</Link></li>
                <li><Link href="/divination" className="text-slate-500 hover:text-amber-400 transition-colors text-sm">六爻占卜</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-300 font-bold mb-3">关于我们</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-500 hover:text-amber-400 transition-colors text-sm">公司介绍</Link></li>
                <li><Link href="#" className="text-slate-500 hover:text-amber-400 transition-colors text-sm">服务条款</Link></li>
                <li><Link href="#" className="text-slate-500 hover:text-amber-400 transition-colors text-sm">隐私政策</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-300 font-bold mb-3">联系方式</h4>
              <ul className="space-y-2">
                <li className="text-slate-500 text-sm">邮箱: support@astromaster.com</li>
                <li className="text-slate-500 text-sm">Telegram: @astromaster</li>
                <li className="text-slate-500 text-sm">微信: AstroMasterOfficial</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-600 text-sm">© 2026 命理大师 AstroMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
