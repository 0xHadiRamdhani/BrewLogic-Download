import Image from "next/image";
import type { CSSProperties } from "react";
import { BottomNav } from "@/components/BottomNav";
import { CopyButton } from "@/components/CopyButton";
import { DownloadButton, DownloadRow } from "@/components/DownloadRow";
import { InstallTabs } from "@/components/InstallTabs";
import { MotionToggle } from "@/components/MotionToggle";
import { PourAnimation } from "@/components/PourAnimation";
import { getReleases } from "@/lib/releases";

const navLinks = [
  { href: "#fitur", label: "Fitur" },
  { href: "#unduh", label: "Unduh" },
  { href: "#pasang", label: "Pasang" },
  { href: "#verifikasi", label: "Verifikasi" },
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
    title: "Resep dan biji",
    text: "Simpan resep favorit dan perpustakaan biji, lengkap dengan kesegaran biji.",
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
    <ol className="mt-5">
      {steps.map((step, i) => (
        <li
          key={step}
          className="grid grid-cols-[2.75rem_1fr] gap-3 border-t border-cream/15 py-4 leading-relaxed first:border-t-0"
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
  const version = android.version ?? ios.version;

  return (
    <>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
        <a href="#atas" className="inline-flex h-11 items-center gap-3">
          <Image
            src="/app-icon.png"
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-[10px]"
          />
          <span className="font-display text-2xl">BrewLogic</span>
        </a>
        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex h-11 items-center px-3 text-cream-soft underline-offset-4 transition-colors hover:text-cream hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <MotionToggle compact className="inline-flex md:hidden" />
      </header>

      <main className="flex-1">
        {/* Hero: di layar kecil animasi menuang tampil lebih dulu (aset terbaik), lalu judul dan tombol. */}
        <section
          id="atas"
          aria-label="BrewLogic"
          className="mx-auto grid w-full max-w-6xl items-center gap-5 overflow-x-clip px-4 pb-14 pt-1 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pb-28 lg:pt-14"
        >
          <div className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left">
            <h1 className="font-display text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
              <span className="rise block" style={idx(0)}>
                Seduh presisi,
              </span>
              <span className="rise block" style={idx(1)}>
                nikmati pelan.
              </span>
            </h1>
            <p
              className="rise mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream-soft sm:text-lg lg:mx-0 lg:mt-7"
              style={idx(3)}
            >
              BrewLogic menemani homebrewer di setiap cangkir: menghitung takaran
              dan suhu, memandu seduhan step-by-step dengan timer, lalu menyimpan
              resep, biji, rating, dan catatan rasa dalam satu jurnal.
            </p>

            <div
              className="rise mx-auto mt-7 grid max-w-xl gap-3 sm:grid-cols-2 lg:mx-0 lg:mt-9"
              style={idx(4)}
            >
              <div className="pf-android">
                <DownloadButton release={android} />
              </div>
              <div className="pf-ios">
                <DownloadButton release={ios} />
              </div>
            </div>

            <p className="rise mt-5 text-sm text-cream-soft" style={idx(5)}>
              {version && `Versi ${version} · `}Offline · Tanpa akun
              <a
                href="#unduh"
                className="ml-2 inline-flex h-11 items-center text-cream underline underline-offset-4 hover:text-caramel"
              >
                Detail berkas
              </a>
            </p>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative mx-auto aspect-square w-[68%] max-w-[17rem] sm:max-w-sm lg:w-full lg:max-w-md">
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

        {/* Fitur: tiga fitur utama (geser ke samping di layar kecil), sisanya ringkas. */}
        <section
          id="fitur"
          aria-labelledby="fitur-title"
          className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 lg:py-28"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-8 lg:col-span-4 lg:self-start">
              <h2
                id="fitur-title"
                className="font-display text-4xl leading-tight sm:text-5xl"
              >
                Dari takaran sampai jurnal
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-cream-soft lg:mt-5">
                Satu aplikasi untuk menghitung, menyeduh, dan mengingat rasa
                setiap seduhan.
              </p>
            </div>

            <div className="min-w-0 lg:col-span-8">
              <div
                tabIndex={0}
                role="region"
                aria-label="Fitur utama, geser ke samping untuk melihat semuanya"
                className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:block lg:overflow-visible lg:px-0 lg:pb-0"
              >
                {mainFeatures.map((f, i) => (
                  <article
                    key={f.title}
                    className="reveal-lg grid w-[82%] shrink-0 snap-start gap-3 rounded-2xl border border-cream/15 bg-roast p-5 sm:w-[55%] lg:w-auto lg:grid-cols-[5rem_1fr] lg:gap-6 lg:rounded-none lg:border-0 lg:border-t lg:border-cream/20 lg:bg-transparent lg:p-0 lg:py-8"
                  >
                    <span className="font-display text-4xl leading-none text-sage">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl lg:text-3xl">{f.title}</h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-cream-soft">
                        {f.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 lg:mt-0 lg:gap-x-10 lg:gap-y-0 lg:border-t lg:border-cream/20">
                {moreFeatures.map((f, i) => (
                  <article
                    key={f.title}
                    className={`reveal-lg rounded-xl border border-cream/10 bg-roast/70 p-4 lg:rounded-none lg:border-0 lg:border-b lg:border-cream/10 lg:bg-transparent lg:px-0 lg:py-5 ${
                      i === moreFeatures.length - 1 ? "col-span-2 lg:col-span-1" : ""
                    }`}
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
          className="overflow-x-clip border-y border-cream/15 py-9 sm:py-16"
        >
          <p className="sr-only">
            Metode seduh: V60, Aeropress, French Press, dan Chemex. Tingkat
            roasting: Light, Medium, dan Dark.
          </p>
          <div
            aria-hidden="true"
            className="drift-left whitespace-pre font-display text-4xl text-cream sm:text-7xl"
          >
            {methods}
          </div>
          <div
            aria-hidden="true"
            className="drift-right mt-2 whitespace-pre font-display text-4xl text-sage sm:mt-5 sm:text-7xl"
          >
            {roasts}
          </div>
        </section>

        {/* Unduh: kartu di layar kecil (perangkat pengunjung tampil dulu), baris lebar di layar lebar. */}
        <section
          id="unduh"
          aria-labelledby="unduh-title"
          className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 lg:py-28"
        >
          <h2 id="unduh-title" className="font-display text-4xl sm:text-5xl">
            Unduh BrewLogic
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-cream-soft">
            Android memakai berkas APK, iPhone memakai berkas IPA. Berkas
            diunduh dari GitHub Releases, lengkap dengan ukuran, tanggal, dan
            SHA-256 dari rilis tersebut.
          </p>
          <div className="mt-8 flex flex-col gap-4 md:mt-10 md:block md:border-b md:border-cream/20">
            <DownloadRow release={android} />
            <DownloadRow release={ios} />
          </div>
        </section>

        {/* Pasang: satu panel dengan pilihan perangkat di layar kecil, dua panel di layar lebar. */}
        <section
          id="pasang"
          aria-labelledby="pasang-title"
          className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-8 lg:pb-28"
        >
          <h2 id="pasang-title" className="font-display text-4xl sm:text-5xl">
            Cara memasang
          </h2>
          <div className="mt-6 lg:mt-10">
            <InstallTabs
              android={
                <div className="rounded-2xl border border-cream/15 bg-roast p-5 sm:p-8">
                  <h3 className="font-display text-3xl">Android</h3>
                  <p className="mt-2 text-sm text-cream-soft">{android.requirement}</p>
                  <Steps steps={androidSteps} />
                </div>
              }
              ios={
                <div className="rounded-2xl border border-cream/15 bg-roast p-5 sm:p-8">
                  <h3 className="font-display text-3xl">iPhone</h3>
                  <p className="mt-2 text-sm text-cream-soft">{ios.requirement}</p>
                  <p className="mt-5 max-w-xl leading-relaxed">
                    iOS tidak membuka berkas IPA langsung dari browser seperti APK
                    di Android. IPA dipasang dari komputer lewat alat sideload yang
                    menandatanganinya dengan Apple ID milikmu.
                  </p>
                  <Steps steps={iosSteps} />
                  <p className="mt-4 rounded-xl border border-sage/50 p-4 text-sm leading-relaxed">
                    Aplikasi yang ditandatangani dengan Apple ID gratis berhenti
                    bekerja setelah 7 hari dan perlu dipasang ulang dari langkah 2.
                    Satu Apple ID gratis juga dibatasi maksimal 3 aplikasi sideload
                    aktif.
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* Verifikasi: hash dihitung dari aset rilis di GitHub. */}
        <section
          id="verifikasi"
          aria-labelledby="verifikasi-title"
          className="border-t border-cream/15"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:py-24">
            <div className="lg:col-span-4">
              <h2
                id="verifikasi-title"
                className="font-display text-3xl leading-tight sm:text-4xl"
              >
                Cek berkas sebelum dipasang
              </h2>
              <p className="mt-4 leading-relaxed text-cream-soft">
                Hitung SHA-256 berkas yang kamu unduh, lalu cocokkan dengan nilai
                berikut. Jika berbeda, unduh ulang.
              </p>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="rounded-xl bg-roast p-3 md:bg-transparent md:p-0">
                  <dt className="text-cream-soft">macOS / Linux</dt>
                  <dd className="mt-1 break-words font-mono">
                    shasum -a 256 brewlogic.apk
                  </dd>
                </div>
                <div className="rounded-xl bg-roast p-3 md:bg-transparent md:p-0">
                  <dt className="text-cream-soft">Windows</dt>
                  <dd className="mt-1 break-words font-mono">
                    certutil -hashfile brewlogic.apk SHA256
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-cream-soft">
                Untuk IPA, ganti nama berkasnya menjadi brewlogic.ipa.
              </p>
            </div>

            <div className="lg:col-span-8">
              <ul className="grid gap-3 md:block">
                {[android, ios].map((release) => (
                  <li
                    key={release.platform}
                    className="reveal rounded-2xl border border-cream/15 bg-roast p-4 md:rounded-none md:border-0 md:border-t md:border-cream/20 md:bg-transparent md:px-0 md:py-5 md:last:border-b"
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
      <footer className="border-t border-cream/15 bg-espresso pb-28 md:pb-20">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-9 sm:px-8 md:grid-cols-12 md:items-end md:py-10">
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
                href="#atas"
                className="inline-flex h-11 items-center underline underline-offset-4 hover:text-caramel"
              >
                Kembali ke atas
              </a>
            </li>
          </ul>
        </div>
      </footer>

      <BottomNav />
    </>
  );
}
