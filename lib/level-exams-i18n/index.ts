// Bản dịch của kỳ thi thăng cấp.
//
// Đây là kho nội dung CÓ CHẤM ĐIỂM lớn nhất còn lại không có đường dịch nào:
// 280 câu ở `lib/level-exams.ts`, và điểm của chúng gác việc lên cấp. Người
// đọc tiếng Anh gặp một đề tiếng Việt ở đúng chỗ quyết định họ có được thăng
// cấp hay không - nặng hơn hẳn một nhãn chưa dịch trên màn hình.
//
// Cơ chế là PATCH, không phải bản chép, đúng hình dạng đã dùng cho bài học
// (xem lib/lesson-translations.js và AGENTS.md, mục "Translating lessons"):
//
//   - Bản dịch chỉ mang chữ: `question`, `options`, `explanation`, `title`.
//   - `correctIndex` KHÔNG bao giờ đọc từ bản dịch. Nó là chỉ số vào mảng
//     `options`, nên một bản dịch xếp sai thứ tự sẽ chấm sai người học mà
//     không cổng nào kêu.
//   - `options` là POSITIONAL: phần tử i của bản dịch phải dịch phần tử i của
//     bản gốc. Lệch độ dài mảng thì cả mảng bị bỏ và câu đó rơi về tiếng Việt,
//     chứ không ghép được bao nhiêu hay bấy nhiêu - ghép một phần nghĩa là
//     `correctIndex` trỏ vào một phương án khác.
//
// Có một chi tiết chỉ đúng ở đây mà không đúng với bài học: `app/api/level-exam/
// route.ts` XÁO thứ tự phương án khi phát đề, và tìm lại đáp án đúng bằng
// `options.indexOf(correctText)` - so sánh theo CHUỖI. Việc dịch xảy ra TRƯỚC
// bước xáo, trên cùng một mảng, nên phép so sánh ấy vẫn khớp. Nếu sau này có ai
// dịch SAU khi xáo, chỗ đó sẽ hỏng lặng lẽ.
import type { LevelExamConfig } from "@/lib/level-exams";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { LEVEL_EXAMS_EN } from "./en";

export interface ExamQuestionPatch {
  question?: string;
  options?: string[];
  explanation?: string;
}

export interface LevelExamPatch {
  title?: string;
  questions?: Record<string, ExamQuestionPatch>;
}

export type LevelExamTranslations = Record<number, LevelExamPatch>;

const BY_LOCALE: Partial<Record<Locale, LevelExamTranslations>> = {
  en: LEVEL_EXAMS_EN,
};

/** Chuỗi rỗng hoặc chỉ có khoảng trắng tính là THIẾU, không phải là "hiển thị
 *  rỗng" - một ô trống trong file dịch là chỗ bỏ sót. */
function pick(translated: string | undefined, source: string): string {
  if (!translated || !translated.trim()) return source;
  return translated;
}

/** Ghép bản dịch lên một đề thi. Locale gốc thì trả về nguyên đề. */
export function localizeLevelExam(config: LevelExamConfig, locale: Locale): LevelExamConfig {
  if (locale === DEFAULT_LOCALE) return config;
  const patch = BY_LOCALE[locale]?.[config.level];
  if (!patch) return config;

  return {
    ...config,
    title: pick(patch.title, config.title),
    questions: config.questions.map((q) => {
      const qp = patch.questions?.[q.id];
      if (!qp) return q;
      // Lệch độ dài thì bỏ cả mảng. Xem chú thích đầu file: ghép một phần làm
      // `correctIndex` trỏ sang phương án khác.
      const options =
        Array.isArray(qp.options) && qp.options.length === q.options.length
          ? q.options.map((o, i) => pick(qp.options?.[i], o))
          : q.options;
      return {
        ...q,
        question: pick(qp.question, q.question),
        options,
        explanation: pick(qp.explanation, q.explanation),
      };
    }),
  };
}
