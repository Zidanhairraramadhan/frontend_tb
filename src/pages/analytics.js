// =============================================
// Analytics Page
// =============================================

import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderTopnav } from '../components/topnav.js';
import { createLineChart, createBarChart, createDoughnutChart } from '../components/chart.js';
import { getAnalytics } from '../store.js';
import { getPlatform } from '../utils/platforms.js';
import { formatNumber } from '../utils/helpers.js';

export function renderAnalytics() {
  const analytics = getAnalytics();
  const maxClicks = Math.max(...analytics.topPlatforms.map(p => p.clicks));

  return `
    <div class="dashboard-layout">
      ${renderSidebar('analytics')}
      ${renderTopnav('Analytics')}

      <main class="main-content page-enter">
        <div class="analytics-header">
          <div>
            <h1 class="page-title">Analytics</h1>
            <p class="page-subtitle">Track your music link performance and growth.</p>
          </div>
          <div class="analytics-date-range">
            <button class="analytics-date-btn">24h</button>
            <button class="analytics-date-btn active">7d</button>
            <button class="analytics-date-btn">30d</button>
            <button class="analytics-date-btn">90d</button>
            <button class="analytics-date-btn">1y</button>
          </div>
        </div>

        <!-- Stats -->
        <div class="analytics-stats stagger-children">
          <div class="analytics-stat-card hover-lift">
            <div class="analytics-stat-header">
              <div class="analytics-stat-icon" style="background:rgba(29,185,84,0.12);color:#1DB954;">
                <i data-lucide="mouse-pointer-click" style="width:18px;height:18px;"></i>
              </div>
              <span class="analytics-stat-label">Total Clicks</span>
            </div>
            <div class="analytics-stat-value">${formatNumber(analytics.totalClicks)}</div>
            <div class="analytics-stat-change positive">
              <i data-lucide="trending-up" style="width:14px;height:14px;"></i>
              +${analytics.growthPercentage}% from last period
            </div>
          </div>

          <div class="analytics-stat-card hover-lift">
            <div class="analytics-stat-header">
              <div class="analytics-stat-icon" style="background:rgba(139,92,246,0.12);color:#8B5CF6;">
                <i data-lucide="eye" style="width:18px;height:18px;"></i>
              </div>
              <span class="analytics-stat-label">Profile Views</span>
            </div>
            <div class="analytics-stat-value">${formatNumber(analytics.totalViews)}</div>
            <div class="analytics-stat-change positive">
              <i data-lucide="trending-up" style="width:14px;height:14px;"></i>
              +18% from last period
            </div>
          </div>

          <div class="analytics-stat-card hover-lift">
            <div class="analytics-stat-header">
              <div class="analytics-stat-icon" style="background:rgba(59,130,246,0.12);color:#3B82F6;">
                <i data-lucide="trophy" style="width:18px;height:18px;"></i>
              </div>
              <span class="analytics-stat-label">Top Platform</span>
            </div>
            <div class="analytics-stat-value" style="font-size:var(--font-size-2xl);">Spotify</div>
            <div class="analytics-stat-change positive">
              ${formatNumber(analytics.topPlatforms[0].clicks)} clicks
            </div>
          </div>

          <div class="analytics-stat-card hover-lift">
            <div class="analytics-stat-header">
              <div class="analytics-stat-icon" style="background:rgba(245,158,11,0.12);color:#F59E0B;">
                <i data-lucide="calendar" style="width:18px;height:18px;"></i>
              </div>
              <span class="analytics-stat-label">Most Active Day</span>
            </div>
            <div class="analytics-stat-value" style="font-size:var(--font-size-2xl);">${analytics.mostActiveDay}</div>
            <div class="analytics-stat-change positive">
              Peak engagement day
            </div>
          </div>
        </div>

        <!-- Charts -->
        <div class="analytics-charts">
          <div class="analytics-chart-card">
            <div class="analytics-chart-header">
              <h3 class="analytics-chart-title">Clicks Over Time</h3>
              <span class="badge badge-green">Monthly</span>
            </div>
            <div class="analytics-chart-container">
              <canvas id="analytics-line-chart"></canvas>
            </div>
          </div>

          <div class="analytics-chart-card">
            <div class="analytics-chart-header">
              <h3 class="analytics-chart-title">Traffic Sources</h3>
            </div>
            <div class="analytics-chart-container">
              <canvas id="analytics-doughnut-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Platform Breakdown -->
        <div class="analytics-platforms">
          <div class="platform-breakdown-card">
            <div class="analytics-chart-header">
              <h3 class="analytics-chart-title">Clicks by Platform</h3>
            </div>
            <div class="analytics-chart-container">
              <canvas id="analytics-bar-chart"></canvas>
            </div>
          </div>

          <div class="platform-breakdown-card">
            <div class="analytics-chart-header">
              <h3 class="analytics-chart-title">Platform Breakdown</h3>
            </div>
            ${analytics.topPlatforms.map(item => {
              const p = getPlatform(item.platform);
              const pct = Math.round((item.clicks / maxClicks) * 100);
              return `
                <div class="platform-item">
                  <div class="platform-item-icon" style="background:${p.bgColor};color:${p.color};">
                    <span style="font-size:16px;">${p.icon}</span>
                  </div>
                  <div class="platform-item-info">
                    <div class="platform-item-name">${p.name}</div>
                    <div class="platform-item-bar">
                      <div class="platform-item-bar-fill" style="width:${pct}%;background:${p.color};"></div>
                    </div>
                  </div>
                  <div class="platform-item-value">${formatNumber(item.clicks)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </main>
    </div>
  `;
}

export function initAnalytics() {
  initSidebar();

  const analytics = getAnalytics();

  // Line chart — monthly
  createLineChart(
    'analytics-line-chart',
    analytics.monthlyLabels,
    analytics.monthlyClicks,
    'Clicks'
  );

  // Bar chart — platforms
  const topPlatforms = analytics.topPlatforms.slice(0, 6);
  createBarChart(
    'analytics-bar-chart',
    topPlatforms.map(p => getPlatform(p.platform).name),
    topPlatforms.map(p => p.clicks),
    topPlatforms.map(p => getPlatform(p.platform).color)
  );

  // Doughnut chart — traffic sources
  createDoughnutChart(
    'analytics-doughnut-chart',
    analytics.trafficSources.map(s => s.source),
    analytics.trafficSources.map(s => s.percentage)
  );

  // Date range buttons
  document.querySelectorAll('.analytics-date-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.analytics-date-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}
