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

/** Menjeda animasi yang berulang (riak dan animasi menuang). Wajib ada karena geraknya lebih dari 5 detik. */
export function MotionToggle() {
  const paused = useSyncExternalStore(subscribe, isPaused, () => false);

  // Pengguna yang meminta gerak minim memulai dalam keadaan jeda.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.dataset.motion = "paused";
    }
  }, []);

  return (
    <button
      type="button"
      aria-pressed={paused}
      onClick={() => {
        document.documentElement.dataset.motion = paused ? "play" : "paused";
      }}
      className="fixed bottom-4 right-4 z-50 inline-flex h-11 items-center gap-2.5 rounded-md border border-cream/30 bg-roast px-4 text-sm font-medium text-cream transition-colors hover:border-caramel hover:text-caramel active:translate-y-px"
    >
      <span
        aria-hidden="true"
        className="relative block h-3 w-3 text-current"
      >
        {paused ? (
          <svg viewBox="0 0 12 12" fill="currentColor">
            <path d="M2 1v10l9-5z" />
          </svg>
        ) : (
          <svg viewBox="0 0 12 12" fill="currentColor">
            <path d="M2 1h3v10H2zM7 1h3v10H7z" />
          </svg>
        )}
      </span>
      {paused ? "Putar animasi" : "Jeda animasi"}
    </button>
  );
}
