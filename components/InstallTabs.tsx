"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { usePlatform } from "@/lib/use-platform";

type Tab = "android" | "ios";
const TABS: { id: Tab; label: string }[] = [
  { id: "android", label: "Android" },
  { id: "ios", label: "iPhone" },
];

/**
 * Di layar kecil: satu panel dengan pilihan Android/iPhone (mengikuti perangkat pengunjung).
 * Di layar lebar (lg): kedua panel tampil berdampingan dan pilihan disembunyikan.
 */
export function InstallTabs({ android, ios }: { android: ReactNode; ios: ReactNode }) {
  const platform = usePlatform();
  const [chosen, setChosen] = useState<Tab | null>(null);
  const active: Tab = chosen ?? (platform === "ios" ? "ios" : "android");

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next: Tab = active === "android" ? "ios" : "android";
    setChosen(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  const panelClass = (tab: Tab, span: string) =>
    `${span} ${active === tab ? "" : "hidden lg:block"}`;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Pilih perangkat"
        className="grid grid-cols-2 gap-1 rounded-2xl border border-cream/15 bg-roast p-1 lg:hidden"
      >
        {TABS.map((tab) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setChosen(tab.id)}
              onKeyDown={onKeyDown}
              className={`h-12 rounded-xl font-medium transition-colors ${
                selected
                  ? "bg-caramel text-on-accent"
                  : "text-cream-soft hover:text-cream"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid items-start gap-6 lg:mt-0 lg:grid-cols-12">
        <div
          id="panel-android"
          role="tabpanel"
          aria-labelledby="tab-android"
          className={panelClass("android", "lg:col-span-5")}
        >
          {android}
        </div>
        <div
          id="panel-ios"
          role="tabpanel"
          aria-labelledby="tab-ios"
          className={panelClass("ios", "lg:col-span-7")}
        >
          {ios}
        </div>
      </div>
    </div>
  );
}
