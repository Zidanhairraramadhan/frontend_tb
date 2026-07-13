// =============================================
// API Service Layer
// Tanggung jawab: Komunikasi HTTP dengan backend
// =============================================

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';


// --- Race Condition Guard ---
// Flag untuk memastikan logout + redirect hanya terjadi SEKALI
// meski ada beberapa request yang mendapat 401 secara bersamaan.
let isHandling401 = false;

/**
 * Mereset flag 401 handler. Dipanggil oleh store saat user login kembali.
 */
export function reset401Flag() {
  isHandling401 = false;
}

/**
 * Wrapper utama untuk semua request HTTP yang memerlukan autentikasi.
 * - Otomatis menyisipkan header Authorization: Bearer <token>
 * - Menangani error HTTP 401/403 secara terpusat (mencegah race condition)
 * - Melempar Error untuk semua respons non-OK lainnya
 *
 * @param {string} endpoint - Path API, contoh: '/api/links'
 * @param {RequestInit} options - Opsi standar fetch() (method, body, dll)
 * @param {string} token - JWT token dari state store
 * @param {function} onUnauthorized - Callback yang dipanggil saat 401/403 terjadi
 * @returns {Promise<any>} - Parsed JSON dari respons
 */
export async function apiFetch(endpoint, options = {}, token = '', onUnauthorized = () => {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // Penanganan 401/403 terpusat dengan guard untuk mencegah race condition
  if (res.status === 401 || res.status === 403) {
    if (!isHandling401) {
      isHandling401 = true;
      onUnauthorized(); // Panggil logout + redirect HANYA SEKALI
    }
    throw new Error('Session expired. Please log in again.');
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'API Request failed');
  }

  return res.json();
}

// ── Authentication ──

/**
 * Melakukan request login ke backend.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{token: string, user: object}>}
 */
export async function loginRequest(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Invalid username or password');
  }

  return res.json();
}

/**
 * Melakukan request registrasi ke backend.
 * @param {string} username
 * @param {string} password
 * @param {string} name
 * @returns {Promise<any>}
 */
export async function registerRequest(username, password, name) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, name }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Registration failed');
  }

  return res.json();
}

// ── Public Profile API ──

export async function fetchPublicProfile(username) {
  const res = await fetch(`${API_BASE}/api/public/u/${username}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Profile not found');
  }
  return res.json();
}

export async function trackLinkClick(linkId) {
  // Asynchronous tracking, no need to await response
  fetch(`${API_BASE}/api/public/link/${linkId}/click`, {
    method: 'POST',
  }).catch((err) => console.error('Failed to track click:', err));
}
