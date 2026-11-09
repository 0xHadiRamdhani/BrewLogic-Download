import Image from "next/image";
import type { CSSProperties } from "react";
import { CopyButton } from "@/components/CopyButton";
import { DownloadButton, DownloadRow } from "@/components/DownloadRow";
import { PourAnimation } from "@/components/PourAnimation";
import { getReleases } from "@/lib/releases";

const navLinks = [
  { href: "#fitur", label: "Fitur", hideOnMobile: false },
  { href: "#unduh", label: "Unduh", hideOnMobile: false },
  { href: "#pasang", label: "Pasang", hideOnMobile: false },
  { href: "#verifikasi", label: "Verifikasi", hideOnMobile: true },
];

// Isi fitur mengikuti README proyek Flutter BrewLogic.
const mainFeatures = [
  {
    title: "Kalkulator seduh",
    text: "Hitung air dan fase tuang dari gramasi kopi untuk V60, Aeropress, French Press, dan Chemex, dengan tiga tingkat roasting. Rasio, suhu, dan durasi bisa disesuaikan.",
  },
  {
    title: "Timer step-by-step",
    text: "Bloom dan tuang bertahap dalam cincin timer, dengan suara dan haptic penanda fase, notifikasi saat aplikasi di latar belakang, dan layar tetap menyala selama menyeduh.",
  },
  {
    title: "Brew journal",
    text: "Catat setiap seduhan dengan rating biji kopi, tag rasa, foto, dan catatan. Dikelompokkan per hari, bisa dicari dan disaring, geser untuk menghapus.",
  },
];

const moreFeatures = [
  {
    title: "Kalkulator terbalik",
    text: "Masukkan jumlah air, aplikasi menghitung kopi yang dibutuhkan.",
  },
  {
    title: "Resep favorit dan perpustakaan biji",
    text: "Simpan resep dan biji, lengkap dengan kesegaran biji.",
  },
  {
    title: "Dial-in",
    text: "Saran penyesuaian seduhan, termasuk rasio air dan kopi, berdasarkan kesan rasa.",
  },
  {
    title: "Statistik seduhan",
    text: "Ringkasan seduhan dan grafik rating.",
  },
  {
    title: "Ekspor dan bagikan",
    text: "Kartu bagikan (PNG), ekspor CSV, serta ekspor dan impor cadangan JSON.",
  },
];

const androidSteps = [
  "Unduh berkas APK lewat browser ponsel.",
  "Buka berkas yang terunduh. Jika diminta, izinkan browser memasang aplikasi dari sumber tidak dikenal di Pengaturan.",
  "Ketuk Pasang. Jika Play Protect memberi peringatan, itu karena aplikasi tidak berasal dari Play Store.",
  "Buka BrewLogic dari daftar aplikasi.",
];

const iosSteps = [
  "Unduh berkas IPA di komputer, lalu sambungkan iPhone dengan kabel.",
  "Buka AltStore atau Sideloadly, pilih berkas IPA, dan masuk dengan Apple ID.",
  "Di iPhone, buka Pengaturan, Umum, VPN & Manajemen Perangkat, lalu percayai profil developer milikmu.",
  "Buka BrewLogic dari layar utama.",
];

const methods = "V60  /  Aeropress  /  French Press  /  Chemex  /  V60  /  Aeropress  /  ";
const roasts = "Light  /  Medium  /  Dark  /  Light  /  Medium  /  Dark  /  Light  /  Medium  /  ";

const idx = (i: number) => ({ "--i": i }) as CSSProperties;

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-6">
      {steps.map((step, i) => (
        <li
          key={step}
          className="reveal grid grid-cols-[2.75rem_1fr] gap-3 border-t border-cream/15 py-4 leading-relaxed first:border-t-0"
        >
          <span className="font-display text-2xl leading-none text-sage">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

export default async function Home() {
  const releases = await getReleases();
  const android = releases.find((r) => r.platform === "android")!;
  const ios = releases.find((r) => r.platform === "ios")!;

  return (
    <>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
        <a href="#" className="inline-flex h-11 items-center gap-3">
          <Image
            src="/app-icon.png"
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-[10px]"
          />
          <span className="font-display text-2xl">BrewLogic</span>
        </a>
        <nav aria-label="Navigasi halaman">
          <ul className="flex items-center sm:gap-2">
            {navLinks.map((link) => (
              <li key={link.href} className={link.hideOnMobile ? "hidden sm:block" : ""}>
                <a
                  href={link.href}
                  className="inline-flex h-11 items-center px-2.5 text-sm text-cream-soft underline-offset-4 transition-colors hover:text-cream hover:underline sm:px-3 sm:text-base"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero: tagline asli aplikasi, tombol unduh langsung, dan animasi menuang di tengah riak. */}
        <section
          aria-label="BrewLogic"
          className="mx-auto grid w-full max-w-6xl items-center gap-10 overflow-x-clip px-4 pb-20 pt-8 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pb-28 lg:pt-14"
        >
          <div className="lg:col-span-7">
            <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              <span className="rise block" style={idx(0)}>
                Seduh presisi,
              </span>
              <span className="rise block" style={idx(1)}>
                nikmati pelan.
              </span>
            </h1>
            <p
              className="rise mt-7 max-w-xl text-lg leading-relaxed text-cream-soft"
              style={idx(3)}
            >
              BrewLogic menemani homebrewer di setiap cangkir: menghitung takaran
              dan suhu, memandu seduhan step-by-step dengan timer, lalu menyimpan
              resep, biji, rating, dan catatan rasa dalam satu jurnal.
            </p>

            <div
              className="rise mt-9 grid max-w-xl gap-3 sm:grid-cols-2"
              style={idx(4)}
            >
              <DownloadButton release={android} />
              <DownloadButton release={ios} />
            </div>

            <p className="rise mt-5 text-sm text-cream-soft" style={idx(5)}>
              {(android.version ?? ios.version) &&
                `Versi ${android.version ?? ios.version}. `}
              Offline dan tanpa akun, semua data tersimpan di perangkatmu.{" "}
              <a
                href="#unduh"
                className="inline-flex h-11 items-center text-cream underline underline-offset-4 hover:text-caramel"
              >
                Detail berkas
              </a>
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="ripple absolute inset-[6%] rounded-full border border-caramel"
                  style={idx(i)}
                />
              ))}
              <div className="absolute inset-0 grid place-items-center">
                <PourAnimation className="w-[70%]" />
              </div>
            </div>
          </div>
        </section>

        {/* Fitur: tiga fitur utama berukuran besar, sisanya ringkas. Judul menempel di kiri. */}
        <section
          id="fitur"
          aria-labelledby="fitur-title"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 lg:py-28"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-8 lg:col-span-4 lg:self-start">
              <h2
                id="fitur-title"
                className="font-display text-4xl leading-tight sm:text-5xl"
              >
                Dari takaran sampai jurnal
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-cream-soft">
                Satu aplikasi untuk menghitung, menyeduh, dan mengingat rasa
                setiap seduhan.
              </p>
            </div>

            <div className="lg:col-span-8">
              {mainFeatures.map((f, i) => (
                <article
                  key={f.title}
                  className="reveal grid gap-3 border-t border-cream/20 py-8 sm:grid-cols-[5rem_1fr] sm:gap-6"
                >
                  <span className="font-display text-4xl leading-none text-sage">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl">{f.title}</h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-cream-soft">
                      {f.text}
                    </p>
                  </div>
                </article>
              ))}

              <div className="grid border-t border-cream/20 sm:grid-cols-2 sm:gap-x-10">
                {moreFeatures.map((f) => (
                  <article
                    key={f.title}
                    className="reveal border-b border-cream/10 py-5 sm:border-b-0 sm:border-t sm:first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
                  >
                    <h3 className="font-medium text-cream">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream-soft">
                      {f.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Metode dan roasting yang didukung, bergeser berlawanan arah saat di-scroll. */}
        <section
          aria-label="Metode seduh dan tingkat roasting"
          className="overflow-x-clip border-y border-cream/15 py-12 sm:py-16"
        >
          <p className="sr-only">
            Metode seduh: V60, Aeropress, French Press, dan Chemex. Tingkat
            roasting: Light, Medium, dan Dark.
          </p>
          <div
            aria-hidden="true"
            className="drift-left whitespace-pre font-display text-5xl text-cream sm:text-7xl"
          >
            {methods}
          </div>
          <div
            aria-hidden="true"
            className="drift-right mt-3 whitespace-pre font-display text-5xl text-sage sm:mt-5 sm:text-7xl"
          >
            {roasts}
          </div>
        </section>

        {/* Unduh: baris lebar per platform dengan data nyata dari berkas. */}
        <section
          id="unduh"
          aria-labelledby="unduh-title"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 lg:py-28"
        >
          <h2 id="unduh-title" className="font-display text-4xl sm:text-5xl">
            Unduh BrewLogic
          </h2>
          <p className="mt-4 max-w-xl text-cream-soft">
            Android memakai berkas APK, iPhone memakai berkas IPA. Berkas
            diunduh dari GitHub Releases, lengkap dengan ukuran, tanggal, dan
            SHA-256 dari rilis tersebut.
          </p>
          <div className="mt-10 border-b border-cream/20">
            <DownloadRow release={android} />
            <DownloadRow release={ios} />
          </div>
        </section>

        {/* Pasang: dua panel dengan panjang berbeda karena iOS punya langkah dan catatan tambahan. */}
        <section
          id="pasang"
          aria-labelledby="pasang-title"
          className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-8 lg:pb-28"
        >
          <h2 id="pasang-title" className="font-display text-4xl sm:text-5xl">
            Cara memasang
          </h2>
          <div className="mt-10 grid items-start gap-6 lg:grid-cols-12">
            <div className="rounded-md border border-cream/20 bg-roast p-6 sm:p-8 lg:col-span-5">
              <h3 className="font-display text-3xl">Android</h3>
              <p className="mt-2 text-sm text-cream-soft">{android.requirement}</p>
              <Steps steps={androidSteps} />
            </div>

            <div className="rounded-md border border-cream/20 bg-roast p-6 sm:p-8 lg:col-span-7">
              <h3 className="font-display text-3xl">iPhone</h3>
              <p className="mt-2 text-sm text-cream-soft">{ios.requirement}</p>
              <p className="mt-5 max-w-xl leading-relaxed">
                iOS tidak membuka berkas IPA langsung dari browser seperti APK di
                Android. IPA dipasang dari komputer lewat alat sideload yang
                menandatanganinya dengan Apple ID milikmu.
              </p>
              <Steps steps={iosSteps} />
              <p className="mt-4 rounded-md border border-sage/50 p-4 text-sm leading-relaxed">
                Aplikasi yang ditandatangani dengan Apple ID gratis berhenti
                bekerja setelah 7 hari dan perlu dipasang ulang dari langkah 2.
                Satu Apple ID gratis juga dibatasi maksimal 3 aplikasi sideload
                aktif.
              </p>
            </div>
          </div>
        </section>

        {/* Verifikasi: hash dihitung dari berkas asli saat build. */}
        <section
          id="verifikasi"
          aria-labelledby="verifikasi-title"
          className="border-t border-cream/15"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:py-24">
            <div className="lg:col-span-4">
              <h2
                id="verifikasi-title"
                className="font-display text-3xl leading-tight sm:text-4xl"
              >
                Cek berkas sebelum dipasang
              </h2>
              <p className="mt-4 leading-relaxed text-cream-soft">
                Hitung SHA-256 berkas yang kamu unduh, lalu cocokkan dengan nilai
                di samping. Jika berbeda, unduh ulang.
              </p>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-cream-soft">macOS / Linux</dt>
                  <dd className="mt-1 break-all font-mono">
                    shasum -a 256 brewlogic.apk
                  </dd>
                </div>
                <div>
                  <dt className="text-cream-soft">Windows</dt>
                  <dd className="mt-1 break-all font-mono">
                    certutil -hashfile brewlogic.apk SHA256
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-cream-soft">
                Untuk IPA, ganti nama berkasnya menjadi brewlogic.ipa.
              </p>
            </div>

            <div className="lg:col-span-8">
              <ul>
                {[android, ios].map((release) => (
                  <li
                    key={release.platform}
                    className="reveal border-t border-cream/20 py-5 last:border-b"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-sm">{release.fileName}</p>
                      {release.sha256 && (
                        <CopyButton value={release.sha256} label={release.fileName} />
                      )}
                    </div>
                    {release.sha256 ? (
                      <p className="mt-3 break-all font-mono text-sm leading-relaxed text-cream-soft">
                        {release.sha256}
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-cream-soft">
                        {release.status === "ready"
                          ? `GitHub belum menyediakan SHA-256 untuk berkas ${release.format} ini.`
                          : `Nilai SHA-256 muncul setelah berkas ${release.format} tersedia.`}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer: kredit pengembang dan tautan dari AppInfo di proyek Flutter. */}
      <footer className="border-t border-cream/15 bg-espresso pb-20">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:px-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <p className="font-display text-2xl">BrewLogic</p>
            <p className="mt-2 text-sm text-cream-soft">
              Dibuat oleh Hadi Ramdhani, Kota Bandung. 2026.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 md:col-span-6 md:justify-end">
            <li>
              <a
                href="https://github.com/0xHadiRamdhani"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center underline underline-offset-4 hover:text-caramel"
              >
                GitHub 0xHadiRamdhani
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/hadiramdhani.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center underline underline-offset-4 hover:text-caramel"
              >
                Instagram @hadiramdhani.tsx
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex h-11 items-center underline underline-offset-4 hover:text-caramel"
              >
                Kembali ke atas
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
