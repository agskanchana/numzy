"use client";

import { useState } from "react";
import StudentShell from "@/components/StudentShell";
import MascotBar from "@/components/MascotBar";
import { LEADERBOARD } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const WINDOWS = [
  { id: "daily", label: "Today" },
  { id: "weekly", label: "This week" },
  { id: "alltime", label: "All time" },
] as const;

export default function LeaderboardPage() {
  const { t } = useLang();
  const [win, setWin] = useState<(typeof WINDOWS)[number]["id"]>("weekly");
  const rows = LEADERBOARD[win];
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <StudentShell>
      <div className="mx-auto max-w-3xl px-4 py-4 flex flex-col gap-4">
        <MascotBar>
          <b>{t("leaderboard")}</b> — Grade 4-B, Ananda Primary. Names are safe
          display names, and only your class can see this. 🛡️
        </MascotBar>

        {/* window tabs */}
        <div className="flex gap-2">
          {WINDOWS.map((w) => (
            <button
              key={w.id}
              onClick={() => setWin(w.id)}
              className={`btn-chunky px-5 py-2 text-sm ${
                win === w.id
                  ? "bg-brand text-white"
                  : "bg-white text-ink border-2 border-slate-200"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        <div className="rounded-3xl bg-white text-ink shadow-xl overflow-hidden">
          {rows.map((row, i) => (
            <div
              key={row.name}
              className={`flex items-center gap-3 px-4 sm:px-6 py-3 ${
                i !== rows.length - 1 ? "border-b border-slate-100" : ""
              } ${row.me ? "bg-amber-50 border-l-4 border-l-sunny" : ""}`}
            >
              <span className="font-display text-xl w-10 text-center">
                {medals[row.pos - 1] ?? `#${row.pos}`}
              </span>
              <span
                className="size-9 rounded-full grid place-items-center text-white font-bold shrink-0"
                style={{
                  backgroundColor: `hsl(${(row.name.length * 47) % 360} 60% 55%)`,
                }}
              >
                {row.name[0]}
              </span>
              <span className="font-semibold flex-1">
                {row.name}
                {row.me && (
                  <span className="ml-2 text-xs font-bold bg-sunny/70 rounded-full px-2 py-0.5">
                    You
                  </span>
                )}
              </span>
              <span className="font-display font-bold text-lagoon-dark">
                ⭐ {row.xp.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* team battle teaser (§3.3) */}
        <div className="rounded-3xl bg-gradient-to-r from-lagoon to-teal-500 text-white shadow-xl p-5 flex items-center gap-4">
          <span className="text-4xl">⚔️</span>
          <div className="flex-1">
            <div className="font-display text-lg font-semibold">
              Team battle: Grade 4-B vs Grade 4-A
            </div>
            <div className="text-sm opacity-90">
              Starts Monday · every XP you earn counts for your class!
            </div>
          </div>
          <button className="btn-chunky bg-sunny text-ink px-5 py-2 text-sm">
            Remind me 🔔
          </button>
        </div>
      </div>
    </StudentShell>
  );
}
