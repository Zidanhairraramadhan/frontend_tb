// =============================================
// Register Page
// =============================================

import { login } from '../store.js';
import { showToast } from '../components/toast.js';

const LOGO_SVG = `<svg viewBox="0 0 64 64" width="36" height="36" style="flex-shrink:0;"><defs><linearGradient id="noteGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1DB954"/><stop offset="100%" style="stop-color:#14b8a6"/></linearGradient><linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6"/><stop offset="100%" style="stop-color:#6366F1"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="16" fill="#121212" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/><rect x="18" y="34" width="12" height="18" rx="6" fill="none" stroke="url(#noteGrad)" stroke-width="4.5" transform="rotate(-15 24 43)"/><rect x="34" y="30" width="12" height="18" rx="6" fill="none" stroke="url(#linkGrad)" stroke-width="4.5" transform="rotate(-15 40 39)"/><path d="M28 36V17" stroke="url(#noteGrad)" stroke-width="4" stroke-linecap="round"/><path d="M44 32V13" stroke="url(#linkGrad)" stroke-width="4" stroke-linecap="round"/><path d="M28 17C34 15 38 15 44 13" stroke="url(#linkGrad)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M28 23C34 21 38 21 44 19" stroke="url(#noteGrad)" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;


export function renderRegister() {
  return `
    <div class="auth-page">
      <div class="auth-bg-element auth-bg-1"></div>
      <div class="auth-bg-element auth-bg-2"></div>

      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">
            ${LOGO_SVG}
            <span>Music<span class="text-gradient">Link</span></span>
          </div>
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
              <input type="text" class="input" style="padding-left:44px;" id="register-username" placeholder="Username (min 4 chars)" required />
            </div>
          </div>

          <div class="input-group">
            <div style="position:relative;">
              <i data-lucide="lock" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:18px;height:18px;color:var(--text-tertiary);pointer-events:none;"></i>
              <input type="password" class="input" style="padding-left:44px;" id="register-password" placeholder="Password (min 6 chars)" required />
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

        <div class="auth-divider">
          <span>or continue with</span>
        </div>

        <div class="auth-social">
          <button class="auth-social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button class="auth-social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </button>
        </div>

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
        showToast('Registration successful! Logging in...', 'success');
        
        // Auto Login
        await login(username, password);
        setTimeout(() => {
          window.location.hash = '#/dashboard';
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
