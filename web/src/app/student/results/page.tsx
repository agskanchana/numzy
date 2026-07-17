"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import StudentShell from "@/components/StudentShell";
import { useLang } from "@/lib/i18n";
import type { SessionResult } from "@/lib/quiz";

export default function ResultsPage() {
  const { t } = useLang();
  const [result, setResult] = useState<SessionResult | null>(null);
  const [shownXp, setShownXp] = useState(0);

  useEffect(() => {
    const raw = sessionStorage.getItem("numzy-session");
    if (raw) setResult(JSON.parse(raw));
  }, []);

  // XP count-up animation
  useEffect(() => {
    if (!result) return;
    let frame = 0;
    const steps = 40;
    const iv = setInterval(() => {
      frame++;
      setShownXp(Math.round((result.xp * frame) / steps));
      if (frame >= steps) clearInterval(iv);
    }, 30);
    return () => clearInterval(iv);
  }, [result]);

  if (!result) {
    return (
      <StudentShell>
        <div className="min-h-[60vh] grid place-items-center">
          <div className="text-center">
            <p className="font-display text-xl mb-4">
              No finished session yet — go practise first!
            </p>
            <Link
              href="/student/practice?topic=times-tables&level=7"
              className="btn-chunky bg-brand text-white px-6 py-3"
            >
              {t("practice")} ▶
            </Link>
          </div>
        </div>
      </StudentShell>
    );
  }

  const pct = Math.round((result.correct / result.total) * 100);
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;

  return (
    <StudentShell>
      <div className="mx-auto max-w-xl px-4 py-8 animate-rise">
        <div className="rounded-3xl bg-white text-ink shadow-xl p-8 text-center relative overflow-hidden">
          <div className="text-5xl mb-1 select-none" aria-hidden>
            {result.perfect ? "🎉🎊🎉" : "🎈"}
          </div>
          <h1 className="font-display text-3xl font-semibold mb-1">
            {t("results")}
          </h1>
          <p className="text-sm opacity-70 mb-4">
            {result.topicName} · Level {result.level}
          </p>

          {/* stars */}
          <div className="flex justify-center gap-2 text-5xl mb-5" aria-label={`${stars} of 3 stars`}>
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`animate-pop ${s <= stars ? "" : "grayscale opacity-30"}`}
                style={{ animationDelay: `${s * 0.25}s` }}
              >
                ⭐
              </span>
            ))}
          </div>

          <div className="font-display text-5xl font-bold text-brand mb-6">
            +{shownXp.toLocaleString()} XP
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6 text-center">
            <div className="rounded-2xl bg-slate-50 p-3">
              <div className="font-display text-2xl font-bold">
                {result.correct}/{result.total}
              </div>
              <div className="text-xs font-bold opacity-60">{t("correct")}</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <div className="font-display text-2xl font-bold">{pct}%</div>
              <div className="text-xs font-bold opacity-60">
                {t("accuracy")}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <div className="font-display text-2xl font-bold">
                {result.avgSeconds}s
              </div>
              <div className="text-xs font-bold opacity-60">avg speed ⚡</div>
            </div>
          </div>

          {result.perfect && (
            <div className="rounded-2xl bg-amber-50 border-2 border-sunny p-3 mb-6 animate-pop font-semibold">
              🎯 Badge earned: <b>Perfect Score!</b>
            </div>
          )}

          {!result.perfect && result.correct < result.total && (
            <div className="rounded-2xl bg-sky-50 border border-sky-200 p-3 mb-6 text-sm font-semibold">
              💪 Numzy says: the ones you missed will come back in your next
              review — that&apos;s how champions remember!
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <Link
              href={`/student/practice?topic=${result.topicId}&level=${result.level}`}
              className="btn-chunky bg-lagoon text-white px-6 py-3"
            >
              {t("tryAgain")} 🔁
            </Link>
            <Link
              href="/student"
              className="btn-chunky bg-brand text-white px-6 py-3"
            >
              {t("home")} 🏠
            </Link>
          </div>

          <div className="absolute -bottom-4 -right-4 size-24 opacity-90 pointer-events-none">
            <Image
              src="/images/mascot.jpg"
              alt=""
              width={96}
              height={96}
              className="rounded-full animate-float"
            />
          </div>
        </div>
      </div>
    </StudentShell>
  );
}
