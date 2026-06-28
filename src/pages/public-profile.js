// =============================================
// Public Music Profile — Premium Showpiece
// =============================================

import { fetchPublicProfile, incrementClick } from '../store.js';
import { getPlatform } from '../utils/platforms.js';
import { renderQRCode } from '../components/qrcode.js';
import { copyToClipboard } from '../utils/helpers.js';
import { showToast } from '../components/toast.js';
import { renderSkeleton } from '../components/skeleton.js';

export function renderPublicProfile() {
  const waveBars = Array(30).fill(0).map(() =>
    `<div class="music-wave-bar" style="animation-delay:${(Math.random() * 1).toFixed(2)}s;"></div>`
  ).join('');

  return `
    <div class="public-profile">
      <!-- Animated Background -->
      <div class="public-bg">
        <div class="public-bg-orb public-bg-orb-1"></div>
        <div class="public-bg-orb public-bg-orb-2"></div>
        <div class="public-bg-orb public-bg-orb-3"></div>
      </div>

      <!-- Floating Music Notes -->
      <div class="music-notes">
        <div class="music-note">♪</div>
        <div class="music-note">♫</div>
        <div class="music-note">♬</div>
        <div class="music-note">♩</div>
      </div>

      <!-- Music Wave -->
      <div class="music-wave">
        ${waveBars}
      </div>

      <!-- Main Content (Dynamic Container) -->
      <div class="public-content" id="public-profile-container">
        <!-- Initially Render Premium Skeletons -->
        <div style="width:100%;margin-top:40px;">
          <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:30px;">
            <div class="skeleton" style="width:110px;height:110px;border-radius:50%;margin-bottom:16px;"></div>
            <div class="skeleton" style="width:180px;height:24px;border-radius:6px;margin-bottom:12px;"></div>
            <div class="skeleton" style="width:280px;height:16px;border-radius:6px;margin-bottom:8px;"></div>
            <div class="skeleton" style="width:200px;height:16px;border-radius:6px;"></div>
          </div>
          ${renderSkeleton('card', 3)}
        </div>
      </div>
    </div>
  `;
}

export function initPublicProfile() {
  // Parse username from URL hash: e.g. #/public/alex -> alex
  const hash = window.location.hash;
  let username = 'alex'; // Default fallback demo
  
  if (hash.startsWith('#/public/')) {
    username = hash.replace('#/public/', '');
  }

  // Fetch from Golang backend API
  fetchPublicProfile(username)
    .then(data => {
      renderActiveProfile(data);
    })
    .catch(err => {
      const container = document.getElementById('public-profile-container');
      if (container) {
        container.innerHTML = `
          <div style="text-align:center;margin-top:100px;padding:24px;">
            <div style="font-size:48px;margin-bottom:16px;">🔍</div>
            <h2 style="font-size:24px;font-weight:700;margin-bottom:8px;">Profile Not Found</h2>
            <p style="color:var(--text-secondary);margin-bottom:24px;">Artist profile "${username}" could not be located in our database.</p>
            <a href="#/" class="btn btn-primary">Go Home</a>
          </div>
        `;
      }
    });
}

function renderActiveProfile(data) {
  const { user, links } = data;
  const container = document.getElementById('public-profile-container');
  if (!container) return;

  const profileUrl = `${window.location.origin}/#/public/${user.username}`;

  container.innerHTML = `
    <!-- Cover -->
    <div class="public-cover">
      <div class="public-cover-gradient"></div>
    </div>

    <!-- Profile Header -->
    <div class="public-header">
      <div class="public-avatar">${user.avatar_initial}</div>
      <h1 class="public-name">
        ${user.name}
        ${user.verified ? `
          <span class="verified-badge" title="Verified Artist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        ` : ''}
      </h1>
      <p class="public-bio">${user.bio || ''}</p>
      <div class="public-meta">
        <span class="public-meta-item">
          <i data-lucide="map-pin" style="width:14px;height:14px;"></i>
          ${user.country || 'Worldwide'}
        </span>
        <span class="public-meta-item">
          <i data-lucide="music" style="width:14px;height:14px;"></i>
          ${user.genre || 'Musician'}
        </span>
      </div>
    </div>

    <!-- Music Link Buttons -->
    <div class="public-links stagger-children">
      ${links.map(link => {
        const p = getPlatform(link.platform);
        return `
          <a href="${link.url}" target="_blank" rel="noopener" class="public-link-btn"
            data-link-id="${link.id}"
            style="--btn-color:${p.color};"
            onmouseenter="this.style.borderColor='${p.color}';this.querySelector('.public-link-icon').style.background='${p.bgColor}'"
            onmouseleave="this.style.borderColor='';this.querySelector('.public-link-icon').style.background='${p.bgColor}'">
            <span class="public-link-icon" style="background:${p.bgColor};color:${p.color};">
              ${p.icon}
            </span>
            <span class="public-link-text">${link.title}</span>
            <span class="public-link-arrow">
              <i data-lucide="chevron-right" style="width:18px;height:18px;"></i>
            </span>
          </a>
        `;
      }).join('')}
      ${links.length === 0 ? `
        <div style="text-align:center;padding:24px;color:var(--text-tertiary);">
          No links added yet.
        </div>
      ` : ''}
    </div>

    <!-- QR Code -->
    <div class="public-qr-section">
      <div class="public-qr-title">Scan to visit profile</div>
      <div class="public-qr-code" id="public-qr-container"></div>
      <div style="font-size:var(--font-size-xs);color:var(--text-tertiary);margin-top:8px;">
        musiclink.io/${user.username}
      </div>
    </div>

    <!-- Actions -->
    <div class="public-actions">
      <button class="public-share-btn" id="share-btn">
        <i data-lucide="share-2" style="width:16px;height:16px;"></i>
        Share Profile
      </button>
      <button class="public-share-btn" id="copy-link-btn">
        <i data-lucide="copy" style="width:16px;height:16px;"></i>
        Copy Link
      </button>
    </div>

    <!-- Footer -->
    <div class="public-footer">
      <a href="#/" class="public-footer-brand">
        <svg viewBox="0 0 64 64" width="16" height="16" style="flex-shrink:0;"><defs><linearGradient id="noteGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1DB954"/><stop offset="100%" style="stop-color:#14b8a6"/></linearGradient><linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6"/><stop offset="100%" style="stop-color:#6366F1"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="16" fill="#121212" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/><rect x="18" y="34" width="12" height="18" rx="6" fill="none" stroke="url(#noteGrad)" stroke-width="4.5" transform="rotate(-15 24 43)"/><rect x="34" y="30" width="12" height="18" rx="6" fill="none" stroke="url(#linkGrad)" stroke-width="4.5" transform="rotate(-15 40 39)"/><path d="M28 36V17" stroke="url(#noteGrad)" stroke-width="4" stroke-linecap="round"/><path d="M44 32V13" stroke="url(#linkGrad)" stroke-width="4" stroke-linecap="round"/><path d="M28 17C34 15 38 15 44 13" stroke="url(#linkGrad)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M28 23C34 21 38 21 44 19" stroke="url(#noteGrad)" stroke-width="3" fill="none" stroke-linecap="round"/></svg>
        Powered by MusicLink
      </a>
    </div>
  `;

  // Init Lucide
  if (window.lucide) lucide.createIcons();

  // Generate QR Code
  renderQRCode('public-qr-container', profileUrl, 140);

  // Link click counter tracking registration
  container.querySelectorAll('.public-link-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const linkId = btn.dataset.linkId;
      if (linkId) {
        incrementClick(linkId);
      }
    });
  });

  // Share button
  document.getElementById('share-btn')?.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user.name} — MusicLink`,
          text: `Check out ${user.name}'s music on MusicLink!`,
          url: profileUrl,
        });
      } catch {}
    } else {
      await copyToClipboard(profileUrl);
      showToast('Profile link copied to clipboard!', 'success');
    }
  });

  // Copy link button
  document.getElementById('copy-link-btn')?.addEventListener('click', async () => {
    await copyToClipboard(profileUrl);
    showToast('Link copied to clipboard!', 'success');
  });
}
