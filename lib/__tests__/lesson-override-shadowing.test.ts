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

/** Khoá DUY NHẤT một override được phép mang.
 *
 *  Cổng này chặt hơn hẳn bản trước, vốn chỉ cấm `sections`. Cấm mỗi `sections`
 *  là dừng lại ở triệu chứng đã nhìn thấy: `explanation`, `keyTakeaways`,
 *  `summary`, `diagram`, `openingQuestion`, `realWorldExample`, `application`
 *  cũng là nội dung dạy, và một override mang chúng che khuất lib/lessons.ts
 *  đúng cách ấy, im lặng đúng như vậy.
 *
 *  Đặt ở mức kho HIỆN ĐANG đạt, không phải mức mong muốn: sau khi rút 34 slug
 *  và gỡ 19 khoá vô tác dụng, cả 447 entry đều chỉ còn `quiz` - đúng như
 *  AGENTS.md vẫn mô tả file này. Không có món nợ nào phải grandfather, nên
 *  không có danh sách miễn trừ. */
const ALLOWED_OVERRIDE_KEYS = new Set(["quiz"]);

const overrideEntries = Object.entries(lessonOverrides as Record<string, Record<string, unknown>>);

describe("override che khuất nội dung trong lessons.ts", () => {
  it("override chỉ được mang `quiz`, không mang nội dung dạy", () => {
    const offenders = overrideEntries.flatMap(([slug, o]) =>
      Object.keys(o)
        .filter((k) => !ALLOWED_OVERRIDE_KEYS.has(k))
        .map((k) => `${slug}.${k}`)
    );
    expect(
      offenders,
      "`applyLessonOverrides` là `{ ...lesson, ...override }`, nên mọi khoá ở đây thay hẳn " +
        "khoá cùng tên trong lib/lessons.ts. Thêm một khoá nội dung dạy vào đây nghĩa là mọi " +
        "sửa đổi ở lib/lessons.ts cho bài đó bị bỏ qua trong im lặng. Viết vào lib/lessons.ts."
    ).toEqual([]);
  });

  it("không override nào trùng khít lessons.ts - vá mà không đổi gì là bẫy nằm chờ", () => {
    // 19 khoá đã ở trạng thái này: `wealth-management` và
    // `modern-portfolio-theory` được rút `sections` ra bằng cách xoá đúng khoá
    // đó, để lại chín khoá chép y nguyên lessons.ts. Chúng không đổi gì HÔM
    // NAY, nên không cổng nào kêu - và sửa lessons.ts cho một trong chín
    // trường đó ngày mai sẽ không có tác dụng.
    const noop = overrideEntries.flatMap(([slug, o]) => {
      const src = bySlug.get(slug) as Record<string, unknown> | undefined;
      if (!src) return [];
      return Object.entries(o)
        .filter(([k, v]) => JSON.stringify(v) === JSON.stringify(src[k]))
        .map(([k]) => `${slug}.${k}`);
    });
    expect(noop, "Khoá override trùng khít bản trong lessons.ts - xoá nó đi").toEqual([]);
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
