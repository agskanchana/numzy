"use client";

import Image from "next/image";
import Link from "next/link";
import StudentShell from "@/components/StudentShell";
import MascotBar from "@/components/MascotBar";
import { STUDENT, ASSIGNMENTS, DAILY_QUEST } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function StudentHome() {
  const { t } = useLang();
  const pendingHomework = ASSIGNMENTS.filter((a) => !a.done).length;
  const questPct = Math.min(
    100,
    Math.round((STUDENT.weeklyQuestMinutes / STUDENT.weeklyQuestTarget) * 100),
  );

  return (
    <StudentShell>
      <div className="px-4 sm:px-6 py-5 max-w-5xl mx-auto flex flex-col gap-5">
        <MascotBar
          action={
            <Link
              href="/student/daily"
              className="btn-chunky bg-brand text-white px-5 py-2.5 text-sm sm:text-base shrink-0"
            >
              {t("continueLbl")} ▶
            </Link>
          }
        >
          {t("hello")}, {STUDENT.name}! You&apos;ve cleared{" "}
          <b>
            {DAILY_QUEST.completed} of {DAILY_QUEST.total}
          </b>{" "}
          stops today — finish for <b>💎 {DAILY_QUEST.gemReward} gems</b>!
        </MascotBar>

        {/* ------------- Daily Quest hero ------------- */}
        <Link
          href="/student/daily"
          className="card-pop relative overflow-hidden rounded-3xl group min-h-56 sm:min-h-64"
        >
          <Image
            src="/images/daily-hero.jpg"
            alt=""
            fill
            priority
            sizes="(min-width:1024px) 900px, 100vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

          {/* progress ring */}
          <div
            className="absolute top-4 right-4 size-16 rounded-full grid place-items-center shadow-lg"
            style={{
              background: `conic-gradient(#facc15 ${(DAILY_QUEST.completed / DAILY_QUEST.total) * 360}deg, rgba(255,255,255,0.35) 0deg)`,
            }}
            title={`${DAILY_QUEST.completed} of ${DAILY_QUEST.total} stops done`}
          >
            <div className="absolute inset-1.5 bg-white rounded-full grid place-items-center text-ink">
              <span className="text-sm font-extrabold leading-none">
                {DAILY_QUEST.completed}/{DAILY_QUEST.total}
              </span>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="flex-1">
              <div className="title-bubble text-3xl sm:text-4xl text-white font-semibold">
                {t("dailyQuest")}
              </div>
              <div className="mt-1.5 inline-flex items-center gap-1 bg-white/90 text-ink text-xs font-extrabold rounded-full px-3 py-1 shadow">
                💎 {DAILY_QUEST.gemReward} gems at the finish
              </div>
            </div>
            <span className="btn-chunky bg-brand text-white px-8 py-3 text-lg self-start sm:self-auto">
              {t("start")} ▶
            </span>
          </div>
        </Link>

        {/* ------------- 4 play tiles ------------- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/student/arena"
            className="card-pop rounded-3xl bg-gradient-to-br from-orange-400 to-red-500 p-4 min-h-40 flex flex-col"
          >
            <span className="text-4xl drop-shadow">⚔️</span>
            <span className="font-display font-semibold text-lg mt-auto leading-tight">
              {t("duel")}
            </span>
            <span className="text-[11px] font-bold text-white/85">
              Live race vs Grade 4-B
            </span>
          </Link>

          <Link
            href="/student/subjects"
            className="card-pop rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 p-4 min-h-40 flex flex-col"
          >
            <span className="text-4xl drop-shadow">🚀</span>
            <span className="font-display font-semibold text-lg mt-auto leading-tight">
              {t("missions")}
            </span>
            <span className="text-[11px] font-bold text-white/85">
              Practise by topic
            </span>
          </Link>

          {/* Fun Zone — teases the pet elephant */}
          <Link
            href="/student/fun"
            className="card-pop relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 p-4 min-h-40 flex flex-col"
          >
            <span className="text-4xl drop-shadow">🎪</span>
            <span className="font-display font-semibold text-lg mt-auto leading-tight">
              {t("funZone")}
            </span>
            <span className="text-[11px] font-bold text-white/90 max-w-[62%]">
              Dress up your elephant!
            </span>
            <Image
              src="/images/buddy/party.png"
              alt=""
              width={156}
              height={180}
              className="absolute -bottom-1 -right-1 w-24 h-auto drop-shadow-lg pointer-events-none select-none"
            />
          </Link>

          <Link
            href="/student/assignments"
            className="card-pop relative rounded-3xl bg-gradient-to-br from-fuchsia-500 to-purple-600 p-4 min-h-40 flex flex-col"
          >
            {pendingHomework > 0 && (
              <span className="absolute top-3 right-3 bg-white text-purple-600 text-xs font-extrabold rounded-full size-6 grid place-items-center shadow">
                {pendingHomework}
              </span>
            )}
            <span className="text-4xl drop-shadow">🎒</span>
            <span className="font-display font-semibold text-lg mt-auto leading-tight">
              {t("assignedWork")}
            </span>
            <span className="text-[11px] font-bold text-white/85">
              {pendingHomework
                ? `${pendingHomework} to do — Ms. Fernando’s watching!`
                : "All done, superstar ✓"}
            </span>
          </Link>
        </div>

        {/* ------------- slim streak strip ------------- */}
        <div className="card-pop rounded-3xl bg-white/10 ring-1 ring-white/10 p-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          {/* streak */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <div className="font-display font-semibold leading-none">
                {STUDENT.streak}-day streak
              </div>
              <div className="flex gap-1 mt-1.5">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span
                    key={i}
                    className={`grid place-items-center size-5 rounded-full text-[9px] font-extrabold ${
                      i < STUDENT.streak
                        ? "bg-sunny text-amber-900"
                        : "bg-white/15 text-white/50"
                    }`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* weekly quest ring */}
          <div className="flex items-center gap-2.5">
            <div
              className="relative size-11 rounded-full grid place-items-center shrink-0"
              style={{
                background: `conic-gradient(var(--color-brand) ${questPct * 3.6}deg, rgba(255,255,255,0.15) 0deg)`,
              }}
            >
              <div className="absolute inset-1.5 bg-[#0d3d4b] rounded-full grid place-items-center">
                <span className="text-[10px] font-extrabold leading-none">
                  {questPct}%
                </span>
              </div>
            </div>
            <div className="text-xs font-bold text-white/80 leading-tight">
              ⏱️ {t("weeklyQuest")}
              <br />
              <span className="text-white/55">
                {STUDENT.weeklyQuestMinutes}/{STUDENT.weeklyQuestTarget} min this
                week
              </span>
            </div>
          </div>

          <Link
            href="/student/badges"
            className="ml-auto btn-chunky bg-white/15 hover:bg-white/25 text-white px-4 py-2 text-sm"
          >
            🏅 {t("awards")}
          </Link>
        </div>
      </div>
    </StudentShell>
  );
}
