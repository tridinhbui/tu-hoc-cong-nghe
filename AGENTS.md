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
- **Length, the other direction.** That rewrite worked, and then overshot. The
  corpus now sits at 24% longest — chance level — but that headline number was
  hiding two things. The audit measured the two directions by *different rules*
  (a tie for longest counted as a tell, a tie for shortest did not), which
  inflated the longest side: `bonus` read 30% when the true figure was 24.9%.
  And it compared against a flat 25%, which is not the chance level when
  questions have tied options — the real expectation depends on how many ties a
  track has.

  Measured properly, the drift is now *downward* and strongest in the largest
  track: `professional` has the correct answer as the uniquely longest option
  452 times against 547 expected, **z = −4.6**. That is exploitable in reverse —
  eliminate the longest option, then guess among three. It is the predictable
  cost of rule 1 applied without watching the distribution, and nothing was
  watching, because every gate was a ceiling and this is a floor.

  `MAX_LENGTH_BIAS_Z` gates both directions, per track and overall, against a
  tie-aware expectation.

- **Where the downward drift stops, and why chasing it further is wrong.** The
  rewrite above took `professional` from z = −4.6 to **−2.98**, and there it
  stuck. The last batch tightened fourteen options into rule 6's ±20% band —
  one of them cut from 125 characters to 46 beside a 39-character answer — and
  moved the statistic by *zero*: 486 uniquely-longest before, 486 after. Not
  one question flipped, because trimming the longest distractor almost never
  brings it below the correct answer.

  Then the useful measurement: of the 1,902 `professional` questions where the
  correct answer is not the longest, **1,599 (84%) already satisfy rule 6**.
  They are not defective. The residual z = −2.98 is the arithmetic consequence
  of rules 1 and 3 held together — the correct option states a claim, while
  every distractor has to carry the mistake that produces it, so a longer
  distractor is the normal shape of a well-built question.

  So do **not** read a mild negative z as a backlog to grind down. Closing it
  leaves only two moves and both damage the bank: pad the correct option past
  its claim (breaks rule 1), or strip the arithmetic out of the distractors
  (breaks rule 3). `MAX_LENGTH_BIAS_Z` stays at 3.4 for this reason rather than
  being ratcheted further — it is a guard against a *new* batch drifting, not a
  target to reach. The earlier version of this section told you to fix a
  downward z by "writing some correct options longer"; that advice is what this
  measurement retired.

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

   The same rule now runs against the **correct** option too, which it never
   did before: the loop that applies it skipped `question.correct` on its first
   line. A hollow *correct* answer is worse than a hollow distractor, because
   it marks the learner who understood the material wrong. One existed —
   `revenue-cogs-gross-profit` keyed "Gross Margin cao có tốt không?" to
   "Không ảnh hưởng" while its own explanation said "cần xem ngành: Retail
   20-30%, Software 70-80%" — and it was found by accident while measuring
   option lengths. The correct-answer check counts **words, not characters**:
   what separates "Không ảnh hưởng" from "Không có dòng tiền nền tảng" is that
   the second one names something. Two words against six; by character count
   they are 15 and 27, and no character threshold separates them.

   A THIRD detector was built, measured, and also not wired in - and this one
   found a real bug, so read the numbers before rebuilding it. A translator
   noticed that `on-tap-trai-phieu`'s `practicePrompt` keyed `correct: 2`
   ("Đó là lạm phát") while its own explanation opened with "Lãi suất", the
   option at index 1. A learner who understood the material was marked wrong and
   then shown an explanation naming the answer they had just given. Nothing
   caught it: the option-letter check looks for letters, and the numeric check
   looks for figures. It is fixed at source in `lib/lessons.ts`.

   The check that finds it: flag a question whose explanation STARTS with the
   verbatim first 40 characters of a NON-keyed option while the keyed option's
   first 40 characters appear nowhere in the explanation. Across 4,372 questions
   that flagged exactly two - the real one above, and `derivatives-la-gi`'s
   "Bốn nhóm phái sinh cơ bản là gì?", where the explanation legitimately opens
   by refuting a distractor ("Hàng hóa, tiền tệ... **chứ không phải** loại hợp
   đồng"). Excluding that shape needs a Vietnamese negation marker, which is
   exactly the sort of thing that stops working on the English corpus. One real
   finding against one false positive is not a ratio to gate a build on, so this
   is recorded rather than enforced. If a second real case turns up, that changes.

   Two other detectors were built and thrown away, which is worth recording so
   nobody rebuilds them. Ranking answers by word overlap with the explanation
   produced 235 suspects and zero real errors — explanations name the
   misconception they refute, so distractors share their vocabulary. Checking
   that the keyed answer's numbers appear in the explanation produced 4, then 8
   after adding tolerance, and again zero real errors: derived answers state a
   result the explanation reaches by a different route. Neither is in the
   audit. A noisy gate is a gate people learn to ignore.
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

**An override replaces every key it carries, not just `quiz`.**
`applyLessonOverrides` is `{ ...lesson, ...override }`, so a `sections` key in
an override takes ownership of that lesson's teaching content and whatever
`lib/lessons.ts` says is silently ignored — no compile error, no failing test,
`npm run audit:lessons` still green, and the lesson on production does not
change by a single character. 35 slugs were in that state; **all of them have
been pulled back out**, so `lib/__tests__/lesson-override-shadowing.test.ts` now
enforces a plain invariant — no override may carry `sections` at all. Write
teaching content in `lib/lessons.ts`.

How they were pulled out matters, because the obvious move is wrong. Only one
of the 35 (`wealth-management`) was byte-identical duplication where deleting
`sections` was safe. The other 34 overrides were each *richer* than their
`lib/lessons.ts` counterpart — 9–12 blocks against 5 — and every one also
carried `openingQuestion`, `openingOptions`, `correctOption`, `explanation`,
`diagram`, `realWorldExample`, `quiz`, `keyTakeaways` and `summary`. Deleting
just `sections` there would drop those nine keys back to the stale values and
silently change the lesson. What is provably neutral is replacing the
`lib/lessons.ts` object with `{ ...lesson, ...override }` and deleting the whole
override entry.

"Provably" meaning measured, not reasoned: SHA-256 the full
`applyLessonOverrides(lessons)` output before and after each batch, in a **fresh
process** each time — an in-process re-import returns the module cache and the
comparison passes no matter what you did. The digest held at `e44d40f2…` across
all 34.

IB question bank: `lib/ib-question-overrides.ts`, keyed by numeric id. Same
rules apply. Note that the delivery route shuffles option order per question,
so `correct: 0` everywhere is fine there — position leaks nothing, only length
survives shuffling.

## Translating lessons

Lesson content is translated one lesson at a time into
`lib/lessons-i18n/<locale>/<slug>.json`. A translation is a **patch**, not a
copy: it carries only human-readable strings, and `lib/lesson-translations.js`
merges it onto the Vietnamese lesson. Everything structural — `id`, `day`,
`resolvedTrack`, `checkpointIndex`, and above all every `correct` /
`correctOption` index — is read from the Vietnamese side and cannot be
overridden. `difficulty` is not translatable either: it is a Vietnamese string
union used as a *value* across the app, so the UI renders it through
`t.difficulty[...]` instead.

Three rules that are easy to get wrong:

1. **Translate from `lib/lessons-data/<slug>.json`, never from
   `lib/lessons.ts`.** The generator runs `balanceLessonQuizzes`, which
   *reorders* each question's options to strip the positional tell. The
   generated order is not the authored order.
2. **`options` is positional.** Element *i* of the English array must translate
   element *i* of the Vietnamese one, because `correct` comes from the
   Vietnamese lesson. A length mismatch makes the merge discard the whole array
   and fall back to Vietnamese rather than silently shift the answer — that is
   the guard, not a licence to be sloppy.
3. **Convert the decimal separator.** `"Khoảng 1,3%"` must become `"1.3%"`, or
   an English reader reads it as thirteen. Distractors carry their arithmetic
   (`"(= 121 − 120, the interest earned on interest)"`) and that annotation has
   to survive translation intact — it is what makes the distractor a mistake a
   learner actually makes rather than a bare number.

A slug with a hand-authored page under `app/bai-hoc/<slug>/` **cannot** be
translated this way; `scripts/build-translation-index.mjs` fails the build if one
is. Next serves the bespoke page ahead of the data-driven route, and those pages
are `"use client"` with their content written inline — they never call
`getLessonBySlug`, so the translation would sit in the repo looking done and
change nothing. Same defect as a shadowed `sections` override.

Delivery is just `app/bai-hoc/[slug]/page.tsx` reading `getServerLocale()`. There
is no locale route segment and no rewrite. An earlier version of this work built
a parallel `/en` route plus a proxy rewrite to avoid making that page dynamic —
worth recording because the reasoning was sound and the premise was false. The
page's own comment claimed it was CDN-served, and `generateStaticParams` was
still there; but `app/layout.tsx` calls `getServerLocale()` to seed the i18n
provider, and a root layout that reads a cookie makes every route beneath it
dynamic. `next build` reports `ƒ /bai-hoc/[slug]`, not `○`. The machinery
protected a property the app had already lost. **Check `next build` output
before optimising around static rendering in this repo.**

**The length gates are per-language.** `MAX_LENGTH_BIAS_Z`, `MAX_TELL_SHARE` and
the hollow-option patterns all measure character lengths and Vietnamese opener
phrases, so they say nothing about the English corpus. Translating a question
changes all four option lengths: English can sit at z = 8 while Vietnamese is
green. Run both:

```
npm run audit:lessons        # Vietnamese
npm run audit:lessons:en     # the translated corpus, its own baseline
```

**There is a THIRD length direction, and fixing the first two created it.**
`MAX_LENGTH_BIAS_Z` measures "uniquely longest" and "uniquely shortest"
separately, so a corpus that is rarely either passes both gates - while the
correct answer sits in the MIDDLE of the four lengths systematically. Eliminate
the longest and the shortest option, guess between the two survivors, and you are
ahead of chance.

Measured, not hypothesised. After a round of batches were told "do not let the
correct answer be the longest", the English corpus read longest 24% and shortest
20% - both comfortably inside their ceilings - with the correct answer in the
middle on **58.9% of questions against a 52.8% expectation, z = +5.2**. The cause
is mechanical: the agents fixed a longest-bias by TRIMMING the correct answer,
which does not make it the shortest. It makes it neither.

`MAX_MIDDLE_BIAS_Z` now gates that direction too, per track and overall, against
the same tie-aware expectation. Vietnamese passes it untouched (worst |z| 3.29),
which is the property a new gate should have - set at the level the corpus
already meets.

The rule this yields, and it is the important one: **fix a length tell by
rewriting a DISTRACTOR, never by trimming the correct answer.** Rule 1 already
says the correct option states the claim and nothing more, so there is nothing
to trim without losing the claim - and every trim pushes the answer toward the
middle, where the third gate now catches it.

**Translating a batch is two passes, not one.** Translation drifts toward the
length tell on its own, and telling the translator to aim for chance level does
not stop it: a faithful English rendering of a correct Vietnamese answer comes
out longer and more explanatory than the distractors beside it, because that is
what a correct answer sounds like. Measured on the first 55 lessons — the
instruction was in the brief, and the batches still landed at 32.3% and then
again near 30% "correct answer is the uniquely longest option", against a
`MAX_TELL_SHARE` of 27%.

So the second pass is part of the job, not a repair: translate, then run
`node scripts/audit-lesson-content.mjs --locale=en`, then rewrite distractors
until the share is near 25%. A rebalance pass over 46 lessons took them from
32.3% to 21.8% by lengthening 18 distractors in 9 files, and every fix was a
distractor made longer by the misconception or the arithmetic that produces it —
never the correct answer trimmed, which is how the Vietnamese corpus ended up
drifting the other way to z = −4.6.

Watch that this does not turn into a race: the English corpus crossed 300
questions while a rebalance and a translation batch ran at the same time, and the
total share went back up as fast as it came down. Rebalance the batch you just
wrote, before writing the next one.

The share ceilings are reported but not enforced below 400 questions
(`MIN_QUESTIONS_FOR_SHARE_GATES`) — at 50 questions a share moves 2 points per
question, so it would go red on a coin flip. `MAX_LENGTH_BIAS_Z` is enforced at
every size; that is what a z-score is for.

## Translating the UI

UI copy lives in `lib/i18n/dictionaries/vi.ts`, with `en.ts` typed as
`Dictionary` so a key present in one and missing from the other is a compile
error. One section per screen, named after the file that renders it.

Conventions worth knowing before you start a file:

- **Markup inside a sentence gets split into segments**, not smuggled into a
  dictionary value. `Cuộn hết 100% nội dung <strong>và</strong> làm xong quiz`
  becomes `autoPart1` / `autoAnd` / `autoPart2` — a value carrying HTML would
  need `dangerouslySetInnerHTML` to render, and word order differs by language
  anyway.
- **Interpolate with `format()`** from `lib/i18n`, not template literals:
  `format(t.x.count, { done, total })`. An unknown placeholder is left visibly
  intact rather than becoming `undefined`.
- **Dates go through `intlLocale(locale)`**, never a hard-coded `"vi-VN"`.
  English maps to `en-GB` on purpose so the day stays first — `en-US` would
  silently turn 03/04 into a different date beside its Vietnamese neighbours.
- **A component renders twice** on several screens (desktop and mobile) with
  different label lengths. Those share a key pair `x` / `xShort`.
- **Sub-components need their own `useI18n()`.** Threading `t` down as a prop to
  translate three `alt` attributes touches every call site.
- `difficulty` and the `TRACKS` copy are rendered through `t.difficulty[...]` and
  `t.tracks[...]`; the underlying Vietnamese values stay canonical because they
  are used as lookup keys elsewhere.

### Two scripts, and why there are two

```
node scripts/i18n-coverage.mjs          # what is left (drive this to 0)
node scripts/i18n-scan.mjs              # Vietnamese-diacritic view, per category
```

`i18n-coverage.mjs` is the one to trust. It parses with the TypeScript compiler
and reports **hard-coded strings in display positions** — JSX text, display
attributes (`title`, `alt`, `placeholder`, `aria-label`, …), `toast`/`alert`
arguments, and string literals inside a `{…}` container in JSX children. It says
nothing about language, so it catches undotted Vietnamese ("Xong") and
already-English copy ("Hot") alike, both of which render untranslated.

`i18n-scan.mjs` answers a narrower question — "does this look Vietnamese?" — and
is useful for triaging by category, but it **cannot** answer "is anything left".
Three separate blind spots were found in it by hand, in both directions:

| defect | effect | why it happened |
| --- | --- | --- |
| counted strings in comments | overstated by ~250 | comments quote the strings they explain |
| skipped multi-line JSX text | hid ~1,900 | prose is wrapped by the formatter |
| diacritics only | still misses `"Xong"`, `"Hot"` | inherent to the approach |

The coverage script had its own version of the same lesson: its first draft used
a regex for JSX text and reported `useState<Theme>` as copy. Both scripts respect
`/* i18n-ignore-start: reason */ … /* i18n-ignore-end */`, which requires a
reason and prints the excluded count so nothing disappears quietly.

That last clause used to be true of `i18n-scan.mjs` only. `i18n-coverage.mjs`
silently dropped ignored strings from its total, which meant an ignore block and
finishing the work looked identical from the outside - the number just went down.
It reports the count now, and the first honest reading was **101 strings already
under `i18n-ignore`**. Treat that number with more suspicion than the headline:
every one of them is an unreviewed claim that a string is not copy. The
legitimate cases in this repo are all the same shape - a value that is already
persisted, so translating it orphans stored data: `REACTION_OPTIONS` written into
`post.my_reaction` and compared with `===`, the hashtags `getPostCategory` finds
in stored post content, `ASSET_STORAGE_KEYS` used as the keys of each user's
saved `assets_breakdown` JSON, and `rarity` on the RPG inventory items.

**The coverage number was a floor, and module-scope data was the biggest hole in
it.** That hole is now closed, and closing it took the total from 1,015 to 2,238:
1,223 strings that render on screen every day had never appeared in the report,
because they sit in a `const` at the top of a file rather than in a display
position. It was found by hand five separate times before anyone fixed the
script — `KINGDOM_BUILDINGS`, `TONE_STYLE`, `SKILL_TREE`, `ScrollytellingPinnedSection`'s
`PANELS`, and four `lib/*.ts` teaching-content modules — which is the signature of
a measurement gap rather than five unrelated oversights.

The `data` rule reports strings inside a top-level `const` array or object. Its
scope is narrow on purpose: only module scope, only property names that are not
in `NON_COPY_FIELDS` (`id`, `slug`, `href`, `className`, `ticker`, `correct`, …),
and every existing shape filter still applies, so ids, routes, Tailwind classes
and enum values stay out. Sampling four of the newly-reported files found zero
false positives, but two shapes did have to be excluded after the first run, and
both were excluded in the SCRIPT rather than by wrapping them in
`i18n-ignore`: a `dynamic(() => import("…"))` module specifier, and a bare array
element that is one word with no diacritics (`const QUIZ_OPTION_TYPES =
["Analytical", "Compliance", …] as const` is a union type, never rendered). Copy
in a bare array is a sentence; an enum member is one word. A gate that cries wolf
is a gate people learn to ignore, so a false positive belongs in the rule, not in
a suppression comment.

It also surfaced a category that needs a different fix, not a dictionary:
`app/api/world-boss/route.ts` builds 62 strings of boss names and flavour text on
the server and sends them to the client. A dictionary section cannot reach that —
either the route reads the locale, or it returns ids the client resolves.

One blind spot was predicted here and then **measured, and it is empty** — so do
not build the detector for it. The prediction was: display strings that pass
through a local variable (`const label = "…"` rendered as `{label}`) inside a
component body, with "expect the number to rise again when someone closes that".

It does not rise. A probe over every `.tsx` in the repo — local `const`/`let`
whose initializer is a string literal, template literal, ternary or `??`/`||`
chain of string literals, whose identifier is then referenced anywhere inside a
JSX expression container, a display attribute, or a `toast`/`alert` argument —
returns **10 candidates, and all 10 are non-copy**. Not a sample; that is the
complete list:

| shape | n | example |
| --- | --- | --- |
| template building an id, URL, lookup key, coordinate or counter | 6 | `` `${activeTrack}-${stage.label}` `` |
| Tailwind class list | 2 | `sm:grid-cols-2 lg:grid-cols-4` |
| hex colour | 1 | `#fbbf24` |
| CSS transform | 1 | `rotateY(…)` |

The probe was verified against a synthetic fixture carrying four true positives
(plain literal rendered as `{label}`, literal in a `title=`, ternary, template
with a substitution) and found all four — so the zero is a property of the
codebase, not a broken probe. The reason is structural: a component that needs a
string either writes it inline in JSX or reads `t.x.y`; naming it first buys
nothing.

Adding the rule anyway would report those 10 every run. AGENTS.md already
records two detectors thrown away for exactly that ("a noisy gate is a gate
people learn to ignore"); this is the third, recorded so nobody builds it a
fourth time.

### Guard rails

`lib/__tests__/dictionary-parity.test.ts` catches what `tsc` cannot: `tsc` proves
a key *exists* in `en.ts`, not that it was *translated*. Pasting the Vietnamese
value in to satisfy the type compiles fine and ships Vietnamese to an English
reader. The test flags English values containing Vietnamese diacritics, verbatim
copies of the Vietnamese longer than a shared loanword, and keys left in `en.ts`
after being removed from `vi.ts`.

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
npm run audit:lessons:en                               # translated lessons
node scripts/audit-ib-option-length.mjs                # IB question bank, per category
node scripts/audit-ib-option-length.mjs --ids <cat>    # per-question lengths
node scripts/i18n-coverage.mjs                         # untranslated UI strings
node scripts/i18n-coverage.mjs <file>                  # per-file, with line numbers
```

`audit-ib-option-length.mjs` chỉ IN và luôn thoát 0 - nó là bảng đọc theo nhóm
lúc đang viết lại một lô, không phải cổng. Cổng của ngân hàng IB nằm ở
`lib/__tests__/ib-question-bank.test.ts` và chạy cùng `npx vitest run`. Chú thích
đầu file bộ kiểm từng nói cổng đã nằm ở đó trong khi chưa có gì, nên đọc con số
nó in ra với cỡ mẫu trong đầu: một nhóm 8 câu hiện 50% là bốn câu, cách 25% đúng
một lần tung đồng xu.

**Quiz cũng nằm trong `app/bai-hoc/<slug>/page.tsx`.** Một số bài có trang
viết tay riêng, và mảng `quiz` của chúng là literal trong chính file đó - không
có bản nào trong `lib/lessons-data`. Suốt đời bộ kiểm này chúng vô hình, trong
khi `LessonPageLayout` vẫn ghi `quiz_score` của chúng vào Supabase như mọi bài
khác. Lúc phát hiện, 58 câu ở đó đứng ở **z = +9,03** cho mẹo "chọn phương án
dài nhất" - đúng cái lỗi 91% mà cả kho kia đã mất công dọn - trong khi mọi con
số bộ kiểm in ra đều xanh, vì nó chỉ đọc `lib/lessons-data`.

`scripts/hand-authored-quizzes.mjs` đọc chúng, và bộ kiểm chấm chúng bằng cùng
thước đo (`handAuthored` là một track riêng trong bảng). Ba cổng nội dung còn
lại không áp được: nội dung dạy của những bài này nằm trong JSX chứ không phải
mảng `sections`.

### Câu hỏi có chấm điểm mà KHÔNG nằm trong repo

Mọi cổng ở trên là script hoặc test đọc file trong repo, nên chúng phủ được đúng
những gì repo chứa. Có ít nhất một kho quiz có chấm điểm nằm ngoài phạm vi đó,
và điểm mù này khác điểm mù trên về bản chất: bài viết tay chỉ cần một trình đọc
mới là đo được, còn kho dưới đây thì không có file nào để đọc, kể cả khi đã biết
nó tồn tại.

| kho | ở đâu | cổng |
| --- | --- | --- |
| quiz bài học | `lib/lessons-data/*.json` | `npm run audit:lessons` |
| quiz bài viết tay | `app/bai-hoc/<slug>/page.tsx` | cùng bộ kiểm, qua `hand-authored-quizzes.mjs` |
| ngân hàng IB | `lib/ib-question-bank.ts` + overrides | `lib/__tests__/ib-question-bank.test.ts` |
| item set CFA | `lib/cfa-item-sets.ts` | `cfa-advanced-practice.test.ts` (cấu trúc; 20 câu, quá nhỏ để gác phân bố) |
| **quiz module CFA** | **bảng `ModuleQuizQuestion` trên Supabase** | **chỉ đường ghi** |

Quiz module CFA được gõ qua `/admin/cfa-library` và ghi `quiz_score` vào
`cfa_module_progress` qua `lib/supabase-cfa-progress.ts`. Không script tĩnh nào
với tới được nó.

Điểm đó **không** chảy vào `avg_quiz_score` - `recalculateUserStats` chỉ đọc
`user_progress` - và cũng **không** vào `cfa_readiness`, vốn đếm số module đã
hoàn thành chứ không đọc điểm. Mà hoàn thành thì `handleQuizFinish` ghi ngay khi
làm xong quiz, không có điểm sàn. Nên kho này là loại *hình thành*, giống
`practicePrompt`: một câu đoán được không làm sai con số nào, nó chỉ lấy mất của
người học phép thử duy nhất họ có để biết mình đã hiểu hay chưa, và trả lại một
câu trả lời sai về chính điều đó.

Đây là mức thiệt hại nhẹ hơn quiz bài học, và đáng ghi đúng như vậy: bản đầu của
đoạn này viết rằng điểm đó nuôi `cfa_readiness`, và phải lần theo
`career-profile/route.ts` tới `computeCompetencyScores` mới thấy là không.

Nội dung sống trong cơ sở dữ liệu thì chỗ duy nhất chặn được là **đường ghi**.
`lib/option-length-tell.ts` chạy ở đúng chỗ đó, lúc lưu một câu hỏi trong trang
quản trị, và nó **cảnh báo chứ không chặn**: đáp án đúng *nên* là phương án dài
nhất ở khoảng một phần ba số câu ba phương án, nên chặn lưu sẽ ép người soạn
viết lệch sang chiều ngược lại - đúng cách kho bài học từng trôi tới z = −4,6.

Nếu sau này có thêm nội dung học nào chuyển vào cơ sở dữ liệu, đây là hình dạng
cần lặp lại: kiểm ở đường ghi, cảnh báo chứ không chặn, và ngưỡng hẹp. Đừng dựng
một bộ kiểm đọc Supabase - nó cần thông tin đăng nhập, không chạy được trong CI,
và một cổng chỉ chạy khi có người nhớ chạy tay thì không phải cổng.

The lesson audit gates CI on three things:

- `MAX_LENGTH_BIAS_Z` — how far each track, and the corpus, sits from chance on
  "is the correct answer the uniquely longest / shortest option", measured in
  standard deviations against a tie-aware expectation. **A z-score rather than a
  share**, for three reasons a share cannot handle: a track can drift while the
  total stays flat; 543 questions and 2,469 questions have different noise
  floors, so one percentage means two different things; and a share ceiling is
  blind to drift *below* chance, which is where the corpus actually went. Sits
  at 5 because the worst track is at 4.6. Lower it after a rewrite batch; never
  raise it to make a build pass.
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
