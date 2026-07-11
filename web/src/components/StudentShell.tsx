"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { STUDENT } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import LangToggle from "@/components/LangToggle";

/**
 * Chrome around every student screen: XP / streak / rank top bar,
 * quick nav, language toggle. Matific-style bright and chunky.
 */
export default function StudentShell({
  children,
  transparent,
}: {
  children: React.ReactNode;
  transparent?: boolean;
}) {
  const { t } = useLang();
  const pathname = usePathname();

  const navItems = [
    { href: "/student", icon: "🏝️", label: "Home" },
    { href: "/student/subjects", icon: "🗺️", label: t("subjects") },
    { href: "/student/leaderboard", icon: "🏆", label: t("leaderboard") },
    { href: "/student/badges", icon: "🎖️", label: t("badges") },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${transparent ? "" : "bg-gradient-to-b from-sky-100 to-cream"}`}
    >
      <header className="sticky top-0 z-40 bg-lagoon text-white shadow-md">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-3">
          <Link href="/student" className="flex items-center gap-2 shrink-0">
            <span className="relative block size-9 overflow-hidden rounded-full ring-2 ring-white/70 bg-cream">
              <Image
                src="/images/mascot.jpg"
                alt="Numzy"
                fill
                sizes="36px"
                className="object-cover scale-110"
              />
            </span>
            <span className="font-display text-xl tracking-wide hidden sm:block">
              Numzy
            </span>
          </Link>

          {/* stats */}
          <div className="flex items-center gap-2 text-sm font-bold ml-1">
            <span className="bg-white/20 rounded-full px-3 py-1 flex items-center gap-1">
              ⭐ {STUDENT.xp.toLocaleString()} XP
            </span>
            <span className="bg-white/20 rounded-full px-3 py-1 flex items-center gap-1">
              🔥 {STUDENT.streak}{" "}
              <span className="hidden md:inline font-semibold opacity-90">
                {t("streak")}
              </span>
            </span>
            <span className="bg-white/20 rounded-full px-3 py-1 hidden sm:flex items-center gap-1">
              🥈 {STUDENT.rank}
            </span>
          </div>

          <nav className="ml-auto flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`rounded-full px-2.5 py-1.5 text-lg leading-none transition-colors ${
                  pathname === item.href
                    ? "bg-white/30"
                    : "hover:bg-white/15"
                }`}
              >
                {item.icon}
              </Link>
            ))}
            <span className="mx-1 hidden sm:block">
              <LangToggle light />
            </span>
            <Link
              href="/login"
              title="Switch role"
              className="rounded-full px-2.5 py-1.5 text-lg leading-none hover:bg-white/15"
            >
              👤
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
