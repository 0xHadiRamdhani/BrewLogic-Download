import { cacheLife } from "next/cache";
import {
  findAsset,
  formatTag,
  sha256FromDigest,
  type GithubRelease,
} from "@/lib/github-release";

// Berkas APK dan IPA tidak disimpan di repo atau public/. Keduanya diunggah
// sebagai aset GitHub Release di repo ini, lalu dibaca lewat GitHub API.
const REPO = "0xHadiRamdhani/BrewLogic-Download";

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
  /** Dari tag rilis, mis. "v1.2.0+3" menjadi "1.2.0 (build 3)". */
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
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
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

// Dicache karena fetch eksternal dianggap data runtime oleh Cache Components.
// Rilis baru muncul setelah cache kedaluwarsa: 1 jam bila semua berkas ada,
// 1 menit bila ada yang belum tersedia supaya rilis pertama cepat terbaca.
export async function getReleases(): Promise<ReleaseInfo[]> {
  "use cache";

  const latest = await fetchLatestRelease();

  const releases = RELEASES.map((config): ReleaseInfo => {
    if (latest.state !== "ok") return { ...config, status: latest.state };
    const asset = findAsset(latest.release, config.fileName);
    if (!asset) return { ...config, status: "missing" };
    return {
      ...config,
      status: "ready",
      href: asset.browser_download_url,
      version: formatTag(latest.release.tag_name),
      size: formatSize(asset.size),
      updatedAt: dateFormat.format(new Date(asset.updated_at)),
      sha256: sha256FromDigest(asset.digest),
    };
  });

  if (releases.every((r) => r.status === "ready")) cacheLife("hours");
  else cacheLife("minutes");
  return releases;
}
