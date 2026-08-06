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

export function readHandAuthoredQuizzes(root = ".") {
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
    const m = src.match(MARKER);
    if (!m) continue;

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
