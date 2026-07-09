// =============================================
// Top Navigation Component
// =============================================

import { getUser } from '../store.js';

export function renderTopnav(pageTitle = 'Dashboard') {
  const user = getUser();

  return `
    <header class="topnav" id="topnav">
      <div class="topnav-left">
        <button class="mobile-menu-btn" id="mobile-menu-btn">
          <i data-lucide="menu"></i>
        </button>
        <h2 class="topnav-title" style="margin: 0; font-size: 1.25rem; font-weight: 600; color: var(--text-primary); letter-spacing: -0.02em;">${pageTitle}</h2>
      </div>
      <div class="topnav-right">
      </div>
    </header>
  `;
}
