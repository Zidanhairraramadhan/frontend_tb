// =============================================
// Modal Component
// =============================================

import { PLATFORMS } from '../utils/platforms.js';
import { showToast } from './toast.js';
import { addLink, updateLink } from '../store.js';

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
            <label for="link-title">Title</label>
            <input type="text" class="input" id="link-title" name="title"
              placeholder="e.g., Listen on Spotify" value="${editData?.title || ''}" required />
          </div>

          <div class="input-group">
            <label for="link-url">URL</label>
            <input type="url" class="input" id="link-url" name="url"
              placeholder="https://..." value="${editData?.url || ''}" required />
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
