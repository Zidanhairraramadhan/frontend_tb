// =============================================
// Chart Wrapper Components
// =============================================

/**
 * Create a line chart
 */
export function createLineChart(canvasId, labels, data, label = 'Clicks') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 280);
  gradient.addColorStop(0, 'rgba(29, 185, 84, 0.3)');
  gradient.addColorStop(1, 'rgba(29, 185, 84, 0.0)');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderColor: '#1DB954',
        backgroundColor: gradient,
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#1DB954',
        pointBorderColor: '#0F172A',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 3,
      }],
    },
    options: getChartOptions(),
  });
}

/**
 * Create a bar chart
 */
export function createBarChart(canvasId, labels, data, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  const ctx = canvas.getContext('2d');

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Clicks',
        data,
        backgroundColor: colors || 'rgba(29, 185, 84, 0.6)',
        borderColor: colors || '#1DB954',
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 40,
      }],
    },
    options: {
      ...getChartOptions(),
      scales: {
        ...getChartOptions().scales,
        x: {
          ...getChartOptions().scales.x,
          grid: { display: false },
        },
      },
    },
  });
}

/**
 * Create a doughnut chart
 */
export function createDoughnutChart(canvasId, labels, data, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  const ctx = canvas.getContext('2d');

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors || [
          '#1DB954',
          '#8B5CF6',
          '#3B82F6',
          '#F59E0B',
          '#6B7280',
        ],
        borderColor: '#181818',
        borderWidth: 3,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#b3b3b3',
            font: { family: "'Inter', sans-serif", size: 12 },
            padding: 16,
            usePointStyle: true,
            pointStyleWidth: 8,
          },
        },
        tooltip: getTooltipConfig(),
      },
      animation: {
        animateRotate: true,
        duration: 1000,
      },
    },
  });
}

function getChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: { display: false },
      tooltip: getTooltipConfig(),
    },
    scales: {
      x: {
        ticks: {
          color: '#6b7280',
          font: { family: "'Inter', sans-serif", size: 11 },
        },
        grid: {
          color: 'rgba(255,255,255,0.04)',
        },
        border: { display: false },
      },
      y: {
        ticks: {
          color: '#6b7280',
          font: { family: "'Inter', sans-serif", size: 11 },
        },
        grid: {
          color: 'rgba(255,255,255,0.04)',
        },
        border: { display: false },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };
}

function getTooltipConfig() {
  return {
    backgroundColor: '#242424',
    titleColor: '#fff',
    bodyColor: '#b3b3b3',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    cornerRadius: 12,
    padding: 12,
    titleFont: { family: "'Inter', sans-serif", weight: '600' },
    bodyFont: { family: "'Inter', sans-serif" },
    displayColors: false,
  };
}
