// =============================================
// Landing Page
// =============================================

const LOGO_SVG = `<svg viewBox="0 0 64 64" width="32" height="32" style="flex-shrink:0;"><defs><linearGradient id="noteGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1DB954"/><stop offset="100%" style="stop-color:#14b8a6"/></linearGradient><linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6"/><stop offset="100%" style="stop-color:#6366F1"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="16" fill="#121212" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/><rect x="18" y="34" width="12" height="18" rx="6" fill="none" stroke="url(#noteGrad)" stroke-width="4.5" transform="rotate(-15 24 43)"/><rect x="34" y="30" width="12" height="18" rx="6" fill="none" stroke="url(#linkGrad)" stroke-width="4.5" transform="rotate(-15 40 39)"/><path d="M28 36V17" stroke="url(#noteGrad)" stroke-width="4" stroke-linecap="round"/><path d="M44 32V13" stroke="url(#linkGrad)" stroke-width="4" stroke-linecap="round"/><path d="M28 17C34 15 38 15 44 13" stroke="url(#linkGrad)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M28 23C34 21 38 21 44 19" stroke="url(#noteGrad)" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;


export function renderLanding() {
  return `
    <div class="landing">
      <!-- Navigation -->
      <nav class="landing-nav">
        <a href="#/" class="landing-logo">
          ${LOGO_SVG}
          <span>Music<span class="text-gradient">Link</span></span>
        </a>
        <div class="landing-nav-links">
          <!-- Smooth scroll ke section #features -->
          <a href="#features" onclick="event.preventDefault(); document.getElementById('features')?.scrollIntoView({behavior:'smooth'})">Features</a>
          <!-- Arahkan ke halaman Demo -->
          <a href="#/demo">Demo</a>
          <a href="#pricing" onclick="event.preventDefault(); document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})">Pricing</a>
          <!-- API Docs dibuka di tab baru -->
          <a href="http://localhost:5000/docs" target="_blank" rel="noopener noreferrer">API Docs</a>
        </div>
        <div class="landing-nav-actions">
          <a href="#/login" class="btn btn-ghost">Log In</a>
          <a href="#/register" class="btn btn-primary">Sign Up Free</a>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-badge">
              <span class="hero-badge-dot"></span>
              Now in Beta — Join 10,000+ Artists
            </div>
            <h1>
              One Link for<br>
              <span class="highlight">All Your Music</span>
            </h1>
            <p class="hero-subtitle">
              Create one beautiful page to share your Spotify, Apple Music, YouTube, TikTok, Instagram, SoundCloud and more. Designed for musicians who want to stand out.
            </p>
            <div class="hero-actions">
              <a href="#/register" class="btn btn-primary btn-lg">
                <i data-lucide="zap" style="width:18px;height:18px;"></i>
                Get Started Free
              </a>
              <a href="#/public" class="btn btn-secondary btn-lg">
                <i data-lucide="play" style="width:18px;height:18px;"></i>
                View Demo
              </a>
            </div>
            <div class="hero-stats">
              <div class="hero-stat">
                <span class="hero-stat-value">10K+</span>
                <span class="hero-stat-label">Artists</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-value">2M+</span>
                <span class="hero-stat-label">Clicks</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-value">50K+</span>
                <span class="hero-stat-label">Links</span>
              </div>
            </div>
          </div>

          <div class="hero-illustration">
            <!-- Floating Profile Card -->
            <div class="hero-card hero-card-main">
              <div class="card-avatar">🎵</div>
              <div class="card-name">Alex Rivera</div>
              <div class="card-handle">@alexrivera</div>
              <div class="card-links">
                <div class="card-link-item">
                  <span class="link-dot" style="background:#1DB954;"></span>
                  Spotify
                </div>
                <div class="card-link-item">
                  <span class="link-dot" style="background:#FF0000;"></span>
                  YouTube
                </div>
                <div class="card-link-item">
                  <span class="link-dot" style="background:#FC3C44;"></span>
                  Apple Music
                </div>
                <div class="card-link-item">
                  <span class="link-dot" style="background:#FF5500;"></span>
                  SoundCloud
                </div>
              </div>
            </div>

            <!-- Floating Analytics Card -->
            <div class="hero-card hero-card-floating-1">
              <div class="mini-chart">
                <div class="mini-chart-bar" style="height:12px;"></div>
                <div class="mini-chart-bar" style="height:20px;"></div>
                <div class="mini-chart-bar" style="height:16px;"></div>
                <div class="mini-chart-bar" style="height:28px;"></div>
                <div class="mini-chart-bar" style="height:22px;"></div>
                <div class="mini-chart-bar" style="height:30px;"></div>
              </div>
              <div>
                <div style="font-size:12px;font-weight:700;">+23%</div>
                <div style="font-size:10px;color:var(--text-tertiary);">This week</div>
              </div>
            </div>

            <!-- Floating Clicks Card -->
            <div class="hero-card hero-card-floating-2">
              <div class="play-count">41.9K</div>
              <div class="play-label">Total Clicks</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features" id="features">
        <div class="features-header">
          <h2>Everything you need to<br><span class="text-gradient">share your music</span></h2>
          <p>Powerful tools designed specifically for musicians, DJs, podcasters, and content creators.</p>
        </div>

        <div class="features-grid stagger-children">
          <div class="feature-card">
            <div class="feature-icon feature-icon-green">
              <i data-lucide="link"></i>
            </div>
            <h3>Unlimited Music Links</h3>
            <p>Add all your streaming platform links in one place. Spotify, YouTube, Apple Music, and more.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon feature-icon-purple">
              <i data-lucide="user"></i>
            </div>
            <h3>Beautiful Public Profile</h3>
            <p>A stunning, animated profile page that makes your music stand out from the crowd.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon feature-icon-blue">
              <i data-lucide="bar-chart-3"></i>
            </div>
            <h3>Analytics Dashboard</h3>
            <p>Track clicks, views, and engagement across all your platforms with beautiful charts.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon feature-icon-pink">
              <i data-lucide="qr-code"></i>
            </div>
            <h3>QR Code Sharing</h3>
            <p>Generate QR codes for your profile. Perfect for flyers, merch, and business cards.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon feature-icon-orange">
              <i data-lucide="moon"></i>
            </div>
            <h3>Dark Mode</h3>
            <p>Gorgeous dark theme by default. Easy on the eyes and built for the modern web.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon feature-icon-teal">
              <i data-lucide="smartphone"></i>
            </div>
            <h3>Fully Responsive</h3>
            <p>Looks amazing on every device. Desktop, tablet, and mobile — pixel perfect everywhere.</p>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="pricing-section" id="pricing">
        <div class="features-header">
          <h2>Simple, <span class="text-gradient">Transparent</span> Pricing</h2>
          <p>Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi.</p>
        </div>
        <div class="pricing-grid">

          <!-- Free Plan -->
          <div class="pricing-card">
            <div class="pricing-badge">Gratis Selamanya</div>
            <div class="pricing-plan-name">Free</div>
            <div class="pricing-price">
              <span class="pricing-currency">Rp</span>
              <span class="pricing-amount">0</span>
              <span class="pricing-period">/bulan</span>
            </div>
            <ul class="pricing-features-list">
              <li><i data-lucide="check" style="width:16px;height:16px;color:#1DB954;"></i> 5 Music Links</li>
              <li><i data-lucide="check" style="width:16px;height:16px;color:#1DB954;"></i> Public Profile Page</li>
              <li><i data-lucide="check" style="width:16px;height:16px;color:#1DB954;"></i> Basic Analytics</li>
              <li><i data-lucide="check" style="width:16px;height:16px;color:#1DB954;"></i> QR Code Generator</li>
              <li><i data-lucide="x" style="width:16px;height:16px;color:var(--text-tertiary);"></i> <span style="color:var(--text-tertiary)">Custom Domain</span></li>
              <li><i data-lucide="x" style="width:16px;height:16px;color:var(--text-tertiary);"></i> <span style="color:var(--text-tertiary)">Priority Support</span></li>
            </ul>
            <button class="btn btn-secondary" style="width:100%;" onclick="alert('Fitur pembayaran menyusul!')">Get Started</button>
          </div>

          <!-- Pro Plan -->
          <div class="pricing-card pricing-card-featured">
            <div class="pricing-badge pricing-badge-pro">Paling Populer ⚡</div>
            <div class="pricing-plan-name">Pro</div>
            <div class="pricing-price">
              <span class="pricing-currency">Rp</span>
              <span class="pricing-amount">15.000</span>
              <span class="pricing-period">/bulan</span>
            </div>
            <ul class="pricing-features-list">
              <li><i data-lucide="check" style="width:16px;height:16px;color:#1DB954;"></i> <strong>Unlimited</strong> Music Links</li>
              <li><i data-lucide="check" style="width:16px;height:16px;color:#1DB954;"></i> Public Profile Page</li>
              <li><i data-lucide="check" style="width:16px;height:16px;color:#1DB954;"></i> Advanced Analytics</li>
              <li><i data-lucide="check" style="width:16px;height:16px;color:#1DB954;"></i> QR Code Generator</li>
              <li><i data-lucide="check" style="width:16px;height:16px;color:#1DB954;"></i> Custom Domain</li>
              <li><i data-lucide="check" style="width:16px;height:16px;color:#1DB954;"></i> Priority Support</li>
            </ul>
            <button class="btn btn-primary" style="width:100%;" onclick="alert('Fitur pembayaran menyusul!')">Beli Sekarang</button>
          </div>

        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-card">
          <h2>Ready to share your music<br>with the <span class="text-gradient">world</span>?</h2>
          <p>Join thousands of artists already using MusicLink. It's free to get started.</p>
          <div class="cta-actions">
            <a href="#/register" class="btn btn-primary btn-lg">
              <i data-lucide="rocket" style="width:18px;height:18px;"></i>
              Create Your MusicLink
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <div class="footer-links">
          <a href="https://github.com/Zidanhairraramadhan/frontend_tb" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:6px;"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub Frontend
          </a>
          <a href="https://github.com/Zidanhairraramadhan/backend_tb" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:6px;"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub Backend
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Dokumentasi PDF
          </a>
        </div>
        <p class="footer-copyright">© 2026 MusicLink. Made with 💚 for musicians everywhere.</p>
      </footer>
    </div>
  `;
}

export function initLanding() {
  // No special JS needed for landing
}
