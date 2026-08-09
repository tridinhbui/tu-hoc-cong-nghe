import { describe, expect, it } from "vitest";
import { REAL_CASE_STUDIES } from "@/lib/case-studies-data";
import { caseStudiesEn } from "@/lib/case-studies-i18n/en";
import { mergeCaseStudy } from "@/lib/case-studies-i18n";

/** Case study có thêm một cách hỏng mà hai bộ trước không có: `options` là mảng
 *  THEO VỊ TRÍ và `correct` là chỉ số đọc từ phía tiếng Việt. Một bản dịch đảo
 *  thứ tự phương án - hoặc thiếu một phương án - sẽ trỏ `correct` sang một câu
 *  trả lời khác, và người học đúng bị chấm sai. mergeCaseStudy chặn bằng cách
 *  bỏ cả mảng khi số phần tử lệch; bộ kiểm này bắt việc đó xảy ra. */

const byId = new Map(REAL_CASE_STUDIES.map((c) => [c.id, c]));

describe("bản dịch case study (en)", () => {
  it("mọi khoá đều trỏ vào một case có thật", () => {
    const unknown = Object.keys(caseStudiesEn).filter((id) => !byId.has(id));
    expect(unknown, `id không có trong REAL_CASE_STUDIES: ${unknown.join(", ")}`).toEqual([]);
  });

  it("mọi case đều có bản dịch", () => {
    const missing = REAL_CASE_STUDIES.filter((c) => !caseStudiesEn[c.id]).map((c) => c.id);
    expect(missing, `chưa dịch: ${missing.join(", ")}`).toEqual([]);
  });

  it("số câu hỏi, số phương án và số bài học liên quan khớp bản gốc", () => {
    const bad: string[] = [];
    for (const [id, patch] of Object.entries(caseStudiesEn)) {
      const source = byId.get(id);
      if (!source) continue;
      if (patch.relatedLessonTitles && patch.relatedLessonTitles.length !== source.relatedLessonSlugs.length) {
        bad.push(`${id}.relatedLessonTitles: vi ${source.relatedLessonSlugs.length}, en ${patch.relatedLessonTitles.length}`);
      }
      if (!patch.questions) continue;
      if (patch.questions.length !== source.questions.length) {
        bad.push(`${id}.questions: vi ${source.questions.length}, en ${patch.questions.length}`);
        continue;
      }
      patch.questions.forEach((q, i) => {
        if (q.options && q.options.length !== source.questions[i].options.length) {
          bad.push(`${id}.q${i}.options: vi ${source.questions[i].options.length}, en ${q.options.length}`);
        }
      });
    }
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("merge giữ nguyên correct, ticker, phần thưởng và slug bài học", () => {
    for (const source of REAL_CASE_STUDIES) {
      const merged = mergeCaseStudy(source, "en");
      expect(merged.ticker).toBe(source.ticker);
      expect(merged.difficulty).toBe(source.difficulty);
      expect(merged.xpReward).toBe(source.xpReward);
      expect(merged.coinReward).toBe(source.coinReward);
      expect(merged.relatedLessonSlugs.map((l) => l.slug)).toEqual(
        source.relatedLessonSlugs.map((l) => l.slug)
      );
      expect(merged.questions.map((q) => q.correct)).toEqual(source.questions.map((q) => q.correct));
      // và có dịch thật
      expect(merged.title).not.toBe(source.title);
    }
  });

  it("không để sót chuỗi tiếng Việt trong bản dịch", () => {
    const DIACRITICS =
      /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
    const leaks: string[] = [];
    const probe = (label: string, text: string) => {
      if (DIACRITICS.test(text)) leaks.push(`${label}: ${text}`);
    };
    for (const [id, patch] of Object.entries(caseStudiesEn)) {
      for (const key of ["title", "company", "sector", "description"] as const) {
        if (patch[key]) probe(`${id}.${key}`, patch[key]!);
      }
      patch.relatedLessonTitles?.forEach((t, i) => probe(`${id}.lesson[${i}]`, t));
      patch.questions?.forEach((q, i) => {
        if (q.prompt) probe(`${id}.q${i}.prompt`, q.prompt);
        if (q.explanation) probe(`${id}.q${i}.explanation`, q.explanation);
        q.options?.forEach((o, j) => probe(`${id}.q${i}.opt[${j}]`, o));
      });
    }
    expect(leaks, leaks.join("\n")).toEqual([]);
  });

  it("locale vi trả về đúng bản gốc", () => {
    expect(mergeCaseStudy(REAL_CASE_STUDIES[0], "vi")).toBe(REAL_CASE_STUDIES[0]);
  });
});
