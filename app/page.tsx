import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="logo">
            <div className="logo-icon">☯</div>
            <span className="logo-text">命理大师</span>
          </Link>
          <ul className="nav-links">
            <li><Link href="/">首页</Link></li>
            <li><Link href="/consult">八字排盘</Link></li>
            <li><Link href="/compass">风水罗盘</Link></li>
            <li><Link href="/horoscope">星座运势</Link></li>
            <li><Link href="/divination">六爻占卜</Link></li>
          </ul>
          <Link href="/consult" className="nav-cta">立即测算</Link>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>✨</span>
            <span>传承千年东方智慧</span>
          </div>
          <h1 className="hero-title">
            探索<span>命运</span>的奥秘
          </h1>
          <p className="hero-subtitle">
            专业八字排盘 · 精准命理分析 · AI智能解读
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">50万+</div>
              <div className="stat-label">用户信赖</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">准确率</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9</div>
              <div className="stat-label">用户评分</div>
            </div>
          </div>
          <Link href="/consult" className="hero-cta">
            <span>开始八字排盘</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* 服务项目 */}
      <section className="services">
        <div className="section-header">
          <span className="section-tag">我们的服务</span>
          <h2 className="section-title">专业命理服务</h2>
          <p className="section-desc">融合传统智慧与现代科技，为您提供精准的命理分析</p>
        </div>
        <div className="services-grid">
          <Link href="/consult" className="service-card">
            <div className="service-icon">☯</div>
            <h3 className="service-title">八字排盘</h3>
            <p className="service-desc">根据生辰八字，分析您的性格、事业、财运、姻缘等人生运势</p>
            <div className="service-meta">
              <span className="service-price">$5.99</span>
              <span className="service-tag">热门</span>
            </div>
          </Link>
          <Link href="/compass" className="service-card">
            <div className="service-icon">🧭</div>
            <h3 className="service-title">风水罗盘</h3>
            <p className="service-desc">专业电子罗盘，分析房屋方位吉凶，提供风水调理建议</p>
            <div className="service-meta">
              <span className="service-price">免费</span>
              <span className="service-tag">新功能</span>
            </div>
          </Link>
          <Link href="/horoscope" className="service-card">
            <div className="service-icon">⭐</div>
            <h3 className="service-title">星座运势</h3>
            <p className="service-desc">每日、每周、每月星座运势预测，了解星象对您的影响</p>
            <div className="service-meta">
              <span className="service-price">免费</span>
            </div>
          </Link>
          <Link href="/divination" className="service-card">
            <div className="service-icon">🔮</div>
            <h3 className="service-title">六爻占卜</h3>
            <p className="service-desc">在线摇卦，梅花易数推演，解答您心中的疑惑</p>
            <div className="service-meta">
              <span className="service-price">$3.99</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 特色优势 */}
      <section className="features">
        <div className="features-inner">
          <div className="section-header">
            <span className="section-tag">为什么选择我们</span>
            <h2 className="section-title">专业值得信赖</h2>
          </div>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-box">📜</div>
              <div className="feature-content">
                <h3>古法传承</h3>
                <p>基于《渊海子平》《滴天髓》等经典命理著作，传承千年智慧</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon-box">🎯</div>
              <div className="feature-content">
                <h3>精准算法</h3>
                <p>采用标准农历转换算法，确保排盘准确无误</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon-box">🤖</div>
              <div className="feature-content">
                <h3>AI 智能解读</h3>
                <p>结合大语言模型，提供专业、个性化的命理分析</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon-box">🔒</div>
              <div className="feature-content">
                <h3>隐私保护</h3>
                <p>严格保护用户隐私，所有数据加密存储</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon-box">⚡</div>
              <div className="feature-content">
                <h3>即时响应</h3>
                <p>秒级排盘，即时获取详细的命理分析报告</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon-box">💰</div>
              <div className="feature-content">
                <h3>价格透明</h3>
                <p>明码标价，无隐藏费用，支持 PayPal 安全支付</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">命理大师</div>
              <p className="footer-desc">
                传承东方智慧，服务现代生活。我们致力于将传统命理学与现代科技相结合，为用户提供专业、准确的命理分析服务。
              </p>
            </div>
            <div className="footer-column">
              <h4>服务项目</h4>
              <ul>
                <li><Link href="/consult">八字排盘</Link></li>
                <li><Link href="/compass">风水罗盘</Link></li>
                <li><Link href="/horoscope">星座运势</Link></li>
                <li><Link href="/divination">六爻占卜</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>关于我们</h4>
              <ul>
                <li><Link href="/about">公司介绍</Link></li>
                <li><Link href="/contact">联系我们</Link></li>
                <li><Link href="/terms">服务条款</Link></li>
                <li><Link href="/privacy">隐私政策</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>联系方式</h4>
              <ul>
                <li>邮箱: support@astromaster.com</li>
                <li>Telegram: @astromaster</li>
                <li>微信: AstroMasterOfficial</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 命理大师 AstroMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
