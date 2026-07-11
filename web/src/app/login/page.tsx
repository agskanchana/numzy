"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LangToggle from "@/components/LangToggle";

const ROLES = [
  {
    href: "/parent",
    icon: "👨‍👩‍👧",
    title: "Parent",
    desc: "Progress, rewards, reports & billing",
    color: "border-brand hover:bg-orange-50",
  },
  {
    href: "/teacher",
    icon: "🧑‍🏫",
    title: "Teacher",
    desc: "Class view, heatmap, assignments & arenas",
    color: "border-lagoon hover:bg-teal-50",
  },
  {
    href: "/admin",
    icon: "🛠️",
    title: "Content admin",
    desc: "CMS: curriculum, questions, translations",
    color: "border-slate-400 hover:bg-slate-50",
  },
];

export default function Login() {
  const router = useRouter();
  const [code, setCode] = useState("NUM123");

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-cream flex flex-col">
      <header className="p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative block size-10 overflow-hidden rounded-full ring-2 ring-brand/40">
            <Image
              src="/images/mascot.jpg"
              alt="Numzy"
              fill
              sizes="40px"
              className="object-cover scale-110"
            />
          </span>
          <span className="font-display text-2xl font-semibold text-brand-dark">
            Numzy
          </span>
        </Link>
        <LangToggle />
      </header>

      <main className="flex-1 grid place-items-center px-4 pb-10">
        <div className="w-full max-w-3xl">
          <h1 className="font-display text-3xl font-semibold text-center mb-1">
            Who&apos;s here today?
          </h1>
          <p className="text-center font-semibold opacity-60 mb-8">
            Prototype login — pick a role to explore that portal. No real auth
            yet.
          </p>

          {/* student join-code card (§3.9: no email needed for kids) */}
          <div className="rounded-3xl bg-white shadow-xl p-6 mb-4 flex flex-col sm:flex-row items-center gap-5">
            <span className="text-6xl animate-float">🧒</span>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-display text-xl font-semibold">Student</div>
              <p className="text-sm font-semibold opacity-60 mb-3">
                Type the join code from your teacher or parent — no email
                needed!
              </p>
              <div className="flex gap-2 justify-center sm:justify-start">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  className="w-40 rounded-xl border-4 border-lagoon/30 text-center font-display text-2xl tracking-[0.3em] py-2 focus:outline-lagoon uppercase"
                  aria-label="Join code"
                />
                <button
                  onClick={() => router.push("/student")}
                  className="btn-chunky bg-brand text-white px-8 py-2 text-lg"
                >
                  Go! ▶
                </button>
              </div>
            </div>
          </div>

          {/* grown-up roles */}
          <div className="grid sm:grid-cols-3 gap-3">
            {ROLES.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className={`rounded-2xl bg-white border-2 shadow p-5 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg ${r.color}`}
              >
                <div className="text-4xl mb-2">{r.icon}</div>
                <div className="font-display font-semibold">{r.title}</div>
                <p className="text-xs font-semibold opacity-60 mt-1">
                  {r.desc}
                </p>
              </Link>
            ))}
          </div>

          <p className="text-center text-xs font-bold opacity-50 mt-6 max-w-md mx-auto">
            🛡️ Children&apos;s accounts hold no personal email or phone number.
            Parental consent is collected at sign-up (Sri Lanka PDPA).
          </p>
        </div>
      </main>
    </div>
  );
}
