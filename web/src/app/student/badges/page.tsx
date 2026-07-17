"use client";

import StudentShell from "@/components/StudentShell";
import MascotBar from "@/components/MascotBar";
import { BADGES, RANK_TIERS, RANK_THRESHOLDS, STUDENT } from "@/lib/data";

export default function BadgesPage() {
  const earned = BADGES.filter((b) => b.earned).length;
  const rankIdx = RANK_TIERS.indexOf(STUDENT.rank);

  return (
    <StudentShell>
      <div className="mx-auto max-w-4xl px-4 py-4 flex flex-col gap-4">
        <MascotBar>
          You&apos;ve earned <b>{earned} badges</b>, {STUDENT.name}! One more
          day for that 🔥 7-day streak…
        </MascotBar>

        {/* Rank journey */}
        <div className="rounded-3xl bg-white text-ink shadow-xl p-5">
          <h2 className="font-display text-xl font-semibold mb-4">
            Rank journey
          </h2>
          <div className="flex items-center">
            {RANK_TIERS.map((tier, i) => {
              const reached = i <= rankIdx;
              const icons = ["🌱", "🥉", "🥈", "🥇", "🌟"];
              return (
                <div key={tier} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <span
                      className={`grid place-items-center size-12 rounded-full text-2xl ${
                        reached
                          ? "bg-sunny shadow-lg"
                          : "bg-slate-100 grayscale opacity-50"
                      } ${i === rankIdx ? "ring-4 ring-brand/40 animate-pulse-soft" : ""}`}
                    >
                      {icons[i]}
                    </span>
                    <span className="text-xs font-bold mt-1">{tier}</span>
                    <span className="text-[10px] opacity-60 font-semibold">
                      {RANK_THRESHOLDS[i].toLocaleString()} XP
                    </span>
                  </div>
                  {i < RANK_TIERS.length - 1 && (
                    <div
                      className={`h-1.5 flex-1 rounded-full -mt-8 ${
                        i < rankIdx ? "bg-sunny" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-sm font-semibold text-center mt-4 opacity-70">
            {(RANK_THRESHOLDS[rankIdx + 1] - STUDENT.xp).toLocaleString()} XP to{" "}
            {STUDENT.nextRank} 🥇
          </p>
        </div>

        {/* Badge grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BADGES.map((b) => (
            <div
              key={b.id}
              className={`rounded-2xl p-4 text-center text-ink shadow transition-all ${
                b.earned
                  ? "bg-white hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-slate-50"
              }`}
              title={b.desc}
            >
              <div
                className={`text-4xl mb-1 ${b.earned ? "" : "grayscale opacity-40"}`}
              >
                {b.icon}
              </div>
              <div className="font-display font-semibold text-sm leading-tight">
                {b.name}
              </div>
              <div className="text-[11px] opacity-60 font-semibold mt-1">
                {b.desc}
              </div>
              {b.earned ? (
                <span className="inline-block mt-2 text-[11px] font-bold bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                  ✓ Earned
                </span>
              ) : (
                <span className="inline-block mt-2 text-[11px] font-bold bg-slate-200 text-slate-600 rounded-full px-2 py-0.5">
                  {b.progress ?? "Locked"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </StudentShell>
  );
}
