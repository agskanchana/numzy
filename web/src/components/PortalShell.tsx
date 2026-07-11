"use client";

import Link from "next/link";
import Image from "next/image";
import LangToggle from "@/components/LangToggle";

/**
 * Chrome for the parent / teacher / admin portals — calmer than the
 * student UI (white cards, single accent), Matific-parent-flow style.
 */
export default function PortalShell({
  title,
  subtitle,
  accent,
  children,
}: {
  title: string;
  subtitle?: string;
  accent: "parent" | "teacher" | "admin";
  children: React.ReactNode;
}) {
  const accentBg =
    accent === "parent"
      ? "bg-brand"
      : accent === "teacher"
        ? "bg-lagoon"
        : "bg-slate-800";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className={`${accentBg} text-white shadow-md sticky top-0 z-40`}>
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="relative block size-9 overflow-hidden rounded-full ring-2 ring-white/70 bg-cream">
              <Image
                src="/images/mascot.jpg"
                alt="Numzy"
                fill
                sizes="36px"
                className="object-cover scale-110"
              />
            </span>
            <span className="font-display text-xl tracking-wide">Numzy</span>
          </Link>
          <div className="ml-2 min-w-0">
            <div className="font-display font-semibold leading-tight truncate">
              {title}
            </div>
            {subtitle && (
              <div className="text-xs opacity-80 leading-tight truncate">
                {subtitle}
              </div>
            )}
          </div>
          <nav className="ml-auto flex items-center gap-2 text-sm font-semibold">
            <LangToggle light />
            <Link
              href="/login"
              className="rounded-full bg-white/20 hover:bg-white/30 px-4 py-1.5"
            >
              Switch role
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
