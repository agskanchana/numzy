"use client";

import Image from "next/image";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StudentShell from "@/components/StudentShell";
import { TOPICS } from "@/lib/data";
import {
  generateQuestion,
  xpFor,
  QUESTION_SECONDS,
  SESSION_LENGTH,
  type Question,
  type SessionResult,
} from "@/lib/quiz";
import { useLang } from "@/lib/i18n";

type Phase = "lesson" | "quiz";
type Feedback = "idle" | "correct" | "wrong" | "reveal";

function PracticeSession() {
  const router = useRouter();
  const params = useSearchParams();
  const { t, lang } = useLang();

  const topicId = params.get("topic") ?? "times-tables";
  const level = Number(params.get("level") ?? "7");
  const isReview = params.get("review") === "1";
  const topic =
    TOPICS.find((tp) => tp.id === topicId) ??
    ({ name: "Scholarship set", icon: "🏔️", grade: 5 } as (typeof TOPICS)[0]);

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [phase, setPhase] = useState<Phase>("lesson");
  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [wrongCount, setWrongCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [entry, setEntry] = useState("");
  const [xp, setXp] = useState(0);
  const [lastGain, setLastGain] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const timesRef = useRef<number[]>([]);
  const startRef = useRef<number>(0);

  // generate after mount (random content would break SSR hydration)
  useEffect(() => {
    setQuestions(
      Array.from({ length: SESSION_LENGTH }, () =>
        generateQuestion(topicId, level),
      ),
    );
  }, [topicId, level]);

  const q = questions?.[idx];

  // per-question countdown
  useEffect(() => {
    if (phase !== "quiz" || feedback === "reveal" || feedback === "correct")
      return;
    startRef.current = Date.now();
    setTimeLeft(QUESTION_SECONDS);
    const iv = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      const left = Math.max(0, QUESTION_SECONDS - elapsed);
      setTimeLeft(left);
      if (left <= 0) {
        clearInterval(iv);
        setFeedback("reveal"); // time's up → teach, don't punish
        setShowHint(false);
      }
    }, 100);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, idx, feedback === "reveal" || feedback === "correct"]);

  const speak = useCallback(() => {
    if (!q || typeof window === "undefined" || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(
      q.prompt.replace("×", " times ").replace("÷", " divided by "),
    );
    u.lang = lang === "si" ? "si-LK" : lang === "ta" ? "ta-IN" : "en-US";
    window.speechSynthesis.speak(u);
  }, [q, lang]);

  const finish = useCallback(
    (finalCorrect: number, finalXp: number) => {
      const times = timesRef.current;
      const result: SessionResult = {
        topicId,
        topicName: topic.name,
        level,
        correct: finalCorrect,
        total: SESSION_LENGTH,
        xp: finalXp,
        avgSeconds: times.length
          ? Math.round((times.reduce((a, b) => a + b, 0) / times.length) * 10) /
            10
          : 0,
        perfect: finalCorrect === SESSION_LENGTH,
      };
      sessionStorage.setItem("numzy-session", JSON.stringify(result));
      router.push("/student/results");
    },
    [router, topicId, topic.name, level],
  );

  const nextQuestion = useCallback(
    (finalCorrect: number, finalXp: number) => {
      if (idx + 1 >= SESSION_LENGTH) {
        finish(finalCorrect, finalXp);
        return;
      }
      setIdx((i) => i + 1);
      setFeedback("idle");
      setWrongCount(0);
      setShowHint(false);
      setEntry("");
      setLastGain(null);
    },
    [idx, finish],
  );

  const submit = useCallback(
    (value: number) => {
      if (!q || feedback === "correct" || feedback === "reveal") return;
      const seconds = (Date.now() - startRef.current) / 1000;
      if (value === q.answer) {
        // impossible-speed sanity check (anti-cheat §3.4): no XP under 0.4s
        const gain = seconds < 0.4 ? 0 : xpFor(level, seconds);
        timesRef.current.push(seconds);
        const newXp = xp + gain;
        const newCorrect = correctCount + 1;
        setXp(newXp);
        setLastGain(gain);
        setCorrectCount(newCorrect);
        setFeedback("correct");
        setTimeout(() => nextQuestion(newCorrect, newXp), 1100);
      } else {
        const wc = wrongCount + 1;
        setWrongCount(wc);
        if (wc === 1) {
          setFeedback("wrong");
          setShowHint(true); // smart hint on first miss (§3.2)
          setTimeout(() => setFeedback("idle"), 500);
        } else {
          setFeedback("reveal"); // worked solution on second miss
        }
        setEntry("");
      }
    },
    [q, feedback, level, xp, correctCount, wrongCount, nextQuestion],
  );

  if (!questions || !q) {
    return (
      <div className="min-h-[60vh] grid place-items-center font-display text-xl opacity-60">
        Loading questions…
      </div>
    );
  }

  /* ---------------- mini-lesson intro (§3.2) ---------------- */
  if (phase === "lesson") {
    const sample = questions[0];
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 animate-rise">
        <div className="rounded-3xl bg-white shadow-xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{topic.icon}</span>
            <div>
              <h1 className="font-display text-2xl font-semibold">
                {topic.name} · Level {level}
              </h1>
              <div className="flex gap-2 mt-1">
                <span className="text-xs font-bold bg-lagoon/10 text-lagoon-dark rounded-full px-2 py-0.5">
                  Grade {topic.grade} syllabus ✓
                </span>
                {isReview && (
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 rounded-full px-2 py-0.5">
                    🔁 Review — keeping it fresh
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4 mb-5">
            <div className="font-display font-semibold mb-2">
              📖 Quick look before we start
            </div>
            <p className="text-sm mb-2">
              Here&apos;s the trick for this level — worked example:
            </p>
            <div className="bg-white rounded-xl p-3 text-sm font-semibold space-y-1">
              {sample.solution.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm opacity-70">
              {SESSION_LENGTH} questions · ~5 {t("minutes")}
            </div>
            <button
              onClick={() => setPhase("quiz")}
              className="btn-chunky bg-brand text-white px-8 py-3 text-lg"
            >
              {t("play")} ▶
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- quiz ---------------- */
  const timerPct = (timeLeft / QUESTION_SECONDS) * 100;

  return (
    <div className="relative min-h-[calc(100vh-56px)]">
      <Image
        src="/images/practice-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-70"
        priority
      />
      <div className="relative mx-auto max-w-2xl px-4 py-6">
        {/* progress + XP */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <span
                key={i}
                className={`size-3 rounded-full ${
                  i < idx
                    ? "bg-lagoon"
                    : i === idx
                      ? "bg-brand ring-2 ring-brand/40"
                      : "bg-white/80"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold bg-white/90 rounded-full px-3 py-1 shadow">
            {t("question")} {idx + 1} / {SESSION_LENGTH}
          </span>
          <span className="ml-auto text-sm font-extrabold bg-sunny/95 rounded-full px-3 py-1 shadow">
            ⭐ +{xp} XP
          </span>
        </div>

        <div
          className={`rounded-3xl bg-white/95 shadow-xl p-6 sm:p-8 ${feedback === "wrong" ? "animate-shake" : ""}`}
        >
          {/* timer bar (hideable in settings — accessibility §3.10) */}
          <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden mb-6">
            <div
              className={`h-full rounded-full transition-[width] duration-100 ${
                timerPct > 40
                  ? "bg-lagoon"
                  : timerPct > 15
                    ? "bg-sunny"
                    : "bg-red-400"
              }`}
              style={{ width: `${timerPct}%` }}
            />
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="font-display text-4xl sm:text-5xl font-semibold text-center">
              {q.prompt}
            </div>
            <button
              onClick={speak}
              title="Read aloud"
              className="text-2xl hover:scale-110 transition-transform"
            >
              🔊
            </button>
          </div>

          {/* feedback strip */}
          {feedback === "correct" && (
            <div className="text-center mb-4 animate-pop">
              <span className="inline-block bg-green-100 text-green-800 font-display font-semibold text-xl rounded-full px-6 py-2">
                ✅ {t("correct")} {lastGain ? `+${lastGain} XP` : ""}
              </span>
            </div>
          )}
          {showHint && feedback !== "reveal" && feedback !== "correct" && (
            <div className="mb-4 rounded-2xl bg-amber-50 border border-amber-300 p-3 text-sm font-semibold animate-pop">
              💡 {t("hint")}: {q.hint}
            </div>
          )}
          {feedback === "reveal" && (
            <div className="mb-4 rounded-2xl bg-sky-50 border border-sky-300 p-4 animate-pop">
              <div className="font-display font-semibold mb-1">
                📖 Here&apos;s how it works
              </div>
              <div className="text-sm font-semibold space-y-1">
                {q.solution.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <button
                onClick={() => nextQuestion(correctCount, xp)}
                className="btn-chunky bg-brand text-white px-6 py-2 mt-3"
              >
                {t("next")} ▶
              </button>
            </div>
          )}

          {/* answers */}
          {feedback !== "reveal" &&
            (q.kind === "mcq" && q.choices ? (
              <div className="grid grid-cols-2 gap-3">
                {q.choices.map((c) => (
                  <button
                    key={c}
                    onClick={() => submit(c)}
                    disabled={feedback === "correct"}
                    className="btn-chunky bg-lagoon text-white text-2xl py-4 disabled:opacity-60"
                  >
                    {c}
                  </button>
                ))}
              </div>
            ) : (
              <div className="max-w-xs mx-auto">
                <div className="h-14 rounded-2xl border-4 border-lagoon/40 bg-slate-50 grid place-items-center font-display text-3xl mb-3 tracking-widest">
                  {entry || <span className="opacity-30">?</span>}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <button
                      key={n}
                      onClick={() => setEntry((e) => (e + n).slice(0, 4))}
                      className="btn-chunky bg-white border-2 border-slate-200 text-2xl py-3"
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setEntry((e) => e.slice(0, -1))}
                    className="btn-chunky bg-slate-200 text-xl py-3"
                  >
                    ⌫
                  </button>
                  <button
                    onClick={() => setEntry((e) => (e + "0").slice(0, 4))}
                    className="btn-chunky bg-white border-2 border-slate-200 text-2xl py-3"
                  >
                    0
                  </button>
                  <button
                    onClick={() => entry && submit(Number(entry))}
                    className="btn-chunky bg-brand text-white text-xl py-3"
                  >
                    ✓
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <StudentShell transparent>
      <Suspense fallback={null}>
        <PracticeSession />
      </Suspense>
    </StudentShell>
  );
}
