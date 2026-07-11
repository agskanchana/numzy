"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PortalShell from "@/components/PortalShell";
import { CHILDREN, type ChildSummary } from "@/lib/data";

/* ---------------- weekly XP bar chart (single series, one hue) ------- */
function WeeklyChart({ child }: { child: ChildSummary }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...child.weeklyXp.map((d) => d.xp), 1);
  const maxIdx = child.weeklyXp.findIndex((d) => d.xp === max);

  return (
    <div>
      <div className="relative flex items-end gap-2 h-40 pt-6">
        {child.weeklyXp.map((d, i) => (
          <div
            key={d.day}
            className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            {/* selective direct label: peak day, or hovered bar */}
            {(hover === i || (hover === null && i === maxIdx && d.xp > 0)) && (
              <span className="text-[11px] font-bold text-slate-600">
                {d.xp.toLocaleString()}
              </span>
            )}
            <div
              className={`w-full max-w-9 rounded-t-[4px] transition-colors ${
                hover === i ? "bg-lagoon-dark" : "bg-lagoon"
              }`}
              style={{
                height: `${(d.xp / max) * 100}%`,
                minHeight: d.xp > 0 ? 4 : 0,
              }}
              title={`${d.day}: ${d.xp} XP`}
            />
            <span className="text-[11px] font-bold text-slate-500">
              {d.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- page ---------------- */
export default function ParentDashboard() {
  const [childId, setChildId] = useState(CHILDREN[0].id);
  const child = useMemo(
    () => CHILDREN.find((c) => c.id === childId) ?? CHILDREN[0],
    [childId],
  );

  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [timeLimit, setTimeLimit] = useState(child.timeLimit);
  const [channels, setChannels] = useState({
    email: true,
    whatsapp: true,
    sms: false,
  });

  const weekDelta = child.xpWeek - child.xpLastWeek;
  const goalPct = Math.min(
    100,
    Math.round((child.rewardGoal.current / child.rewardGoal.target) * 100),
  );

  function send() {
    if (!message.trim()) return;
    setSent((s) => [message.trim(), ...s]);
    setMessage("");
    setToast(`Delivered to ${child.name}'s app 💌`);
    setTimeout(() => setToast(null), 2500);
  }

  return (
    <PortalShell
      title="Parent dashboard"
      subtitle="Weekly report emailed every Sunday · next: this Sunday 7 pm"
      accent="parent"
    >
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-white rounded-2xl px-5 py-3 shadow-xl animate-pop font-semibold text-sm">
          {toast}
        </div>
      )}

      {/* child switcher */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {CHILDREN.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setChildId(c.id);
              setTimeLimit(c.timeLimit);
            }}
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-sm transition-all ${
              c.id === childId
                ? "bg-brand text-white shadow"
                : "bg-white border border-slate-200 hover:border-brand"
            }`}
          >
            <span
              className="size-6 rounded-full grid place-items-center text-white text-xs font-bold"
              style={{ backgroundColor: `hsl(${c.avatarHue} 75% 50%)` }}
            >
              {c.name[0]}
            </span>
            {c.name} · Grade {c.grade}
          </button>
        ))}
        <button className="rounded-full px-4 py-2 text-sm font-semibold border border-dashed border-slate-300 text-slate-500 hover:border-brand hover:text-brand">
          + Link a child
        </button>
      </div>

      {/* stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4">
          <div className="text-xs font-bold text-slate-500 mb-1">
            XP this week
          </div>
          <div className="font-display text-3xl font-bold">
            {child.xpWeek.toLocaleString()}
          </div>
          <div
            className={`text-xs font-bold mt-1 ${weekDelta >= 0 ? "text-green-600" : "text-red-500"}`}
          >
            {weekDelta >= 0 ? "▲" : "▼"} {Math.abs(weekDelta)} vs last week
          </div>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4">
          <div className="text-xs font-bold text-slate-500 mb-1">Accuracy</div>
          <div className="font-display text-3xl font-bold">
            {child.accuracy}%
          </div>
          <div className="text-xs font-bold mt-1 text-slate-400">
            across all topics
          </div>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4">
          <div className="text-xs font-bold text-slate-500 mb-1">
            Time spent
          </div>
          <div className="font-display text-3xl font-bold">
            {child.minutes} min
          </div>
          <div className="text-xs font-bold mt-1 text-slate-400">
            this week · cap {timeLimit} min/day
          </div>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4">
          <div className="text-xs font-bold text-slate-500 mb-1">Streak</div>
          <div className="font-display text-3xl font-bold">
            🔥 {child.streak} days
          </div>
          <div className="text-xs font-bold mt-1 text-amber-600">
            streak-saver nudge at 6 pm if idle
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* left column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* weekly chart */}
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <h2 className="font-display text-lg font-semibold">
              XP earned this week
            </h2>
            <p className="text-xs text-slate-500 font-semibold mb-2">
              Daily practice, Mon–Sun
            </p>
            <WeeklyChart child={child} />
          </div>

          {/* mastery */}
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <h2 className="font-display text-lg font-semibold mb-1">
              Topic mastery
            </h2>
            <p className="text-xs text-slate-500 font-semibold mb-3">
              Matched to the Grade {child.grade} national syllabus
            </p>
            <div className="flex flex-col gap-3">
              {child.mastery.map((m) => (
                <div key={m.topic} className="flex items-center gap-3">
                  <span className="w-40 text-sm font-semibold truncate">
                    {m.topic}
                  </span>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${m.weak ? "bg-amber-500" : "bg-lagoon"}`}
                      style={{ width: `${m.pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-bold text-slate-600">
                    {m.pct}%
                  </span>
                  {m.weak && (
                    <span className="text-[11px] font-bold bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 whitespace-nowrap">
                      ⚠️ needs practice
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* activity feed */}
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <h2 className="font-display text-lg font-semibold mb-3">
              Recent activity
            </h2>
            <div className="flex flex-col gap-3">
              {sent.map((m, i) => (
                <div key={`sent-${i}`} className="flex gap-3 items-start">
                  <span className="text-xl">💌</span>
                  <div>
                    <div className="text-sm font-semibold">
                      You said: “{m}” — delivered to {child.name}&apos;s app
                    </div>
                    <div className="text-xs text-slate-400 font-semibold">
                      Just now
                    </div>
                  </div>
                </div>
              ))}
              {child.feed.map((f, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-xl">{f.icon}</span>
                  <div>
                    <div className="text-sm font-semibold">{f.what}</div>
                    <div className="text-xs text-slate-400 font-semibold">
                      {f.when}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="flex flex-col gap-4">
          {/* reward goal */}
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <h2 className="font-display text-lg font-semibold mb-1">
              Reward goal 🎁
            </h2>
            <p className="text-sm font-semibold mb-2">
              {child.rewardGoal.reward} at{" "}
              {child.rewardGoal.target.toLocaleString()} XP
            </p>
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden mb-1">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${goalPct}%` }}
              />
            </div>
            <div className="text-xs font-bold text-slate-500 mb-3">
              {child.rewardGoal.current.toLocaleString()} /{" "}
              {child.rewardGoal.target.toLocaleString()} XP ({goalPct}%)
            </div>
            <button className="w-full rounded-xl border border-slate-200 py-2 text-sm font-semibold hover:border-brand hover:text-brand">
              Edit goal
            </button>
          </div>

          {/* encouragement */}
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <h2 className="font-display text-lg font-semibold mb-2">
              Send encouragement 💬
            </h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`e.g. "Great job on times tables, ${child.name}!"`}
              className="w-full rounded-xl border border-slate-200 p-3 text-sm font-semibold resize-none h-20 focus:outline-brand"
            />
            <button
              onClick={send}
              className="mt-2 w-full rounded-xl bg-brand text-white py-2 font-semibold text-sm hover:bg-brand-dark transition-colors"
            >
              Deliver to {child.name}&apos;s app
            </button>
            <p className="text-[11px] text-slate-400 font-semibold mt-2">
              Messages appear on {child.name}&apos;s island — “Amma says…”
            </p>
          </div>

          {/* screen time */}
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <h2 className="font-display text-lg font-semibold mb-3">
              Screen-time controls ⏱️
            </h2>
            <label className="text-sm font-semibold flex justify-between mb-1">
              Daily limit <span className="text-brand">{timeLimit} min</span>
            </label>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="w-full accent-brand"
            />
            <label className="flex items-center justify-between text-sm font-semibold mt-3">
              Quiet hours (8 pm – 6 am)
              <input
                type="checkbox"
                defaultChecked
                className="accent-brand size-4"
              />
            </label>
          </div>

          {/* notifications */}
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <h2 className="font-display text-lg font-semibold mb-2">
              Notifications 🔔
            </h2>
            {(
              [
                ["email", "Weekly email report"],
                ["whatsapp", "WhatsApp updates"],
                ["sms", "SMS (Dialog / Mobitel)"],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center justify-between text-sm font-semibold py-1.5"
              >
                {label}
                <input
                  type="checkbox"
                  checked={channels[key]}
                  onChange={(e) =>
                    setChannels((c) => ({ ...c, [key]: e.target.checked }))
                  }
                  className="accent-brand size-4"
                />
              </label>
            ))}
          </div>

          {/* billing */}
          <div className="rounded-2xl bg-gradient-to-br from-brand to-amber-500 text-white shadow p-5">
            <h2 className="font-display text-lg font-semibold mb-1">
              Family plan
            </h2>
            <div className="font-display text-3xl font-bold">
              Rs. 1,490<span className="text-base font-semibold">/month</span>
            </div>
            <p className="text-xs font-semibold opacity-90 mb-3">
              2 children · billed via PayHere · next charge 1 Aug
            </p>
            <div className="flex gap-2">
              <button className="flex-1 rounded-xl bg-white/20 hover:bg-white/30 py-2 text-sm font-semibold">
                Manage billing
              </button>
              <button className="flex-1 rounded-xl bg-white text-brand-dark py-2 text-sm font-semibold">
                Refer a friend 🎉
              </button>
            </div>
          </div>

          <Link
            href="/student"
            className="text-center text-sm font-semibold text-slate-500 hover:text-brand"
          >
            👀 Preview {child.name}&apos;s view →
          </Link>
        </div>
      </div>
    </PortalShell>
  );
}
