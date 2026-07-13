// =============================================
// Top Navigation Component
// =============================================

import { getUser } from '../store.js';
import { toggleTheme, getCurrentTheme } from '../utils/theme.js';

export function renderTopnav(pageTitle = 'Dashboard') {
  const user = getUser();
  const isDark = getCurrentTheme() === 'dark';

  return `
    <header class="topnav" id="topnav">
      <div class="topnav-left">
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
          <i data-lucide="menu"></i>
        </button>
        <h2 class="topnav-title" style="margin: 0; font-size: 1.25rem; font-weight: 600; color: var(--text-primary); letter-spacing: -0.02em;">${pageTitle}</h2>
      </div>
      <div class="topnav-right">
        <!-- Theme Toggle Button -->
        <button
          id="theme-toggle-btn"
          title="${isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}"
          aria-label="Toggle theme"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: var(--bg-glass-strong);
            border: 1px solid var(--border-color);
            cursor: pointer;
            color: var(--text-secondary);
            transition: all var(--transition-base);
            flex-shrink: 0;
          "
        >
          <i data-lucide="${isDark ? 'sun' : 'moon'}" style="width:18px;height:18px;"></i>
        </button>
      </div>
    </header>
  `;
}

/**
 * Inisialisasi event listener untuk tombol theme toggle.
 * Dipanggil setelah renderTopnav() dimasukkan ke DOM.
 */
export function initTopnavTheme() {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const newTheme = toggleTheme();
    // Update ikon dan tooltip tanpa re-render halaman
    const icon = btn.querySelector('i[data-lucide]');
    if (icon) {
      icon.setAttribute('data-lucide', newTheme === 'dark' ? 'sun' : 'moon');
      if (window.lucide) lucide.createIcons();
    }
    btn.title = newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    btn.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');

    // Animasi kecil pada tombol
    btn.style.transform = 'scale(0.85)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
  });
}
