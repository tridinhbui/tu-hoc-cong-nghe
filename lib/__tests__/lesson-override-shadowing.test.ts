import { describe, it, expect } from "vitest";
import { lessonOverrides } from "@/lib/lesson-quiz-overrides.js";
import { lessons } from "@/lib/lessons";

/** Cái bẫy câm nhất trong kho bài học.
 *
 *  AGENTS.md nói override "thay cả mảng `quiz` cho slug đó". Cài đặt thật là
 *  `{ ...lesson, ...override }` - thay MỌI khoá có trong override. 34 override
 *  đang mang theo cả `sections`, tức là nội dung DẠY của những bài đó nằm ở
 *  file override chứ không ở lib/lessons.ts.
 *
 *  Hệ quả: sửa lib/lessons.ts cho một trong những bài đó không có tác dụng gì.
 *  Không lỗi biên dịch, không test đỏ, `npm run audit:lessons` vẫn xanh - và
 *  bài học trên production không đổi một chữ. Tôi phát hiện ra đúng theo cách
 *  đó: viết lại phần dạy của Modern Portfolio Theory, mọi bước báo thành công,
 *  rồi đo lại thấy bài vẫn nguyên 244 từ.
 *
 *  Test này không cấm chuyện đó - phần lớn 34 bài kia có override ĐẦY ĐỦ HƠN
 *  bản trong lessons.ts, nên override đang làm đúng việc. Nó chỉ khoá danh
 *  sách lại, để người sau biết mình đang sửa file nào cho bài nào.
 *
 *  "wealth-management" đã ra khỏi danh sách: 6 khối `sections` của nó trùng
 *  từng byte với 6 khối tương ứng trong lessons.ts, nên override chỉ đang
 *  nhân bản chứ không sở hữu gì. Gỡ khoá đó đi thì lessons.ts sống lại và
 *  bài nhận được phần bổ sung viết cho nó. Đó là cách rút một slug ra. */

const bySlug = new Map(
  (lessons as unknown as Array<Record<string, unknown>>).map((l) => [l.slug as string, l])
);

/** Những slug mà nội dung dạy do FILE OVERRIDE sở hữu, không phải lessons.ts.
 *
 *  Muốn sửa phần dạy của một bài trong danh sách này thì sửa
 *  lib/lesson-quiz-overrides.js. Danh sách chỉ nên NGẮN đi: gỡ `sections` khỏi
 *  một override rồi đưa nội dung về lessons.ts là cách đúng để rút nó ra. */
const SECTIONS_OWNED_BY_OVERRIDE = new Set([
  "on-tap-wacc",
  "roic",
  "roic-phan-2",
  "finance-as-math",
  "samsung-ai-finance",
  "fcf-deep-dive",
  "bien-so-r-twr-mwrr",
  "discontinued-operations",
  "commodity-phan-2",
  "market-fair-value",
  "vingroup-cash-flow",
  "enterprise-value",
  "cap-rate",
  "operating-leverage",
  "income-affiliates-jv",
  "interim-comprehensive-income",
  "transfer-pricing",
  "maple-leaf-leverage",
  "tesla-cash-flow",
  "dupont-analysis",
  "dividend",
  "walmart-earnings",
  "inventory-turnover",
  "post-ipo-dividend",
  "disney-pixar-ma",
  "nvidia-cash-securities",
  "fpt-cfo-cash",
  "oil-gas-business-model",
  "bitcoin-crypto",
  "pvgas-bad-debt",
  "retail-store-analysis",
  "bds-business-model",
  "financial-risk",
  "hoc-tai-chinh-hanh-trinh",
]);

const overrideEntries = Object.entries(lessonOverrides as Record<string, Record<string, unknown>>);

describe("override che khuất nội dung trong lessons.ts", () => {
  it("không slug nào mới mang thêm `sections` vào override", () => {
    const carrying = overrideEntries.filter(([, o]) => Array.isArray(o.sections)).map(([slug]) => slug);
    const unexpected = carrying.filter((slug) => !SECTIONS_OWNED_BY_OVERRIDE.has(slug));
    expect(
      unexpected,
      "Thêm `sections` vào override nghĩa là phần dạy của bài đó rời khỏi lib/lessons.ts " +
        "và mọi sửa đổi ở đó sẽ bị bỏ qua trong im lặng. Viết vào lib/lessons.ts thay vì vào đây."
    ).toEqual([]);
  });

  it("danh sách không chứa slug đã được rút ra - chỉ ngắn đi, không dài ra", () => {
    const carrying = new Set(
      overrideEntries.filter(([, o]) => Array.isArray(o.sections)).map(([slug]) => slug)
    );
    const stale = [...SECTIONS_OWNED_BY_OVERRIDE].filter((slug) => !carrying.has(slug));
    expect(stale, "Đã gỡ `sections` khỏi những override này - xoá chúng khỏi danh sách trên").toEqual([]);
  });

  it("mọi slug trong override đều tồn tại thật trong kho bài", () => {
    const missing = overrideEntries.map(([slug]) => slug).filter((slug) => !bySlug.has(slug));
    expect(missing, "Override cho một slug không tồn tại thì không bao giờ chạy").toEqual([]);
  });

  it("Modern Portfolio Theory lấy phần dạy từ lessons.ts, không từ override", () => {
    // Bài cụ thể đã lộ ra cái bẫy này. Khoá lại để nó không lặng lẽ quay về.
    const o = (lessonOverrides as Record<string, Record<string, unknown>>)["modern-portfolio-theory"];
    expect(o).toBeTruthy();
    expect(o.sections).toBeUndefined();
    const src = bySlug.get("modern-portfolio-theory") as { sections?: unknown[] };
    expect((src.sections ?? []).length).toBeGreaterThan(6);
  });
});
