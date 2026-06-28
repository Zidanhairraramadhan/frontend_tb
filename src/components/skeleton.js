// =============================================
// Loading Skeleton Component
// =============================================

export function renderSkeleton(type = 'card', count = 1) {
  const templates = {
    card: `
      <div class="skeleton skeleton-card" style="height:120px;margin-bottom:16px;"></div>
    `,
    stat: `
      <div class="stat-card" style="padding:24px;">
        <div class="skeleton" style="width:42px;height:42px;border-radius:12px;margin-bottom:16px;"></div>
        <div class="skeleton skeleton-text" style="width:60%;height:28px;margin-bottom:8px;"></div>
        <div class="skeleton skeleton-text" style="width:40%;height:14px;"></div>
      </div>
    `,
    list: `
      <div style="display:flex;align-items:center;gap:12px;padding:12px 0;">
        <div class="skeleton skeleton-avatar"></div>
        <div style="flex:1;">
          <div class="skeleton skeleton-text" style="width:70%;"></div>
          <div class="skeleton skeleton-text" style="width:40%;"></div>
        </div>
      </div>
    `,
    text: `
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text" style="width:80%;"></div>
      <div class="skeleton skeleton-text" style="width:60%;"></div>
    `,
  };

  return Array(count).fill(templates[type] || templates.card).join('');
}
