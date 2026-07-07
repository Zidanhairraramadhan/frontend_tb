// =============================================
// Sidebar Component
// =============================================

import { getUser } from '../store.js';

const LOGO_SVG = `<svg viewBox="0 0 64 64" width="28" height="28" style="flex-shrink:0;"><defs><linearGradient id="noteGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1DB954"/><stop offset="100%" style="stop-color:#14b8a6"/></linearGradient><linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6"/><stop offset="100%" style="stop-color:#6366F1"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="16" fill="#121212" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/><rect x="18" y="34" width="12" height="18" rx="6" fill="none" stroke="url(#noteGrad)" stroke-width="4.5" transform="rotate(-15 24 43)"/><rect x="34" y="30" width="12" height="18" rx="6" fill="none" stroke="url(#linkGrad)" stroke-width="4.5" transform="rotate(-15 40 39)"/><path d="M28 36V17" stroke="url(#noteGrad)" stroke-width="4" stroke-linecap="round"/><path d="M44 32V13" stroke="url(#linkGrad)" stroke-width="4" stroke-linecap="round"/><path d="M28 17C34 15 38 15 44 13" stroke="url(#linkGrad)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M28 23C34 21 38 21 44 19" stroke="url(#noteGrad)" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;


export function renderSidebar(activePage = 'dashboard') {
  const user = getUser();
  const isAdmin = user.role === 'admin';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', href: '#/dashboard' },
    { id: 'profile', label: 'My Profile', icon: 'user-circle', href: '#/profile' },
    { id: 'links', label: 'Music Links', icon: 'link', href: '#/links' },
    { id: 'settings', label: 'Settings', icon: 'settings', href: '#/settings' },
  ];

  return `
    <aside class="sidebar" id="sidebar">
      <a href="#/dashboard" class="sidebar-logo">
        ${LOGO_SVG}
        <span>Music<span class="text-gradient">Link</span></span>
      </a>

      <div class="sidebar-section-title">Menu</div>

      <nav class="sidebar-nav">
        ${navItems.map(item => `
          <a href="${item.href}" class="sidebar-link ${activePage === item.id ? 'active' : ''}" data-page="${item.id}">
            <i data-lucide="${item.icon}"></i>
            <span>${item.label}</span>
          </a>
        `).join('')}

        ${isAdmin ? `
          <div class="sidebar-section-title" style="margin-top:16px;">Admin</div>
          <a href="#/admin/users" class="sidebar-link ${activePage === 'admin_users' ? 'active' : ''}" data-page="admin_users">
            <i data-lucide="users"></i>
            <span>Manage Users</span>
            <span class="sidebar-admin-badge">Admin</span>
          </a>
        ` : ''}
      </nav>

      <div class="sidebar-footer">
        <a href="#/my-profile-view" class="sidebar-link" style="margin-bottom: 8px;">
          <i data-lucide="external-link"></i>
          <span>View Public Profile</span>
        </a>
        <a href="#" class="sidebar-link" id="logout-btn" onclick="event.preventDefault();">
          <i data-lucide="log-out"></i>
          <span>Logout</span>
        </a>
        <div class="divider" style="margin: 12px 0;"></div>
        <div class="sidebar-user">
          <div class="topnav-avatar" style="width:36px;height:36px;font-size:13px;">
            ${user.avatarInitial}
          </div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${user.name}</div>
            <div class="sidebar-user-email">${user.email || user.username}</div>
          </div>
        </div>
      </div>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
  `;
}

export function initSidebar() {
  const overlay = document.getElementById('sidebar-overlay');
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('mobile-menu-btn');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
      overlay?.classList.toggle('open');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('open');
    });
  }

  // Close sidebar on link click (mobile)
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar?.classList.remove('open');
        overlay?.classList.remove('open');
      }
    });
  });
}
