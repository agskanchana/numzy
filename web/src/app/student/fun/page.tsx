"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StudentShell from "@/components/StudentShell";
import {
  BUDDY_COSTUMES,
  BUDDY_SCENES,
  BUDDY_NAMES,
  GAMES,
  GAME_RULES,
  STORY_BOOKS,
  WALLET,
  type BuddyCostume,
} from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function FunZonePage() {
  const { t } = useLang();

  const [costumeId, setCostumeId] = useState("explorer");
  const [sceneId, setSceneId] = useState("lagoon");
  const [name, setName] = useState(BUDDY_NAMES[0]);
  const [owned, setOwned] = useState<string[]>(
    BUDDY_COSTUMES.filter((c) => c.cost === 0).map((c) => c.id),
  );
  const [gems, setGems] = useState(WALLET.gems);
  const [cheer, setCheer] = useState(false);

  const costume = BUDDY_COSTUMES.find((c) => c.id === costumeId)!;
  const scene = BUDDY_SCENES.find((s) => s.id === sceneId)!;
  const isOwned = (id: string) => owned.includes(id);
  const lockedCount = BUDDY_COSTUMES.filter((c) => !isOwned(c.id)).length;

  function pick(c: BuddyCostume) {
    if (isOwned(c.id)) {
      setCostumeId(c.id);
      return;
    }
    if (gems < c.cost) return;
    setOwned((o) => [...o, c.id]);
    setGems((g) => g - c.cost);
    setCostumeId(c.id);
    cheerNow();
  }

  function cheerNow() {
    setCheer(true);
    window.setTimeout(() => setCheer(false), 1800);
  }

  function shuffleName() {
    let next = name;
    while (next === name)
      next = BUDDY_NAMES[Math.floor(Math.random() * BUDDY_NAMES.length)];
    setName(next);
  }

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
            You earned it! Dress up your elephant, play, read — then back to the
            quest.
          </div>
        </div>
        <span className="bg-white/20 rounded-full px-4 py-1.5 text-sm font-extrabold">
          ⏳ {GAME_RULES.minutesLeft} min left today
        </span>
      </div>

      <div className="px-4 sm:px-6 py-5 max-w-6xl mx-auto flex flex-col gap-8">
        {/* ---------------- Trunk Club (pet dress-up) ---------------- */}
        <section id="buddy">
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <h2 className="title-bubble text-2xl font-semibold">
              🐘 {t("trunkClub")}
            </h2>
            <span className="text-xs font-bold text-white/65">
              Your very own Numzy — dress him up & pick his world
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-4">
            {/* STAGE */}
            <div
              className={`card-pop relative overflow-hidden rounded-3xl ${scene.className} min-h-[23rem] sm:min-h-[26rem] flex flex-col`}
            >
              {/* floating scene decor */}
              <span className="absolute top-4 left-4 text-3xl sm:text-4xl animate-float select-none">
                {scene.decor[1]}
              </span>
              <span className="absolute top-5 right-5 text-2xl sm:text-3xl animate-float select-none [animation-delay:-1.2s]">
                {scene.decor[2]}
              </span>
              <span className="absolute bottom-24 left-6 text-2xl sm:text-3xl animate-float select-none [animation-delay:-0.6s]">
                {scene.decor[3]}
              </span>
              <span className="absolute bottom-28 right-8 text-3xl sm:text-4xl animate-float select-none [animation-delay:-1.8s]">
                {scene.decor[0]}
              </span>

              {/* name ribbon */}
              <div className="relative z-10 pt-5 text-center">
                <span className="inline-flex items-center gap-1.5 bg-white/95 text-ink rounded-full px-4 py-1.5 text-sm font-extrabold shadow-lg">
                  <span className="text-brand">🐘</span> {name}
                </span>
              </div>

              {/* cheer speech bubble */}
              {cheer && (
                <div className="absolute top-16 right-5 sm:right-8 z-20 animate-pop bg-white text-ink rounded-2xl rounded-br-sm px-3 py-2 text-sm font-bold shadow-xl">
                  I love it! 💛
                </div>
              )}

              {/* pet on a soft floor */}
              <div className="relative flex-1 min-h-0 mt-1">
                <div className="absolute left-1/2 -translate-x-1/2 bottom-6 h-6 w-40 sm:w-52 bg-black/25 blur-md rounded-[100%]" />
                <Image
                  key={costume.img}
                  src={costume.img}
                  alt={`${name} the elephant wearing ${costume.name}`}
                  fill
                  priority
                  sizes="(min-width:1024px) 460px, 90vw"
                  className="object-contain object-bottom pb-6 animate-pop drop-shadow-[0_10px_14px_rgba(0,0,0,0.3)]"
                />
              </div>
            </div>

            {/* WARDROBE */}
            <div className="card-pop rounded-3xl bg-white text-ink p-4 sm:p-5 flex flex-col gap-4">
              {/* name + gems */}
              <div className="flex items-end gap-2">
                <label className="flex-1">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-400 mb-1">
                    Pet name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, 14))}
                    className="w-full rounded-xl border-2 border-slate-200 focus:border-brand outline-none px-3 py-2 text-base font-bold bg-slate-50"
                  />
                </label>
                <button
                  onClick={shuffleName}
                  title="Surprise name"
                  className="btn-chunky bg-slate-100 text-ink px-3 py-2.5 text-lg"
                >
                  🎲
                </button>
                <span className="btn-chunky bg-sunny text-amber-900 px-3.5 py-2.5 text-sm shrink-0">
                  💎 {gems}
                </span>
              </div>

              {/* wardrobe */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-display font-semibold text-lg">
                    👗 Wardrobe
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    {lockedCount
                      ? `${lockedCount} to unlock`
                      : "all unlocked ✓"}
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {BUDDY_COSTUMES.map((c) => {
                    const selected = c.id === costumeId;
                    const locked = !isOwned(c.id);
                    const affordable = gems >= c.cost;
                    return (
                      <button
                        key={c.id}
                        onClick={() => pick(c)}
                        disabled={locked && !affordable}
                        className={`relative rounded-2xl p-1.5 border-2 text-center transition disabled:opacity-50 disabled:cursor-not-allowed ${
                          selected
                            ? "border-brand ring-2 ring-brand/30 bg-orange-50"
                            : "border-slate-200 hover:border-brand/50 bg-white"
                        }`}
                      >
                        <div className="relative aspect-square rounded-xl bg-gradient-to-b from-slate-50 to-slate-200/70 overflow-hidden">
                          <Image
                            src={c.img}
                            alt={c.name}
                            fill
                            sizes="120px"
                            className={`object-contain p-0.5 ${
                              locked ? "opacity-45 grayscale" : ""
                            }`}
                          />
                          {locked && (
                            <span className="absolute inset-0 grid place-items-center text-xl drop-shadow">
                              🔒
                            </span>
                          )}
                          {selected && (
                            <span className="absolute top-1 right-1 grid place-items-center size-5 rounded-full bg-brand text-white text-xs font-black shadow">
                              ✓
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] font-bold mt-1 leading-tight truncate">
                          {c.name}
                        </div>
                        {locked && (
                          <span className="absolute -top-1.5 -left-1.5 bg-sunny text-amber-900 text-[10px] font-extrabold rounded-full px-1.5 py-0.5 shadow">
                            💎{c.cost}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* scenes */}
              <div>
                <span className="font-display font-semibold text-lg block mb-2">
                  🌈 Scene
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {BUDDY_SCENES.map((s) => {
                    const active = s.id === sceneId;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSceneId(s.id)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold border-2 transition ${
                          active
                            ? "border-brand bg-orange-50 text-brand-dark"
                            : "border-slate-200 hover:border-brand/40 text-slate-600"
                        }`}
                      >
                        <span className="text-base">{s.decor[0]}</span>
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={cheerNow}
                className="btn-chunky bg-brand text-white px-6 py-2.5 text-sm mt-auto"
              >
                Save {name} 💛
              </button>
            </div>
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
              💎 {gems}
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
