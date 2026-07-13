// =============================================
// Export Utilities
// Fitur: Export data ke CSV dan PDF
// =============================================

/**
 * Export array of objects ke file CSV.
 * Tidak memerlukan library eksternal.
 *
 * @param {Array<Object>} data - Array data yang akan diexport
 * @param {string} filename - Nama file (tanpa ekstensi)
 * @param {string[]} [columns] - Kolom yang ingin diexport (opsional; default: semua kolom)
 */
export function exportToCSV(data, filename = 'export', columns = null) {
  if (!data || data.length === 0) {
    alert('Tidak ada data untuk diexport.');
    return;
  }

  const keys = columns || Object.keys(data[0]);

  // Header row
  const header = keys.map(k => `"${k}"`).join(',');

  // Data rows
  const rows = data.map(row =>
    keys.map(key => {
      const val = row[key] ?? '';
      // Escape double quotes dalam nilai
      const escaped = String(val).replace(/"/g, '""');
      return `"${escaped}"`;
    }).join(',')
  );

  const csvContent = [header, ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}.csv`);
}

/**
 * Export laporan analytics/links ke PDF menggunakan jsPDF (via CDN).
 * jsPDF diload dari CDN saat fungsi dipanggil (lazy load).
 *
 * @param {Object} reportData - Data laporan
 * @param {string} reportData.title - Judul dokumen
 * @param {Array} reportData.links - Array links
 * @param {Object} reportData.summary - Summary analytics
 * @param {string} filename - Nama file (tanpa ekstensi)
 */
export async function exportToPDF(reportData, filename = 'musiclink-report') {
  // Lazy load jsPDF dari CDN jika belum tersedia
  if (!window.jspdf) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js');
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageW = doc.internal.pageSize.getWidth();
  const margin = 15;

  // ── Header ──
  doc.setFillColor(29, 185, 84); // Spotify green
  doc.rect(0, 0, pageW, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('🎵 MusicLink Report', margin, 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const now = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
  doc.text(`Generated: ${now}`, pageW - margin, 18, { align: 'right' });

  // ── Title ──
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(reportData.title || 'Music Links Report', margin, 42);

  let y = 50;

  // ── Analytics Summary ──
  if (reportData.summary) {
    const s = reportData.summary;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(29, 185, 84);
    doc.text('📊 Analytics Summary', margin, y);
    y += 7;

    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    const summaryItems = [
      ['Total Links', s.totalLinks ?? '-'],
      ['Total Clicks', s.totalClicks ?? '-'],
      ['Total Platforms', s.totalPlatforms ?? '-'],
      ['Growth This Week', s.growthPercentage !== undefined ? `${s.growthPercentage}%` : '-'],
      ['Most Active Day', s.mostActiveDay ?? '-'],
    ];

    summaryItems.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(String(value), margin + 50, y);
      y += 6;
    });

    y += 5;
  }

  // ── Links Table ──
  if (reportData.links && reportData.links.length > 0) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(29, 185, 84);
    doc.text('🔗 Music Links', margin, y);
    y += 4;

    doc.autoTable({
      startY: y,
      margin: { left: margin, right: margin },
      head: [['#', 'Title', 'Platform', 'Clicks', 'Status', 'URL']],
      body: reportData.links.map((link, i) => [
        i + 1,
        link.title || '-',
        link.platform || '-',
        link.clicks ?? 0,
        link.active ? 'Active' : 'Inactive',
        link.url || '-',
      ]),
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: 'linebreak',
      },
      headStyles: {
        fillColor: [29, 185, 84],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        5: { cellWidth: 50 }, // URL column wider
      },
    });
  }

  // ── Footer ──
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`MusicLink — Page ${i} of ${pageCount}`, pageW / 2, 290, { align: 'center' });
  }

  doc.save(`${filename}.pdf`);
}

/**
 * Helper: trigger browser download untuk Blob object.
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Helper: load script dari URL secara dinamis (Promise-based).
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(); return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
