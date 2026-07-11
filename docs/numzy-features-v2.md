# Numzy — feature documentation (v2)

**Tagline:** Practice that's personal. Progress that's visible.

**One-liner:** Numzy is a maths practice platform for Sri Lankan kids (ages 5–12) that combines TT Rockstars' daily-habit gamification with Komodo Math's personalized curriculum — built for local families, schools, and tutors, with Sinhala/Tamil/English support, Sri Lankan curriculum alignment, and local payment options from day one.

**v2 changes:** added content authoring (CMS), a teaching/support layer (not just drilling), notifications & reminders, achievements/badges, and visible Sri Lankan curriculum alignment incl. a Grade 5 Scholarship-exam mode; plus spaced repetition, audio read-aloud, richer question types, anti-cheat, offline practice, local notification channels (SMS/WhatsApp), two-way parent↔child messages, parental usage controls, cultural localization, a safety/privacy model, and freemium/referral. Tech reference updated from WordPress hybrid to the unified Next.js stack.

---

## 1. Positioning

| | TT Rockstars | Komodo Math | Numzy |
|---|---|---|---|
| Curriculum scope | Times tables only | Full K-5 arithmetic + literacy | Full primary arithmetic, times tables first |
| Hook | Leaderboards, races, ranks | Parent-set real-world rewards | Leaderboards + ranks + badges + parent rewards |
| Personalization | None — same content for all | Teacher-tailored learning plan | Adaptive placement + mastery + spaced repetition |
| Teaching | Drill only | Worked examples + mini-lessons | Hints, worked examples, mini-lessons, audio |
| Curriculum alignment | UK statutory MTC | (none, generic) | Sri Lankan primary syllabus + Grade 5 Scholarship mode |
| Local fit (Sri Lanka) | None | None | Sinhala/Tamil/English, LKR pricing, SMS/WhatsApp, local context |

**Numzy's bet:** neither competitor serves Sri Lanka directly. Combining their two strongest mechanics (fair competition + personalized, taught breadth) — and adding the one thing SL parents care about most, Grade 5 Scholarship readiness — without copying Prodigy's heavy game layer, is a gap nobody local is filling.

## 2. User roles

| Role | Can do | Typical entry point |
|---|---|---|
| Student | Practice, view own progress/rank/badges, join arenas | Parent or school signs them up |
| Parent | View child's progress, set reward goals, send encouragement, set time limits, manage billing, link multiple children | Direct sign-up, subscribes |
| Teacher | Create classes, view all students' progress (incl. per-fact heatmap), assign topics/homework, schedule arenas | Invited by school admin |
| School admin | Manage teachers, classes, school-wide billing/license, school reports | Direct sign-up (B2B) |
| Tutor | View linked students' progress, assign topics | Direct sign-up, links students manually |
| Content admin / Super admin | Author & translate topics/levels/questions, tag curriculum, publish content, view business analytics | Internal team (Numzy staff) |

Relationships (parent↔child, tutor↔student, class↔student) are independent join edges — a student can have all three simultaneously.

## 3. Core features

### 3.1 Curriculum & personalization (Komodo-inspired)
- **Topic tree:** hierarchical subjects (Number & counting → Addition → Subtraction → Multiplication/times tables → Division → Fractions → Decimals → Percentages, plus the wider NIE strands: number, measurement, space/geometry, patterns, data handling), each broken into numbered difficulty levels.
- **Sri Lankan curriculum alignment** (visible feature): every topic/level tagged with its local grade (1–5) and NIE strand, so parents and teachers see "this matches Grade 4 syllabus."
- **Grade 5 Scholarship mode:** a dedicated practice track tagged to Scholarship-exam maths competencies, with exam-style question sets and a readiness indicator. The strongest local hook.
- **Placement quiz:** short diagnostic per topic at signup, sets starting level. Re-assessment available.
- **Mastery tracking:** rolling accuracy+speed score per topic; "graduate" once mastery crosses a threshold.
- **Spaced repetition / retention review:** mastered skills periodically re-surfaced.
- **Topic locking:** advanced topics locked until prerequisites reach a minimum level.
- **Subjects map screen:** one view of every topic, current level, mastery %, grade tag.

### 3.2 Teaching & support
- **Mini-lessons / concept intros** when starting a new topic/level.
- **Smart hints on repeated errors:** after N wrong attempts, hint → worked solution.
- **Step-by-step solution reveal** on wrong answers.
- **Audio read-aloud** (English/Sinhala/Tamil) for ages 5–7 and early readers.

### 3.3 Engagement layer (TT Rockstars-inspired)
- **Adaptive practice sessions:** timed question sets at current level/topic.
- **XP system:** XP = base_points × difficulty_weight × speed_multiplier.
- **Rank tiers:** Beginner → Bronze → Silver → Gold → Numzy Star (cumulative XP).
- **Achievements / badges:** frequent rewards between rank-ups.
- **Fluency speed stat** (optional, "Rock Speed" analog): per-topic average-answer-time.
- **Streaks:** daily-login bonus XP, visible counter.
- **Arena mode:** head-to-head races on identical fixed question sets. Scheduled or open.
- **Team competitions:** class vs class / school vs school cumulative-XP contests.
- **Leaderboards:** class-scoped and (later) school/national; daily/weekly/all-time; own row always visible.

### 3.4 Practice session mechanics
- **Question types:** multiple-choice, numeric entry via kid-friendly keypad, true/false, number-line/drag, visual models.
- Countdown timer per question (tunable, hideable).
- Instant feedback with hint/solution hook.
- Progress indicator; 10–15 min sessions.
- Live XP-earned preview.
- **Anti-cheat:** randomized answer positions, impossible-speed detection, per-session sanity checks.
- **Offline practice + sync:** PWA caches practice sets; sync when online.

### 3.5 Notifications & reminders
- Streak-saver nudge; channels: web push (PWA), email, SMS/WhatsApp.
- Parent digests (weekly email), achievement/rank-up alerts.
- Teacher/assignment reminders. All respect parental controls and quiet hours.

### 3.6 Parent dashboard & reporting
- Weekly summary: XP, accuracy %, time spent, streak.
- Per-topic mastery breakdown incl. weak spots.
- Recent activity feed. Reward goals (real-world reward for weekly XP target).
- Two-way encouragement (parent → child in-app messages).
- Usage/time controls: daily caps, session limits.
- Emailed weekly reports. Multi-child support.

### 3.7 Teacher / school dashboard (phase 2)
- Class-wide progress view, sortable.
- **Per-fact heatmap:** color-coded grid of known/unknown facts per student.
- Assign topics, set arenas, homework. Flag students falling behind.
- Printable certificates. Bulk account creation (CSV roster).

### 3.8 Content authoring & administration
- **Admin CMS:** create/edit strands, topics, levels, skills, questions.
- **Multilingual editor:** En/Si/Ta side by side; flag untranslated.
- **Question generators config:** arithmetic generators (ranges, operators, fact families) + hand-authored word problems.
- **Curriculum tagging:** NIE strand, local grade, Scholarship competency.
- **Review/publish workflow:** draft → review → publish.
- Bulk import of question banks.

### 3.9 Accounts, roles & relationships
- Students under 13: username/join-code login, no personal email.
- Parent-child, tutor-student, class-student are independent joins.

### 3.10 Localization & accessibility
- UI toggle: Sinhala / Tamil / English (Noto Sans Sinhala/Tamil; Western-Arabic numerals).
- Question content localized per language. Cultural localization (rupees, king coconut, local names).
- Audio read-aloud. Dyslexia-friendly mode, adjustable/hideable timers, font scaling, color-blind-safe palettes.

### 3.11 Safety & privacy
- Child-data minimization; parental consent (Sri Lanka PDPA).
- Safe display names on leaderboards/Arena.
- No open chat; invite/approve friends; social scope limited.

### 3.12 Billing & payments
- SL parents: PayHere (LKR recurring). International: PayPal (USD).
- Schools/tutors: invoice/bulk-seat licensing.
- Freemium: limited free tier + 14-day full trial. Family plan. Referral incentives.

## 4. New in v2
User's 5: CMS (3.8), teaching layer (3.2), notifications (3.5), badges (3.3), visible curriculum alignment (3.1). Further: Scholarship mode, spaced repetition, audio read-aloud, richer question types + kid keypad, anti-cheat, offline practice, SMS/WhatsApp + digests, two-way messages + usage controls, per-fact heatmap + certificates, cultural localization, safety/privacy, freemium/family/referral, fluency stat + team competitions, content admin role.

## 5. Competitor feature gaps
See conversation doc — table of TT RS / Komodo features vs Numzy status. Deliberately excluded: avatar/coin cosmetics (badges instead). Out of scope: literacy content. PWA-first; native later.

## 6. MVP scope (build order)
- **Phase 0 — content engine first:** admin CMS + question generators + curriculum tagging.
- **Phase 1 — core loop:** student accounts, times tables, placement quiz, adaptive practice (hints/worked examples), XP/streaks/ranks/badges, parent dashboard (read-only), PayHere/PayPal, streak-saver notifications.
- **Phase 2 — competition:** arena, class leaderboards, team competitions, teacher accounts + classes, per-fact heatmap.
- **Phase 3 — curriculum breadth:** full topic tree, locking, mastery + spaced repetition, Scholarship mode.
- **Phase 4 — institutional & localization:** school admin, roster import, school reporting, full Si/Ta content + audio, SMS/WhatsApp, parental controls.

Don't build Phase 3's full curriculum before Phase 1 proves the engagement loop. But build the CMS (Phase 0) first.

## 7. Technical reference
- **Architecture:** Next.js (App Router, React, TypeScript) + Node API (route handlers) + PostgreSQL (Prisma), installable PWA.
- **Data model:** see math-platform-data-model.md (to be migrated to Prisma schema).
- **i18n:** next-intl for UI chrome; JSONB {en,si,ta} columns for content; Noto Sans Sinhala/Tamil.
- **Notifications:** web push + email + SMS/WhatsApp provider.

## 8. Open questions
1. Mastery threshold + attempt-count for leveling (playtest).
2. Spaced-repetition interval/curve.
3. Under-13 parental-consent flow under SL PDPA.
4. Arena: scheduled-only vs instant races.
5. School billing: per-seat vs flat.
6. Freemium boundary.
7. Scholarship content sourcing/licensing.
8. Notification channel priority for v1.

---

*Design reference: Matific screenshots in `matific.com/` — illustrated island-map home, mascot guide, playful practice episodes, clean parent onboarding (white cards, stepper, bold orange CTA). Numzy takes a balanced approach: playful island-map student UI without a heavy game layer.*
