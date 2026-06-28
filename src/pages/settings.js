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

export function initSettings() {
  initSidebar();

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
