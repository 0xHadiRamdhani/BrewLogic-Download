import { cacheLife } from "next/cache";
import {
  findAsset,
  sha256FromDigest,
  versionFromPubspec,
  versionFromRelease,
  type GithubRelease,
} from "@/lib/github-release";

// Berkas APK dan IPA tidak disimpan di repo ini atau di public/. Keduanya adalah
// aset GitHub Release "ReleaseLatest" di repo aplikasinya, dibaca lewat GitHub API.
const REPO = "0xHadiRamdhani/BrewLogic";
const RELEASE_TAG = "ReleaseLatest";

export type ReleaseConfig = {
  platform: "android" | "ios";
  name: string;
  format: "APK" | "IPA";
  /** Nama aset di GitHub Release, harus persis sama. */
  fileName: string;
  /** Persyaratan sistem minimum, dari manifest APK (minSdk 24) dan Info.plist IPA (15.0). */
  requirement: string;
};

export type ReleaseInfo = ReleaseConfig & {
  status: "ready" | "missing" | "error";
  href?: string;
  /** Mis. "1.2.0 (build 3)". Dari tag, judul, atau catatan rilis; jika tidak ada, dari pubspec.yaml. */
  version?: string;
  size?: string;
  updatedAt?: string;
  sha256?: string;
};

export const RELEASES: ReleaseConfig[] = [
  {
    platform: "android",
    name: "Android",
    format: "APK",
    fileName: "brewlogic.apk",
    requirement: "Android 7.0+",
  },
  {
    platform: "ios",
    name: "iPhone",
    format: "IPA",
    fileName: "brewlogic.ipa",
    requirement: "iOS 15.0+",
  },
];

const sizeFormat = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 });
const dateFormat = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "long",
  timeZone: "Asia/Jakarta",
});

function formatSize(bytes: number) {
  if (bytes >= 1024 ** 3) return `${sizeFormat.format(bytes / 1024 ** 3)} GB`;
  if (bytes >= 1024 ** 2) return `${sizeFormat.format(bytes / 1024 ** 2)} MB`;
  return `${sizeFormat.format(bytes / 1024)} KB`;
}

type LatestRelease =
  | { state: "ok"; release: GithubRelease }
  | { state: "missing" | "error" };

async function fetchLatestRelease(): Promise<LatestRelease> {
  // GITHUB_TOKEN opsional, hanya untuk menaikkan batas permintaan API (60 per jam tanpa token).
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/tags/${RELEASE_TAG}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 404) return { state: "missing" };
    if (!res.ok) return { state: "error" };
    return { state: "ok", release: (await res.json()) as GithubRelease };
  } catch {
    return { state: "error" };
  }
}

// Tag "ReleaseLatest" tidak memuat versi, jadi versi dibaca dari pubspec.yaml di
// branch utama repo aplikasi. Hasilnya benar selama rilis diunggah setelah versi
// di pubspec dinaikkan; judul atau catatan rilis berisi versi akan diutamakan.
async function fetchPubspecVersion() {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${REPO}/HEAD/pubspec.yaml`, {
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? versionFromPubspec(await res.text()) : undefined;
  } catch {
    return undefined;
  }
}

// Dicache karena fetch eksternal dianggap data runtime oleh Cache Components.
// Rilis baru muncul setelah cache kedaluwarsa: 1 jam bila semua berkas ada,
// 1 menit bila ada yang belum tersedia supaya rilis pertama cepat terbaca.
export async function getReleases(): Promise<ReleaseInfo[]> {
  "use cache";

  const latest = await fetchLatestRelease();
  const version =
    latest.state === "ok"
      ? (versionFromRelease(latest.release) ?? (await fetchPubspecVersion()))
      : undefined;

  const releases = RELEASES.map((config): ReleaseInfo => {
    if (latest.state !== "ok") return { ...config, status: latest.state };
    const asset = findAsset(latest.release, config.fileName);
    if (!asset) return { ...config, status: "missing" };
    return {
      ...config,
      status: "ready",
      href: asset.browser_download_url,
      version,
      size: formatSize(asset.size),
      updatedAt: dateFormat.format(new Date(asset.updated_at)),
      sha256: sha256FromDigest(asset.digest),
    };
  });

  if (releases.every((r) => r.status === "ready")) cacheLife("hours");
  else cacheLife("minutes");
  return releases;
}
