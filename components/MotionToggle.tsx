"use client";

import { useEffect, useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  return () => observer.disconnect();
}

const isPaused = () => document.documentElement.dataset.motion === "paused";

/**
 * Menjeda animasi yang berulang (riak dan animasi menuang). Wajib ada karena geraknya
 * lebih dari 5 detik. `compact` hanya menampilkan ikon (dipakai di header layar kecil).
 */
export function MotionToggle({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const paused = useSyncExternalStore(subscribe, isPaused, () => false);

  // Pengguna yang meminta gerak minim memulai dalam keadaan jeda.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.dataset.motion = "paused";
    }
  }, []);

  const label = paused ? "Putar animasi" : "Jeda animasi";

  return (
    <button
      type="button"
      aria-pressed={paused}
      aria-label={compact ? label : undefined}
      onClick={() => {
        document.documentElement.dataset.motion = paused ? "play" : "paused";
      }}
      className={`items-center justify-center gap-2.5 rounded-xl border border-cream/30 bg-roast text-sm font-medium text-cream transition-colors hover:border-caramel hover:text-caramel active:translate-y-px ${
        compact ? "size-11" : "h-11 px-4"
      } ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        width="12"
        height="12"
        fill="currentColor"
      >
        {paused ? <path d="M2 1v10l9-5z" /> : <path d="M2 1h3v10H2zM7 1h3v10H7z" />}
      </svg>
      {!compact && label}
    </button>
  );
}
