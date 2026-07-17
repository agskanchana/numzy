"use client";

import Link from "next/link";
import { useState } from "react";
import StudentShell from "@/components/StudentShell";
import { PAPERS, PAPER_WEEKLY, type Paper } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const KINDS = [
  { id: "revision", label: "Revision Sets", icon: "📗" },
  { id: "scholarship", label: "Scholarship Mocks", icon: "🏔️" },
  { id: "speed", label: "Speed Rounds", icon: "⏱️" },
] as const;

const KIND_TINT: Record<Paper["kind"], string> = {
  revision: "bg-lime-100 text-lime-900",
  scholarship: "bg-teal-100 text-teal-900",
  speed: "bg-amber-100 text-amber-900",
};

function PaperThumb({ paper, onOpen }: { paper: Paper; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="card-pop rounded-2xl bg-white text-ink overflow-hidden text-left group"
    >
      {/* fake paper preview */}
      <div className="relative mx-6 mt-5 mb-3 rounded-md border border-slate-200 bg-white shadow-sm p-2.5 aspect-[3/4] overflow-hidden">
        <div className="text-[8px] font-bold text-slate-400">
          Numzy · {paper.title}
        </div>
        <div className="flex gap-1 mt-1.5">
          <span className="h-1 flex-1 rounded bg-slate-200" />
          <span className="h-1 flex-1 rounded bg-slate-200" />
        </div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center gap-1 mt-2">
            <span className="size-2 rounded-sm bg-orange-200 shrink-0" />
            <span
              className="h-1 rounded bg-slate-100"
              style={{ width: `${85 - ((i * 17) % 40)}%` }}
            />
          </div>
        ))}
        {paper.done && (
          <span className="absolute bottom-1.5 right-1.5 text-[10px] font-extrabold bg-green-100 text-green-700 rounded-full px-2 py-0.5">
            ✓ {paper.score}/{paper.questions}
          </span>
        )}
        <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/5 transition-colors" />
      </div>
      <div className={`px-3 py-2.5 flex items-center gap-2 ${KIND_TINT[paper.kind]}`}>
        <span className="grid place-items-center size-8 rounded-full bg-white/80 font-display font-semibold text-sm shadow-sm shrink-0">
          G{paper.grade}
        </span>
        <div className="min-w-0">
          <div className="text-xs font-extrabold leading-tight">
            {paper.title}
          </div>
          <div className="text-[10px] font-bold opacity-70 truncate">
            {paper.topic}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function PapersPage() {
  const { t } = useLang();
  const [kind, setKind] = useState<Paper["kind"]>("revision");
  const [grade, setGrade] = useState<3 | 4 | 5>(4);
  const [open, setOpen] = useState<Paper | null>(null);

  const list = PAPERS.filter(
    (p) => p.kind === kind && (kind === "scholarship" || p.grade === grade),
  );

  const practiceHref = (p: Paper) =>
    p.kind === "scholarship"
      ? "/student/practice?topic=scholarship&level=5"
      : p.kind === "speed"
        ? "/student/practice?topic=times-tables&level=8"
        : "/student/practice?topic=addition&level=5";

  return (
    <StudentShell>
      {/* header band */}
      <div className="bg-gradient-to-r from-lagoon to-teal-500 px-4 sm:px-6 py-4 flex items-center gap-4 flex-wrap">
        <Link
          href="/student"
          className="btn-chunky bg-white/85 text-ink px-4 py-1.5 text-sm shrink-0"
        >
          ‹ Back
        </Link>
        <div className="mr-auto">
          <div className="title-bubble text-2xl font-semibold">
            📜 {t("papers")}
          </div>
          <div className="text-xs font-bold text-white/75">
            Revision made easy — finish a paper, win gems.
          </div>
        </div>
        <nav className="flex gap-1 bg-white/15 rounded-full p-1">
          {KINDS.map((k) => (
            <button
              key={k.id}
              onClick={() => {
                setKind(k.id);
                setOpen(null);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-extrabold transition-colors ${
                kind === k.id
                  ? "bg-white text-lagoon-dark shadow"
                  : "text-white/85 hover:bg-white/10"
              }`}
            >
              {k.icon} <span className="hidden sm:inline">{k.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="px-4 sm:px-6 py-5 max-w-6xl mx-auto flex flex-col gap-5">
        {/* opened paper → instructions */}
        {open ? (
          <div className="card-pop rounded-3xl bg-[#0d3345] ring-1 ring-white/10 p-5 sm:p-8 grid sm:grid-cols-[auto_1fr] gap-6 items-center animate-pop">
            <div className="mx-auto w-40 rounded-md bg-white text-ink p-3 shadow-2xl rotate-[-2deg]">
              <div className="text-[9px] font-bold text-slate-400">
                Numzy · {open.title}
              </div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-1 mt-2">
                  <span className="size-2 rounded-sm bg-orange-200 shrink-0" />
                  <span
                    className="h-1 rounded bg-slate-100"
                    style={{ width: `${90 - ((i * 23) % 45)}%` }}
                  />
                </div>
              ))}
              <div
                className={`mt-3 -mx-3 -mb-3 px-3 py-1.5 text-[10px] font-extrabold rounded-b-md ${KIND_TINT[open.kind]}`}
              >
                G{open.grade} · {open.topic}
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold mb-3">
                Instructions
              </h2>
              <ol className="flex flex-col gap-2 text-sm font-semibold">
                <li className="bg-white/10 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="grid place-items-center size-7 rounded-full bg-rose-400 text-white font-extrabold shrink-0">
                    1
                  </span>
                  {open.questions} questions · submit to see worked solutions.
                </li>
                <li className="bg-white/10 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="grid place-items-center size-7 rounded-full bg-rose-400 text-white font-extrabold shrink-0">
                    2
                  </span>
                  Finish by <b className="text-sunny">{PAPER_WEEKLY.deadline}</b>{" "}
                  to win 💎 {PAPER_WEEKLY.reward} gems — one paper counts each
                  week.
                </li>
                {open.kind === "scholarship" && (
                  <li className="bg-white/10 rounded-2xl px-4 py-3 flex items-center gap-3">
                    <span className="grid place-items-center size-7 rounded-full bg-rose-400 text-white font-extrabold shrink-0">
                      3
                    </span>
                    Exam pattern: 40 marks, same sections as the real Grade 5
                    paper.
                  </li>
                )}
              </ol>
              <div className="flex items-center gap-3 mt-5">
                <Link
                  href={practiceHref(open)}
                  className="btn-chunky bg-brand text-white px-10 py-3 text-lg"
                >
                  {t("start")} ▶
                </Link>
                <button
                  onClick={() => setOpen(null)}
                  className="text-sm font-bold text-white/60 hover:text-white"
                >
                  Choose another
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* grade filter (not for scholarship — that's G5 by nature) */}
            {kind !== "scholarship" && (
              <div className="flex items-center gap-2">
                {([3, 4, 5] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`rounded-full px-4 py-1.5 text-sm font-extrabold transition-colors ${
                      grade === g
                        ? "bg-white text-lagoon-dark shadow"
                        : "bg-white/10 text-white/75 hover:bg-white/20"
                    }`}
                  >
                    Grade {g}
                  </button>
                ))}
                <span className="ml-auto text-xs font-bold text-white/60">
                  💎 Win {PAPER_WEEKLY.reward} gems for one finished paper each
                  week
                </span>
              </div>
            )}

            {list.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {list.map((p) => (
                  <PaperThumb key={p.id} paper={p} onOpen={() => setOpen(p)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-white/60 font-bold">
                Papers for Grade {grade} are being written by our teachers —
                check back soon! 📝
              </div>
            )}
          </>
        )}
      </div>
    </StudentShell>
  );
}
