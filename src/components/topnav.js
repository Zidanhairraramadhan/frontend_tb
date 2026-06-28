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
        <div class="topnav-search">
          <i data-lucide="search"></i>
          <input type="text" class="input" placeholder="Search anything..." />
        </div>
      </div>
      <div class="topnav-right">
        <button class="topnav-notification" id="notification-btn" title="Notifications">
          <i data-lucide="bell"></i>
          <span class="topnav-notification-badge"></span>
        </button>
        <div class="topnav-avatar" title="${user.name}">
          ${user.avatarInitial}
        </div>
      </div>
    </header>
  `;
}
