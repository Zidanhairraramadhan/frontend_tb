// =============================================
// Theme Utility
// Tanggung jawab: Manajemen Dark/Light Mode
// =============================================

/**
 * Inisialisasi tema saat aplikasi pertama kali dimuat.
 * Membaca dari localStorage; default: 'dark'.
 * Menerapkan ke <html data-theme="...">
 */
export function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
}

/**
 * Toggle antara dark dan light mode.
 * Menyimpan pilihan ke localStorage dan mendispatch event.
 */
export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
  // Dispatch event agar komponen lain bisa bereaksi
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: next } }));
  return next;
}

/**
 * Menerapkan tema ke element <html>.
 * @param {'dark'|'light'} theme
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Mengembalikan tema yang aktif saat ini.
 * @returns {'dark'|'light'}
 */
export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

/**
 * Mengembalikan apakah saat ini dalam dark mode.
 * @returns {boolean}
 */
export function isDarkMode() {
  return getCurrentTheme() === 'dark';
}
