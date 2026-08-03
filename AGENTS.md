<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Writing quiz questions

Every quiz in this repo is scored, and the scores are load-bearing: they feed
`avg_quiz_score`, the `/kiem-tra` track quizzes, the lesson-unlock gate
challenge, XP, and the competency percentages on `/su-nghiep`
(`lib/career-competency.ts`). A quiz that can be passed without knowing the
material doesn't just waste the learner's time — it silently inflates all of
those numbers, so a learner is told they're 80% ready for an IB interview when
they aren't.

Two ways that has already happened at scale, both found by measurement rather
than by reading:

- **Position.** 47.9% of correct answers sat at index 1, and 73 lessons had
  every single answer at the same index. Fixed mechanically at build time by
  `lib/lesson-quiz-balance.js`; nothing to do by hand.
- **Length.** 1,378 of 1,501 lesson quiz questions (91%) had the correct answer
  as the *longest* option — median 115 characters against 45 for a distractor.
  Picking the longest option scored 91% with no finance knowledge at all. The
  same defect ran through 271 of 276 IB question-bank questions. This one cannot
  be fixed mechanically: a shorter correct answer has to be written.

## Rules

1. **The correct option states the claim, nothing more.** Its reasoning belongs
   in that question's `explanation`, which the learner reads immediately after
   answering. Do not restate the explanation inside the option.
2. **In roughly three of every four questions, one distractor must be longer
   than the correct option.** Not every question — a bank where the right answer
   is always the *shortest* is exactly as guessable. Aim for the correct option
   being the longest about a quarter of the time, which is chance level for four
   options.
3. **Every distractor is a mistake a learner actually makes.** A wrong formula,
   a flipped sign, the wrong direction of a relationship, a plausible-sounding
   confusion between two concepts. Numeric distractors carry the arithmetic that
   produces them: `"100 (= 200 × (1 − 0,2) − 50, sai thứ tự)"`, not a bare
   `"100"`.
4. **No absurdity distractors.** `"Luôn tốt"`, `"Không ảnh hưởng"`,
   `"luôn đúng 100%"`, `"Không có khái niệm này"`, `"Tidak ada"` — these are
   blank space, not options. They are eliminated on sight and turn a
   four-option question into a two-option one. Now measured and gated at zero
   by `scripts/audit-lesson-content.mjs`; the corpus is clean.

   The "10% of the corpus" figure that stood here was wrong. It came from
   matching any option containing a marker phrase, and 168 of its 198 matches
   were legitimate distractors that happened to use one — `"Lạm phát không ảnh
   hưởng gì tới trái phiếu vì coupon đã được cố định sẵn"` is a misconception
   worth testing, not filler. The check only flags an option that has no digits
   (so numeric answers like `"15%"` are left alone), is under 30 characters (so
   anything carrying a clause is left alone), and opens with a hollow formula.
   Written that narrowly it found five in 2,815 questions, and all five are
   fixed.
5. **Never contradict another lesson's correct answer.** Negative working
   capital is a *strength* for retail and subscription businesses (lesson 178),
   so it cannot be the wrong answer in lesson 50. Check the neighbouring
   lessons before writing a distractor about a nuanced point.
6. **All four options in a comparable length band.** Roughly ±20% around their
   mean. A 9-character option beside a 177-character one is the tell, whichever
   one happens to be correct.

## Where to write

New lessons: in `lib/lessons.ts` with the rest of the lesson.

Rewriting an existing lesson's options: `lib/lesson-quiz-overrides.js`, keyed by
slug. The override replaces the whole `quiz` array for that slug, so copy every
question across — and keep `question` and `explanation` **verbatim** unless you
are fixing an outright error (typos like `"Nợ cợ định"` or a stray `]`, or
non-Vietnamese text that slipped in). Rewriting the teaching content is a
separate change from rebalancing the options; don't mix the two.

IB question bank: `lib/ib-question-overrides.ts`, keyed by numeric id. Same
rules apply. Note that the delivery route shuffles option order per question,
so `correct: 0` everywhere is fine there — position leaks nothing, only length
survives shuffling.

## The content gates

`scripts/audit-lesson-content.mjs` holds four per-lesson minimums, and each is
set to the level the **whole corpus already meets** - not to an aspiration.
That is what makes them gate new lessons without putting old ones into debt:

| gate | value | why |
| --- | --- | --- |
| `MIN_QUIZ_COUNT` | 5 | scores feed `avg_quiz_score`, the unlock gate and `/su-nghiep` |
| `MIN_EXPLANATION_LEN` | 250 | below this the field is usually one quiz answer, not an explanation |
| `MIN_DIAGRAM_NODES` | 2 | fewer is a caption, not a flow |
| `MIN_SECTION_BLOCKS` | 5 | four is the leanest readable shape; corpus median is 8 |

Raise one only after the corpus has already cleared the new level; never lower
one to make a red build pass. The floors sat at 2 questions and 150 characters
long after every lesson had passed 5 and 250, and in that gap three separate
batches of new lessons landed under standard with CI green - each found by
measuring by hand rather than by the audit.

## Checking your work

```
npm run audit:lessons                                  # lesson quizzes
node scripts/audit-ib-option-length.mjs                # IB question bank
node scripts/audit-ib-option-length.mjs --ids <cat>    # per-question lengths
```

The lesson audit gates CI on two things:

- `MAX_TELL_SHARE` in `scripts/audit-lesson-content.mjs` — the share of all
  questions with the length tell. **Lower it after a rewrite batch; never raise
  it.** A share rather than a count, because a count can't tell "someone fixed
  nothing" apart from "the corpus grew" — which is exactly what happened when
  82 questions arrived in new lessons an hour after the first ratchet landed.
- `scripts/lesson-quiz-tell-baseline.json` — the grandfathered backlog. A lesson
  **not** on this list must pass the per-lesson check, so a newly authored
  lesson cannot add to the backlog. Nothing is ever added to the list; after
  rewriting a lesson, drop it with
  `node scripts/audit-lesson-content.mjs --write-baseline`.

Adding a failing lesson to the baseline is not a fix. If the audit names your
new lesson, rewrite its options.
