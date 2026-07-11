"use client";

import Image from "next/image";
import Link from "next/link";
import StudentShell from "@/components/StudentShell";
import { useLang } from "@/lib/i18n";

const SCHEDULED = [
  {
    id: "r1",
    name: "Class race · Grade 4-B",
    when: "Today 5:00 pm",
    topic: "Times Tables mix",
    by: "Ms. Fernando",
    joinable: true,
  },
  {
    id: "r2",
    name: "Friends race · Senuli + 3",
    when: "Tomorrow 10:00 am",
    topic: "Division L3",
    by: "You",
    joinable: false,
  },
  {
    id: "r3",
    name: "School cup heat 1",
    when: "Saturday 9:00 am",
    topic: "Mixed Grade 4",
    by: "Ananda Primary",
    joinable: false,
  },
];

export default function ArenaLobby() {
  const { t } = useLang();

  return (
    <StudentShell>
      <div className="mx-auto max-w-4xl px-4 py-4 flex flex-col gap-4">
        {/* hero */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/images/arena.jpg"
            alt="Numzy arena castle"
            width={1376}
            height={768}
            priority
            className="w-full h-48 sm:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-4">
            <div className="text-white">
              <h1 className="font-display text-3xl font-semibold drop-shadow">
                {t("arena")} 🏁
              </h1>
              <p className="text-sm font-semibold opacity-90 max-w-md">
                Everyone races the <b>same questions</b> — fastest fingers win.
                Fair and square!
              </p>
            </div>
            <Link
              href="/student/arena/race"
              className="btn-chunky bg-sunny text-ink px-6 py-3 shrink-0 animate-pulse-soft"
            >
              Quick race ▶
            </Link>
          </div>
        </div>

        {/* scheduled races */}
        <div className="rounded-3xl bg-white shadow-xl p-5">
          <h2 className="font-display text-xl font-semibold mb-3">
            Scheduled races
          </h2>
          <div className="flex flex-col gap-3">
            {SCHEDULED.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 p-3"
              >
                <span className="text-3xl">🏰</span>
                <div className="flex-1">
                  <div className="font-display font-semibold text-sm">
                    {r.name}
                  </div>
                  <div className="text-xs opacity-60 font-semibold">
                    {r.when} · {r.topic} · set by {r.by}
                  </div>
                </div>
                {r.joinable ? (
                  <Link
                    href="/student/arena/race"
                    className="btn-chunky bg-brand text-white px-5 py-2 text-sm"
                  >
                    Join now
                  </Link>
                ) : (
                  <button className="btn-chunky bg-white border-2 border-slate-200 px-5 py-2 text-sm">
                    Remind me 🔔
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-center opacity-60 font-semibold">
          🛡️ Only classmates and approved friends can race you. Safe display
          names are always used.
        </p>
      </div>
    </StudentShell>
  );
}
