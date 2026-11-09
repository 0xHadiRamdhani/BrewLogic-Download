# Unduh BrewLogic

Halaman unduhan APK (Android) dan IPA (iPhone) untuk aplikasi Flutter BrewLogic
(`/Users/hadiramdhani/mobile_project/brewlogic`). Next.js 16 + Tailwind CSS 4.

Tampilan mengikuti tema aplikasinya (Soft Café): latar espresso, aksen karamel dan
sage, font Pixelify Sans dan DM Sans, animasi menuang kopi dari
`assets/animations/pour.json`, dan ikon dari `assets/images/icons.jpg`.

## Menjalankan

```bash
npm install
npm run dev
```

## Merilis versi baru

APK dan IPA tidak disimpan di repo ini atau di `public/`. Keduanya adalah aset GitHub
Release `ReleaseLatest` di repo aplikasinya, `0xHadiRamdhani/BrewLogic`, dan situs
membaca data rilis itu lewat GitHub API
(<https://github.com/0xHadiRamdhani/BrewLogic/releases/tag/ReleaseLatest>).

1. Naikkan `version` di `pubspec.yaml` dan build aplikasinya.
2. Pada release `ReleaseLatest`, ganti aset dengan `brewlogic.apk` dan `brewlogic.ipa`
   baru. Nama harus persis, dan release tidak boleh draft.
3. Situs memperbarui diri: tombol unduh menuju CDN GitHub, sedangkan ukuran, tanggal,
   dan SHA-256 diambil dari aset. Hasil dicache 1 jam (1 menit selama ada berkas yang
   belum tersedia). Untuk memaksa segera, jalankan ulang server atau deploy ulang.

Versi yang tampil dicari berurutan di: tag, judul, lalu catatan rilis (mis. judul
"v1.2.0+3"), dan jika tidak ada, dari `pubspec.yaml` di branch utama repo aplikasi.
Karena tag `ReleaseLatest` tidak memuat versi, saat ini versi berasal dari pubspec.
Itu benar selama rilis diunggah setelah versi dinaikkan.

Repo, tag, dan nama aset diatur di `lib/releases.ts` (`REPO`, `RELEASE_TAG`,
`RELEASES`). Persyaratan sistem (Android 7.0+, iOS 15.0+) juga ada di sana dan perlu
diubah manual jika minimum SDK aplikasi berubah.

Jika rilis tidak ditemukan atau GitHub tidak bisa dijangkau, kartu unduhan
menampilkan "belum tersedia" atau pesan gagal memuat.

### Opsional

`GITHUB_TOKEN` di `.env.local` menaikkan batas permintaan GitHub API dari 60 per jam
ke 5.000 per jam. Token cukup hak baca publik, tanpa scope tambahan.

## Animasi

- Latar: cahaya karamel dan sage yang bergeser mengikuti scroll (CSS scroll-driven).
- Riak di belakang cangkir dan animasi menuang berulang, bisa dijeda lewat tombol
  "Jeda animasi" di pojok kanan bawah.
- Pengguna dengan `prefers-reduced-motion: reduce` memulai dalam keadaan jeda dan
  tanpa gerak scroll. Browser tanpa `animation-timeline` melihat halaman statis.

## Catatan iOS

IPA tidak bisa dibuka langsung dari browser iPhone. Halaman ini menjelaskan
pemasangan lewat AltStore atau Sideloadly. Jika kamu memakai TestFlight atau
distribusi ad hoc, sesuaikan teks di bagian "Cara memasang" pada `app/page.tsx`.
