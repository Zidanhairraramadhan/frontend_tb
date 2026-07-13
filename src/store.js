// =============================================
// State Management & Reactive Store
// Tanggung jawab: Global state & business logic
// Komunikasi API didelegasikan ke services/api.js
// =============================================

import { API_BASE, apiFetch, loginRequest, registerRequest, reset401Flag, fetchPublicProfile, trackLinkClick as incrementClick } from './services/api.js';

// ── Safe Storage Helpers ──
// Mencegah crash jika localStorage berisi nilai 'undefined' atau string tidak valid

/**
 * Membaca token dari localStorage dengan aman.
 * Mengembalikan string kosong jika token tidak ada atau bernilai 'undefined'.
 */
function getSafeToken() {
  const raw = localStorage.getItem('token');
  // Cegah false-positive: string 'undefined' atau 'null' BUKAN token yang valid
  if (!raw || raw === 'undefined' || raw === 'null') return '';
  return raw;
}

/**
 * Mem-parse JSON dari localStorage dengan aman.
 * Mengembalikan null jika nilai tidak ada, tidak valid, atau bukan JSON.
 */
function getSafeUser() {
  const raw = localStorage.getItem('user');
  if (!raw || raw === 'undefined' || raw === 'null') return null;
  try {
    return JSON.parse(raw);
  } catch {
    // Jika JSON.parse gagal (data korup), bersihkan dan kembalikan null
    localStorage.removeItem('user');
    return null;
  }
}

// Global reactive store state (mirrors database)
const state = {
  token: getSafeToken(),
  user: getSafeUser(),
  links: [],
  activities: [
    { id: 'act_001', type: 'click', message: 'Someone clicked your Spotify link', time: new Date().toISOString() },
    { id: 'act_002', type: 'view', message: 'Your profile was viewed 14 times', time: new Date(Date.now() - 3600000).toISOString() },
  ],
  settings: {
    theme: localStorage.getItem('theme') || 'dark',
    language: localStorage.getItem('lang') || 'en',
    notifications: { email: true, push: true, weekly: true, milestones: true }
  }
};

// Helper untuk request terautentikasi.
// Mendelegasikan ke apiFetch dari services/api.js,
// menyuntikkan token dari state dan callback untuk penanganan 401.
function authFetch(endpoint, options = {}) {
  return apiFetch(endpoint, options, state.token, () => {
    // Callback ini hanya dipanggil SEKALI oleh api.js meski ada race condition
    logout();
    window.location.hash = '#/login';
  });
}

// ── Authentication ──

export function isAuthenticated() {
  return !!state.token;
}

export async function login(username, password) {
  // Delegasikan HTTP request ke services/api.js
  const data = await loginRequest(username, password);

  // Simpan token & user ke state. Pastikan data valid sebelum disimpan.
  state.token = data.token || '';
  state.user = data.user || null;

  // Hanya simpan jika nilainya valid (bukan undefined)
  if (state.token) {
    localStorage.setItem('token', state.token);
  }
  if (state.user) {
    localStorage.setItem('user', JSON.stringify(state.user));
  }

  // Reset flag 401 agar session baru berjalan normal
  reset401Flag();

  // Sync state dari database
  await syncData();
  return data;
}

export async function register(username, password, name) {
  // Delegasikan HTTP request ke services/api.js
  return registerRequest(username, password, name);
}

export function logout() {
  state.token = '';
  state.user = null;
  state.links = [];
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export async function changePassword(currentPassword, newPassword) {
  return authFetch('/api/change-password', {
    method: 'PUT',
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
  });
}

// ── User Profile ──

export function getUser() {
  // Try to load cached user if async fetch hasn't completed
  // Data Contract: { id, username, role, links: [...] }
  return state.user || { username: 'Loading...', role: 'user', links: [] };
}

export async function syncProfile() {
  if (!isAuthenticated()) return;
  const user = await authFetch('/api/profile');
  state.user = user;
  localStorage.setItem('user', JSON.stringify(user));
}

export async function updateUser(updates) {
  const res = await authFetch('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(updates)
  });
  state.user = res.user;
  localStorage.setItem('user', JSON.stringify(res.user));
  return res.user;
}

// ── Music Links CRUD ──

export function getLinks() {
  return state.links;
}

export function getActiveLinks() {
  return state.links.filter(l => l.active);
}

export async function syncLinks() {
  if (!isAuthenticated()) return;
  const data = await authFetch('/api/links');
  // Guard: backend mungkin mengembalikan array langsung atau { links: [...] }
  state.links = Array.isArray(data) ? data : (Array.isArray(data?.links) ? data.links : []);
}

export async function addLink(link) {
  const newLink = await authFetch('/api/links', {
    method: 'POST',
    body: JSON.stringify(link)
  });
  state.links.unshift(newLink.link);
  return newLink;
}

export async function updateLink(id, updates) {
  const res = await authFetch(`/api/links/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  });
  const idx = state.links.findIndex(l => l.id === id);
  if (idx !== -1) {
    state.links[idx] = res.link;
  }
  return res;
}

export async function deleteLink(id) {
  await authFetch(`/api/links/${id}`, {
    method: 'DELETE'
  });
  state.links = state.links.filter(l => l.id !== id);
}

export async function toggleLinkStatus(id) {
  const link = state.links.find(l => l.id === id);
  if (link) {
    const updatedStatus = !link.active;
    await updateLink(id, { active: updatedStatus });
  }
}

export async function reorderLinks(items) {
  // items = [{id: "uuid", position: 0}, {id: "uuid", position: 1}, ...]
  await authFetch('/api/links/reorder', {
    method: 'PUT',
    body: JSON.stringify(items),
  });
  // Update local state positions
  items.forEach(item => {
    const link = state.links.find(l => l.id === item.id);
    if (link) link.position = item.position;
  });
  // Reorder state array
  state.links.sort((a, b) => (a.position || 0) - (b.position || 0));
}

// ── Public Profile (No Auth Required) ──
export { fetchPublicProfile, incrementClick };

// ── State Sync ──

export async function syncData() {
  if (isAuthenticated()) {
    try {
      await Promise.all([syncProfile(), syncLinks()]);
    } catch (e) {
      console.error('Error syncing remote GORM database state:', e);
    }
  }
}

// ── Analytics (Derived from active DB state) ──

export function getTotalStats() {
  const totalLinks = state.links.length;
  const totalPlatforms = new Set(state.links.map(l => l?.platform).filter(Boolean)).size;
  const totalClicks = state.links.reduce((sum, l) => sum + (l?.clicks || 0), 0);
  const totalViews = totalClicks; // Real data — no more simulation
  return { totalLinks, totalPlatforms, totalClicks, totalViews };
}

export async function getAnalytics() {
  if (!isAuthenticated()) {
    return getDefaultAnalytics();
  }

  try {
    // Fetch semua data analitik secara paralel dari backend
    const [dailyRes, monthlyRes, sourcesRes, summaryRes] = await Promise.all([
      authFetch('/api/analytics/daily'),
      authFetch('/api/analytics/monthly'),
      authFetch('/api/analytics/sources'),
      authFetch('/api/analytics/summary'),
    ]);

    // Proses data harian (7 hari terakhir)
    const dailyData = dailyRes?.daily || [];
    const weeklyLabels = dailyData.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    });
    const weeklyClicks = dailyData.map(d => d.clicks);

    // Proses data bulanan (12 bulan terakhir)
    const monthlyData = monthlyRes?.monthly || [];
    const monthlyLabels = monthlyData.map(d => {
      const [year, month] = d.month.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { month: 'short' });
    });
    const monthlyClicks = monthlyData.map(d => d.clicks);

    // Proses sumber trafik
    const trafficSources = (sourcesRes?.sources || []).map(s => ({
      source: s.source || 'Unknown',
      percentage: Math.round(s.percentage * 10) / 10,
      clicks: s.clicks,
    }));

    // Summary
    const summary = summaryRes || {};
    const totalClicks = summary.total_clicks || 0;

    // Top platforms (dari state lokal — sudah ada datanya)
    const topPlatforms = Object.entries(
      state.links.reduce((acc, l) => {
        const key = l?.platform || 'unknown';
        acc[key] = (acc[key] || 0) + (l?.clicks || 0);
        return acc;
      }, {})
    ).map(([platform, clicks]) => ({ platform, clicks }))
     .sort((a, b) => b.clicks - a.clicks);

    return {
      weeklyClicks: weeklyClicks.length ? weeklyClicks : [0],
      weeklyLabels: weeklyLabels.length ? weeklyLabels : ['Today'],
      monthlyClicks: monthlyClicks.length ? monthlyClicks : [0],
      monthlyLabels: monthlyLabels.length ? monthlyLabels : ['This Month'],
      topPlatforms: topPlatforms.length ? topPlatforms : [{ platform: 'spotify', clicks: 0 }],
      trafficSources: trafficSources.length ? trafficSources : [{ source: 'Direct', percentage: 100 }],
      totalClicks,
      totalViews: totalClicks,
      mostActiveDay: summary.most_active_day || 'N/A',
      growthPercentage: Math.round((summary.growth_percentage || 0) * 10) / 10,
    };
  } catch (err) {
    console.error('Failed to fetch analytics:', err);
    return getDefaultAnalytics();
  }
}

// Data default jika fetch gagal atau belum ada data
function getDefaultAnalytics() {
  const totalClicks = state.links.reduce((sum, l) => sum + (l?.clicks || 0), 0);
  const topPlatforms = Object.entries(
    state.links.reduce((acc, l) => {
      const key = l?.platform || 'unknown';
      acc[key] = (acc[key] || 0) + (l?.clicks || 0);
      return acc;
    }, {})
  ).map(([platform, clicks]) => ({ platform, clicks }))
   .sort((a, b) => b.clicks - a.clicks);

  return {
    weeklyClicks: [0],
    weeklyLabels: ['Today'],
    monthlyClicks: [0],
    monthlyLabels: ['This Month'],
    topPlatforms: topPlatforms.length ? topPlatforms : [{ platform: 'spotify', clicks: 0 }],
    trafficSources: [{ source: 'No data yet', percentage: 100 }],
    totalClicks,
    totalViews: totalClicks,
    mostActiveDay: 'N/A',
    growthPercentage: 0,
  };
}

export function getActivities() {
  return state.activities;
}

export function getSettings() {
  return state.settings;
}

export function updateSettings(updates) {
  Object.assign(state.settings, updates);
  if (updates.theme) {
    localStorage.setItem('theme', updates.theme);
  }
}
