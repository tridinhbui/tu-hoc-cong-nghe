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
const HOLLOW_DISTRACTOR = new RegExp(
  "^(luôn (tốt|xấu|đúng|sai)" +
    "|không (ảnh hưởng|liên quan|quan trọng|có khái niệm|cần|có lý do|thể (tính|xác định)|công thức|đổi)" +
    "|tùy ý|bình thường|tidak ada|thứ tự không)",
  "i"
);
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
function isHollowCorrectAnswer(option) {
  if (option === null || option === undefined) return false;
  const text = String(option).trim().replace(/\.$/, "");
  if (!text) return false;
  if (/\d/.test(text)) return false; // "15%", "2x" là đáp án số hợp lệ
  if (text.split(/\s+/).length > 5) return false;
  return /^(không|luôn|chỉ|đều|mọi|tất cả)\b/i.test(text);
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

const baselinePath = path.join(__dirname, "lesson-quiz-tell-baseline.json");
const baseline = new Set(JSON.parse(readFileSync(baselinePath, "utf8")).lessons);

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
const MAX_LENGTH_BIAS_Z = 4.5;

const quizStats = { personal: null, professional: null, bonus: null };
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

function findOptionLetterRefs(question) {
  const explanation = String(question?.explanation ?? "");
  const found = [];
  OPTION_LETTER_RE.lastIndex = 0;
  let match;
  while ((match = OPTION_LETTER_RE.exec(explanation))) {
    const index = "ABCD".indexOf(match[2].toUpperCase());
    // Cửa sổ quanh chỗ nhắc tới, không phải cả đoạn: một giải thích dài thường
    // có chữ "sai" ở chỗ khác hoàn toàn, và lấy cả đoạn thì câu nào cũng dính.
    const context = explanation.slice(Math.max(0, match.index - 90), match.index + 120);
    found.push({ ref: match[0], index, context });
  }
  return found;
}

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

/** Trần cho điểm của chiến lược "chọn phương án dài nhất" trong practicePrompt.
 *
 *  Đặt ở 0,92 vì kho đang ở 0,917 - đúng luật của AGENTS.md: cổng đặt ở mức
 *  kho ĐÃ ĐẠT, không tạo nợ. Ở mức này nó chưa chặn được gì; việc của nó lúc
 *  này là làm con số hiện ra trong CI và bị hạ dần sau mỗi đợt viết lại, y
 *  như MAX_TELL_SHARE đã được hạ từ 0,91 xuống. Mức đích là 0,25 - may rủi.
 *
 *  Cách sửa một câu: cắt đáp án đúng về đúng mệnh đề, vì phần lý lẽ đã nằm
 *  sẵn ở `explanation` ngay bên dưới. Không phải kéo dài các phương án nhiễu. */
const MAX_PRACTICE_LONGEST_SCORE = 0.92;
const practiceStats = { questions: 0, longestScore: 0, randomScore: 0 };

for (const file of files) {
  const lesson = JSON.parse(readFileSync(path.join(dataDir, file), "utf8"));
  const stats = quizStats[isPersonalOrProfessionalTrack(lesson)];
  const questions = lesson.quiz ?? [];
  if (!lesson.summary) missingSummary.push(lesson.slug);
  if (!lesson.application) missingApplication.push(lesson.slug);
  if (!lesson.practicePrompt) missingPractice.push(lesson.slug);

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
  const pp = lesson.practicePrompt;
  if (pp?.options?.length) {
    const lengths = pp.options.map((option) => String(option).length);
    const longest = Math.max(...lengths);
    practiceStats.questions++;
    // Điểm kỳ vọng của chiến lược, không phải tỉ lệ trúng - hoà nhau thì
    // người đoán vẫn phải chọn trong số các phương án dài bằng nhau.
    if ((lengths[pp.correct] ?? 0) === longest) {
      practiceStats.longestScore += 1 / lengths.filter((l) => l === longest).length;
    }
    practiceStats.randomScore += 1 / lengths.length;
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
      // Điều kiện chỉ là "chữ cái trỏ vào đáp án đúng", KHÔNG cần câu văn mang
      // nghĩa phủ định. Bản đầu bắt buộc phải có một trong các từ
      // lỗi/sai/nhầm/bẫy quanh đó, và nó lọt đúng hai ca: credit-spread Q3 viết
      // "Phương án D mô tả độ dốc đường cong" và present-value Q3 viết "Phương
      // án D chính là Future Value" - cả hai đều đang gọi đáp án đúng là một
      // khái niệm khác, không dùng chữ "sai" nào cả.
      if (ref.index === question.correct) {
        contradictoryLetterRefs.push({ ...row, context: ref.context.trim() });
      }
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
  }),
  { questions: 0, uniqueLongest: 0, uniqueShortest: 0, expectedLongest: 0, expectedShortest: 0 }
);
biasRows.push({
  name: "TOTAL",
  zLong: biasZ(totals.uniqueLongest, totals.expectedLongest, totals.questions),
  zShort: biasZ(totals.uniqueShortest, totals.expectedShortest, totals.questions),
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
}
const worstBias = biasRows.reduce(
  (w, r) => Math.max(w, Math.abs(r.zLong), Math.abs(r.zShort)),
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
  console.log(`  Mọi bài đều có cả ba. Giờ hãy biến việc này thành cổng cứng.`);
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
  console.log(
    `  practicePrompt: ${practiceStats.questions} câu · "chọn phương án dài nhất" ăn ` +
      `${(score * 100).toFixed(1)}% (may rủi ${(chance * 100).toFixed(1)}%) · trần ` +
      `${(MAX_PRACTICE_LONGEST_SCORE * 100).toFixed(0)}%`
  );
  console.log(`  Hạ trần sau mỗi đợt viết lại; đích là mức may rủi.`);
}
const biasFailures = biasRows.filter(
  (r) => Math.abs(r.zLong) > MAX_LENGTH_BIAS_Z || Math.abs(r.zShort) > MAX_LENGTH_BIAS_Z
);
console.log(
  `  baseline: ${baseline.size} lessons grandfathered  ·  ` +
    `${unbaselined.length} not baselined  ·  ${fixedButStillBaselined.length} fixed but still listed`
);

const tellFailures = [];

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

console.log(
  `\nOption-letter refs in explanations: ${letterRefs.length} total, ` +
    `${contradictoryLetterRefs.length} contradicting the keyed answer`
);

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
    `\n${biasFailures.length} track/tổng vượt ngưỡng lệch độ dài |z| > ${MAX_LENGTH_BIAS_Z}:\n` +
      biasFailures
        .map(
          (r) =>
            `  ${r.name}: z(dài) = ${r.zLong.toFixed(2)}, z(ngắn) = ${r.zShort.toFixed(2)}`
        )
        .join("\n") +
      `\n\n  Dấu DƯƠNG: đáp án đúng quá hay là phương án dài nhất (hoặc ngắn nhất) -\n` +
      `  đoán theo độ dài là ăn. Dấu ÂM cũng khai thác được, chỉ ngược chiều:\n` +
      `  loại đúng phương án đó ra rồi đoán trong ba cái còn lại.\n` +
      `  Sửa bằng cách viết lại phương án, không bằng cách nâng ngưỡng.`
  );
  process.exit(1);
}

if (practiceStats.questions > 0) {
  const score = practiceStats.longestScore / practiceStats.questions;
  if (score > MAX_PRACTICE_LONGEST_SCORE) {
    console.error(
      `\npracticePrompt: chiến lược "chọn phương án dài nhất" ăn ${(score * 100).toFixed(1)}%, ` +
        `vượt trần ${(MAX_PRACTICE_LONGEST_SCORE * 100).toFixed(0)}%.\n` +
        `  Cắt đáp án đúng về đúng mệnh đề - phần lý lẽ đã nằm ở explanation ngay bên dưới.\n` +
        `  Đừng kéo dài phương án nhiễu, và đừng nâng trần.`
    );
    process.exit(1);
  }
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
