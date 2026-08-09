import { describe, it, expect } from "vitest";
import {
  bespokeLessonsVi,
  bespokeLessonsEn,
  type BespokeLessonCopy,
} from "@/lib/i18n/dictionaries/sections/bespoke-lessons";

const DIACRITICS =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

/** Trường riêng mà mỗi trang BẮT BUỘC phải có, ở cả hai ngôn ngữ.
 *
 *  Bảng này là thứ làm cho phép ép kiểu ở đầu mỗi trang an toàn: trang ép về
 *  `SourceCashLessonCopy`/`DebtLessonCopy` rồi đọc thẳng, không `?.`, nên một
 *  trường thiếu sẽ thành `undefined` giữa màn hình. Ca kiểm dưới đây bắt trước
 *  điều đó. Thêm trang mới thì thêm một dòng ở đây. */
const REQUIRED: Record<string, (keyof BespokeLessonCopy)[]> = {
  "source-cash-ma": [
    "sourcesHeading", "debtShareLabel", "dealSizeLabel", "equityShare", "debtShare",
    "equityCaption", "debtCaption", "exitAssumption", "exitEvLabel", "billion",
    "checklistHeading", "sources", "checklist", "remainingDebtLabel",
  ],
  "cac-loai-debt": [
    "intro2", "ruleHeading", "ruleLead", "ruleBanner", "ruleNote", "typesHeading",
    "rateSuffix", "waterfallHeading", "scenarioNormal", "scenarioDistress", "payoutLine",
    "verdictNormal", "verdictDistress", "lboHeading", "lboLead", "lboTableTitle",
    "lboAmounts", "lboEquityRate", "lboNote", "takeawayHeading", "takeaways", "debtTypes",
  ],
};

/** Mọi chuỗi trong một bản ghi, phẳng ra - dùng cho phép kiểm dấu tiếng Việt. */
function allStrings(copy: BespokeLessonCopy): string[] {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(copy);
  return out;
}

describe("bản dịch trang bài học viết tay", () => {
  const slugs = Object.keys(bespokeLessonsVi.bespokeLessons);

  it("mọi trang đều có bản Anh, và mọi trang đều được khai trong REQUIRED", () => {
    expect(slugs.length).toBeGreaterThan(0);
    for (const slug of slugs) {
      expect(bespokeLessonsEn.bespokeLessons[slug], `thiếu bản Anh: ${slug}`).toBeTruthy();
      expect(REQUIRED[slug], `${slug} chưa khai trường bắt buộc`).toBeTruthy();
    }
  });

  it.each(Object.keys(bespokeLessonsVi.bespokeLessons))("%s: đủ trường bắt buộc", (slug) => {
    for (const lang of ["vi", "en"] as const) {
      const copy = (lang === "vi" ? bespokeLessonsVi : bespokeLessonsEn).bespokeLessons[slug];
      for (const field of REQUIRED[slug]) {
        expect(copy[field], `${slug}.${field} (${lang})`).toBeDefined();
      }
    }
  });

  it.each(Object.keys(bespokeLessonsVi.bespokeLessons))("%s: mọi mảng khớp độ dài", (slug) => {
    const vi = bespokeLessonsVi.bespokeLessons[slug];
    const en = bespokeLessonsEn.bespokeLessons[slug];
    // `correct` của quiz là chỉ số vào chính những mảng này, và điểm quiz được
    // ghi xuống Supabase. Lệch độ dài là lệch ĐÁP ÁN, không phải lệch chữ.
    expect(en.quiz).toHaveLength(vi.quiz.length);
    en.quiz.forEach((q, i) => {
      expect(q.options, `${slug} câu ${i + 1}`).toHaveLength(vi.quiz[i].options.length);
    });
    for (const field of ["sources", "checklist", "takeaways", "debtTypes", "lboAmounts"] as const) {
      const a = vi[field];
      const b = en[field];
      if (Array.isArray(a)) expect(b, `${slug}.${field}`).toHaveLength(a.length);
    }
  });

  it.each(Object.keys(bespokeLessonsVi.bespokeLessons))(
    "%s: bản Anh không còn dấu tiếng Việt",
    (slug) => {
      for (const value of allStrings(bespokeLessonsEn.bespokeLessons[slug])) {
        expect(DIACRITICS.test(value), `${slug}: "${value}"`).toBe(false);
      }
    }
  );

  it("mọi placeholder đều khớp giữa hai bản", () => {
    // `format()` để nguyên một placeholder lạ thay vì biến nó thành undefined,
    // nên placeholder đánh máy sai chỉ lộ ra trên màn hình. Ca này bắt trước.
    const marks = (s: string) => (s.match(/\{(\w+)\}/g) ?? []).sort().join(",");
    for (const slug of slugs) {
      const vi = bespokeLessonsVi.bespokeLessons[slug];
      const en = bespokeLessonsEn.bespokeLessons[slug];
      for (const key of Object.keys(vi) as (keyof BespokeLessonCopy)[]) {
        const a = vi[key];
        const b = en[key];
        if (typeof a === "string" && typeof b === "string" && a.includes("{")) {
          expect(marks(b), `${slug}.${String(key)}`).toBe(marks(a));
        }
      }
    }
  });
});
