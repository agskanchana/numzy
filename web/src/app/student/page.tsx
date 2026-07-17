"use client";

import Image from "next/image";
import Link from "next/link";
import StudentShell from "@/components/StudentShell";
import MascotBar from "@/components/MascotBar";
import {
  STUDENT,
  ASSIGNMENTS,
  DAILY_QUEST,
  SCHOLARSHIP,
  RANK_TIERS,
  RANK_THRESHOLDS,
  STORY_BOOKS,
  LESSON_TOPICS,
} from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function StudentHome() {
  const { t } = useLang();
  const pendingHomework = ASSIGNMENTS.filter((a) => !a.done).length;

  const tierIdx = RANK_TIERS.indexOf(STUDENT.rank);
  const nextAt = RANK_THRESHOLDS[tierIdx + 1] ?? STUDENT.xp;
  const prevAt = RANK_THRESHOLDS[tierIdx] ?? 0;
  const rankPct = Math.min(
    100,
    Math.round(((STUDENT.xp - prevAt) / Math.max(1, nextAt - prevAt)) * 100),
  );
  const questPct = Math.min(
    100,
    Math.round((STUDENT.weeklyQuestMinutes / STUDENT.weeklyQuestTarget) * 100),
  );
  const lessonsCount = LESSON_TOPICS.reduce(
    (n, tp) => n + tp.lessons.length,
    0,
  );

  return (
    <StudentShell>
      <div className="px-4 sm:px-6 py-5 max-w-6xl xl:max-w-7xl mx-auto flex flex-col gap-5">
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
          stops on today&apos;s quest — finish all {DAILY_QUEST.total} to win{" "}
          <b>💎 {DAILY_QUEST.gemReward} gems</b>!
        </MascotBar>

        {/* ------------- hero row ------------- */}
        <div className="grid lg:grid-cols-5 gap-5">
          {/* Daily Quest hero */}
          <Link
            href="/student/daily"
            className="lg:col-span-3 card-pop relative overflow-hidden rounded-3xl group min-h-64 lg:min-h-72"
          >
            <Image
              src="/images/daily-hero.jpg"
              alt=""
              fill
              priority
              sizes="(min-width:1024px) 60vw, 100vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
            <div className="absolute top-4 left-5 right-5 flex items-start justify-between gap-3">
              <div>
                <div className="title-bubble text-3xl sm:text-4xl text-white font-semibold">
                  {t("dailyQuest")}
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 bg-white/90 text-ink text-xs font-extrabold rounded-full px-3 py-1 shadow">
                  💎 {DAILY_QUEST.gemReward} gems at the finish
                </div>
              </div>
              {/* progress ring */}
              <div
                className="relative size-16 rounded-full grid place-items-center shrink-0 shadow-lg"
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
            </div>
            <div className="absolute bottom-3 left-5 bg-black/40 backdrop-blur-sm text-white/90 text-[11px] font-bold rounded-full px-3 py-1">
              🕐 Open {DAILY_QUEST.openHours}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 sm:translate-y-6 size-36 sm:size-44 bg-white rounded-full grid place-items-start justify-center pt-3 sm:pt-4">
              <span className="btn-chunky bg-brand text-white px-9 py-3 text-xl">
                {t("start")} ▶
              </span>
            </div>
          </Link>

          {/* right stack */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link
              href="/student/arena"
              className="card-pop relative overflow-hidden rounded-3xl group flex-1 min-h-40"
            >
              <Image
                src="/images/duel.jpg"
                alt=""
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-orange-600/95 to-transparent pt-10 pb-3 text-center">
                <span className="title-bubble text-2xl text-white font-semibold">
                  {t("duel")}
                </span>
                <div className="text-[11px] font-bold text-orange-100">
                  Live races vs Grade 4-B · starts every hour
                </div>
              </div>
            </Link>

            <div className="grid grid-cols-2 gap-5">
              <Link
                href="/student/scholarship"
                className="card-pop rounded-3xl bg-gradient-to-br from-teal-400 to-lagoon-dark p-4 flex flex-col"
              >
                <span className="text-3xl">🏔️</span>
                <span className="font-display font-semibold leading-tight mt-1">
                  Scholarship Sprint
                </span>
                <span className="text-[11px] font-bold text-white/80 mt-auto pt-2">
                  {SCHOLARSHIP.examDateLabel} · {SCHOLARSHIP.readiness}% ready
                </span>
              </Link>
              <Link
                href="/student/assignments"
                className="card-pop rounded-3xl bg-gradient-to-br from-rose-400 to-red-500 p-4 flex flex-col relative"
              >
                {pendingHomework > 0 && (
                  <span className="absolute top-3 right-3 bg-white text-red-600 text-xs font-extrabold rounded-full size-6 grid place-items-center shadow">
                    {pendingHomework}
                  </span>
                )}
                <span className="text-3xl">🎒</span>
                <span className="font-display font-semibold leading-tight mt-1">
                  {t("assignedWork")}
                </span>
                <span className="text-[11px] font-bold text-white/80 mt-auto pt-2">
                  {pendingHomework
                    ? `${pendingHomework} due — Ms. Fernando is watching!`
                    : "All done, superstar ✓"}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ------------- keep exploring ------------- */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <Link
            href="/student/lessons"
            className="card-pop relative overflow-hidden rounded-3xl p-4 min-h-36 flex flex-col"
          >
            <Image
              src="/images/class-hero.jpg"
              alt=""
              fill
              sizes="(min-width:1280px) 17vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/85 via-indigo-900/20 to-transparent" />
            <span className="relative font-display font-semibold mt-auto">
              {t("lessons")}
            </span>
            <span className="relative text-[11px] font-bold text-white/85">
              {lessonsCount} guided lessons
            </span>
          </Link>
          <Link
            href="/student/subjects"
            className="card-pop rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 p-4 min-h-36 flex flex-col"
          >
            <span className="text-3xl">🚀</span>
            <span className="font-display font-semibold mt-auto">
              {t("missions")}
            </span>
            <span className="text-[11px] font-bold text-white/80">
              Practise by topic
            </span>
          </Link>
          <Link
            href="/student/papers"
            className="card-pop rounded-3xl bg-white text-ink p-4 min-h-36 flex flex-col"
          >
            <span className="text-3xl">📜</span>
            <span className="font-display font-semibold mt-auto">
              {t("papers")}
            </span>
            <span className="text-[11px] font-bold opacity-60">
              Revision & Scholarship mocks
            </span>
          </Link>
          <Link
            href="/student/story"
            className="card-pop relative overflow-hidden rounded-3xl p-4 min-h-36 flex flex-col"
          >
            <Image
              src="/images/story.jpg"
              alt=""
              fill
              sizes="(min-width:1280px) 17vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-900/20 to-transparent" />
            <span className="relative font-display font-semibold mt-auto">
              {t("storyTrail")}
            </span>
            <span className="relative text-[11px] font-bold text-white/85">
              {STORY_BOOKS.length} storybooks
            </span>
          </Link>
          <Link
            href="/student/fun"
            className="card-pop relative overflow-hidden rounded-3xl p-4 min-h-36 flex flex-col"
          >
            <Image
              src="/images/fun-zone.jpg"
              alt=""
              fill
              sizes="(min-width:1280px) 17vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/85 via-cyan-900/15 to-transparent" />
            <span className="relative font-display font-semibold mt-auto">
              {t("funZone")}
            </span>
            <span className="relative text-[11px] font-bold text-white/85">
              Games · {t("myBuddy")}
            </span>
          </Link>
          <Link
            href="/student/practice?topic=subtraction&level=7&review=1"
            className="card-pop rounded-3xl bg-teal-50 text-ink border-2 border-dashed border-lagoon/50 p-4 min-h-36 flex flex-col"
          >
            <span className="text-3xl">🔁</span>
            <span className="font-display font-semibold mt-auto">
              Review time!
            </span>
            <span className="text-[11px] font-bold opacity-60">
              Subtraction check-up
            </span>
          </Link>
        </div>

        {/* ------------- this week strip ------------- */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* rank progress */}
          <div className="card-pop rounded-3xl bg-white/10 ring-1 ring-white/10 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-semibold">
                🎖️ Rank journey
              </span>
              <Link
                href="/student/badges"
                className="text-[11px] font-extrabold text-sunny hover:underline"
              >
                {t("awards")} →
              </Link>
            </div>
            <div className="flex items-center gap-2 text-xs font-extrabold">
              <span className="bg-white/15 rounded-full px-2.5 py-1">
                🥈 {STUDENT.rank}
              </span>
              <div className="flex-1 h-2.5 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sunny to-brand"
                  style={{ width: `${rankPct}%` }}
                />
              </div>
              <span className="bg-white/15 rounded-full px-2.5 py-1 opacity-70">
                🥇 {STUDENT.nextRank}
              </span>
            </div>
            <div className="text-[11px] font-bold text-white/60 mt-2">
              {(nextAt - STUDENT.xp).toLocaleString()} XP to {STUDENT.nextRank}{" "}
              — about {Math.ceil((nextAt - STUDENT.xp) / 450)} good days of
              practice!
            </div>
          </div>

          {/* weekly quest + streak */}
          <div className="card-pop rounded-3xl bg-white/10 ring-1 ring-white/10 p-4 flex items-center gap-4">
            <div
              className="relative size-16 rounded-full grid place-items-center shrink-0"
              style={{
                background: `conic-gradient(var(--color-brand) ${questPct * 3.6}deg, rgba(255,255,255,0.15) 0deg)`,
              }}
            >
              <div className="absolute inset-1.5 bg-[#0d3d4b] rounded-full grid place-items-center">
                <span className="text-xs font-extrabold leading-none text-center">
                  {STUDENT.weeklyQuestMinutes}/{STUDENT.weeklyQuestTarget}
                  <br />
                  <span className="text-[9px] opacity-60">min</span>
                </span>
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-display font-semibold">
                ⏱️ {t("weeklyQuest")}
              </div>
              <div className="flex gap-1 mt-1.5">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span
                    key={i}
                    className={`grid place-items-center size-6 rounded-full text-[10px] font-extrabold ${
                      i < STUDENT.streak
                        ? "bg-sunny text-amber-900"
                        : "bg-white/15 text-white/50"
                    }`}
                    title={i < STUDENT.streak ? "Practised!" : "Not yet"}
                  >
                    {d}
                  </span>
                ))}
              </div>
              <div className="text-[11px] font-bold text-white/60 mt-1.5">
                🔥 {STUDENT.streak}-day streak — one more for the badge!
              </div>
            </div>
          </div>

          {/* coming up */}
          <div className="card-pop rounded-3xl bg-white/10 ring-1 ring-white/10 p-4">
            <div className="font-display font-semibold mb-2">📅 Coming up</div>
            <ul className="flex flex-col gap-1.5 text-xs font-bold text-white/85">
              <li className="flex items-center gap-2 bg-white/5 rounded-xl px-2.5 py-1.5">
                <span>🗓️</span> Sunday Mini Challenge
                <span className="ml-auto text-[10px] bg-sunny text-amber-900 rounded-full px-2 py-0.5">
                  Sun
                </span>
              </li>
              <li className="flex items-center gap-2 bg-white/5 rounded-xl px-2.5 py-1.5">
                <span>⚔️</span> Team battle vs Grade 4-A
                <span className="ml-auto text-[10px] bg-white/15 rounded-full px-2 py-0.5">
                  Mon
                </span>
              </li>
              <li className="flex items-center gap-2 bg-white/5 rounded-xl px-2.5 py-1.5">
                <span>🏆</span> School cup · heat 1
                <span className="ml-auto text-[10px] bg-white/15 rounded-full px-2 py-0.5">
                  Sat
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </StudentShell>
  );
}
