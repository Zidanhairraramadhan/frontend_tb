// =============================================
// My Public Profile View Page
// Menampilkan pratinjau halaman publik milik
// pengguna yang sedang login — data dari store.js
// Layout mengikuti desain Demo / Linktree mockup
// =============================================

import { getUser, getActiveLinks } from '../store.js';
import { getPlatform } from '../utils/platforms.js';
import { incrementClick } from '../store.js';

export function renderMyProfileView() {
  const user = getUser();
  const links = getActiveLinks();

  const platformIcons = {
    spotify:    { color: '#1DB954', bg: 'rgba(29,185,84,0.15)',   svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>` },
    youtube:    { color: '#FF0000', bg: 'rgba(255,0,0,0.12)',      svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>` },
    applemusic: { color: '#FC3C44', bg: 'rgba(252,60,68,0.12)',    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#FC3C44"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.048-2.31-2.08-3.103a9.592 9.592 0 0 0-1.89-.966c-.765-.3-1.58-.45-2.416-.43l-.002-.049h-7.8l-.002.049c-.834-.02-1.65.13-2.415.43a9.592 9.592 0 0 0-1.89.966C2.29 1.624 1.558 2.625 1.24 3.934a9.23 9.23 0 0 0-.24 2.19C.987 6.5 1 6.876 1 7.252v9.496c0 .376-.013.752.0 1.128a9.23 9.23 0 0 0 .24 2.19c.318 1.31 1.05 2.31 2.08 3.103a9.592 9.592 0 0 0 1.89.966c.765.3 1.58.45 2.415.43l.002.049h7.8l.002-.049c.835.02 1.65-.13 2.415-.43a9.592 9.592 0 0 0 1.89-.966c1.03-.793 1.764-1.794 2.08-3.103a9.23 9.23 0 0 0 .24-2.19c.013-.376 0-.752 0-1.128V7.252c0-.376.013-.752 0-1.128z"/></svg>` },
    soundcloud: { color: '#FF5500', bg: 'rgba(255,85,0,0.12)',     svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#FF5500"><path d="M11.56 8.87V17h8.76c1.47 0 2.68-1.21 2.68-2.68 0-1.47-1.21-2.68-2.68-2.68-.14 0-.27.01-.4.03C19.7 9.94 18.32 9 16.72 9c-.34 0-.67.05-.98.13C15.28 7.33 13.54 6 11.56 6c-.3 0-.6.03-.9.09A4.5 4.5 0 0 0 7 10.5c0 .31.03.62.09.91.25-.04.5-.07.75-.07 1.99 0 3.61 1.4 3.91 3.22L11.56 8.87zm-4.3 5.39c-.34-1.53-1.71-2.68-3.35-2.68C1.75 11.58 0 13.33 0 15.46S1.75 19.34 3.91 19.34h7.1v-2.74L11.56 17H7.26v-2.74z"/></svg>` },
    tiktok:     { color: '#fff',    bg: 'rgba(255,255,255,0.08)',   svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.17a8.16 8.16 0 0 0 4.77 1.52V7.23a4.85 4.85 0 0 1-1-.54z"/></svg>` },
    instagram:  { color: '#E1306C', bg: 'rgba(225,48,108,0.12)',   svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#E1306C"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>` },
    website:    { color: '#6366F1', bg: 'rgba(99,102,241,0.12)',   svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#6366F1" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>` },
  };

  function getLinkIcon(platform) {
    return platformIcons[platform] || { color: '#aaa', bg: 'rgba(255,255,255,0.07)', svg: `<i data-lucide="link" style="width:20px;height:20px;"></i>` };
  }

  const linksHtml = links.length === 0
    ? `<div style="text-align:center;padding:24px;color:var(--text-tertiary);font-size:14px;">
         Belum ada link aktif. <a href="#/links" style="color:#1DB954;">Tambahkan sekarang →</a>
       </div>`
    : links.map(link => {
        const p = getPlatform(link?.platform || '');
        const icon = getLinkIcon(link?.platform || '');
        return `
          <a class="myprofile-link-btn" href="${link?.url || '#'}" target="_blank" rel="noopener noreferrer"
             data-link-id="${link?.id || ''}" onclick="window._trackClick && window._trackClick(${link?.id || 0})">
            <div class="myprofile-link-icon" style="background:${icon.bg};">
              ${icon.svg}
            </div>
            <div class="myprofile-link-text">
              <div class="myprofile-link-title">${link?.title || 'Untitled'}</div>
              <div class="myprofile-link-sub">${p.name}</div>
            </div>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="margin-left:auto;opacity:0.4;flex-shrink:0;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        `;
      }).join('');

  const initial = (user?.username || '?')[0].toUpperCase();

  return `
    <div class="myprofile-page">

      <!-- Background orbs -->
      <div class="myprofile-bg">
        <div class="myprofile-orb myprofile-orb-1"></div>
        <div class="myprofile-orb myprofile-orb-2"></div>
      </div>

      <!-- Back to dashboard -->
      <a href="#/dashboard" class="myprofile-back">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Kembali ke Dashboard
      </a>

      <!-- Edit shortcut -->
      <a href="#/profile" class="myprofile-edit-btn">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        Edit Profil
      </a>

      <!-- Profile Card -->
      <div class="myprofile-card">

        <!-- Avatar -->
        <div class="myprofile-avatar-wrap">
          <div class="myprofile-avatar">${initial}</div>
          <div class="myprofile-avatar-ring"></div>
        </div>

        <!-- Identity -->
        <h1 class="myprofile-name">${user?.username || 'Musisi'}</h1>
        <p class="myprofile-handle">@${user?.username || ''}</p>

        ${user?.bio ? `<p class="myprofile-bio">${user.bio}</p>` : ''}

        <!-- Public URL hint -->
        <div class="myprofile-url-chip">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          musiclink.app/${user?.username || ''}
        </div>

        <!-- Divider -->
        <div style="width:100%;height:1px;background:var(--border-color);margin:8px 0;"></div>

        <!-- Links list -->
        <div class="myprofile-links">
          ${linksHtml}
        </div>

        <!-- Stats row -->
        <div class="myprofile-stats">
          <div class="myprofile-stat">
            <span class="myprofile-stat-val">${links.length}</span>
            <span class="myprofile-stat-lbl">Link Aktif</span>
          </div>
          <div class="myprofile-stat">
            <span class="myprofile-stat-val">${links.reduce((s, l) => s + (l.clicks || 0), 0)}</span>
            <span class="myprofile-stat-lbl">Total Klik</span>
          </div>
        </div>

      </div>

      <style>
        .myprofile-page {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 40px 20px 60px; position: relative; overflow: hidden;
          background: var(--bg-primary, #0a0a0a);
        }
        .myprofile-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
        .myprofile-orb {
          position: absolute; border-radius: 50%;
          filter: blur(90px); opacity: 0.15;
        }
        .myprofile-orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #1DB954, transparent 70%);
          top: -150px; right: -150px; animation: mpo1 10s ease-in-out infinite;
        }
        .myprofile-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #8B5CF6, transparent 70%);
          bottom: -100px; left: -100px; animation: mpo2 13s ease-in-out infinite;
        }
        @keyframes mpo1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
        @keyframes mpo2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }

        .myprofile-back, .myprofile-edit-btn {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; gap: 6px;
          text-decoration: none; font-size: 13px; font-weight: 600;
          padding: 6px 14px; border-radius: 8px;
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          color: var(--text-secondary, #aaa);
          transition: all 0.2s; margin-bottom: 12px;
        }
        .myprofile-edit-btn { position: fixed; top: 20px; right: 20px; z-index: 10; background: var(--bg-secondary, #111); }
        .myprofile-back:hover, .myprofile-edit-btn:hover {
          color: var(--text-primary, #fff);
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
        }

        .myprofile-card {
          position: relative; z-index: 1;
          background: var(--glass-bg, rgba(255,255,255,0.03));
          border: 1px solid var(--border-color, rgba(255,255,255,0.08));
          border-radius: 24px; padding: 40px 28px;
          width: 100%; max-width: 440px;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          backdrop-filter: blur(24px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.45);
        }

        .myprofile-avatar-wrap { position: relative; margin-bottom: 4px; }
        .myprofile-avatar {
          width: 88px; height: 88px; border-radius: 50%;
          background: linear-gradient(135deg, #1DB954 0%, #8B5CF6 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 32px; font-weight: 900; color: #fff;
          box-shadow: 0 0 32px rgba(29,185,84,0.3);
        }
        .myprofile-avatar-ring {
          position: absolute; inset: -4px; border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(135deg, #1DB954, #8B5CF6) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out; mask-composite: exclude;
          animation: spin-ring 6s linear infinite;
        }
        @keyframes spin-ring { to { transform: rotate(360deg); } }

        .myprofile-name {
          font-size: 24px; font-weight: 800; color: var(--text-primary, #fff);
          margin: 0; text-align: center; letter-spacing: -0.4px;
        }
        .myprofile-handle {
          font-size: 13px; color: var(--text-tertiary, #666); margin: 0;
        }
        .myprofile-bio {
          font-size: 13px; color: var(--text-secondary, #aaa);
          text-align: center; margin: 0; line-height: 1.5; max-width: 320px;
        }
        .myprofile-url-chip {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(29,185,84,0.1); border: 1px solid rgba(29,185,84,0.2);
          color: #1DB954; border-radius: 100px; padding: 4px 12px;
          font-size: 11px; font-weight: 600;
        }

        .myprofile-links { display: flex; flex-direction: column; gap: 10px; width: 100%; }
        .myprofile-link-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px; border-radius: 14px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
          transition: all 0.2s ease;
        }
        .myprofile-link-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .myprofile-link-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .myprofile-link-title {
          font-size: 14px; font-weight: 700; color: var(--text-primary, #fff);
        }
        .myprofile-link-sub {
          font-size: 11px; color: var(--text-tertiary, #666); margin-top: 2px;
        }
        .myprofile-stats {
          display: flex; gap: 24px; justify-content: center;
          padding-top: 8px; width: 100%;
          border-top: 1px solid var(--border-color, rgba(255,255,255,0.06));
        }
        .myprofile-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .myprofile-stat-val { font-size: 20px; font-weight: 800; color: var(--text-primary, #fff); }
        .myprofile-stat-lbl { font-size: 11px; color: var(--text-tertiary, #666); }
      </style>
    </div>
  `;
}

export function initMyProfileView() {
  // Track klik pada link (fire-and-forget)
  window._trackClick = (id) => {
    incrementClick(id).catch(() => {});
  };

  if (window.lucide) lucide.createIcons();
}
