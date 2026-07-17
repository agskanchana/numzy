"use client";

import Link from "next/link";
import { useState } from "react";
import StudentShell from "@/components/StudentShell";
import {
  TOPICS,
  STRAND_ORDER,
  MISSION_COURSES,
  HEURISTICS,
  skillsFor,
  type Topic,
} from "@/lib/data";
import { useLang } from "@/lib/i18n";

function Stars({ n }: { n: number }) {
  return (
    <span className="text-sm tracking-tight" title={`${n} / 3 stars`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span key={i} className={i < n ? "" : "opacity-25 grayscale"}>
          ⭐
        </span>
      ))}
    </span>
  );
}

function Chilis({ n }: { n: number }) {
  return (
    <span className="text-xs tracking-tighter" title={`Difficulty ${n} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? "" : "opacity-25 grayscale"}>
          🌶️
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Curriculum drill-down                                               */
/* ------------------------------------------------------------------ */

function TopicRow({ topic }: { topic: Topic }) {
  const [open, setOpen] = useState(false);
  const mastered = topic.mastery >= 90;
  const skills = skillsFor(topic.id);

  return (
    <div
      className={`rounded-2xl bg-white text-ink shadow transition-all ${
        topic.locked ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={() => !topic.locked && setOpen((o) => !o)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <span className="text-3xl">{topic.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold flex items-center gap-2 flex-wrap">
            {topic.name}
            {mastered && <span title="Mastered">🌟</span>}
            {topic.locked && <span title="Locked">🔒</span>}
            {topic.reviewDue && (
              <span className="text-[10px] bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 font-body font-bold">
                🔁 review due
              </span>
            )}
          </div>
          <div className="text-[11px] font-bold opacity-60">
            Grade {topic.grade} ·{" "}
            {topic.locked
              ? topic.unlockHint
              : `Level ${topic.currentLevel} / ${topic.levels}`}
          </div>
        </div>
        <div className="w-28 hidden sm:block">
          <div className="flex justify-between text-[10px] font-extrabold opacity-50 mb-0.5">
            <span>Mastery</span>
            <span>{topic.mastery}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                mastered
                  ? "bg-green-500"
                  : topic.mastery >= 40
                    ? "bg-lagoon"
                    : "bg-brand"
              }`}
              style={{ width: `${topic.mastery}%` }}
            />
          </div>
        </div>
        {!topic.locked && (
          <span
            className={`text-lg transition-transform ${open ? "rotate-90" : ""}`}
          >
            ▶
          </span>
        )}
      </button>

      {open && (
        <div className="border-t border-slate-100 px-4 pb-3">
          {skills.map((s, i) => (
            <div
              key={s.id}
              className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0"
            >
              <span className="font-display text-lg font-semibold text-sky-500 w-6 text-center">
                {i + 1}
              </span>
              <Stars n={s.stars} />
              <span className="flex-1 min-w-0 text-sm font-semibold truncate">
                {s.name}
              </span>
              <span className="hidden md:block">
                <Chilis n={s.difficulty} />
              </span>
              <span
                title="Watch the mini-lesson"
                className="hidden sm:grid place-items-center size-8 rounded-xl bg-sunny text-sm shadow cursor-pointer hover:scale-110 transition-transform"
              >
                ▶
              </span>
              <Link
                href={`/student/practice?topic=${topic.id}&level=${s.level}`}
                className="btn-chunky bg-white border-2 border-brand text-brand-dark px-4 py-1 text-sm"
              >
                Practice
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function MissionsPage() {
  const { t } = useLang();
  const [course, setCourse] = useState<string | null>(null);
  const [strand, setStrand] = useState(STRAND_ORDER[0]);

  return (
    <StudentShell>
      {/* header band */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 px-4 sm:px-6 py-4 flex items-center gap-4 relative overflow-hidden">
        <span className="absolute right-10 top-1 text-4xl opacity-40 rotate-12">
          🚀
        </span>
        <span className="absolute right-28 bottom-0 text-2xl opacity-30">✦</span>
        {course ? (
          <button
            onClick={() => setCourse(null)}
            className="btn-chunky bg-white/85 text-ink px-4 py-1.5 text-sm shrink-0"
          >
            ‹ Back
          </button>
        ) : (
          <Link
            href="/student"
            className="btn-chunky bg-white/85 text-ink px-4 py-1.5 text-sm shrink-0"
          >
            ‹ Back
          </Link>
        )}
        <div>
          <div className="title-bubble text-2xl font-semibold">
            🚀 {t("missions")}
          </div>
          <div className="text-xs font-bold text-white/75">
            Practice by topics. Learn at your own pace.
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-5 max-w-5xl mx-auto flex flex-col gap-4">
        {/* ------------- course list ------------- */}
        {!course &&
          MISSION_COURSES.map((c) => {
            const inner = (
              <>
                <div
                  className={`w-28 sm:w-36 shrink-0 rounded-2xl bg-gradient-to-br ${c.tint} grid place-items-center text-5xl py-6 shadow-inner`}
                >
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-lg font-semibold flex items-center gap-2 flex-wrap">
                    {c.name}
                    {c.tag && (
                      <span className="text-[10px] font-body font-extrabold bg-sunny text-amber-900 rounded-full px-2 py-0.5">
                        {c.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm opacity-70 font-semibold mt-1">
                    {c.desc}
                  </p>
                </div>
                <span className="btn-chunky bg-brand text-white px-7 py-2 shrink-0">
                  Go
                </span>
              </>
            );
            const cls =
              "card-pop rounded-3xl bg-white text-ink p-3 sm:p-4 flex items-center gap-4 text-left w-full";
            return c.href ? (
              <Link key={c.id} href={c.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <button key={c.id} onClick={() => setCourse(c.id)} className={cls}>
                {inner}
              </button>
            );
          })}

        {/* ------------- school curriculum ------------- */}
        {course === "curriculum" && (
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <aside className="w-full md:w-48 shrink-0 rounded-2xl bg-white/10 p-2 flex md:flex-col gap-1 overflow-x-auto no-scrollbar">
              {STRAND_ORDER.map((s) => (
                <button
                  key={s}
                  onClick={() => setStrand(s)}
                  className={`rounded-xl px-3 py-2 text-sm font-bold whitespace-nowrap text-left transition-colors ${
                    strand === s
                      ? "bg-white text-lagoon-dark shadow"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </aside>
            <div className="flex-1 min-w-0 flex flex-col gap-3 w-full">
              <div className="text-xs font-bold text-white/60">
                NIE syllabus · tap a topic to see its skills
              </div>
              {TOPICS.filter((tp) => tp.strand === strand).map((topic) => (
                <TopicRow key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
        )}

        {/* ------------- HOTS ------------- */}
        {course === "hots" && (
          <>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm font-bold">
                🧠 9 heuristics · recommended age 6–9
              </span>
              <button className="text-xs font-extrabold text-sunny underline underline-offset-2">
                Change level
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {["Using a representation", "Walking through the process", "Making a guess", "Changing the problem"].map(
                (group, gi) => (
                  <div
                    key={group}
                    className={`rounded-3xl p-4 ${
                      [
                        "bg-amber-50 text-amber-900",
                        "bg-emerald-50 text-emerald-900",
                        "bg-sky-50 text-sky-900",
                        "bg-rose-50 text-rose-900",
                      ][gi]
                    }`}
                  >
                    <div className="font-display font-semibold mb-2">
                      {group}
                    </div>
                    <div className="flex flex-col gap-2">
                      {HEURISTICS.filter((h) => h.group === group).map((h) => (
                        <Link
                          key={h.id}
                          href="/student/practice?topic=times-tables&level=5"
                          className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                        >
                          <span className="grid place-items-center size-9 rounded-full bg-gradient-to-br from-sunny to-brand text-lg shadow">
                            {h.icon}
                          </span>
                          <span className="text-sm font-bold">{h.name}</span>
                          <span className="ml-auto text-xs opacity-40">▶</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </>
        )}

        {/* ------------- challenge maths ------------- */}
        {course === "challenge" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["🔥", "Number Ninjas", "Big numbers, bigger tricks", 4],
              ["🧊", "Ice-Cold Logic", "Puzzles with a twist", 4],
              ["🌋", "Volcano Fractions", "Fractions past the syllabus", 5],
              ["🌪️", "Speed Storm", "Beat the clock — no hints!", 3],
              ["🐉", "Dragon Patterns", "Sequences that bite back", 5],
              ["🛸", "Mystery Numbers", "Find the hidden value", 4],
            ].map(([icon, name, desc, diff]) => (
              <Link
                key={name as string}
                href="/student/practice?topic=times-tables&level=10"
                className="card-pop rounded-3xl bg-white text-ink p-4 flex flex-col gap-1"
              >
                <span className="text-3xl">{icon}</span>
                <span className="font-display font-semibold">{name}</span>
                <span className="text-xs opacity-60 font-semibold">{desc}</span>
                <span className="mt-2">
                  <Chilis n={diff as number} />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </StudentShell>
  );
}
