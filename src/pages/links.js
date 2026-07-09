// =============================================
// Music Links Page
// =============================================

import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderTopnav } from '../components/topnav.js';
import { getLinks, deleteLink, toggleLinkStatus, syncLinks } from '../store.js';
import { getPlatform } from '../utils/platforms.js';
import { formatNumber } from '../utils/helpers.js';
import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

function renderLinkCards() {
  const links = getLinks();

  if (links.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i data-lucide="link" style="width:32px;height:32px;"></i>
        </div>
        <h3 class="empty-state-title">No links yet</h3>
        <p class="empty-state-text">Add your first music link to start sharing your music with the world.</p>
        <button class="btn btn-primary" id="empty-add-btn">
          <i data-lucide="plus" style="width:16px;height:16px;"></i>
          Add Your First Link
        </button>
      </div>
    `;
  }

  return `
    <div class="links-grid stagger-children">
      ${links.map(link => {
        const p = getPlatform(link?.platform || '');
        return `
          <div class="link-card" data-link-id="${link?.id || ''}">
            <div class="link-card-header">
              <!-- Fix #3: Tampilkan cover album jika ada, fallback ke ikon platform -->
              <div class="link-card-icon" style="background:${p.bgColor};color:${p.color};overflow:hidden;padding:0;">
                ${link?.image_url
                  ? `<img src="${link.image_url}" alt="cover"
                        style="width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block;"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
                     <span style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:18px;">${p.icon}</span>`
                  : `<span style="font-size:18px;">${p.icon}</span>`
                }
              </div>
              <div class="link-card-info">
                <div class="link-card-title">${link?.title || 'Untitled'}</div>
                <div class="link-card-platform">${p.name}</div>
              </div>
              <div class="link-status">
                <label class="toggle">
                  <input type="checkbox" ${link?.active ? 'checked' : ''} data-toggle-id="${link?.id || ''}" />
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="link-card-url">
              <i data-lucide="external-link"></i>
              <span class="truncate">${link?.url || '#'}</span>
            </div>

            <div class="link-card-footer">
              <div class="link-card-stats">
                <div class="link-card-stat">
                  <i data-lucide="mouse-pointer-click"></i>
                  ${formatNumber(link?.clicks || 0)} clicks
                </div>
                <div class="link-card-stat">
                  <span class="status-dot ${link?.active ? 'status-dot-active' : 'status-dot-inactive'}"></span>
                  ${link?.active ? 'Active' : 'Inactive'}
                </div>
              </div>
              <div class="link-card-actions">
                <button title="Edit" data-edit-id="${link?.id || ''}">
                  <i data-lucide="pencil" style="width:16px;height:16px;"></i>
                </button>
                <button title="Delete" class="delete" data-delete-id="${link?.id || ''}">
                  <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

export function renderLinks() {
  return `
    <div class="dashboard-layout">
      ${renderSidebar('links')}
      ${renderTopnav('Music Links')}

      <main class="main-content page-enter">
        <h1 class="page-title">Music Links</h1>
        <p class="page-subtitle">Manage all your music streaming and social links.</p>

        <!-- Toolbar -->
        <div class="links-toolbar">
          <div class="links-toolbar-left">
            <div class="links-search">
              <i data-lucide="search"></i>
              <input type="text" class="input" placeholder="Search links..." id="links-search-input" />
            </div>
            <div class="links-filter">
              <select class="select" id="links-filter">
                <option value="all">All Platforms</option>
                <option value="spotify">🎵 Spotify</option>
                <option value="applemusic">🍎 Apple Music</option>
                <option value="youtube">▶️ YouTube</option>
                <option value="soundcloud">☁️ SoundCloud</option>
              </select>
            </div>
          </div>
          <button class="btn btn-primary" id="add-link-btn">
            <i data-lucide="plus" style="width:16px;height:16px;"></i>
            Add Link
          </button>
        </div>

        <!-- Links Grid -->
        <div id="links-container">
          <div style="text-align: center; padding: 60px 20px; color: var(--text-tertiary);">
            <div class="skeleton" style="height: 24px; width: 200px; margin: 0 auto 12px; border-radius: 12px;"></div>
            <div class="skeleton" style="height: 16px; width: 140px; margin: 0 auto; border-radius: 8px;"></div>
            <p style="margin-top: 16px;">Loading links data...</p>
          </div>
        </div>

        <!-- FAB for mobile -->
        <button class="fab" id="fab-add-link" title="Add Link">
          <i data-lucide="plus"></i>
        </button>
      </main>
    </div>
  `;
}

export function initLinks() {
  initSidebar();

  // Sync links from remote GORM database upon entering
  syncLinks().then(refreshLinks).catch(refreshLinks);

  // Add link button
  const addBtn = document.getElementById('add-link-btn');
  const fabBtn = document.getElementById('fab-add-link');
  const emptyBtn = document.getElementById('empty-add-btn');

  [addBtn, fabBtn, emptyBtn].forEach(btn => {
    btn?.addEventListener('click', () => openModal());
  });

  // Event delegation for edit, delete, toggle
  document.getElementById('links-container')?.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('[data-edit-id]');
    const deleteBtn = e.target.closest('[data-delete-id]');

    if (editBtn) {
      const id = editBtn.dataset.editId;
      // Get GORM DB ID type is float/uint, cast search locally
      const link = getLinks().find(l => String(l.id) === String(id));
      if (link) openModal(link);
    }

    if (deleteBtn) {
      const id = deleteBtn.dataset.deleteId;
      try {
        await deleteLink(Number(id) || id);
        showToast('Link deleted', 'info');
        refreshLinks();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
  });

  document.getElementById('links-container')?.addEventListener('change', async (e) => {
    const toggle = e.target.closest('[data-toggle-id]');
    if (toggle) {
      const id = toggle.dataset.toggleId;
      try {
        await toggleLinkStatus(Number(id) || id);
        showToast(`Link ${toggle.checked ? 'activated' : 'deactivated'}`, 'info');
        refreshLinks();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
  });

  // Search
  document.getElementById('links-search-input')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.link-card').forEach(card => {
      const title = card.querySelector('.link-card-title')?.textContent.toLowerCase() || '';
      const platform = card.querySelector('.link-card-platform')?.textContent.toLowerCase() || '';
      card.style.display = (title.includes(query) || platform.includes(query)) ? '' : 'none';
    });
  });

  // Filter
  document.getElementById('links-filter')?.addEventListener('change', (e) => {
    const filter = e.target.value;
    document.querySelectorAll('.link-card').forEach(card => {
      if (filter === 'all') {
        card.style.display = '';
      } else {
        const platform = card.querySelector('.link-card-platform')?.textContent.toLowerCase().replace(' ', '') || '';
        card.style.display = platform.includes(filter) ? '' : 'none';
      }
    });
  });

  // Listen for link updates
  window.addEventListener('links-updated', refreshLinks);
}

function refreshLinks() {
  const container = document.getElementById('links-container');
  if (!container) return;

  // Fix #2: Sinkronkan dari backend terlebih dahulu, lalu render ulang
  syncLinks()
    .catch(() => {}) // silent fail — tetap render dari state lokal
    .finally(() => {
      container.innerHTML = renderLinkCards();
      if (window.lucide) lucide.createIcons();

      // Re-attach empty state button (muncul setelah render ulang)
      document.getElementById('empty-add-btn')?.addEventListener('click', () => openModal());
    });
}
