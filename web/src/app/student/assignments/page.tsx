"use client";

import Link from "next/link";
import StudentShell from "@/components/StudentShell";
import MascotBar from "@/components/MascotBar";
import { ASSIGNMENTS } from "@/lib/data";

export default function AssignmentsPage() {
  return (
    <StudentShell>
      <div className="mx-auto max-w-3xl px-4 py-4 flex flex-col gap-4">
        <MascotBar>
          Your <b>assigned work</b> 🎒 — from your teacher and tutor. Finish
          before the due date to earn bonus XP!
        </MascotBar>

        <div className="flex flex-col gap-3">
          {ASSIGNMENTS.map((a) => (
            <div
              key={a.id}
              className={`rounded-2xl shadow p-4 flex items-center gap-4 ${
                a.done ? "bg-slate-50 opacity-80" : "bg-white"
              }`}
            >
              <span className="text-3xl">{a.done ? "✅" : "📌"}</span>
              <div className="flex-1">
                <div className="font-display font-semibold">{a.title}</div>
                <div className="text-xs opacity-60 font-semibold">
                  Set by {a.by} · Due: {a.due}
                </div>
              </div>
              {!a.done && (
                <Link
                  href={`/student/practice?topic=${a.topicId}&level=5`}
                  className="btn-chunky bg-brand text-white px-5 py-2 text-sm"
                >
                  Start ▶
                </Link>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-center opacity-60 font-semibold">
          Homework reminders go out the evening before it&apos;s due (§3.5) —
          to you here, and to Amma&apos;s WhatsApp.
        </p>
      </div>
    </StudentShell>
  );
}
