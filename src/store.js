// =============================================
// State Management & Reactive Store
// Tanggung jawab: Global state & business logic
// Komunikasi API didelegasikan ke services/api.js
// =============================================

import { apiFetch, loginRequest, registerRequest, reset401Flag } from './services/api.js';

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
    language: 'en',
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
  return state.user || { name: 'Loading...', username: '...', avatarInitial: '..' };
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
  const links = await authFetch('/api/links');
  state.links = links;
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

// ── Public Profile (No Auth Required) ──

export async function fetchPublicProfile(username) {
  const res = await fetch(`${API_BASE}/public/${username}`);
  if (!res.ok) {
    throw new Error('Public artist profile not found');
  }
  return res.json();
}

export async function incrementClick(id) {
  await fetch(`${API_BASE}/api/clicks/${id}`, { method: 'POST' }).catch(() => {});
}

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
  const totalPlatforms = new Set(state.links.map(l => l.platform)).size;
  const totalClicks = state.links.reduce((sum, l) => sum + l.clicks, 0);
  const totalViews = totalClicks + 1500; // Simulated views
  return { totalLinks, totalPlatforms, totalClicks, totalViews };
}

export function getAnalytics() {
  const totalClicks = state.links.reduce((sum, l) => sum + l.clicks, 0);
  const topPlatforms = Object.entries(
    state.links.reduce((acc, l) => {
      acc[l.platform] = (acc[l.platform] || 0) + l.clicks;
      return acc;
    }, {})
  ).map(([platform, clicks]) => ({ platform, clicks }))
   .sort((a, b) => b.clicks - a.clicks);

  return {
    weeklyClicks: [120, 250, 180, 320, 410, 380, 520],
    weeklyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    monthlyClicks: [1100, 1450, 1800, 2100, 2600, 2200, 2900, 3200, 2800, 3500, 3100, 3800],
    monthlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    topPlatforms: topPlatforms.length ? topPlatforms : [{ platform: 'spotify', clicks: 0 }],
    trafficSources: [
      { source: 'Direct', percentage: 45 },
      { source: 'Instagram', percentage: 25 },
      { source: 'Twitter/X', percentage: 15 },
      { source: 'Google', percentage: 10 },
      { source: 'Other', percentage: 5 },
    ],
    totalClicks,
    totalViews: totalClicks + 1500,
    mostActiveDay: 'Sunday',
    growthPercentage: 18.5,
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
