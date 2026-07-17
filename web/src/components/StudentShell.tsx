"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { STUDENT, WALLET, RANK_TIERS, RANK_THRESHOLDS } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import LangToggle from "@/components/LangToggle";

/**
 * KooBits-inspired student chrome: deep "lagoon night" backdrop,
 * left sidebar (profile + sections), top bar (progress nav + currencies),
 * bottom tab bar on mobile.
 */

const SIDE_NAV = [
  { href: "/student", icon: "🏠", key: "home", exact: true, mobile: true },
  { href: "/student/daily", icon: "⚡", key: "dailyQuest", mobile: true },
  { href: "/student/lessons", icon: "🎬", key: "lessons", mobile: true },
  { href: "/student/subjects", icon: "🚀", key: "missions", mobile: true },
  { href: "/student/papers", icon: "📜", key: "papers" },
  { href: "/student/story", icon: "📖", key: "storyTrail" },
  { href: "/student/arena", icon: "🏁", key: "arena" },
  { href: "/student/fun", icon: "🎪", key: "funZone", mobile: true },
];

const QUICK_LAUNCH = [
  { href: "/student/daily", icon: "⚡", label: "Daily Quest" },
  { href: "/student/arena", icon: "⚔️", label: "Class Duel" },
  { href: "/student/lessons", icon: "🎬", label: "Lessons" },
  { href: "/student/subjects", icon: "🚀", label: "Missions" },
  { href: "/student/papers", icon: "📜", label: "Papers" },
  { href: "/student/scholarship", icon: "🏔️", label: "Scholarship" },
  { href: "/student/fun", icon: "🕹️", label: "Brain Games" },
  { href: "/student/story", icon: "📖", label: "Story Trail" },
  { href: "/student/badges", icon: "🏅", label: "Awards" },
];

function levelFromXp(xp: number) {
  return Math.max(1, Math.floor(xp / 1000));
}

export default function StudentShell({
  children,
}: {
  children: React.ReactNode;
  /** kept for compatibility; the v2 shell always paints its own backdrop */
  transparent?: boolean;
}) {
  const { t } = useLang();
  const pathname = usePathname();
  const [launcherOpen, setLauncherOpen] = useState(false);

  const tierIdx = RANK_TIERS.indexOf(STUDENT.rank);
  const nextAt = RANK_THRESHOLDS[tierIdx + 1] ?? STUDENT.xp;
  const prevAt = RANK_THRESHOLDS[tierIdx] ?? 0;
  const rankPct = Math.min(
    100,
    Math.round(((STUDENT.xp - prevAt) / Math.max(1, nextAt - prevAt)) * 100),
  );

  const isActive = (item: (typeof SIDE_NAV)[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const topNav = [
    { href: "/student", icon: "🏠", label: t("home") },
    { href: "/student/leaderboard", icon: "🏆", label: t("leaderboard") },
    { href: "/student/badges", icon: "🏅", label: t("awards") },
  ];

  return (
    <div className="min-h-screen bg-night text-white flex flex-col">
      {/* ---------------- top bar ---------------- */}
      <header className="sticky top-0 z-40 bg-[#082733]/90 backdrop-blur border-b border-white/10">
        <div className="px-3 sm:px-5 h-14 flex items-center gap-2">
          <Link href="/student" className="flex items-center gap-2 shrink-0 mr-1">
            <span className="relative block size-9 overflow-hidden rounded-full ring-2 ring-sunny/80 bg-cream">
              <Image
                src="/images/mascot.jpg"
                alt="Numzy"
                fill
                sizes="36px"
                className="object-cover scale-110"
              />
            </span>
            <span className="font-display text-xl tracking-wide hidden md:block">
              Numzy
            </span>
          </Link>

          {/* centre nav */}
          <nav className="hidden sm:flex items-center gap-1 mx-auto">
            {topNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-bold flex items-center gap-1.5 transition-colors ${
                  pathname === item.href
                    ? "bg-white/15 text-sunny"
                    : "hover:bg-white/10 text-white/85"
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* currencies + tools */}
          <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
            <span
              title="XP earned today"
              className="flex items-center gap-1 bg-white/10 rounded-full pl-2 pr-3 py-1 text-sm font-extrabold"
            >
              ⭐ {WALLET.todayXp}
            </span>
            <span
              title={t("gems")}
              className="flex items-center gap-1 bg-white/10 rounded-full pl-2 pr-3 py-1 text-sm font-extrabold"
            >
              💎 {WALLET.gems}
            </span>
            <button
              title="Daily gift"
              className={`text-xl px-1.5 py-1 rounded-full hover:bg-white/10 ${
                WALLET.dailyGiftReady ? "animate-pulse-soft" : "opacity-60"
              }`}
            >
              🎁
            </button>
            <span className="hidden sm:block">
              <LangToggle light />
            </span>

            {/* quick launcher */}
            <div className="relative">
              <button
                onClick={() => setLauncherOpen((o) => !o)}
                title="All activities"
                className={`grid place-items-center size-9 rounded-full text-lg transition-colors ${
                  launcherOpen ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <span className="grid grid-cols-3 gap-[3px]">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} className="size-1 rounded-full bg-white/90" />
                  ))}
                </span>
              </button>
              {launcherOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white text-ink shadow-2xl p-3 grid grid-cols-3 gap-1 animate-pop z-50">
                  {QUICK_LAUNCH.map((q) => (
                    <Link
                      key={q.label}
                      href={q.href}
                      onClick={() => setLauncherOpen(false)}
                      className="flex flex-col items-center gap-1 rounded-xl p-2 hover:bg-orange-50"
                    >
                      <span className="text-2xl">{q.icon}</span>
                      <span className="text-[10px] font-bold text-center leading-tight">
                        {q.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/login"
              title="Switch role"
              className="rounded-full px-2 py-1 text-lg hover:bg-white/10"
            >
              👤
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* ---------------- sidebar ---------------- */}
        <aside className="hidden lg:flex w-60 shrink-0 flex-col gap-3 p-3 bg-white/5 border-r border-white/10">
          {/* profile card */}
          <div className="rounded-2xl bg-gradient-to-b from-lagoon/70 to-lagoon-dark/60 p-4 text-center ring-1 ring-white/15">
            <span className="relative block size-16 mx-auto overflow-hidden rounded-full ring-4 ring-sunny/80 bg-cream">
              <Image
                src="/images/mascot.jpg"
                alt=""
                fill
                sizes="64px"
                className="object-cover scale-110"
              />
            </span>
            <div className="font-display font-semibold text-lg mt-2 leading-tight">
              {STUDENT.displayName}
            </div>
            <div className="text-[11px] font-bold text-white/70">
              {STUDENT.className}
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 bg-sunny text-amber-900 rounded-full px-3 py-0.5 text-xs font-extrabold shadow">
              🎖️ {t("level")} {levelFromXp(STUDENT.xp)} · {STUDENT.rank}
            </div>
            <div
              className="mt-2 h-1.5 rounded-full bg-white/20 overflow-hidden"
              title={`${rankPct}% to ${STUDENT.nextRank}`}
            >
              <div
                className="h-full rounded-full bg-sunny"
                style={{ width: `${rankPct}%` }}
              />
            </div>
          </div>

          {/* nav */}
          <nav className="flex flex-col gap-1">
            {SIDE_NAV.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 font-bold text-sm transition-colors ${
                    active
                      ? "bg-white text-lagoon-dark shadow-lg"
                      : "text-white/85 hover:bg-white/10"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {t(item.key)}
                  {active && <span className="ml-auto text-brand">▶</span>}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 pt-2 flex flex-col gap-1">
            <button className="flex items-center gap-3 rounded-xl px-3 py-2 font-bold text-sm text-white/70 hover:bg-white/10 text-left">
              <span className="text-lg">🤝</span> Friends
              <span className="ml-auto text-[10px] bg-white/15 rounded-full px-2 py-0.5">
                12
              </span>
            </button>
            <button className="flex items-center gap-3 rounded-xl px-3 py-2 font-bold text-sm text-white/70 hover:bg-white/10 text-left">
              <span className="text-lg">📅</span> Events
              <span className="ml-auto text-[10px] bg-brand rounded-full px-2 py-0.5">
                new
              </span>
            </button>
          </div>

          <Link
            href="/parent"
            className="mt-auto rounded-xl bg-white/10 hover:bg-white/15 px-3 py-2.5 text-xs font-bold text-white/75 flex items-center gap-2"
          >
            👨‍👩‍👧 Grown-ups’ corner →
          </Link>
        </aside>

        {/* ---------------- content ---------------- */}
        <main className="flex-1 min-w-0 pb-20 lg:pb-0">{children}</main>
      </div>

      {/* ---------------- mobile bottom nav ---------------- */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#082733]/95 backdrop-blur border-t border-white/10 flex justify-around px-2 py-1.5">
        {SIDE_NAV.filter((item) => item.mobile).map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-2.5 py-1 text-[10px] font-bold ${
                active ? "text-sunny" : "text-white/70"
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
