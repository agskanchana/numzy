"use client";

import { useLang, type Lang } from "@/lib/i18n";

const LABELS: { code: Lang; label: string }[] = [
  { code: "en", label: "En" },
  { code: "si", label: "සිං" },
  { code: "ta", label: "த" },
];

export default function LangToggle({ light }: { light?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`inline-flex rounded-full p-1 text-sm font-semibold ${
        light ? "bg-white/25" : "bg-ink/10"
      }`}
      role="group"
      aria-label="Language"
    >
      {LABELS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
            lang === code
              ? "bg-white text-brand-dark shadow"
              : light
                ? "text-white"
                : "text-ink/70"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
