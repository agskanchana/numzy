# Numzy — maths practice for Sri Lankan kids 🐘

**Practice that's personal. Progress that's visible.**

This workspace holds the Numzy UI prototype (frontend only — no backend yet).

| Folder | What it is |
|---|---|
| `web/` | Next.js 16 (App Router, TS, Tailwind v4) clickable UI prototype |
| `docs/numzy-features-v2.md` | The v2 feature documentation the prototype implements |
| `images/` | Generated artwork originals (image-MCP output dir) |
| `matific.com/` | Matific screenshots used as design reference |

## Run it

```bash
cd web
npm install
npm run dev   # → http://localhost:3000
```

## Route map (all clickable, mock data)

| Route | Screen |
|---|---|
| `/` | Landing page — positioning, features, LKR pricing |
| `/login` | Role select — student join-code, parent, teacher, admin |
| `/student` | Island-map home (practice / arena / Scholarship Summit / assigned work) |
| `/student/practice?topic=…&level=…` | **Working practice loop**: mini-lesson → timed questions (MCQ + keypad), hint on 1st miss, worked solution on 2nd, live XP, read-aloud 🔊 |
| `/student/results` | Session results — stars, XP count-up, badge |
| `/student/subjects` | Subjects map — NIE strands, grade tags, mastery, locks, review-due |
| `/student/arena` → `/student/arena/race` | Arena lobby + **simulated live race** vs 3 classmate bots |
| `/student/leaderboard` | Daily/weekly/all-time class leaderboard + team battle teaser |
| `/student/badges` | Badge grid + rank journey (Beginner → Numzy Star) |
| `/student/scholarship` | Grade 5 Scholarship mode — readiness ring, competencies, exam sets |
| `/student/assignments` | Homework from teacher/tutor |
| `/parent` | Parent dashboard — child switcher, weekly XP chart, mastery + weak spots, reward goal, encouragement composer, screen-time & notification controls, PayHere billing |
| `/teacher` | Class overview, **12×12 per-fact heatmap**, assignments + arena scheduling |
| `/admin` | Content CMS — curriculum tree, En/Si/Ta question editor, generator config with live preview, review queue, analytics |

Language toggle (En / සිං / த) is in every header — UI chrome strings switch live.

## What's real vs mock

- **Real:** question generation, XP formula (base × difficulty × speed), timers, hints/solutions, arena bot simulation, all navigation, language switching, browser read-aloud.
- **Mock:** all persisted data (`web/src/lib/data.ts`), auth, billing, notifications. Buttons that would hit a backend show a toast instead.

Next step per the build plan (docs §6): Phase 0 CMS backing (Prisma schema from `math-platform-data-model.md`) before authoring Phase 1 content.
