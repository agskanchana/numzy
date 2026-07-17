"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StudentShell from "@/components/StudentShell";
import {
  STORY_BOOKS,
  type StoryBook,
  type StoryChapter,
} from "@/lib/data";
import { useLang } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Chapter reader                                                      */
/* ------------------------------------------------------------------ */

function ChapterReader({
  book,
  chapter,
  onClose,
}: {
  book: StoryBook;
  chapter: StoryChapter;
  onClose: () => void;
}) {
  const pages = chapter.pages ?? [];
  const [pageIdx, setPageIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const page = pages[pageIdx];
  const solved = !page?.puzzle || picked === page.puzzle.answer;
  const lastPage = pageIdx === pages.length - 1;

  return (
    <div className="px-4 sm:px-6 py-5 max-w-5xl mx-auto animate-rise">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <button
          onClick={onClose}
          className="btn-chunky bg-white/85 text-ink px-4 py-1.5 text-sm"
        >
          ‹ {book.title}
        </button>
        <span className="title-bubble text-lg font-semibold">
          {chapter.name}
        </span>
        <span className="ml-auto text-xs font-extrabold text-white/60">
          Page {pageIdx + 1} of {pages.length}
        </span>
      </div>

      {/* the open book */}
      <div className="card-pop rounded-3xl bg-[#fdf6e3] text-ink overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-96">
          {/* left page: art */}
          <div className="relative min-h-56 md:min-h-0 bg-slate-200">
            <Image
              src={page?.img ?? book.cover}
              alt=""
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/15 to-transparent hidden md:block" />
          </div>

          {/* right page: text + puzzle */}
          <div className="relative p-6 sm:p-8 flex flex-col">
            <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/10 to-transparent hidden md:block" />
            <p className="font-body text-base sm:text-lg font-semibold leading-relaxed">
              {page?.text}
            </p>

            {page?.puzzle && (
              <div
                className={`mt-5 rounded-2xl border-2 p-4 ${
                  picked === null
                    ? "border-amber-300 bg-amber-50"
                    : solved
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-rose-300 bg-rose-50 animate-shake"
                }`}
              >
                <div className="text-[11px] font-extrabold uppercase tracking-wide opacity-50 mb-1">
                  🧩 Story puzzle
                </div>
                <div className="font-display font-semibold mb-3">
                  {page.puzzle.q}
                </div>
                <div className="flex flex-wrap gap-2">
                  {page.puzzle.choices.map((c) => (
                    <button
                      key={c}
                      onClick={() => setPicked(c)}
                      className={`btn-chunky px-5 py-2 text-lg ${
                        picked === c
                          ? c === page.puzzle!.answer
                            ? "bg-emerald-500 text-white"
                            : "bg-rose-400 text-white"
                          : "bg-white border-2 border-slate-200"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {picked !== null && (
                  <div className="text-sm font-bold mt-2 animate-pop">
                    {solved
                      ? "✅ Correct — the story continues!"
                      : "Not quite — try another answer!"}
                  </div>
                )}
              </div>
            )}

            {/* pager */}
            <div className="mt-auto pt-6 flex items-center gap-3">
              <button
                onClick={() => {
                  setPageIdx((i) => Math.max(0, i - 1));
                  setPicked(null);
                }}
                disabled={pageIdx === 0}
                className="btn-chunky bg-white border-2 border-slate-200 px-4 py-2 text-sm disabled:opacity-40"
              >
                ‹ Back
              </button>
              <div className="flex gap-1.5 mx-auto">
                {pages.map((_, i) => (
                  <span
                    key={i}
                    className={`size-2.5 rounded-full ${
                      i === pageIdx ? "bg-brand" : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
              {lastPage ? (
                <button
                  onClick={onClose}
                  disabled={!solved}
                  className="btn-chunky bg-lagoon text-white px-5 py-2 text-sm disabled:opacity-40"
                >
                  Finish chapter 💎 +2
                </button>
              ) : (
                <button
                  onClick={() => {
                    setPageIdx((i) => Math.min(pages.length - 1, i + 1));
                    setPicked(null);
                  }}
                  disabled={!solved}
                  className="btn-chunky bg-brand text-white px-5 py-2 text-sm disabled:opacity-40"
                >
                  Turn the page ›
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {!solved && page?.puzzle && (
        <p className="text-center text-xs font-bold text-white/60 mt-3">
          Solve the puzzle to keep reading — that&apos;s how the story knows
          you&apos;re ready! ✨
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Book view — chapter trail                                           */
/* ------------------------------------------------------------------ */

function BookView({
  book,
  onBack,
  onRead,
}: {
  book: StoryBook;
  onBack: () => void;
  onRead: (ch: StoryChapter) => void;
}) {
  return (
    <div className="px-4 sm:px-6 py-5 max-w-6xl mx-auto animate-rise">
      <button
        onClick={onBack}
        className="btn-chunky bg-white/85 text-ink px-4 py-1.5 text-sm mb-4"
      >
        ‹ All books
      </button>

      {/* book banner */}
      <div className="card-pop relative overflow-hidden rounded-3xl mb-6">
        <div className="relative w-full aspect-[16/6] min-h-44">
          <Image
            src={book.cover}
            alt=""
            fill
            priority
            sizes="(min-width:1280px) 1100px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
          <div className="absolute inset-y-0 left-0 p-5 sm:p-7 flex flex-col justify-center max-w-md">
            <span className="text-[11px] font-extrabold bg-sunny text-amber-900 rounded-full px-2.5 py-0.5 self-start">
              {book.grade}
            </span>
            <div className="title-bubble text-2xl sm:text-3xl font-semibold mt-2">
              {book.title}
            </div>
            <p className="text-xs sm:text-sm font-bold text-white/80 mt-1">
              {book.blurb}
            </p>
          </div>
        </div>
      </div>

      {/* chapter trail */}
      <h2 className="title-bubble text-xl font-semibold mb-3">Chapters</h2>
      <div className="overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
        <div className="flex items-stretch gap-0 min-w-max">
          {book.chapters.map((ch, i) => (
            <div key={ch.id} className="flex items-center">
              <button
                onClick={() => !ch.locked && ch.pages && onRead(ch)}
                disabled={ch.locked || !ch.pages}
                className={`relative w-52 rounded-3xl overflow-hidden text-left transition-transform ${
                  ch.locked
                    ? "opacity-70"
                    : "card-pop hover:-translate-y-1 cursor-pointer"
                }`}
              >
                <div className="relative h-28 bg-slate-700">
                  <Image
                    src={ch.pages?.[0]?.img ?? book.cover}
                    alt=""
                    fill
                    sizes="208px"
                    className={`object-cover ${ch.locked ? "grayscale" : ""}`}
                  />
                  {ch.locked && (
                    <div className="absolute inset-0 grid place-items-center bg-black/45">
                      <span className="grid place-items-center size-10 rounded-xl bg-white/90 text-xl">
                        🔒
                      </span>
                    </div>
                  )}
                  {ch.done && (
                    <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-extrabold rounded-full px-2 py-0.5 shadow">
                      ✓ Read
                    </span>
                  )}
                </div>
                <div className="bg-white text-ink p-3">
                  <div className="text-xs font-extrabold leading-tight">
                    {ch.name}
                  </div>
                  <div className="text-[10px] font-bold opacity-60 mt-0.5">
                    {ch.locked
                      ? "Unlocks next week"
                      : ch.done
                        ? "Read again · puzzles inside"
                        : ch.pages
                          ? `${ch.pages.length} pages · read & solve`
                          : "Coming soon"}
                  </div>
                </div>
              </button>
              {i < book.chapters.length - 1 && (
                <span
                  className={`w-8 h-1.5 shrink-0 rounded-full ${
                    book.chapters[i + 1].locked ? "bg-white/20" : "bg-sunny"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function StoryTrailPage() {
  const { t } = useLang();
  const [bookId, setBookId] = useState<string | null>(null);
  const [chapterId, setChapterId] = useState<string | null>(null);

  const book = STORY_BOOKS.find((b) => b.id === bookId) ?? null;
  const chapter = book?.chapters.find((c) => c.id === chapterId) ?? null;

  return (
    <StudentShell>
      {/* header band */}
      <div className="bg-gradient-to-r from-amber-400 to-sunny text-amber-950 px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link
          href="/student"
          className="btn-chunky bg-white/80 px-4 py-1.5 text-sm shrink-0"
        >
          ‹ Back
        </Link>
        <div>
          <div className="title-bubble text-2xl font-semibold">
            📖 {t("storyTrail")}
          </div>
          <div className="text-xs font-bold opacity-70">
            Maths hidden inside adventures — read, solve, unlock the next
            chapter.
          </div>
        </div>
      </div>

      {book && chapter ? (
        <ChapterReader
          book={book}
          chapter={chapter}
          onClose={() => setChapterId(null)}
        />
      ) : book ? (
        <BookView
          book={book}
          onBack={() => setBookId(null)}
          onRead={(ch) => setChapterId(ch.id)}
        />
      ) : (
        /* bookshelf */
        <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {STORY_BOOKS.map((b) => {
              const readable = b.chapters.filter((c) => !c.locked).length;
              return (
                <button
                  key={b.id}
                  onClick={() => setBookId(b.id)}
                  className="card-pop rounded-3xl overflow-hidden text-left group"
                >
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={b.cover}
                      alt=""
                      fill
                      sizes="(min-width:768px) 33vw, 100vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-sunny text-amber-900 text-[10px] font-extrabold rounded-full px-2.5 py-1 shadow">
                      {b.grade}
                    </span>
                    {b.progress > 0 && (
                      <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-extrabold rounded-full px-2.5 py-1 shadow">
                        📖 {b.progress} read
                      </span>
                    )}
                  </div>
                  <div
                    className={`bg-gradient-to-br ${b.tint} p-4 min-h-32 flex flex-col`}
                  >
                    <div className="font-display text-lg font-semibold leading-tight">
                      {b.title}
                    </div>
                    <p className="text-[11px] font-bold text-white/80 mt-1 line-clamp-2">
                      {b.blurb}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3">
                      <span className="text-[11px] font-extrabold text-white/85">
                        {b.chapters.length} chapters · {readable} open
                      </span>
                      <span className="btn-chunky bg-white/90 text-ink px-4 py-1.5 text-xs">
                        Open book ▶
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-center text-xs font-bold text-white/50 mt-6">
            A new chapter unlocks every week — finish the puzzles inside to
            earn 💎 gems.
          </p>
        </div>
      )}
    </StudentShell>
  );
}
