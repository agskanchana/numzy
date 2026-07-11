"use client";

import Image from "next/image";
import Link from "next/link";
import LangToggle from "@/components/LangToggle";

const FEATURES = [
  {
    icon: "🎯",
    title: "Personal from day one",
    desc: "A short placement quiz finds each child's level — never too easy, never scary.",
  },
  {
    icon: "🏔️",
    title: "Grade 5 Scholarship mode",
    desc: "Exam-style sets mapped to Scholarship competencies, with a readiness meter parents can trust.",
  },
  {
    icon: "🇱🇰",
    title: "Made for Sri Lanka",
    desc: "Sinhala, Tamil & English. Rupees and king coconuts in the word problems — not pounds and dollars.",
  },
  {
    icon: "🏁",
    title: "Fair, fun competition",
    desc: "Arena races on identical questions, class leaderboards and team battles — speed wins, not spending.",
  },
  {
    icon: "📖",
    title: "Teaches, not just tests",
    desc: "Mini-lessons before new topics, smart hints after mistakes, worked solutions that show the how.",
  },
  {
    icon: "📲",
    title: "Parents stay in the loop",
    desc: "Weekly reports by email or WhatsApp, reward goals, screen-time caps and two-way encouragement.",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "Rs. 0",
    period: "forever",
    items: ["One topic (Times Tables)", "3 sessions per day", "Class leaderboard"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Family",
    price: "Rs. 1,490",
    period: "per month",
    items: [
      "Everything, all topics",
      "Up to 3 children",
      "Scholarship mode + reports",
      "14-day free trial · PayHere or PayPal",
    ],
    cta: "Start 14-day trial",
    highlight: true,
  },
  {
    name: "School",
    price: "Custom",
    period: "per seat, invoiced",
    items: ["Teacher dashboards", "Bulk roster import", "School reports & certificates"],
    cta: "Talk to us",
    highlight: false,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-cream">
      {/* nav */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-amber-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="relative block size-10 overflow-hidden rounded-full ring-2 ring-brand/40">
              <Image
                src="/images/mascot.jpg"
                alt="Numzy the elephant"
                fill
                sizes="40px"
                className="object-cover scale-110"
              />
            </span>
            <span className="font-display text-2xl font-semibold text-brand-dark">
              Numzy
            </span>
          </Link>
          <nav className="ml-auto flex items-center gap-3">
            <LangToggle />
            <Link
              href="/login"
              className="btn-chunky bg-brand text-white px-6 py-2.5 text-sm"
            >
              Log in / Try free
            </Link>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-16 grid lg:grid-cols-2 gap-8 items-center">
        <div className="animate-rise">
          <span className="inline-block text-xs font-bold bg-lagoon/10 text-lagoon-dark rounded-full px-3 py-1 mb-4">
            🇱🇰 Aligned to the Sri Lankan primary syllabus (NIE)
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight mb-4">
            Practice that&apos;s <span className="text-brand">personal</span>.
            <br />
            Progress that&apos;s <span className="text-lagoon">visible</span>.
          </h1>
          <p className="text-lg font-semibold opacity-80 mb-6 max-w-lg">
            Numzy is daily maths practice for kids aged 5–12 — in Sinhala,
            Tamil or English — that builds real fluency and Grade 5 Scholarship
            confidence, 15 minutes at a time.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/login"
              className="btn-chunky bg-brand text-white px-8 py-3.5 text-lg"
            >
              Try it free ▶
            </Link>
            <Link
              href="/student"
              className="btn-chunky bg-white border-2 border-slate-200 px-8 py-3.5 text-lg"
            >
              See the kid&apos;s view 🏝️
            </Link>
          </div>
          <div className="flex gap-4 mt-6 text-xs font-bold opacity-60 flex-wrap">
            <span>✓ LKR pricing via PayHere</span>
            <span>✓ WhatsApp/SMS reports</span>
            <span>✓ No open chat — kid-safe</span>
          </div>
        </div>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white animate-rise">
          <Image
            src="/images/hero.jpg"
            alt="Sri Lankan kids enjoying maths with Numzy"
            width={1376}
            height={768}
            priority
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* features */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-semibold text-center mb-2">
            Why families pick Numzy
          </h2>
          <p className="text-center font-semibold opacity-60 mb-8">
            The competition of TT Rockstars + the teaching of Komodo — built
            for Sri Lanka.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="text-3xl mb-2">{f.icon}</div>
                <div className="font-display text-lg font-semibold mb-1">
                  {f.title}
                </div>
                <p className="text-sm font-semibold opacity-70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-display text-3xl font-semibold text-center mb-8">
            15 minutes a day is all it takes
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            {[
              ["1", "🧭", "Quick placement quiz finds the right starting level"],
              ["2", "✏️", "Short, adaptive sessions — hints and lessons when stuck"],
              ["3", "🏆", "XP, streaks, badges and races keep them coming back"],
            ].map(([n, icon, text]) => (
              <div key={n} className="rounded-2xl bg-white shadow-sm p-6">
                <div className="text-4xl mb-2">{icon}</div>
                <div className="font-display text-4xl font-bold text-brand/30 mb-1">
                  {n}
                </div>
                <p className="text-sm font-semibold">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* pricing */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl font-semibold text-center mb-8">
            Simple local pricing
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 items-stretch">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`rounded-3xl p-6 flex flex-col ${
                  p.highlight
                    ? "bg-gradient-to-b from-brand to-amber-500 text-white shadow-xl scale-[1.03]"
                    : "bg-slate-50 border border-slate-100"
                }`}
              >
                <div className="font-display text-lg font-semibold mb-1">
                  {p.name}
                </div>
                <div className="font-display text-3xl font-bold">
                  {p.price}
                </div>
                <div
                  className={`text-xs font-bold mb-4 ${p.highlight ? "opacity-90" : "opacity-50"}`}
                >
                  {p.period}
                </div>
                <ul className="text-sm font-semibold space-y-2 mb-6 flex-1">
                  {p.items.map((item) => (
                    <li key={item}>✓ {item}</li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`btn-chunky text-center px-6 py-3 ${
                    p.highlight
                      ? "bg-white text-brand-dark"
                      : "bg-brand text-white"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs font-bold opacity-50 mt-4">
            Family discounts for siblings · refer a friend for a free month ·
            diaspora? Pay in USD via PayPal
          </p>
        </div>
      </section>

      {/* footer */}
      <footer className="py-8 text-center text-sm font-semibold opacity-60">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <span>Numzy 🐘 — UI prototype (no backend yet)</span>
          <Link href="/student" className="hover:text-brand">Student</Link>
          <Link href="/parent" className="hover:text-brand">Parent</Link>
          <Link href="/teacher" className="hover:text-brand">Teacher</Link>
          <Link href="/admin" className="hover:text-brand">Content admin</Link>
        </div>
      </footer>
    </div>
  );
}
