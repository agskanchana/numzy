"use client";

import Link from "next/link";
import StudentShell from "@/components/StudentShell";
import MascotBar from "@/components/MascotBar";
import { SCHOLARSHIP } from "@/lib/data";

export default function ScholarshipPage() {
  const { readiness, competencies, sets, examDateLabel } = SCHOLARSHIP;

  return (
    <StudentShell>
      <div className="mx-auto max-w-4xl px-4 py-4 flex flex-col gap-4">
        <MascotBar>
          Welcome to <b>Scholarship Summit</b> 🏔️ — practice matched to the
          Grade 5 Scholarship exam. Climb one competency at a time!
        </MascotBar>

        {/* Readiness header */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl p-6 flex flex-col sm:flex-row items-center gap-6">
          <div
            className="relative size-32 rounded-full grid place-items-center shrink-0"
            style={{
              background: `conic-gradient(#facc15 ${readiness * 3.6}deg, rgba(255,255,255,0.25) 0deg)`,
            }}
          >
            <div className="absolute inset-2 bg-indigo-700 rounded-full grid place-items-center flex-col">
              <div className="text-center">
                <div className="font-display text-3xl font-bold">
                  {readiness}%
                </div>
                <div className="text-[11px] font-bold opacity-80">ready</div>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-display text-2xl font-semibold mb-1">
              Exam readiness indicator
            </h1>
            <p className="text-sm opacity-90 mb-2">
              Based on your mastery of the 5 Scholarship maths competencies.
            </p>
            <span className="inline-block text-xs font-bold bg-white/20 rounded-full px-3 py-1">
              📅 {examDateLabel}
            </span>
          </div>
          <Link
            href="/student/practice?topic=scholarship&level=8"
            className="btn-chunky bg-sunny text-ink px-6 py-3 shrink-0"
          >
            Exam-style set ▶
          </Link>
        </div>

        {/* Competencies */}
        <div className="rounded-3xl bg-white shadow-xl p-5">
          <h2 className="font-display text-xl font-semibold mb-3">
            Competencies
          </h2>
          <div className="flex flex-col gap-3">
            {competencies.map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center">
                  {c.progress >= 80 ? "🟢" : c.progress >= 55 ? "🟡" : "🔴"}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span>{c.name}</span>
                    <span className="opacity-60">{c.progress}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
                <Link
                  href="/student/practice?topic=scholarship&level=8"
                  className="text-xs font-bold text-indigo-600 hover:underline shrink-0"
                >
                  Practise →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Exam-style sets */}
        <div className="grid sm:grid-cols-2 gap-3">
          {sets.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl bg-white shadow p-4 flex items-center gap-3"
            >
              <span className="text-2xl">{s.done ? "✅" : "📝"}</span>
              <div className="flex-1">
                <div className="font-display font-semibold text-sm">
                  {s.name}
                </div>
                <div className="text-xs opacity-60 font-semibold">
                  {s.questions} questions
                  {s.done && s.score !== undefined
                    ? ` · scored ${s.score}/${s.questions}`
                    : ""}
                </div>
              </div>
              <Link
                href="/student/practice?topic=scholarship&level=8"
                className={`btn-chunky px-4 py-2 text-sm ${
                  s.done
                    ? "bg-white border-2 border-slate-200"
                    : "bg-indigo-600 text-white"
                }`}
              >
                {s.done ? "Retry" : "Start"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </StudentShell>
  );
}
