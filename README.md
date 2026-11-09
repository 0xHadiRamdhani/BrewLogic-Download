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

APK dan IPA tidak disimpan di repo atau di `public/`. Keduanya diunggah sebagai aset
GitHub Release di repo `0xHadiRamdhani/BrewLogic-Download`, dan situs membaca data
rilis terbaru lewat GitHub API.

1. Build aplikasinya di proyek Flutter.
2. Buka halaman Releases repo ini, pilih **Draft a new release**.
3. Isi tag dengan format `v<versi>+<build>` sesuai `pubspec.yaml`, mis. `v1.2.0+3`.
   Situs menampilkannya sebagai "1.2.0 (build 3)". Tag tanpa `+build` juga boleh.
4. Unggah dua berkas dengan nama persis `brewlogic.apk` dan `brewlogic.ipa`, lalu
   **Publish release** (bukan draft atau pre-release).
5. Situs memperbarui diri: tombol unduh menuju CDN GitHub, sedangkan ukuran, tanggal,
   dan SHA-256 diambil dari aset. Hasil dicache 1 jam (1 menit selama ada berkas yang
   belum tersedia). Untuk memaksa segera, jalankan ulang server atau deploy ulang.

Persyaratan sistem (Android 7.0+, iOS 15.0+) ada di `RELEASES` pada `lib/releases.ts`
dan perlu diubah manual jika minimum SDK aplikasi berubah.

Sebelum rilis pertama dipublikasikan, kartu unduhan menampilkan "belum tersedia".

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
