// =============================================
// Admin — Manage Users Page
// Hanya dapat diakses oleh pengguna dengan role: 'admin'
// =============================================

import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderTopnav, initTopnavTheme } from '../components/topnav.js';
import { getUser, isAuthenticated } from '../store.js';
import { API_BASE } from '../services/api.js';
import { showToast } from '../components/toast.js';

// ── Fetch all users dari backend (admin only endpoint) ──
async function fetchAllUsers() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/api/admin/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Gagal memuat data pengguna.');
  return res.json();
}

// ── Helper: render daftar musik seorang user (untuk accordion) ──
function renderUserMusicList(links = []) {
  if (!links || links.length === 0) {
    return `<span style="font-size:12px;color:var(--text-tertiary);font-style:italic;">Belum ada musik ditambahkan.</span>`;
  }

  return links.map(link => {
    const isSpotify = link?.url && link.url.includes('open.spotify.com');
    return `
      <div class="admin-music-item">
        ${isSpotify ? `
          <span class="admin-music-badge admin-music-badge-spotify">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            Spotify
          </span>
        ` : `<span class="admin-music-badge">Link</span>`}
        <div class="admin-music-title">${link?.title || 'Tanpa Judul'}</div>
        <a href="${link?.url || '#'}" target="_blank" rel="noopener" class="admin-music-url" title="${link?.url || ''}">
          ${link?.url || '-'}
        </a>
      </div>
    `;
  }).join('');
}

// ── Render tabel pengguna ──
function renderUserTable(users = []) {
  if (!users.length) {
    return `
      <tr>
        <td colspan="7" style="text-align:center;padding:40px;color:var(--text-tertiary);">
          Tidak ada data pengguna.
        </td>
      </tr>
    `;
  }

  return users.map((u, i) => {
    const links = u?.links || [];
    const uid = `music-accordion-${u?.id || i}`;
    const linkCount = links.length;
    return `
      <tr class="admin-table-row">
        <td class="admin-table-cell">${i + 1}</td>
        <td class="admin-table-cell">
          <div style="display:flex;align-items:center;gap:10px;">
            ${u?.avatar_url && u.avatar_url.trim() !== ''
              ? `<img src="${u.avatar_url}" alt="${u.username || 'user'}" class="admin-avatar-img" />`
              : `<div class="admin-avatar">${(u?.username || '?')[0].toUpperCase()}</div>`
            }
            <div>
              <div style="font-weight:600;color:var(--text-primary);">@${u?.username || '-'}</div>
              <div style="font-size:12px;color:var(--text-tertiary);">${u?.role || 'user'}</div>
            </div>
          </div>
        </td>
        <td class="admin-table-cell" style="color:var(--text-secondary);">${u?.id || '-'}</td>
        <td class="admin-table-cell">
          <span class="admin-role-badge ${u?.role === 'admin' ? 'admin-role-admin' : 'admin-role-user'}">
            ${u?.role || 'user'}
          </span>
        </td>
        <td class="admin-table-cell" style="color:var(--text-secondary);">
          ${u?.created_at ? new Date(u.created_at).toLocaleDateString('id-ID') : '-'}
        </td>

        <!-- ── Kolom Musik ── -->
        <td class="admin-table-cell">
          <button
            class="admin-music-toggle"
            data-target="${uid}"
            aria-expanded="false"
            title="Lihat musik yang ditambahkan">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            ${linkCount} lagu
            <svg class="admin-music-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          <!-- Accordion panel -->
          <div class="admin-music-panel" id="${uid}">
            <div class="admin-music-panel-inner">
              <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-tertiary);margin-bottom:8px;">
                Musik yang dimasukkan:
              </div>
              ${renderUserMusicList(links)}
            </div>
          </div>
        </td>

        <td class="admin-table-cell">
          <div style="display:flex;gap:8px;">
            <button class="btn btn-secondary admin-edit-user-btn" style="padding:4px 12px;font-size:12px;" data-user-id="${u?.id || ''}" data-username="${u?.username || ''}" title="Reset Password">
              <i data-lucide="pencil" style="width:12px;height:12px;"></i>
            </button>
            <button class="btn admin-delete-user-btn" style="padding:4px 12px;font-size:12px;background:rgba(239,68,68,0.1);color:#EF4444;border:1px solid rgba(239,68,68,0.2);" data-user-id="${u?.id || ''}" data-username="${u?.username || ''}" title="Hapus Pengguna">
              <i data-lucide="trash-2" style="width:12px;height:12px;"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

export function renderAdminUsers() {
  const user = getUser();

  // Guard: jika bukan admin, tampilkan pesan akses ditolak
  if (user.role !== 'admin') {
    return `
      <div class="dashboard-layout">
        ${renderSidebar('admin_users')}
        ${renderTopnav('Manage Users')}
        <main class="main-content page-enter" style="display:flex;align-items:center;justify-content:center;">
          <div style="text-align:center;padding:60px 20px;">
            <div style="font-size:64px;margin-bottom:16px;">🔒</div>
            <h2 style="color:var(--text-primary);margin-bottom:8px;">Akses Ditolak</h2>
            <p style="color:var(--text-secondary);">Halaman ini hanya dapat diakses oleh Administrator.</p>
            <a href="#/dashboard" class="btn btn-primary" style="margin-top:20px;">Kembali ke Dashboard</a>
          </div>
        </main>
      </div>
    `;
  }

  return `
    <div class="dashboard-layout">
      ${renderSidebar('admin_users')}
      ${renderTopnav('Manage Users')}

      <main class="main-content page-enter">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <div>
            <h1 class="page-title">Manage Users</h1>
            <p class="page-subtitle">Daftar seluruh pengguna yang terdaftar di platform.</p>
          </div>
          <span class="admin-role-badge admin-role-admin" style="align-self:flex-start;">
            <i data-lucide="shield-check" style="width:12px;height:12px;display:inline;"></i>
            Admin Panel
          </span>
        </div>

        <!-- Stats bar -->
        <div id="admin-stats-bar" style="display:flex;gap:16px;margin-bottom:24px;">
          <div class="stat-card" style="flex:1;padding:16px 20px;">
            <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:4px;">Total Pengguna</div>
            <div id="admin-total-users" style="font-size:24px;font-weight:800;color:var(--text-primary);">—</div>
          </div>
          <div class="stat-card" style="flex:1;padding:16px 20px;">
            <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:4px;">Admin</div>
            <div id="admin-total-admins" style="font-size:24px;font-weight:800;color:#8B5CF6;">—</div>
          </div>
          <div class="stat-card" style="flex:1;padding:16px 20px;">
            <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:4px;">Regular Users</div>
            <div id="admin-total-regulars" style="font-size:24px;font-weight:800;color:#1DB954;">—</div>
          </div>
        </div>

        <!-- Search + Filter bar -->
        <div style="margin-bottom:16px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          <div style="position:relative;flex:1;min-width:200px;max-width:320px;">
            <i data-lucide="search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:var(--text-tertiary);pointer-events:none;"></i>
            <input type="text" class="input" style="padding-left:40px;" placeholder="Cari nama atau username..." id="admin-search-input" />
          </div>
          <!-- Filter Role -->
          <select class="select" id="admin-role-filter" style="max-width:160px;">
            <option value="all">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <!-- Urutkan -->
          <select class="select" id="admin-sort" style="max-width:140px;">
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </div>

        <!-- Table -->
        <div class="admin-table-wrapper">
          <table class="admin-table" id="admin-user-table">
            <thead>
              <tr class="admin-table-head">
                <th class="admin-table-th">#</th>
                <th class="admin-table-th">Pengguna</th>
                <th class="admin-table-th">ID Pengguna</th>
                <th class="admin-table-th">Role</th>
                <th class="admin-table-th">Terdaftar</th>
                <th class="admin-table-th">Musik</th>
                <th class="admin-table-th">Aksi</th>
              </tr>
            </thead>
            <tbody id="admin-user-tbody">
              <tr>
                <td colspan="6" style="text-align:center;padding:40px;">
                  <div class="skeleton" style="height:20px;width:200px;margin:0 auto;"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>

    <style>
      .admin-table-wrapper {
        background: var(--glass-bg, rgba(255,255,255,0.03));
        border: 1px solid var(--border-color, rgba(255,255,255,0.08));
        border-radius: 16px;
        overflow: hidden;
        overflow-x: auto;
      }
      .admin-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        min-width: 640px;
      }
      .admin-table-head { background: rgba(255,255,255,0.04); }
      .admin-table-th {
        padding: 12px 16px;
        text-align: left;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-tertiary);
        border-bottom: 1px solid var(--border-color);
      }
      .admin-table-row { transition: background 0.15s; }
      .admin-table-row:hover { background: rgba(255,255,255,0.03); }
      .admin-table-row:not(:last-child) { border-bottom: 1px solid var(--border-color); }
      .admin-table-cell { padding: 14px 16px; vertical-align: middle; }
      .admin-avatar {
        width: 32px; height: 32px; border-radius: 8px;
        background: linear-gradient(135deg, #1DB954, #8B5CF6);
        display: flex; align-items: center; justify-content: center;
        font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0;
      }
      .admin-avatar-img {
        width: 36px; height: 36px; border-radius: 50%;
        object-fit: cover; flex-shrink: 0;
      }
      .admin-role-badge {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 3px 10px; border-radius: 100px;
        font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
      }
      .admin-role-admin  { background: rgba(139,92,246,0.15); color: #8B5CF6; }
      .admin-role-user   { background: rgba(29,185,84,0.12);  color: #1DB954; }

      /* ── Musik Accordion ── */
      .admin-music-toggle {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 4px 10px; border-radius: 100px;
        font-size: 11px; font-weight: 600;
        background: rgba(29,185,84,0.1); color: #1DB954;
        border: 1px solid rgba(29,185,84,0.2);
        cursor: pointer; white-space: nowrap;
        transition: all 0.15s;
      }
      .admin-music-toggle:hover {
        background: rgba(29,185,84,0.18);
        border-color: rgba(29,185,84,0.4);
      }
      .admin-music-toggle[aria-expanded="true"] .admin-music-chevron {
        transform: rotate(180deg);
      }
      .admin-music-chevron { transition: transform 0.25s ease; flex-shrink: 0; }

      .admin-music-panel {
        overflow: hidden;
        max-height: 0;
        transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .admin-music-panel.is-open {
        max-height: 500px;
      }
      .admin-music-panel-inner {
        padding-top: 10px;
        display: flex; flex-direction: column; gap: 8px;
        min-width: 260px;
      }
      .admin-music-item {
        display: flex; flex-direction: column; gap: 2px;
        padding: 8px 10px;
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--border-color);
        border-radius: 8px;
      }
      .admin-music-badge {
        display: inline-flex; align-items: center; gap: 4px;
        font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
        padding: 2px 7px; border-radius: 100px; width: fit-content;
        background: rgba(255,255,255,0.08); color: var(--text-tertiary);
      }
      .admin-music-badge-spotify {
        background: rgba(29,185,84,0.15); color: #1DB954;
      }
      .admin-music-title {
        font-size: 13px; font-weight: 600; color: var(--text-primary);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px;
      }
      .admin-music-url {
        font-size: 11px; color: var(--text-tertiary);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px;
        text-decoration: none;
      }
      .admin-music-url:hover { color: #1DB954; text-decoration: underline; }

      /* ── Admin Modal ── */
      .admin-modal {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      .admin-modal.is-open {
        display: flex;
      }
      .admin-modal-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(4px);
      }
      .admin-modal-content {
        position: relative;
        background: #18181b;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        width: 100%;
        max-width: 440px;
        padding: 24px;
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.04);
        z-index: 1;
        animation: modalScale 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .admin-modal-content-danger {
        border-color: rgba(239,68,68,0.2);
      }
      @keyframes modalScale {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .admin-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      }
      .admin-modal-header h3 {
        font-size: 16px;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
      }
      .admin-modal-close {
        background: none;
        border: none;
        color: var(--text-tertiary);
        font-size: 20px;
        cursor: pointer;
        transition: color 0.15s;
      }
      .admin-modal-close:hover {
        color: var(--text-primary);
      }
      .admin-modal-body {
        margin-bottom: 20px;
      }
      .admin-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }
    </style>
  `;
}

export function initAdminUsers() {
  initSidebar();
  initTopnavTheme();

  const tbody = document.getElementById('admin-user-tbody');
  const searchInput = document.getElementById('admin-search-input');
  let allUsers = [];

  // Load data pengguna dari API
  fetchAllUsers()
    .then(data => {
      // Backend mungkin mengembalikan array langsung atau { users: [...] }
      allUsers = Array.isArray(data) ? data : (data.users || []);

      // Update stats
      const admins = allUsers.filter(u => u.role === 'admin').length;
      const regulars = allUsers.length - admins;
      document.getElementById('admin-total-users')?.setAttribute('data-val', allUsers.length);
      if (document.getElementById('admin-total-users')) document.getElementById('admin-total-users').textContent = allUsers.length;
      if (document.getElementById('admin-total-admins')) document.getElementById('admin-total-admins').textContent = admins;
      if (document.getElementById('admin-total-regulars')) document.getElementById('admin-total-regulars').textContent = regulars;

      // Render tabel
      if (tbody) tbody.innerHTML = renderUserTable(allUsers);
      if (window.lucide) lucide.createIcons();
      initMusicAccordions();
    })
    .catch(err => {
      showToast('Gagal memuat data pengguna: ' + err.message, 'error');
      if (tbody) tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center;padding:40px;color:var(--text-tertiary);">
            Gagal memuat data. Pastikan endpoint <code>/api/admin/users</code> tersedia.
          </td>
        </tr>
      `;
    });

  // ── Helpers ──
  function applyFilters() {
    const q      = (document.getElementById('admin-search-input')?.value || '').toLowerCase();
    const role   = document.getElementById('admin-role-filter')?.value || 'all';
    const sort   = document.getElementById('admin-sort')?.value || 'asc';

    let result = allUsers
      .filter(u =>
        (u?.username || '').toLowerCase().includes(q) ||
        (u?.role || '').toLowerCase().includes(q)
      )
      .filter(u => role === 'all' || (u?.role || 'user') === role)
      .sort((a, b) => {
        const na = (a?.username || '').toLowerCase();
        const nb = (b?.username || '').toLowerCase();
        return sort === 'asc' ? na.localeCompare(nb) : nb.localeCompare(na);
      });

    if (tbody) {
      tbody.innerHTML = renderUserTable(result);
      if (window.lucide) lucide.createIcons();
      initMusicAccordions();
    }
  }

  // Fitur pencarian (client-side filter)
  document.getElementById('admin-search-input')?.addEventListener('input', applyFilters);
  document.getElementById('admin-role-filter')?.addEventListener('change', applyFilters);
  document.getElementById('admin-sort')?.addEventListener('change', applyFilters);

  // Event delegation untuk tombol Edit & Delete
  tbody?.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.admin-edit-user-btn');
    if (editBtn) {
      const userId = editBtn.dataset.userId;
      const username = editBtn.dataset.username;
      showResetPasswordModal(userId, username);
      return;
    }

    const deleteBtn = e.target.closest('.admin-delete-user-btn');
    if (deleteBtn) {
      const userId = deleteBtn.dataset.userId;
      const username = deleteBtn.dataset.username;
      
      const currentUser = getUser();
      if (userId === currentUser.id) {
        showToast('Anda tidak dapat menghapus akun Anda sendiri.', 'error');
        return;
      }

      showDeleteUserModal(userId, username, () => {
        initAdminUsers();
      });
      return;
    }
  });
}

// ── Event delegation untuk accordion Musik ──
function initMusicAccordions() {
  document.querySelectorAll('.admin-music-toggle').forEach(btn => {
    // Hindari duplikat listener
    btn.replaceWith(btn.cloneNode(true));
  });

  document.querySelectorAll('.admin-music-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const panel = document.getElementById(targetId);
      if (!panel) return;

      const isOpen = panel.classList.contains('is-open');
      // Tutup semua panel lain
      document.querySelectorAll('.admin-music-panel.is-open').forEach(p => {
        p.classList.remove('is-open');
        p.previousElementSibling?.setAttribute('aria-expanded', 'false');
      });
      // Toggle panel ini
      if (!isOpen) {
        panel.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ── Custom Premium Admin Modals ──
function showResetPasswordModal(userId, username) {
  const modalId = 'admin-reset-pw-modal';
  let modal = document.getElementById(modalId);
  if (!modal) {
    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'admin-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="admin-modal-backdrop"></div>
    <div class="admin-modal-content">
      <div class="admin-modal-header">
        <h3>Reset Password untuk @${username}</h3>
        <button class="admin-modal-close">&times;</button>
      </div>
      <div class="admin-modal-body">
        <label style="display:block;margin-bottom:8px;font-size:13px;color:var(--text-secondary);">Masukkan Password Baru (Min 6 karakter):</label>
        <input type="password" id="admin-new-password" class="input" style="width:100%;margin-bottom:16px;" placeholder="Password baru" />
      </div>
      <div class="admin-modal-footer">
        <button class="btn btn-secondary admin-modal-cancel">Batal</button>
        <button class="btn btn-primary admin-modal-submit" style="background:#8B5CF6;border-color:#8B5CF6;">Reset Password</button>
      </div>
    </div>
  `;

  modal.classList.add('is-open');

  const close = () => modal.classList.remove('is-open');
  modal.querySelector('.admin-modal-close').addEventListener('click', close);
  modal.querySelector('.admin-modal-cancel').addEventListener('click', close);
  modal.querySelector('.admin-modal-backdrop').addEventListener('click', close);

  modal.querySelector('.admin-modal-submit').addEventListener('click', async () => {
    const passwordInput = document.getElementById('admin-new-password');
    const newPassword = passwordInput.value.trim();
    if (newPassword.length < 6) {
      showToast('Password baru harus minimal 6 karakter.', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}/password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password: newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal mengubah password.');

      showToast(data.message || 'Password berhasil diubah!', 'success');
      close();
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

function showDeleteUserModal(userId, username, onDeleteSuccess) {
  const modalId = 'admin-delete-user-modal';
  let modal = document.getElementById(modalId);
  if (!modal) {
    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'admin-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="admin-modal-backdrop"></div>
    <div class="admin-modal-content admin-modal-content-danger">
      <div class="admin-modal-header">
        <h3>Hapus Pengguna @${username}</h3>
        <button class="admin-modal-close">&times;</button>
      </div>
      <div class="admin-modal-body">
        <p style="margin-bottom:16px;font-size:14px;color:var(--text-secondary);line-height:1.5;">
          Apakah Anda yakin ingin menghapus pengguna <strong style="color:var(--text-primary);">@${username}</strong>? 
          Tindakan ini permanen dan akan menghapus semua link serta log klik pengguna tersebut.
        </p>
        <p style="margin-bottom:16px;font-size:13px;color:#EF4444;font-weight:600;">
          Ketik <strong>CONFIRM</strong> di bawah ini untuk melanjutkan:
        </p>
        <input type="text" id="admin-delete-confirm" class="input" style="width:100%;margin-bottom:16px;border-color:rgba(239,68,68,0.3);" placeholder="Ketik CONFIRM" />
      </div>
      <div class="admin-modal-footer">
        <button class="btn btn-secondary admin-modal-cancel">Batal</button>
        <button class="btn admin-modal-submit" style="background:#EF4444;border-color:#EF4444;color:#fff;">Hapus Pengguna</button>
      </div>
    </div>
  `;

  modal.classList.add('is-open');

  const close = () => modal.classList.remove('is-open');
  modal.querySelector('.admin-modal-close').addEventListener('click', close);
  modal.querySelector('.admin-modal-cancel').addEventListener('click', close);
  modal.querySelector('.admin-modal-backdrop').addEventListener('click', close);

  modal.querySelector('.admin-modal-submit').addEventListener('click', async () => {
    const confirmInput = document.getElementById('admin-delete-confirm');
    if (confirmInput.value.trim() !== 'CONFIRM') {
      showToast('Konfirmasi tidak cocok. Silakan ketik CONFIRM.', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menghapus pengguna.');

      showToast(data.message || 'Pengguna berhasil dihapus!', 'success');
      close();
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
