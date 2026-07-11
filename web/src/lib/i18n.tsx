"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Lang = "en" | "si" | "ta";

const STRINGS: Record<string, Record<Lang, string>> = {
  hello: { en: "Hello", si: "ආයුබෝවන්", ta: "வணக்கம்" },
  practice: { en: "Practice", si: "පුහුණු වන්න", ta: "பயிற்சி" },
  arena: { en: "Arena", si: "තරඟ පිටිය", ta: "அரங்கம்" },
  subjects: { en: "Subjects map", si: "විෂය සිතියම", ta: "பாடத் திட்டம்" },
  leaderboard: {
    en: "Leaderboard",
    si: "ශ්‍රේණිගත ලැයිස්තුව",
    ta: "தரவரிசை",
  },
  badges: { en: "Badges", si: "ලාංඡන", ta: "பதக்கங்கள்" },
  scholarship: {
    en: "Scholarship Summit",
    si: "ශිෂ්‍යත්ව කඳු මුදුන",
    ta: "புலமைப்பரிசில் சிகரம்",
  },
  assignedWork: { en: "Assigned work", si: "පැවරුම්", ta: "வீட்டுப்பாடம்" },
  streak: { en: "day streak", si: "දින මාලාව", ta: "நாள் தொடர்" },
  play: { en: "Play", si: "ක්‍රීඩා කරන්න", ta: "விளையாடு" },
  continueLbl: { en: "Continue", si: "ඉදිරියට", ta: "தொடரவும்" },
  correct: { en: "Correct!", si: "නිවැරදියි!", ta: "சரி!" },
  tryAgain: {
    en: "Try again",
    si: "නැවත උත්සාහ කරන්න",
    ta: "மீண்டும் முயற்சி",
  },
  hint: { en: "Hint", si: "ඉඟිය", ta: "குறிப்பு" },
  next: { en: "Next", si: "ඊළඟ", ta: "அடுத்து" },
  question: { en: "Question", si: "ප්‍රශ්නය", ta: "கேள்வி" },
  accuracy: { en: "Accuracy", si: "නිරවද්‍යතාව", ta: "துல்லியம்" },
  results: { en: "Results", si: "ප්‍රතිඵල", ta: "முடிவுகள்" },
  weeklyQuest: { en: "Weekly quest", si: "සතියේ අභියෝගය", ta: "வார சவால்" },
  minutes: { en: "minutes", si: "මිනිත්තු", ta: "நிமிடங்கள்" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof STRINGS | string) => string;
};

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k) => String(k),
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("numzy-lang") as Lang | null;
    if (saved === "en" || saved === "si" || saved === "ta") setLangState(saved);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("numzy-lang", l);
  }, []);

  const t = useCallback(
    (key: string) => STRINGS[key]?.[lang] ?? STRINGS[key]?.en ?? key,
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
