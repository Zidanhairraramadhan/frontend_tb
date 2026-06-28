// =============================================
// Profile Management Page
// =============================================

import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderTopnav } from '../components/topnav.js';
import { getUser, updateUser } from '../store.js';
import { showToast } from '../components/toast.js';

export function renderProfile() {
  const user = getUser();

  return `
    <div class="dashboard-layout">
      ${renderSidebar('profile')}
      ${renderTopnav('My Profile')}

      <main class="main-content page-enter">
        <h1 class="page-title">My Profile</h1>
        <p class="page-subtitle">Manage your artist profile and appearance.</p>

        <!-- Cover Image -->
        <div class="profile-cover-section">
          <div class="profile-cover" style="background: linear-gradient(135deg, #1DB954 0%, #191414 40%, #8B5CF6 100%);"></div>
          <div class="profile-cover-overlay">
            <button class="btn btn-secondary btn-sm">
              <i data-lucide="camera" style="width:14px;height:14px;"></i>
              Change Cover
            </button>
          </div>
        </div>

        <!-- Avatar Section -->
        <div class="profile-avatar-section">
          <div class="profile-avatar-wrapper">
            <div class="profile-avatar">${user.avatarInitial}</div>
            <button class="profile-avatar-edit" title="Change photo">
              <i data-lucide="camera"></i>
            </button>
          </div>
          <div class="profile-info">
            <h2>${user.name}</h2>
            <p>@${user.username} · ${user.genre}</p>
          </div>
        </div>

        <div class="profile-grid">
          <!-- Form Column -->
          <div>
            <!-- Basic Info -->
            <div class="profile-section">
              <h3 class="profile-section-title">
                <i data-lucide="user"></i>
                Basic Information
              </h3>
              <form class="auth-form" id="profile-form">
                <div class="profile-form-grid">
                  <div class="input-group">
                    <label>Artist Name</label>
                    <input type="text" class="input" id="profile-name" value="${user.name}" />
                  </div>
                  <div class="input-group">
                    <label>Username</label>
                    <input type="text" class="input" id="profile-username" value="${user.username}" />
                  </div>
                  <div class="input-group profile-form-full">
                    <label>Bio</label>
                    <textarea class="input" id="profile-bio" rows="3">${user.bio}</textarea>
                  </div>
                  <div class="input-group">
                    <label>Genre</label>
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
                    <label>Country</label>
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
                    Preview
                  </a>
                  <button type="submit" class="btn btn-primary">
                    <i data-lucide="check" style="width:16px;height:16px;"></i>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            <!-- Social Links -->
            <div class="profile-section">
              <h3 class="profile-section-title">
                <i data-lucide="share-2"></i>
                Social Media
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
              <div class="profile-preview-title">Social Preview</div>
              <div class="profile-preview-card">
                <div class="profile-preview-avatar" id="preview-avatar">${user.avatarInitial}</div>
                <div class="profile-preview-name" id="preview-name">${user.name}</div>
                <div class="profile-preview-bio" id="preview-bio">${user.bio}</div>
                <div class="profile-preview-meta">
                  <span><i data-lucide="map-pin" style="width:12px;height:12px;"></i> ${user.country}</span>
                  <span><i data-lucide="music" style="width:12px;height:12px;"></i> ${user.genre}</span>
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

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      updateUser({
        name: nameInput?.value,
        username: document.getElementById('profile-username')?.value,
        bio: bioInput?.value,
        genre: document.getElementById('profile-genre')?.value,
        country: document.getElementById('profile-country')?.value,
        avatarInitial: nameInput?.value.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
      });
      showToast('Profile saved successfully!', 'success');
    });
  }
}
