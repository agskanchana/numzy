"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StudentShell from "@/components/StudentShell";
import {
  LESSON_TOPICS,
  CONTINUE_LESSON,
  type Lesson,
  type LessonTopic,
} from "@/lib/data";
import { useLang } from "@/lib/i18n";

const STEP_ICON: Record<string, string> = {
  story: "🎭",
  watch: "▶️",
  do: "✏️",
  check: "✅",
};

function topicProgress(t: LessonTopic) {
  const all = t.lessons.flatMap((l) => l.steps);
  return { done: all.filter((s) => s.done).length, total: all.length };
}

/* ------------------------------------------------------------------ */
/* Lesson stage (theater view)                                         */
/* ------------------------------------------------------------------ */

function LessonStage({
  topic,
  lesson,
  onBack,
}: {
  topic: LessonTopic;
  lesson: Lesson;
  onBack: () => void;
}) {
  const firstOpen = lesson.steps.findIndex((s) => !s.done);
  const [stepIdx, setStepIdx] = useState(firstOpen === -1 ? 0 : firstOpen);
  const [playing, setPlaying] = useState(false);
  const step = lesson.steps[stepIdx];
  const doneCount = lesson.steps.filter((s) => s.done).length;

  return (
    <div className="px-4 sm:px-6 py-5 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* stage */}
        <div className="flex-1 min-w-0 w-full">
          <div className="card-pop relative overflow-hidden rounded-3xl">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src="/images/stage.jpg"
                alt=""
                fill
                priority
                sizes="(min-width:1024px) 66vw, 100vw"
                className="object-cover"
              />

              {/* step content on stage */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                {step.kind === "check" ? (
                  <div className="bg-white/95 text-ink rounded-3xl shadow-2xl p-5 sm:p-6 w-full max-w-md animate-pop">
                    <div className="title-bubble text-xl font-semibold text-lagoon-dark mb-1">
                      ✅ Self-check
                    </div>
                    <div className="text-xs font-bold opacity-60 mb-3">
                      {lesson.title} — can you tick every box?
                    </div>
                    <ul className="flex flex-col gap-2">
                      {lesson.checks.map((c) => (
                        <li
                          key={c}
                          className="flex items-center gap-2 text-sm font-semibold bg-emerald-50 rounded-xl px-3 py-2"
                        >
                          <span className="grid place-items-center size-5 rounded-full bg-emerald-500 text-white text-[10px] shrink-0">
                            ✓
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-3 mt-4">
                      <Link
                        href="/student/subjects"
                        className="btn-chunky bg-brand text-white px-5 py-2 text-sm"
                      >
                        More practice in Missions 🚀
                      </Link>
                      <button
                        onClick={onBack}
                        className="text-xs font-bold opacity-60 hover:opacity-100"
                      >
                        All lessons
                      </button>
                    </div>
                  </div>
                ) : step.kind === "do" ? (
                  <div className="bg-white/95 text-ink rounded-3xl shadow-2xl p-6 w-full max-w-md text-center animate-pop">
                    <div className="text-4xl mb-1">✏️</div>
                    <div className="title-bubble text-xl font-semibold text-lagoon-dark">
                      Try it yourself
                    </div>
                    <div className="flex justify-center gap-4 text-xs font-extrabold opacity-70 my-3">
                      <span className="bg-slate-100 rounded-full px-3 py-1">
                        {step.qns} questions
                      </span>
                      <span className="bg-slate-100 rounded-full px-3 py-1">
                        ⭐ XP for each correct answer
                      </span>
                    </div>
                    <Link
                      href={`/student/practice?topic=${lesson.topicId}&level=${lesson.level}`}
                      className="btn-chunky bg-brand text-white px-8 py-3 inline-block"
                    >
                      Start now ▶
                    </Link>
                  </div>
                ) : playing ? (
                  <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/40 animate-pop">
                    <Image
                      src="/images/class-hero.jpg"
                      alt="Lesson video"
                      width={1280}
                      height={720}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 grid place-items-center bg-black/25">
                      <span className="grid place-items-center size-16 rounded-full bg-white/90 text-3xl text-brand shadow-xl">
                        ▶
                      </span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[11px] font-bold px-3 py-1.5 flex justify-between">
                      <span>
                        {lesson.title} · {step.name}
                      </span>
                      <span>(video player in the full build)</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative bg-sky-50 text-ink rounded-3xl shadow-2xl px-6 py-5 max-w-md text-center animate-pop">
                      <div className="font-display text-lg font-semibold">
                        {step.kind === "story"
                          ? "Story time! 🎭"
                          : "Time to watch! 🎬"}
                      </div>
                      <p className="text-sm font-semibold opacity-75 mt-1">
                        {step.kind === "story"
                          ? `Welcome to Numzy Class! Let's see what Professor Numzy is up to in “${lesson.title}”…`
                          : `A short video that shows the trick behind ${lesson.title.toLowerCase()}.`}
                      </p>
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-4 bg-sky-50 rotate-45" />
                    </div>
                    <button
                      onClick={() => setPlaying(true)}
                      className="btn-chunky bg-brand text-white px-10 py-3 text-lg"
                    >
                      ▶ Watch
                    </button>
                  </>
                )}
              </div>

              {/* mascot in the corner */}
              <div className="absolute bottom-3 left-4 flex items-end gap-2 pointer-events-none">
                <span className="relative block size-14 sm:size-16 overflow-hidden rounded-full ring-4 ring-sunny/90 bg-cream animate-float">
                  <Image
                    src="/images/mascot.jpg"
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover scale-110"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* steps rail */}
        <aside className="w-full lg:w-72 shrink-0 rounded-3xl bg-white/10 ring-1 ring-white/10 p-3">
          <button
            onClick={onBack}
            className="btn-chunky bg-white/85 text-ink px-4 py-1.5 text-xs mb-3"
          >
            ‹ All lessons
          </button>
          <div className="px-1 mb-3">
            <div className="font-display font-semibold text-sunny leading-tight">
              {topic.name} · {lesson.title}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-2 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sunny"
                  style={{
                    width: `${(doneCount / lesson.steps.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-[11px] font-extrabold text-white/80">
                {doneCount}/{lesson.steps.length} steps
              </span>
            </div>
          </div>

          <ol className="relative flex flex-col gap-2">
            <span className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-white/20" />
            {lesson.steps.map((s, i) => {
              const locked = !s.done && i > stepIdx && i !== firstOpen;
              const current = i === stepIdx;
              return (
                <li key={i} className="relative flex items-center gap-2">
                  <span
                    className={`relative z-10 grid place-items-center size-7 rounded-full text-[11px] font-extrabold shrink-0 ${
                      s.done
                        ? "bg-lagoon text-white"
                        : current
                          ? "bg-sunny text-amber-900"
                          : "bg-white/25 text-white/70"
                    }`}
                  >
                    {s.done ? "✓" : i + 1}
                  </span>
                  <button
                    onClick={() => {
                      if (!locked) {
                        setStepIdx(i);
                        setPlaying(false);
                      }
                    }}
                    disabled={locked}
                    className={`flex-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-left transition-colors ${
                      current
                        ? "bg-sunny text-amber-900 shadow"
                        : locked
                          ? "bg-white/5 text-white/40"
                          : "bg-white text-ink hover:-translate-y-0.5 transition-transform"
                    }`}
                  >
                    <span>{STEP_ICON[s.kind]}</span>
                    {s.name}
                    {s.qns && (
                      <span className="ml-auto text-[10px] opacity-60">
                        {s.qns} qns
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function LessonsPage() {
  const { t } = useLang();
  const [topicId, setTopicId] = useState<string | null>(null);
  const [lessonId, setLessonId] = useState<string | null>(null);

  const topic = LESSON_TOPICS.find((tp) => tp.id === topicId) ?? null;
  const lesson = topic?.lessons.find((l) => l.id === lessonId) ?? null;

  const contTopic = LESSON_TOPICS.find(
    (tp) => tp.id === CONTINUE_LESSON.topicId,
  )!;
  const contLesson = contTopic.lessons.find(
    (l) => l.id === CONTINUE_LESSON.lessonId,
  )!;
  const contDone = contLesson.steps.filter((s) => s.done).length;

  return (
    <StudentShell>
      {/* header band */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 sm:px-6 py-4 flex items-center gap-4">
        {topic ? (
          <button
            onClick={() => (lesson ? setLessonId(null) : setTopicId(null))}
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
            🎬 {t("lessons")}
          </div>
          <div className="text-xs font-bold text-white/75">
            Watch, try, check — a teacher in your pocket.
          </div>
        </div>
      </div>

      {/* stage view */}
      {topic && lesson && (
        <LessonStage
          topic={topic}
          lesson={lesson}
          onBack={() => setLessonId(null)}
        />
      )}

      {/* lesson picker for a topic */}
      {topic && !lesson && (
        <div className="px-4 sm:px-6 py-5 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`grid place-items-center size-12 rounded-2xl bg-gradient-to-br ${topic.tint} text-2xl shadow`}
            >
              {topic.icon}
            </span>
            <div>
              <div className="title-bubble text-xl font-semibold">
                {topic.name}
              </div>
              <div className="text-xs font-bold text-white/60">
                Part {topic.part} · {topic.lessons.length} lessons
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topic.lessons.map((l, i) => {
              const done = l.steps.filter((s) => s.done).length;
              const pct = Math.round((done / l.steps.length) * 100);
              return (
                <button
                  key={l.id}
                  onClick={() => setLessonId(l.id)}
                  className="card-pop rounded-3xl bg-white text-ink overflow-hidden text-left"
                >
                  <div
                    className={`relative h-28 bg-gradient-to-br ${topic.tint} grid place-items-center`}
                  >
                    <span className="font-display text-5xl font-semibold text-white/90 drop-shadow">
                      {topic.icon}
                    </span>
                    <span className="absolute top-2 right-2 bg-sunny text-amber-900 text-[10px] font-extrabold rounded-full px-2 py-0.5">
                      {l.ageTag}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] font-extrabold text-sky-600">
                      Lesson {i + 1}
                    </div>
                    <div className="font-display font-semibold leading-tight">
                      {l.title}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-lagoon"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-extrabold opacity-60">
                        {done}/{l.steps.length} steps
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* landing */}
      {!topic && (
        <div className="px-4 sm:px-6 py-5 max-w-6xl mx-auto flex flex-col gap-6">
          {/* continue hero */}
          <button
            onClick={() => {
              setTopicId(CONTINUE_LESSON.topicId);
              setLessonId(CONTINUE_LESSON.lessonId);
            }}
            className="card-pop relative overflow-hidden rounded-3xl text-left group"
          >
            <div className="relative w-full aspect-[16/7] sm:aspect-[16/5]">
              <Image
                src="/images/class-hero.jpg"
                alt=""
                fill
                priority
                sizes="(min-width:1280px) 1100px, 100vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/80 via-indigo-900/30 to-transparent" />
              <div className="absolute inset-y-0 left-0 p-5 sm:p-7 flex flex-col justify-center max-w-md">
                <div className="text-[11px] font-extrabold text-sunny uppercase tracking-wide">
                  Continue learning
                </div>
                <div className="title-bubble text-2xl sm:text-3xl font-semibold">
                  {contLesson.title}
                </div>
                <div className="text-xs font-bold text-white/75 mt-1">
                  {contTopic.name} · step {contDone + 1} of{" "}
                  {contLesson.steps.length} ·{" "}
                  {contLesson.steps[contDone]?.name ?? "Self-check"} next
                </div>
                <span className="btn-chunky bg-brand text-white px-6 py-2.5 text-sm mt-4 self-start">
                  {t("continueLbl")} ▶
                </span>
              </div>
            </div>
          </button>

          {/* browse by topic */}
          <div>
            <h2 className="title-bubble text-xl font-semibold mb-3">
              Browse by topic
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {LESSON_TOPICS.map((tp) => {
                const p = topicProgress(tp);
                return (
                  <button
                    key={tp.id}
                    onClick={() => setTopicId(tp.id)}
                    className="card-pop rounded-3xl bg-white text-ink overflow-hidden text-left"
                  >
                    <div
                      className={`relative h-24 bg-gradient-to-br ${tp.tint} grid place-items-center`}
                    >
                      <span className="text-4xl drop-shadow">{tp.icon}</span>
                      <span className="absolute top-2 right-2 bg-white/85 text-[10px] font-extrabold rounded-full px-2 py-0.5">
                        Part {tp.part}
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="font-display font-semibold leading-tight">
                        {tp.name}
                      </div>
                      <div className="text-[11px] font-bold opacity-60">
                        {tp.lessons.length}{" "}
                        {tp.lessons.length === 1 ? "lesson" : "lessons"}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-lagoon"
                            style={{ width: `${(p.done / p.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-extrabold opacity-50">
                          {p.done}/{p.total}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </StudentShell>
  );
}
