"use client";

import Image from "next/image";
import Link from "next/link";
import StudentShell from "@/components/StudentShell";
import MascotBar from "@/components/MascotBar";
import { STUDENT, ASSIGNMENTS } from "@/lib/data";
import { useLang } from "@/lib/i18n";

function Hotspot({
  href,
  x,
  y,
  icon,
  label,
  badge,
}: {
  href: string;
  x: string;
  y: string;
  icon: string;
  label: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: x, top: y }}
    >
      <div className="flex flex-col items-center gap-1">
        <span className="relative grid place-items-center size-12 sm:size-14 rounded-full bg-white/90 text-2xl sm:text-3xl shadow-lg ring-4 ring-white/50 group-hover:scale-110 group-hover:ring-sunny transition-transform animate-pulse-soft">
          {icon}
          {badge && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full size-5 grid place-items-center ring-2 ring-white">
              {badge}
            </span>
          )}
        </span>
        <span className="font-display text-xs sm:text-sm font-semibold bg-ink/80 text-white px-3 py-1 rounded-full whitespace-nowrap shadow">
          {label}
        </span>
      </div>
    </Link>
  );
}

export default function StudentHome() {
  const { t } = useLang();
  const pendingHomework = ASSIGNMENTS.filter((a) => !a.done).length;
  const questPct = Math.min(
    100,
    Math.round((STUDENT.weeklyQuestMinutes / STUDENT.weeklyQuestTarget) * 100),
  );

  return (
    <StudentShell>
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-4">
        <MascotBar
          action={
            <Link
              href="/student/practice?topic=times-tables&level=7"
              className="btn-chunky bg-brand text-white px-5 py-2.5 text-sm sm:text-base shrink-0"
            >
              {t("continueLbl")} ▶
            </Link>
          }
        >
          {t("hello")}, {STUDENT.name}! 🐘 You&apos;re on a {STUDENT.streak}-day
          streak. Times Tables <b>Level 7</b> is waiting — 3 more perfect
          answers to beat your best speed!
        </MascotBar>

        {/* Island map */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl ring-4 ring-white/60">
          <Image
            src="/images/island-map.jpg"
            alt="Numzy island map"
            width={2000}
            height={1116}
            priority
            className="w-full h-auto select-none"
          />

          <Hotspot
            href="/student/practice?topic=times-tables&level=7"
            x="24%"
            y="34%"
            icon="✏️"
            label={t("practice")}
          />
          <Hotspot
            href="/student/arena"
            x="63%"
            y="22%"
            icon="🏁"
            label={t("arena")}
          />
          <Hotspot
            href="/student/scholarship"
            x="74%"
            y="58%"
            icon="🏔️"
            label={t("scholarship")}
          />
          <Hotspot
            href="/student/assignments"
            x="23%"
            y="74%"
            icon="🎒"
            label={t("assignedWork")}
            badge={pendingHomework ? String(pendingHomework) : undefined}
          />

          {/* Weekly quest ring, Matific-style bottom-left */}
          <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 bg-white/90 rounded-2xl shadow-lg px-3 py-2 flex items-center gap-3">
            <div
              className="relative size-12 rounded-full grid place-items-center"
              style={{
                background: `conic-gradient(var(--color-brand) ${questPct * 3.6}deg, #e5e7eb 0deg)`,
              }}
            >
              <div className="absolute inset-1 bg-white rounded-full grid place-items-center text-[11px] font-extrabold leading-tight text-center">
                {STUDENT.weeklyQuestMinutes}/{STUDENT.weeklyQuestTarget}
              </div>
            </div>
            <div className="text-xs font-bold leading-tight">
              <div className="font-display text-sm">{t("weeklyQuest")}</div>
              <div className="opacity-70">{t("minutes")}</div>
            </div>
          </div>
        </div>

        {/* Quick cards under the map */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/student/subjects"
            className="rounded-2xl bg-white shadow p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="text-2xl">🗺️</div>
            <div className="font-display font-semibold">{t("subjects")}</div>
            <div className="text-xs opacity-70 mt-1">
              15 topics · Grade 1–5 syllabus
            </div>
          </Link>
          <Link
            href="/student/leaderboard"
            className="rounded-2xl bg-white shadow p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="text-2xl">🏆</div>
            <div className="font-display font-semibold">{t("leaderboard")}</div>
            <div className="text-xs opacity-70 mt-1">
              You&apos;re #2 in class this week!
            </div>
          </Link>
          <Link
            href="/student/badges"
            className="rounded-2xl bg-white shadow p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="text-2xl">🎖️</div>
            <div className="font-display font-semibold">{t("badges")}</div>
            <div className="text-xs opacity-70 mt-1">
              6 earned · 7-day streak is close!
            </div>
          </Link>
          <Link
            href="/student/practice?topic=subtraction&level=7&review=1"
            className="rounded-2xl bg-teal-50 border-2 border-dashed border-lagoon/40 shadow p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="text-2xl">🔁</div>
            <div className="font-display font-semibold">Review time!</div>
            <div className="text-xs opacity-70 mt-1">
              Subtraction check-up keeps it fresh (spaced repetition)
            </div>
          </Link>
        </div>
      </div>
    </StudentShell>
  );
}
