import { describe, it, expect } from "vitest";
import { lessonOverrides } from "@/lib/lesson-quiz-overrides.js";
import { lessons } from "@/lib/lessons";

/** Cái bẫy câm nhất trong kho bài học.
 *
 *  AGENTS.md nói override "thay cả mảng `quiz` cho slug đó". Cài đặt thật là
 *  `{ ...lesson, ...override }` - thay MỌI khoá có trong override. Có lúc 34
 *  override mang theo cả `sections`, tức là nội dung DẠY của những bài đó nằm
 *  ở file override chứ không ở lib/lessons.ts.
 *
 *  Hệ quả: sửa lib/lessons.ts cho một trong những bài đó không có tác dụng gì.
 *  Không lỗi biên dịch, không test đỏ, `npm run audit:lessons` vẫn xanh - và
 *  bài học trên production không đổi một chữ. Tôi phát hiện ra đúng theo cách
 *  đó: viết lại phần dạy của Modern Portfolio Theory, mọi bước báo thành công,
 *  rồi đo lại thấy bài vẫn nguyên 244 từ.
 *
 *  Cả 34 slug đã được rút ra, nên danh sách dưới đây RỖNG và test đầu tiên
 *  giờ là một bất biến thật: không override nào được mang `sections`.
 *
 *  Cách rút, ghi lại vì bản đầu làm sai: KHÔNG phải xoá `sections` khỏi
 *  override. 0/34 slug là bản nhân đôi - mỗi override đều đầy đủ hơn
 *  lessons.ts (9-12 khối so với 5) và còn mang theo `openingQuestion`,
 *  `openingOptions`, `correctOption`, `explanation`, `diagram`,
 *  `realWorldExample`, `quiz`, `keyTakeaways`, `summary`. Xoá mỗi `sections`
 *  sẽ thả chín khoá kia về bản cũ trong lessons.ts, tức là ĐỔI bài học. Việc
 *  đúng là thay hẳn object trong lessons.ts bằng `{ ...lesson, ...override }`
 *  rồi xoá cả entry override - phép biến đổi đó chứng minh được là không đổi
 *  kết quả, và đã kiểm bằng cách băm SHA-256 toàn bộ `applyLessonOverrides`
 *  trước và sau từng mẻ: e44d40f2… giữ nguyên qua cả 34 lần rút.
 *
 *  ("wealth-management" ra khỏi danh sách sớm hơn vì nó ĐÚNG là bản nhân đôi
 *  từng byte - trường hợp duy nhất, và vì vậy là tiền lệ sai để đi theo.) */

const bySlug = new Map(
  (lessons as unknown as Array<Record<string, unknown>>).map((l) => [l.slug as string, l])
);

/** Rỗng, và phải ở lại rỗng.
 *
 *  Trước đây đây là danh sách grandfather 34 slug; giờ nội dung dạy của mọi
 *  bài đều nằm ở lib/lessons.ts. Giữ lại cái Set thay vì xoá hẳn để test thứ
 *  hai còn chỗ bấu: nếu ai đó thêm slug vào đây để làm xanh một build đỏ,
 *  diff sẽ nói rõ họ đang nới một bất biến chứ không phải sửa một lỗi. */
const SECTIONS_OWNED_BY_OVERRIDE = new Set<string>([]);

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
