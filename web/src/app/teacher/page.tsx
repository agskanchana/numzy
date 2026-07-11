"use client";

import { useMemo, useState } from "react";
import PortalShell from "@/components/PortalShell";
import {
  CLASS_PUPILS,
  TEACHER_ASSIGNMENTS,
  factHeatmap,
} from "@/lib/data";

type Tab = "overview" | "heatmap" | "assignments";

/* sequential single-hue ramp: light (low) → dark (high) */
function cellColor(v: number) {
  const l = 94 - (v / 100) * 62; // 94% → 32%
  return `hsl(172 55% ${l}%)`;
}

export default function TeacherDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [pupilId, setPupilId] = useState<string>("class");
  const [showValues, setShowValues] = useState(false);
  const [assignments, setAssignments] = useState(TEACHER_ASSIGNMENTS);
  const [newTopic, setNewTopic] = useState("Times Tables L8");
  const [toast, setToast] = useState<string | null>(null);

  const grid = useMemo(() => {
    if (pupilId === "class") {
      const grids = CLASS_PUPILS.map((p) => factHeatmap(p.name));
      return grids[0].map((row, a) =>
        row.map((_, b) =>
          Math.round(
            grids.reduce((s, g) => s + g[a][b], 0) / grids.length,
          ),
        ),
      );
    }
    const p = CLASS_PUPILS.find((x) => x.id === pupilId)!;
    return factHeatmap(p.name);
  }, [pupilId]);

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  return (
    <PortalShell
      title="Teacher dashboard"
      subtitle="Grade 4-B · Ananda Primary · 24 pupils (8 shown in prototype)"
      accent="teacher"
    >
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-white rounded-2xl px-5 py-3 shadow-xl animate-pop font-semibold text-sm">
          {toast}
        </div>
      )}

      {/* tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(
          [
            ["overview", "📋 Class overview"],
            ["heatmap", "🔥 Fact heatmap"],
            ["assignments", "📌 Assignments & arenas"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              tab === id
                ? "bg-lagoon text-white shadow"
                : "bg-white border border-slate-200 hover:border-lagoon"
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => notify("Term certificates queued for printing 🖨️ (mock)")}
          className="ml-auto rounded-full px-5 py-2 text-sm font-semibold bg-white border border-slate-200 hover:border-lagoon"
        >
          🎓 Print certificates
        </button>
        <button
          onClick={() => notify("CSV roster import — coming in the build (mock)")}
          className="rounded-full px-5 py-2 text-sm font-semibold bg-white border border-slate-200 hover:border-lagoon"
        >
          ⬆️ Import roster (CSV)
        </button>
      </div>

      {tab === "overview" && (
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-500 border-b border-slate-100">
                <th className="px-4 py-3">Pupil</th>
                <th className="px-4 py-3">Last active</th>
                <th className="px-4 py-3">XP this week</th>
                <th className="px-4 py-3">Accuracy</th>
                <th className="px-4 py-3">Avg mastery</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {CLASS_PUPILS.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-slate-50 hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-semibold">{p.name}</td>
                  <td className="px-4 py-3 text-slate-500 font-semibold">
                    {p.lastActive}
                  </td>
                  <td className="px-4 py-3 font-bold">
                    {p.xpWeek.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-semibold">{p.accuracy}%</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-lagoon"
                          style={{ width: `${p.masteryAvg}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-600">
                        {p.masteryAvg}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {p.flagged ? (
                      <span className="text-[11px] font-bold bg-amber-100 text-amber-800 rounded-full px-2 py-1">
                        ⚠️ {p.flagged}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold bg-green-100 text-green-700 rounded-full px-2 py-1">
                        ✓ On track
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "heatmap" && (
        <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <button
              onClick={() => setPupilId("class")}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                pupilId === "class"
                  ? "bg-lagoon text-white"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              Class average
            </button>
            {CLASS_PUPILS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPupilId(p.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                  pupilId === p.id
                    ? "bg-lagoon text-white"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                {p.name.split(" ")[0]}
              </button>
            ))}
            <label className="ml-auto flex items-center gap-2 text-sm font-semibold">
              Show %
              <input
                type="checkbox"
                checked={showValues}
                onChange={(e) => setShowValues(e.target.checked)}
                className="accent-lagoon size-4"
              />
            </label>
          </div>

          <p className="text-xs text-slate-500 font-semibold mb-3">
            Multiplication facts 1–12 · darker = stronger. Hover any cell for
            the exact score; light cells are re-queued into practice
            automatically.
          </p>

          <div className="overflow-x-auto">
            <table className="border-separate" style={{ borderSpacing: 2 }}>
              <thead>
                <tr>
                  <th className="text-[11px] font-bold text-slate-400 size-8">
                    ×
                  </th>
                  {Array.from({ length: 12 }, (_, b) => (
                    <th
                      key={b}
                      className="text-[11px] font-bold text-slate-500 size-8 text-center"
                    >
                      {b + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grid.map((row, a) => (
                  <tr key={a}>
                    <td className="text-[11px] font-bold text-slate-500 text-center size-8">
                      {a + 1}
                    </td>
                    {row.map((v, b) => (
                      <td
                        key={b}
                        title={`${a + 1} × ${b + 1}: ${v}% mastered`}
                        className="size-8 rounded-[4px] text-center align-middle cursor-default"
                        style={{ backgroundColor: cellColor(v) }}
                      >
                        {showValues && (
                          <span
                            className="text-[9px] font-bold"
                            style={{ color: v > 55 ? "white" : "#334155" }}
                          >
                            {v}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* legend */}
          <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-slate-500">
            Needs work
            {[10, 30, 50, 70, 90].map((v) => (
              <span
                key={v}
                className="size-5 rounded-[4px] inline-block"
                style={{ backgroundColor: cellColor(v) }}
                title={`${v}%`}
              />
            ))}
            Mastered
          </div>
        </div>
      )}

      {tab === "assignments" && (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <h2 className="font-display text-lg font-semibold mb-3">
              Current assignments
            </h2>
            <div className="flex flex-col gap-3">
              {assignments.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border border-slate-100 p-3"
                >
                  <div className="flex justify-between font-semibold text-sm mb-1">
                    <span>{a.title}</span>
                    <span className="text-slate-500">Due {a.due}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-lagoon"
                        style={{ width: `${(a.completed / a.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      {a.completed}/{a.total} done
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-display font-semibold mt-5 mb-2 text-sm">
              Assign new topic
            </h3>
            <div className="flex gap-2">
              <select
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold"
              >
                <option>Times Tables L8</option>
                <option>Division L4</option>
                <option>Fractions L1</option>
                <option>Money word problems</option>
                <option>Scholarship set 3</option>
              </select>
              <button
                onClick={() => {
                  setAssignments((prev) => [
                    {
                      id: `t${prev.length + 1}`,
                      title: `${newTopic} — homework`,
                      due: "Next Mon",
                      completed: 0,
                      total: 24,
                    },
                    ...prev,
                  ]);
                  notify(`Assigned "${newTopic}" to Grade 4-B ✅`);
                }}
                className="rounded-xl bg-lagoon text-white px-5 py-2 text-sm font-semibold hover:bg-lagoon-dark"
              >
                Assign
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
              <h2 className="font-display text-lg font-semibold mb-2">
                Schedule an arena race 🏁
              </h2>
              <p className="text-sm text-slate-500 font-semibold mb-3">
                Whole class races the same question set, live.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold">
                  <option>Times Tables mix</option>
                  <option>Division sprint</option>
                </select>
                <select className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold">
                  <option>Today 5:00 pm</option>
                  <option>Tomorrow 10:00 am</option>
                </select>
              </div>
              <button
                onClick={() =>
                  notify("Arena scheduled — pupils will be reminded 🔔")
                }
                className="w-full rounded-xl bg-lagoon text-white py-2 text-sm font-semibold hover:bg-lagoon-dark"
              >
                Schedule race
              </button>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-lagoon to-teal-500 text-white shadow p-5">
              <h2 className="font-display text-lg font-semibold mb-1">
                Team battle ⚔️
              </h2>
              <p className="text-sm font-semibold opacity-90 mb-3">
                Grade 4-B vs Grade 4-A · starts Monday. Cumulative XP counts —
                great for participation, fair for every level.
              </p>
              <button
                onClick={() => notify("Battle invitation sent to 4-A 🎉")}
                className="rounded-xl bg-white text-lagoon-dark px-5 py-2 text-sm font-semibold"
              >
                Challenge another class
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
