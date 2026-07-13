import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: '.',
    publicDir: 'public',

    // base: './' agar asset path menjadi relatif — penting untuk static hosting
    // (Vercel, Netlify, GitHub Pages) agar file CSS/JS terbaca dengan benar
    base: './',

    build: {
      outDir: 'dist',
      // Tambah source map untuk debugging di production
      sourcemap: false,
      // Optimasi chunk splitting
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [], // placeholder jika ada library besar
          },
        },
      },
    },

    server: {
      port: 5173,
      open: true,
      // Proxy API requests ke backend saat development lokal
      // (opsional, bisa dihapus jika CORS sudah dikonfigurasi)
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          rewrite: (path) => path,
        },
      },
    },

    preview: {
      port: 4173,
    },
  };
});
