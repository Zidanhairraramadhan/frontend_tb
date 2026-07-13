// =============================================
// Dashboard Page
// =============================================

import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderTopnav } from '../components/topnav.js';
import { renderStatCard } from '../components/stat-card.js';
import { getTotalStats, getActivities, getLinks, syncData, getAnalytics, getUser } from '../store.js';
import { formatNumber, timeAgo } from '../utils/helpers.js';
import { getPlatform } from '../utils/platforms.js';
import { t } from '../utils/translations.js';

export function renderDashboard() {
  const stats = getTotalStats();
  const activities = getActivities();
  const recentLinks = getLinks().slice(0, 5);
  const user = getUser();

  return `
    <div class="dashboard-layout">
      ${renderSidebar('dashboard')}

      ${renderTopnav(t('dashboardTitle'))}

      <main class="main-content page-enter">
        <h1 class="page-title">${t('dashboardTitle')}</h1>
        <p class="page-subtitle">${t('dashboardSub')}</p>

        <!-- Stats Grid -->
        <div class="stats-grid stagger-children">
          ${renderStatCard({
            icon: 'link',
            label: t('totalLinks'),
            value: stats.totalLinks,
            change: stats.totalLinks > 0 ? 100 : 0,
            iconBg: 'rgba(29, 185, 84, 0.12)',
            iconColor: '#1DB954',
          })}
          ${renderStatCard({
            icon: 'music',
            label: t('platforms'),
            value: stats.totalPlatforms,
            change: stats.totalPlatforms > 0 ? 100 : 0,
            iconBg: 'rgba(139, 92, 246, 0.12)',
            iconColor: '#8B5CF6',
          })}
          ${renderStatCard({
            icon: 'mouse-pointer-click',
            label: t('totalClicks'),
            value: formatNumber(stats.totalClicks),
            change: 0, // Akan diupdate saat data analitik ter-load
            id: 'stats-clicks-card-change',
            iconBg: 'rgba(59, 130, 246, 0.12)',
            iconColor: '#3B82F6',
          })}
          ${renderStatCard({
            icon: 'eye',
            label: t('profileViews'),
            value: formatNumber(stats.totalViews),
            change: 0,
            id: 'stats-views-card-change',
            iconBg: 'rgba(245, 158, 11, 0.12)',
            iconColor: '#F59E0B',
          })}
        </div>

        <!-- Charts Grid -->
        <div class="charts-grid stagger-children">
          <div class="chart-card">
            <div class="chart-card-header">
              <h3 class="chart-card-title">Weekly Clicks</h3>
            </div>
            <div class="chart-container">
              <canvas id="weekly-clicks-chart"></canvas>
            </div>
          </div>
          <div class="chart-card">
            <div class="chart-card-header">
              <h3 class="chart-card-title">Traffic Sources</h3>
            </div>
            <div class="chart-container">
              <canvas id="traffic-sources-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Bottom Grid -->
        <div class="bottom-grid">
          <!-- Recent Activities -->
          <div class="recent-card">
            <h3 class="recent-card-title">${t('recentActivities')}</h3>
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
            <h3 class="recent-card-title">${t('quickActions')}</h3>
            <div class="quick-actions-grid">
              <a href="#/links" class="quick-action-btn">
                <i data-lucide="plus-circle"></i>
                ${t('addNewLinkBtn')}
              </a>
              <a href="#/profile" class="quick-action-btn">
                <i data-lucide="user-circle"></i>
                ${t('editProfile')}
              </a>
              <a href="#/public/${user?.username || ''}" class="quick-action-btn">
                <i data-lucide="external-link"></i>
                ${t('publicProfile')}
              </a>
            </div>

            <div class="divider"></div>
            <h3 class="recent-card-title">${t('recentLinks')}</h3>
            ${recentLinks.map(link => {
              const p = getPlatform(link?.platform || '');
              return `
                <div class="recent-item">
                  <div class="recent-item-icon" style="background:${p.bgColor};color:${p.color};">
                    <span style="font-size:16px;">${p.icon}</span>
                  </div>
                  <div class="recent-item-content">
                    <div class="recent-item-title">${link?.title || t('untitled')}</div>
                    <div class="recent-item-subtitle">${p.name}</div>
                  </div>
                  <div class="recent-item-meta">${formatNumber(link?.clicks || 0)} ${t('clicks')}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </main>
    </div>
  `;
}

export function initDashboard() {
  initSidebar();

  // Load database state asynchronously
  syncData().then(async () => {
    // Render dynamic charts using real database analytics
    try {
      const analytics = await getAnalytics();

      // Update change percentages on stats card
      const clicksCardChange = document.getElementById('stats-clicks-card-change');
      if (clicksCardChange) {
        const sign = analytics.growthPercentage >= 0 ? '+' : '';
        clicksCardChange.innerHTML = `
          <span class="stat-card-change ${analytics.growthPercentage >= 0 ? 'positive' : 'negative'}">
            <i data-lucide="${analytics.growthPercentage >= 0 ? 'trending-up' : 'trending-down'}" style="width:12px;height:12px;"></i>
            ${sign}${analytics.growthPercentage}%
          </span>
        `;
      }

      const viewsCardChange = document.getElementById('stats-views-card-change');
      if (viewsCardChange) {
        const sign = analytics.growthPercentage >= 0 ? '+' : '';
        viewsCardChange.innerHTML = `
          <span class="stat-card-change ${analytics.growthPercentage >= 0 ? 'positive' : 'negative'}">
            <i data-lucide="${analytics.growthPercentage >= 0 ? 'trending-up' : 'trending-down'}" style="width:12px;height:12px;"></i>
            ${sign}${analytics.growthPercentage}%
          </span>
        `;
      }

      if (window.lucide) lucide.createIcons();

      // Load Chart Components
      const { createLineChart, createDoughnutChart } = await import('../components/chart.js');

      // 1. Weekly Clicks Line Chart
      createLineChart('weekly-clicks-chart', analytics.weeklyLabels, analytics.weeklyClicks, 'Clicks');

      // 2. Traffic Sources Doughnut Chart
      const sourceLabels = analytics.trafficSources.map(s => s.source);
      const sourceData = analytics.trafficSources.map(s => s.clicks);
      createDoughnutChart('traffic-sources-chart', sourceLabels, sourceData);

    } catch (err) {
      console.error('Failed to initialize real dashboard analytics charts:', err);
    }
  });
}
