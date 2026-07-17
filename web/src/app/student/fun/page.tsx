"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StudentShell from "@/components/StudentShell";
import { BUDDY, GAMES, GAME_RULES, STORY_BOOKS, WALLET, STUDENT } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function FunZonePage() {
  const { t } = useLang();
  const [color, setColor] = useState(BUDDY.colors[0]);
  const [accessory, setAccessory] = useState(BUDDY.accessories[0]);
  const [adjective, setAdjective] = useState(BUDDY.adjectives[0]);
  const [saved, setSaved] = useState(false);

  return (
    <StudentShell>
      {/* header band */}
      <div className="bg-gradient-to-r from-cyan-500 to-sky-500 px-4 sm:px-6 py-4 flex items-center gap-4 flex-wrap">
        <Link
          href="/student"
          className="btn-chunky bg-white/85 text-ink px-4 py-1.5 text-sm shrink-0"
        >
          ‹ Back
        </Link>
        <div className="mr-auto">
          <div className="title-bubble text-2xl font-semibold">
            🎪 {t("funZone")}
          </div>
          <div className="text-xs font-bold text-white/80">
            You earned it! Spend gems, play, read — then back to the quest.
          </div>
        </div>
        <span className="bg-white/20 rounded-full px-4 py-1.5 text-sm font-extrabold">
          ⏳ {GAME_RULES.minutesLeft} min left today
        </span>
      </div>

      <div className="px-4 sm:px-6 py-5 max-w-6xl mx-auto flex flex-col gap-8">
        {/* ---------------- My Buddy ---------------- */}
        <section id="buddy" className="card-pop relative overflow-hidden rounded-3xl">
          <Image
            src="/images/buddies.jpg"
            alt=""
            fill
            sizes="(min-width:1280px) 1100px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/85 via-amber-400/40 to-transparent" />
          <div className="relative p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 min-h-44">
            {/* live preview */}
            <div className="relative shrink-0">
              <span
                className="grid place-items-center size-24 rounded-full ring-4 ring-white shadow-xl text-6xl"
                style={{ background: color }}
              >
                🐘
              </span>
              <span className="absolute -top-1 -right-1 text-3xl drop-shadow">
                {accessory.emoji}
              </span>
            </div>
            <div className="text-amber-950">
              <div className="title-bubble text-2xl font-semibold text-white">
                {t("myBuddy")}
              </div>
              <div className="font-display font-semibold text-lg">
                “{adjective} {STUDENT.name}”
              </div>
              <div className="text-xs font-bold opacity-80 max-w-sm mt-1">
                Dress up your buddy elephant! New accessories unlock as your
                streak grows.
              </div>
            </div>
          </div>

          {/* customiser strip */}
          <div className="relative bg-white/95 text-ink px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-1.5">
              {BUDDY.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setColor(c);
                    setSaved(false);
                  }}
                  aria-label={`Colour ${c}`}
                  className={`size-7 rounded-full transition-transform hover:scale-110 ${
                    color === c ? "ring-4 ring-brand/60 scale-110" : "ring-2 ring-black/10"
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {BUDDY.accessories.map((a) => (
                <button
                  key={a.id}
                  title={a.name}
                  onClick={() => {
                    setAccessory(a);
                    setSaved(false);
                  }}
                  className={`grid place-items-center size-9 rounded-xl text-xl transition-all ${
                    accessory.id === a.id
                      ? "bg-orange-100 ring-2 ring-brand scale-110"
                      : "bg-slate-100 hover:bg-orange-50"
                  }`}
                >
                  {a.emoji}
                </button>
              ))}
            </div>
            <select
              value={adjective}
              onChange={(e) => {
                setAdjective(e.target.value);
                setSaved(false);
              }}
              className="rounded-xl border-2 border-slate-200 px-3 py-1.5 text-sm font-bold bg-white"
            >
              {BUDDY.adjectives.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <button
              onClick={() => setSaved(true)}
              className={`btn-chunky px-6 py-2 text-sm ml-auto ${
                saved ? "bg-green-500 text-white" : "bg-brand text-white"
              }`}
            >
              {saved ? "✓ Saved!" : "Save my buddy"}
            </button>
          </div>
        </section>

        {/* ---------------- Brain Games ---------------- */}
        <section id="games">
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <h2 className="title-bubble text-2xl font-semibold">
              🕹️ {t("brainGames")}
            </h2>
            <span className="text-xs font-bold text-white/65">
              Open {GAME_RULES.openHours} · max {GAME_RULES.dailyMinutes} min a
              day · 💎 1 gem unlocks a game for the day
            </span>
            <span className="ml-auto bg-white/10 rounded-full px-3 py-1 text-sm font-extrabold">
              💎 {WALLET.gems}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {GAMES.map((g) => (
              <div
                key={g.id}
                className="card-pop rounded-3xl bg-white text-ink overflow-hidden flex flex-col"
              >
                <div
                  className={`relative grid place-items-center h-28 bg-gradient-to-br ${g.tint}`}
                >
                  <span className="text-5xl drop-shadow">{g.icon}</span>
                  <span className="absolute top-2 right-2 text-[10px] font-extrabold bg-white/85 rounded-full px-2 py-0.5">
                    {g.cat}
                  </span>
                </div>
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <div className="font-display font-semibold leading-tight">
                    {g.name}
                  </div>
                  <button className="btn-chunky bg-sky-600 text-white text-xs px-3 py-2 mt-auto">
                    Unlock & Play · 💎 {g.cost}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] font-bold text-white/50 mt-2">
            Games pause automatically when your daily minutes run out — fair
            play for growing brains. 🧠
          </p>
        </section>

        {/* ---------------- Story Trail banner ---------------- */}
        <section id="story">
          <Link
            href="/student/story"
            className="card-pop relative overflow-hidden rounded-3xl flex group"
          >
            <div className="relative w-full aspect-[16/5] min-h-36">
              <Image
                src="/images/story.jpg"
                alt=""
                fill
                sizes="(min-width:1280px) 1100px, 100vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-900/35 to-transparent" />
              <div className="absolute inset-y-0 left-0 p-5 sm:p-7 flex flex-col justify-center max-w-md">
                <div className="title-bubble text-2xl font-semibold">
                  📖 {t("storyTrail")}
                </div>
                <p className="text-xs sm:text-sm font-bold text-white/80 mt-1">
                  {STORY_BOOKS.length} storybooks full of hidden maths — read,
                  solve, unlock the next chapter.
                </p>
                <span className="btn-chunky bg-sunny text-amber-900 px-5 py-2 text-sm mt-3 self-start">
                  To the bookshelf ▶
                </span>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </StudentShell>
  );
}
