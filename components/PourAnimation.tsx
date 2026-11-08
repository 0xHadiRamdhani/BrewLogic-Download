"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

// Frame yang ditampilkan saat animasi dijeda sejak awal: ketel sedang menuang.
const STILL_FRAME = 90;

/** Animasi menuang kopi asli dari aplikasi (assets/animations/pour.json), dimuat setelah halaman tampil. */
export function PourAnimation({ className = "" }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let animation: AnimationItem | undefined;
    let observer: MutationObserver | undefined;
    const paused = () => document.documentElement.dataset.motion === "paused";

    (async () => {
      const lottie = (await import("lottie-web/build/player/lottie_light")).default;
      if (cancelled || !container.current) return;

      animation = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: "/animations/pour.json",
      });

      animation.addEventListener("DOMLoaded", () => {
        if (paused()) animation?.goToAndStop(STILL_FRAME, true);
        else animation?.play();
      });

      observer = new MutationObserver(() => {
        if (paused()) animation?.pause();
        else animation?.play();
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-motion"],
      });
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      animation?.destroy();
    };
  }, []);

  return (
    <div
      ref={container}
      role="img"
      aria-label="Animasi ketel menuang kopi ke dripper dan cangkir"
      className={className}
      style={{ aspectRatio: "240 / 225" }}
    />
  );
}
