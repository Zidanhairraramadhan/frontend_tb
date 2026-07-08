// =============================================
// Settings Page
// =============================================

import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderTopnav } from '../components/topnav.js';
import { getSettings, updateSettings } from '../store.js';
import { showToast } from '../components/toast.js';

export function renderSettings() {
  const settings = getSettings();
  const isDark = settings.theme === 'dark';

  return `
    <div class="dashboard-layout">
      ${renderSidebar('settings')}
      ${renderTopnav('Settings')}

      <main class="main-content page-enter">
        <div class="settings-page">
          <h1 class="page-title">Settings</h1>
          <p class="page-subtitle">Customize your MusicLink experience.</p>

          <!-- Appearance -->
          <div class="settings-section">
            <div class="settings-section-header">
              <h3 class="settings-section-title">
                <i data-lucide="palette"></i>
                Appearance
              </h3>
              <p class="settings-section-subtitle">Choose how MusicLink looks to you.</p>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">Theme</div>
                <div class="settings-row-description">Select your preferred theme</div>
              </div>
              <div class="theme-options">
                <div>
                  <div class="theme-option theme-option-dark ${isDark ? 'active' : ''}" data-theme-value="dark">
                    <div class="theme-bar">
                      <div class="theme-dot" style="background:#1DB954;"></div>
                      <div class="theme-dot" style="background:#8B5CF6;"></div>
                    </div>
                  </div>
                  <div class="theme-label">Dark</div>
                </div>
                <div>
                  <div class="theme-option theme-option-light ${!isDark ? 'active' : ''}" data-theme-value="light">
                    <div class="theme-bar">
                      <div class="theme-dot" style="background:#1DB954;"></div>
                      <div class="theme-dot" style="background:#8B5CF6;"></div>
                    </div>
                  </div>
                  <div class="theme-label">Light</div>
                </div>
              </div>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">Language</div>
                <div class="settings-row-description">Choose your language preference</div>
              </div>
              <select class="select" style="max-width:200px;" id="settings-language">
                <option value="en" ${settings.language === 'en' ? 'selected' : ''}>English</option>
                <option value="id" ${settings.language === 'id' ? 'selected' : ''}>Bahasa Indonesia</option>
                <option value="es" ${settings.language === 'es' ? 'selected' : ''}>Español</option>
                <option value="fr" ${settings.language === 'fr' ? 'selected' : ''}>Français</option>
                <option value="de" ${settings.language === 'de' ? 'selected' : ''}>Deutsch</option>
                <option value="ja" ${settings.language === 'ja' ? 'selected' : ''}>日本語</option>
              </select>
            </div>
          </div>

          <!-- Notifications -->
          <div class="settings-section">
            <div class="settings-section-header">
              <h3 class="settings-section-title">
                <i data-lucide="bell"></i>
                Notifications
              </h3>
              <p class="settings-section-subtitle">Manage your notification preferences.</p>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">Email Notifications</div>
                <div class="settings-row-description">Receive updates via email</div>
              </div>
              <label class="toggle">
                <input type="checkbox" ${settings.notifications.email ? 'checked' : ''} data-setting="email" />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">Push Notifications</div>
                <div class="settings-row-description">Receive push notifications in browser</div>
              </div>
              <label class="toggle">
                <input type="checkbox" ${settings.notifications.push ? 'checked' : ''} data-setting="push" />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">Weekly Report</div>
                <div class="settings-row-description">Get a weekly summary of your performance</div>
              </div>
              <label class="toggle">
                <input type="checkbox" ${settings.notifications.weekly ? 'checked' : ''} data-setting="weekly" />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">Milestone Alerts</div>
                <div class="settings-row-description">Get notified when you reach milestones</div>
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
                Security
              </h3>
              <p class="settings-section-subtitle">Manage your password and account security.</p>
            </div>

            <div class="settings-password-form">
              <div class="input-group">
                <label>Current Password</label>
                <input type="password" class="input" placeholder="Enter current password" />
              </div>
              <div class="input-group">
                <label>New Password</label>
                <input type="password" class="input" placeholder="Enter new password" />
              </div>
              <div class="input-group">
                <label>Confirm New Password</label>
                <input type="password" class="input" placeholder="Confirm new password" />
              </div>
              <button class="btn btn-primary" id="change-password-btn" style="align-self:flex-start;">
                <i data-lucide="key" style="width:16px;height:16px;"></i>
                Change Password
              </button>
            </div>
          </div>

          <!-- Danger Zone -->
          <div class="settings-section settings-danger">
            <div class="settings-section-header">
              <h3 class="settings-section-title">
                <i data-lucide="alert-triangle"></i>
                Danger Zone
              </h3>
              <p class="settings-section-subtitle">Irreversible and destructive actions.</p>
            </div>

            <div class="settings-row">
              <div class="settings-row-info">
                <div class="settings-row-title">Delete Account</div>
                <div class="settings-row-description">Permanently delete your account and all data</div>
              </div>
              <button class="btn btn-danger" id="delete-account-btn">
                <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

// ── i18n dictionary (minimal) ──
export const I18N = {
  en: {
    dashboard: 'Dashboard',
    profile:   'My Profile',
    links:     'Music Links',
    settings:  'Settings',
    pageTitle: 'Settings',
    pageSub:   'Customize your MusicLink experience.',
    appearance:'Appearance',
    theme:     'Theme',
    language:  'Language',
    notifications: 'Notifications',
    notifDesc1: 'Manage your notification preferences.',
    notifLabel1: 'Email Updates',
    notifSub1: 'Receive updates via email',
    notifLabel2: 'Push Notifications',
    notifSub2: 'Get push notifications',
    notifLabel3: 'Weekly Report',
    notifSub3: 'Receive weekly analytics report',
    notifLabel4: 'Milestones',
    notifSub4: 'Get notified when you reach a milestone',
    security:  'Security',
    secDesc:   'Manage your account security.',
    dangerZone:'Danger Zone',
    dangerDesc:'Irreversible and destructive actions.',
    delTitle:  'Delete Account',
    delDesc:   'Permanently delete your account and all data',
  },
  id: {
    dashboard: 'Dasbor',
    profile:   'Profil Saya',
    links:     'Tautan Musik',
    settings:  'Pengaturan',
    pageTitle: 'Pengaturan',
    pageSub:   'Sesuaikan pengalaman MusicLink Anda.',
    appearance:'Tampilan',
    theme:     'Tema',
    language:  'Bahasa',
    notifications: 'Notifikasi',
    notifDesc1: 'Kelola preferensi notifikasi Anda.',
    notifLabel1: 'Pembaruan Email',
    notifSub1: 'Terima pembaruan via email',
    notifLabel2: 'Notifikasi Push',
    notifSub2: 'Dapatkan notifikasi push',
    notifLabel3: 'Laporan Mingguan',
    notifSub3: 'Terima laporan analitik mingguan',
    notifLabel4: 'Pencapaian',
    notifSub4: 'Dapatkan notifikasi saat mencapai target',
    security:  'Keamanan',
    secDesc:   'Kelola keamanan akun Anda.',
    dangerZone:'Zona Berbahaya',
    dangerDesc:'Tindakan yang tidak dapat dibatalkan.',
    delTitle:  'Hapus Akun',
    delDesc:   'Hapus akun Anda beserta datanya secara permanen',
  },
};

export function applyLanguage(lang) {
  const t = I18N[lang] || I18N.en;
  localStorage.setItem('lang', lang);

  // Update page title + subtitle
  const pageTitle = document.querySelector('.settings-page .page-title');
  const pageSub   = document.querySelector('.settings-page .page-subtitle');
  if (pageTitle) pageTitle.textContent = t.pageTitle;
  if (pageSub)   pageSub.textContent   = t.pageSub;

  // Update section titles and subtitles
  const sections = document.querySelectorAll('.settings-section-title');
  sections.forEach(el => {
    const icon = el.querySelector('i');
    const iconHtml = icon ? icon.outerHTML : '';
    const txt = el.textContent.trim().toLowerCase();
    const parent = el.closest('.settings-section');
    const subtitle = parent ? parent.querySelector('.settings-section-subtitle') : null;

    if (txt.includes('appear') || txt.includes('tampil')) {
      el.innerHTML = iconHtml + ' ' + t.appearance;
    } else if (txt.includes('notif')) {
      el.innerHTML = iconHtml + ' ' + t.notifications;
      if (subtitle) subtitle.textContent = t.notifDesc1;
      if (parent) {
         const titles = parent.querySelectorAll('.settings-row-title');
         const desc = parent.querySelectorAll('.settings-row-description');
         if(titles[0]) titles[0].textContent = t.notifLabel1;
         if(desc[0]) desc[0].textContent = t.notifSub1;
         if(titles[1]) titles[1].textContent = t.notifLabel2;
         if(desc[1]) desc[1].textContent = t.notifSub2;
         if(titles[2]) titles[2].textContent = t.notifLabel3;
         if(desc[2]) desc[2].textContent = t.notifSub3;
         if(titles[3]) titles[3].textContent = t.notifLabel4;
         if(desc[3]) desc[3].textContent = t.notifSub4;
      }
    } else if (txt.includes('secur') || txt.includes('keaman')) {
      el.innerHTML = iconHtml + ' ' + t.security;
      if (subtitle) subtitle.textContent = t.secDesc;
    } else if (txt.includes('danger') || txt.includes('berba')) {
      el.innerHTML = iconHtml + ' ' + t.dangerZone;
      if (subtitle) subtitle.textContent = t.dangerDesc;
      if (parent) {
         const dTitle = parent.querySelector('.settings-row-title');
         const dDesc = parent.querySelector('.settings-row-description');
         if(dTitle) dTitle.textContent = t.delTitle;
         if(dDesc) dDesc.textContent = t.delDesc;
      }
    }
  });

  // Update sidebar nav labels (if sidebar is in DOM)
  const navMap = {
    'dashboard':  t.dashboard,
    'profile':    t.profile,
    'links':      t.links,
    'settings':   t.settings,
  };
  document.querySelectorAll('.sidebar-link[data-page]').forEach(link => {
    const page = link.dataset.page;
    if (navMap[page]) {
      const span = link.querySelector('span:not(.sidebar-admin-badge)');
      if (span) span.textContent = navMap[page];
    }
  });
}

export function initSettings() {
  initSidebar();

  // Apply saved language on load
  const savedLang = localStorage.getItem('lang') || 'en';
  const langSelect = document.getElementById('settings-language');
  if (langSelect) langSelect.value = savedLang;
  applyLanguage(savedLang);

  // Language change
  langSelect?.addEventListener('change', (e) => {
    applyLanguage(e.target.value);
    showToast(
      e.target.value === 'id' ? 'Bahasa diubah ke Bahasa Indonesia 🇮🇩' : 'Language changed to English 🇬🇧',
      'success'
    );
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
      showToast('Settings updated', 'success');
    });
  });

  // Change password
  document.getElementById('change-password-btn')?.addEventListener('click', () => {
    showToast('Password changed successfully!', 'success');
  });

  // Delete account
  document.getElementById('delete-account-btn')?.addEventListener('click', () => {
    showToast('Account deletion is disabled in demo mode', 'info');
  });
}
