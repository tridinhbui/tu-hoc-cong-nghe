// Bản dịch ngân hàng câu hỏi kỹ thuật (IB + theo nghề).
//
// 410 câu có chấm điểm: 276 câu ở lib/ib-question-bank.ts và 134 câu ở
// lib/career-question-bank.ts. Chúng chạy qua /phong-van-ky-thuat, qua thử
// thách kiến thức, và câu sai được lưu vào /on-tap-cau-sai dưới dạng
// `lesson_id` âm - tức là chúng còn quay lại với người học sau này.
//
// Patch theo ID, cùng hình dạng đã dùng cho đề thi thăng cấp
// (lib/level-exams-i18n) và cho bài học:
//
//   - chỉ mang chữ: `question`, `options`, `explanation`, `category`;
//   - `correct` KHÔNG bao giờ đọc từ bản dịch;
//   - `options` là POSITIONAL, lệch độ dài thì bỏ cả mảng.
//
// Khác đề thi thăng cấp ở MỘT điểm quan trọng: file này KHÔNG phải server-only.
// `/phong-van-ky-thuat` là client component và import thẳng ngân hàng câu hỏi,
// nên bản dịch phải đi cùng đường đó. Đổi lại, nó vào bundle client - chấp
// nhận được vì chính ngân hàng câu hỏi đã ở đó rồi, và không chấp nhận được
// nếu ai đó sau này thêm vào đây thứ gì không phải câu chữ.
import type { IbQuestion } from "@/lib/ib-question-bank";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { IB_QUESTIONS_EN } from "./en";

export interface IbQuestionPatch {
  category?: string;
  question?: string;
  options?: string[];
  explanation?: string;
}

export type IbQuestionTranslations = Record<number, IbQuestionPatch>;

const BY_LOCALE: Partial<Record<Locale, IbQuestionTranslations>> = {
  en: IB_QUESTIONS_EN,
};

function pick(translated: string | undefined, source: string): string {
  if (!translated || !translated.trim()) return source;
  return translated;
}

/** Ghép bản dịch lên một câu hỏi. Locale gốc thì trả về nguyên câu. */
export function localizeIbQuestion(question: IbQuestion, locale: Locale): IbQuestion {
  if (locale === DEFAULT_LOCALE) return question;
  const patch = BY_LOCALE[locale]?.[question.id];
  if (!patch) return question;
  const options =
    Array.isArray(patch.options) && patch.options.length === question.options.length
      ? question.options.map((o, i) => pick(patch.options?.[i], o))
      : question.options;
  return {
    ...question,
    category: pick(patch.category, question.category),
    question: pick(patch.question, question.question),
    options,
    explanation: pick(patch.explanation, question.explanation),
  };
}

export function localizeIbQuestions(questions: IbQuestion[], locale: Locale): IbQuestion[] {
  if (locale === DEFAULT_LOCALE) return questions;
  return questions.map((q) => localizeIbQuestion(q, locale));
}

/** Số câu đã dịch cho một locale - dùng cho bộ kiểm và để báo tiến độ. */
export function translatedCount(locale: Locale): number {
  return Object.keys(BY_LOCALE[locale] ?? {}).length;
}
