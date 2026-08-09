import { readFileSync, readdirSync, existsSync } from "node:fs";

/** Đọc quiz nằm THẲNG trong các trang bài học viết tay.
 *
 *  LÝ DO FILE NÀY TỒN TẠI. Một số bài học có trang riêng dưới
 *  `app/bai-hoc/<slug>/page.tsx` thay vì đi qua route dữ liệu, và quiz của
 *  chúng là một mảng literal trong chính file đó. Không bài nào trong số này
 *  có bản trong `lib/lessons-data`, nên `npm run audit:lessons` - vốn chỉ đọc
 *  thư mục đó - chưa bao giờ nhìn thấy chúng.
 *
 *  Chúng KHÔNG phải quiz nháp: LessonPageLayout gọi completeLessonInSupabase
 *  và ghi `quiz_score`, tức chúng chảy thẳng vào `avg_quiz_score` cùng với
 *  1.500 câu còn lại. Lúc phát hiện, 58 câu ở đây đứng ở z = +9,03 cho mẹo
 *  "chọn phương án dài nhất" - đúng cái lỗi mà cả kho kia đã mất công dọn -
 *  trong khi mọi con số bộ kiểm in ra đều xanh.
 *
 *  Đọc bằng cách cắt khối rồi eval, không dùng trình phân tích cú pháp: các
 *  mảng này là literal thuần, không tham chiếu biến nào. Nếu về sau có bài
 *  dựng quiz bằng biến thì hàm dưới bỏ qua bài đó và ĐẾM nó vào `skipped` -
 *  im lặng bỏ sót là đúng cách chuyện này đã xảy ra lần đầu. */

const MARKER = /const quiz: QuizQuestion\[\]\s*=\s*/;

/** Trang dựng quiz từ TỪ ĐIỂN thay vì từ một mảng literal.
 *
 *  Hai trang còn lại đã chuyển sang hình dạng này khi được dịch tại chỗ: chữ
 *  (question/options/explanation) nằm ở
 *  lib/i18n/dictionaries/sections/bespoke-lessons.ts, còn `correct` ở lại trong
 *  trang dưới dạng `const QUIZ_CORRECT = [...]` - cố ý, vì một bản dịch sửa
 *  được `correct` là một bản dịch sửa được đáp án.
 *
 *  Bộ đọc cũ chỉ biết mảng literal, nên nó báo "i is not defined" và ĐẾM hai
 *  trang vào `skipped`. Đếm thì có, nhưng mười câu có chấm điểm đã rơi ra khỏi
 *  mọi phép đo - đúng điểm mù mà chính file này ra đời để bịt. */
const DICT_MARKER = /const QUIZ_CORRECT\s*=\s*(\[[^\]]*\])/;
const DICT_FILE = "lib/i18n/dictionaries/sections/bespoke-lessons.ts";

/** Cắt đúng mảng cân ngoặc bắt đầu tại `from`. */
function sliceArray(src, from) {
  const start = src.indexOf("[", from);
  if (start < 0) return null;
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  return null;
}

/** Cắt đúng khối cân ngoặc nhọn bắt đầu tại `from`. */
function sliceObject(src, from) {
  const start = src.indexOf("{", from);
  if (start < 0) return null;
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  return null;
}

/** Chữ của quiz cho một slug, đọc từ phần TIẾNG VIỆT của từ điển.
 *
 *  Cắt hẹp thay vì eval cả từ điển: chỉ lấy mảng `quiz` trong khối của đúng
 *  slug đó, và mảng ấy là literal thuần. Eval cả tệp sẽ vướng import và cast. */
function readQuizCopy(root, slug, locale) {
  const file = `${root}/${DICT_FILE}`;
  if (!existsSync(file)) return null;
  const src = readFileSync(file, "utf8");
  const viStart = src.indexOf("export const bespokeLessonsVi");
  const enStart = src.indexOf("export const bespokeLessonsEn");
  if (viStart < 0) return null;
  // Cắt theo NGÔN NGỮ được hỏi. Hai phần có cùng khoá slug, nên lấy nhầm phần
  // là đo sai kho: `--locale=en` mà đọc phần tiếng Việt sẽ báo bản dịch xanh
  // trong khi chưa ai nhìn nó, và đó đúng là điểm mù mà tệp này ra đời để bịt.
  const section =
    locale === "en" && enStart > viStart
      ? src.slice(enStart)
      : src.slice(viStart, enStart > viStart ? enStart : undefined);
  const key = section.indexOf(`"${slug}": {`);
  if (key < 0) return null;
  const block = sliceObject(section, key);
  if (!block) return null;
  const q = block.indexOf("quiz: [");
  if (q < 0) return null;
  const text = sliceArray(block, q);
  if (!text) return null;
  try {
    const arr = eval(text);
    return Array.isArray(arr) && arr.length ? arr : null;
  } catch {
    return null;
  }
}

/** @param locale Ngôn ngữ cần đo. Chỉ có tác dụng với những trang lấy chữ từ
 *  từ điển; trang còn mảng literal trong JSX thì chỉ có một bản. */
export function readHandAuthoredQuizzes(root = ".", locale = "vi") {
  const dir = `${root}/app/bai-hoc`;
  const lessons = [];
  const skipped = [];
  if (!existsSync(dir)) return { lessons, skipped };

  for (const slug of readdirSync(dir)) {
    const page = `${dir}/${slug}/page.tsx`;
    if (!existsSync(page)) continue;
    // Bài có bản dữ liệu thì bộ kiểm chính đã lo; chỉ nhặt bài KHÔNG có.
    if (existsSync(`${root}/lib/lessons-data/${slug}.json`)) continue;

    const src = readFileSync(page, "utf8");
    // Hình dạng TỪ ĐIỂN xét TRƯỚC, và thứ tự đó là bắt buộc: hai trang ấy vẫn
    // khai `const quiz: QuizQuestion[] =` nhưng vế phải là `c.quiz.map(...)`,
    // nên MARKER vẫn khớp và sliceArray cắt trúng `QUIZ_CORRECT[i]` ở dưới -
    // eval ra đúng lỗi "i is not defined" từng làm cả hai trang rơi ra khỏi
    // phép đo. Sự hiện diện của QUIZ_CORRECT là dấu hiệu chắc chắn hơn.
    const cm = src.match(DICT_MARKER);
    const m = cm ? null : src.match(MARKER);
    if (!m) {
      if (!cm) continue;
      let correct;
      try {
        correct = eval(cm[1]);
      } catch (e) {
        skipped.push({ slug, reason: `QUIZ_CORRECT: ${e.message.slice(0, 40)}` });
        continue;
      }
      const copy = readQuizCopy(root, slug, locale);
      if (!copy) {
        skipped.push({ slug, reason: "không đọc được quiz trong từ điển" });
        continue;
      }
      if (copy.length !== correct.length) {
        // Lệch độ dài nghĩa là `correct` đang trỏ vào mảng options của câu KHÁC.
        skipped.push({
          slug,
          reason: `QUIZ_CORRECT ${correct.length} câu vs từ điển ${copy.length} câu`,
        });
        continue;
      }
      lessons.push({
        slug,
        page,
        quiz: copy.map((q, i) => ({ ...q, correct: correct[i] })),
      });
      continue;
    }

    // `QuizQuestion[]` cũng chứa một cặp ngoặc vuông; phải tìm từ sau dấu `=`,
    // nếu không sẽ cắt trúng nó và eval ra mảng rỗng. Bản đầu của phép đo này
    // mắc đúng lỗi đó và báo "0 câu" cho cả mười hai bài.
    const text = sliceArray(src, m.index + m[0].length - 1);
    if (!text) {
      skipped.push({ slug, reason: "không cắt được mảng" });
      continue;
    }
    let quiz;
    try {
      quiz = eval(text);
    } catch (e) {
      skipped.push({ slug, reason: e.message.slice(0, 60) });
      continue;
    }
    if (!Array.isArray(quiz) || quiz.length === 0) {
      skipped.push({ slug, reason: "mảng rỗng" });
      continue;
    }
    lessons.push({ slug, page, quiz });
  }
  return { lessons, skipped };
}
