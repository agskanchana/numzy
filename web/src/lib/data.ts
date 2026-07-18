/**
 * Mock data layer for the Numzy UI prototype.
 * Everything here will later be served by the Node API + Prisma
 * (see docs/numzy-features-v2.md §7).
 */

export type Strand =
  | "Number"
  | "Measurement"
  | "Space & Geometry"
  | "Patterns"
  | "Data Handling";

export interface Topic {
  id: string;
  name: string;
  icon: string;
  strand: Strand;
  grade: number; // Sri Lankan grade 1-5
  levels: number;
  currentLevel: number;
  mastery: number; // 0-100
  locked?: boolean;
  unlockHint?: string;
  reviewDue?: boolean; // spaced-repetition resurfacing
}

export const TOPICS: Topic[] = [
  { id: "counting", name: "Number & Counting", icon: "🔢", strand: "Number", grade: 1, levels: 6, currentLevel: 6, mastery: 100 },
  { id: "addition", name: "Addition", icon: "➕", strand: "Number", grade: 2, levels: 8, currentLevel: 8, mastery: 96 },
  { id: "subtraction", name: "Subtraction", icon: "➖", strand: "Number", grade: 2, levels: 8, currentLevel: 7, mastery: 88, reviewDue: true },
  { id: "times-tables", name: "Times Tables", icon: "✖️", strand: "Number", grade: 3, levels: 12, currentLevel: 7, mastery: 62 },
  { id: "division", name: "Division", icon: "➗", strand: "Number", grade: 3, levels: 8, currentLevel: 3, mastery: 41 },
  { id: "fractions", name: "Fractions", icon: "🍕", strand: "Number", grade: 4, levels: 8, currentLevel: 1, mastery: 12 },
  { id: "decimals", name: "Decimals", icon: "🔟", strand: "Number", grade: 4, levels: 6, currentLevel: 0, mastery: 0, locked: true, unlockHint: "Unlocks after Fractions L4" },
  { id: "percentages", name: "Percentages", icon: "💯", strand: "Number", grade: 5, levels: 6, currentLevel: 0, mastery: 0, locked: true, unlockHint: "Unlocks after Decimals L4" },
  { id: "money", name: "Money (Rupees & cents)", icon: "💰", strand: "Measurement", grade: 2, levels: 6, currentLevel: 4, mastery: 71 },
  { id: "time", name: "Time & Calendar", icon: "🕐", strand: "Measurement", grade: 3, levels: 6, currentLevel: 2, mastery: 35 },
  { id: "length", name: "Length & Weight", icon: "📏", strand: "Measurement", grade: 3, levels: 6, currentLevel: 3, mastery: 52 },
  { id: "shapes", name: "Shapes", icon: "🔷", strand: "Space & Geometry", grade: 2, levels: 5, currentLevel: 5, mastery: 93 },
  { id: "symmetry", name: "Symmetry & Position", icon: "🪞", strand: "Space & Geometry", grade: 4, levels: 5, currentLevel: 1, mastery: 18 },
  { id: "patterns", name: "Number Patterns", icon: "🧩", strand: "Patterns", grade: 3, levels: 6, currentLevel: 4, mastery: 66 },
  { id: "data", name: "Pictographs & Charts", icon: "📊", strand: "Data Handling", grade: 4, levels: 5, currentLevel: 1, mastery: 15 },
];

export const STRAND_ORDER: Strand[] = [
  "Number",
  "Measurement",
  "Space & Geometry",
  "Patterns",
  "Data Handling",
];

/* ------------------------------------------------------------------ */
/* Student                                                             */
/* ------------------------------------------------------------------ */

export const STUDENT = {
  name: "Senuli",
  displayName: "Senuli P.", // safe display name (no full surname)
  grade: 4,
  className: "Grade 4 – B, Ananda Primary",
  xp: 12450,
  rank: "Silver" as const,
  nextRank: "Gold" as const,
  rankProgress: 0.62, // toward next tier
  streak: 6,
  weeklyQuestMinutes: 18,
  weeklyQuestTarget: 30,
  fluency: { topic: "Times Tables", avgSeconds: 4.2, best: 3.1 },
};

/** Spendable currency (earned from quests/assignments, spent in the Fun Zone). */
export const WALLET = {
  gems: 24,
  todayXp: 410,
  dailyGiftReady: true,
};

/* ------------------------------------------------------------------ */
/* Daily Quest (home hero → /student/daily)                            */
/* ------------------------------------------------------------------ */

export interface QuestNode {
  n: number;
  xp: number;
  state: "done" | "current" | "locked";
}

export const DAILY_QUEST = {
  completed: 3,
  total: 10,
  gemReward: 5,
  openHours: "5 am – 9 pm",
  levels: [
    { id: "explorer", name: "Explorer", desc: "Questions at your grade level" },
    { id: "champion", name: "Champion", desc: "Trickier — more XP per stop" },
  ],
  nodes: [
    { n: 1, xp: 10, state: "done" },
    { n: 2, xp: 10, state: "done" },
    { n: 3, xp: 10, state: "done" },
    { n: 4, xp: 15, state: "current" },
    { n: 5, xp: 15, state: "locked" },
    { n: 6, xp: 20, state: "locked" },
    { n: 7, xp: 20, state: "locked" },
    { n: 8, xp: 25, state: "locked" },
    { n: 9, xp: 30, state: "locked" },
    { n: 10, xp: 40, state: "locked" },
  ] as QuestNode[],
};

/* ------------------------------------------------------------------ */
/* Missions (training by topic / thinking skill)                       */
/* ------------------------------------------------------------------ */

export interface MissionCourse {
  id: string;
  name: string;
  desc: string;
  icon: string;
  tint: string; // tailwind gradient classes for the card art
  tag?: string;
  href?: string; // when the course routes somewhere special
}

export const MISSION_COURSES: MissionCourse[] = [
  {
    id: "curriculum",
    name: "School Curriculum (NIE)",
    desc: "Grade 1–5 syllabus, term by term — the everyday practice path.",
    icon: "🏫",
    tint: "from-sky-400 to-blue-600",
    tag: "Grade 4 · Term 2",
  },
  {
    id: "hots",
    name: "Thinking Skills (HOTS)",
    desc: "9 problem-solving heuristics — draw it, act it out, work backwards…",
    icon: "🧠",
    tint: "from-fuchsia-400 to-purple-600",
    tag: "New",
  },
  {
    id: "challenge",
    name: "Challenge Maths",
    desc: "Enrichment puzzles for fast finishers. Spicy ones ahead!",
    icon: "🌶️",
    tint: "from-orange-400 to-red-500",
  },
  {
    id: "scholarship",
    name: "Scholarship Training",
    desc: "Grade 5 exam competencies with readiness tracking.",
    icon: "🏔️",
    tint: "from-teal-400 to-lagoon-dark",
    href: "/student/scholarship",
  },
];

export const HEURISTICS = [
  { id: "draw", name: "Draw a Diagram", icon: "✏️", group: "Using a representation" },
  { id: "list", name: "Make a Systematic List", icon: "📝", group: "Using a representation" },
  { id: "equations", name: "Use Equations", icon: "➗", group: "Using a representation" },
  { id: "act", name: "Act it Out", icon: "🎭", group: "Walking through the process" },
  { id: "backwards", name: "Work Backwards", icon: "⏪", group: "Walking through the process" },
  { id: "guess", name: "Guess and Check", icon: "🎯", group: "Making a guess" },
  { id: "patterns", name: "Look for Patterns", icon: "🧩", group: "Making a guess" },
  { id: "restate", name: "Restate the Problem", icon: "🔁", group: "Changing the problem" },
  { id: "simplify", name: "Simplify the Problem", icon: "🪄", group: "Changing the problem" },
];

export interface Skill {
  id: string;
  name: string;
  band: "Basic" | "Intermediate" | "Challenging";
  difficulty: 1 | 2 | 3 | 4 | 5;
  stars: 0 | 1 | 2 | 3;
  level: number; // practice level it maps to
}

/** Deterministic skill list per topic so the UI is stable between renders. */
export function skillsFor(topicId: string): Skill[] {
  const topic = TOPICS.find((t) => t.id === topicId);
  if (!topic) return [];
  const templates: [Skill["band"], string][] = [
    ["Basic", "warm-up — 1 quantity"],
    ["Basic", "2 quantities, 1 condition"],
    ["Intermediate", "2 quantities, total amount"],
    ["Basic", "number bonds & families"],
    ["Intermediate", "word problems, 2 steps"],
    ["Challenging", "3 quantities, 3 conditions"],
    ["Intermediate", "missing number puzzles"],
    ["Challenging", "mixed review — exam style"],
  ];
  let seed = [...topicId].reduce((s, c) => s + c.charCodeAt(0), 0);
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return templates.slice(0, Math.max(4, topic.levels - 2)).map(([band, t], i) => {
    const unlocked = i < topic.currentLevel;
    return {
      id: `${topicId}-s${i + 1}`,
      name: `${band} · ${topic.name} — ${t}`,
      band,
      difficulty: (band === "Basic" ? 2 : band === "Intermediate" ? 3 : 4) as Skill["difficulty"],
      stars: (unlocked ? (rand() < 0.3 ? 3 : rand() < 0.6 ? 2 : 1) : 0) as Skill["stars"],
      level: Math.min(i + 1, topic.levels),
    };
  });
}

/* ------------------------------------------------------------------ */
/* Model papers (KooQuiz-style revision + Scholarship papers)          */
/* ------------------------------------------------------------------ */

export interface Paper {
  id: string;
  grade: 3 | 4 | 5;
  kind: "revision" | "scholarship" | "speed";
  title: string;
  topic: string;
  questions: number;
  done?: boolean;
  score?: number;
}

export const PAPERS: Paper[] = [
  { id: "r1", grade: 4, kind: "revision", title: "Revision 01", topic: "Numbers to 10 000", questions: 20, done: true, score: 17 },
  { id: "r2", grade: 4, kind: "revision", title: "Revision 02", topic: "Addition & Subtraction", questions: 20, done: true, score: 19 },
  { id: "r3", grade: 4, kind: "revision", title: "Revision 03", topic: "Times Tables & Division", questions: 20 },
  { id: "r4", grade: 4, kind: "revision", title: "Revision 04", topic: "Fractions", questions: 20 },
  { id: "r5", grade: 4, kind: "revision", title: "Revision 05", topic: "Money (Rs. & cents)", questions: 20 },
  { id: "r6", grade: 4, kind: "revision", title: "Revision 06", topic: "Time & Calendar", questions: 20 },
  { id: "r7", grade: 4, kind: "revision", title: "Revision 07", topic: "Length & Weight", questions: 20 },
  { id: "r8", grade: 4, kind: "revision", title: "Revision 08", topic: "Shapes & Symmetry", questions: 20 },
  { id: "s1", grade: 5, kind: "scholarship", title: "Model Paper 1", topic: "Scholarship · full mock", questions: 40 },
  { id: "s2", grade: 5, kind: "scholarship", title: "Model Paper 2", topic: "Scholarship · full mock", questions: 40 },
  { id: "sp1", grade: 4, kind: "speed", title: "Speed Round", topic: "Mixed drill · 5 minutes", questions: 15 },
  { id: "r9", grade: 3, kind: "revision", title: "Revision 01", topic: "Numbers to 1000", questions: 20, done: true, score: 20 },
  { id: "r10", grade: 3, kind: "revision", title: "Revision 02", topic: "Multiplication 2·5·10", questions: 20 },
];

export const PAPER_WEEKLY = {
  deadline: "Sunday",
  reward: 5, // gems
};

/* ------------------------------------------------------------------ */
/* Fun Zone                                                            */
/* ------------------------------------------------------------------ */

export interface BrainGame {
  id: string;
  name: string;
  icon: string;
  cat: "Memory" | "Attention" | "Problem solving" | "Speed";
  cost: number; // gems per day
  tint: string;
}

export const GAMES: BrainGame[] = [
  { id: "battleship", name: "Number Battleship", icon: "🚢", cat: "Problem solving", cost: 1, tint: "from-emerald-400 to-teal-600" },
  { id: "jelly", name: "Jelly Match", icon: "🍬", cat: "Attention", cost: 1, tint: "from-pink-400 to-fuchsia-600" },
  { id: "ninja", name: "Number Ninja", icon: "🥷", cat: "Speed", cost: 1, tint: "from-slate-500 to-slate-800" },
  { id: "sudoku", name: "Sudoku Junior", icon: "🔢", cat: "Problem solving", cost: 1, tint: "from-sky-400 to-blue-600" },
  { id: "memory", name: "Memory Flip", icon: "🃏", cat: "Memory", cost: 1, tint: "from-violet-400 to-purple-600" },
  { id: "blocks", name: "Block Drop", icon: "🧱", cat: "Problem solving", cost: 1, tint: "from-amber-400 to-orange-600" },
  { id: "sums", name: "Speedy Sums", icon: "⚡", cat: "Speed", cost: 1, tint: "from-yellow-300 to-amber-500" },
  { id: "painter", name: "Pattern Painter", icon: "🎨", cat: "Memory", cost: 1, tint: "from-rose-400 to-red-500" },
];

export const GAME_RULES = {
  dailyMinutes: 25,
  minutesLeft: 25,
  openHours: "8 am – 8 pm",
};

/* ------------------------------------------------------------------ */
/* Story Trail — books → chapters → pages                              */
/* ------------------------------------------------------------------ */

export interface StoryPage {
  img?: string;
  text: string;
  puzzle?: { q: string; choices: number[]; answer: number };
}

export interface StoryChapter {
  id: string;
  name: string;
  locked: boolean;
  done: boolean;
  pages?: StoryPage[];
}

export interface StoryBook {
  id: string;
  title: string;
  cover: string;
  grade: string;
  blurb: string;
  tint: string; // gradient classes behind the shelf card
  progress: number; // chapters read
  chapters: StoryChapter[];
}

export const STORY_BOOKS: StoryBook[] = [
  {
    id: "fortress",
    title: "Numzy & the Rock Fortress",
    cover: "/images/story.jpg",
    grade: "Grade 3–4",
    blurb:
      "An old map, a mysterious rock in the clouds, and puzzles guarding every gate. Help Numzy climb to the top!",
    tint: "from-emerald-500 to-teal-700",
    progress: 1,
    chapters: [
      {
        id: "c0",
        name: "Opening — Meet Numzy",
        locked: false,
        done: true,
        pages: [
          {
            img: "/images/story.jpg",
            text: "In the greenest corner of the island lived Numzy — a small elephant with a big scarf and an even bigger love of puzzles. Every morning he counted the mangoes outside his window… all twelve of them.",
          },
          {
            text: "One breezy morning, only 7 mangoes hung on the tree. Numzy blinked. Someone — or something — had taken the rest!",
            puzzle: {
              q: "12 mangoes yesterday, 7 today. How many went missing?",
              choices: [4, 5, 6, 3],
              answer: 5,
            },
          },
          {
            text: "Five missing mangoes… and one muddy trail of little footprints leading into the jungle. Numzy tightened his scarf. An adventure had begun. 🐾",
          },
        ],
      },
      {
        id: "c1",
        name: "Prologue — The Map in the Rain",
        locked: false,
        done: false,
        pages: [
          {
            img: "/images/story-rain.jpg",
            text: "The rain came down like a drum song. Under a banana-leaf umbrella, Numzy followed the footprints until his trunk bumped something rolled up in the mud — an old map, glowing faintly at the edges.",
          },
          {
            text: "The map showed a flat-topped rock with 4 gates. Beside each gate someone had drawn dots: 2 dots, then 4, then 8… The last gate's dots were smudged away by the rain.",
            puzzle: {
              q: "2, 4, 8, … how many dots at the last gate?",
              choices: [10, 12, 16, 14],
              answer: 16,
            },
          },
          {
            text: "“Sixteen!” trumpeted Numzy. The map shivered, and a golden path lit up between the trees — pointing straight at the Rock Fortress. ⛰️",
          },
        ],
      },
      { id: "c2", name: "Chapter 1 — River of Hundreds", locked: true, done: false },
      { id: "c3", name: "Chapter 2 — The Fraction Forest", locked: true, done: false },
      { id: "c4", name: "Chapter 3 — Stairway of Patterns", locked: true, done: false },
    ],
  },
  {
    id: "market",
    title: "The Market Day Mystery",
    cover: "/images/story-market.jpg",
    grade: "Grade 1–2",
    blurb:
      "Coins, scales and sneaky bargains at the Sunday pola. Can Numzy and Meeya the mouse balance the books?",
    tint: "from-amber-500 to-orange-600",
    progress: 0,
    chapters: [
      {
        id: "m0",
        name: "Opening — The Sunday Pola",
        locked: false,
        done: false,
        pages: [
          {
            img: "/images/story-market.jpg",
            text: "On Sunday mornings the village pola smells of ripe mangoes and fresh king coconut. Numzy had exactly Rs. 50 in his little cloth purse, and a very important shopping list from Amma.",
          },
          {
            text: "Bananas cost Rs. 30 a bunch. Meeya the mouse squeaked from her scales: “Special price for elephants!”",
            puzzle: {
              q: "Numzy has Rs. 50 and spends Rs. 30. How much is left?",
              choices: [10, 20, 30, 25],
              answer: 20,
            },
          },
          {
            text: "Twenty rupees left — just enough for the surprise Amma wanted. But wait… why was Meeya's scale tipping all by itself? 🐭",
          },
        ],
      },
      { id: "m1", name: "Chapter 1 — The Tipping Scales", locked: true, done: false },
      { id: "m2", name: "Chapter 2 — The Missing Coin", locked: true, done: false },
    ],
  },
  {
    id: "islands",
    title: "Journey to the Floating Islands",
    cover: "/images/story-islands.jpg",
    grade: "Grade 4–5",
    blurb:
      "A balloon ride above the clouds where islands drift by the rules of patterns. The trickiest puzzles live up here!",
    tint: "from-sky-500 to-indigo-600",
    progress: 0,
    chapters: [
      {
        id: "i0",
        name: "Opening — Up, Up and Away",
        locked: false,
        done: false,
        pages: [
          {
            img: "/images/story-islands.jpg",
            text: "The balloon rose past the last kite in the sky. Below, the island shrank to the size of a biscuit. Above, islands floated in a slow parade — each one drifting past every 15 minutes, exactly.",
          },
          {
            text: "The castle island floated by at 9:00. The waterfall island at 9:15. The palm island at 9:30…",
            puzzle: {
              q: "Every 15 minutes an island passes. After 9:30, when is the next one?",
              choices: [40, 45, 50, 60],
              answer: 45,
            },
          },
          {
            text: "9:45 — right on time, a brand-new island sailed into view… and on it stood a signpost with Numzy's own name. ✨",
          },
        ],
      },
      { id: "i1", name: "Chapter 1 — The Pattern Winds", locked: true, done: false },
      { id: "i2", name: "Chapter 2 — The Cloud Staircase", locked: true, done: false },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Lessons (KooClass-style guided lessons)                             */
/* ------------------------------------------------------------------ */

export interface LessonStep {
  kind: "story" | "watch" | "do" | "check";
  name: string;
  qns?: number;
  done: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  ageTag: string;
  topicId: string; // practice generator to use for "Try it"
  level: number;
  steps: LessonStep[];
  checks: string[]; // self-check outcomes
}

export interface LessonTopic {
  id: string;
  name: string;
  icon: string;
  tint: string;
  part: number;
  lessons: Lesson[];
}

const stepTemplate = (doneUpTo: number): LessonStep[] =>
  (
    [
      { kind: "story", name: "Story time" },
      { kind: "watch", name: "Watch & Learn" },
      { kind: "do", name: "Try it", qns: 6 },
      { kind: "watch", name: "Watch & Learn" },
      { kind: "do", name: "Try it", qns: 4 },
      { kind: "check", name: "Self-check" },
    ] as Omit<LessonStep, "done">[]
  ).map((s, i) => ({ ...s, done: i < doneUpTo }));

export const LESSON_TOPICS: LessonTopic[] = [
  {
    id: "whole-numbers",
    name: "Whole Numbers",
    icon: "🔢",
    tint: "from-sky-400 to-blue-600",
    part: 1,
    lessons: [
      {
        id: "wn1",
        title: "Numbers to 1000",
        ageTag: "Age 8–9",
        topicId: "addition",
        level: 4,
        steps: stepTemplate(3),
        checks: [
          "Count forward and back in hundreds",
          "Split a number into hundreds, tens and ones",
          "Write numbers to 1000 in words",
        ],
      },
      {
        id: "wn2",
        title: "Comparing & Ordering",
        ageTag: "Age 8–9",
        topicId: "addition",
        level: 5,
        steps: stepTemplate(0),
        checks: ["Use < and > correctly", "Order any three numbers"],
      },
    ],
  },
  {
    id: "add-sub",
    name: "Addition & Subtraction",
    icon: "➕",
    tint: "from-violet-400 to-purple-600",
    part: 1,
    lessons: [
      {
        id: "as1",
        title: "Adding with Carrying",
        ageTag: "Age 8–9",
        topicId: "addition",
        level: 5,
        steps: stepTemplate(0),
        checks: ["Line up ones and tens", "Carry into the tens column"],
      },
      {
        id: "as2",
        title: "Subtracting across 100",
        ageTag: "Age 8–9",
        topicId: "subtraction",
        level: 6,
        steps: stepTemplate(0),
        checks: ["Borrow from the tens", "Check by adding back"],
      },
    ],
  },
  {
    id: "times",
    name: "Times Tables",
    icon: "✖️",
    tint: "from-emerald-400 to-teal-600",
    part: 2,
    lessons: [
      {
        id: "tt1",
        title: "The 7× Family",
        ageTag: "Age 9–10",
        topicId: "times-tables",
        level: 7,
        steps: stepTemplate(0),
        checks: ["Skip-count in 7s", "Use 7×5 to find 7×6"],
      },
      {
        id: "tt2",
        title: "Multiply by 10 and 100",
        ageTag: "Age 9–10",
        topicId: "times-tables",
        level: 8,
        steps: stepTemplate(0),
        checks: ["Shift digits for ×10", "Explain why zeros appear"],
      },
    ],
  },
  {
    id: "fractions",
    name: "Fractions",
    icon: "🍕",
    tint: "from-rose-400 to-pink-600",
    part: 2,
    lessons: [
      {
        id: "fr1",
        title: "Halves & Quarters",
        ageTag: "Age 9–10",
        topicId: "division",
        level: 3,
        steps: stepTemplate(0),
        checks: ["Share equally into 2 and 4", "Spot equal and unequal parts"],
      },
    ],
  },
  {
    id: "money",
    name: "Money",
    icon: "💰",
    tint: "from-amber-400 to-orange-600",
    part: 3,
    lessons: [
      {
        id: "mo1",
        title: "Rupees & Cents",
        ageTag: "Age 7–8",
        topicId: "scholarship",
        level: 4,
        steps: stepTemplate(0),
        checks: ["Make Rs. 100 with notes and coins", "Give change from Rs. 50"],
      },
    ],
  },
  {
    id: "time",
    name: "Time",
    icon: "🕐",
    tint: "from-cyan-400 to-sky-600",
    part: 3,
    lessons: [
      {
        id: "ti1",
        title: "Reading the Clock",
        ageTag: "Age 7–8",
        topicId: "addition",
        level: 3,
        steps: stepTemplate(0),
        checks: ["Read o'clock and half past", "Count minutes in fives"],
      },
    ],
  },
];

/** The lesson the student is midway through (drives the "continue" hero). */
export const CONTINUE_LESSON = {
  topicId: "whole-numbers",
  lessonId: "wn1",
};

/* ------------------------------------------------------------------ */
/* The Trunk Club — pet elephant dress-up                              */
/* ------------------------------------------------------------------ */

export interface BuddyCostume {
  id: string;
  name: string;
  img: string; // aligned transparent PNG, produced by scripts/buddy-key.mjs
  cost: number; // gems to unlock; 0 = free
}

export const BUDDY_COSTUMES: BuddyCostume[] = [
  { id: "me", name: "Just Me", img: "/images/buddy/base.png", cost: 0 },
  { id: "explorer", name: "Explorer", img: "/images/buddy/explorer.png", cost: 0 },
  { id: "cricket", name: "Cricket Star", img: "/images/buddy/cricket.png", cost: 3 },
  { id: "party", name: "Party Pal", img: "/images/buddy/party.png", cost: 3 },
  { id: "wizard", name: "Math Wizard", img: "/images/buddy/wizard.png", cost: 5 },
  { id: "super", name: "Superhero", img: "/images/buddy/super.png", cost: 5 },
  { id: "dancer", name: "Kandyan Dancer", img: "/images/buddy/dancer.png", cost: 8 },
  { id: "royal", name: "Royalty", img: "/images/buddy/royal.png", cost: 8 },
  { id: "astro", name: "Space Cadet", img: "/images/buddy/astro.png", cost: 10 },
];

export interface BuddyScene {
  id: string;
  name: string;
  className: string; // stage backdrop — Tailwind literals so JIT picks them up
  decor: [string, string, string, string]; // corner emoji, [0] doubles as the picker icon
}

export const BUDDY_SCENES: BuddyScene[] = [
  { id: "lagoon", name: "Lagoon", className: "bg-doodle-teal", decor: ["🫧", "🐠", "⭐", "🌊"] },
  { id: "meadow", name: "Meadow", className: "bg-gradient-to-b from-lime-300 to-emerald-500", decor: ["🦋", "☀️", "🌼", "🍃"] },
  { id: "beach", name: "Beach", className: "bg-gradient-to-b from-sky-300 via-sky-200 to-amber-200", decor: ["🌴", "⛱️", "🐚", "🦀"] },
  { id: "party", name: "Party", className: "bg-gradient-to-b from-pink-400 to-fuchsia-600", decor: ["🎈", "🎊", "🎉", "🎂"] },
  { id: "space", name: "Space", className: "bg-gradient-to-b from-indigo-950 to-purple-900", decor: ["🪐", "✨", "🌟", "🌙"] },
  { id: "night", name: "Starry Night", className: "bg-night", decor: ["🌙", "⭐", "✨", "🦉"] },
];

/** Starter names for the pet — the 🎲 shuffle pool. */
export const BUDDY_NAMES = [
  "Pittu",
  "Kiri",
  "Poddi",
  "Tuski",
  "Mango",
  "Bubbles",
  "Laddu",
  "Chooti",
  "Sudu",
  "Kotta",
];

export const RANK_TIERS = ["Beginner", "Bronze", "Silver", "Gold", "Numzy Star"];
export const RANK_THRESHOLDS = [0, 2500, 8000, 20000, 50000];

export interface LeaderRow {
  pos: number;
  name: string;
  xp: number;
  me?: boolean;
}

export const LEADERBOARD: Record<"daily" | "weekly" | "alltime", LeaderRow[]> = {
  daily: [
    { pos: 1, name: "Kavindu R.", xp: 480 },
    { pos: 2, name: "Nethmi J.", xp: 445 },
    { pos: 3, name: "Senuli P.", xp: 410, me: true },
    { pos: 4, name: "Ravindu W.", xp: 300 },
    { pos: 5, name: "Dilki S.", xp: 265 },
    { pos: 6, name: "Sahan M.", xp: 190 },
    { pos: 7, name: "Tharushi K.", xp: 120 },
  ],
  weekly: [
    { pos: 1, name: "Nethmi J.", xp: 2310 },
    { pos: 2, name: "Senuli P.", xp: 2105, me: true },
    { pos: 3, name: "Kavindu R.", xp: 1980 },
    { pos: 4, name: "Dilki S.", xp: 1720 },
    { pos: 5, name: "Ravindu W.", xp: 1435 },
    { pos: 6, name: "Sahan M.", xp: 1210 },
    { pos: 7, name: "Tharushi K.", xp: 960 },
  ],
  alltime: [
    { pos: 1, name: "Kavindu R.", xp: 18320 },
    { pos: 2, name: "Nethmi J.", xp: 16890 },
    { pos: 3, name: "Dilki S.", xp: 13400 },
    { pos: 4, name: "Senuli P.", xp: 12450, me: true },
    { pos: 5, name: "Ravindu W.", xp: 11205 },
    { pos: 6, name: "Sahan M.", xp: 9870 },
    { pos: 7, name: "Tharushi K.", xp: 7345 },
  ],
};

export interface Badge {
  id: string;
  name: string;
  icon: string;
  desc: string;
  earned: boolean;
  progress?: string;
}

export const BADGES: Badge[] = [
  { id: "first-perfect", name: "First Perfect Score", icon: "🎯", desc: "Score 100% in any session", earned: true },
  { id: "streak-7", name: "7-Day Streak", icon: "🔥", desc: "Practise 7 days in a row", earned: false, progress: "6 / 7 days" },
  { id: "streak-3", name: "3-Day Streak", icon: "✨", desc: "Practise 3 days in a row", earned: true },
  { id: "fastest-class", name: "Fastest in Class", icon: "⚡", desc: "Top speed in a class arena this week", earned: true },
  { id: "tables-7", name: "7× Table Hero", icon: "🦸", desc: "Master the 7 times table", earned: false, progress: "62%" },
  { id: "scholar-1", name: "Scholarship Starter", icon: "🏔️", desc: "Complete your first Scholarship set", earned: true },
  { id: "scholar-master", name: "Summit Climber", icon: "⛰️", desc: "Master a Scholarship competency", earned: false, progress: "2 / 3 sets" },
  { id: "arena-win", name: "Arena Champion", icon: "🏆", desc: "Win a class arena race", earned: true },
  { id: "early-bird", name: "Early Bird", icon: "🐦", desc: "Practise before 8am", earned: false },
  { id: "helper", name: "Team Player", icon: "🤝", desc: "Score points in a team battle", earned: false, progress: "Battle starts Mon" },
  { id: "hundred", name: "Century", icon: "💯", desc: "Answer 100 questions correctly", earned: true },
  { id: "night-owl-no", name: "Review Rockstar", icon: "🔁", desc: "Finish 5 spaced-repetition reviews", earned: false, progress: "3 / 5" },
];

/* ------------------------------------------------------------------ */
/* Scholarship mode                                                    */
/* ------------------------------------------------------------------ */

export const SCHOLARSHIP = {
  readiness: 68,
  examDateLabel: "142 days to the 2026 exam",
  competencies: [
    { id: "c1", name: "Number operations & word problems", progress: 84 },
    { id: "c2", name: "Fractions & measurement", progress: 61 },
    { id: "c3", name: "Patterns & sequences", progress: 73 },
    { id: "c4", name: "Geometry & symmetry", progress: 45 },
    { id: "c5", name: "Data interpretation", progress: 58 },
  ],
  sets: [
    { id: "s1", name: "Exam-style set 1 · Mixed", questions: 20, done: true, score: 17 },
    { id: "s2", name: "Exam-style set 2 · Mixed", questions: 20, done: true, score: 14 },
    { id: "s3", name: "Exam-style set 3 · Speed round", questions: 20, done: false },
    { id: "s4", name: "Past-paper pattern drill", questions: 15, done: false },
  ],
};

/* ------------------------------------------------------------------ */
/* Assigned work                                                       */
/* ------------------------------------------------------------------ */

export const ASSIGNMENTS = [
  { id: "a1", title: "Times Tables L7 — homework", by: "Ms. Fernando", due: "Tomorrow", done: false, topicId: "times-tables" },
  { id: "a2", title: "Division L3 practice", by: "Ms. Fernando", due: "Friday", done: false, topicId: "division" },
  { id: "a3", title: "Money word problems", by: "Tutor Aunty Shani", due: "Done ✓", done: true, topicId: "money" },
];

/* ------------------------------------------------------------------ */
/* Parent dashboard                                                    */
/* ------------------------------------------------------------------ */

export interface ChildSummary {
  id: string;
  name: string;
  grade: number;
  avatarHue: number;
  xpWeek: number;
  xpLastWeek: number;
  accuracy: number;
  minutes: number;
  streak: number;
  weeklyXp: { day: string; xp: number }[];
  mastery: { topic: string; pct: number; weak?: boolean }[];
  feed: { when: string; what: string; icon: string }[];
  rewardGoal: { target: number; current: number; reward: string };
  timeLimit: number; // minutes per day
}

export const CHILDREN: ChildSummary[] = [
  {
    id: "senuli",
    name: "Senuli",
    grade: 4,
    avatarHue: 25,
    xpWeek: 2105,
    xpLastWeek: 1840,
    accuracy: 87,
    minutes: 96,
    streak: 6,
    weeklyXp: [
      { day: "Mon", xp: 320 },
      { day: "Tue", xp: 410 },
      { day: "Wed", xp: 180 },
      { day: "Thu", xp: 465 },
      { day: "Fri", xp: 240 },
      { day: "Sat", xp: 490 },
      { day: "Sun", xp: 0 },
    ],
    mastery: [
      { topic: "Addition", pct: 96 },
      { topic: "Subtraction", pct: 88 },
      { topic: "Times Tables", pct: 62 },
      { topic: "Division", pct: 41, weak: true },
      { topic: "Time & Calendar", pct: 35, weak: true },
      { topic: "Fractions", pct: 12 },
    ],
    feed: [
      { when: "Today 4:12 pm", what: "Earned ⚡ Fastest in Class badge", icon: "🏅" },
      { when: "Today 4:05 pm", what: "Practice: Times Tables L7 — 9/10 correct, +310 XP", icon: "✏️" },
      { when: "Yesterday", what: "Won arena race vs Grade 4-B (2nd of 6)", icon: "🏁" },
      { when: "Tuesday", what: "Completed Scholarship set 2 — 14/20", icon: "🏔️" },
    ],
    rewardGoal: { target: 2500, current: 2105, reward: "Ice-cream trip 🍦" },
    timeLimit: 30,
  },
  {
    id: "kavindu",
    name: "Kavindu",
    grade: 2,
    avatarHue: 200,
    xpWeek: 980,
    xpLastWeek: 1120,
    accuracy: 91,
    minutes: 54,
    streak: 2,
    weeklyXp: [
      { day: "Mon", xp: 210 },
      { day: "Tue", xp: 0 },
      { day: "Wed", xp: 260 },
      { day: "Thu", xp: 150 },
      { day: "Fri", xp: 0 },
      { day: "Sat", xp: 360 },
      { day: "Sun", xp: 0 },
    ],
    mastery: [
      { topic: "Number & Counting", pct: 98 },
      { topic: "Addition", pct: 82 },
      { topic: "Subtraction", pct: 54, weak: true },
      { topic: "Shapes", pct: 76 },
      { topic: "Money", pct: 38, weak: true },
    ],
    feed: [
      { when: "Today 5:02 pm", what: "Practice: Addition L5 — 10/10 correct! +280 XP", icon: "✏️" },
      { when: "Wednesday", what: "Earned 🎯 First Perfect Score badge", icon: "🏅" },
      { when: "Monday", what: "Placement quiz set Subtraction to Level 4", icon: "🧭" },
    ],
    rewardGoal: { target: 1500, current: 980, reward: "Extra story at bedtime 📚" },
    timeLimit: 20,
  },
];

/* ------------------------------------------------------------------ */
/* Teacher dashboard                                                   */
/* ------------------------------------------------------------------ */

export interface PupilRow {
  id: string;
  name: string;
  lastActive: string;
  xpWeek: number;
  accuracy: number;
  masteryAvg: number;
  flagged?: string;
}

export const CLASS_PUPILS: PupilRow[] = [
  { id: "p1", name: "Senuli Perera", lastActive: "Today", xpWeek: 2105, accuracy: 87, masteryAvg: 58 },
  { id: "p2", name: "Kavindu Ranasinghe", lastActive: "Today", xpWeek: 1980, accuracy: 84, masteryAvg: 61 },
  { id: "p3", name: "Nethmi Jayasuriya", lastActive: "Today", xpWeek: 2310, accuracy: 92, masteryAvg: 74 },
  { id: "p4", name: "Ravindu Weerasinghe", lastActive: "Yesterday", xpWeek: 1435, accuracy: 78, masteryAvg: 49 },
  { id: "p5", name: "Dilki Samarasinghe", lastActive: "Today", xpWeek: 1720, accuracy: 88, masteryAvg: 66 },
  { id: "p6", name: "Sahan Madushanka", lastActive: "3 days ago", xpWeek: 1210, accuracy: 65, masteryAvg: 38, flagged: "Falling behind on Division" },
  { id: "p7", name: "Tharushi Karunaratne", lastActive: "Today", xpWeek: 960, accuracy: 71, masteryAvg: 44 },
  { id: "p8", name: "Yasas Bandara", lastActive: "5 days ago", xpWeek: 240, accuracy: 58, masteryAvg: 31, flagged: "Inactive 5 days · Times Tables stalled" },
];

/** Per-fact mastery for the heatmap: [row a][col b] = mastery of a×b, 0-100 */
export function factHeatmap(seedName: string): number[][] {
  // deterministic pseudo-random per pupil so the UI is stable
  let seed = [...seedName].reduce((s, c) => s + c.charCodeAt(0), 0);
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const grid: number[][] = [];
  for (let a = 1; a <= 12; a++) {
    const row: number[] = [];
    for (let b = 1; b <= 12; b++) {
      const easy = a <= 5 || b <= 5 || a === 10 || b === 10 ? 30 : 0;
      const hard = (a >= 7 && b >= 7 ? -25 : 0) + (a === 12 || b === 12 ? -10 : 0);
      row.push(Math.max(0, Math.min(100, Math.round(45 + easy + hard + rand() * 40))));
    }
    grid.push(row);
  }
  return grid;
}

export const TEACHER_ASSIGNMENTS = [
  { id: "t1", title: "Times Tables L7 — homework", due: "Tomorrow", completed: 14, total: 24 },
  { id: "t2", title: "Division L3 practice", due: "Friday", completed: 6, total: 24 },
];

/* ------------------------------------------------------------------ */
/* Admin CMS                                                           */
/* ------------------------------------------------------------------ */

export type ContentStatus = "Published" | "In review" | "Draft";

export interface CmsQuestion {
  id: string;
  topic: string;
  level: number;
  type: "Multiple choice" | "Numeric entry" | "True / False" | "Number line";
  en: string;
  si: string;
  ta: string;
  answer: string;
  status: ContentStatus;
  tags: string[];
}

export const CMS_QUESTIONS: CmsQuestion[] = [
  {
    id: "q-1042",
    topic: "Money",
    level: 4,
    type: "Multiple choice",
    en: "A king coconut costs Rs. 80. Amma buys 3. How much does she pay?",
    si: "තැඹිලි ගෙඩියක මිල රු. 80කි. අම්මා ගෙඩි 3ක් මිලදී ගනී. ඇය ගෙවිය යුතු මුදල කීයද?",
    ta: "ஒரு இளநீர் விலை ரூ. 80. அம்மா 3 வாங்குகிறார். அவர் எவ்வளவு செலுத்த வேண்டும்?",
    answer: "Rs. 240",
    status: "Published",
    tags: ["Grade 2", "Measurement", "Cultural: local"],
  },
  {
    id: "q-1043",
    topic: "Times Tables",
    level: 7,
    type: "Numeric entry",
    en: "7 × 8 = ?",
    si: "7 × 8 = ?",
    ta: "7 × 8 = ?",
    answer: "56",
    status: "Published",
    tags: ["Grade 3", "Number"],
  },
  {
    id: "q-1044",
    topic: "Fractions",
    level: 2,
    type: "Multiple choice",
    en: "Nimal cuts a roti into 8 equal pieces and eats 3. What fraction is left?",
    si: "නිමල් රොටියක් සමාන කැබලි 8කට කපා 3ක් කයි. ඉතිරි කොටස කුමක්ද?",
    ta: "",
    answer: "5/8",
    status: "In review",
    tags: ["Grade 4", "Number", "Scholarship: C2"],
  },
  {
    id: "q-1045",
    topic: "Patterns",
    level: 5,
    type: "Number line",
    en: "Continue the pattern: 3, 6, 12, 24, …",
    si: "",
    ta: "",
    answer: "48",
    status: "Draft",
    tags: ["Grade 5", "Patterns", "Scholarship: C3"],
  },
];

export const CMS_TREE = [
  {
    strand: "Number",
    topics: [
      { name: "Number & Counting", levels: 6, status: "Published" as ContentStatus, grade: 1, questions: 214 },
      { name: "Addition", levels: 8, status: "Published" as ContentStatus, grade: 2, questions: 356 },
      { name: "Times Tables", levels: 12, status: "Published" as ContentStatus, grade: 3, questions: 480 },
      { name: "Division", levels: 8, status: "Published" as ContentStatus, grade: 3, questions: 298 },
      { name: "Fractions", levels: 8, status: "In review" as ContentStatus, grade: 4, questions: 122 },
      { name: "Decimals", levels: 6, status: "Draft" as ContentStatus, grade: 4, questions: 38 },
    ],
  },
  {
    strand: "Measurement",
    topics: [
      { name: "Money (Rupees & cents)", levels: 6, status: "Published" as ContentStatus, grade: 2, questions: 187 },
      { name: "Time & Calendar", levels: 6, status: "In review" as ContentStatus, grade: 3, questions: 96 },
    ],
  },
  {
    strand: "Patterns",
    topics: [
      { name: "Number Patterns", levels: 6, status: "Published" as ContentStatus, grade: 3, questions: 145 },
    ],
  },
];

export const ADMIN_STATS = [
  { label: "Active students (30d)", value: "4,218", delta: "+12%" },
  { label: "Trials started this week", value: "312", delta: "+8%" },
  { label: "Trial → paid conversion", value: "23%", delta: "+2 pts" },
  { label: "Arena participation", value: "61%", delta: "+5 pts" },
  { label: "Untranslated items (TA)", value: "184", delta: "-31" },
  { label: "Qs awaiting review", value: "27", delta: "+9" },
];
