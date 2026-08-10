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

import { readFileSync, readdirSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { readHandAuthoredQuizzes } from "./hand-authored-quizzes.mjs";
import path from "path";
import { mergeLessonTranslation } from "../lib/lesson-translations.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "lib/lessons-data");

// ── Which language's corpus to measure ─────────────────────────────────────
//
//   node scripts/audit-lesson-content.mjs              # Vietnamese (default)
//   node scripts/audit-lesson-content.mjs --locale=en  # English translations
//
// WHY THIS FLAG EXISTS. Every gate below the content minimums measures the
// *character length* of quiz options: MAX_LENGTH_BIAS_Z, MAX_TELL_SHARE,
// MAX_SHORTEST_SHARE, MAX_PRACTICE_LONGEST_SCORE. Those lengths are a property
// of the language the options are written in, not of the lesson. Translating a
// question changes all four option lengths, so the English corpus has its own
// bias distribution and can sit at z = 8 while the Vietnamese corpus is green -
// the audit would report nothing, and "pick the longest option" would be worth
// real marks again on the English side. Since a quiz score feeds
// avg_quiz_score, the unlock gate, XP and the /su-nghiep percentages regardless
// of which language it was answered in, the translated corpus needs measuring
// too, against its own baseline.
const localeArg = process.argv.find((a) => a.startsWith("--locale="));
const LOCALE = localeArg ? localeArg.slice("--locale=".length) : "vi";
const SOURCE_LOCALE = "vi";
const isSourceLocale = LOCALE === SOURCE_LOCALE;
const translationsDir = path.join(root, "lib/lessons-i18n", LOCALE);

if (!isSourceLocale && !existsSync(translationsDir)) {
  console.error(
    `No translations directory at lib/lessons-i18n/${LOCALE}/. ` +
      `Nothing to audit for locale "${LOCALE}".`
  );
  process.exit(1);
}

// Các ngưỡng dưới đây là mức mà TOÀN BỘ corpus đã đạt tại thời điểm siết, chứ
// không phải mức mong muốn - nên chúng gác được bài mới mà không đẩy bài cũ vào
// nợ kỹ thuật. Sàn cũ (2 câu quiz, 150 ký tự) đã tụt lại rất xa so với thực tế:
// mọi bài đều có ít nhất 5 câu và 250 ký tự, nên sàn đó không còn chặn được gì.
// Ba lần liên tiếp, bài mới về dưới chuẩn mà audit vẫn xanh, và chỉ phát hiện
// được bằng cách đo tay. Nâng thì lần sau CI báo, không cần ai nhớ đi đo.
const MIN_QUIZ_COUNT = 5;
const MIN_EXPLANATION_LEN = 250;
// Two nodes is not a flow, it is a caption. Every existing diagram has 2-5.
const MIN_DIAGRAM_NODES = 2;

/** Số khối tối thiểu trong phần thân bài. Bốn khối - mở đầu, một bảng khái niệm,
 *  một khối nhấn, một khối kết - là hình dạng gọn nhất còn đọc được; dưới mức đó
 *  thì bài chỉ còn là một đoạn giải thích dài. Trung vị của corpus là 8. */
const MIN_SECTION_BLOCKS = 5;

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
  // Was "a diagram OR an interactiveType". Every lesson has an interactiveType,
  // so that arm made the check unfalsifiable and 149 lessons sat with an empty
  // `diagram: []` while the audit reported zero failures. The two are not
  // substitutes either: interactiveType picks one of a handful of generic
  // widgets, while the diagram is the only per-lesson visual. All 627 lessons
  // now carry one, so the requirement is unconditional.
  if ((lesson.diagram ?? []).length < MIN_DIAGRAM_NODES) {
    issues.push(`diagram has ${lesson.diagram?.length ?? 0} nodes < ${MIN_DIAGRAM_NODES}`);
  }
  if ((lesson.sections ?? []).length < MIN_SECTION_BLOCKS) {
    issues.push(`sections ${lesson.sections?.length ?? 0} blocks < ${MIN_SECTION_BLOCKS}`);
  }
  if (!lesson.openingQuestion || (lesson.openingOptions ?? []).length === 0) {
    issues.push("missing openingQuestion/openingOptions");
  }
  return issues;
}

/**
 * The lessons to measure, already in the audited language.
 *
 * For the source locale this is just the generated files. For a translated
 * locale it is the merge of each translation onto its Vietnamese lesson - the
 * same `mergeLessonTranslation` the app serves, so the audit measures exactly
 * the strings a reader sees, and a field the translation left blank is counted
 * as the Vietnamese it will actually render as.
 *
 * Only translated lessons are in scope. Auditing all 715 against the English
 * gates would just re-measure the Vietnamese corpus under a second name.
 */
function loadCorpus() {
  const lessonFiles = readdirSync(dataDir).filter(
    (f) => f.endsWith(".json") && f !== "_index.json"
  );
  if (isSourceLocale) {
    return lessonFiles.map((f) => JSON.parse(readFileSync(path.join(dataDir, f), "utf8")));
  }

  const translated = readdirSync(translationsDir).filter(
    (f) => f.endsWith(".json") && f !== "_index.json"
  );
  const corpus = [];
  for (const file of translated) {
    const slug = file.replace(/\.json$/, "");
    const lessonPath = path.join(dataDir, `${slug}.json`);
    if (!existsSync(lessonPath)) continue; // reported by build-translation-index.mjs
    const source = JSON.parse(readFileSync(lessonPath, "utf8"));
    const translation = JSON.parse(readFileSync(path.join(translationsDir, file), "utf8"));
    corpus.push(mergeLessonTranslation(source, translation, LOCALE));
  }
  return corpus;
}

const corpus = loadCorpus();
console.log(
  `Auditing locale "${LOCALE}": ${corpus.length} lesson(s)` +
    (isSourceLocale ? "" : ` with a translation in lib/lessons-i18n/${LOCALE}/`)
);

const results = { personal: [], professional: [], bonus: [] };

/** z-score lệch độ dài ở một chiều, so với kỳ vọng có tính hoà.
 *  Tên khác `biasZ` phía dưới - hàm đó đo corpus quiz với chữ ký khác. */
function optionBiasZ(stats, side) {
  const observed = side === "longest" ? stats.longest : stats.shortest;
  const expected = side === "longest" ? stats.expLongest : stats.expShortest;
  const variance = side === "longest" ? stats.varLongest : stats.varShortest;
  if (variance <= 0) return 0;
  return (observed - expected) / Math.sqrt(variance);
}

const practiceBiasZ = (side) => optionBiasZ(practiceStats, side);
const openingBiasZ = (side) => optionBiasZ(openingStats, side);

for (const lesson of corpus) {
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
console.log(`\nTotal lessons checked: ${corpus.length}`);
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
// Ratcheted 0.27 -> 0.26 after the English rebalance: Vietnamese measures
// 24.51% and English 22.94%, so 26% leaves the tighter of the two about 56
// questions of room on 3,754. Not 0.25, for the reason recorded below about
// MAX_LENGTH_BIAS_Z - a ceiling half a point above the measurement turns the
// next ordinary edit red with nothing having regressed.
const MAX_TELL_SHARE = 0.25;

/**
 * Độ dài tối thiểu của `explanation` trong một câu quiz, ký tự.
 *
 * VÌ SAO TRƯỜNG NÀY CẦN CỔNG. Rule 1 của AGENTS.md dời toàn bộ lập luận RA
 * KHỎI phương án và VÀO `explanation` - phương án chỉ còn nêu mệnh đề, phần
 * "vì sao" nằm ở đây, và người học đọc nó ngay sau khi trả lời. Nói cách khác
 * chính quy tắc ấy đã biến `explanation` thành mặt dạy học chính của quiz. Nó
 * là trường duy nhất chưa từng được đo: bốn cổng nội dung đo số câu, phần giải
 * thích cấp BÀI, số node sơ đồ và số khối `sections`, không cái nào chạm tới
 * đây.
 *
 * Đo ra: trung vị 197 ký tự, ngắn nhất 25, và 143 câu dưới 80. Ví dụ điển hình
 * là `von-luu-dong-la-gi` Q4 - cả phần giải thích là "Cả ba cách đều làm WC
 * tăng.", tức nhắc lại đáp án chứ không nói vì sao ba phương án kia sai.
 *
 * 80 chứ không cao hơn: đây là sàn cho một câu có nội dung, không phải mục
 * tiêu. Trung vị đã gấp 2,5 lần mức này, nên nó chỉ chặn phần đáy.
 */
const MIN_QUIZ_EXPLANATION_LEN = 80;

/**
 * Giải thích có mang phép tính thì được miễn trừ độ dài.
 *
 * `enterprise-value` Q1 giải thích trọn vẹn bằng 25 ký tự: "EV = 100 + 30 − 10
 * = 120." Không thiếu gì cả - phép tính TỰ NÓ là lời giải thích, và bắt nó dài
 * 80 ký tự chỉ đẻ ra một câu đệm quanh một dòng vốn đã đủ. Miễn trừ này là lý
 * do con số phải chặn giảm từ 143 xuống 95: gần một phần ba nhóm "ngắn" không
 * phải nợ.
 *
 * Điều kiện hẹp có chủ ý - phải có chữ số đứng cạnh một toán tử, hoặc một dấu
 * bằng giữa hai vế. Một câu văn suông có nhắc "20%" thì không lọt.
 */
function explanationCarriesArithmetic(text) {
  const t = String(text ?? "");
  return /\d\s*[+\-−×÷*/=]|[+\-−×÷*/=]\s*\d/.test(t);
}

/** Câu có `explanation` mỏng: dưới sàn và không mang phép tính. */
const thinExplanations = [];

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
const MAX_SHORTEST_SHARE = 0.28;

// ── Hollow distractors ─────────────────────────────────────────────────────
//
// AGENTS.md rule 4 bans options that are blank space: "Luôn tốt", "Không ảnh
// hưởng", "Không có khái niệm này". They are eliminated on sight, so a
// four-option question quietly becomes a two-option one and the guesser's odds
// double. Until now nothing measured it, and the figure quoted in AGENTS.md -
// 228 questions, 10% of the corpus - turned out to be almost entirely false
// positives: it matched any option containing a marker phrase, and 168 of the
// 198 matches were legitimate distractors carrying real reasoning ("Lạm phát
// không ảnh hưởng gì tới trái phiếu vì coupon đã được cố định sẵn" is a
// misconception worth testing, not filler).
//
// So the check is deliberately narrow, because a noisy gate gets ignored:
//   - digits anywhere means it is a numeric answer and is left alone. The
//     shortest options in the corpus are "2x", "15%", "12 lần" - all valid.
//   - over 30 characters means the option carries a clause, so it is reasoning
//     rather than a bare assertion.
//   - what remains must open with one of the hollow formulas below.
//
// That found five, which have been rewritten. The budget is zero: this is not
// a backlog to grind down, it is a shape of option that should never appear.
//
// The pattern is per-language, and that is not cosmetic. Written only in
// Vietnamese, this check silently stops existing the moment a lesson is
// translated: "Always good" does not match /^luôn (tốt|...)/, so an English
// corpus could fill up with the exact shape of option rule 4 bans while the
// audit kept printing zero. The English list is the same set of hollow
// formulas, not a translation of the Vietnamese strings one by one - what
// makes an option blank space is that it asserts nothing, and English reaches
// that shape through its own idioms ("no effect", "none of the above").
const HOLLOW_DISTRACTOR_BY_LOCALE = {
  vi: new RegExp(
    "^(luôn (tốt|xấu|đúng|sai)" +
      "|không (ảnh hưởng|liên quan|quan trọng|có khái niệm|cần|có lý do|thể (tính|xác định)|công thức|đổi)" +
      "|tùy ý|bình thường|tidak ada|thứ tự không)",
    "i"
  ),
  en: new RegExp(
    "^(always (good|bad|true|false|correct|wrong)" +
      "|never (true|false|matters|happens)" +
      "|no (effect|impact|relation|change|difference|formula|such (concept|thing))" +
      "|not (important|related|applicable|relevant)" +
      "|(it )?(does not|doesn't) (matter|apply|change|affect)" +
      "|none of the above|all of the above|any (of them|order)|it depends$)",
    "i"
  ),
};
const HOLLOW_DISTRACTOR =
  HOLLOW_DISTRACTOR_BY_LOCALE[LOCALE] ?? HOLLOW_DISTRACTOR_BY_LOCALE[SOURCE_LOCALE];
const MAX_HOLLOW_DISTRACTORS = 0;

/** Đáp án ĐÚNG có phải một khoảng trống không.
 *
 *  Đo bằng SỐ TỪ chứ không bằng số ký tự, khác với isHollowDistractor. Lý do:
 *  thứ phân biệt "Không ảnh hưởng" với "Không có dòng tiền nền tảng" không
 *  phải độ dài mà là việc câu sau NÊU TÊN một thứ cụ thể. Cái đầu 2 từ, cái
 *  sau 6 từ; đo bằng ký tự thì 15 và 27, và mọi ngưỡng ký tự hoặc bắt cả hai
 *  hoặc bỏ sót cả hai.
 *
 *  Ngưỡng 5 từ cho ra đúng 0 trên toàn kho hôm nay, nên nó là cổng cứng chứ
 *  không phải danh sách cảnh báo - và nó BẮT ĐƯỢC lỗi đã xảy ra thật ("Không
 *  ảnh hưởng", 2 từ). */
const HOLLOW_CORRECT_OPENER_BY_LOCALE = {
  vi: /^(không|luôn|chỉ|đều|mọi|tất cả)\b/i,
  // Same shape, English openers. The word count is what does the work in both
  // languages, so the threshold below is shared.
  en: /^(no|not|never|always|only|every|all|any|none)\b/i,
};
const HOLLOW_CORRECT_OPENER =
  HOLLOW_CORRECT_OPENER_BY_LOCALE[LOCALE] ?? HOLLOW_CORRECT_OPENER_BY_LOCALE[SOURCE_LOCALE];

function isHollowCorrectAnswer(option) {
  if (option === null || option === undefined) return false;
  const text = String(option).trim().replace(/\.$/, "");
  if (!text) return false;
  if (/\d/.test(text)) return false; // "15%", "2x" là đáp án số hợp lệ
  if (text.split(/\s+/).length > 5) return false;
  return HOLLOW_CORRECT_OPENER.test(text);
}

function isHollowDistractor(option) {
  const text = String(option ?? "").trim().replace(/\.$/, "");
  if (/\d/.test(text)) return false;
  if (text.length > 30) return false;
  return HOLLOW_DISTRACTOR.test(text);
}

/** A lesson fails when this share of its questions have the correct answer as
 *  the longest option. At 4 options, chance level is 25%. A tie for longest
 *  counts - three lessons passed the eyeball test and still failed here because
 *  their correct option matched the longest distractor to the character. */
const PER_LESSON_TELL_LIMIT = 0.75;
const MIN_QUESTIONS_FOR_TELL_CHECK = 2;

// One baseline per locale. The Vietnamese list grandfathers a backlog that
// predates the gate; a translated locale has no such backlog, because every
// English lesson is being authored now under the current rules. So a missing
// file means an empty set - nothing grandfathered - and a newly translated
// lesson must pass the per-lesson check on its own.
const baselinePath = isSourceLocale
  ? path.join(__dirname, "lesson-quiz-tell-baseline.json")
  : path.join(__dirname, `lesson-quiz-tell-baseline.${LOCALE}.json`);
/** Baseline riêng cho cổng `explanation` mỏng. Tách khỏi baseline tell vì hai
 *  cái đo hai thứ khác nhau và sẽ co lại theo hai nhịp khác nhau; gộp chung thì
 *  gỡ được một bài khỏi cái này lại vô tình miễn trừ nó khỏi cái kia. */
const thinBaselinePath = isSourceLocale
  ? path.join(__dirname, "thin-explanation-baseline.json")
  : path.join(__dirname, `thin-explanation-baseline.${LOCALE}.json`);
const thinBaseline = new Set(
  existsSync(thinBaselinePath) ? JSON.parse(readFileSync(thinBaselinePath, "utf8")).lessons : []
);

const baseline = new Set(
  existsSync(baselinePath) ? JSON.parse(readFileSync(baselinePath, "utf8")).lessons : []
);

/** Ngưỡng lệch, tính bằng số lần độ lệch chuẩn so với ngẫu nhiên.
 *
 *  LÝ DO DÙNG z CHỨ KHÔNG DÙNG TỈ LỆ. Hai trần cũ (MAX_TELL_SHARE,
 *  MAX_SHORTEST_SHARE) là tỉ lệ trên TOÀN kho, và cả hai đều mù ba chuyện:
 *
 *  1. Một track lệch trong khi tổng vẫn đẹp. Track nhỏ chìm trong track lớn.
 *  2. Kích thước track. 543 câu của bonus có độ lệch chuẩn 1,9 điểm phần trăm,
 *     còn 2.469 câu của professional chỉ 0,9 - nên cùng một con số phần trăm
 *     mang hai ý nghĩa khác nhau. Một trần cố định hoặc quá lỏng cho track lớn
 *     hoặc đỏ vì nhiễu ở track nhỏ.
 *  3. Lệch xuống DƯỚI ngẫu nhiên cũng là mẹo. Trần chỉ chặn phía trên, nên
 *     "đáp án đúng hiếm khi là phương án dài nhất" trôi tự do - và nó trôi
 *     thật: professional ở z = −4,6, tức người học chỉ cần LOẠI phương án dài
 *     nhất rồi đoán là hơn hẳn mức 25%.
 *
 *  Ngưỡng đặt ở mức kho HIỆN ĐANG ĐẠT, đúng luật của AGENTS.md - đủ để chặn
 *  trôi thêm, không tạo nợ cho những gì đã có. Hạ nó sau mỗi đợt viết lại;
 *  không bao giờ nâng để một build đỏ thành xanh.
 *
 *  Hạ 5 → 4,5 sau đợt sửa 33 câu kéo professional từ −4,6 về −3,8. Không hạ
 *  xuống 4 dù |z| tệ nhất đang là 3,81: MAX_TELL_SHARE từng được đặt cách mức
 *  đo đúng hai phần trăm nghìn và một sửa đổi bình thường sau đó làm CI đỏ mà
 *  chẳng có gì thoái lui. 0,69 khoảng đệm là chỗ cho vài chục câu xê dịch,
 *  không phải chỗ cho một đợt trôi. */
// Ratcheted 4.5 -> 4.0. Worst |z| is 3.62 in Vietnamese and 2.95 in English,
// so 4.0 keeps more headroom than the 0.69 the note above asks for while
// closing the gap a drifting batch could hide in.
// Hạ 5 -> 4,5 -> 4 -> 3,4 qua ba đợt viết lại. Track tệ nhất giờ ở 2,98
// (professional, phía "đáp án đúng hiếm khi là phương án dài nhất"), nên 3,4
// để lại khoảng 0,4 - đủ cho vài chục câu xê dịch, không đủ cho một lần trôi.
//
// VÀ DỪNG Ở ĐÂY. Đợt sau cắt thêm 14 phương án vào đúng dải ±20% của luật 6 mà
// z không đổi một phần trăm nào - vẫn đúng 486 câu, không câu nào lật, vì cắt
// phương án nhiễu dài nhất hiếm khi kéo nó xuống dưới đáp án đúng. Đo tiếp thì
// trong 1.902 câu "đáp án đúng không dài nhất" của track này đã có 1.599 câu
// (84%) nằm trọn trong dải - chúng không hỏng. Phần −2,98 còn lại là hệ quả số
// học của luật 1 cộng luật 3, và đóng nốt nó chỉ còn hai đường, cả hai đều làm
// hỏng câu hỏi: nhồi chữ vào đáp án đúng, hoặc rút phép tính khỏi phương án
// nhiễu. Con số này là cái chặn đợt MỚI trôi, không phải cái đích phải chạm.
const MAX_LENGTH_BIAS_Z = 3.2;

/** Cổng cho chiều thứ ba: đáp án đúng nằm ở GIỮA, không dài nhất mà cũng không
 *  ngắn nhất. Đặt cùng bậc với MAX_LENGTH_BIAS_Z vì nó khai thác được y như
 *  vậy - loại hai đầu rồi đoán giữa hai cái còn lại.
 *
 *  Thêm vào sau khi kho tiếng Anh đo được z = +5,2 ở chiều này trong lúc HAI
 *  cổng kia đều xanh (longest 24%, shortest 20%). Đó là hệ quả trực tiếp của
 *  việc chữa "đừng để đáp án đúng dài nhất" bằng cách cắt bớt đáp án đúng: nó
 *  không thành ngắn nhất, nó thành ở giữa. */
const MAX_MIDDLE_BIAS_Z = 3.0;

/**
 * Below this many questions, the corpus-wide SHARE gates are reported but not
 * enforced.
 *
 * The three share ceilings (MAX_TELL_SHARE, MAX_SHORTEST_SHARE,
 * MAX_PRACTICE_LONGEST_SCORE) were each calibrated against a corpus of a few
 * thousand questions, where one question moves the share by ~0.04 points. A
 * freshly translated locale starts at a few dozen: with 50 questions, a share
 * moves 2 points per question, so 14 longest-correct answers out of 50 is 28%
 * and red, while 13 is 26% and green - the same corpus either side of a coin
 * flip. That is the failure MAX_TELL_SHARE already had once in Vietnamese,
 * when it was set two hundredths of a percent above the measured value and the
 * next ordinary edit turned CI red with nothing regressed.
 *
 * MAX_LENGTH_BIAS_Z stays enforced at every size, which is the whole reason it
 * is a z-score: the variance term already accounts for the sample, so a small
 * corpus has to be *further* off chance in percentage terms before it trips.
 * That is the gate protecting a young translated corpus; the shares take over
 * once there are enough questions for them to mean anything.
 */
const MIN_QUESTIONS_FOR_SHARE_GATES = 400;

// `handAuthored` là bốn bài học có trang riêng dưới app/bai-hoc/<slug>/ với
// quiz nằm thẳng trong page.tsx. Chúng KHÔNG có bản trong lib/lessons-data,
// nên suốt đời bộ kiểm này chúng vô hình - trong khi LessonPageLayout vẫn ghi
// quiz_score của chúng vào Supabase như mọi bài khác. Lúc phát hiện, 58 câu ở
// đó đứng ở z = +9,03 cho mẹo "chọn phương án dài nhất", tức đúng cái lỗi mà
// cả kho kia đã mất công dọn, trong khi mọi con số bộ kiểm in ra đều xanh.
const quizStats = { personal: null, professional: null, bonus: null, handAuthored: null };
for (const track of Object.keys(quizStats)) {
  quizStats[track] = {
    questions: 0,
    longest: 0,
    shortest: 0,
    ratioSum: 0,
    // Đo bằng CÙNG MỘT LUẬT cho cả hai chiều: chỉ tính khi cực trị là duy
    // nhất. Hai trường `longest`/`shortest` ở trên không như vậy - `longest`
    // tính cả hoà còn `shortest` thì không, dù chú thích của `shortest` nêu
    // đúng lý do phải đòi hỏi duy nhất ("hoà nhau thì người đoán vẫn phải tung
    // đồng xu"). Cùng một lập luận, chỉ áp cho một bên, suốt cả đời bộ kiểm
    // này - và nó thổi phồng phía "dài": bonus đọc ra 30% trong khi số thật là
    // 24,9%. Giữ lại hai trường cũ vì cổng theo từng bài và tệp mốc đang tính
    // theo chúng.
    uniqueLongest: 0,
    uniqueShortest: 0,
      middle: 0,
      expectedMiddle: 0,
    // Kỳ vọng khi KHÔNG có mẹo nào, cộng dồn từng câu. Không phải 25%: câu nào
    // có hai phương án dài bằng nhau thì không góp gì vào phía "dài nhất duy
    // nhất", nên mốc ngẫu nhiên của mỗi track phụ thuộc vào số câu bị hoà của
    // chính nó. Lấy 25% làm mốc chung là so kho với một mốc không tồn tại.
    expectedLongest: 0,
    expectedShortest: 0,
  };
}

/** Lessons failing the per-lesson bar but absent from the baseline - i.e. new
 *  or newly regressed, which is what the gate exists to catch. */
const unbaselined = [];
/** Options that are blank space rather than a wrong answer - see rule 4. */
const hollowDistractors = [];
/** Câu mà ĐÁP ÁN ĐÚNG là khoảng trống - xem isHollowCorrectAnswer. */
const hollowCorrect = [];

// ── Hai câu hỏi giống nhau trong CÙNG một bài ──────────────────────────────
//
// Tìm ra bằng cách đọc, không bằng bộ kiểm: bảy bài hỏi đúng một câu hai lần
// với hai bộ phương án khác nhau. Dấu vết trong source nói rõ vì sao - các
// câu trùng đều được NỐI THÊM vào cuối mảng bằng cú pháp JSON ("question":)
// khác hẳn phần gốc (question:), tức một lô bổ sung cho đủ MIN_QUIZ_COUNT mà
// không đọc lại bài đã hỏi gì.
//
// Vì sao đáng gác: quiz bài học phần lớn đúng 5 câu - bằng sàn. Một câu lặp
// kéo số câu THẬT xuống 4, và ở frm-xep-hang-tin-nhiem-noi-bo-va-ben-ngoai là
// xuống 3. Người học trả lời cùng một ý hai lần rồi nhận một điểm số nói rằng
// họ đã được kiểm tra năm lần.
//
// Hai phép đo, hai mức xử lý khác nhau, và sự khác nhau đó là có chủ ý:
//
//   - TRÙNG TUYỆT ĐỐI (sau khi bỏ dấu câu và gộp khoảng trắng) là cổng cứng ở
//     0. Không có dương tính giả nào có thể xảy ra: hai chuỗi bằng nhau thì
//     bằng nhau.
//   - GẦN TRÙNG (Jaccard trên tập từ >= 0.85) chỉ CẢNH BÁO. Đo trên toàn kho
//     thì nó bắt được 22 cặp, trong đó 2 cặp là dương tính giả và cả hai đều
//     là cùng một hình dạng: hai câu đối nhau về nghĩa nhưng gần trùng về từ
//     ("Current Assets là gì?" / "Non-current Assets là gì?", và một cặp
//     HỢP LÝ / KHÔNG phải là hợp lý). Loại chúng đi cần một danh sách từ phủ
//     định tiếng Việt - đúng loại thứ ngừng chạy khi kho tiếng Anh lớn lên,
//     và AGENTS.md đã ghi lại một lần bị như vậy rồi. Nên nó in ra để người
//     viết tự đọc, chứ không chặn build.
const DUPLICATE_SIMILARITY = 0.85;
const duplicateQuestions = [];
const nearDuplicateQuestions = [];

function normalizeQuestion(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function jaccard(a, b) {
  let shared = 0;
  for (const token of a) if (b.has(token)) shared++;
  return shared / (a.size + b.size - shared);
}

// ── Giải thích gọi phương án bằng CHỮ CÁI ──────────────────────────────────
//
// "Phương án D là lỗi phổ biến nhất" là một câu không thể đúng lâu trong repo
// này: scripts/generate-lesson-data.mjs chạy balanceLessonQuizzes, thứ XÁO LẠI
// thứ tự option của từng câu để triệt tiêu tell vị trí. Chữ cái tác giả viết
// gắn với thứ tự lúc soạn, còn người học đọc thứ tự sau khi xáo - hai thứ khác
// nhau, và không gì buộc chúng khớp.
//
// Trường hợp lộ nhất - và là cái người học báo lại - là chữ cái trôi đúng vào
// ĐÁP ÁN ĐÚNG: học viên chọn đúng, được chấm đúng, rồi đọc ngay bên dưới rằng
// lựa chọn đó là "lỗi phổ biến nhất". Đã xảy ra ở bốn câu.
//
// `(?![\p{L}\p{M}])` chứ không phải `\b`, và cần cờ `u`. Bản đầu dùng `\b`
// với cờ `i`, và `\b` trong JS chỉ biết mặt chữ ASCII, nên trong "ba phương án
// còn lại" nó thấy chữ "c" của "còn" là một từ trọn vẹn (vì "ò" không phải ký
// tự từ theo ASCII) và báo đây là tham chiếu tới phương án C. 44 câu bị gắn cờ
// khi con số thật là 13, phần lớn là những câu viết đúng chuẩn. Đúng loại gate
// mà AGENTS.md nói là sẽ bị người ta học cách phớt lờ.
const OPTION_LETTER_RE = /(phương án|đáp án|lựa chọn|option|câu trả lời)\s*["']?([A-D])(?![\p{L}\p{M}])/giu;

// Một chữ cái do CHÍNH CÂU HỎI đặt ra thì không phải tham chiếu vị trí.
//
// `ca-nhan-doanh-nghiep-chinh-phu` q2 dựng ba kịch bản ngay trong đề - "Lựa
// chọn A: Giảm thuế 20%... Lựa chọn B: Tăng chi tiêu công... Lựa chọn C: Ngân
// hàng trung ương giảm lãi suất" - rồi phần giải thích nhắc lại A và C. Chữ cái
// ở đây là nhãn của kịch bản, đi cùng đề, và sống sót qua balanceLessonQuizzes
// nguyên vẹn vì balance chỉ xáo mảng `options`. Đó là hai trong hai phát hiện
// còn lại của cổng này, tức là toàn bộ phần dư của nó là dương tính giả.
//
// AGENTS.md: dương tính giả thuộc về LUẬT, không thuộc về một khối bỏ qua. Nên
// điều kiện là chữ cái ấy phải được đề định nghĩa - cùng những từ dẫn, cùng
// biên từ - chứ không phải "đề có chứa chữ A ở đâu đó".
function lettersDefinedInStem(question) {
  const stem = String(question?.question ?? "");
  const defined = new Set();
  OPTION_LETTER_RE.lastIndex = 0;
  let match;
  while ((match = OPTION_LETTER_RE.exec(stem))) defined.add(match[2].toUpperCase());
  return defined;
}

function findOptionLetterRefs(question) {
  const explanation = String(question?.explanation ?? "");
  const fromStem = lettersDefinedInStem(question);
  const found = [];
  OPTION_LETTER_RE.lastIndex = 0;
  let match;
  while ((match = OPTION_LETTER_RE.exec(explanation))) {
    if (fromStem.has(match[2].toUpperCase())) continue;
    const index = "ABCD".indexOf(match[2].toUpperCase());
    // Cửa sổ quanh chỗ nhắc tới, không phải cả đoạn: một giải thích dài thường
    // có chữ "sai" ở chỗ khác hoàn toàn, và lấy cả đoạn thì câu nào cũng dính.
    const context = explanation.slice(Math.max(0, match.index - 90), match.index + 120);
    found.push({ ref: match[0], index, context });
  }
  return found;
}

// Hai phương án cùng trả lời một đáp số, và chỉ một cái được khoá. Người học
// tính ra đúng con số rồi chọn cái kia thì bị chấm sai - rồi đọc phần giải
// thích nói ra đúng con số họ vừa chọn.
//
// Đã xảy ra hai lần, và hai cổng đang có đều không thấy:
//   credit-spread openingOptions: "4%" đứng cạnh "4% - phần bù vì rủi ro tín
//     dụng cao hơn T-bond", correctOption = 3. 8% − 4% = 4% là phép tính đúng
//     duy nhất của câu này.
//   nguon-va-su-dung-von-trong-thuong-vu practicePrompt: "125 tỷ" và "125 tỷ",
//     giống nhau từng ký tự, correct = 1.
// Cổng chữ cái tìm chữ cái, cổng độ dài thấy "4%" là phương án ngắn nhất -
// hoàn toàn hợp lệ. Không có gì bắt được hình dạng này.
//
// LUẬT HẸP, và độ hẹp là kết quả đo chứ không phải phỏng đoán. Bản đầu chỉ
// hỏi "hai phương án có cùng con số mở đầu không" và cho 19 phát hiện trên
// 5.212 câu, 18 trong đó khoá vào một phương án - nhưng soi tay thì gần hết
// là câu viết đúng: "18% chính là IRR" / "18% là con số ngẫu nhiên" khác nhau
// ở phần chữ, "1 kg CO₂" / "1 tấn CO₂" khác đơn vị, "1:3" / "1:2" thì con số
// mở đầu còn không phải là đáp số. Đúng loại cổng mà AGENTS.md nói người ta
// sẽ học cách phớt lờ.
//
// Cái tách hai ca thật ra khỏi 17 ca kia là CHIỀU của sự bất đối xứng:
// phương án trần - không có gì ngoài số và đơn vị - là phương án NHIỄU, còn
// đáp án đúng mở đầu bằng đúng số ấy rồi mới giải thích tiếp. Ngược lại thì
// vô hại: trai-phieu-co-ban khoá "8 triệu đồng" và để "8 triệu đồng, cộng
// thêm phần chia lợi nhuận nếu công ty lãi" làm nhiễu - phần thêm vào là một
// mệnh đề khác, nên đó là hai đáp án khác nhau thật.
//
// Đơn vị nằm trong phép so sánh, nếu không market-cap-la-gi sẽ bị báo nhầm:
// "50.000đ" là nhiễu trần, đáp án đúng mở đầu "50.000 tỷ đồng" - cùng con số,
// khác đơn vị, và đó chính là chỗ câu hỏi muốn thử.
const BARE_NUMERIC_RE = /^\s*([0-9][0-9.,]*)\s*(%|[\p{L}]+(?:\s+[\p{L}]+)?)?\s*$/u;
const LEADING_NUMERIC_RE = /^\s*([0-9][0-9.,]*)\s*(%|[\p{L}]+(?:\s+[\p{L}]+)?)?/u;

function normaliseNumeric(match) {
  if (!match) return null;
  return `${match[1].replace(/[.,]$/, "")}|${(match[2] ?? "").trim().toLowerCase()}`;
}

/** Phương án nhiễu trần trùng đáp số với đáp án đúng - hai đáp án đúng. */
function findDuplicateAnswers(options, correct) {
  if (!Array.isArray(options) || typeof correct !== "number") return [];
  const keyed = options[correct];
  if (typeof keyed !== "string") return [];
  const keyedValue = normaliseNumeric(LEADING_NUMERIC_RE.exec(keyed));
  const hits = [];
  options.forEach((option, i) => {
    if (i === correct || typeof option !== "string") return;
    if (option.trim() === String(keyed).trim()) {
      hits.push({ index: i, option, reason: "trùng khít đáp án đúng" });
      return;
    }
    if (keyedValue === null) return;
    // Đáp án đúng phải là một GIÁ TRỊ, không phải một biểu thức. discounting
    // khoá "1 triệu / (1.08)^5 = ~680.000 đồng" và để "1 triệu" làm nhiễu -
    // nhiễu hợp lệ, vì ngộ nhận ở đây đúng là "không chiết khấu gì cả". Con số
    // mở đầu của đáp án đúng chỉ là tử số; đáp số thật là 680.000. Còn ở
    // credit-spread thì "4% - phần bù vì rủi ro tín dụng cao hơn T-bond" không
    // có con số nào khác, nên 4% chính là đáp số.
    if (/[0-9]/.test(keyed.slice(LEADING_NUMERIC_RE.exec(keyed)[0].length))) return;
    const bare = normaliseNumeric(BARE_NUMERIC_RE.exec(option));
    if (bare !== null && bare === keyedValue) {
      hits.push({ index: i, option, reason: "nhiễu trần, cùng đáp số" });
    }
  });
  return hits;
}

/** Câu có hai đáp án đúng - gate ở đây, không có baseline. */
const duplicateAnswers = [];

/** Mọi tham chiếu chữ cái - nợ tiềm ẩn, chỉ báo cáo. */
const letterRefs = [];
/** Chữ cái trỏ đúng vào đáp án đúng - gate ở đây. */
const contradictoryLetterRefs = [];
/** Baselined lessons that now pass, so the baseline must shrink. */
const fixedButStillBaselined = [];
/** Bài thiếu tóm tắt / thiếu khối áp dụng. */
const missingSummary = [];
const missingApplication = [];
const missingPractice = [];

/** Ngưỡng lệch độ dài của practicePrompt, đo bằng z-score HAI CHIỀU.
 *
 *  VÌ SAO KHÔNG CÒN LÀ TRẦN MỘT CHIỀU. Cổng cũ là `MAX_PRACTICE_LONGEST_SCORE`,
 *  một trần trên tỉ lệ "đáp án đúng là phương án dài nhất", và nó được hạ dần
 *  0,92 → 0,87 → 0,71 → 0,55 → 0,38 sau mỗi đợt viết lại. Nhìn vào con số đó
 *  thì mọi thứ đều đang tốt lên: 88,5% xuống 21,7%.
 *
 *  Con số đó đúng và vô dụng. Cách sửa từng câu là cắt đáp án đúng cho ngắn
 *  lại, mà với bốn phương án thì "không phải dài nhất" rất dễ thành "ngắn
 *  nhất". Đo lại cả hai chiều sau 312 câu viết lại:
 *
 *      dài nhất : 147/642 (22,9%) - kỳ vọng 172 - z = −2,25
 *      ngắn nhất: 275/642 (42,8%) - kỳ vọng 174 - z = +9,16
 *
 *  Tức là "chọn phương án NGẮN nhất" giờ ăn 42,8% so với may rủi ~27%. Một
 *  mách nước đã bị thay bằng một mách nước khác, và cái trần một chiều không
 *  thấy gì cả vì nó chỉ nhìn đúng chiều đang tốt lên.
 *
 *  Đây đúng là bài học AGENTS.md đã ghi cho corpus `quiz` - "every gate was a
 *  ceiling and this is a floor" - lặp lại nguyên vẹn ở `practicePrompt`, vì
 *  cổng này được dựng theo hình dạng cũ. Nên nó thành z-score hai chiều, so
 *  với kỳ vọng có tính hoà, giống `MAX_LENGTH_BIAS_Z`.
 *
 *  Cách sửa một câu KHÔNG phải là cắt cho ngắn nhất có thể. Chữa chiều "dài"
 *  bằng cách đẩy tất cả xuống đáy chỉ tạo ra chiều "ngắn", và điều đó đã xảy
 *  ra hai lần trong cùng một ngày - một lần ở kho tiếng Việt, một lần nữa ở
 *  kho tiếng Anh ngay sau đó, z(dài) tụt xuống −8,19 vì 111 câu đều được viết
 *  về giữa nhóm cùng lúc.
 *
 *  Cái đích là PHÂN BỐ, không phải một hướng: khoảng một phần tư số câu đáp án
 *  đúng là dài nhất, một phần tư là ngắn nhất, đúng như rule 2 của AGENTS.md.
 *  Sau khi viết lại 100 câu theo cả hai hướng - 25 câu nới lên thành dài nhất,
 *  75 câu nới lên giữa nhóm - hai kho về đúng mức may rủi:
 *
 *      tiếng Việt: dài z = +0,25   ngắn z = −0,13   (654 câu)
 *      tiếng Anh : dài z = +0,04   ngắn z = −1,59   (200 câu)
 *
 *  Ngưỡng hạ từ 9,2 xuống 3. Không hạ tiếp xuống sát 0,25: z là đại lượng có
 *  nhiễu, và một kho vài trăm câu sẽ dao động vài phần mười chỉ vì thêm dăm bài
 *  mới. 3 độ lệch chuẩn là mức phân biệt được trôi thật với dao động thường,
 *  cùng bậc với MAX_LENGTH_BIAS_Z bên corpus quiz. */
const MAX_PRACTICE_BIAS_Z = 3;

/** Ngưỡng lệch độ dài của openingOptions - câu hỏi mở đầu mỗi bài.
 *
 *  TRƯỜNG THỨ BA TRONG CÙNG MỘT HỌ. `quiz` được đo từ lâu, `practicePrompt`
 *  mới được đo và hoá ra hỏng nặng, và đây là trường còn lại: nó có
 *  `correctOption`, `OpeningQuestionBlock` chấm đúng/sai và đổi màu ô, nhưng
 *  suốt cả đời bộ kiểm này chưa ai nhìn vào bên trong nó lần nào.
 *
 *  Đo lần đầu: 610 trên 715 bài có đáp án đúng là phương án dài nhất, so với
 *  kỳ vọng 184. z = +36,6. "Chọn phương án dài nhất" ăn khoảng 85% ở câu mở
 *  đầu của mọi bài học.
 *
 *  Nó KHÔNG vào `avg_quiz_score`, không vào XP, không vào cổng mở khoá - đó là
 *  lý do nó ở mức nghiêm trọng thấp hơn `practicePrompt` dù con số tệ hơn.
 *  Nhưng nó là tương tác đầu tiên của người học với mỗi bài, và ở mức này nó
 *  dạy đúng một điều trước khi họ kịp đọc gì: đoán theo độ dài là ăn.
 *
 *  CHIỀU CÒN LẠI CŨNG ĐANG LỆCH, VÀ LỆCH SẴN TỪ ĐẦU: chỉ 52 trên 715 câu có
 *  đáp án đúng là phương án NGẮN nhất, so với kỳ vọng 191 - z = −11,94. Nên
 *  không thể chữa bằng cách đẩy tất cả về giữa nhóm: làm thế thì chiều "dài"
 *  về đúng mức nhưng chiều "ngắn" vẫn nguyên. Trong các đợt còn lại, khoảng
 *  bốn phần mười số câu phải viết THÀNH ngắn nhất, sáu phần mười vào giữa.
 *
 *  Ngưỡng là mức kho đang HỎNG, ghi vào để con số hiện ra trong CI và bị hạ
 *  dần sau mỗi đợt viết lại, không phải để chấp nhận.
 *
 *  TÁCH THEO NGÔN NGỮ, khác `MAX_PRACTICE_BIAS_Z` dùng chung một số. Lý do rất
 *  cụ thể: bản dịch mang theo văn bản tiếng Anh của riêng nó, nên hai kho trôi
 *  độc lập. Sau đợt 2-3, kho tiếng Việt xuống 14,19 còn kho tiếng Anh vẫn ở
 *  20,74 - một hằng số dùng chung sẽ phải đặt ở mức xấu hơn trong hai, tức là
 *  khoá luôn phần tiến độ đã làm được bên tiếng Việt. AGENTS.md đã ghi "The
 *  length gates are per-language"; chỗ này làm đúng điều đó.
 *
 *  Mỗi ngôn ngữ hạ ngưỡng theo nhịp riêng:
 *    vi: 37 → 28,1 → 14,2 → 5,4 → 3 (đợt 5). Cả hai chiều đã về mức may rủi:
 *        dài z = −0,34, ngắn z = +0,41. Nhóm câu có phương án nhiễu đủ dài đã
 *        xong; còn 184 câu mà nhiễu quá ngắn (<40 ký tự), phải viết lại chính
 *        các phương án nhiễu chứ không cắt đáp án đúng được nữa.
 *        Dừng ở 3 chứ không siết xuống sát 0,49, cùng lý do với MAX_PRACTICE_BIAS_Z:
 *        z có nhiễu, và một kho vài trăm câu dao động vài phần mười chỉ vì thêm
 *        dăm bài mới.
 *    en: chưa viết lại lần nào - 182 trên 208 bài dịch vẫn có đáp án đúng dài
 *        nhất. Đợt việc riêng, giống hệt những gì practicePrompt đã cần. */
const OPENING_BIAS_Z_BY_LOCALE = { vi: 3, en: 20.8 };
const MAX_OPENING_BIAS_Z = OPENING_BIAS_Z_BY_LOCALE[LOCALE] ?? 37;
/** Đo openingOptions theo TỪNG NHÓM độ dài, không chỉ trên toàn kho.
 *
 *  VÌ SAO PHẢI CÓ. Cổng tổng `MAX_OPENING_BIAS_Z` báo z = −0,49 sau đợt 5,
 *  tức là toàn kho đứng đúng mức may rủi. Con số đó đúng và che mất mọi thứ:
 *
 *    nhiễu dài nhất   số câu   đúng-là-dài-nhất   kỳ vọng      z
 *      0-40             201          183             52     +21,15
 *      40-60            160            0             43      −7,71
 *      60-90            242            0             64      −9,44
 *      90+              112            0             29      −6,34
 *
 *  Năm đợt viết lại đã đẩy BA nhóm nhiễu dài xuống đúng 0 - đáp án đúng không
 *  bao giờ là phương án dài nhất ở đó - trong khi nhóm nhiễu ngắn chưa động
 *  tới vẫn ở 91%. Hai mách nước ngược chiều triệt tiêu nhau khi lấy trung
 *  bình, và cả hai đều học được: "nhiễu đều dài thì loại phương án dài nhất
 *  đi", "nhiễu đều ngắn thì chọn phương án dài".
 *
 *  Đây là lần thứ ba trong cùng một đợt việc mà một luật áp cho từng câu tạo
 *  ra cấu trúc mà cổng tổng không nhìn thấy. Cổng tổng đo trung bình; trung
 *  bình không phát hiện được túi. Nên đo theo nhóm.
 *
 *  Ngưỡng khởi đầu ở 21,2 vì nhóm tệ nhất khi đó đang ở 21,15 - mức kho đang
 *  HỎNG, ghi vào để hiện ra trong CI và hạ dần. Sau sáu đợt viết lại, cả bốn
 *  nhóm đã vào trong ±3:
 *
 *      0-40   +2,57      40-60  −2,31      60-90  −1,97      90+  −0,32
 *
 *  nên ngưỡng hạ về 3, ngang MAX_PRACTICE_BIAS_Z và cùng một lý lẽ: ba độ lệch
 *  chuẩn là mức phân biệt được trôi thật với dao động thường. Biên còn lại
 *  mỏng (0,43 ở nhóm 0-40), và điều đó là cố ý - kho vẫn đang lớn lên, nên nếu
 *  một đợt bài mới mang theo cùng khuyết tật thì cổng này phải đỏ. */
const OPENING_BUCKETS = [
  { name: "0-40", lo: 0, hi: 40 },
  { name: "40-60", lo: 40, hi: 60 },
  { name: "60-90", lo: 60, hi: 90 },
  { name: "90+", lo: 90, hi: Infinity },
];

/** Ngưỡng lệch theo nhóm.
 *
 *  TÁCH THEO NGÔN NGỮ, cùng lý do với OPENING_BIAS_Z_BY_LOCALE ngay trên: bản
 *  dịch mang theo văn bản tiếng Anh của riêng nó nên hai kho trôi độc lập. Lần
 *  hạ ngưỡng chung xuống 3 đã làm đỏ ngay audit:lessons:en, vì kho tiếng Anh
 *  chưa được viết lại lần nào và cả bốn nhóm ở đó đều vượt: +14,69 / +11,73 /
 *  +5,31 / −3,43. Một hằng số dùng chung sẽ phải đặt ở mức xấu hơn trong hai,
 *  tức khoá luôn phần tiến độ vừa làm xong bên tiếng Việt. */
const OPENING_BUCKET_Z_BY_LOCALE = { vi: 3, en: 14.7 };
const MAX_OPENING_BUCKET_Z = OPENING_BUCKET_Z_BY_LOCALE[LOCALE] ?? 21.2;
const openingBuckets = OPENING_BUCKETS.map((b) => ({
  ...b, questions: 0, longest: 0, expLongest: 0, varLongest: 0,
}));

const openingStats = {
  questions: 0,
  longest: 0,
  shortest: 0,
  expLongest: 0,
  varLongest: 0,
  expShortest: 0,
  varShortest: 0,
};

const practiceStats = {
  questions: 0,
  longestScore: 0,
  randomScore: 0,
  longest: 0,
  shortest: 0,
  expLongest: 0,
  varLongest: 0,
  expShortest: 0,
  varShortest: 0,
};

for (const lesson of corpus) {
  const stats = quizStats[isPersonalOrProfessionalTrack(lesson)];
  const questions = lesson.quiz ?? [];
  if (!lesson.summary) missingSummary.push(lesson.slug);
  if (!lesson.application) missingApplication.push(lesson.slug);
  if (!lesson.practicePrompt) missingPractice.push(lesson.slug);

  const normalized = questions.map((question) => normalizeQuestion(question.question));
  const tokenSets = normalized.map((text) => new Set(text.split(" ").filter(Boolean)));
  for (let i = 0; i < normalized.length; i++) {
    for (let j = i + 1; j < normalized.length; j++) {
      if (!normalized[i] || !normalized[j]) continue;
      if (normalized[i] === normalized[j]) {
        duplicateQuestions.push({ slug: lesson.slug, i, j, question: questions[i].question });
        continue;
      }
      const similarity = jaccard(tokenSets[i], tokenSets[j]);
      if (similarity >= DUPLICATE_SIMILARITY) {
        nearDuplicateQuestions.push({
          slug: lesson.slug,
          i,
          j,
          similarity,
          a: questions[i].question,
          b: questions[j].question,
        });
      }
    }
  }

  // practicePrompt là một câu trắc nghiệm y hệt một câu quiz, nhưng suốt cả
  // đời bộ kiểm này nó chỉ được ĐẾM XEM CÓ TỒN TẠI KHÔNG. Không ai nhìn vào
  // bên trong, nên nó giữ nguyên đúng khuyết tật mà AGENTS.md ghi là đã sửa
  // xong ở `quiz`: đáp án đúng là cả đoạn lý lẽ, các phương án nhiễu là mấy
  // chữ cụt. Đo lần đầu: 581/618 câu có đáp án dài nhất, và chiến lược "chọn
  // phương án dài nhất" ăn 92,9% so với mức may rủi 25%.
  //
  // Điều làm nó đáng sửa chứ không đáng bỏ qua: 522 trong 581 câu đó ĐÃ có
  // sẵn trường `explanation` từ 150 ký tự trở lên. Lý lẽ đang được chép hai
  // lần, và bản chép nằm đúng chỗ nó không được phép nằm.
  // Cả ba kho câu hỏi, không riêng `quiz`: hai ca đã tìm được nằm một ở
  // openingOptions và một ở practicePrompt.
  for (const [where, options, correct] of [
    ["openingOptions", lesson.openingOptions, lesson.correctOption],
    ["practicePrompt", lesson.practicePrompt?.options, lesson.practicePrompt?.correct],
    ...(lesson.quiz ?? []).map((q, i) => [`quiz[${i}]`, q.options, q.correct]),
  ]) {
    for (const hit of findDuplicateAnswers(options, correct)) {
      duplicateAnswers.push({ slug: lesson.slug, where, correct, ...hit });
    }
  }

  const pp = lesson.practicePrompt;
  if (pp?.options?.length) {
    const lengths = pp.options.map((option) => String(option).length);
    const longest = Math.max(...lengths);
    const shortest = Math.min(...lengths);
    const correctLength = lengths[pp.correct] ?? 0;
    practiceStats.questions++;
    // Điểm kỳ vọng của chiến lược, không phải tỉ lệ trúng - hoà nhau thì
    // người đoán vẫn phải chọn trong số các phương án dài bằng nhau.
    if (correctLength === longest) {
      practiceStats.longestScore += 1 / lengths.filter((l) => l === longest).length;
    }
    practiceStats.randomScore += 1 / lengths.length;

    // Kỳ vọng có tính hoà: nếu hai phương án dài bằng nhau thì xác suất đáp án
    // đúng là một trong số đó không còn là 1/4. Dùng 25% phẳng sẽ báo sai ở
    // đúng những câu có phương án trùng độ dài.
    const pLongest = lengths.filter((l) => l === longest).length / lengths.length;
    const pShortest = lengths.filter((l) => l === shortest).length / lengths.length;
    practiceStats.expLongest += pLongest;
    practiceStats.varLongest += pLongest * (1 - pLongest);
    practiceStats.expShortest += pShortest;
    practiceStats.varShortest += pShortest * (1 - pShortest);
    if (correctLength === longest) practiceStats.longest++;
    if (correctLength === shortest) practiceStats.shortest++;
  }

  // openingOptions: cùng hình dạng, cùng cách đo. Chỉ số đúng nằm ở
  // `correctOption` chứ không phải `correct` - tên khác với mọi trường khác,
  // và đó là một phần lý do nó không được đo suốt thời gian qua.
  const opening = lesson.openingOptions;
  if (opening?.length && typeof lesson.correctOption === "number") {
    const lengths = opening.map((option) => String(option).length);
    const longest = Math.max(...lengths);
    const shortest = Math.min(...lengths);
    openingStats.questions++;
    if (longest !== shortest) {
      const correctLength = lengths[lesson.correctOption] ?? 0;
      const pLongest = lengths.filter((l) => l === longest).length / lengths.length;
      const pShortest = lengths.filter((l) => l === shortest).length / lengths.length;
      openingStats.expLongest += pLongest;
      openingStats.varLongest += pLongest * (1 - pLongest);
      openingStats.expShortest += pShortest;
      openingStats.varShortest += pShortest * (1 - pShortest);
      if (correctLength === longest) openingStats.longest++;
      if (correctLength === shortest) openingStats.shortest++;

      // Cùng số liệu, nhưng tách theo độ dài của phương án nhiễu DÀI NHẤT -
      // đó chính là trục mà người đoán nhìn thấy khi mở câu hỏi ra.
      const cap = Math.max(...lengths.filter((_, i) => i !== lesson.correctOption));
      const bucket = openingBuckets.find((b) => cap >= b.lo && cap < b.hi);
      if (bucket) {
        bucket.questions++;
        bucket.expLongest += pLongest;
        bucket.varLongest += pLongest * (1 - pLongest);
        if (correctLength === longest) bucket.longest++;
      }
    }
  }

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

    // Phép đo đối xứng, kèm mốc ngẫu nhiên tính theo từng câu.
    const maxLength = Math.max(...lengths);
    if (lengths.filter((l) => l === maxLength).length === 1) {
      stats.expectedLongest += 1 / lengths.length;
      if (correctLength === maxLength) stats.uniqueLongest++;
    }
    if (lengths.filter((l) => l === minLength).length === 1) {
      stats.expectedShortest += 1 / lengths.length;
      if (correctLength === minLength) stats.uniqueShortest++;
    }

    // Chiều thứ BA, và nó được thêm vào vì đã bị khai thác một lần: đáp án đúng
    // không phải cực đại duy nhất mà cũng không phải cực tiểu duy nhất, tức nằm
    // ở GIỮA. Hai phép đo trên đo hai chiều riêng rẽ, nên một kho vừa ít khi
    // dài nhất vừa ít khi ngắn nhất sẽ qua cả hai cổng - trong khi loại bỏ hai
    // đầu rồi đoán giữa hai cái còn lại vẫn ăn.
    //
    // Chuyện đã xảy ra thật: sau một đợt sửa "đừng để đáp án đúng dài nhất",
    // kho tiếng Anh có longest 24% và shortest 20% (cả hai đạt) mà tỉ lệ ở giữa
    // là 58,9% so với kỳ vọng 52,8%, z = +5,2. Cắt bớt một đáp án đúng không
    // làm nó ngắn nhất - nó làm nó thôi không còn dài nhất, và dồn vào giữa.
    const uniqueMax = lengths.filter((l) => l === maxLength).length === 1 ? 1 : 0;
    const uniqueMin = lengths.filter((l) => l === minLength).length === 1 ? 1 : 0;
    stats.expectedMiddle += (lengths.length - uniqueMax - uniqueMin) / lengths.length;
    const isUniqueMax = uniqueMax === 1 && correctLength === maxLength;
    const isUniqueMin = uniqueMin === 1 && correctLength === minLength;
    if (!isUniqueMax && !isUniqueMin) stats.middle++;
    stats.ratioSum += mean > 0 ? correctLength / mean : 0;
    (question.options ?? []).forEach((option, index) => {
      if (index === question.correct) return;
      if (isHollowDistractor(option)) {
        hollowDistractors.push({ id: lesson.id, slug: lesson.slug, option: String(option) });
      }
    });

    // Và phép thử ngược: ĐÁP ÁN ĐÚNG có phải một khoảng trống không.
    //
    // Suốt đời bộ kiểm này, luật 4 chỉ được áp lên phương án SAI - vòng lặp
    // ngay trên bỏ qua `question.correct` ngay dòng đầu. Nhưng một câu hỏi mà
    // đáp án ĐÚNG là khoảng trống thì tệ hơn hẳn: nó chấm sai đúng người học
    // biết bài. Đã xảy ra thật, ở revenue-cogs-gross-profit - câu "Gross
    // Margin cao có tốt không?" khoá đáp án vào "Không ảnh hưởng", trong khi
    // phần giải thích của chính câu đó nói "cần xem ngành: Retail 20-30%,
    // Software 70-80%". Tìm ra hoàn toàn tình cờ khi đang soi độ dài.
    for (const ref of findOptionLetterRefs(question)) {
      const row = {
        slug: lesson.slug,
        question: String(question.question ?? "").slice(0, 70),
        ref: ref.ref,
        correct: question.correct,
      };
      letterRefs.push(row);
      // Điều kiện chỉ còn "chữ cái trỏ vào đáp án đúng", KHÔNG cần câu văn
      // mang nghĩa phủ định nữa.
      //
      // Bản đầu bắt buộc phải có một trong các từ lỗi/sai/nhầm/bẫy quanh chỗ
      // nhắc tới, và nó lọt đúng hai ca: credit-spread Q3 viết "Phương án D mô
      // tả độ dốc đường cong" và present-value Q3 viết "Phương án D chính là
      // Future Value" - cả hai đều đang gọi đáp án đúng là một khái niệm khác,
      // không dùng chữ "sai" nào cả. Đọc tay mới thấy.
      //
      // Không cần điều kiện đó: một giải thích gọi tên đáp án ĐÚNG bằng chữ
      // cái thì hoặc là đang mô tả nó thành thứ khác, hoặc là thừa. Đã rà cả
      // corpus, không có ca hợp lệ nào rơi vào đây.
      if (ref.index === question.correct) {
        contradictoryLetterRefs.push({ ...row, context: ref.context.trim() });
      }
    }

    const explanation = String(question.explanation ?? "").trim();
    if (explanation.length < MIN_QUIZ_EXPLANATION_LEN && !explanationCarriesArithmetic(explanation)) {
      thinExplanations.push({
        slug: lesson.slug,
        id: lesson.id,
        question: String(question.question ?? "").slice(0, 60),
        length: explanation.length,
        explanation,
      });
    }

    if (isHollowCorrectAnswer(lengths.length ? (question.options ?? [])[question.correct] : null)) {
      hollowCorrect.push({
        slug: lesson.slug,
        option: String((question.options ?? [])[question.correct]),
        question: String(question.question ?? "").slice(0, 70),
      });
    }
  }

  if (questions.length < MIN_QUESTIONS_FOR_TELL_CHECK) continue;
  const failsPerLesson = lessonLongest / questions.length >= PER_LESSON_TELL_LIMIT;
  if (failsPerLesson && !baseline.has(lesson.slug)) {
    unbaselined.push({ slug: lesson.slug, id: lesson.id, longest: lessonLongest, total: questions.length });
  } else if (!failsPerLesson && baseline.has(lesson.slug)) {
    fixedButStillBaselined.push(lesson.slug);
  }
}

// ── Quiz nằm thẳng trong trang viết tay ────────────────────────────────────
//
// Chỉ chạy các phép kiểm về QUIZ. Ba cổng nội dung còn lại
// (MIN_EXPLANATION_LEN, MIN_DIAGRAM_NODES, MIN_SECTION_BLOCKS) không áp được:
// nội dung dạy của những bài này nằm trong JSX chứ không phải mảng `sections`,
// nên đo chúng bằng thước của dữ liệu sẽ ra kết quả vô nghĩa.
const handAuthored = readHandAuthoredQuizzes(path.join(__dirname, ".."), LOCALE);
const handAuthoredTooFew = [];
/** Trang có MỌI đáp án đúng ở cùng một vị trí.
 *
 *  Kho dữ liệu không cần cổng này: lib/lesson-quiz-balance.js đảo lại thứ tự
 *  phương án lúc sinh dữ liệu, nên mẹo vị trí bị dọn cơ học. Nhưng nó chạy trên
 *  lib/lessons-data, và những trang này KHÔNG đi qua đó - chúng dựng quiz trong
 *  chính trang, nên chúng vượt qua phép đảo ấy mà không ai để ý.
 *
 *  Lúc thêm cổng này, cả hai trang còn lại đều khai QUIZ_CORRECT = [1,1,1,1,1]:
 *  mười câu CÓ CHẤM ĐIỂM, đáp án đúng ở vị trí 1 cả mười. Ai luôn chọn phương
 *  án thứ hai được 10/10 mà không cần biết gì về nợ hay M&A.
 *
 *  Ngưỡng là "mọi câu cùng một vị trí", không phải một tỷ lệ: với 5 câu một
 *  trang thì mọi tỷ lệ đều nhiễu, còn 5/5 cùng vị trí thì không phải ngẫu
 *  nhiên - đó là dấu hiệu của việc gõ tay theo thói quen. */
const handAuthoredSamePosition = [];
for (const { slug, quiz } of handAuthored.lessons) {
  if (quiz.length < MIN_QUIZ_COUNT) handAuthoredTooFew.push({ slug, count: quiz.length });
  const positions = new Set(quiz.map((q) => q.correct));
  if (quiz.length >= MIN_QUIZ_COUNT && positions.size === 1) {
    handAuthoredSamePosition.push({ slug, count: quiz.length, index: [...positions][0] });
  }
  const stats = quizStats.handAuthored;
  for (const question of quiz) {
    const options = question.options ?? [];
    const lengths = options.map((o) => String(o).length);
    if (lengths.length === 0) continue;
    const correctLength = lengths[question.correct] ?? 0;
    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    stats.questions++;
    const maxLength = Math.max(...lengths);
    const minLength = Math.min(...lengths);
    if (correctLength === maxLength) stats.longest++;
    if (correctLength === minLength && lengths.filter((l) => l === minLength).length === 1) {
      stats.shortest++;
    }
    if (lengths.filter((l) => l === maxLength).length === 1) {
      stats.expectedLongest += 1 / lengths.length;
      if (correctLength === maxLength) stats.uniqueLongest++;
    }
    if (lengths.filter((l) => l === minLength).length === 1) {
      stats.expectedShortest += 1 / lengths.length;
      if (correctLength === minLength) stats.uniqueShortest++;
    }

    // Chiều thứ BA, và nó được thêm vào vì đã bị khai thác một lần: đáp án đúng
    // không phải cực đại duy nhất mà cũng không phải cực tiểu duy nhất, tức nằm
    // ở GIỮA. Hai phép đo trên đo hai chiều riêng rẽ, nên một kho vừa ít khi
    // dài nhất vừa ít khi ngắn nhất sẽ qua cả hai cổng - trong khi loại bỏ hai
    // đầu rồi đoán giữa hai cái còn lại vẫn ăn.
    //
    // Chuyện đã xảy ra thật: sau một đợt sửa "đừng để đáp án đúng dài nhất",
    // kho tiếng Anh có longest 24% và shortest 20% (cả hai đạt) mà tỉ lệ ở giữa
    // là 58,9% so với kỳ vọng 52,8%, z = +5,2. Cắt bớt một đáp án đúng không
    // làm nó ngắn nhất - nó làm nó thôi không còn dài nhất, và dồn vào giữa.
    const uniqueMax = lengths.filter((l) => l === maxLength).length === 1 ? 1 : 0;
    const uniqueMin = lengths.filter((l) => l === minLength).length === 1 ? 1 : 0;
    stats.expectedMiddle += (lengths.length - uniqueMax - uniqueMin) / lengths.length;
    const isUniqueMax = uniqueMax === 1 && correctLength === maxLength;
    const isUniqueMin = uniqueMin === 1 && correctLength === minLength;
    if (!isUniqueMax && !isUniqueMin) stats.middle++;
    stats.ratioSum += mean > 0 ? correctLength / mean : 0;
    options.forEach((option, index) => {
      if (index === question.correct) {
        if (isHollowCorrectAnswer(option)) {
          hollowCorrect.push({
            slug,
            option: String(option),
            question: String(question.question ?? "").slice(0, 70),
          });
        }
        return;
      }
      if (isHollowDistractor(option)) {
        hollowDistractors.push({ id: slug, slug, option: String(option) });
      }
    });
  }
}
if (handAuthored.skipped.length > 0) {
  // Bỏ sót IM LẶNG là đúng cách chuyện này xảy ra lần đầu, nên mọi bài không
  // đọc được đều phải hiện ra.
  console.log(
    `\n  ${handAuthored.skipped.length} trang viết tay không đọc được quiz: ` +
      handAuthored.skipped.map((x) => `${x.slug} (${x.reason})`).join(", ")
  );
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

// ── Lệch độ dài, đo bằng z ─────────────────────────────────────────────────
/** Bao nhiêu độ lệch chuẩn so với ngẫu nhiên. Dấu âm nghĩa là đáp án đúng
 *  HIẾM khi rơi vào cực trị đó - cũng khai thác được, chỉ theo chiều ngược:
 *  loại phương án đó ra rồi đoán trong ba cái còn lại. */
function biasZ(observed, expected, questions) {
  if (expected <= 0 || questions <= 0) return 0;
  const variance = expected * (1 - expected / questions);
  return variance > 0 ? (observed - expected) / Math.sqrt(variance) : 0;
}

const biasRows = [];
for (const [track, st] of Object.entries(quizStats)) {
  if (st.questions === 0) continue;
  biasRows.push({
    name: track,
    zLong: biasZ(st.uniqueLongest, st.expectedLongest, st.questions),
    zShort: biasZ(st.uniqueShortest, st.expectedShortest, st.questions),
    zMid: biasZ(st.middle, st.expectedMiddle, st.questions),
    st,
  });
}
const totals = Object.values(quizStats).reduce(
  (a, st) => ({
    questions: a.questions + st.questions,
    uniqueLongest: a.uniqueLongest + st.uniqueLongest,
    uniqueShortest: a.uniqueShortest + st.uniqueShortest,
    expectedLongest: a.expectedLongest + st.expectedLongest,
    expectedShortest: a.expectedShortest + st.expectedShortest,
    middle: a.middle + st.middle,
    expectedMiddle: a.expectedMiddle + st.expectedMiddle,
  }),
  {
    questions: 0,
    uniqueLongest: 0,
    uniqueShortest: 0,
    expectedLongest: 0,
    expectedShortest: 0,
    middle: 0,
    expectedMiddle: 0,
  }
);
biasRows.push({
  name: "TOTAL",
  zLong: biasZ(totals.uniqueLongest, totals.expectedLongest, totals.questions),
  zShort: biasZ(totals.uniqueShortest, totals.expectedShortest, totals.questions),
  zMid: biasZ(totals.middle, totals.expectedMiddle, totals.questions),
  st: totals,
});

console.log(
  `\n=== LENGTH BIAS (unique extreme only; expectation is tie-aware, not a flat 25%) ===`
);
for (const r of biasRows) {
  const mark = (z) => (Math.abs(z) > MAX_LENGTH_BIAS_Z ? " <<<" : "");
  console.log(
    `  ${r.name.padEnd(13)} longest ${String(r.st.uniqueLongest).padStart(5)} vs ` +
      `${String(Math.round(r.st.expectedLongest)).padStart(5)} expected  z=${r.zLong.toFixed(1).padStart(5)}${mark(r.zLong)}` +
      `   shortest ${String(r.st.uniqueShortest).padStart(5)} vs ` +
      `${String(Math.round(r.st.expectedShortest)).padStart(5)}  z=${r.zShort.toFixed(1).padStart(5)}${mark(r.zShort)}`
  );
  console.log(
    `  ${"".padEnd(13)} middle  ${String(r.st.middle).padStart(5)} vs ` +
      `${String(Math.round(r.st.expectedMiddle)).padStart(5)} expected  z=${r.zMid.toFixed(1).padStart(5)}` +
      `${Math.abs(r.zMid) > MAX_MIDDLE_BIAS_Z ? " <<<" : ""}`
  );
}
const worstBias = biasRows.reduce(
  (w, r) => Math.max(w, Math.abs(r.zLong), Math.abs(r.zShort), Math.abs(r.zMid)),
  0
);
console.log(
  `  worst |z| = ${worstBias.toFixed(2)} — ceiling ${MAX_LENGTH_BIAS_Z}. ` +
    `Lower it after a rewrite batch; never raise it.`
);

// ── Tóm tắt và áp dụng ─────────────────────────────────────────────────────
//
// Hai khối này KHÔNG có cổng cứng, và đó là chủ ý tạm thời: 26 bài đang thiếu,
// nên đặt cổng ở 100% hôm nay là tạo nợ cho những bài vừa được viết - đúng thứ
// mà luật "đặt cổng ở mức kho đã đạt" cấm. Nhưng chúng cũng không được im
// lặng: cho tới hôm nay, thiếu chúng không hề lộ ra ở đâu cả, vì
// LessonPageClient có hai hàm dựng thay thế sinh ra chữ rỗng ("Bài này giúp
// bạn hiểu rõ hơn về <tên bài>") trông y hệt một tóm tắt thật. Hai hàm đó đã
// bị gỡ; danh sách dưới đây là thứ thay thế chúng.
//
// Khi con số này về 0, biến nó thành cổng cứng như MIN_QUIZ_COUNT.
console.log(`\n=== SUMMARY / APPLICATION / PRACTICE ===`);
if (missingSummary.length === 0 && missingApplication.length === 0 && missingPractice.length === 0) {
  console.log(`  Mọi bài đều có cả ba, và practicePrompt đã là cổng cứng ở 0.`);
} else {
  console.log(
    `  ${missingSummary.length} thiếu summary · ${missingApplication.length} thiếu application · ` +
      `${missingPractice.length} thiếu practicePrompt.\n` +
      `  Trang bài học giờ KHÔNG dựng thẻ cho chúng - chỗ trống thấy được, chữ rỗng thì không.`
  );
  const shown = [...new Set([...missingSummary, ...missingApplication, ...missingPractice])].sort();
  shown.slice(0, 30).forEach((slug) => console.log(`    ${slug}`));
  if (shown.length > 30) console.log(`    … và ${shown.length - 30} bài nữa`);
}

if (practiceStats.questions > 0) {
  const score = practiceStats.longestScore / practiceStats.questions;
  const chance = practiceStats.randomScore / practiceStats.questions;
  const zLong = practiceBiasZ("longest");
  const zShort = practiceBiasZ("shortest");
  console.log(
    `  practicePrompt: ${practiceStats.questions} câu · "chọn phương án dài nhất" ăn ` +
      `${(score * 100).toFixed(1)}% (may rủi ${(chance * 100).toFixed(1)}%)`
  );
  console.log(
    `    dài nhất : ${practiceStats.longest} vs ${practiceStats.expLongest.toFixed(0)} kỳ vọng` +
      `  z = ${zLong.toFixed(2)}`
  );
  console.log(
    `    ngắn nhất: ${practiceStats.shortest} vs ${practiceStats.expShortest.toFixed(0)} kỳ vọng` +
      `  z = ${zShort.toFixed(2)}   (trần |z| ${MAX_PRACTICE_BIAS_Z})`
  );
  console.log(
    `  Đích là đáp án đúng nằm GIỮA nhóm - cắt cho ngắn nhất chỉ đổi mách nước này lấy mách nước kia.`
  );
}

if (openingStats.questions > 0) {
  const zLong = openingBiasZ("longest");
  const zShort = openingBiasZ("shortest");
  console.log(
    `  openingOptions: ${openingStats.questions} câu mở đầu` +
      `  ·  dài nhất ${openingStats.longest} vs ${openingStats.expLongest.toFixed(0)} kỳ vọng` +
      `  z = ${zLong.toFixed(2)}` +
      `  ·  ngắn nhất ${openingStats.shortest} vs ${openingStats.expShortest.toFixed(0)}` +
      `  z = ${zShort.toFixed(2)}   (trần |z| ${MAX_OPENING_BIAS_Z})`
  );
}

if (openingBuckets.some((b) => b.questions > 0)) {
  console.log("    theo nhóm độ dài của phương án nhiễu dài nhất:");
  for (const b of openingBuckets) {
    if (!b.questions) continue;
    const z = b.varLongest > 0 ? (b.longest - b.expLongest) / Math.sqrt(b.varLongest) : 0;
    console.log(
      `      ${b.name.padEnd(6)} ${String(b.questions).padStart(4)} câu` +
        `  ·  dài nhất ${String(b.longest).padStart(4)} vs ${b.expLongest.toFixed(0).padStart(4)} kỳ vọng` +
        `  z = ${z.toFixed(2)}`
    );
  }
  console.log(`    (trần |z| mỗi nhóm ${MAX_OPENING_BUCKET_Z} - trung bình toàn kho không thấy được túi)`);
}
const biasFailures = biasRows.filter(
  (r) =>
    Math.abs(r.zLong) > MAX_LENGTH_BIAS_Z ||
    Math.abs(r.zShort) > MAX_LENGTH_BIAS_Z ||
    Math.abs(r.zMid) > MAX_MIDDLE_BIAS_Z
);
console.log(
  `  baseline: ${baseline.size} lessons grandfathered  ·  ` +
    `${unbaselined.length} not baselined  ·  ${fixedButStillBaselined.length} fixed but still listed`
);

const tellFailures = [];

console.log(
  `\nCâu hỏi lặp trong cùng một bài: ${duplicateQuestions.length} trùng tuyệt đối (cổng 0)  ·  ` +
    `${nearDuplicateQuestions.length} gần trùng >= ${DUPLICATE_SIMILARITY} (cảnh báo)`
);
if (nearDuplicateQuestions.length > 0) {
  for (const row of nearDuplicateQuestions.sort((a, b) => b.similarity - a.similarity)) {
    console.log(`  ${row.similarity.toFixed(2)} ${row.slug} q${row.i}/q${row.j}`);
    console.log(`      A: ${row.a}`);
    console.log(`      B: ${row.b}`);
  }
  console.log(
    "  Đọc từng cặp: hai câu đối nhau về nghĩa cũng gần trùng về từ, nên danh sách này\n" +
      "  có dương tính giả. Cặp nào thật thì viết lại một câu sang khía cạnh chưa được hỏi."
  );
}

if (duplicateQuestions.length > 0) {
  tellFailures.push(
    `${duplicateQuestions.length} câu hỏi bị lặp NGUYÊN VĂN trong cùng một bài - ` +
      `quiz phần lớn chỉ có 5 câu, nên mỗi câu lặp là một phần năm bài kiểm tra biến mất:\n` +
      duplicateQuestions
        .map((row) => `    ${row.slug} q${row.i} = q${row.j} - "${row.question}"`)
        .join("\n") +
      `\n  Viết lại một trong hai sang khía cạnh chưa được hỏi của chính bài đó, ` +
      `đừng xoá bớt: MIN_QUIZ_COUNT vẫn là ${MIN_QUIZ_COUNT}.`
  );
}

if (hollowDistractors.length > MAX_HOLLOW_DISTRACTORS) {
  tellFailures.push(
    `${hollowDistractors.length} distractor(s) are blank space rather than a wrong answer ` +
      `(AGENTS.md rule 4) - each one turns a four-option question into a two-option one:\n` +
      hollowDistractors
        .sort((a, b) => a.id - b.id)
        .map((row) => `    [${row.id}] ${row.slug} - "${row.option}"`)
        .join("\n") +
      `\n  Replace each with a mistake a learner actually makes. The budget is 0: this is ` +
      `not a backlog, it is a shape of option that should never be written.`
  );
}

// ── Cổng: phần giải thích quiz quá mỏng ───────────────────────────────────
const thinBySlug = new Map();
for (const row of thinExplanations) {
  if (!thinBySlug.has(row.slug)) thinBySlug.set(row.slug, []);
  thinBySlug.get(row.slug).push(row);
}
const thinUnbaselined = [...thinBySlug.keys()].filter((slug) => !thinBaseline.has(slug)).sort();
const thinFixedButStillBaselined = [...thinBaseline].filter((slug) => !thinBySlug.has(slug)).sort();

console.log(
  `\nThin quiz explanations (<${MIN_QUIZ_EXPLANATION_LEN} chars, no arithmetic): ` +
    `${thinExplanations.length} question(s) in ${thinBySlug.size} lesson(s)  ·  ` +
    `${thinBaseline.size} grandfathered  ·  ${thinUnbaselined.length} not baselined  ·  ` +
    `${thinFixedButStillBaselined.length} fixed but still listed`
);

if (thinUnbaselined.length > 0) {
  tellFailures.push(
    `${thinUnbaselined.length} lesson(s) có câu quiz với phần giải thích mỏng và chưa được ` +
      `grandfather trong ${path.basename(thinBaselinePath)}:\n` +
      thinUnbaselined
        .slice(0, 15)
        .map((slug) => {
          const rows = thinBySlug.get(slug);
          const first = rows[0];
          return `    ${slug} (${rows.length} câu) - "${first.question}" → ${first.length} ký tự: "${first.explanation}"`;
        })
        .join("\n") +
      (thinUnbaselined.length > 15 ? `\n    ... và ${thinUnbaselined.length - 15} bài nữa` : "") +
      `\n  Rule 1 của AGENTS.md dời lập luận vào chính trường này, nên nó là phần dạy học` +
      ` chứ không phải chú thích. Viết vì sao các phương án kia SAI, đừng nhắc lại đáp án.` +
      ` Câu mang phép tính được miễn trừ tự động.`
  );
}

console.log(
  `\nCâu có hai đáp án đúng: ${duplicateAnswers.length}` +
    (duplicateAnswers.length === 0 ? "  (nhiễu trần trùng đáp số với đáp án đúng)" : "")
);
if (duplicateAnswers.length > 0) {
  tellFailures.push(
    `${duplicateAnswers.length} câu có phương án nhiễu trả lời đúng y như đáp án được khoá:\n` +
      duplicateAnswers
        .map(
          (row) =>
            `    ${row.slug} ${row.where}: [${row.index}] "${row.option}" ${row.reason},` +
            ` trong khi correct = ${row.correct}`
        )
        .join("\n") +
      `\n  Người học tính đúng rồi chọn phương án kia thì bị chấm sai. Viết lại phương án` +
      ` nhiễu thành một đáp số KHÁC, kèm phép tính sinh ra nó.`
  );
}

console.log(
  `\nOption-letter refs in explanations: ${letterRefs.length} total, ` +
    `${contradictoryLetterRefs.length} contradicting the keyed answer`
);
if (letterRefs.length > contradictoryLetterRefs.length) {
  console.log(
    `  Số còn lại chưa chứng minh được là sai, nhưng chữ cái không sống sót qua` +
      ` balanceLessonQuizzes, nên chúng chỉ đang đúng nhờ may mắn.`
  );
}

if (contradictoryLetterRefs.length > 0) {
  tellFailures.push(
    `${contradictoryLetterRefs.length} explanation(s) gọi chính ĐÁP ÁN ĐÚNG là phương án sai:\n` +
      contradictoryLetterRefs
        .map((row) => `    ${row.slug} - "${row.question}"\n      ${row.ref} = correct (index ${row.correct}): ...${row.context}...`)
        .join("\n") +
      `\n  Gọi tên phương án sai bằng NỘI DUNG của nó ("cộng thẳng không chiết khấu"),` +
      ` không bằng chữ cái - thứ tự option bị xáo lại lúc build.`
  );
}

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

const shareGatesEnforced = totalQuestions >= MIN_QUESTIONS_FOR_SHARE_GATES;
if (!shareGatesEnforced) {
  console.log(
    `\n  Share gates reported only: ${totalQuestions} questions is under the ` +
      `${MIN_QUESTIONS_FOR_SHARE_GATES}-question floor where a share is stable enough to gate on. ` +
      `MAX_LENGTH_BIAS_Z is still enforced.`
  );
}

if (shareGatesEnforced && shortestShare > MAX_SHORTEST_SHARE) {
  tellFailures.push(
    `${totalShortest}/${totalQuestions} questions (${Math.round(shortestShare * 100)}%) have the correct ` +
      `answer as the uniquely shortest option, over the ${Math.round(MAX_SHORTEST_SHARE * 100)}% ceiling. ` +
      `Chance is 25%; lengthen the correct option rather than padding a distractor.`
  );
}

if (shareGatesEnforced && tellShare > MAX_TELL_SHARE) {
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

// Gieo baseline giải thích mỏng - CHẠY ĐÚNG MỘT LẦN, và tự chặn lần thứ hai.
//
// Baseline phải sinh ra từ chính vòng đo ở trên chứ không phải một script rời:
// hai bộ dò viết riêng sẽ lệch nhau, và lúc đó danh sách grandfather sẽ không
// khớp với thứ mà cổng đang bắt.
//
// Nhưng một lệnh "ghi cả danh sách hiện tại" thì phá đúng tính chất khiến
// baseline có giá trị - nó sẽ thành cách rửa sạch mọi bài mới viết ẩu. Nên nó
// từ chối chạy khi file đã tồn tại: gieo được một lần, sau đó chỉ còn
// --write-baseline, thứ chỉ biết bớt đi.
if (process.argv.includes("--seed-thin-baseline")) {
  if (existsSync(thinBaselinePath)) {
    console.error(
      `\n${path.basename(thinBaselinePath)} đã tồn tại. Baseline chỉ được gieo một lần; ` +
        `từ đây chỉ dùng --write-baseline để bớt bài đã sửa xong.`
    );
    process.exit(1);
  }
  const seeded = [...thinBySlug.keys()].sort();
  writeFileSync(
    thinBaselinePath,
    `${JSON.stringify(
      {
        _comment:
          "Nợ tồn của cổng giải thích quiz mỏng trong scripts/audit-lesson-content.mjs. " +
          "Bài nằm trong danh sách này có ít nhất một câu quiz mà phần giải thích ngắn hơn " +
          "MIN_QUIZ_EXPLANATION_LEN và không mang phép tính - tức là nó nhắc lại đáp án chứ " +
          "không nói vì sao các phương án kia sai. Danh sách CHỈ được co lại: bài không nằm " +
          "ở đây bắt buộc phải qua cổng, nên một bài mới viết không thể thêm vào nợ này. " +
          "Sửa xong một bài thì chạy `node scripts/audit-lesson-content.mjs --write-baseline` để bỏ nó ra.",
        lessons: seeded,
      },
      null,
      2
    )}\n`
  );
  console.log(`\nĐã gieo baseline giải thích mỏng: ${seeded.length} bài.`);
  process.exit(0);
}

// Shrinking the baseline is the routine follow-up to a rewrite batch, so it
// gets a flag rather than a hand edit of 437 entries. It only ever removes
// slugs: anything that still fails stays, and anything not already listed is
// never added, so the flag can't be used to launder a new failure.
if (process.argv.includes("--write-baseline")) {
  const kept = [...baseline].filter((slug) => !fixedButStillBaselined.includes(slug)).sort();
  const current = existsSync(baselinePath) ? JSON.parse(readFileSync(baselinePath, "utf8")) : {};
  writeFileSync(baselinePath, `${JSON.stringify({ ...current, lessons: kept }, null, 2)}\n`);
  console.log(
    `\nBaseline rewritten: ${baseline.size} -> ${kept.length} lessons ` +
      `(removed ${fixedButStillBaselined.length}).`
  );

  // Cùng quy tắc cho baseline giải thích mỏng: chỉ bớt, không bao giờ thêm.
  const thinKept = [...thinBaseline].filter((slug) => !thinFixedButStillBaselined.includes(slug)).sort();
  const thinCurrent = existsSync(thinBaselinePath)
    ? JSON.parse(readFileSync(thinBaselinePath, "utf8"))
    : {};
  writeFileSync(thinBaselinePath, `${JSON.stringify({ ...thinCurrent, lessons: thinKept }, null, 2)}\n`);
  console.log(
    `Thin-explanation baseline rewritten: ${thinBaseline.size} -> ${thinKept.length} lessons ` +
      `(removed ${thinFixedButStillBaselined.length}).`
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

if (handAuthoredTooFew.length > 0 && !process.argv.includes("--warn-only")) {
  console.error(
    `\n${handAuthoredTooFew.length} trang bài học viết tay dưới ${MIN_QUIZ_COUNT} câu quiz:\n` +
      handAuthoredTooFew.map((x) => `  ${x.slug}: ${x.count} câu`).join("\n") +
      `\n\n  Quiz của chúng nằm thẳng trong app/bai-hoc/<slug>/page.tsx và VẪN được\n` +
      `  chấm vào avg_quiz_score, nên chúng chịu cùng ngưỡng với mọi bài khác.`
  );
  process.exit(1);
}

if (handAuthoredSamePosition.length > 0 && !process.argv.includes("--warn-only")) {
  console.error(
    `\n${handAuthoredSamePosition.length} trang bài học viết tay có MỌI đáp án ở cùng một vị trí:\n` +
      handAuthoredSamePosition
        .map((x) => `  ${x.slug}: ${x.count}/${x.count} câu đáp án ở vị trí ${x.index}`)
        .join("\n") +
      `\n\n  Chọn mãi một vị trí là đúng hết mà không cần biết gì. Kho dữ liệu được\n` +
      `  lib/lesson-quiz-balance.js đảo thứ tự tự động, nhưng những trang này không\n` +
      `  đi qua đó - phải rải tay: đổi thứ tự options rồi sửa QUIZ_CORRECT cho khớp.`
  );
  process.exit(1);
}

if (hollowCorrect.length > 0 && !process.argv.includes("--warn-only")) {
  console.error(
    `\n${hollowCorrect.length} câu có ĐÁP ÁN ĐÚNG là một khoảng trống:\n` +
      hollowCorrect
        .map((h) => `  ${h.slug}: «${h.option}»  ← ${h.question}`)
        .join("\n") +
      `\n\n  Luật 4 của AGENTS.md cấm phương án rỗng vì nó loại được ngay từ cái\n` +
      `  nhìn đầu tiên. Khi thứ rỗng đó lại là đáp án ĐÚNG thì hậu quả nặng hơn:\n` +
      `  người học hiểu bài sẽ chọn phương án có nội dung và bị chấm sai.\n` +
      `  Gần như luôn là khoá nhầm ô - đối chiếu với phần explanation của câu đó.`
  );
  process.exit(1);
}

if (biasFailures.length > 0 && !process.argv.includes("--warn-only")) {
  console.error(
    // In CẢ BA chỉ số và đánh dấu cái vượt. Bản trước lọc theo ba (dài, ngắn,
    // giữa) nhưng chỉ in hai và chỉ trích MAX_LENGTH_BIAS_Z, nên một lần đỏ vì
    // `giữa` hiện ra thành "vượt ngưỡng |z| > 3.2" bên cạnh hai con số đều
    // DƯỚI 3.2 - đọc như bộ kiểm tự mâu thuẫn, và phải mở mã ra mới biết cổng
    // nào thật sự hỏng.
    `\n${biasFailures.length} track/tổng vượt ngưỡng lệch độ dài ` +
      `(|z| dài/ngắn > ${MAX_LENGTH_BIAS_Z}, |z| giữa > ${MAX_MIDDLE_BIAS_Z}):\n` +
      biasFailures
        .map((r) => {
          const mark = (z, ceiling) => (Math.abs(z) > ceiling ? " <<<" : "");
          return (
            `  ${r.name}: ` +
            `z(dài) = ${r.zLong.toFixed(2)}${mark(r.zLong, MAX_LENGTH_BIAS_Z)}, ` +
            `z(ngắn) = ${r.zShort.toFixed(2)}${mark(r.zShort, MAX_LENGTH_BIAS_Z)}, ` +
            `z(giữa) = ${r.zMid.toFixed(2)}${mark(r.zMid, MAX_MIDDLE_BIAS_Z)}`
          );
        })
        .join("\n") +
      `\n\n  Dấu DƯƠNG ở dài/ngắn: đáp án đúng quá hay là phương án dài nhất (hoặc\n` +
      `  ngắn nhất) - đoán theo độ dài là ăn. Dấu ÂM cũng khai thác được, chỉ\n` +
      `  ngược chiều: loại đúng phương án đó ra rồi đoán trong ba cái còn lại.\n` +
      `  z(giữa) dương: đáp án đúng không dài nhất cũng không ngắn nhất - loại\n` +
      `  cả hai đầu rồi đoán giữa hai cái còn lại vẫn hơn xác suất.\n` +
      `  Sửa bằng cách viết lại NHIỄU, không bằng cách cắt đáp án đúng (cắt nó\n` +
      `  là đẩy nó vào giữa) và không bằng cách nâng ngưỡng.`
  );
  process.exit(1);
}

if (practiceStats.questions > 0) {
  const zLong = practiceBiasZ("longest");
  const zShort = practiceBiasZ("shortest");
  const worst = Math.abs(zLong) > Math.abs(zShort) ? zLong : zShort;
  if (Math.abs(worst) > MAX_PRACTICE_BIAS_Z && !process.argv.includes("--warn-only")) {
    console.error(
      `\npracticePrompt lệch độ dài |z| = ${Math.abs(worst).toFixed(2)}, vượt ngưỡng ` +
        `${MAX_PRACTICE_BIAS_Z}.\n` +
        `  z(dài) = ${zLong.toFixed(2)}, z(ngắn) = ${zShort.toFixed(2)}\n\n` +
        `  Cả hai chiều đều khai thác được. Dương ở chiều "dài": chọn phương án dài\n` +
        `  nhất là ăn. Dương ở chiều "ngắn": chọn phương án ngắn nhất là ăn. Cắt đáp\n` +
        `  án đúng xuống ngắn nhất để chữa chiều thứ nhất chính là cách tạo ra chiều\n` +
        `  thứ hai - đích là đáp án đúng nằm GIỮA nhóm.\n` +
        `  Sửa bằng cách viết lại phương án, không bằng cách nâng ngưỡng.`
    );
    process.exit(1);
  }
}

if (openingStats.questions > 0) {
  const zLong = openingBiasZ("longest");
  const zShort = openingBiasZ("shortest");
  const worst = Math.abs(zLong) > Math.abs(zShort) ? zLong : zShort;
  if (Math.abs(worst) > MAX_OPENING_BIAS_Z && !process.argv.includes("--warn-only")) {
    console.error(
      `\nopeningOptions lệch độ dài |z| = ${Math.abs(worst).toFixed(2)}, vượt ngưỡng ` +
        `${MAX_OPENING_BIAS_Z}.\n` +
        `  z(dài) = ${zLong.toFixed(2)}, z(ngắn) = ${zShort.toFixed(2)}\n\n` +
        `  Cắt đáp án đúng về đúng mệnh đề - phần lý lẽ đã nằm ở explanation của bài.\n` +
        `  Đích là PHÂN BỐ: khoảng một phần tư dài nhất, một phần tư ngắn nhất.\n` +
        `  Sửa bằng cách viết lại phương án, không bằng cách nâng ngưỡng.`
    );
    process.exit(1);
  }
}

{
  const bad = openingBuckets
    .filter((b) => b.questions > 0 && b.varLongest > 0)
    .map((b) => ({ b, z: (b.longest - b.expLongest) / Math.sqrt(b.varLongest) }))
    .filter(({ z }) => Math.abs(z) > MAX_OPENING_BUCKET_Z);
  if (bad.length > 0 && !process.argv.includes("--warn-only")) {
    console.error(
      `\nopeningOptions: ${bad.length} nhóm độ dài vượt ngưỡng |z| > ${MAX_OPENING_BUCKET_Z}:\n` +
        bad.map(({ b, z }) => `  nhiễu ${b.name}: ${b.longest}/${b.questions} câu, z = ${z.toFixed(2)}`).join("\n") +
        `\n\n  Toàn kho có thể đứng đúng mức may rủi mà vẫn có túi khai thác được:\n` +
        `  một nhóm dương và một nhóm âm triệt tiêu nhau khi lấy trung bình.\n` +
        `  Đích là mỗi nhóm đều gần may rủi, không phải chỉ con số tổng.`
    );
    process.exit(1);
  }
}

/** practicePrompt là CỔNG CỨNG: mọi bài phải có một câu luyện tập.
 *
 *  Hằng số này từng là một trần bậc thang, đặt ở 97 rồi hạ dần theo từng đợt
 *  viết - đúng luật của AGENTS.md, cổng đặt ở mức kho ĐÃ ĐẠT để chặn phình
 *  thêm mà không tạo nợ. 97 → 84 → 73 → 61 → 0, và ở 0 thì bậc thang hết việc:
 *  nó thành một cổng cứng như MIN_QUIZ_COUNT.
 *
 *  Một ĐẾM là đúng ở đây chứ không phải một tỉ lệ - ngược với MAX_TELL_SHARE.
 *  Đây là tồn đọng phải rút về 0, không phải một phân phối, nên kho lớn thêm
 *  mười bài đều có practicePrompt thì số này đứng yên và đúng là nên đứng yên.
 *  Một tỉ lệ sẽ làm ngược lại: viết thêm bài đủ nhiều là tỉ lệ tự đẹp mà không
 *  ai sửa gì.
 *
 *  Không bao giờ nâng nó lên khỏi 0 để một build đỏ thành xanh. Bài mới thiếu
 *  practicePrompt thì viết cho nó một câu, không nới cổng. */
const MAX_MISSING_PRACTICE = 0;

if (missingPractice.length > MAX_MISSING_PRACTICE && !process.argv.includes("--warn-only")) {
  console.error(
    `\n${missingPractice.length} bài thiếu practicePrompt.\n` +
      `  Mọi bài phải có một câu luyện tập. Viết practicePrompt cho chúng:\n` +
      `  một tình huống áp dụng, bốn phương án theo luật 1-6 của AGENTS.md.\n` +
      `  Đây là cổng cứng - đừng nâng nó lên khỏi 0.`
  );
  process.exit(1);
}

if (tellFailures.length > 0 && !process.argv.includes("--warn-only")) {
  console.error(`\n${tellFailures.join("\n\n")}`);
  process.exit(1);
}

if (total > 0 && !process.argv.includes("--warn-only")) {
  console.error(
    `\n${total} lesson(s) below the minimum content bar. Each needs at least ` +
      `${MIN_QUIZ_COUNT} quiz questions, a ${MIN_EXPLANATION_LEN}+ char explanation, ` +
      `an openingQuestion with options, a diagram of at least 2 nodes, and a body of at least 5 section blocks.\n` +
      `Fix them in lib/lessons.ts (or lib/lesson-quiz-overrides.js for slugs it ` +
      `overrides), re-run scripts/generate-lesson-data.mjs, then run this again.`
  );
  process.exit(1);
}
