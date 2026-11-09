import { useSyncExternalStore } from "react";

export type Platform = "android" | "ios" | "other";

export function detectPlatform(userAgent: string): Platform {
  if (/android/i.test(userAgent)) return "android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "ios";
  return "other";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-platform"],
  });
  return () => observer.disconnect();
}

const read = () => (document.documentElement.dataset.platform as Platform) ?? "other";

/** Perangkat pengunjung, diisi PlatformHint setelah halaman tampil. Server selalu "other". */
export function usePlatform() {
  return useSyncExternalStore(subscribe, read, () => "other" as Platform);
}
