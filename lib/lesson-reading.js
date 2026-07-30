// Word counting over authored lesson bodies, and the two numbers derived
// from it: how long a lesson takes to read, and where its "Dừng & Kiểm tra"
// checkpoint belongs.
//
// Plain .js (not .ts) for the same reason lib/lesson-quiz-balance.js and
// lib/lesson-day-prefix.js are: scripts/generate-lesson-data.mjs imports it
// directly at build time, and that script has no TS loader - it hand-rolls
// ts.transpileModule for lesson content and plain `import` for helpers.
// Computing both numbers at build time keeps them off the request path and,
// more importantly, keeps the reading estimate and the checkpoint position
// derived from one identical word count instead of two drifting ones.

// Vietnamese is largely monosyllabic and the tokenizer below splits on
// whitespace, so a "word" here is closer to a syllable than to an English
// word. Adults read easy Vietnamese prose at roughly 250-350 syllables/min;
// dense finance vocabulary with English terms interleaved sits well below
// that. 160 is deliberately pessimistic - the label exists to make someone
// feel safe starting a lesson, so a estimate that runs over is far more
// damaging than one that runs under.
const WORDS_PER_MINUTE = 160;

// Seconds a block costs beyond reading its words. Formula and table blocks
// carry very little prose but take real time to work through, so a pure
// word count rates them near zero and underestimates exactly the lessons
// that are hardest to finish.
const BLOCK_OVERHEAD_SECONDS = {
  formula: 30,
  conceptTable: 12,
  comparison: 12,
  callout: 4,
};
// Per-item surcharge for blocks whose cost scales with their contents.
const PER_ITEM_OVERHEAD_SECONDS = {
  conceptTable: 8, // per concept row
  list: 2, // per bullet
};

// Keys whose string values are chrome rather than prose - counting them
// would inflate short lessons made of many small blocks.
const NON_PROSE_KEYS = new Set(["type", "symbol", "label", "en"]);

/** Every prose string reachable inside a section block, at any depth.
 *  Walks the object rather than switching on `block.type` so a new block
 *  type added to LessonSectionBlock is counted automatically instead of
 *  silently reading as zero words. */
function collectProse(value, key, out) {
  if (typeof value === "string") {
    if (!key || !NON_PROSE_KEYS.has(key)) out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectProse(item, key, out);
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) collectProse(v, k, out);
  }
}

/** Word count of a single section block. */
export function countBlockWords(block) {
  const parts = [];
  collectProse(block, null, parts);
  return parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

/** Seconds a reader spends on one section block: its prose, plus the
 *  block-shape overhead above. This - not the raw word count - is what both
 *  the reading estimate and the checkpoint position are derived from, so
 *  "halfway" means halfway through the *time*, not through the characters. */
export function estimateBlockSeconds(block) {
  const words = countBlockWords(block);
  let seconds = (words / WORDS_PER_MINUTE) * 60;

  const type = block && block.type;
  seconds += BLOCK_OVERHEAD_SECONDS[type] ?? 0;

  const perItem = PER_ITEM_OVERHEAD_SECONDS[type];
  if (perItem) {
    const items = type === "conceptTable" ? block.concepts : block.items;
    seconds += perItem * (Array.isArray(items) ? items.length : 0);
  }

  return seconds;
}

/** Word count of a lesson's readable body. Falls back to the thin
 *  `explanation` field for the older lessons that have no `sections`. */
export function countLessonWords(lesson) {
  if (!lesson) return 0;
  if (Array.isArray(lesson.sections) && lesson.sections.length > 0) {
    return lesson.sections.reduce((sum, block) => sum + countBlockWords(block), 0);
  }
  return typeof lesson.explanation === "string"
    ? lesson.explanation.trim().split(/\s+/).filter(Boolean).length
    : 0;
}

/** Seconds to read a lesson body. Kept in seconds so callers that add their
 *  own overhead (estimateLessonMinutes) round exactly once, at the end. */
export function estimateReadingSeconds(lesson) {
  if (!lesson) return 0;

  if (Array.isArray(lesson.sections) && lesson.sections.length > 0) {
    return lesson.sections.reduce((sum, block) => sum + estimateBlockSeconds(block), 0);
  }

  return (countLessonWords(lesson) / WORDS_PER_MINUTE) * 60;
}

/** Minutes to read a lesson body, rounded up, never below 1. */
export function estimateReadingMinutes(lesson) {
  return Math.max(1, Math.ceil(estimateReadingSeconds(lesson) / 60));
}

// Seconds for the interactive parts wrapped around the body: the opening
// question, each sidebar quiz question, and the mid-article check. These are
// why the hand-authored `duration` strings run consistently longer than the
// body-only reading estimate - they were written to describe the whole
// lesson, not just the article.
const OPENING_QUESTION_SECONDS = 25;
const QUIZ_QUESTION_SECONDS = 25;

/**
 * Minutes for the whole lesson - body plus opening question and quiz. This
 * is the number to show *before* someone opens a lesson, because it is the
 * commitment they are actually deciding about. Use estimateReadingMinutes
 * for anything scoped to scrolling the article itself.
 */
export function estimateLessonMinutes(lesson) {
  if (!lesson) return 1;

  let seconds = estimateReadingSeconds(lesson);
  if (lesson.openingQuestion) seconds += OPENING_QUESTION_SECONDS;
  if (Array.isArray(lesson.quiz)) seconds += lesson.quiz.length * QUIZ_QUESTION_SECONDS;

  return Math.max(1, Math.round(seconds / 60));
}

// How far from the true 50% mark a heading may sit and still be preferred
// over it, as a fraction of the lesson's total words. Headings are the only
// authored break points in a lesson body, so landing on one is worth a
// meaningful detour - but not so much that the check drifts to 30% or 70%.
const HEADING_SNAP_WINDOW = 0.15;

/**
 * Index of the section block the mid-article checkpoint should be rendered
 * *after*, i.e. the checkpoint sits between `sections[i]` and
 * `sections[i + 1]`. Returns -1 when a lesson is too short to be worth
 * interrupting, in which case callers should fall back to placing the check
 * after the whole body.
 *
 * Prefers the heading nearest the halfway point (inserting just *before* it,
 * so the check reads as the end of the previous section rather than an
 * interruption between a heading and its first paragraph) and otherwise
 * falls back to wherever the word count crosses 50%.
 */
export function findCheckpointIndex(sections) {
  if (!Array.isArray(sections) || sections.length < 4) return -1;

  const secondsPerBlock = sections.map(estimateBlockSeconds);
  const total = secondsPerBlock.reduce((a, b) => a + b, 0);
  // Below roughly three minutes there is no drop-off to catch, and a check
  // would just add friction to a lesson someone was going to finish anyway.
  if (total < 180) return -1;

  const halfway = total / 2;

  // Cumulative seconds *before* each block, so `cumulative[i]` is where
  // block i starts on the 0..total time axis.
  const cumulative = [];
  let running = 0;
  for (const seconds of secondsPerBlock) {
    cumulative.push(running);
    running += seconds;
  }

  let bestHeading = -1;
  let bestHeadingDistance = Infinity;
  sections.forEach((block, i) => {
    // i === 0 would put the check above the whole body; the last block has
    // nothing left to gate.
    if (block.type !== "heading" || i === 0 || i === sections.length - 1) return;
    const distance = Math.abs(cumulative[i] - halfway);
    if (distance < bestHeadingDistance) {
      bestHeadingDistance = distance;
      bestHeading = i;
    }
  });

  if (bestHeading !== -1 && bestHeadingDistance <= total * HEADING_SNAP_WINDOW) {
    return bestHeading - 1; // render the check immediately before the heading
  }

  // No usable heading: take the first block that pushes the reader past
  // halfway, then back off if that block is itself a heading (a check
  // wedged between a heading and its body reads as a mistake).
  let crossing = sections.findIndex((_, i) => cumulative[i] + secondsPerBlock[i] >= halfway);
  if (crossing < 0) return -1;
  if (sections[crossing].type === "heading") crossing -= 1;
  // 0 is a legitimate answer - it means one long opening block holds more
  // than half the lesson's reading time, so the check belongs right after
  // it. Only a negative index (a heading at index 0) or the final block
  // (nothing left to gate) are unusable.
  if (crossing < 0 || crossing >= sections.length - 1) return -1;
  return crossing;
}
