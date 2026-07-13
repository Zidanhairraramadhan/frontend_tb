// =============================================
// i18n Translation Dictionary
// Mendukung: 'en' (English) dan 'id' (Bahasa Indonesia)
// Cara pakai: import { t } from '../utils/translations.js'
//             t('musicLinksTitle') // mengambil teks sesuai bahasa aktif
// =============================================

/**
 * Mendapatkan bahasa yang sedang aktif dari localStorage.
 * Default ke 'en' jika belum diset.
 */
export function getCurrentLang() {
  return localStorage.getItem('lang') || 'en';
}

/** Kamus terjemahan lengkap untuk seluruh aplikasi */
export const translations = {
  // ── English ──────────────────────────────────────
  en: {
    // ── Sidebar & Navigation ──
    dashboard:       'Dashboard',
    myProfile:       'My Profile',
    musicLinks:      'Music Links',
    settings:        'Settings',
    manageUsers:     'Manage Users',
    viewPublicProfile: 'View Public Profile',
    logout:          'Logout',
    menu:            'Menu',
    admin:           'Admin',

    // ── Page Titles & Subtitles ──
    dashboardTitle:  'Dashboard',
    dashboardSub:    "Welcome back! Here's what's happening with your music.",
    musicLinksTitle: 'Music Links',
    musicLinksSub:   'Manage all your music streaming and social links.',
    myProfileTitle:  'My Profile',
    myProfileSub:    'Manage your artist profile and appearance.',
    settingsTitle:   'Settings',
    settingsSub:     'Customize your MusicLink experience.',

    // ── Empty States ──
    noLinksYet:      'No links yet',
    noLinksSub:      'Add your first music link to start sharing your music with the world.',
    addYourFirstLink: 'Add Your First Link',
    loadingLinks:    'Loading links data...',

    // ── Links Page ──
    searchLinks:     'Search links...',
    allPlatforms:    'All Platforms',
    addLink:         'Add Link',
    clicks:          'clicks',
    active:          'Active',
    inactive:        'Inactive',
    linkActivated:   'Link activated',
    linkDeactivated: 'Link deactivated',
    linkDeleted:     'Link deleted',
    linksReordered:   'Link order updated successfully!',

    // ── Profile Page ──
    basicInformation: 'Basic Information',
    artistName:      'Artist Name',
    username:        'Username',
    bio:             'Bio',
    genre:           'Genre',
    country:         'Country',
    saveChanges:     'Save Changes',
    preview:         'Preview',
    changeCover:     'Change Cover',
    socialMedia:     'Social Media',
    socialPreview:   'Social Preview',
    profileSaved:    'Profile saved successfully!',

    // ── Modal (Add/Edit Link) ──
    addNewLink:      'Add New Link',
    editLink:        'Edit Link',
    platform:        'Platform',
    choosePlatform:  'Choose platform...',
    url:             'URL',
    linkTitle:       'Link Title',
    cancel:          'Cancel',
    save:            'Save Changes',
    saving:          'Saving...',
    linkAdded:       'Link added successfully!',
    linkUpdated:     'Link updated successfully!',

    // ── Dashboard ──
    totalLinks:      'Total Links',
    platforms:       'Platforms',
    totalClicks:     'Total Clicks',
    profileViews:    'Profile Views',
    recentActivities: 'Recent Activities',
    quickActions:    'Quick Actions',
    addNewLinkBtn:   'Add New Link',
    editProfile:     'Edit Profile',
    publicProfile:   'Public Profile',
    recentLinks:     'Recent Links',

    // ── Settings: Appearance ──
    appearance:      'Appearance',
    appearanceDesc:  'Choose how MusicLink looks to you.',
    theme:           'Theme',
    themePref:       'Select your preferred theme',
    dark:            'Dark',
    light:           'Light',
    language:        'Language',
    languagePref:    'Choose your language preference',

    // ── Settings: Notifications ──
    notifications:   'Notifications',
    notifDesc:       'Manage your notification preferences.',
    emailNotif:      'Email Notifications',
    emailNotifDesc:  'Receive updates via email',
    pushNotif:       'Push Notifications',
    pushNotifDesc:   'Receive push notifications in browser',
    weeklyReport:    'Weekly Report',
    weeklyReportDesc: 'Get a weekly summary of your performance',
    milestoneAlerts: 'Milestone Alerts',
    milestoneDesc:   'Get notified when you reach milestones',

    // ── Settings: Security ──
    security:        'Security',
    securityDesc:    'Manage your password and account security.',
    currentPassword: 'Current Password',
    currentPassPlaceholder: 'Enter current password',
    newPassword:     'New Password',
    newPassPlaceholder: 'Enter new password',
    confirmPassword: 'Confirm New Password',
    confirmPassPlaceholder: 'Confirm new password',
    changePassword:  'Change Password',
    passwordChanged: 'Password changed successfully!',

    // ── Settings: Danger Zone ──
    dangerZone:      'Danger Zone',
    dangerDesc:      'Irreversible and destructive actions.',
    deleteAccount:   'Delete Account',
    deleteAccountDesc: 'Permanently delete your account and all data',

    // ── Topnav ──
    topnavLinks:     'Music Links',
    topnavProfile:   'My Profile',

    // ── Toast / Alerts ──
    settingsUpdated: 'Settings updated',
    langChanged:     'Language changed to English 🇬🇧',

    // ── Misc ──
    untitled:        'Untitled',
    unknown:         'Unknown',
    worldwide:       'Worldwide',
    musician:        'Musician',
  },

  // ── Bahasa Indonesia ─────────────────────────────
  id: {
    // ── Sidebar & Navigation ──
    dashboard:       'Dasbor',
    myProfile:       'Profil Saya',
    musicLinks:      'Tautan Musik',
    settings:        'Pengaturan',
    manageUsers:     'Kelola Pengguna',
    viewPublicProfile: 'Lihat Profil Publik',
    logout:          'Keluar',
    menu:            'Menu',
    admin:           'Admin',

    // ── Page Titles & Subtitles ──
    dashboardTitle:  'Dasbor',
    dashboardSub:    'Selamat datang kembali! Ini perkembangan musik Anda.',
    musicLinksTitle: 'Tautan Musik',
    musicLinksSub:   'Kelola semua tautan streaming musik dan media sosial Anda.',
    myProfileTitle:  'Profil Saya',
    myProfileSub:    'Kelola profil artis dan tampilan Anda.',
    settingsTitle:   'Pengaturan',
    settingsSub:     'Sesuaikan pengalaman MusicLink Anda.',

    // ── Empty States ──
    noLinksYet:      'Belum ada tautan',
    noLinksSub:      'Tambahkan tautan musik pertama Anda untuk mulai berbagi dengan dunia.',
    addYourFirstLink: 'Tambah Tautan Pertama',
    loadingLinks:    'Memuat data tautan...',

    // ── Links Page ──
    searchLinks:     'Cari tautan...',
    allPlatforms:    'Semua Platform',
    addLink:         'Tambah Tautan',
    clicks:          'klik',
    active:          'Aktif',
    inactive:        'Nonaktif',
    linkActivated:   'Tautan diaktifkan',
    linkDeactivated: 'Tautan dinonaktifkan',
    linkDeleted:     'Tautan dihapus',
    linksReordered:   'Urutan tautan berhasil diperbarui!',

    // ── Profile Page ──
    basicInformation: 'Informasi Dasar',
    artistName:      'Nama Artis',
    username:        'Nama Pengguna',
    bio:             'Bio',
    genre:           'Genre',
    country:         'Negara',
    saveChanges:     'Simpan Perubahan',
    preview:         'Pratinjau',
    changeCover:     'Ganti Sampul',
    socialMedia:     'Media Sosial',
    socialPreview:   'Pratinjau Sosial',
    profileSaved:    'Profil berhasil disimpan!',

    // ── Modal (Add/Edit Link) ──
    addNewLink:      'Tambah Tautan Baru',
    editLink:        'Edit Tautan',
    platform:        'Platform',
    choosePlatform:  'Pilih platform...',
    url:             'URL',
    linkTitle:       'Judul Tautan',
    cancel:          'Batal',
    save:            'Simpan Perubahan',
    saving:          'Menyimpan...',
    linkAdded:       'Tautan berhasil ditambahkan!',
    linkUpdated:     'Tautan berhasil diperbarui!',

    // ── Dashboard ──
    totalLinks:      'Total Tautan',
    platforms:       'Platform',
    totalClicks:     'Total Klik',
    profileViews:    'Tampilan Profil',
    recentActivities: 'Aktivitas Terbaru',
    quickActions:    'Aksi Cepat',
    addNewLinkBtn:   'Tambah Tautan',
    editProfile:     'Edit Profil',
    publicProfile:   'Profil Publik',
    recentLinks:     'Tautan Terbaru',

    // ── Settings: Appearance ──
    appearance:      'Tampilan',
    appearanceDesc:  'Pilih tampilan MusicLink yang Anda sukai.',
    theme:           'Tema',
    themePref:       'Pilih tema yang Anda inginkan',
    dark:            'Gelap',
    light:           'Terang',
    language:        'Bahasa',
    languagePref:    'Pilih preferensi bahasa Anda',

    // ── Settings: Notifications ──
    notifications:   'Notifikasi',
    notifDesc:       'Kelola preferensi notifikasi Anda.',
    emailNotif:      'Notifikasi Email',
    emailNotifDesc:  'Terima pembaruan via email',
    pushNotif:       'Notifikasi Push',
    pushNotifDesc:   'Dapatkan notifikasi push di browser',
    weeklyReport:    'Laporan Mingguan',
    weeklyReportDesc: 'Dapatkan ringkasan kinerja mingguan Anda',
    milestoneAlerts: 'Notifikasi Pencapaian',
    milestoneDesc:   'Dapatkan notifikasi saat mencapai target',

    // ── Settings: Security ──
    security:        'Keamanan',
    securityDesc:    'Kelola kata sandi dan keamanan akun Anda.',
    currentPassword: 'Kata Sandi Saat Ini',
    currentPassPlaceholder: 'Masukkan kata sandi saat ini',
    newPassword:     'Kata Sandi Baru',
    newPassPlaceholder: 'Masukkan kata sandi baru',
    confirmPassword: 'Konfirmasi Kata Sandi Baru',
    confirmPassPlaceholder: 'Konfirmasi kata sandi baru',
    changePassword:  'Ganti Kata Sandi',
    passwordChanged: 'Kata sandi berhasil diubah!',

    // ── Settings: Danger Zone ──
    dangerZone:      'Zona Berbahaya',
    dangerDesc:      'Tindakan yang tidak dapat dibatalkan.',
    deleteAccount:   'Hapus Akun',
    deleteAccountDesc: 'Hapus akun Anda beserta semua data secara permanen',

    // ── Topnav ──
    topnavLinks:     'Tautan Musik',
    topnavProfile:   'Profil Saya',

    // ── Toast / Alerts ──
    settingsUpdated: 'Pengaturan diperbarui',
    langChanged:     'Bahasa diubah ke Bahasa Indonesia 🇮🇩',

    // ── Misc ──
    untitled:        'Tanpa Judul',
    unknown:         'Tidak Diketahui',
    worldwide:       'Seluruh Dunia',
    musician:        'Musisi',
  },
};

/**
 * Fungsi helper utama — ambil terjemahan berdasarkan key.
 * Secara otomatis membaca bahasa aktif dari localStorage.
 * @param {string} key - Kunci terjemahan (misal: 'musicLinksTitle')
 * @param {string} [lang] - Opsional: override bahasa (misal: 'id')
 * @returns {string}
 */
export function t(key, lang) {
  const activeLang = lang || getCurrentLang();
  const dict = translations[activeLang] || translations.en;
  // Fallback ke bahasa Inggris jika kunci tidak ditemukan
  return dict[key] ?? translations.en[key] ?? key;
}
