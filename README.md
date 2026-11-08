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

1. Build ulang aplikasinya di proyek Flutter, lalu salin hasilnya ke
   `public/download/` dengan nama persis `brewlogic.apk` dan `brewlogic.ipa`.
2. Perbarui `version` dan `requirement` di `RELEASES` pada `lib/releases.ts`
   (versi ada di `pubspec.yaml`, persyaratan di Info.plist IPA dan manifest APK).
3. Ukuran, tanggal, dan SHA-256 dibaca otomatis dari berkas. Hasilnya dicache satu
   jam, jadi setelah mengganti berkas jalankan ulang server atau build ulang.

Jika berkas belum ada, kartunya menampilkan "belum tersedia".

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
