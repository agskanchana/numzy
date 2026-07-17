"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StudentShell from "@/components/StudentShell";
import { DAILY_QUEST, type QuestNode } from "@/lib/data";
import { useLang } from "@/lib/i18n";

/** Node coordinates (percent of the 16:9 map) matching the SVG road below. */
const NODE_POS: Record<number, { x: number; y: number }> = {
  1: { x: 14, y: 26 },
  2: { x: 28, y: 26 },
  3: { x: 42, y: 26 },
  4: { x: 56, y: 26 },
  5: { x: 70, y: 26 },
  6: { x: 70, y: 52 },
  7: { x: 56, y: 52 },
  8: { x: 42, y: 52 },
  9: { x: 42, y: 78 },
  10: { x: 58, y: 78 },
};

function StopNode({ node }: { node: QuestNode }) {
  const pos = NODE_POS[node.n];
  const inner =
    node.state === "done" ? (
      <span className="grid place-items-center size-full rounded-full bg-lagoon text-white text-xl font-extrabold">
        ✓
      </span>
    ) : (
      <span
        className={`grid place-items-center size-full rounded-full bg-white font-display text-2xl font-semibold ${
          node.state === "current" ? "text-brand" : "text-sky-500/70"
        }`}
      >
        {node.n}
      </span>
    );

  const bubble = (
    <div className="flex flex-col items-center gap-1">
      <span
        className={`block size-12 sm:size-14 rounded-full p-1 shadow-lg transition-transform group-hover:scale-110 ${
          node.state === "current"
            ? "bg-brand animate-pulse-soft ring-4 ring-white"
            : node.state === "done"
              ? "bg-white"
              : "bg-white/80"
        }`}
      >
        {inner}
      </span>
      <span
        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow ${
          node.state === "locked"
            ? "bg-white/70 text-slate-500"
            : "bg-white text-emerald-700"
        }`}
      >
        ⚡ +{node.xp} XP
      </span>
    </div>
  );

  const style = {
    left: `${pos.x}%`,
    top: `${pos.y}%`,
  } as React.CSSProperties;

  if (node.state === "locked") {
    return (
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 opacity-90"
        style={style}
        title="Answer the earlier stops first!"
      >
        {bubble}
      </div>
    );
  }
  return (
    <Link
      href={`/student/practice?topic=times-tables&level=7&quest=${node.n}`}
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={style}
      title={node.state === "done" ? "Completed!" : "Continue here"}
    >
      {bubble}
    </Link>
  );
}

export default function DailyQuestPage() {
  const { t } = useLang();
  const [level, setLevel] = useState(DAILY_QUEST.levels[0].id);
  const levelInfo = DAILY_QUEST.levels.find((l) => l.id === level)!;
  const pct = (DAILY_QUEST.completed / DAILY_QUEST.total) * 100;

  return (
    <StudentShell>
      {/* header band */}
      <div className="bg-gradient-to-r from-amber-400 to-sunny text-amber-950 px-4 sm:px-6 py-3 flex items-center gap-4 flex-wrap">
        <Link
          href="/student"
          className="btn-chunky bg-white/80 px-4 py-1.5 text-sm shrink-0"
        >
          ‹ Back
        </Link>
        <div className="flex items-center gap-2 flex-1 min-w-48 max-w-xl">
          <div className="flex-1 h-4 rounded-full bg-white/60 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lagoon transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-extrabold text-sm shrink-0">
            {DAILY_QUEST.completed} / {DAILY_QUEST.total}
          </span>
          <span
            className="grid place-items-center size-9 rounded-full bg-white shadow text-lg -ml-1"
            title={`Finish all ${DAILY_QUEST.total} to open the gem bag!`}
          >
            🔒
          </span>
        </div>
        <div className="title-bubble text-2xl font-semibold ml-auto">
          ⚡ {t("dailyQuest")}
        </div>
      </div>

      <div className="px-4 sm:px-6 py-5 max-w-6xl mx-auto">
        {/* level picker */}
        <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
          <div className="flex rounded-full bg-white/10 p-1">
            {DAILY_QUEST.levels.map((l) => (
              <button
                key={l.id}
                onClick={() => setLevel(l.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-extrabold transition-colors ${
                  level === l.id
                    ? "bg-white text-lagoon-dark shadow"
                    : "text-white/75 hover:bg-white/10"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
          <span className="text-sm font-bold text-white/70">
            {levelInfo.desc}
          </span>
        </div>

        {/* the quest map */}
        <div className="card-pop relative overflow-hidden rounded-3xl">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src="/images/quest-map.jpg"
              alt=""
              fill
              priority
              sizes="(min-width:1280px) 1100px, 100vw"
              className="object-cover"
            />

            {/* road */}
            <svg
              viewBox="0 0 160 90"
              className="absolute inset-0 size-full"
              aria-hidden
            >
              <path
                d="M 16,23.4 H 130 Q 143,23.4 143,35 Q 143,46.8 130,46.8 H 55 Q 42,46.8 42,58.5 Q 42,70.2 55,70.2 H 126"
                fill="none"
                stroke="#14532d"
                strokeWidth="7.5"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M 16,23.4 H 130 Q 143,23.4 143,35 Q 143,46.8 130,46.8 H 55 Q 42,46.8 42,58.5 Q 42,70.2 55,70.2 H 126"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="0.9"
                strokeDasharray="3 2.6"
                strokeLinecap="round"
              />
            </svg>

            {/* stops */}
            {DAILY_QUEST.nodes.map((node) => (
              <StopNode key={node.n} node={node} />
            ))}

            {/* gem bag at the finish */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: "79%", top: "78%" }}
            >
              <div className="grid place-items-center size-14 sm:size-16 rounded-full bg-gradient-to-b from-amber-300 to-brand shadow-xl ring-4 ring-white/70 text-3xl animate-float">
                💎
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-ink text-white text-[11px] font-bold rounded-xl px-3 py-2 whitespace-nowrap shadow-xl">
                Complete all {DAILY_QUEST.total} stops to earn 💎{" "}
                {DAILY_QUEST.gemReward} gems
              </div>
            </div>
          </div>
        </div>

        {/* legend */}
        <div className="flex items-center justify-center gap-5 mt-4 text-xs font-bold text-white/75 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-white/80 inline-block" />{" "}
            Waiting
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-lagoon inline-block" />{" "}
            Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-brand inline-block" /> You
            are here
          </span>
          <span className="bg-white/10 rounded-full px-3 py-1">
            📚 Grade 4 · NIE curriculum
          </span>
          <span className="bg-white/10 rounded-full px-3 py-1">
            🕐 Open {DAILY_QUEST.openHours}
          </span>
        </div>
      </div>
    </StudentShell>
  );
}
