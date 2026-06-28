// =============================================
// Dashboard Page
// =============================================

import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderTopnav } from '../components/topnav.js';
import { renderStatCard } from '../components/stat-card.js';
import { createLineChart, createDoughnutChart } from '../components/chart.js';
import { getTotalStats, getAnalytics, getActivities, getLinks } from '../store.js';
import { formatNumber, timeAgo } from '../utils/helpers.js';
import { getPlatform } from '../utils/platforms.js';

export function renderDashboard() {
  const stats = getTotalStats();
  const analytics = getAnalytics();
  const activities = getActivities();
  const recentLinks = getLinks().slice(0, 5);

  return `
    <div class="dashboard-layout">
      ${renderSidebar('dashboard')}

      ${renderTopnav('Dashboard')}

      <main class="main-content page-enter">
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Welcome back, Alex! Here's what's happening with your music.</p>

        <!-- Stats Grid -->
        <div class="stats-grid stagger-children">
          ${renderStatCard({
            icon: 'link',
            label: 'Total Links',
            value: stats.totalLinks,
            change: 12,
            iconBg: 'rgba(29, 185, 84, 0.12)',
            iconColor: '#1DB954',
          })}
          ${renderStatCard({
            icon: 'music',
            label: 'Platforms',
            value: stats.totalPlatforms,
            change: 8,
            iconBg: 'rgba(139, 92, 246, 0.12)',
            iconColor: '#8B5CF6',
          })}
          ${renderStatCard({
            icon: 'mouse-pointer-click',
            label: 'Total Clicks',
            value: formatNumber(stats.totalClicks),
            change: 23.5,
            iconBg: 'rgba(59, 130, 246, 0.12)',
            iconColor: '#3B82F6',
          })}
          ${renderStatCard({
            icon: 'eye',
            label: 'Profile Views',
            value: formatNumber(stats.totalViews),
            change: 18,
            iconBg: 'rgba(245, 158, 11, 0.12)',
            iconColor: '#F59E0B',
          })}
        </div>

        <!-- Charts -->
        <div class="charts-grid">
          <div class="chart-card">
            <div class="chart-card-header">
              <h3 class="chart-card-title">Weekly Click Analytics</h3>
              <span class="badge badge-green">+23%</span>
            </div>
            <div class="chart-container">
              <canvas id="weekly-chart"></canvas>
            </div>
          </div>

          <div class="chart-card">
            <div class="chart-card-header">
              <h3 class="chart-card-title">Traffic Sources</h3>
            </div>
            <div class="chart-container">
              <canvas id="traffic-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Bottom Grid -->
        <div class="bottom-grid">
          <!-- Recent Activities -->
          <div class="recent-card">
            <h3 class="recent-card-title">Recent Activities</h3>
            ${activities.map(act => {
              const iconMap = {
                click: { icon: 'mouse-pointer-click', bg: 'rgba(29, 185, 84, 0.12)', color: '#1DB954' },
                view: { icon: 'eye', bg: 'rgba(59, 130, 246, 0.12)', color: '#3B82F6' },
                link: { icon: 'plus-circle', bg: 'rgba(139, 92, 246, 0.12)', color: '#8B5CF6' },
                milestone: { icon: 'trophy', bg: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B' },
              };
              const ic = iconMap[act.type] || iconMap.click;
              return `
                <div class="recent-item">
                  <div class="recent-item-icon" style="background:${ic.bg};color:${ic.color};">
                    <i data-lucide="${ic.icon}" style="width:18px;height:18px;"></i>
                  </div>
                  <div class="recent-item-content">
                    <div class="recent-item-title">${act.message}</div>
                    <div class="recent-item-subtitle">${timeAgo(act.time)}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Quick Actions -->
          <div class="recent-card">
            <h3 class="recent-card-title">Quick Actions</h3>
            <div class="quick-actions-grid">
              <a href="#/links" class="quick-action-btn">
                <i data-lucide="plus-circle"></i>
                Add New Link
              </a>
              <a href="#/profile" class="quick-action-btn">
                <i data-lucide="user-circle"></i>
                Edit Profile
              </a>
              <a href="#/analytics" class="quick-action-btn">
                <i data-lucide="bar-chart-3"></i>
                View Analytics
              </a>
              <a href="#/public" class="quick-action-btn">
                <i data-lucide="external-link"></i>
                Public Profile
              </a>
            </div>

            <div class="divider"></div>
            <h3 class="recent-card-title">Recent Links</h3>
            ${recentLinks.map(link => {
              const p = getPlatform(link.platform);
              return `
                <div class="recent-item">
                  <div class="recent-item-icon" style="background:${p.bgColor};color:${p.color};">
                    <span style="font-size:16px;">${p.icon}</span>
                  </div>
                  <div class="recent-item-content">
                    <div class="recent-item-title">${link.title}</div>
                    <div class="recent-item-subtitle">${p.name}</div>
                  </div>
                  <div class="recent-item-meta">${formatNumber(link.clicks)} clicks</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </main>
    </div>
  `;
}

import { syncData } from '../store.js';

export function initDashboard() {
  initSidebar();

  // Load database state asynchronously
  syncData().then(() => {
    // Re-render sections that rely on dynamic store data
    const stats = getTotalStats();
    const analytics = getAnalytics();
    
    // Check if element is still in DOM (user might have navigated away)
    const weeklyChartEl = document.getElementById('weekly-chart');
    if (weeklyChartEl) {
      createLineChart('weekly-chart', analytics.weeklyLabels, analytics.weeklyClicks, 'Clicks');
      createDoughnutChart(
        'traffic-chart',
        analytics.trafficSources.map(s => s.source),
        analytics.trafficSources.map(s => s.percentage)
      );
    }
  });

  const analytics = getAnalytics();
  createLineChart('weekly-chart', analytics.weeklyLabels, analytics.weeklyClicks, 'Clicks');
  createDoughnutChart(
    'traffic-chart',
    analytics.trafficSources.map(s => s.source),
    analytics.trafficSources.map(s => s.percentage)
  );
}
