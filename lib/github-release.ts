// Bentuk data GitHub Releases API yang dipakai situs, dan pengurai murninya
// (tanpa impor Next.js supaya mudah diuji).

export type GithubAsset = {
  name: string;
  size: number;
  updated_at: string;
  /** Contoh: "sha256:ab12...". Bisa kosong untuk berkas yang diunggah sebelum fitur ini ada. */
  digest?: string | null;
  browser_download_url: string;
};

export type GithubRelease = {
  tag_name: string;
  name?: string | null;
  body?: string | null;
  assets: GithubAsset[];
};

function formatVersion(version: string, build?: string) {
  return build ? `${version} (build ${build})` : version;
}

/** Mencari versi seperti "v1.2.0+3" atau "1.2.0" di dalam teks, mis. judul atau catatan rilis. */
export function parseVersion(text?: string | null) {
  const match = /(?<![\w.])v?(\d+\.\d+(?:\.\d+)*)(?:\+(\d+))?(?![\w.])/.exec(text ?? "");
  return match ? formatVersion(match[1], match[2]) : undefined;
}

/** Membaca baris `version: 1.2.0+3` dari pubspec.yaml. */
export function versionFromPubspec(yaml?: string | null) {
  const line = /^version:\s*(\S+)/m.exec(yaml ?? "");
  return line ? parseVersion(line[1]) : undefined;
}

/** Versi dari tag, lalu judul, lalu catatan rilis. Tag seperti "ReleaseLatest" tidak punya versi. */
export function versionFromRelease(release: GithubRelease) {
  return (
    parseVersion(release.tag_name) ??
    parseVersion(release.name) ??
    parseVersion(release.body)
  );
}

export function findAsset(release: GithubRelease, fileName: string) {
  return release.assets.find((asset) => asset.name === fileName);
}

export function sha256FromDigest(digest?: string | null) {
  const match = /^sha256:([0-9a-f]{64})$/i.exec(digest ?? "");
  return match ? match[1].toLowerCase() : undefined;
}
