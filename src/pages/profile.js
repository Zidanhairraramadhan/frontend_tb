// =============================================
// Profile Management Page
// =============================================

import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderTopnav, initTopnavTheme } from '../components/topnav.js';
import { getUser, updateUser } from '../store.js';
import { showToast } from '../components/toast.js';
import { t } from '../utils/translations.js';

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
    
    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += 40) {
      if (data[i+3] > 0) { // If pixel is not fully transparent
        r += data[i];
        g += data[i+1];
        b += data[i+2];
        count++;
      }
    }
    if (count === 0) return '#1DB954';
    return `rgb(${Math.floor(r/count)}, ${Math.floor(g/count)}, ${Math.floor(b/count)})`;
  } catch (e) {
    return '#1DB954';
  }
}

export function renderProfile() {
  const user = getUser();

  return `
    <div class="dashboard-layout">
      ${renderSidebar('profile')}
      ${renderTopnav(t('myProfileTitle'))}

      <main class="main-content page-enter">
        <h1 class="page-title">${t('myProfileTitle')}</h1>
        <p class="page-subtitle">${t('myProfileSub')}</p>

        <!-- Hidden File Inputs -->
        <input type="file" id="cover-input" accept="image/*" hidden />
        <input type="file" id="avatar-input" accept="image/*" hidden />

        <!-- Cover Image -->
        <div class="profile-cover-section">
          <div class="profile-cover" id="profile-cover-preview" style="${user?.cover_url ? 'background-image: url(' + user.cover_url + ');' : 'background: linear-gradient(135deg, #1DB954 0%, #191414 40%, #8B5CF6 100%);'} background-size: cover; background-position: center;"></div>
          <div class="profile-cover-overlay">
            <button class="btn btn-secondary btn-sm" id="btn-change-cover">
              <i data-lucide="camera" style="width:14px;height:14px;"></i>
              ${t('changeCover')}
            </button>
          </div>
        </div>

        <!-- Avatar Section -->
        <div class="profile-avatar-section">
          <div class="profile-avatar-wrapper">
            <div class="profile-avatar" id="profile-avatar-preview" style="background-size: cover; background-position: center; ${user?.avatar_url ? 'background-image: url(' + user.avatar_url + ');' : ''}">${user?.avatar_url ? '' : (user?.username || '?')[0].toUpperCase()}</div>
            <button class="profile-avatar-edit" id="btn-change-avatar" title="${t('changeCover')}">
              <i data-lucide="camera"></i>
            </button>
          </div>
          <div class="profile-info">
            <h2>${user?.username || t('unknown')}</h2>
            <p>@${user?.username || ''} · ${user?.genre || t('musician')}</p>
          </div>
        </div>

        <div class="profile-grid">
          <!-- Form Column -->
          <div>
            <!-- Basic Info -->
            <div class="profile-section">
              <h3 class="profile-section-title">
                <i data-lucide="user"></i>
                ${t('basicInformation')}
              </h3>
              <form class="auth-form" id="profile-form">
                <div class="profile-form-grid">
                  <div class="input-group">
                    <label>${t('artistName')}</label>
                    <input type="text" class="input" id="profile-name" value="${user?.username || ''}" />
                  </div>
                  <div class="input-group">
                    <label>${t('username')}</label>
                    <input type="text" class="input" id="profile-username" value="${user?.username || ''}" />
                  </div>
                  <div class="input-group profile-form-full">
                    <label>${t('bio')}</label>
                    <textarea class="input" id="profile-bio" rows="3">${user?.bio || ''}</textarea>
                  </div>
                  <div class="input-group">
                    <label>${t('genre')}</label>
                    <select class="select" id="profile-genre">
                      <option ${user.genre === 'Electronic / House' ? 'selected' : ''}>Electronic / House</option>
                      <option ${user.genre === 'Hip Hop / Rap' ? 'selected' : ''}>Hip Hop / Rap</option>
                      <option ${user.genre === 'Pop' ? 'selected' : ''}>Pop</option>
                      <option ${user.genre === 'R&B / Soul' ? 'selected' : ''}>R&B / Soul</option>
                      <option ${user.genre === 'Rock' ? 'selected' : ''}>Rock</option>
                      <option ${user.genre === 'Jazz' ? 'selected' : ''}>Jazz</option>
                      <option ${user.genre === 'Classical' ? 'selected' : ''}>Classical</option>
                      <option ${user.genre === 'Country' ? 'selected' : ''}>Country</option>
                      <option ${user.genre === 'Reggae' ? 'selected' : ''}>Reggae</option>
                      <option ${user.genre === 'Other' ? 'selected' : ''}>Other</option>
                    </select>
                  </div>
                  <div class="input-group">
                    <label>${t('country')}</label>
                    <select class="select" id="profile-country">
                      <option ${user.country === 'United States' ? 'selected' : ''}>United States</option>
                      <option ${user.country === 'United Kingdom' ? 'selected' : ''}>United Kingdom</option>
                      <option ${user.country === 'Canada' ? 'selected' : ''}>Canada</option>
                      <option ${user.country === 'Indonesia' ? 'selected' : ''}>Indonesia</option>
                      <option ${user.country === 'Germany' ? 'selected' : ''}>Germany</option>
                      <option ${user.country === 'France' ? 'selected' : ''}>France</option>
                      <option ${user.country === 'Japan' ? 'selected' : ''}>Japan</option>
                      <option ${user.country === 'Australia' ? 'selected' : ''}>Australia</option>
                      <option ${user.country === 'Brazil' ? 'selected' : ''}>Brazil</option>
                    </select>
                  </div>
                </div>

                <div class="profile-actions">
                  <a href="#/public" class="btn btn-secondary">
                    <i data-lucide="eye" style="width:16px;height:16px;"></i>
                    ${t('preview')}
                  </a>
                  <button type="submit" class="btn btn-primary">
                    <i data-lucide="check" style="width:16px;height:16px;"></i>
                    ${t('saveChanges')}
                  </button>
                </div>
              </form>
            </div>

            <!-- Social Links -->
            <div class="profile-section">
              <h3 class="profile-section-title">
                <i data-lucide="share-2"></i>
                ${t('socialMedia')}
              </h3>
              <div class="profile-form-grid">
                <div class="input-group">
                  <label>Instagram</label>
                  <input type="url" class="input" placeholder="https://instagram.com/..." value="https://instagram.com/alexrivera" />
                </div>
                <div class="input-group">
                  <label>Twitter / X</label>
                  <input type="url" class="input" placeholder="https://x.com/..." value="https://x.com/alexrivera" />
                </div>
              </div>
            </div>
          </div>

          <!-- Preview Column -->
          <div>
            <div class="profile-preview">
              <div class="profile-preview-title">${t('socialPreview')}</div>
              <div class="profile-preview-card">
                <div class="profile-preview-avatar" id="preview-avatar" style="${user?.avatar_url ? 'background-image: url(' + user.avatar_url + '); background-size: cover; background-position: center;' : ''}">${user?.avatar_url ? '' : (user?.username || '?')[0].toUpperCase()}</div>
                <div class="profile-preview-name" id="preview-name">${user?.username || t('unknown')}</div>
                <div class="profile-preview-bio" id="preview-bio">${user?.bio || ''}</div>
                <div class="profile-preview-meta">
                  <span><i data-lucide="map-pin" style="width:12px;height:12px;"></i> ${user?.country || t('worldwide')}</span>
                  <span><i data-lucide="music" style="width:12px;height:12px;"></i> ${user?.genre || t('musician')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

export function initProfile() {
  initSidebar();
  initTopnavTheme();

  const form = document.getElementById('profile-form');
  if (form) {
    // Live preview updates
    const nameInput = document.getElementById('profile-name');
    const bioInput = document.getElementById('profile-bio');

    nameInput?.addEventListener('input', (e) => {
      const el = document.getElementById('preview-name');
      if (el) el.textContent = e.target.value;
      const avatar = document.getElementById('preview-avatar');
      if (avatar) {
        const initials = e.target.value.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        avatar.textContent = initials;
      }
    });

    bioInput?.addEventListener('input', (e) => {
      const el = document.getElementById('preview-bio');
      if (el) el.textContent = e.target.value;
    });

    // ── Image Upload Handling (Base64) ──
    const avatarInput = document.getElementById('avatar-input');
    const coverInput = document.getElementById('cover-input');
    const btnAvatar = document.getElementById('btn-change-avatar');
    const btnCover = document.getElementById('btn-change-cover');
    const avatarPreview = document.getElementById('profile-avatar-preview');
    const topnavAvatar = document.querySelector('.topnav-avatar');
    const cardAvatar = document.getElementById('preview-avatar');
    const coverPreview = document.getElementById('profile-cover-preview');

    let currentAvatarUrl = getUser()?.avatar_url || '';
    let currentCoverUrl = getUser()?.cover_url || '';

    // If there is an initial avatar_url but no cover_url, try to extract its color
    if (currentAvatarUrl && !currentCoverUrl && coverPreview) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const color = getAverageColor(img);
        coverPreview.style.backgroundImage = 'none';
        coverPreview.style.background = 'linear-gradient(135deg, ' + color + ' 0%, #111827 100%)';
      };
      img.src = currentAvatarUrl;
    }

    btnAvatar?.addEventListener('click', () => avatarInput.click());
    btnCover?.addEventListener('click', () => coverInput.click());

    avatarInput?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result;
          currentAvatarUrl = base64;
          // Hilangkan inisial teks dan set background image
          if (avatarPreview) {
            avatarPreview.textContent = '';
            avatarPreview.style.backgroundImage = 'url(' + base64 + ')';
          }
          if (topnavAvatar) {
            topnavAvatar.textContent = '';
            topnavAvatar.style.backgroundImage = 'url(' + base64 + ')';
            topnavAvatar.style.backgroundSize = 'cover';
          }
          if (cardAvatar) {
            cardAvatar.textContent = '';
            cardAvatar.style.backgroundImage = 'url(' + base64 + ')';
            cardAvatar.style.backgroundSize = 'cover';
          }
          // Dynamic Cover Color Extraction
          if (!currentCoverUrl && coverPreview) {
            const img = new Image();
            img.onload = () => {
              const color = getAverageColor(img);
              coverPreview.style.backgroundImage = 'none';
              coverPreview.style.background = 'linear-gradient(135deg, ' + color + ' 0%, #111827 100%)';
            };
            img.src = base64;
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });

    coverInput?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result;
          currentCoverUrl = base64;
          if (coverPreview) {
            coverPreview.style.background = 'none'; // reset gradient
            coverPreview.style.backgroundImage = 'url(' + base64 + ')';
            coverPreview.style.backgroundSize = 'cover';
            coverPreview.style.backgroundPosition = 'center';
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      updateUser({
        name: nameInput?.value,
        username: document.getElementById('profile-username')?.value,
        bio: bioInput?.value,
        genre: document.getElementById('profile-genre')?.value,
        country: document.getElementById('profile-country')?.value,
        avatar_url: currentAvatarUrl,
        cover_url: currentCoverUrl,
        avatarInitial: nameInput?.value.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
      });
      showToast(t('profileSaved'), 'success');
    });
  }
}
