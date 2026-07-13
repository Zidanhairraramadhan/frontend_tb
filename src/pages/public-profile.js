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
    username = hash.replace('#/public/', '').split('?')[0];
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

// ══════════════════════════════════════════════════════
// ── Helper: Embed Player — Spotify · YouTube · Fallback
// ══════════════════════════════════════════════════════

/**
 * Mengkonversi URL YouTube (watch / share / shorts) → embed URL
 * Mengembalikan null jika bukan URL YouTube yang valid.
 */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    // youtu.be/VIDEO_ID
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0];
      return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : null;
    }
    // youtube.com/watch?v=VIDEO_ID  or  /shorts/VIDEO_ID  or  /embed/VIDEO_ID
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) return url; // already embed
      if (u.pathname.startsWith('/shorts/')) {
        const id = u.pathname.split('/shorts/')[1]?.split('?')[0];
        return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : null;
      }
      const id = u.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : null;
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Mengkonversi URL Spotify → embed URL.
 * Mendukung track, album, playlist, episode, artist.
 */
function getSpotifyEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!u.hostname.includes('spotify.com')) return null;
    // open.spotify.com/track/xxx → open.spotify.com/embed/track/xxx
    const embedPath = u.pathname.replace(/^\/(intl-[a-z]+\/)?/, '/');
    return `https://open.spotify.com/embed${embedPath}?utm_source=generator&theme=0`;
  } catch {
    return null;
  }
}

/**
 * Mengkonversi URL SoundCloud → embed URL.
 */
function getSoundCloudEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!u.hostname.includes('soundcloud.com')) return null;
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
  } catch {
    return null;
  }
}

/**
 * Mengkonversi URL Apple Music → embed URL.
 */
function getAppleMusicEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!u.hostname.includes('music.apple.com')) return null;
    return url.replace('music.apple.com', 'embed.music.apple.com');
  } catch {
    return null;
  }
}

// ── renderLinkItem: titik masuk utama ──
function renderLinkItem(link, p) {
  const platform = link?.platform?.toLowerCase() || '';
  const url = link?.url || '';
  const shouldEmbed = link.hasOwnProperty('embed') ? link.embed : true;

  if (shouldEmbed) {
    // ── 1. SPOTIFY EMBED ──────────────────────────────────
    if (platform === 'spotify' || url.includes('spotify.com')) {
      const embedUrl = getSpotifyEmbedUrl(url);
      if (embedUrl) {
        return `
          <div class="embed-player embed-player--spotify" data-link-id="${link?.id || ''}">
            <div class="embed-player__header">
              <div class="embed-player__badge embed-player__badge--spotify">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#1DB954">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Spotify
              </div>
              <div class="embed-player__title">${link?.title || 'Untitled'}</div>
              <a href="${url}" target="_blank" rel="noopener" class="embed-player__open" title="Open in Spotify">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
            <iframe
              src="${embedUrl}"
              width="100%"
              height="152"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style="border-radius:12px;display:block;margin-top:10px;">
            </iframe>
          </div>
        `;
      }
    }

    // ── 2. YOUTUBE EMBED ──────────────────────────────────
    if (platform === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
      const embedUrl = getYouTubeEmbedUrl(url);
      if (embedUrl) {
        return `
          <div class="embed-player embed-player--youtube" data-link-id="${link?.id || ''}">
            <div class="embed-player__header">
              <div class="embed-player__badge embed-player__badge--youtube">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#FF0000">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </div>
              <div class="embed-player__title">${link?.title || 'Untitled'}</div>
              <a href="${url}" target="_blank" rel="noopener" class="embed-player__open" title="Open in YouTube">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
            <div class="embed-player__yt-wrap">
              <iframe
                src="${embedUrl}"
                width="100%"
                height="100%"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy"
                style="border-radius:12px;display:block;position:absolute;inset:0;">
              </iframe>
            </div>
          </div>
        `;
      }
    }

    // ── 3. SOUNDCLOUD EMBED ──────────────────────────────
    if (platform === 'soundcloud' || url.includes('soundcloud.com')) {
      const embedUrl = getSoundCloudEmbedUrl(url);
      if (embedUrl) {
        return `
          <div class="embed-player embed-player--soundcloud" data-link-id="${link?.id || ''}">
            <div class="embed-player__header" style="margin-bottom: 8px;">
              <div class="embed-player__badge embed-player__badge--soundcloud">
                ☁️ SoundCloud
              </div>
              <div class="embed-player__title">${link?.title || 'Untitled'}</div>
              <a href="${url}" target="_blank" rel="noopener" class="embed-player__open" title="Open in SoundCloud">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
            <iframe
              width="100%"
              height="166"
              scrolling="no"
              frameborder="no"
              allow="autoplay; encrypted-media"
              src="${embedUrl}"
              style="border-radius:12px; display:block;">
            </iframe>
          </div>
        `;
      }
    }

    // ── 4. APPLE MUSIC EMBED ─────────────────────────────
    if (platform === 'applemusic' || url.includes('music.apple.com')) {
      const embedUrl = getAppleMusicEmbedUrl(url);
      if (embedUrl) {
        return `
          <div class="embed-player embed-player--applemusic" data-link-id="${link?.id || ''}">
            <div class="embed-player__header" style="margin-bottom: 8px;">
              <div class="embed-player__badge embed-player__badge--applemusic">
                🍎 Apple Music
              </div>
              <div class="embed-player__title">${link?.title || 'Untitled'}</div>
              <a href="${url}" target="_blank" rel="noopener" class="embed-player__open" title="Open in Apple Music">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameborder="0"
              height="175"
              style="width:100%;max-width:660px;overflow:hidden;border-radius:12px;display:block;"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="${embedUrl}">
            </iframe>
          </div>
        `;
      }
    }
  }

  // ── 5. FALLBACK: Link Card (Apple Music, SoundCloud, Instagram, Website, dll) ──
  return `
    <a href="${url || '#'}" target="_blank" rel="noopener" class="public-link-btn"
      data-link-id="${link?.id || ''}"
      style="--btn-color:${p.color};"
      onmouseenter="this.style.borderColor='${p.color}';this.querySelector('.public-link-icon').style.background='${p.bgColor}'"
      onmouseleave="this.style.borderColor='';this.querySelector('.public-link-icon').style.background='${p.bgColor}'">
      <span class="public-link-icon" style="background:${p.bgColor};color:${p.color};">
        ${p.icon}
      </span>
      <span class="public-link-text">${link?.title || 'Untitled'}</span>
      <span class="public-link-arrow">
        <i data-lucide="chevron-right" style="width:18px;height:18px;"></i>
      </span>
    </a>
  `;
}




// ── Helper: Canvas Average Color ──
function getAverageColor(imgElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imgElement.naturalWidth || imgElement.width || 100;
  canvas.height = imgElement.naturalHeight || imgElement.height || 100;
  ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

  try {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let r = 0, g = 0, b = 0, count = 0;
    for (let i = 0; i < data.length; i += 40) {
      if (data[i + 3] > 0) {
        r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
      }
    }
    if (count === 0) return '#1DB954';
    return `rgb(${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)})`;
  } catch {
    return '#1DB954';
  }
}

function renderActiveProfile(data) {
  // Data Contract: { user: { id, username, role, links }, links: [...] }
  const user = data?.user || {};
  const links = data?.links || [];
  const container = document.getElementById('public-profile-container');
  if (!container) return;

  const displayName = user?.username || 'Unknown Artist';
  const profileUrl = `${window.location.origin}/p/${user?.username || ''}`;
  const avatarLetter = (user?.username || '?')[0].toUpperCase();

  container.innerHTML = `
    <!-- Cover -->
    <div class="public-cover" id="public-cover" style="${user?.cover_url ? 'background-image: url(' + user.cover_url + '); background-size: cover; background-position: center;' : 'background: linear-gradient(135deg, #1DB954 0%, #191414 40%, #8B5CF6 100%);'}">
      <div class="public-cover-gradient"></div>
    </div>

    <!-- Profile Header -->
    <div class="public-header">
      <div class="public-avatar" style="${user?.avatar_url ? 'background-image: url(' + user.avatar_url + '); background-size: cover; background-position: center;' : ''}">${user?.avatar_url ? '' : avatarLetter}</div>
      <h1 class="public-name">${displayName}</h1>
      <p class="public-bio">${user?.bio || ''}</p>
      <div class="public-meta">
        <span class="public-meta-item">
          <i data-lucide="map-pin" style="width:14px;height:14px;"></i>
          ${user?.country || 'Worldwide'}
        </span>
        <span class="public-meta-item">
          <i data-lucide="music" style="width:14px;height:14px;"></i>
          ${user?.genre || 'Musician'}
        </span>
      </div>
    </div>

    <!-- Music Links (button atau Spotify iframe) -->
    <div class="public-links stagger-children">
      ${links.map(link => {
    const p = getPlatform(link?.platform || '');
    return renderLinkItem(link, p);
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
        musiclink.io/p/${user?.username || ''}
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
    btn.addEventListener('click', () => {
      const linkId = btn.dataset.linkId;
      if (linkId) incrementClick(linkId);
    });
  });

  // Apply dynamic color from avatar if cover is not custom
  if (user?.avatar_url && !user?.cover_url) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const color = getAverageColor(img);
      const coverEl = document.getElementById('public-cover');
      if (coverEl) {
        coverEl.style.backgroundImage = 'none';
        coverEl.style.background = 'linear-gradient(135deg, ' + color + ' 0%, #111827 100%)';
      }
    };
    img.src = user.avatar_url;
  }

  // Bind Share Buttons
  document.getElementById('share-btn')?.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName} — MusicLink`,
          text: `Check out ${displayName}'s music on MusicLink!`,
          url: profileUrl,
        });
      } catch { }
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
