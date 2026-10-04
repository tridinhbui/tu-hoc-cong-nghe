import { describe, it, expect } from "vitest";
import { lessons } from "@/lib/lessons";
import { LESSON_BLOCK_ADDITIONS, withBlockAdditions } from "@/lib/lesson-block-additions";
import type { Lesson } from "@/lib/lesson-types";

/** Lớp khối-thêm chỉ được CỘNG, không được thay. Một slug gõ sai bị bỏ qua
 *  lặng lẽ là kiểu hỏng không có tín hiệu, nên withBlockAdditions NÉM - và
 *  chính việc import lib/lessons đã chứng minh điều đó đúng với dữ liệu thật. */
describe("lesson-block-additions", () => {
  it("mọi slug trong khối thêm trỏ tới một bài có thật, và khối nằm trong sections", () => {
    const bySlug = new Map(lessons.map((l) => [l.slug, l]));
    for (const [slug, blocks] of Object.entries(LESSON_BLOCK_ADDITIONS)) {
      const lesson = bySlug.get(slug);
      expect(lesson, slug).toBeTruthy();
      for (const b of blocks) expect(lesson!.sections, slug).toContainEqual(b);
    }
  });

  it("chèn TRƯỚC khối closing, giữ nguyên thứ tự các khối cũ", () => {
    const base = { slug: "x", sections: [{ type: "lead", text: "a" }, { type: "paragraph", text: "b" }, { type: "closing", lines: ["z"] }] } as unknown as Lesson;
    const add = { type: "flow", title: "t", steps: [] } as never;
    const [out] = withBlockAdditions([base], { x: [add] });
    expect(out.sections!.map((s) => s.type)).toEqual(["lead", "paragraph", "flow", "closing"]);
    expect(base.sections).toHaveLength(3);
  });

  it("bài không có closing thì khối thêm nằm cuối", () => {
    const base = { slug: "x", sections: [{ type: "lead", text: "a" }] } as unknown as Lesson;
    const [out] = withBlockAdditions([base], { x: [{ type: "flow", title: "t", steps: [] } as never] });
    expect(out.sections!.map((s) => s.type)).toEqual(["lead", "flow"]);
  });

  it("slug không có bài nào thì ném, không bỏ qua", () => {
    expect(() => withBlockAdditions([], { "khong-co-bai-nay": [{ type: "flow", title: "t", steps: [] } as never] })).toThrow(/khong-co-bai-nay/);
  });
});
