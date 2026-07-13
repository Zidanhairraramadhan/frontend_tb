// =============================================
// Register Page
// =============================================

import { register } from '../store.js';
import { showToast } from '../components/toast.js';

const LOGO_SVG = `<svg viewBox="0 0 64 64" width="36" height="36" style="flex-shrink:0;"><defs><linearGradient id="noteGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1DB954"/><stop offset="100%" style="stop-color:#14b8a6"/></linearGradient><linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6"/><stop offset="100%" style="stop-color:#6366F1"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="16" fill="#121212" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/><rect x="18" y="34" width="12" height="18" rx="6" fill="none" stroke="url(#noteGrad)" stroke-width="4.5" transform="rotate(-15 24 43)"/><rect x="34" y="30" width="12" height="18" rx="6" fill="none" stroke="url(#linkGrad)" stroke-width="4.5" transform="rotate(-15 40 39)"/><path d="M28 36V17" stroke="url(#noteGrad)" stroke-width="4" stroke-linecap="round"/><path d="M44 32V13" stroke="url(#linkGrad)" stroke-width="4" stroke-linecap="round"/><path d="M28 17C34 15 38 15 44 13" stroke="url(#linkGrad)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M28 23C34 21 38 21 44 19" stroke="url(#noteGrad)" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;


export function renderRegister() {
  return `
    <div class="auth-page">
      <a href="#/" style="position: absolute; top: 24px; left: 24px; display: inline-flex; align-items: center; gap: 8px; color: var(--text-secondary); text-decoration: none; font-size: 14px; font-weight: 500; z-index: 10; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--text-secondary)'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Back to Home
      </a>

      <div class="auth-bg-element auth-bg-1"></div>
      <div class="auth-bg-element auth-bg-2"></div>

      <div class="auth-card">
        <div class="auth-header">
          <a href="#/" class="auth-logo" style="text-decoration:none; cursor:pointer; display:flex; align-items:center; justify-content:center;">
            ${LOGO_SVG}
            <span>Music<span class="text-gradient">Link</span></span>
          </a>
          <h1>Create your account</h1>
          <p>Start sharing your music in seconds</p>
        </div>

        <form class="auth-form" id="register-form">
          <div class="input-group">
            <div style="position:relative;">
              <i data-lucide="user" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:18px;height:18px;color:var(--text-tertiary);pointer-events:none;"></i>
              <input type="text" class="input" style="padding-left:44px;" id="register-name" placeholder="Full name" required />
            </div>
          </div>

          <div class="input-group">
            <div style="position:relative;">
              <i data-lucide="user-check" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:18px;height:18px;color:var(--text-tertiary);pointer-events:none;"></i>
              <input type="text" class="input" style="padding-left:44px;" id="register-username" placeholder="Username (min 4 chars)" required minlength="4" />
            </div>
          </div>

          <div class="input-group">
            <div style="position:relative;">
              <i data-lucide="lock" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:18px;height:18px;color:var(--text-tertiary);pointer-events:none;"></i>
              <input type="password" class="input" style="padding-left:44px;" id="register-password" placeholder="Password (min 6 chars)" required minlength="6" />
            </div>
          </div>

          <div class="input-group">
            <div style="position:relative;">
              <i data-lucide="lock" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:18px;height:18px;color:var(--text-tertiary);pointer-events:none;"></i>
              <input type="password" class="input" style="padding-left:44px;" id="register-confirm" placeholder="Confirm password" required />
            </div>
          </div>

          <label class="checkbox-wrapper">
            <input type="checkbox" required />
            <span>I agree to the <a href="#" style="color:var(--spotify-green);">Terms of Service</a></span>
          </label>

          <button type="submit" class="auth-submit">
            Create Account
          </button>
        </form>



        <div class="auth-footer">
          Already have an account? <a href="#/login">Sign in</a>
        </div>
      </div>
    </div>
  `;
}

export function initRegister() {
  const form = document.getElementById('register-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name')?.value;
      const username = document.getElementById('register-username')?.value;
      const password = document.getElementById('register-password')?.value;
      const confirmPass = document.getElementById('register-confirm')?.value;

      if (password !== confirmPass) {
        showToast('Passwords do not match', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Creating Account...';
      }

      try {
        await register(username, password, name);
        showToast('Registration successful! Please log in.', 'success');
        
        // Redirect to login page
        setTimeout(() => {
          window.location.hash = '#/login';
        }, 500);
      } catch (err) {
        showToast(err.message, 'error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Create Account';
        }
      }
    });
  }
}
