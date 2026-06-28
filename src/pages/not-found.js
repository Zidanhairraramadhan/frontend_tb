// =============================================
// 404 Not Found Page
// =============================================

export function renderNotFound() {
  return `
    <div class="auth-page" style="flex-direction:column;gap:var(--space-xl);">
      <div style="text-align:center;animation:fadeInUp 0.6s ease forwards;">
        <!-- Animated 404 -->
        <div style="position:relative;margin-bottom:var(--space-xl);">
          <div style="font-size:clamp(6rem,15vw,12rem);font-weight:900;letter-spacing:-0.05em;background:var(--gradient-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;animation:float 4s ease-in-out infinite;">
            404
          </div>
          <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:48px;animation:floatReverse 3s ease-in-out infinite;">
            🎵
          </div>
        </div>

        <h1 style="font-size:var(--font-size-3xl);font-weight:800;margin-bottom:var(--space-md);">
          Page Not Found
        </h1>
        <p style="font-size:var(--font-size-lg);color:var(--text-secondary);max-width:400px;margin:0 auto var(--space-xl);">
          Looks like this track doesn't exist. Let's get you back to the music.
        </p>
        <div style="display:flex;gap:var(--space-md);justify-content:center;">
          <a href="#/" class="btn btn-primary btn-lg">
            <i data-lucide="home" style="width:18px;height:18px;"></i>
            Go Home
          </a>
          <a href="#/dashboard" class="btn btn-secondary btn-lg">
            <i data-lucide="layout-dashboard" style="width:18px;height:18px;"></i>
            Dashboard
          </a>
        </div>
      </div>
    </div>
  `;
}

export function initNotFound() {
  // No special init needed
}
