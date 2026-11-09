"use client";

import { useEffect, useState } from "react";

// Ikon piksel 16x16 agar selaras dengan font Pixelify Sans dan gaya aplikasinya.
const items = [
  { id: "fitur", label: "Fitur", glyph: "M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" },
  { id: "unduh", label: "Unduh", glyph: "M7 2h2v6h3l-4 4-4-4h3zM2 13h12v2H2z" },
  {
    id: "pasang",
    label: "Pasang",
    glyph: "M2 3h2v2H2zM6 3h8v2H6zM2 7h2v2H2zM6 7h8v2H6zM2 11h2v2H2zM6 11h8v2H6z",
  },
  {
    id: "verifikasi",
    label: "Cek",
    glyph: "M3 8h2v2H3zM5 10h2v2H5zM7 8h2v2H7zM9 6h2v2H9zM11 4h2v2h-2z",
  },
];

/** Navigasi bawah ala aplikasi untuk layar kecil. Menandai bagian yang sedang dibaca. */
export function BottomNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = ["atas", ...items.map((item) => item.id)];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id === "atas" ? null : entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/15 bg-roast pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {items.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={`relative flex min-h-16 flex-col items-center justify-center gap-1.5 text-xs font-medium transition-colors ${
                  current ? "text-caramel" : "text-cream-soft active:text-cream"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-0 h-0.5 w-8 rounded-full transition-opacity ${
                    current ? "bg-caramel opacity-100" : "opacity-0"
                  }`}
                />
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  width="22"
                  height="22"
                  fill="currentColor"
                  shapeRendering="crispEdges"
                >
                  <path d={item.glyph} />
                </svg>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
