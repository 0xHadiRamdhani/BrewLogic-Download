import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { cacheLife } from "next/cache";

export type ReleaseConfig = {
  platform: "android" | "ios";
  name: string;
  format: "APK" | "IPA";
  /** Nama berkas di folder public/download/ */
  fileName: string;
  /** Versi aplikasi, diambil dari pubspec.yaml dan metadata berkas rilis. */
  version: string;
  /** Persyaratan sistem minimum, diambil dari metadata berkas rilis. */
  requirement: string;
};

export type ReleaseInfo = ReleaseConfig & {
  href: string;
  status: "ready" | "missing" | "error";
  size?: string;
  updatedAt?: string;
  sha256?: string;
};

// Sumber: pubspec.yaml (1.2.0+3), Info.plist IPA (MinimumOSVersion 15.0),
// dan AndroidManifest APK (minSdkVersion 24 = Android 7.0).
export const RELEASES: ReleaseConfig[] = [
  {
    platform: "android",
    name: "Android",
    format: "APK",
    fileName: "brewlogic.apk",
    version: "1.2.0 (build 3)",
    requirement: "Android 7.0+",
  },
  {
    platform: "ios",
    name: "iPhone",
    format: "IPA",
    fileName: "brewlogic.ipa",
    version: "1.2.0 (build 3)",
    requirement: "iOS 15.0+",
  },
];

const DOWNLOAD_DIR = path.join(process.cwd(), "public", "download");

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

function sha256Of(file: string) {
  return new Promise<string>((resolve, reject) => {
    const hash = createHash("sha256");
    createReadStream(file)
      .on("error", reject)
      .on("data", (chunk) => hash.update(chunk))
      .on("end", () => resolve(hash.digest("hex")));
  });
}

async function readRelease(config: ReleaseConfig): Promise<ReleaseInfo> {
  const base = { ...config, href: `/download/${config.fileName}` };
  const file = path.join(DOWNLOAD_DIR, config.fileName);

  try {
    const info = await stat(file);
    if (!info.isFile()) return { ...base, status: "missing" };
    return {
      ...base,
      status: "ready",
      size: formatSize(info.size),
      updatedAt: dateFormat.format(info.mtime),
      sha256: await sha256Of(file),
    };
  } catch (error) {
    const missing = (error as NodeJS.ErrnoException).code === "ENOENT";
    return { ...base, status: missing ? "missing" : "error" };
  }
}

// Dicache karena membaca disk dianggap data runtime oleh Cache Components.
// Berkas baru di public/download/ terbaca lagi saat cache kedaluwarsa (jam).
export async function getReleases() {
  "use cache";
  cacheLife("hours");
  return Promise.all(RELEASES.map(readRelease));
}
