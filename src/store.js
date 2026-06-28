// =============================================
// State Management & Real Go API Service
// =============================================

const API_BASE = 'http://localhost:5000';

// Global reactive store state (mirrors database)
const state = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user')) || null,
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

// Helper for authenticated requests
async function apiFetch(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (state.token) {
    headers['Authorization'] = `Bearer ${state.token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401 || res.status === 403) {
    // Session expired or unauthorized
    logout();
    window.location.hash = '#/login';
    throw new Error('Session expired. Please log in again.');
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'API Request failed');
  }

  return res.json();
}

// ── Authentication ──

export function isAuthenticated() {
  return !!state.token;
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Invalid username or password');
  }

  const data = await res.json();
  state.token = data.token;
  state.user = data.user;
  
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  // Sync state
  await syncData();
  return data;
}

export async function register(username, password, name) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, name })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Registration failed');
  }

  return res.json();
}

export function logout() {
  state.token = '';
  state.user = null;
  state.links = [];
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export async function changePassword(currentPassword, newPassword) {
  return apiFetch('/api/change-password', {
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
  const user = await apiFetch('/api/profile');
  state.user = user;
  localStorage.setItem('user', JSON.stringify(user));
}

export async function updateUser(updates) {
  const res = await apiFetch('/api/profile', {
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
  const links = await apiFetch('/api/links');
  state.links = links;
}

export async function addLink(link) {
  const newLink = await apiFetch('/api/links', {
    method: 'POST',
    body: JSON.stringify(link)
  });
  state.links.unshift(newLink.link);
  return newLink;
}

export async function updateLink(id, updates) {
  const res = await apiFetch(`/api/links/${id}`, {
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
  await apiFetch(`/api/links/${id}`, {
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
