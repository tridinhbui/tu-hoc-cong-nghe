// Content QA audit: scans every generated lesson JSON (lib/lessons-data/*.json)
// against the minimum-quality bar from the content-upgrade plan and prints a
// report of which lessons fail which check, grouped by track so personal/
// professional lessons (the main learning path) can be prioritized over bonus.
//
// Run with: npm run audit:lessons (or node scripts/audit-lesson-content.mjs).
// Re-run after lib/lessons.ts changes + `node scripts/generate-lesson-data.mjs`.
//
// Exits 1 when any lesson fails, so this can gate a commit hook or CI step.
// It used to always exit 0, which meant a newly authored lesson missing a
// diagram could only be caught by someone reading the output - and every
// batch of new lessons silently reintroduced failures. Pass --warn-only to
// get the old behaviour when you want the report without the gate.

import { readFileSync, readdirSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "lib/lessons-data");

const MIN_QUIZ_COUNT = 2;
const MIN_EXPLANATION_LEN = 150;

function isPersonalOrProfessionalTrack(lesson) {
  // `resolvedTrack` is computed by scripts/generate-lesson-data.mjs from the
  // real stage ranges in lib/track-stages.ts.
  //
  // This used to re-declare those ranges here as "personal = 1-20, 201-288;
  // professional = 21-200, 1036", which stopped being true a long time ago:
  // every lesson at id 1000+ fell through to "bonus", so roughly thirteen
  // professional stages - Định lượng, Excel, thị trường VN, private markets,
  // the whole AI chặng - were reported under a bucket the report exists to
  // deprioritize. The professional tell share read far healthier than it was
  // and the bonus share far worse.
  return lesson.resolvedTrack ?? "bonus";
}

function auditLesson(lesson) {
  const issues = [];
  if ((lesson.quiz ?? []).length < MIN_QUIZ_COUNT) {
    issues.push(`quiz count ${lesson.quiz?.length ?? 0} < ${MIN_QUIZ_COUNT}`);
  }
  if ((lesson.explanation ?? "").length < MIN_EXPLANATION_LEN) {
    issues.push(`explanation length ${lesson.explanation?.length ?? 0} < ${MIN_EXPLANATION_LEN}`);
  }
  const hasDiagram = (lesson.diagram ?? []).length > 0;
  const hasInteractive = lesson.interactiveType && lesson.interactiveType !== "none";
  if (!hasDiagram && !hasInteractive) {
    issues.push("no diagram and no interactiveType");
  }
  if (!lesson.openingQuestion || (lesson.openingOptions ?? []).length === 0) {
    issues.push("missing openingQuestion/openingOptions");
  }
  return issues;
}

const files = readdirSync(dataDir).filter((f) => f.endsWith(".json") && f !== "_index.json");

const results = { personal: [], professional: [], bonus: [] };

for (const file of files) {
  const lesson = JSON.parse(readFileSync(path.join(dataDir, file), "utf8"));
  const issues = auditLesson(lesson);
  if (issues.length === 0) continue;
  const track = isPersonalOrProfessionalTrack(lesson);
  results[track].push({ id: lesson.id, slug: lesson.slug, title: lesson.title, issues });
}

for (const track of ["personal", "professional", "bonus"]) {
  const rows = results[track].sort((a, b) => a.id - b.id);
  console.log(`\n=== ${track.toUpperCase()} (${rows.length} lessons failing) ===`);
  for (const row of rows) {
    console.log(`  [${row.id}] ${row.slug} - ${row.issues.join("; ")}`);
  }
}

const total = results.personal.length + results.professional.length + results.bonus.length;
console.log(`\nTotal lessons checked: ${files.length}`);
console.log(`Total failing at least one check: ${total}`);

// ── Quiz guessability ──────────────────────────────────────────────────────
//
// The checks above are per-lesson minimums and every lesson now passes them,
// which hid a corpus-wide defect: of 1,501 quiz questions, 1,378 (91%) had the
// correct answer as the *longest* of the four options - median 115 characters
// against 45 for a distractor. Picking the longest option scores 91% with no
// finance knowledge at all, and lesson quizzes are not cosmetic: they feed
// avg_quiz_score, the /kiem-tra track quizzes, the lesson-unlock gate
// challenge, XP, and the competency scores on /su-nghiep.
//
// lib/lesson-quiz-balance.js already fixed the sibling positional tell
// (47.9% of answers sat at index 1) as a build-time transform. Length can't be
// fixed mechanically - a shorter correct answer has to be written - so the
// rewrite proceeds batch by batch behind the two gates below.
//
// Two gates, because a plain count ratchet turned out to be the wrong shape:
// within an hour of adding one, 82 questions arrived in newly authored lessons
// (ids 1341-1366) carrying the same defect, which blew a budget that had just
// been lowered by a rewrite batch. Counting alone can't tell "someone fixed
// nothing" apart from "the corpus grew".
//
//   1. MAX_TELL_SHARE - the share of all questions with the tell. Immune to
//      corpus growth, and ratcheted down batch by batch from 0.91 while the
//      rewrite ran. That ratchet is now retired: the corpus reached 24.8%,
//      which IS chance level for four options, so there is nothing left to
//      squeeze. It was briefly set to 0.2488 - two hundredths of a percent of
//      headroom - and the next ordinary edit, five questions changing length
//      somewhere in 2,418, turned CI red without anything having regressed.
//      The ceiling now sits at 0.27: above the noise floor, far below the
//      defect it was built to catch. Raise it only if the corpus grows a
//      structurally different shape; never to make a red build pass.
//   2. lesson-quiz-tell-baseline.json - the grandfathered list of lessons that
//      currently fail per-lesson. A lesson NOT on that list must pass, so a
//      newly authored lesson cannot add to the backlog. Nothing is ever added
//      to the list, so it only shrinks; a listed lesson that now passes is
//      reported as a reminder to drop it (--write-baseline), never as a failure.
//
// Authoring rule for a rewrite: the correct option states the claim only (its
// reasoning belongs in the question's `explanation`, shown right after
// answering), each distractor is a mistake a learner actually makes - not an
// absurdity like "luôn đúng 100%" that can be eliminated on sight - and one
// distractor is longer than the correct option in ~3 of every 4 questions.
const MAX_TELL_SHARE = 0.27;

/** The same ceiling for the opposite direction, added after the rewrite of the
 *  last 47 grandfathered lessons drove the longest share to 20% - past chance,
 *  which is not a win. Measuring only one direction let the correct option
 *  become the uniquely shortest in 32% of questions against a 25% chance level,
 *  so "always pick the shortest" had quietly become a real edge while every
 *  number this audit printed kept improving. That is the predictable cost of
 *  the authoring rule "state the claim, nothing more" applied without also
 *  watching what it does to the distribution.
 *
 *  Counted only when the minimum is unique, since a tie for shortest still
 *  leaves the guesser a coin flip. Ceiling set just above the measured share:
 *  it exists to stop the drift getting worse, not to declare it fixed. */
const MAX_SHORTEST_SHARE = 0.33;

/** A lesson fails when this share of its questions have the correct answer as
 *  the longest option. At 4 options, chance level is 25%. A tie for longest
 *  counts - three lessons passed the eyeball test and still failed here because
 *  their correct option matched the longest distractor to the character. */
const PER_LESSON_TELL_LIMIT = 0.75;
const MIN_QUESTIONS_FOR_TELL_CHECK = 2;

const baselinePath = path.join(__dirname, "lesson-quiz-tell-baseline.json");
const baseline = new Set(JSON.parse(readFileSync(baselinePath, "utf8")).lessons);

const quizStats = { personal: null, professional: null, bonus: null };
for (const track of Object.keys(quizStats)) {
  quizStats[track] = { questions: 0, longest: 0, shortest: 0, ratioSum: 0 };
}

/** Lessons failing the per-lesson bar but absent from the baseline - i.e. new
 *  or newly regressed, which is what the gate exists to catch. */
const unbaselined = [];
/** Baselined lessons that now pass, so the baseline must shrink. */
const fixedButStillBaselined = [];

for (const file of files) {
  const lesson = JSON.parse(readFileSync(path.join(dataDir, file), "utf8"));
  const stats = quizStats[isPersonalOrProfessionalTrack(lesson)];
  const questions = lesson.quiz ?? [];
  let lessonLongest = 0;
  for (const question of questions) {
    const lengths = (question.options ?? []).map((option) => String(option).length);
    if (lengths.length === 0) continue;
    const correctLength = lengths[question.correct] ?? 0;
    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    stats.questions++;
    if (correctLength === Math.max(...lengths)) {
      stats.longest++;
      lessonLongest++;
    }
    // The other direction, which this audit was blind to for its whole life.
    // Rewriting the correct option down to the bare claim while distractors
    // stay full sentences fixes "longest wins" and quietly builds "shortest
    // wins" in its place - and a bank where the answer is always the shortest
    // is exactly as guessable as one where it is always the longest. Measured
    // only when the minimum is unique: a tie for shortest leaves a guess
    // between the tied options, so it is not on its own exploitable.
    const minLength = Math.min(...lengths);
    if (correctLength === minLength && lengths.filter((l) => l === minLength).length === 1) {
      stats.shortest++;
    }
    stats.ratioSum += mean > 0 ? correctLength / mean : 0;
  }

  if (questions.length < MIN_QUESTIONS_FOR_TELL_CHECK) continue;
  const failsPerLesson = lessonLongest / questions.length >= PER_LESSON_TELL_LIMIT;
  if (failsPerLesson && !baseline.has(lesson.slug)) {
    unbaselined.push({ slug: lesson.slug, id: lesson.id, longest: lessonLongest, total: questions.length });
  } else if (!failsPerLesson && baseline.has(lesson.slug)) {
    fixedButStillBaselined.push(lesson.slug);
  }
}

const totalQuestions = Object.values(quizStats).reduce((sum, s) => sum + s.questions, 0);
const totalLongest = Object.values(quizStats).reduce((sum, s) => sum + s.longest, 0);
const totalShortest = Object.values(quizStats).reduce((sum, s) => sum + s.shortest, 0);

console.log(`\n=== QUIZ GUESSABILITY (chance level for 4 options is ~25%) ===`);
for (const [track, stats] of Object.entries(quizStats)) {
  if (stats.questions === 0) continue;
  const percent = Math.round((stats.longest / stats.questions) * 100);
  console.log(
    `  ${track.padEnd(13)} ${String(stats.questions).padStart(5)} questions  ` +
      `${String(stats.longest).padStart(5)} longest (${String(percent).padStart(3)}%)  ` +
      `${String(stats.shortest).padStart(5)} shortest (${String(Math.round((stats.shortest / stats.questions) * 100)).padStart(3)}%)  ` +
      `avg ratio ${(stats.ratioSum / stats.questions).toFixed(2)}`
  );
}
const tellShare = totalQuestions > 0 ? totalLongest / totalQuestions : 0;
const shortestShare = totalQuestions > 0 ? totalShortest / totalQuestions : 0;
console.log(
  `  ${"TOTAL".padEnd(13)} ${String(totalQuestions).padStart(5)} questions  ` +
    `${String(totalLongest).padStart(5)} longest (${Math.round(tellShare * 100)}%)  ` +
    `${String(totalShortest).padStart(5)} shortest (${Math.round(shortestShare * 100)}%)  ` +
    `ceilings ${Math.round(MAX_TELL_SHARE * 100)}% / ${Math.round(MAX_SHORTEST_SHARE * 100)}%`
);
// Printed unrounded because the rounded percentage above has twice now been
// read straight into MAX_TELL_SHARE, turning the gate red on the very batch
// that lowered it: a displayed "75%" was an actual 75.4%, then 74.5%.
console.log(`  exact share ${tellShare.toFixed(4)} — set MAX_TELL_SHARE no lower than this`);
console.log(
  `  baseline: ${baseline.size} lessons grandfathered  ·  ` +
    `${unbaselined.length} not baselined  ·  ${fixedButStillBaselined.length} fixed but still listed`
);

const tellFailures = [];

// ── Slug trùng trong lesson-quiz-overrides.js ──────────────────────────────
//
// lessonOverrides là một object literal, nên khai báo cùng một slug hai lần
// không phải lỗi - key sau lặng lẽ thắng key trước. Chuyện này đã xảy ra với
// 27 slug: ai đó append một entry chỉ có `quiz` cho slug vốn đã override cả
// bài, và diagram/sections/explanation/keyTakeaways/summary của 24 bài bị vứt.
//
// Không check nào ở trên bắt được: file vẫn parse, mọi lesson vẫn qua bar nội
// dung (vì nó rơi về bản gốc trong lessons.ts), và phần đo tell chỉ đọc `quiz`
// - đúng cái key mà entry thắng luôn có. Triệu chứng duy nhất là nội dung đã
// biên tập âm thầm biến mất khỏi bài học.
//
// Đọc thẳng source thay vì import module: import xong thì các key trùng đã bị
// gộp mất rồi, đúng thứ cần phát hiện.
const overridesPath = path.join(root, "lib/lesson-quiz-overrides.js");
const overridesSource = readFileSync(overridesPath, "utf8");
const slugSeen = new Map();
for (const match of overridesSource.matchAll(/^ {2}"([a-z0-9-]+)": patch\(\{$/gm)) {
  slugSeen.set(match[1], (slugSeen.get(match[1]) ?? 0) + 1);
}
const duplicateSlugs = [...slugSeen].filter(([, n]) => n > 1);
if (duplicateSlugs.length > 0) {
  tellFailures.push(
    `${duplicateSlugs.length} slug(s) khai báo nhiều lần trong lib/lesson-quiz-overrides.js - ` +
      `entry sau lặng lẽ che entry trước, mọi key chỉ có ở entry trước sẽ mất:\n` +
      duplicateSlugs.map(([slug, n]) => `    ${slug} (${n} entry)`).join("\n") +
      `\n  Gộp chúng thành một entry. Xoá bớt entry là sai trừ khi đã đối chiếu ` +
      `từng key - entry bị che thường chứa diagram/sections/explanation mà entry ` +
      `thắng không có.`
  );
}

if (shortestShare > MAX_SHORTEST_SHARE) {
  tellFailures.push(
    `${totalShortest}/${totalQuestions} questions (${Math.round(shortestShare * 100)}%) have the correct ` +
      `answer as the uniquely shortest option, over the ${Math.round(MAX_SHORTEST_SHARE * 100)}% ceiling. ` +
      `Chance is 25%; lengthen the correct option rather than padding a distractor.`
  );
}

if (tellShare > MAX_TELL_SHARE) {
  tellFailures.push(
    `${totalLongest}/${totalQuestions} questions (${Math.round(tellShare * 100)}%) have the correct ` +
      `answer as the longest option, over the ${Math.round(MAX_TELL_SHARE * 100)}% ceiling.`
  );
}

if (unbaselined.length > 0) {
  tellFailures.push(
    `${unbaselined.length} lesson(s) fail the per-lesson length-tell check and are not grandfathered ` +
      `in scripts/lesson-quiz-tell-baseline.json:\n` +
      unbaselined
        .sort((a, b) => a.id - b.id)
        .map((row) => `    [${row.id}] ${row.slug} - ${row.longest}/${row.total} questions`)
        .join("\n") +
      `\n  Rewrite their options. Adding them to the baseline is not the fix - the baseline exists ` +
      `only to grandfather the pre-existing backlog.`
  );
}

// Shrinking the baseline is the routine follow-up to a rewrite batch, so it
// gets a flag rather than a hand edit of 437 entries. It only ever removes
// slugs: anything that still fails stays, and anything not already listed is
// never added, so the flag can't be used to launder a new failure.
if (process.argv.includes("--write-baseline")) {
  const kept = [...baseline].filter((slug) => !fixedButStillBaselined.includes(slug)).sort();
  const current = JSON.parse(readFileSync(baselinePath, "utf8"));
  writeFileSync(baselinePath, `${JSON.stringify({ ...current, lessons: kept }, null, 2)}\n`);
  console.log(
    `\nBaseline rewritten: ${baseline.size} -> ${kept.length} lessons ` +
      `(removed ${fixedButStillBaselined.length}).`
  );
  process.exit(0);
}

// A stale baseline entry is a warning, never a failure: it means someone
// improved a lesson, and an improvement must not turn the build red. Tried it
// as a hard failure first and it was unworkable - every lesson fixed in a
// parallel branch broke CI until the list was regenerated, which trains people
// to stop fixing lessons. The monotonic-shrink guarantee doesn't depend on it
// anyway: nothing ever *adds* to the list, and MAX_TELL_SHARE still ratchets.
if (fixedButStillBaselined.length > 0) {
  console.log(
    `\n  ${fixedButStillBaselined.length} lesson(s) now pass the length-tell check but are still ` +
      `listed in scripts/lesson-quiz-tell-baseline.json.\n` +
      `  Run \`node scripts/audit-lesson-content.mjs --write-baseline\` to drop them:\n` +
      fixedButStillBaselined.map((slug) => `    ${slug}`).join("\n")
  );
}

if (tellFailures.length > 0 && !process.argv.includes("--warn-only")) {
  console.error(`\n${tellFailures.join("\n\n")}`);
  process.exit(1);
}

if (total > 0 && !process.argv.includes("--warn-only")) {
  console.error(
    `\n${total} lesson(s) below the minimum content bar. Each needs at least ` +
      `${MIN_QUIZ_COUNT} quiz questions, a ${MIN_EXPLANATION_LEN}+ char explanation, ` +
      `an openingQuestion with options, and either a diagram or an interactiveType.\n` +
      `Fix them in lib/lessons.ts (or lib/lesson-quiz-overrides.js for slugs it ` +
      `overrides), re-run scripts/generate-lesson-data.mjs, then run this again.`
  );
  process.exit(1);
}
