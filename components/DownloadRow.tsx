import Image from "next/image";
import type { ReleaseInfo } from "@/lib/releases";

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-espresso/60 px-3 py-2.5 md:rounded-none md:bg-transparent md:p-0">
      <dt className="text-sm text-cream-soft">{label}</dt>
      <dd className="mt-0.5 font-medium text-cream">{value}</dd>
    </div>
  );
}

export function DownloadButton({
  release,
  compact = false,
}: {
  release: ReleaseInfo;
  compact?: boolean;
}) {
  if (release.status !== "ready") {
    return (
      <button
        type="button"
        disabled
        className="flex min-h-14 w-full cursor-not-allowed items-center justify-center rounded-xl border border-cream/25 px-5 py-2 font-medium text-cream-soft"
      >
        {release.format} belum tersedia
      </button>
    );
  }

  return (
    <a
      href={release.href}
      download
      className={`dl-${release.platform} sweep flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-caramel px-5 py-2.5 text-left font-medium text-on-accent active:translate-y-px`}
    >
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        className="shrink-0"
      >
        <path d="M9 2v9M5 7.5 9 11.5l4-4M2.5 15.5h13" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span>
          Unduh {release.format} untuk {release.name}
        </span>
        {!compact && (
          <span className="text-sm font-normal">
            {release.requirement} · {release.size}
          </span>
        )}
      </span>
    </a>
  );
}

export function DownloadRow({ release }: { release: ReleaseInfo }) {
  const id = `unduh-${release.platform}`;
  const ready = release.status === "ready";

  return (
    <article
      aria-labelledby={id}
      className={`pf-${release.platform} reveal grid gap-5 rounded-2xl border border-cream/15 bg-roast p-5 md:grid-cols-12 md:items-center md:gap-8 md:rounded-none md:border-0 md:border-t md:border-cream/20 md:bg-transparent md:px-0 md:py-8`}
    >
      <div className="flex items-center gap-4 md:col-span-4">
        <Image
          src="/app-icon.png"
          alt=""
          width={64}
          height={64}
          className="size-16 rounded-[16px]"
        />
        <div>
          <h3 id={id} className="font-display text-3xl leading-none">
            {release.name}
          </h3>
          <p className="mt-1.5 font-mono text-sm text-cream-soft">
            .{release.format.toLowerCase()}
          </p>
        </div>
      </div>

      {ready ? (
        <dl className="grid grid-cols-2 gap-2.5 md:col-span-4 md:gap-x-6 md:gap-y-4">
          <Fact label="Versi" value={release.version ?? "-"} />
          <Fact label="Persyaratan" value={release.requirement} />
          <Fact label="Ukuran" value={release.size ?? "-"} />
          <Fact label="Diperbarui" value={release.updatedAt ?? "-"} />
        </dl>
      ) : (
        <p role="status" className="text-cream-soft md:col-span-4">
          {release.status === "missing"
            ? `Berkas ${release.format} belum diunggah. Silakan kembali beberapa saat lagi.`
            : `Data rilis ${release.format} gagal dimuat dari GitHub. Silakan muat ulang halaman beberapa saat lagi.`}
        </p>
      )}

      <div className="md:col-span-4">
        <DownloadButton release={release} compact />
      </div>
    </article>
  );
}
