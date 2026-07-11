/**
 * Client-side question generator + XP engine for the prototype.
 * Mirrors the "question generators config" concept from the CMS (§3.8):
 * a real build would read generator params authored by content admins.
 */

export interface Question {
  prompt: string;
  answer: number;
  kind: "mcq" | "numeric";
  choices?: number[];
  hint: string;
  solution: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Distinct wrong answers near the real one — positions randomised (anti-cheat §3.4). */
function mcqChoices(answer: number): number[] {
  const wrong = new Set<number>();
  while (wrong.size < 3) {
    const delta = rint(1, 10) * (Math.random() < 0.5 ? -1 : 1);
    const w = answer + delta;
    if (w !== answer && w >= 0) wrong.add(w);
  }
  return shuffle([answer, ...wrong]);
}

export function generateQuestion(topicId: string, level: number): Question {
  switch (topicId) {
    case "division": {
      const b = rint(2, Math.max(3, level + 2));
      const q = rint(2, 9);
      const a = b * q;
      return {
        prompt: `${a} ÷ ${b} = ?`,
        answer: q,
        kind: Math.random() < 0.5 ? "mcq" : "numeric",
        choices: mcqChoices(q),
        hint: `How many groups of ${b} fit inside ${a}? Try counting up: ${b}, ${b * 2}, ${b * 3}…`,
        solution: [
          `We need ${a} ÷ ${b}.`,
          `Think of the times table: ${b} × ${q} = ${a}.`,
          `So ${a} ÷ ${b} = ${q}.`,
        ],
      };
    }
    case "addition": {
      const x = rint(10 * level, 20 * level + 30);
      const y = rint(5, 10 * level + 20);
      return {
        prompt: `${x} + ${y} = ?`,
        answer: x + y,
        kind: "numeric",
        hint: `Add the ones first, then the tens.`,
        solution: [
          `Line up the numbers: ${x} + ${y}.`,
          `Ones: ${x % 10} + ${y % 10} = ${(x % 10) + (y % 10)}.`,
          `Then add the tens. Total: ${x + y}.`,
        ],
      };
    }
    case "scholarship": {
      // exam-style mixed word problems (local context §3.10)
      const price = rint(4, 12) * 10;
      const qty = rint(3, 6);
      const total = price * qty;
      return {
        prompt: `A king coconut costs Rs. ${price}. Amma buys ${qty} for the family. How many rupees does she pay?`,
        answer: total,
        kind: "mcq",
        choices: mcqChoices(total),
        hint: `This is "${qty} groups of ${price}" — multiply.`,
        solution: [
          `${qty} coconuts at Rs. ${price} each.`,
          `${price} × ${qty} = ${total}.`,
          `Amma pays Rs. ${total}.`,
        ],
      };
    }
    case "times-tables":
    default: {
      // level N focuses on the N-times table, mixing in review facts
      const table = Math.min(Math.max(level, 2), 12);
      const a = Math.random() < 0.7 ? table : rint(2, Math.min(table + 1, 12));
      const b = rint(2, 12);
      const ans = a * b;
      return {
        prompt: `${a} × ${b} = ?`,
        answer: ans,
        kind: Math.random() < 0.5 ? "mcq" : "numeric",
        choices: mcqChoices(ans),
        hint:
          b > 1
            ? `${a} × ${b} is ${a} × ${b - 1} plus one more ${a}. (${a} × ${b - 1} = ${a * (b - 1)})`
            : `Anything × 1 is itself.`,
        solution: [
          `Skip-count by ${a}, ${b} times:`,
          Array.from({ length: b }, (_, i) => a * (i + 1)).join(", "),
          `So ${a} × ${b} = ${ans}.`,
        ],
      };
    }
  }
}

/** XP = base × difficulty weight × speed multiplier (§3.3). */
export function xpFor(level: number, seconds: number): number {
  const base = 10;
  const difficulty = 1 + level * 0.25;
  const speed = seconds < 4 ? 2 : seconds < 8 ? 1.5 : 1;
  return Math.round(base * difficulty * speed);
}

export const SESSION_LENGTH = 8;
export const QUESTION_SECONDS = 15;

export interface SessionResult {
  topicId: string;
  topicName: string;
  level: number;
  correct: number;
  total: number;
  xp: number;
  avgSeconds: number;
  perfect: boolean;
}
