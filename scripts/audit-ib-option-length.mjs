// Audits the IB question bank for the "length tell": if the correct option is
// reliably the longest of the four, a learner can score without knowing any
// finance - just pick the longest sentence. That corrupts the two competency
// scores derived from this bank (interview_readiness and ib_readiness in
// lib/career-competency.ts), so it has to be measurable, not vibes.
//
// Usage:
//   node scripts/audit-ib-option-length.mjs            # summary per category
//   node scripts/audit-ib-option-length.mjs --ids      # also list offending ids
//
// With 4 options, "correct is longest" should land near 25% by chance.
//
// This script only PRINTS - it always exits 0, so nothing it reports can fail a
// build. For most of its life that was the whole story: the comment here used
// to claim "the guard in lib/__tests__/ib-question-bank.test.ts enforces the
// ceiling", and no such ceiling existed. The only length test over there checks
// the longest/shortest RATIO of each question one at a time, which says nothing
// about the distribution - a bank where every question sits inside a 3x ratio
// can still have the correct answer as the longest option 90% of the time.
//
// That gate exists now, in the same test file, as a tie-aware two-sided
// z-score over IB_TECHNICAL_QUESTIONS. This script stays what it actually is:
// the per-category readout you look at while rewriting a batch, where a share
// broken down by category is easier to act on than one number.
//
// Read the shares here with the sample size in mind. A category with 8
// questions reading 50% is four questions, which is one coin flip away from
// 25% - that is precisely why the gate is a z-score and not a share.

import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

/** Pulls a JSON array literal out of a TS source file by brace matching from
 *  the `= [` that follows the given export name. */
function extractArrayLiteral(source, exportName) {
  const declaration = source.indexOf(`const ${exportName}`);
  if (declaration === -1) throw new Error(`${exportName} not found`);
  const start = source.indexOf("[", source.indexOf("=", declaration));
  let depth = 0;
  for (let i = start; i < source.length; i++) {
    if (source[i] === "[") depth++;
    else if (source[i] === "]") {
      depth--;
      if (depth === 0) return JSON.parse(source.slice(start, i + 1));
    }
  }
  throw new Error(`unterminated array for ${exportName}`);
}

/** The overrides file is hand-authored TS with comments, so it is read for its
 *  option arrays via a targeted regex rather than parsed as JSON. */
async function loadOverrides() {
  const source = await readFile(path.join(root, "lib", "ib-question-overrides.ts"), "utf8");
  const overrides = new Map();
  // A handful of entries carry a `question:` rewrite before `options:` (see
  // IbQuestionOverride) - the optional group is what keeps those from being
  // skipped and silently audited against the raw scraped options instead.
  const entry = /(\d+):\s*\{\s*(?:question:[\s\S]*?,\s*)?options:\s*\[([\s\S]*?)\],\s*correct:\s*(\d+)/g;
  let match;
  while ((match = entry.exec(source)) !== null) {
    const [, id, optionsBlock, correct] = match;
    const options = [...optionsBlock.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) =>
      m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\")
    );
    overrides.set(Number(id), { options, correct: Number(correct) });
  }
  return overrides;
}

const bankSource = await readFile(path.join(root, "lib", "ib-question-bank.ts"), "utf8");

// Read the behavioral category list out of the source instead of re-listing it
// here: the scored drill only ever draws from the technical questions
// (IB_TECHNICAL_QUESTIONS), so an audit using its own approximation of that
// split would report on a different population than the app actually serves.
const behavioralCategories = new Set(
  [
    ...bankSource
      .slice(
        bankSource.indexOf("IB_BEHAVIORAL_CATEGORIES"),
        bankSource.indexOf("]", bankSource.indexOf("IB_BEHAVIORAL_CATEGORIES"))
      )
      .matchAll(/'([^']+)'|"((?:[^"\\]|\\.)*)"/g),
  ]
    .map((m) => m[1] ?? m[2])
    .filter((value) => value && value !== "IB_BEHAVIORAL_CATEGORIES")
);

function isBehavioral(category) {
  return behavioralCategories.has(category);
}
const raw = extractArrayLiteral(bankSource, "RAW_IB_QUESTION_BANK");
const overrides = await loadOverrides();

const technical = raw
  .filter((q) => !isBehavioral(q.category))
  .map((q) => {
    const override = overrides.get(q.id);
    return {
      id: q.id,
      category: q.category,
      options: override ? override.options : q.options,
      correct: override ? override.correct : q.correct,
      overridden: Boolean(override),
    };
  });

// Ngân hàng viết riêng theo nghề (lib/career-question-bank.ts) đi qua đúng
// route giao đề đó, nên nó phải chịu cùng phép đo. Bỏ nó ra ngoài thì cứ mỗi
// nghề được viết bộ câu hỏi mới là một vùng không ai đo - đúng cách 25 nghề
// trắng câu hỏi đã tồn tại lâu đến vậy mà không ai thấy.
const careerSource = await readFile(path.join(root, "lib", "career-question-bank.ts"), "utf8");
// extractArrayLiteral chạy qua JSON.parse, mà file kia có comment phân nhóm
// theo nghề nằm ngay trong mảng - bỏ các dòng comment đi trước khi bóc tách.
// Bộ IB là dữ liệu cào nên vốn đã đúng cú pháp JSON. File viết tay thì không:
// nó có comment phân nhóm, key không đặt trong ngoặc kép, và dấu phẩy cuối -
// cả ba đều hợp lệ trong TS và đều làm JSON.parse chết. Chuẩn hóa ở đây thay
// vì bắt file dữ liệu viết tay phải trông như JSON.
const careerLiteral = careerSource
  .split("\n")
  .filter((line) => !line.trimStart().startsWith("//"))
  .join("\n")
  .replace(/^(\s*)([A-Za-z_]\w*):/gm, '$1"$2":')
  .replace(/,(\s*[}\]])/g, "$1");
for (const q of extractArrayLiteral(careerLiteral, "CAREER_TECHNICAL_QUESTIONS")) {
  technical.push({ id: q.id, category: q.category, options: q.options, correct: q.correct, overridden: false });
}

const byCategory = new Map();
let longestTotal = 0;
let shortestTotal = 0;
const offenders = [];

for (const q of technical) {
  const lengths = q.options.map((o) => o.length);
  const correctLength = lengths[q.correct] ?? 0;
  const maxLength = Math.max(...lengths);
  const meanLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const isLongest = correctLength === maxLength;
  const isShortest = correctLength === Math.min(...lengths);
  if (isShortest) shortestTotal++;
  // Ratio against the mean is the more honest measure: an option can be
  // "not the longest" and still stand out by being 60% above average.
  const ratio = meanLength > 0 ? correctLength / meanLength : 0;

  if (isLongest) {
    longestTotal++;
    offenders.push({ id: q.id, category: q.category, ratio: ratio.toFixed(2), lengths, correct: q.correct });
  }

  const stats = byCategory.get(q.category) ?? { n: 0, longest: 0, ratioSum: 0, missing: 0 };
  stats.n++;
  if (isLongest) stats.longest++;
  stats.ratioSum += ratio;
  if (!q.overridden) stats.missing++;
  byCategory.set(q.category, stats);
}

const pad = (value, width) => String(value).padEnd(width);
const padStart = (value, width) => String(value).padStart(width);

console.log(`\nIB technical questions: ${technical.length}`);
console.log(`Correct option is the longest:  ${longestTotal} (${Math.round((longestTotal / technical.length) * 100)}%) - chance level is ~25%`);
// Reported alongside, because over-correcting is its own tell: a bank where
// the right answer is always the *shortest* is exactly as guessable.
console.log(`Correct option is the shortest: ${shortestTotal} (${Math.round((shortestTotal / technical.length) * 100)}%) - chance level is ~25%\n`);
console.log(`${pad("category", 40)}${padStart("n", 4)}${padStart("longest", 9)}${padStart("%", 6)}${padStart("avg ratio", 11)}`);
console.log("-".repeat(70));

const rows = [...byCategory.entries()].sort((a, b) => b[1].longest - a[1].longest);
for (const [category, stats] of rows) {
  const percent = Math.round((stats.longest / stats.n) * 100);
  console.log(
    `${pad(category, 40)}${padStart(stats.n, 4)}${padStart(stats.longest, 9)}${padStart(percent + "%", 6)}${padStart((stats.ratioSum / stats.n).toFixed(2), 11)}`
  );
}

if (process.argv.includes("--ids")) {
  const filter = process.argv[process.argv.indexOf("--ids") + 1];
  const scoped = filter && !filter.startsWith("--") ? offenders.filter((o) => o.category.includes(filter)) : offenders;
  console.log(`\nIds where the correct option is the longest (${scoped.length}):`);
  console.log("  id   ratio  option lengths (correct marked *)");
  for (const row of scoped) {
    const lengths = row.lengths.map((len, i) => `${i === row.correct ? "*" : " "}${len}`).join(" ");
    console.log(`  ${padStart(row.id, 4)}  ${row.ratio}   ${lengths}   ${row.category}`);
  }
}

console.log("");
