// =============================================
// Toast Notification Component
// =============================================

let toastCounter = 0;

export function showToast(message, type = 'success', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const id = `toast-${++toastCounter}`;

  const iconMap = {
    success: '<i data-lucide="check-circle" style="color:#1DB954;width:20px;height:20px;"></i>',
    error: '<i data-lucide="x-circle" style="color:#ef4444;width:20px;height:20px;"></i>',
    info: '<i data-lucide="info" style="color:#3B82F6;width:20px;height:20px;"></i>',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.id = id;
  toast.innerHTML = `
    <span class="toast-icon">${iconMap[type] || iconMap.info}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.closest('.toast').remove()">
      <i data-lucide="x" style="width:16px;height:16px;"></i>
    </button>
  `;

  container.appendChild(toast);

  // Re-initialize Lucide icons in toast
  if (window.lucide) lucide.createIcons();

  // Auto dismiss
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('toast-exit');
      setTimeout(() => el.remove(), 300);
    }
  }, duration);
}
