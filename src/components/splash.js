// =============================================
// Splash Screen Component
// =============================================

export function playSplashScreen() {
  return new Promise((resolve) => {
    // Hanya jalankan sekali per sesi
    if (sessionStorage.getItem('musiclink_splash_played')) {
      return resolve();
    }

    const splash = document.createElement('div');
    splash.id = 'splash-screen';
    splash.innerHTML = `
      <div class="splash-content">
        <div class="splash-logo">
          <i data-lucide="music" class="splash-icon"></i>
          <h1 class="splash-title">MusicLink</h1>
        </div>
        <div class="splash-equalizer">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
    `;
    
    document.body.appendChild(splash);
    if (window.lucide) window.lucide.createIcons();

    // Tahan 2.5 detik lalu fade-out
    setTimeout(() => {
      splash.classList.add('splash-fade-out');
      setTimeout(() => {
        splash.remove();
        sessionStorage.setItem('musiclink_splash_played', 'true');
        resolve();
      }, 500); // 500ms adalah durasi fade out
    }, 2500);
  });
}
