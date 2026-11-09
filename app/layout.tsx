import type { Metadata } from "next";
import { DM_Sans, Pixelify_Sans } from "next/font/google";
import { MotionToggle } from "@/components/MotionToggle";
import { PlatformHint } from "@/components/PlatformHint";
import "./globals.css";

// Pixelify Sans: font display yang sama dengan aplikasinya, untuk judul dan angka besar.
const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
});

// DM Sans: font teks isi aplikasinya, jernih untuk angka takaran.
const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unduh BrewLogic",
  description:
    "BrewLogic: kalkulator seduh, timer step-by-step, dan jurnal untuk homebrewer kopi. Unduh APK untuk Android atau IPA untuk iPhone.",
};

function AmbientBackground() {
  return (
    <div aria-hidden="true" className="ambient">
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="glow glow-c" />
      <svg
        className="ambient-rings"
        preserveAspectRatio="xMaxYMin slice"
        viewBox="0 0 1000 1000"
        fill="none"
        stroke="#d9a566"
      >
        {[70, 108, 150].map((r, i) => (
          <circle key={r} cx="900" cy="140" r={r} strokeOpacity={0.12 - i * 0.02} />
        ))}
        {[90, 132, 178].map((r, i) => (
          <circle key={r} cx="40" cy="880" r={r} strokeOpacity={0.1 - i * 0.015} />
        ))}
      </svg>
    </div>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-motion="play"
      className={`${pixelify.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AmbientBackground />
        {children}
        <PlatformHint />
        <MotionToggle className="fixed bottom-4 right-4 z-50 hidden md:inline-flex" />
      </body>
    </html>
  );
}
