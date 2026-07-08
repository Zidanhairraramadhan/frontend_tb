// =============================================
// Hash-based SPA Router
// =============================================

import { isAuthenticated, logout as doLogout } from './store.js';

// ── Page imports ──
import { renderLanding, initLanding } from './pages/landing.js';
import { renderLogin, initLogin } from './pages/login.js';
import { renderRegister, initRegister } from './pages/register.js';
import { renderDashboard, initDashboard } from './pages/dashboard.js';
import { renderProfile, initProfile } from './pages/profile.js';
import { renderLinks, initLinks } from './pages/links.js';
import { renderSettings, initSettings, applyLanguage } from './pages/settings.js';
import { renderPublicProfile, initPublicProfile } from './pages/public-profile.js';
import { renderNotFound, initNotFound } from './pages/not-found.js';
import { renderDemo, initDemo } from './pages/demo.js';
import { renderAdminUsers, initAdminUsers } from './pages/admin_users.js';
import { renderMyProfileView, initMyProfileView } from './pages/my_profile_view.js';
import { showToast } from './components/toast.js';

const routes = {
  '/': { render: renderLanding, init: initLanding, auth: false },
  '/login': { render: renderLogin, init: initLogin, auth: false },
  '/register': { render: renderRegister, init: initRegister, auth: false },
  '/dashboard': { render: renderDashboard, init: initDashboard, auth: true },
  '/profile': { render: renderProfile, init: initProfile, auth: true },
  '/links': { render: renderLinks, init: initLinks, auth: true },
  '/settings': { render: renderSettings, init: initSettings, auth: true },
  '/public': { render: renderPublicProfile, init: initPublicProfile, auth: false },
  '/demo': { render: renderDemo, init: initDemo, auth: false },
  // Route baru: Public Profile Preview (login required)
  '/my-profile-view': { render: renderMyProfileView, init: initMyProfileView, auth: true },
  // Route baru: Admin — Manage Users (login required, role check di dalam halaman)
  '/admin/users': { render: renderAdminUsers, init: initAdminUsers, auth: true },
};

let currentCleanup = null;

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || '/';
  let routePath = hash;

  // Route any hash starting with /public/ to the /public handler
  if (hash.startsWith('/public/')) {
    routePath = '/public';
  }

  const route = routes[routePath];

  if (!route) {
    renderPage(renderNotFound, initNotFound);
    return;
  }

  // Auth guard
  if (route.auth && !isAuthenticated()) {
    window.location.hash = '#/login';
    return;
  }

  // If logged in and trying to access login/register, redirect to dashboard
  if (isAuthenticated() && (hash === '/login' || hash === '/register')) {
    window.location.hash = '#/dashboard';
    return;
  }

  renderPage(route.render, route.init);
}

function renderPage(renderFn, initFn) {
  const app = document.getElementById('app');
  if (!app) return;

  // Cleanup previous
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  // Remove previous links-updated listener
  window.removeEventListener('links-updated', () => {});

  // Render new page
  app.innerHTML = renderFn();

  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Initialize page logic
  if (initFn) {
    initFn();
  }

  // Setup logout handler
  setupLogout();

  // Apply persistent language to the newly rendered page elements
  const savedLang = localStorage.getItem('lang') || 'en';
  applyLanguage(savedLang);

  // Scroll to top
  window.scrollTo(0, 0);
}

function setupLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      doLogout();
      showToast('Logged out successfully', 'info');
      setTimeout(() => {
        window.location.hash = '#/';
      }, 300);
    });
  }
}

export function navigateTo(path) {
  window.location.hash = `#${path}`;
}
