"use client";

import Link from "next/link";
import StudentShell from "@/components/StudentShell";
import MascotBar from "@/components/MascotBar";
import { TOPICS, STRAND_ORDER } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function SubjectsPage() {
  const { t } = useLang();

  return (
    <StudentShell>
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-4">
        <MascotBar>
          This is your <b>{t("subjects")}</b> — every topic in the Sri Lankan
          Grade 1–5 syllabus. Green means mastered, locked ones open when
          you&apos;re ready!
        </MascotBar>

        {STRAND_ORDER.map((strand) => {
          const topics = TOPICS.filter((tp) => tp.strand === strand);
          if (!topics.length) return null;
          return (
            <section key={strand}>
              <h2 className="font-display text-xl font-semibold mb-2 flex items-center gap-2">
                {strand}
                <span className="text-xs font-body font-bold bg-ink/10 rounded-full px-2 py-0.5">
                  NIE strand
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {topics.map((topic) => {
                  const mastered = topic.mastery >= 90;
                  const card = (
                    <div
                      className={`rounded-2xl p-4 shadow transition-all h-full ${
                        topic.locked
                          ? "bg-slate-100 opacity-70"
                          : "bg-white hover:shadow-lg hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{topic.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-semibold flex items-center gap-2">
                            {topic.name}
                            {mastered && <span title="Mastered">🌟</span>}
                            {topic.locked && <span title="Locked">🔒</span>}
                            {topic.reviewDue && (
                              <span
                                title="Review due"
                                className="text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 font-body font-bold"
                              >
                                🔁 review
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <span className="text-[11px] font-bold bg-lagoon/10 text-lagoon-dark rounded-full px-2 py-0.5">
                              Grade {topic.grade}
                            </span>
                            <span className="text-[11px] font-bold bg-slate-100 text-slate-600 rounded-full px-2 py-0.5">
                              {topic.locked
                                ? topic.unlockHint
                                : `Level ${topic.currentLevel} / ${topic.levels}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* mastery bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-[11px] font-bold opacity-60 mb-1">
                          <span>Mastery</span>
                          <span>{topic.mastery}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              mastered
                                ? "bg-green-500"
                                : topic.mastery >= 40
                                  ? "bg-lagoon"
                                  : "bg-brand"
                            }`}
                            style={{ width: `${topic.mastery}%` }}
                          />
                        </div>
                        {/* level pills */}
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {Array.from({ length: topic.levels }, (_, i) => (
                            <span
                              key={i}
                              className={`size-2.5 rounded-full ${
                                i < topic.currentLevel
                                  ? "bg-lagoon"
                                  : "bg-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );

                  return topic.locked ? (
                    <div key={topic.id}>{card}</div>
                  ) : (
                    <Link
                      key={topic.id}
                      href={`/student/practice?topic=${topic.id}&level=${Math.max(1, topic.currentLevel)}`}
                    >
                      {card}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </StudentShell>
  );
}
