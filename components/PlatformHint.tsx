"use client";

import { useEffect } from "react";
import { detectPlatform } from "@/lib/use-platform";

/** Menandai perangkat pengunjung di <html data-platform> agar CSS bisa mengutamakan unduhan yang cocok. */
export function PlatformHint() {
  useEffect(() => {
    document.documentElement.dataset.platform = detectPlatform(navigator.userAgent);
  }, []);
  return null;
}
