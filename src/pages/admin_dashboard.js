// =============================================
// Admin Dashboard Page
// Hanya dapat diakses oleh pengguna dengan role: 'admin'
// =============================================

import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderTopnav } from '../components/topnav.js';
import { renderStatCard } from '../components/stat-card.js';
import { getUser } from '../store.js';
import { API_BASE } from '../services/api.js';
import { showToast } from '../components/toast.js';
import { formatNumber } from '../utils/helpers.js';

// ── Fetch data statistik admin dari backend ──
async function fetchAdminStats() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/api/admin/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Gagal memuat data statistik admin.');
  return res.json();
}

function renderRecentUsersTable(users = []) {
  if (!users.length) {
    return `
      <tr>
        <td colspan="4" style="text-align:center;padding:40px;color:var(--text-tertiary);">
          Tidak ada pengguna baru.
        </td>
      </tr>
    `;
  }

  return users.map((u, i) => {
    return `
      <tr class="admin-table-row">
        <td class="admin-table-cell">${i + 1}</td>
        <td class="admin-table-cell">
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="admin-avatar">${(u?.username || '?')[0].toUpperCase()}</div>
            <div style="font-weight:600;color:var(--text-primary);">@${u?.username || '-'}</div>
          </div>
        </td>
        <td class="admin-table-cell">
          <span class="admin-role-badge ${u?.role === 'admin' ? 'admin-role-admin' : 'admin-role-user'}">
            ${u?.role || 'user'}
          </span>
        </td>
        <td class="admin-table-cell" style="color:var(--text-secondary);">
          ${u?.created_at ? new Date(u.created_at).toLocaleDateString('id-ID') : '-'}
        </td>
      </tr>
    `;
  }).join('');
}

export function renderAdminDashboard() {
  const user = getUser();

  // Guard: jika bukan admin, tampilkan pesan akses ditolak
  if (user.role !== 'admin') {
    return `
      <div class="dashboard-layout">
        ${renderSidebar('admin_dashboard')}
        ${renderTopnav('Admin Dashboard')}
        <main class="main-content page-enter" style="display:flex;align-items:center;justify-content:center;">
          <div style="text-align:center;padding:60px 20px;">
            <div style="font-size:64px;margin-bottom:16px;">🔒</div>
            <h2 style="color:var(--text-primary);margin-bottom:8px;">Access Denied</h2>
            <p style="color:var(--text-secondary);">Khusus Administrator. Anda tidak memiliki akses ke halaman ini.</p>
            <a href="#/dashboard" class="btn btn-primary" style="margin-top:20px;">Kembali ke Dashboard</a>
          </div>
        </main>
      </div>
    `;
  }

  return `
    <div class="dashboard-layout">
      ${renderSidebar('admin_dashboard')}
      ${renderTopnav('Admin Dashboard')}

      <main class="main-content page-enter">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
          <div>
            <h1 class="page-title">Admin Dashboard</h1>
            <p class="page-subtitle">Overview statistik platform dan pengguna terbaru.</p>
          </div>
          <span class="admin-role-badge admin-role-admin" style="align-self:flex-start;">
            <i data-lucide="shield-check" style="width:12px;height:12px;display:inline;"></i>
            Administrator
          </span>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid stagger-children" id="admin-dashboard-stats">
          ${renderStatCard({
            icon: 'users',
            label: 'Total Artists / Users',
            value: '...',
            iconBg: 'rgba(139, 92, 246, 0.12)',
            iconColor: '#8B5CF6',
          })}
          ${renderStatCard({
            icon: 'link',
            label: 'Total Music Links',
            value: '...',
            iconBg: 'rgba(29, 185, 84, 0.12)',
            iconColor: '#1DB954',
          })}
          ${renderStatCard({
            icon: 'mouse-pointer-click',
            label: 'Total Global Clicks',
            value: '...',
            iconBg: 'rgba(59, 130, 246, 0.12)',
            iconColor: '#3B82F6',
          })}
        </div>

        <!-- Recent Users Table -->
        <div style="margin-top: 32px;">
          <h2 style="font-size:18px;font-weight:700;margin-bottom:16px;color:var(--text-primary);">Recent Registered Artists</h2>
          <div class="admin-table-wrapper">
            <table class="admin-table">
              <thead>
                <tr class="admin-table-head">
                  <th class="admin-table-th">#</th>
                  <th class="admin-table-th">Username</th>
                  <th class="admin-table-th">Role</th>
                  <th class="admin-table-th">Tanggal Bergabung</th>
                </tr>
              </thead>
              <tbody id="admin-recent-users-tbody">
                <tr>
                  <td colspan="4" style="text-align:center;padding:40px;">
                    <div class="skeleton" style="height:20px;width:200px;margin:0 auto;"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
        min-width: 600px;
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

export function initAdminDashboard() {
  initSidebar();
  
  if (getUser().role !== 'admin') {
    return; // Don't fetch stats if not admin
  }

  const statsContainer = document.getElementById('admin-dashboard-stats');
  const tbody = document.getElementById('admin-recent-users-tbody');

  fetchAdminStats()
    .then(data => {
      // Re-render stats grid
      if (statsContainer) {
        statsContainer.innerHTML = `
          ${renderStatCard({
            icon: 'users',
            label: 'Total Artists / Users',
            value: formatNumber(data.total_users || 0),
            iconBg: 'rgba(139, 92, 246, 0.12)',
            iconColor: '#8B5CF6',
          })}
          ${renderStatCard({
            icon: 'link',
            label: 'Total Music Links',
            value: formatNumber(data.total_links || 0),
            iconBg: 'rgba(29, 185, 84, 0.12)',
            iconColor: '#1DB954',
          })}
          ${renderStatCard({
            icon: 'mouse-pointer-click',
            label: 'Total Global Clicks',
            value: formatNumber(data.total_clicks || 0),
            iconBg: 'rgba(59, 130, 246, 0.12)',
            iconColor: '#3B82F6',
          })}
        `;
      }
      
      // Render recent users
      if (tbody) {
        tbody.innerHTML = renderRecentUsersTable(data.recent_users || []);
      }
      
      // Re-initialize lucide icons for newly rendered HTML
      if (window.lucide) lucide.createIcons();
    })
    .catch(err => {
      showToast('Gagal memuat statistik: ' + err.message, 'error');
      if (tbody) {
        tbody.innerHTML = `
          <tr>
            <td colspan="4" style="text-align:center;padding:40px;color:var(--text-tertiary);">
              Gagal memuat data statistik.
            </td>
          </tr>
        `;
      }
    });
}
