// =============================================
// Modal Component
// =============================================

import { PLATFORMS } from '../utils/platforms.js';
import { showToast } from './toast.js';
import { addLink, updateLink } from '../store.js';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// ── Debounce Helper ──
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ── Universal Auto-Fill Logic ──
function initUniversalAutofill() {
  const urlInput   = document.getElementById('link-url');
  const titleInput = document.getElementById('link-title');
  const preview    = document.getElementById('spotify-preview');
  const loadingEl  = document.getElementById('spotify-loading');
  const coverImg   = document.getElementById('spotify-cover');
  const previewTitle = document.getElementById('spotify-preview-title');

  if (!urlInput) return;

  const fetchMeta = debounce(async (url) => {
    // Cek apakah URL didukung (Spotify, YouTube, SoundCloud, TikTok)
    const isSupported = /spotify\.com|youtube\.com|youtu\.be|soundcloud\.com|tiktok\.com/.test(url);
    
    if (!isSupported) {
      // Sembunyikan preview jika bukan URL yang didukung
      preview.classList.remove('spotify-preview--visible');
      return;
    }

    // Tampilkan loading
    loadingEl.classList.add('spotify-loading--visible');
    preview.classList.remove('spotify-preview--visible');

    try {
      const res = await fetch(
        `${API_BASE}/api/link/metadata?url=${encodeURIComponent(url)}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      // Auto-fill title (hanya jika pengguna belum mengetik apa pun)
      if (data.title && !titleInput.value) {
        titleInput.value = data.title;
        // Animasi input judul
        titleInput.classList.add('input--autofilled');
        setTimeout(() => titleInput.classList.remove('input--autofilled'), 1200);
      }

      // Tampilkan cover preview
      if (data.image) {
        coverImg.src = data.image;
        coverImg.alt = data.title || 'Preview Thumbnail';
        previewTitle.textContent = data.title || '';
        preview.classList.add('spotify-preview--visible');
      }
    } catch (err) {
      // Gagalkan secara diam-diam (silent fail) agar pengguna tetap bisa mengisi manual
      console.warn('[Universal AutoFill]', err.message);
    } finally {
      loadingEl.classList.remove('spotify-loading--visible');
    }
  }, 600);

  urlInput.addEventListener('input', (e) => {
    fetchMeta(e.target.value.trim());
  });

  urlInput.addEventListener('blur', (e) => {
    fetchMeta(e.target.value.trim());
  });
}

export function openModal(editData = null) {
  const root = document.getElementById('modal-root');
  if (!root) return;

  const isEdit = !!editData;
  const title = isEdit ? 'Edit Link' : 'Add New Link';

  const platformOptions = Object.entries(PLATFORMS).map(([key, p]) => {
    const selected = editData?.platform === key ? 'selected' : '';
    return `<option value="${key}" ${selected}>${p.icon} ${p.name}</option>`;
  }).join('');

  root.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close" id="modal-close-btn">
            <i data-lucide="x"></i>
          </button>
        </div>

        <form class="modal-body" id="link-form">
          <div class="input-group">
            <label for="link-platform">Platform</label>
            <select class="select" id="link-platform" name="platform" required>
              <option value="">Select a platform...</option>
              ${platformOptions}
            </select>
          </div>

          <div class="input-group">
            <label for="link-url">URL</label>
            <div style="position:relative;">
              <input type="url" class="input" id="link-url" name="url"
                placeholder="https://open.spotify.com/track/..." value="${editData?.url || ''}"
                required pattern="https?://.+" title="URL harus diawali dengan http:// atau https://" />

              <!-- Loading indicator -->
              <div id="spotify-loading" class="spotify-loading" aria-live="polite">
                <span class="spotify-loading__spinner"></span>
                <span>Mencari data link...</span>
              </div>
            </div>
          </div>

          <!-- Universal Preview Card (Using existing spotify CSS class to preserve styles) -->
          <div id="spotify-preview" class="spotify-preview" role="status" aria-label="Preview Link">
            <img id="spotify-cover" class="spotify-preview__cover" src="" alt="Cover thumbnail" />
            <div class="spotify-preview__info">
              <span class="spotify-preview__badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Link Preview
              </span>
              <p id="spotify-preview-title" class="spotify-preview__title"></p>
            </div>
          </div>

          <div class="input-group">
            <label for="link-title">Judul Tautan</label>
            <input type="text" class="input" id="link-title" name="title"
              placeholder="e.g., Listen on Spotify" value="${editData?.title || ''}" required />
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Add Link'}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Auto-fill title on platform change
  const platformSelect = document.getElementById('link-platform');
  const titleInput = document.getElementById('link-title');
  if (!isEdit) {
    platformSelect.addEventListener('change', (e) => {
      const p = PLATFORMS[e.target.value];
      if (p && !titleInput.value) {
        titleInput.value = `Listen on ${p.name}`;
      }
    });
  }

  // Initialize Universal auto-fill (only on Add mode, or Edit mode)
  initUniversalAutofill();

  // If editing an existing link and it matches supported platforms, trigger autofill
  if (isEdit && editData?.url && /spotify\.com|youtube\.com|youtu\.be|soundcloud\.com|tiktok\.com/.test(editData.url)) {
    // Small delay so DOM is ready
    setTimeout(() => {
      const urlInput = document.getElementById('link-url');
      if (urlInput) urlInput.dispatchEvent(new Event('input'));
    }, 100);
  }

  // Close handlers
  const close = () => { root.innerHTML = ''; };
  document.getElementById('modal-overlay').addEventListener('click', close);
  document.getElementById('modal-close-btn').addEventListener('click', close);
  document.getElementById('modal-cancel-btn').addEventListener('click', close);

  // Submit handler
  document.getElementById('link-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      platform: formData.get('platform'),
      title: formData.get('title'),
      url: formData.get('url'),
    };

    if (isEdit) {
      updateLink(editData.id, data);
      showToast('Link updated successfully!', 'success');
    } else {
      addLink(data);
      showToast('Link added successfully!', 'success');
    }

    close();

    // Trigger re-render of links page
    window.dispatchEvent(new CustomEvent('links-updated'));
  });
}

export function closeModal() {
  const root = document.getElementById('modal-root');
  if (root) root.innerHTML = '';
}
