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
