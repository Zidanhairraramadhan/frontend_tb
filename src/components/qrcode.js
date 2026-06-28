// =============================================
// QR Code Component
// =============================================

export function renderQRCode(containerId, url, size = 140) {
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container || !window.QRCode) return;

    container.innerHTML = '';
    new QRCode(container, {
      text: url,
      width: size,
      height: size,
      colorDark: '#0F172A',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }, 100);
}
