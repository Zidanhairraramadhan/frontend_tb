// =============================================
// Admin — Manage Users Page
// Hanya dapat diakses oleh pengguna dengan role: 'admin'
// =============================================

import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderTopnav } from '../components/topnav.js';
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

// ── Render tabel pengguna ──
function renderUserTable(users = []) {
  if (!users.length) {
    return `
      <tr>
        <td colspan="6" style="text-align:center;padding:40px;color:var(--text-tertiary);">
          Tidak ada data pengguna.
        </td>
      </tr>
    `;
  }

  return users.map((u, i) => `
    <tr class="admin-table-row">
      <td class="admin-table-cell">${i + 1}</td>
      <td class="admin-table-cell">
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="admin-avatar">${(u.name || u.username || '?')[0].toUpperCase()}</div>
          <div>
            <div style="font-weight:600;color:var(--text-primary);">${u.name || '-'}</div>
            <div style="font-size:12px;color:var(--text-tertiary);">@${u.username || '-'}</div>
          </div>
        </div>
      </td>
      <td class="admin-table-cell" style="color:var(--text-secondary);">${u.email || '-'}</td>
      <td class="admin-table-cell">
        <span class="admin-role-badge ${u.role === 'admin' ? 'admin-role-admin' : 'admin-role-user'}">
          ${u.role || 'user'}
        </span>
      </td>
      <td class="admin-table-cell" style="color:var(--text-secondary);">
        ${u.created_at ? new Date(u.created_at).toLocaleDateString('id-ID') : '-'}
      </td>
      <td class="admin-table-cell">
        <div style="display:flex;gap:8px;">
          <button class="btn btn-secondary" style="padding:4px 12px;font-size:12px;" disabled title="Edit (coming soon)">
            <i data-lucide="pencil" style="width:12px;height:12px;"></i>
          </button>
          <button class="btn" style="padding:4px 12px;font-size:12px;background:rgba(239,68,68,0.1);color:#EF4444;border:1px solid rgba(239,68,68,0.2);" disabled title="Delete (coming soon)">
            <i data-lucide="trash-2" style="width:12px;height:12px;"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
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

        <!-- Search bar -->
        <div style="margin-bottom:16px;">
          <div style="position:relative;max-width:320px;">
            <i data-lucide="search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:var(--text-tertiary);pointer-events:none;"></i>
            <input type="text" class="input" style="padding-left:40px;" placeholder="Cari nama atau username..." id="admin-search-input" />
          </div>
        </div>

        <!-- Table -->
        <div class="admin-table-wrapper">
          <table class="admin-table" id="admin-user-table">
            <thead>
              <tr class="admin-table-head">
                <th class="admin-table-th">#</th>
                <th class="admin-table-th">Pengguna</th>
                <th class="admin-table-th">Email</th>
                <th class="admin-table-th">Role</th>
                <th class="admin-table-th">Terdaftar</th>
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
      .admin-role-badge {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 3px 10px; border-radius: 100px;
        font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
      }
      .admin-role-admin  { background: rgba(139,92,246,0.15); color: #8B5CF6; }
      .admin-role-user   { background: rgba(29,185,84,0.12);  color: #1DB954; }
    </style>
  `;
}

export function initAdminUsers() {
  initSidebar();

  const tbody = document.getElementById('admin-user-tbody');
  const searchInput = document.getElementById('admin-search-input');
  let allUsers = [];

  // Load data pengguna dari API
  fetchAllUsers()
    .then(data => {
      // Backend mungkin mengembalikan array langsung atau { users: [...] }
      allUsers = Array.isArray(data) ? data : (data.users || []);

      // Update stats
      const admins   = allUsers.filter(u => u.role === 'admin').length;
      const regulars = allUsers.length - admins;
      document.getElementById('admin-total-users')?.setAttribute('data-val', allUsers.length);
      if (document.getElementById('admin-total-users'))   document.getElementById('admin-total-users').textContent   = allUsers.length;
      if (document.getElementById('admin-total-admins'))  document.getElementById('admin-total-admins').textContent  = admins;
      if (document.getElementById('admin-total-regulars'))document.getElementById('admin-total-regulars').textContent = regulars;

      // Render tabel
      if (tbody) tbody.innerHTML = renderUserTable(allUsers);
      if (window.lucide) lucide.createIcons();
    })
    .catch(err => {
      showToast('Gagal memuat data pengguna: ' + err.message, 'error');
      if (tbody) tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;padding:40px;color:var(--text-tertiary);">
            Gagal memuat data. Pastikan endpoint <code>/api/admin/users</code> tersedia.
          </td>
        </tr>
      `;
    });

  // Fitur pencarian (client-side filter)
  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = allUsers.filter(u =>
      (u.name || '').toLowerCase().includes(q) ||
      (u.username || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q)
    );
    if (tbody) {
      tbody.innerHTML = renderUserTable(filtered);
      if (window.lucide) lucide.createIcons();
    }
  });
}
