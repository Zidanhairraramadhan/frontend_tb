// =============================================
// Landing Page
// =============================================

const LOGO_SVG = `<svg viewBox="0 0 64 64" width="32" height="32" style="flex-shrink:0;"><defs><linearGradient id="noteGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1DB954"/><stop offset="100%" style="stop-color:#14b8a6"/></linearGradient><linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6"/><stop offset="100%" style="stop-color:#6366F1"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="16" fill="#121212" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/><rect x="18" y="34" width="12" height="18" rx="6" fill="none" stroke="url(#noteGrad)" stroke-width="4.5" transform="rotate(-15 24 43)"/><rect x="34" y="30" width="12" height="18" rx="6" fill="none" stroke="url(#linkGrad)" stroke-width="4.5" transform="rotate(-15 40 39)"/><path d="M28 36V17" stroke="url(#noteGrad)" stroke-width="4" stroke-linecap="round"/><path d="M44 32V13" stroke="url(#linkGrad)" stroke-width="4" stroke-linecap="round"/><path d="M28 17C34 15 38 15 44 13" stroke="url(#linkGrad)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M28 23C34 21 38 21 44 19" stroke="url(#noteGrad)" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;

// ── Rotating platform playlists for hero card ──
const PLATFORMS = [
  {
    name: 'Spotify',
    handle: '@spotify',
    logo: `<svg viewBox="0 0 24 24" width="32" height="32" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
    songs: [
      { label: 'Blinding Lights', sub: 'The Weeknd', dot: '#1DB954' },
      { label: 'Shape of You', sub: 'Ed Sheeran', dot: '#1DB954' },
      { label: 'Starboy', sub: 'The Weeknd', dot: '#1DB954' },
      { label: 'Someone You Loved', sub: 'Lewis Capaldi', dot: '#1DB954' },
    ]
  },
  {
    name: 'YouTube',
    handle: '@youtube',
    logo: `<svg viewBox="0 0 24 24" width="32" height="32" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    songs: [
      { label: 'Despacito', sub: 'Luis Fonsi', dot: '#FF0000' },
      { label: 'See You Again', sub: 'Wiz Khalifa', dot: '#FF0000' },
      { label: 'Shape of You', sub: 'Ed Sheeran', dot: '#FF0000' },
      { label: 'Uptown Funk', sub: 'Bruno Mars', dot: '#FF0000' },
    ]
  },
  {
    name: 'Apple Music',
    handle: '@applemusic',
    logo: `<svg viewBox="0 0 24 24" width="32" height="32" fill="#FA243C"><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm2.008-16.143c-.476.577-1.196.953-1.954.912-.112-1.002.327-2.023.957-2.732.559-.623 1.393-.996 2.13-.984.116 1.042-.39 2.067-1.133 2.804zm.372 1.341c-1.464-.047-2.825.867-3.568.867-.768 0-1.892-.816-3.136-.789-1.611.036-3.109.916-3.939 2.378-1.748 3.056-.445 7.568 1.258 9.99 .82 1.173 1.776 2.454 3.003 2.404 1.192-.045 1.637-.775 3.064-.775 1.411 0 1.83.775 3.078.75 1.282-.023 2.115-1.171 2.92-2.365.938-1.378 1.328-2.709 1.348-2.778-.031-.013-2.617-1.026-2.646-4.041-.023-2.527 2.083-3.743 2.18-3.8-1.179-1.727-3.023-1.97-3.562-2.012"/></svg>`,
    songs: [
      { label: 'Shape of You', sub: 'Ed Sheeran', dot: '#FA243C' },
      { label: 'Blinding Lights', sub: 'The Weeknd', dot: '#FA243C' },
      { label: 'Dance Monkey', sub: 'Tones and I', dot: '#FA243C' },
      { label: 'Rockstar', sub: 'Post Malone', dot: '#FA243C' },
    ]
  },
  {
    name: 'SoundCloud',
    handle: '@soundcloud',
    logo: `<svg viewBox="0 0 24 24" width="32" height="32" fill="#FF5500"><path d="M11.666 17.652c0 .351-.301.634-.672.634s-.672-.283-.672-.634V7.518c0-.352.301-.635.672-.635s.672.283.672.635v10.134zM9.51 17.702c0 .324-.266.587-.597.587-.332 0-.598-.263-.598-.587v-8.498c0-.324.266-.587.598-.587.331 0 .597.263.597.587v8.498zm-2.062.019c0 .285-.239.516-.532.516s-.53-.231-.53-.516V10.23c0-.285.237-.516.53-.516s.532.231.532.516v7.491zM5.3 17.67c0 .211-.186.38-.415.38s-.415-.169-.415-.38v-5.263c0-.21.186-.382.415-.382s.415.172.415.382V17.67zM3.204 17.582c0 .16-.145.289-.323.289s-.323-.129-.323-.289v-3.79c0-.161.145-.29.323-.29s.323.129.323.29v3.79zm-1.62.029c0 .121-.112.219-.247.219-.138 0-.248-.098-.248-.219v-2.148c0-.12.11-.219.248-.219.135 0 .247.099.247.219v2.148zm12.33 1.157c0 1.258-2.025 1.232-2.025 1.232H4.49s-4.49.52-4.49-3.79c0-3.327 3.325-4.148 3.325-4.148 1.488-4.218 5.702-4.133 6.945-3.805 1.705-1.503 3.513-.984 3.513-.984 3.197.868 3.013 3.407 3.013 3.407 3.992-.472 5.097 2.651 5.235 3.987.172 1.666-.639 2.91-1.921 3.498-.795.362-1.666.385-1.666.385h-4.321s-.208.232-.208.218v-.002zM13.791 17.65c0 .35-.316.634-.706.634-.388 0-.705-.284-.705-.634V6.208c0-.352.317-.635.705-.635.39 0 .706.283.706.635v11.442h.001zm2.34-.143c0 .285-.251.516-.563.516s-.562-.231-.562-.516V7.034c0-.285.251-.516.562-.516s.563.231.563.516v10.473zM18.234 17.34c0 .229-.208.414-.465.414s-.463-.185-.463-.414V8.583c0-.229.207-.414.463-.414s.465.185.465.414V17.34zm2.146-.388c0 .16-.148.29-.331.29s-.331-.13-.331-.29v-6.904c0-.161.148-.29.331-.29s.331.129.331.29v6.904z"/></svg>`,
    songs: [
      { label: 'Fuck Love', sub: 'XXXTentacion', dot: '#FF5500' },
      { label: 'Lucid Dreams', sub: 'Juice WRLD', dot: '#FF5500' },
      { label: 'XO TOUR Llif3', sub: 'Lil Uzi Vert', dot: '#FF5500' },
      { label: 'SAD!', sub: 'XXXTentacion', dot: '#FF5500' },
    ]
  }
];

export function renderLanding() {
  // Check auth state from localStorage
  const token = localStorage.getItem('token');
  let isLoggedIn = false;
  try { isLoggedIn = !!token && token !== 'undefined' && token !== 'null'; } catch {}

  const navActions = isLoggedIn
    ? `<a href="#/dashboard" class="btn btn-primary" id="landing-dashboard-btn">
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0;"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
         Go to Dashboard
       </a>`
    : `<a href="#/login" class="btn btn-ghost">Log In</a>
       <a href="#/register" class="btn btn-primary">Sign Up Free</a>`;

  // First platform rendered initially
  const firstSet = PLATFORMS[0];
  const songItemsHtml = firstSet.songs.map(s => `
    <div class="card-link-item">
      <span class="link-dot" style="background:${s.dot};"></span>
      <span class="card-link-song" style="font-size:12px;font-weight:600;flex:1;color:var(--text-primary);">${s.label}</span>
      <span class="card-link-sub" style="font-size:10px;color:var(--text-tertiary);margin-left:auto;">${s.sub}</span>
    </div>
  `).join('');

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
        <div class="landing-nav-actions" id="landing-nav-actions">
          ${navActions}
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
              <a href="${isLoggedIn ? '#/dashboard' : '#/register'}" class="btn btn-primary btn-lg">
                <i data-lucide="zap" style="width:18px;height:18px;"></i>
                ${isLoggedIn ? 'Go to Dashboard' : 'Get Started Free'}
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
            <div class="hero-card hero-card-main" id="hero-card-container" style="transition: opacity 0.4s ease;">
              <div class="card-avatar" id="hero-card-avatar" style="display: flex; align-items: center; justify-content: center; background: transparent; border: none;">${firstSet.logo}</div>
              <div class="card-name" id="hero-card-name">${firstSet.name}</div>
              <div class="card-handle" id="hero-card-handle">${firstSet.handle}</div>
              <div class="card-links" id="hero-card-links">
                ${songItemsHtml}
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
            <a href="${isLoggedIn ? '#/dashboard' : '#/register'}" class="btn btn-primary btn-lg">
              <i data-lucide="rocket" style="width:18px;height:18px;"></i>
              ${isLoggedIn ? 'Open Dashboard' : 'Create Your MusicLink'}
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
  if (window.lucide) lucide.createIcons();

  // ── Rotating hero card platforms ──
  let currentSet = 0;
  const cardContainer = document.getElementById('hero-card-container');
  const cardAvatar = document.getElementById('hero-card-avatar');
  const cardName = document.getElementById('hero-card-name');
  const cardHandle = document.getElementById('hero-card-handle');
  const cardLinks = document.getElementById('hero-card-links');

  if (cardContainer && cardLinks) {
    setInterval(() => {
      // Fade out
      cardContainer.style.opacity = '0';

      setTimeout(() => {
        currentSet = (currentSet + 1) % PLATFORMS.length;
        const platform = PLATFORMS[currentSet];
        
        cardAvatar.innerHTML = platform.logo;
        cardName.textContent = platform.name;
        cardHandle.textContent = platform.handle;
        
        cardLinks.innerHTML = platform.songs.map(s => `
          <div class="card-link-item">
            <span class="link-dot" style="background:${s.dot};"></span>
            <span class="card-link-song" style="font-size:12px;font-weight:600;flex:1;color:var(--text-primary);">${s.label}</span>
            <span class="card-link-sub" style="font-size:10px;color:var(--text-tertiary);margin-left:auto;">${s.sub}</span>
          </div>
        `).join('');
        
        // Fade back in
        cardContainer.style.opacity = '1';
      }, 400); // Wait for transition
    }, 3500); // Rotate every 3.5s
  }
}
