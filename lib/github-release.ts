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
  assets: GithubAsset[];
};

/** "v1.2.0+3" menjadi "1.2.0 (build 3)", "v1.2.0" menjadi "1.2.0". */
export function formatTag(tag: string) {
  const match = /^v?(\d+(?:\.\d+)*)(?:\+(\d+))?$/.exec(tag.trim());
  if (!match) return tag.replace(/^v/, "");
  return match[2] ? `${match[1]} (build ${match[2]})` : match[1];
}

export function findAsset(release: GithubRelease, fileName: string) {
  return release.assets.find((asset) => asset.name === fileName);
}

export function sha256FromDigest(digest?: string | null) {
  const match = /^sha256:([0-9a-f]{64})$/i.exec(digest ?? "");
  return match ? match[1].toLowerCase() : undefined;
}
