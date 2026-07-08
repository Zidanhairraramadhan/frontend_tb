// =============================================
// Demo Page — Mockup Profil Musisi Legendaris
// West Coast Hip Hop vibe: Tupac Shakur
// Halaman statis, tanpa API call
// =============================================

export function renderDemo() {
  return `
    <div class="demo-page">

      <!-- Background particles / vibe -->
      <div class="demo-bg">
        <div class="demo-bg-orb demo-bg-orb-1"></div>
        <div class="demo-bg-orb demo-bg-orb-2"></div>
        <div class="demo-bg-orb demo-bg-orb-3"></div>
      </div>

      <!-- Back to landing link -->
      <a href="#/" class="demo-back-link">
        <i data-lucide="arrow-left" style="width:16px;height:16px;"></i>
        Back to Home
      </a>

      <!-- Profile Card -->
      <div class="demo-card">

        <!-- Avatar -->
        <div class="demo-avatar-wrapper">
          <div class="demo-avatar">2Pac</div>
          <div class="demo-avatar-ring"></div>
        </div>

        <!-- Identity -->
        <h1 class="demo-name">Tupac Shakur</h1>
        <p class="demo-handle">@2pac_official</p>
        <p class="demo-bio">
          Thug Life 🌹 · West Coast Legend · All Eyez On Me<br>
          <span style="color:var(--text-tertiary);font-size:12px;">Los Angeles, California</span>
        </p>

        <!-- Platform badges -->
        <div class="demo-badges">
          <span class="demo-badge" style="background:rgba(29,185,84,.15);color:#1DB954;">Spotify</span>
          <span class="demo-badge" style="background:rgba(252,60,68,.15);color:#FC3C44;">Apple Music</span>
          <span class="demo-badge" style="background:rgba(255,0,0,.15);color:#FF4444;">YouTube</span>
          <span class="demo-badge" style="background:rgba(255,85,0,.15);color:#FF5500;">SoundCloud</span>
        </div>

        <!-- Music links -->
        <div class="demo-links">

          <!-- ✨ Spotify Embed Player Demo -->
          <div class="demo-spotify-embed">
            <div class="demo-spotify-label">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              Putar Langsung
            </div>
            <iframe
              src="https://open.spotify.com/embed/track/5Q0Nhxo0l2bP3pNjpGJwV1"
              width="100%"
              height="80"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
              loading="lazy"
              style="border-radius:10px;display:block;">
            </iframe>
          </div>

          <a class="demo-link-btn demo-link-spotify" href="#" onclick="event.preventDefault();">
            <div class="demo-link-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            </div>
            <div class="demo-link-text">
              <div class="demo-link-title">Listen on Spotify</div>
              <div class="demo-link-sub">All Eyez On Me · Greatest Hits</div>
            </div>
            <i data-lucide="external-link" style="width:16px;height:16px;opacity:0.5;margin-left:auto;"></i>
          </a>

          <a class="demo-link-btn demo-link-apple" href="#" onclick="event.preventDefault();">
            <div class="demo-link-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#FC3C44"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.048-2.31-2.08-3.103a9.592 9.592 0 0 0-1.89-.966c-.765-.3-1.58-.45-2.416-.43l-.002-.049h-7.8l-.002.049c-.834-.02-1.65.13-2.415.43a9.592 9.592 0 0 0-1.89.966C2.29 1.624 1.558 2.625 1.24 3.934a9.23 9.23 0 0 0-.24 2.19C.987 6.5 1 6.876 1 7.252v9.496c0 .376-.013.752.0 1.128a9.23 9.23 0 0 0 .24 2.19c.318 1.31 1.05 2.31 2.08 3.103a9.592 9.592 0 0 0 1.89.966c.765.3 1.58.45 2.415.43l.002.049h7.8l.002-.049c.835.02 1.65-.13 2.415-.43a9.592 9.592 0 0 0 1.89-.966c1.03-.793 1.764-1.794 2.08-3.103a9.23 9.23 0 0 0 .24-2.19c.013-.376 0-.752 0-1.128V7.252c0-.376.013-.752 0-1.128zm-6.8 7.876a4.3 4.3 0 0 1-4.3 4.3 4.3 4.3 0 0 1-4.3-4.3V9.748a4.3 4.3 0 0 1 4.3-4.3 4.3 4.3 0 0 1 4.3 4.3v4.252zm-4.3-6.552a2.3 2.3 0 0 0-2.3 2.3v4.252a2.3 2.3 0 0 0 4.6 0V9.748a2.3 2.3 0 0 0-2.3-2.3zm0 1a1.3 1.3 0 0 1 1.3 1.3v.15a1.3 1.3 0 0 1-2.6 0v-.15a1.3 1.3 0 0 1 1.3-1.3z"/></svg>
            </div>
            <div class="demo-link-text">
              <div class="demo-link-title">Apple Music</div>
              <div class="demo-link-sub">Stream All Albums</div>
            </div>
            <i data-lucide="external-link" style="width:16px;height:16px;opacity:0.5;margin-left:auto;"></i>
          </a>

          <a class="demo-link-btn demo-link-youtube" href="#" onclick="event.preventDefault();">
            <div class="demo-link-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </div>
            <div class="demo-link-text">
              <div class="demo-link-title">YouTube — Official</div>
              <div class="demo-link-sub">Music Videos & Documentaries</div>
            </div>
            <i data-lucide="external-link" style="width:16px;height:16px;opacity:0.5;margin-left:auto;"></i>
          </a>

          <a class="demo-link-btn demo-link-soundcloud" href="#" onclick="event.preventDefault();">
            <div class="demo-link-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#FF5500"><path d="M11.56 8.87V17h8.76c1.47 0 2.68-1.21 2.68-2.68 0-1.47-1.21-2.68-2.68-2.68-.14 0-.27.01-.4.03C19.7 9.94 18.32 9 16.72 9c-.34 0-.67.05-.98.13C15.28 7.33 13.54 6 11.56 6c-.3 0-.6.03-.9.09A4.5 4.5 0 0 0 7 10.5c0 .31.03.62.09.91.25-.04.5-.07.75-.07 1.99 0 3.61 1.4 3.91 3.22L11.56 8.87zm-4.3 5.39c-.34-1.53-1.71-2.68-3.35-2.68C1.75 11.58 0 13.33 0 15.46S1.75 19.34 3.91 19.34h7.1v-2.74L11.56 17H7.26v-2.74z"/></svg>
            </div>
            <div class="demo-link-text">
              <div class="demo-link-title">SoundCloud</div>
              <div class="demo-link-sub">Rare Tracks & Unreleased</div>
            </div>
            <i data-lucide="external-link" style="width:16px;height:16px;opacity:0.5;margin-left:auto;"></i>
          </a>

          <a class="demo-link-btn demo-link-tiktok" href="#" onclick="event.preventDefault();">
            <div class="demo-link-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.17a8.16 8.16 0 0 0 4.77 1.52V7.23a4.85 4.85 0 0 1-1-.54z"/></svg>
            </div>
            <div class="demo-link-text">
              <div class="demo-link-title">TikTok</div>
              <div class="demo-link-sub">Fan Page & Tribute Clips</div>
            </div>
            <i data-lucide="external-link" style="width:16px;height:16px;opacity:0.5;margin-left:auto;"></i>
          </a>

        </div>

        <!-- Footer info -->
        <div class="demo-footer-info">
          <span>💡 Ini adalah halaman demo statis</span>
          <a href="#/register" class="btn btn-primary" style="margin-top:16px;width:100%;">
            <i data-lucide="zap" style="width:16px;height:16px;"></i>
            Buat Profil Kamu Sendiri — Gratis!
          </a>
        </div>

      </div>

      <style>
        /* ── Demo Page Styles ── */
        .demo-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px 60px;
          position: relative;
          overflow: hidden;
          background: var(--bg-primary, #0a0a0a);
        }

        .demo-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
        .demo-bg-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); opacity: 0.18;
        }
        .demo-bg-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #1DB954, transparent 70%);
          top: -100px; left: -100px; animation: float1 8s ease-in-out infinite;
        }
        .demo-bg-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #8B5CF6, transparent 70%);
          bottom: -100px; right: -80px; animation: float2 10s ease-in-out infinite;
        }
        .demo-bg-orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #FF5500, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          animation: float3 12s ease-in-out infinite;
        }
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,40px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,-30px)} }
        @keyframes float3 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.15)} }

        .demo-back-link {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--text-secondary, #aaa);
          text-decoration: none; font-size: 14px; margin-bottom: 24px;
          transition: color 0.2s;
        }
        .demo-back-link:hover { color: var(--text-primary, #fff); }

        .demo-card {
          position: relative; z-index: 1;
          background: var(--glass-bg, rgba(255,255,255,0.04));
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 24px;
          padding: 40px 32px;
          width: 100%; max-width: 420px;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.4);
        }

        .demo-avatar-wrapper {
          position: relative; margin-bottom: 4px;
        }
        .demo-avatar {
          width: 96px; height: 96px; border-radius: 50%;
          background: linear-gradient(135deg, #1DB954 0%, #8B5CF6 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 900; color: #fff; letter-spacing: -1px;
          box-shadow: 0 0 30px rgba(29,185,84,0.35);
        }
        .demo-avatar-ring {
          position: absolute; inset: -4px; border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(135deg, #1DB954, #8B5CF6) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out; mask-composite: exclude;
          animation: spin-slow 6s linear infinite;
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }

        .demo-name {
          font-size: 26px; font-weight: 800; text-align: center;
          color: var(--text-primary, #fff); margin: 0; letter-spacing: -0.5px;
        }
        .demo-handle {
          font-size: 14px; color: var(--text-tertiary, #666);
          margin: 0; font-weight: 500;
        }
        .demo-bio {
          font-size: 14px; color: var(--text-secondary, #aaa);
          text-align: center; margin: 0; line-height: 1.5;
        }

        .demo-badges {
          display: flex; flex-wrap: wrap; gap: 6px; justify-content: center;
          margin: 4px 0;
        }
        .demo-badge {
          font-size: 11px; font-weight: 700; padding: 3px 10px;
          border-radius: 100px; letter-spacing: 0.5px; text-transform: uppercase;
        }

        .demo-links {
          display: flex; flex-direction: column; gap: 10px;
          width: 100%; margin-top: 4px;
        }
        .demo-link-btn {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border-radius: 14px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .demo-link-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .demo-link-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .demo-link-spotify .demo-link-icon { background: rgba(29,185,84,0.15); }
        .demo-link-apple .demo-link-icon   { background: rgba(252,60,68,0.15); }
        .demo-link-youtube .demo-link-icon { background: rgba(255,0,0,0.15); }
        .demo-link-soundcloud .demo-link-icon { background: rgba(255,85,0,0.15); }
        .demo-link-tiktok .demo-link-icon  { background: rgba(255,255,255,0.1); }

        .demo-link-title {
          font-size: 14px; font-weight: 700;
          color: var(--text-primary, #fff); line-height: 1.2;
        }
        .demo-link-sub {
          font-size: 12px; color: var(--text-tertiary, #666);
          margin-top: 2px;
        }

        .demo-footer-info {
          display: flex; flex-direction: column; align-items: center;
          gap: 4px; width: 100%; margin-top: 8px;
          font-size: 12px; color: var(--text-tertiary, #555);
        }

        .demo-spotify-embed {
          width: 100%;
          background: linear-gradient(135deg, rgba(29,185,84,0.08) 0%, rgba(29,185,84,0.03) 100%);
          border: 1px solid rgba(29,185,84,0.22);
          border-radius: 14px;
          padding: 12px 14px;
        }
        .demo-spotify-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
          text-transform: uppercase; color: #1DB954;
          margin-bottom: 10px;
        }
      </style>
    </div>
  `;
}

export function initDemo() {
  // Inisialisasi Lucide icons jika tersedia
  if (window.lucide) {
    lucide.createIcons();
  }
}
