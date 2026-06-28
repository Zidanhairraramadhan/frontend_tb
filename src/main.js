// =============================================
// MusicLink — Main Entry Point
// =============================================

// ── Import Styles ──
import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/landing.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/profile.css';
import './styles/links.css';
import './styles/analytics.css';
import './styles/settings.css';
import './styles/public-profile.css';

// ── Import Router ──
import { initRouter } from './router.js';
import { syncData } from './store.js';

// ── Boot Application ──
document.addEventListener('DOMContentLoaded', async () => {
  await syncData();
  initRouter();
});
