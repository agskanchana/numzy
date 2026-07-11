"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import StudentShell from "@/components/StudentShell";
import { generateQuestion, type Question } from "@/lib/quiz";

const RACE_LENGTH = 10;

interface Racer {
  name: string;
  emoji: string;
  bot: boolean;
  progress: number;
  finishedAt: number | null;
}

const START_RACERS: Racer[] = [
  { name: "You (Senuli)", emoji: "🐘", bot: false, progress: 0, finishedAt: null },
  { name: "Kavindu R.", emoji: "🦁", bot: true, progress: 0, finishedAt: null },
  { name: "Nethmi J.", emoji: "🦚", bot: true, progress: 0, finishedAt: null },
  { name: "Ravindu W.", emoji: "🐒", bot: true, progress: 0, finishedAt: null },
];

export default function ArenaRace() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [racers, setRacers] = useState<Racer[]>(START_RACERS);
  const [qIdx, setQIdx] = useState(0);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [finished, setFinished] = useState(false);
  const startTime = useRef(0);

  // fixed shared question set — identical for every racer (fairness §3.3)
  useEffect(() => {
    setQuestions(
      Array.from({ length: RACE_LENGTH }, () =>
        generateQuestion("times-tables", 6),
      ),
    );
  }, []);

  // 3-2-1 countdown
  useEffect(() => {
    if (!questions || countdown <= 0) return;
    const tm = setTimeout(() => {
      setCountdown((c) => c - 1);
      if (countdown === 1) startTime.current = Date.now();
    }, 900);
    return () => clearTimeout(tm);
  }, [countdown, questions]);

  // bots answer every 2.5–6.5s with ~85% accuracy
  useEffect(() => {
    if (countdown > 0 || finished) return;
    const timers = START_RACERS.filter((r) => r.bot).map((_, i) => {
      const botIdx = i + 1;
      const tick = () => {
        setRacers((prev) => {
          const next = [...prev];
          const bot = { ...next[botIdx] };
          if (bot.progress < RACE_LENGTH && Math.random() < 0.85) {
            bot.progress += 1;
            if (bot.progress === RACE_LENGTH && bot.finishedAt === null) {
              bot.finishedAt = Date.now();
            }
          }
          next[botIdx] = bot;
          return next;
        });
      };
      const iv = setInterval(tick, 2500 + Math.random() * 4000);
      return iv;
    });
    return () => timers.forEach(clearInterval);
  }, [countdown, finished]);

  const q = questions?.[qIdx];

  const answer = useCallback(
    (value: number) => {
      if (!q || finished || countdown > 0) return;
      if (value === q.answer) {
        setRacers((prev) => {
          const next = [...prev];
          const me = { ...next[0], progress: next[0].progress + 1 };
          if (me.progress === RACE_LENGTH) {
            me.finishedAt = Date.now();
            setFinished(true);
          }
          next[0] = me;
          return next;
        });
        setQIdx((i) => Math.min(i + 1, RACE_LENGTH - 1));
      } else {
        // wrong answer costs time, not progress — flash and stay
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), 450);
      }
    },
    [q, finished, countdown],
  );

  // standings once player finishes
  const standings = finished
    ? [...racers].sort((a, b) => {
        const av = a.finishedAt ?? Infinity;
        const bv = b.finishedAt ?? Infinity;
        return av - bv || b.progress - a.progress;
      })
    : [];
  const myPlace = standings.findIndex((r) => !r.bot) + 1;
  const bonus = [100, 60, 40, 20][myPlace - 1] ?? 20;

  return (
    <StudentShell transparent>
      <div className="relative min-h-[calc(100vh-56px)]">
        <Image
          src="/images/arena.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority
        />

        <div className="relative mx-auto max-w-3xl px-4 py-6 flex flex-col gap-4">
          {/* lanes */}
          <div className="rounded-3xl bg-white/95 shadow-xl p-5">
            <h1 className="font-display text-xl font-semibold mb-3">
              🏰 Class race · Times Tables · same 10 questions for everyone
            </h1>
            <div className="flex flex-col gap-3">
              {racers.map((r) => (
                <div key={r.name} className="flex items-center gap-3">
                  <span className="w-28 sm:w-36 text-xs font-bold truncate">
                    {r.emoji} {r.name}
                  </span>
                  <div className="flex-1 h-6 rounded-full bg-slate-100 relative overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        r.bot ? "bg-slate-300" : "bg-brand"
                      }`}
                      style={{ width: `${(r.progress / RACE_LENGTH) * 100}%` }}
                    />
                    <span
                      className="absolute top-1/2 -translate-y-1/2 text-lg transition-all duration-500"
                      style={{
                        left: `calc(${(r.progress / RACE_LENGTH) * 92}% )`,
                      }}
                    >
                      {r.emoji}
                    </span>
                  </div>
                  <span className="text-xs font-bold w-10 text-right">
                    {r.progress}/{RACE_LENGTH}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* question card / countdown / result */}
          {countdown > 0 && (
            <div className="rounded-3xl bg-white/95 shadow-xl p-10 text-center">
              <div className="font-display text-7xl font-bold text-brand animate-pop" key={countdown}>
                {countdown}
              </div>
              <p className="font-semibold opacity-60 mt-2">Get ready…</p>
            </div>
          )}

          {countdown <= 0 && !finished && q && (
            <div
              className={`rounded-3xl bg-white/95 shadow-xl p-6 sm:p-8 ${wrongFlash ? "animate-shake ring-4 ring-red-300" : ""}`}
            >
              <div className="font-display text-5xl font-semibold text-center mb-6">
                {q.prompt}
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {(q.choices ?? [q.answer]).map((c) => (
                  <button
                    key={c}
                    onClick={() => answer(c)}
                    className="btn-chunky bg-lagoon text-white text-2xl py-4"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {finished && (
            <div className="rounded-3xl bg-white/95 shadow-xl p-8 text-center animate-pop">
              <div className="text-5xl mb-2">
                {myPlace === 1 ? "🏆" : myPlace === 2 ? "🥈" : myPlace === 3 ? "🥉" : "🎽"}
              </div>
              <h2 className="font-display text-3xl font-semibold mb-1">
                You finished{" "}
                {myPlace === 1
                  ? "1st"
                  : myPlace === 2
                    ? "2nd"
                    : myPlace === 3
                      ? "3rd"
                      : `${myPlace}th`}
                !
              </h2>
              <p className="font-display text-2xl text-brand font-bold mb-4">
                +{bonus} XP arena bonus
              </p>
              <ol className="max-w-xs mx-auto text-left mb-6">
                {standings.map((r, i) => (
                  <li
                    key={r.name}
                    className={`flex items-center gap-2 py-1 font-semibold text-sm ${
                      !r.bot ? "text-brand-dark" : ""
                    }`}
                  >
                    <span className="w-6">{["🥇", "🥈", "🥉", "4."][i]}</span>
                    {r.emoji} {r.name}
                    <span className="ml-auto opacity-60">
                      {r.finishedAt ? "finished" : `${r.progress}/${RACE_LENGTH}`}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="flex gap-3 justify-center">
                <Link
                  href="/student/arena/race"
                  className="btn-chunky bg-lagoon text-white px-6 py-3"
                  onClick={() => window.location.reload()}
                >
                  Race again 🔁
                </Link>
                <Link
                  href="/student"
                  className="btn-chunky bg-brand text-white px-6 py-3"
                >
                  Island 🏝️
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentShell>
  );
}
