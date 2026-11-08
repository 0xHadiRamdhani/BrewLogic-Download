"use client";

import { useState } from "react";

type CopyState = "idle" | "copied" | "failed";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<CopyState>("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2200);
  }

  const text =
    state === "copied" ? "Tersalin" : state === "failed" ? "Gagal menyalin" : "Salin";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Salin SHA-256 ${label}`}
        className="h-11 shrink-0 rounded-md border border-cream/40 px-4 text-sm font-medium text-cream transition-colors hover:border-caramel hover:text-caramel active:translate-y-px"
      >
        {text}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" && `SHA-256 ${label} tersalin`}
        {state === "failed" && "Gagal menyalin, pilih teks secara manual"}
      </span>
    </>
  );
}
