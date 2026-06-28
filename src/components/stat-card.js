// =============================================
// Stat Card Component
// =============================================

export function renderStatCard({ icon, label, value, change, changeLabel, iconBg, iconColor }) {
  const isPositive = change >= 0;

  return `
    <div class="stat-card hover-lift">
      <div class="stat-card-header">
        <div class="stat-card-icon" style="background:${iconBg};color:${iconColor};">
          <i data-lucide="${icon}"></i>
        </div>
        <span class="stat-card-change ${isPositive ? 'positive' : 'negative'}">
          <i data-lucide="${isPositive ? 'trending-up' : 'trending-down'}" style="width:14px;height:14px;"></i>
          ${isPositive ? '+' : ''}${change}%
        </span>
      </div>
      <div class="stat-card-value" data-count="${value}">${value}</div>
      <div class="stat-card-label">${label}</div>
    </div>
  `;
}
