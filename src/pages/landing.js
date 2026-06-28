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
          <a href="#features">Features</a>
          <a href="#/public">Demo</a>
          <a href="#pricing">Pricing</a>
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
        <p>© 2026 MusicLink. Made with 💚 for musicians everywhere.</p>
      </footer>
    </div>
  `;
}

export function initLanding() {
  // No special JS needed for landing
}
