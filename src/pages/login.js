// =============================================
// Login Page
// =============================================

import { login } from '../store.js';
import { showToast } from '../components/toast.js';

const LOGO_SVG = `<svg viewBox="0 0 64 64" width="36" height="36" style="flex-shrink:0;"><defs><linearGradient id="noteGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1DB954"/><stop offset="100%" style="stop-color:#14b8a6"/></linearGradient><linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6"/><stop offset="100%" style="stop-color:#6366F1"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="16" fill="#121212" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/><rect x="18" y="34" width="12" height="18" rx="6" fill="none" stroke="url(#noteGrad)" stroke-width="4.5" transform="rotate(-15 24 43)"/><rect x="34" y="30" width="12" height="18" rx="6" fill="none" stroke="url(#linkGrad)" stroke-width="4.5" transform="rotate(-15 40 39)"/><path d="M28 36V17" stroke="url(#noteGrad)" stroke-width="4" stroke-linecap="round"/><path d="M44 32V13" stroke="url(#linkGrad)" stroke-width="4" stroke-linecap="round"/><path d="M28 17C34 15 38 15 44 13" stroke="url(#linkGrad)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M28 23C34 21 38 21 44 19" stroke="url(#noteGrad)" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;


export function renderLogin() {
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
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form class="auth-form" id="login-form">
          <div class="input-group">
            <div style="position:relative;">
              <i data-lucide="user" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:18px;height:18px;color:var(--text-tertiary);pointer-events:none;"></i>
              <input type="text" class="input" style="padding-left:44px;" id="login-username" placeholder="Username" required />
            </div>
          </div>

          <div class="input-group">
            <div style="position:relative;">
              <i data-lucide="lock" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:18px;height:18px;color:var(--text-tertiary);pointer-events:none;"></i>
              <input type="password" class="input" style="padding-left:44px;padding-right:44px;" id="login-password" placeholder="Password" required />
              <button type="button" class="toggle-password-btn" data-target="login-password" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);color:var(--text-tertiary);background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;transition:color 0.2s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='var(--text-tertiary)'">
                <i data-lucide="eye" style="width:18px;height:18px;"></i>
              </button>
            </div>
          </div>

          <div class="auth-extras">
            <label class="checkbox-wrapper">
              <input type="checkbox" checked />
              <span>Remember me</span>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" class="auth-submit">
            Sign In
          </button>
        </form>



        <div class="auth-footer">
          Don't have an account? <a href="#/register">Sign up</a>
        </div>
      </div>
    </div>
  `;
}

export function initLogin() {
  // Toggle password visibility
  const toggleBtns = document.querySelectorAll('.toggle-password-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (input) {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        
        // Update Lucide icon
        const icon = btn.querySelector('i[data-lucide]');
        if (icon) {
          icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
          if (window.lucide) lucide.createIcons();
        }
      }
    });
  });

  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username')?.value;
      const password = document.getElementById('login-password')?.value;

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Signing In...';
      }

      try {
        await login(username, password);
        showToast('Welcome back! 🎵', 'success');
        setTimeout(() => {
          window.location.hash = '#/dashboard';
        }, 500);
      } catch (err) {
        showToast(err.message, 'error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Sign In';
        }
      }
    });
  }
}
