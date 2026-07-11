// =============================================
// Settings Page
// =============================================

import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderTopnav } from '../components/topnav.js';
import { getSettings, updateSettings } from '../store.js';
import { showToast } from '../components/toast.js';
import { t, getCurrentLang } from '../utils/translations.js';

export function renderSettings() {
  const settings = getSettings();
  const isDark = settings.theme === 'dark';
  const lang = getCurrentLang();

  return `
    <div class="dashboard-layout">
      ${renderSidebar('settings')}
      ${renderTopnav(t('settingsTitle'))}

      <main class="main-content page-enter">
        <div class="settings-page">
          <h1 class="page-title">${t('settingsTitle')}</h1>
          <p class="page-subtitle">${t('settingsSub')}</p>

          <!-- Appearance -->
          <div class="settings-section">
            <div class="settings-section-header">
              <h3 class="settings-section-title">
                <i data-lucide="palette"></i>
                ${t('appearance')}
              </h3>
              <p class="settings-section-subtitle">${t('appearanceDesc')}</p>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">${t('theme')}</div>
                <div class="settings-row-description">${t('themePref')}</div>
              </div>
              <div class="theme-options">
                <div>
                  <div class="theme-option theme-option-dark ${isDark ? 'active' : ''}" data-theme-value="dark">
                    <div class="theme-bar">
                      <div class="theme-dot" style="background:#1DB954;"></div>
                      <div class="theme-dot" style="background:#8B5CF6;"></div>
                    </div>
                  </div>
                  <div class="theme-label">${t('dark')}</div>
                </div>
                <div>
                  <div class="theme-option theme-option-light ${!isDark ? 'active' : ''}" data-theme-value="light">
                    <div class="theme-bar">
                      <div class="theme-dot" style="background:#1DB954;"></div>
                      <div class="theme-dot" style="background:#8B5CF6;"></div>
                    </div>
                  </div>
                  <div class="theme-label">${t('light')}</div>
                </div>
              </div>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">${t('language')}</div>
                <div class="settings-row-description">${t('languagePref')}</div>
              </div>
              <select class="select" style="max-width:200px;" id="settings-language">
                <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
                <option value="id" ${lang === 'id' ? 'selected' : ''}>Bahasa Indonesia</option>
              </select>
            </div>
          </div>

          <!-- Notifications -->
          <div class="settings-section">
            <div class="settings-section-header">
              <h3 class="settings-section-title">
                <i data-lucide="bell"></i>
                ${t('notifications')}
              </h3>
              <p class="settings-section-subtitle">${t('notifDesc')}</p>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">${t('emailNotif')}</div>
                <div class="settings-row-description">${t('emailNotifDesc')}</div>
              </div>
              <label class="toggle">
                <input type="checkbox" ${settings.notifications.email ? 'checked' : ''} data-setting="email" />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">${t('pushNotif')}</div>
                <div class="settings-row-description">${t('pushNotifDesc')}</div>
              </div>
              <label class="toggle">
                <input type="checkbox" ${settings.notifications.push ? 'checked' : ''} data-setting="push" />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">${t('weeklyReport')}</div>
                <div class="settings-row-description">${t('weeklyReportDesc')}</div>
              </div>
              <label class="toggle">
                <input type="checkbox" ${settings.notifications.weekly ? 'checked' : ''} data-setting="weekly" />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">${t('milestoneAlerts')}</div>
                <div class="settings-row-description">${t('milestoneDesc')}</div>
              </div>
              <label class="toggle">
                <input type="checkbox" ${settings.notifications.milestones ? 'checked' : ''} data-setting="milestones" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- Security -->
          <div class="settings-section">
            <div class="settings-section-header">
              <h3 class="settings-section-title">
                <i data-lucide="shield"></i>
                ${t('security')}
              </h3>
              <p class="settings-section-subtitle">${t('securityDesc')}</p>
            </div>

            <div class="settings-password-form">
              <div class="input-group">
                <label>${t('currentPassword')}</label>
                <input type="password" class="input" id="input-current-password" placeholder="${t('currentPassPlaceholder')}" />
              </div>
              <div class="input-group">
                <label>${t('newPassword')}</label>
                <input type="password" class="input" id="input-new-password" placeholder="${t('newPassPlaceholder')}" />
              </div>
              <div class="input-group">
                <label>${t('confirmPassword')}</label>
                <input type="password" class="input" id="input-confirm-password" placeholder="${t('confirmPassPlaceholder')}" />
              </div>
              <button class="btn btn-primary" id="change-password-btn" style="align-self:flex-start;">
                <i data-lucide="key" style="width:16px;height:16px;"></i>
                ${t('changePassword')}
              </button>
            </div>
          </div>

          <!-- Danger Zone -->
          <div class="settings-section settings-danger">
            <div class="settings-section-header">
              <h3 class="settings-section-title">
                <i data-lucide="alert-triangle"></i>
                ${t('dangerZone')}
              </h3>
              <p class="settings-section-subtitle">${t('dangerDesc')}</p>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">${t('deleteAccount')}</div>
                <div class="settings-row-description">${t('deleteAccountDesc')}</div>
              </div>
              <button class="btn btn-danger" id="delete-account-btn">
                <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
                ${t('deleteAccount')}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

/**
 * applyLanguage — Simpan bahasa ke localStorage dan dispatch event global.
 * Seluruh halaman yang mendengarkan 'lang-changed' akan melakukan re-render.
 * @param {string} lang - Kode bahasa ('en' | 'id' | ...)
 */
export function applyLanguage(lang) {
  localStorage.setItem('lang', lang);
  // Dispatch event global agar router.js bisa re-render halaman yang aktif
  window.dispatchEvent(new CustomEvent('lang-changed', { detail: { lang } }));
}

export function initSettings() {
  initSidebar();

  // Language change — re-render seluruh halaman secara reaktif (anti-flicker, anti-redirect)
  const langSelect = document.getElementById('settings-language');
  langSelect?.addEventListener('change', (e) => {
    const newLang = e.target.value;

    // 1. Simpan ke localStorage terlebih dahulu agar t() membaca nilai baru
    localStorage.setItem('lang', newLang);

    // 2. Tampilkan toast dengan teks yang sudah ter-translate
    showToast(t('langChanged'), 'success');

    // 3. Re-render halaman Settings secara in-place (TANPA redirect / reload)
    //    User tetap di halaman Pengaturan — sidebar tidak desync.
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = renderSettings();
      if (window.lucide) lucide.createIcons();
      // Inisialisasi ulang listener setelah re-render
      // CATATAN: initSettings() tidak memanggil applyLanguage() di sini
      // untuk menghindari double-dispatch event 'lang-changed' ke router.
      initSettings();
    }
    // 4. Tidak perlu applyLanguage() / dispatchEvent di sini:
    //    Settings sudah di-render ulang dengan bahasa baru secara langsung.
    //    Router tidak perlu di-notify karena kita masih di halaman yang sama.
  });

  // Theme toggle
  document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.dataset.themeValue;
      document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      document.documentElement.setAttribute('data-theme', theme);
      updateSettings({ theme });
      showToast(`Switched to ${theme} mode`, 'success');
    });
  });

  // Notification toggles
  document.querySelectorAll('[data-setting]').forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const key = e.target.dataset.setting;
      const settings = getSettings();
      settings.notifications[key] = e.target.checked;
      showToast(t('settingsUpdated'), 'success');
    });
  });

  // Change password
  document.getElementById('change-password-btn')?.addEventListener('click', () => {
    showToast(t('passwordChanged'), 'success');
  });

  // Delete account
  document.getElementById('delete-account-btn')?.addEventListener('click', () => {
    showToast('Account deletion is disabled in demo mode', 'info');
  });
}
