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
// Menyimpan image_url hasil fetch agar bisa dikirim ke backend saat submit
let _lastFetchedImageUrl = '';

function initUniversalAutofill() {
  const urlInput     = document.getElementById('link-url');
  const titleInput   = document.getElementById('link-title');
  const preview      = document.getElementById('link-preview');
  const loadingEl    = document.getElementById('link-loading');
  const coverImg     = document.getElementById('link-cover');
  const previewTitle = document.getElementById('link-preview-title');

  if (!urlInput) return;

  // Reset state setiap kali autofill diinit
  _lastFetchedImageUrl = '';

  const fetchMeta = debounce(async (url) => {
    // ── Bypass Khusus Apple Music ──
    const platformSelect = document.getElementById('link-platform');
    if (platformSelect && platformSelect.value === 'applemusic') {
      preview?.classList.remove('spotify-preview--visible');
      loadingEl?.classList.remove('spotify-loading--visible'); // Set loading ke false
      _lastFetchedImageUrl = ''; // Kosongkan image
      return; // Langsung keluar tanpa nge-fetch
    }

    const isSupported = /spotify\.com|youtube\.com|youtu\.be|soundcloud\.com|music\.apple\.com/.test(url);

    if (!isSupported) {
      preview?.classList.remove('spotify-preview--visible');
      return;
    }

    loadingEl?.classList.add('spotify-loading--visible');
    preview?.classList.remove('spotify-preview--visible');

    try {
      const res = await fetch(
        `${API_BASE}/api/link/metadata?url=${encodeURIComponent(url)}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      // ── Fix #1: Auto-fill judul ──
      // Timpa nilai input HANYA jika:
      //   a) metadata punya judul, DAN
      //   b) field masih kosong ATAU berisi teks default "Listen on ..."
      //      (bukan ketikan manual user)
      if (data.title) {
        const currentVal = titleInput.value.trim();
        const isDefault  = currentVal === '' || /^Listen on /i.test(currentVal);
        if (isDefault) {
          titleInput.value = data.title;
          titleInput.classList.add('input--autofilled');
          setTimeout(() => titleInput.classList.remove('input--autofilled'), 1200);
        }
      }

      // Simpan image_url untuk dikirim saat submit
      _lastFetchedImageUrl = data.image || '';

      // Tampilkan preview cover
      if (data.image && coverImg) {
        coverImg.src = data.image;
        coverImg.alt = data.title || 'Cover';
        if (previewTitle) previewTitle.textContent = data.title || '';
        preview?.classList.add('spotify-preview--visible');
      }
    } catch (err) {
      console.warn('[AutoFill]', err.message);
      preview?.classList.remove('spotify-preview--visible');
    } finally {
      loadingEl?.classList.remove('spotify-loading--visible');
    }
  }, 600);

  urlInput.addEventListener('input', (e) => fetchMeta(e.target.value.trim()));
  urlInput.addEventListener('blur',  (e) => fetchMeta(e.target.value.trim()));
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
              <option value="">Pilih platform...</option>
              ${platformOptions}
            </select>
          </div>

          <div class="input-group">
            <label for="link-url">URL</label>
            <div style="position:relative;">
              <input type="url" class="input" id="link-url" name="url"
                placeholder="https://open.spotify.com/track/..."
                value="${editData?.url || ''}"
                required pattern="https?://.+"
                title="URL harus diawali dengan http:// atau https://"
                ${!editData?.platform ? 'disabled' : ''} />

              <!-- Loading indicator -->
              <div id="link-loading" class="spotify-loading" aria-live="polite">
                <span class="spotify-loading__spinner"></span>
                <span>Mengambil info link...</span>
              </div>
            </div>
          </div>

          <!-- Preview Card -->
          <div id="link-preview" class="spotify-preview" role="status" aria-label="Preview Link">
            <img id="link-cover" class="spotify-preview__cover" src="" alt="Cover" />
            <div class="spotify-preview__info">
              <span class="spotify-preview__badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Preview
              </span>
              <p id="link-preview-title" class="spotify-preview__title"></p>
            </div>
          </div>

          <div class="input-group">
            <label for="link-title">Judul Tautan</label>
            <input type="text" class="input" id="link-title" name="title"
              placeholder="e.g., Listen on Spotify"
              value="${editData?.title || ''}" required />
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-primary" id="modal-submit-btn">
              ${isEdit ? 'Save Changes' : 'Add Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Auto-fill judul saat platform dipilih dan penanganan reset URL
  const platformSelect = document.getElementById('link-platform');
  const titleInput     = document.getElementById('link-title');
  const urlInput       = document.getElementById('link-url');
  const previewCard    = document.getElementById('link-preview');

  platformSelect.addEventListener('change', (e) => {
    const p = PLATFORMS[e.target.value];
    
    // Enable/disable input URL sesuai dengan ada tidaknya platform yg dipilih
    if (urlInput) {
      urlInput.disabled = !e.target.value;
      urlInput.value = ''; // Selalu kosongkan URL jika platform ganti
    }
    
    // Set judul default atau kosongkan jika platform dihapus
    if (titleInput) {
      titleInput.value = p ? `Listen on ${p.name}` : '';
    }

    // Sembunyikan preview card
    previewCard?.classList.remove('spotify-preview--visible');
    _lastFetchedImageUrl = '';
  });

  // Inisialisasi autofill metadata
  initUniversalAutofill();

  // Jika mode edit + URL didukung → trigger autofill agar preview muncul
  if (isEdit && editData?.url && /spotify\.com|youtube\.com|youtu\.be|soundcloud\.com|music\.apple\.com/.test(editData.url)) {
    setTimeout(() => {
      document.getElementById('link-url')?.dispatchEvent(new Event('input'));
    }, 100);
  }

  // Close handlers
  const close = () => { root.innerHTML = ''; };
  document.getElementById('modal-overlay').addEventListener('click', close);
  document.getElementById('modal-close-btn').addEventListener('click', close);
  document.getElementById('modal-cancel-btn').addEventListener('click', close);

  // ── Fix #2: Submit handler — async agar list langsung refresh ──
  document.getElementById('link-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('modal-submit-btn');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Menyimpan...'; }

    const formData = new FormData(e.target);
    const data = {
      platform:  formData.get('platform'),
      title:     formData.get('title'),
      url:       formData.get('url'),
      // Fix #3 (sumber): simpan image_url dari hasil autofill agar backend bisa menyimpannya
      image_url: _lastFetchedImageUrl || editData?.image_url || '',
    };

    try {
      if (isEdit) {
        await updateLink(editData.id, data);
        showToast('Link berhasil diperbarui!', 'success');
      } else {
        await addLink(data);
        showToast('Link berhasil ditambahkan!', 'success');
      }
    } catch (err) {
      showToast(err?.message || 'Terjadi kesalahan, coba lagi.', 'error');
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = isEdit ? 'Save Changes' : 'Add Link'; }
      return; // Jangan tutup modal jika gagal
    }

    close();

    // Fix #2: Picu re-render list secara reaktif — tanpa F5
    window.dispatchEvent(new CustomEvent('links-updated'));
  });
}

export function closeModal() {
  const root = document.getElementById('modal-root');
  if (root) root.innerHTML = '';
}
