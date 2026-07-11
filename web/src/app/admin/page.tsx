"use client";

import { useState } from "react";
import PortalShell from "@/components/PortalShell";
import {
  ADMIN_STATS,
  CMS_QUESTIONS,
  CMS_TREE,
  type CmsQuestion,
  type ContentStatus,
} from "@/lib/data";
import { generateQuestion } from "@/lib/quiz";

type Tab = "curriculum" | "questions" | "generators" | "review" | "analytics";

function StatusChip({ status }: { status: ContentStatus }) {
  const styles: Record<ContentStatus, string> = {
    Published: "bg-green-100 text-green-700",
    "In review": "bg-amber-100 text-amber-800",
    Draft: "bg-slate-200 text-slate-600",
  };
  return (
    <span
      className={`text-[11px] font-bold rounded-full px-2 py-0.5 ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function AdminCms() {
  const [tab, setTab] = useState<Tab>("curriculum");
  const [selected, setSelected] = useState<CmsQuestion>(CMS_QUESTIONS[2]);
  const [preview, setPreview] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  const TABS: [Tab, string][] = [
    ["curriculum", "🌳 Curriculum"],
    ["questions", "❓ Questions"],
    ["generators", "⚙️ Generators"],
    ["review", "📤 Review queue"],
    ["analytics", "📈 Analytics"],
  ];

  return (
    <PortalShell
      title="Content admin"
      subtitle="CMS · Phase 0: nothing launches without content"
      accent="admin"
    >
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-white rounded-2xl px-5 py-3 shadow-xl animate-pop font-semibold text-sm">
          {toast}
        </div>
      )}

      <div className="flex gap-2 mb-5 flex-wrap">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              tab === id
                ? "bg-slate-800 text-white shadow"
                : "bg-white border border-slate-200 hover:border-slate-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ------------- curriculum tree ------------- */}
      {tab === "curriculum" && (
        <div className="flex flex-col gap-4">
          {CMS_TREE.map((strand) => (
            <div
              key={strand.strand}
              className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5"
            >
              <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                {strand.strand}
                <span className="text-[11px] font-bold bg-slate-100 rounded-full px-2 py-0.5 text-slate-500">
                  NIE strand
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {strand.topics.map((topic) => (
                  <div
                    key={topic.name}
                    className="rounded-xl border border-slate-100 p-3 hover:border-slate-300 cursor-pointer"
                    onClick={() => setTab("questions")}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">
                        {topic.name}
                      </span>
                      <StatusChip status={topic.status} />
                    </div>
                    <div className="text-xs text-slate-500 font-semibold">
                      Grade {topic.grade} · {topic.levels} levels ·{" "}
                      {topic.questions} questions
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={() => notify("New topic wizard (mock)")}
            className="rounded-2xl border-2 border-dashed border-slate-300 py-4 text-sm font-semibold text-slate-500 hover:border-slate-500 hover:text-slate-700"
          >
            + New strand / topic / level
          </button>
        </div>
      )}

      {/* ------------- question editor ------------- */}
      {tab === "questions" && (
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden self-start">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-display font-semibold">Question bank</h2>
              <button
                onClick={() => notify("Bulk import (CSV/JSON) — mock")}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                ⬆️ Bulk import
              </button>
            </div>
            {CMS_QUESTIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => setSelected(q)}
                className={`w-full text-left px-4 py-3 border-b border-slate-50 hover:bg-slate-50 ${
                  selected.id === q.id ? "bg-slate-100" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-slate-400">
                    {q.id} · {q.topic} L{q.level}
                  </span>
                  <StatusChip status={q.status} />
                </div>
                <div className="text-sm font-semibold truncate">{q.en}</div>
                {(!q.si || !q.ta) && (
                  <span className="text-[11px] font-bold text-red-500">
                    ⚠️ missing: {[!q.si && "සිං", !q.ta && "தமிழ்"]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* editor */}
          <div className="lg:col-span-3 rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold">
                Edit {selected.id}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  {selected.type}
                </span>
                <StatusChip status={selected.status} />
              </div>
            </div>

            <div className="grid gap-3">
              {(
                [
                  ["English", selected.en, "font-body"],
                  ["සිංහල", selected.si, "font-body"],
                  ["தமிழ்", selected.ta, "font-body"],
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <label className="text-xs font-bold text-slate-500 flex justify-between mb-1">
                    {label}
                    {!value && (
                      <span className="text-red-500">⚠️ untranslated</span>
                    )}
                  </label>
                  <textarea
                    defaultValue={value}
                    key={selected.id + label}
                    placeholder={`Write the ${label} version…`}
                    className={`w-full rounded-xl border p-3 text-sm font-semibold resize-none h-16 focus:outline-slate-500 ${
                      value ? "border-slate-200" : "border-red-300 bg-red-50"
                    }`}
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">
                    Correct answer
                  </label>
                  <input
                    defaultValue={selected.answer}
                    key={selected.id + "ans"}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">
                    Question type
                  </label>
                  <select
                    defaultValue={selected.type}
                    key={selected.id + "type"}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm font-semibold"
                  >
                    <option>Multiple choice</option>
                    <option>Numeric entry</option>
                    <option>True / False</option>
                    <option>Number line</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Curriculum tags
                </label>
                <div className="flex gap-2 flex-wrap">
                  {selected.tags.map((tg) => (
                    <span
                      key={tg}
                      className="text-xs font-bold bg-slate-100 rounded-full px-3 py-1"
                    >
                      {tg} ✕
                    </span>
                  ))}
                  <button className="text-xs font-bold border border-dashed border-slate-300 rounded-full px-3 py-1 text-slate-500">
                    + tag
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => notify("Saved as draft 💾")}
                  className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-semibold hover:bg-slate-50"
                >
                  Save draft
                </button>
                <button
                  onClick={() => notify("Submitted for review 📤")}
                  className="rounded-xl bg-slate-800 text-white px-5 py-2 text-sm font-semibold hover:bg-slate-700"
                >
                  Submit for review
                </button>
                <span className="ml-auto text-[11px] font-semibold text-slate-400 self-center">
                  Draft → review → publish; unfinished content never reaches
                  students
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------- generators ------------- */}
      {tab === "generators" && (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <h2 className="font-display font-semibold mb-1">
              Arithmetic generator · Times Tables
            </h2>
            <p className="text-xs text-slate-500 font-semibold mb-4">
              Generators create infinite auto-marked questions from rules —
              hand-authored word problems live in the question bank.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Operator
                </label>
                <select className="w-full rounded-xl border border-slate-200 p-2.5 text-sm font-semibold">
                  <option>× multiplication</option>
                  <option>÷ division</option>
                  <option>+ addition</option>
                  <option>− subtraction</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Fact family / table
                </label>
                <select className="w-full rounded-xl border border-slate-200 p-2.5 text-sm font-semibold">
                  <option>7× table (Level 7)</option>
                  <option>2–5× mixed</option>
                  <option>2–12× mixed</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Operand range
                </label>
                <input
                  defaultValue="2 – 12"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Answer style
                </label>
                <select className="w-full rounded-xl border border-slate-200 p-2.5 text-sm font-semibold">
                  <option>50% MCQ / 50% keypad</option>
                  <option>MCQ only</option>
                  <option>Keypad only</option>
                </select>
              </div>
            </div>
            <button
              onClick={() =>
                setPreview(
                  Array.from({ length: 3 }, () => {
                    const q = generateQuestion("times-tables", 7);
                    return `${q.prompt.replace(" = ?", "")} = ${q.answer}`;
                  }),
                )
              }
              className="rounded-xl bg-slate-800 text-white px-5 py-2 text-sm font-semibold hover:bg-slate-700"
            >
              ▶ Preview 3 generated questions
            </button>
            {preview.length > 0 && (
              <div className="mt-3 rounded-xl bg-slate-50 p-3 font-mono text-sm font-semibold space-y-1 animate-pop">
                {preview.map((p, i) => (
                  <div key={i}>
                    {i + 1}. {p}
                  </div>
                ))}
                <div className="text-[11px] text-slate-400 font-body">
                  ← live output from the same engine the student practice
                  screen uses
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5">
            <h2 className="font-display font-semibold mb-3">
              Active generators
            </h2>
            {[
              ["Times tables 2–12", "480 facts · MCQ + keypad", "Published"],
              ["Addition to 1000", "carrying on/off · keypad", "Published"],
              ["Division facts", "linked to tables", "Published"],
              ["Fraction of amount", "halves & quarters", "In review"],
              ["Decimal place value", "tenths", "Draft"],
            ].map(([name, desc, status]) => (
              <div
                key={name}
                className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0"
              >
                <div>
                  <div className="text-sm font-semibold">{name}</div>
                  <div className="text-xs text-slate-400 font-semibold">
                    {desc}
                  </div>
                </div>
                <StatusChip status={status as ContentStatus} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------- review queue ------------- */}
      {tab === "review" && (
        <div className="grid sm:grid-cols-3 gap-4">
          {(
            [
              ["Draft", ["Decimal place value gen", "Patterns q-1045", "Grade 5 percentages topic"]],
              ["In review", ["Fractions q-1044 (TA missing)", "Time & Calendar topic", "Fraction generator"]],
              ["Published", ["Times Tables (480 q)", "Money & rupees (187 q)", "Addition (356 q)"]],
            ] as [string, string[]][]
          ).map(([col, items]) => (
            <div
              key={col}
              className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4"
            >
              <h2 className="font-display font-semibold mb-3 flex items-center justify-between">
                {col}
                <span className="text-xs font-bold bg-slate-100 rounded-full px-2 py-0.5 text-slate-500">
                  {items.length}
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-100 p-3 text-sm font-semibold hover:border-slate-300 cursor-grab"
                  >
                    {item}
                    {col !== "Published" && (
                      <button
                        onClick={() =>
                          notify(
                            col === "Draft"
                              ? "Sent to review 📤"
                              : "Published ✅ — live for students",
                          )
                        }
                        className="block mt-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                      >
                        {col === "Draft" ? "Submit →" : "Approve & publish →"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ------------- analytics ------------- */}
      {tab === "analytics" && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {ADMIN_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5"
            >
              <div className="text-xs font-bold text-slate-500 mb-1">
                {s.label}
              </div>
              <div className="font-display text-3xl font-bold">{s.value}</div>
              <div
                className={`text-xs font-bold mt-1 ${
                  s.delta.startsWith("-")
                    ? s.label.includes("Untranslated")
                      ? "text-green-600"
                      : "text-red-500"
                    : "text-green-600"
                }`}
              >
                {s.delta} vs last month
              </div>
            </div>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
