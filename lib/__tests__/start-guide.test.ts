import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { startGuideEn, startGuideVi } from "@/lib/i18n/dictionaries/sections/start-guide";
import { START_GUIDE_TRY_SLUGS } from "@/lib/start-guide";

/* /lo-trinh/huong-dan trỏ vào ba bài bằng slug viết trong từ điển. Slug sai
 * không báo lỗi biên dịch: trang chỉ lặng lẽ bỏ thẻ đó (nó lọc bài không tìm
 * thấy) và người mới chỉ còn hai - hoặc không còn - bài để thử. */
const dataDir = path.resolve(__dirname, "..", "lessons-data");

describe("trang hướng dẫn /lo-trinh/huong-dan", () => {
  it("bản Việt và bản Anh có cùng số bước và số bài thử", () => {
    const vi = startGuideVi.startGuide;
    const en = startGuideEn.startGuide;
    expect(en.steps).toHaveLength(vi.steps.length);
    expect(en.tries).toHaveLength(vi.tries.length);
    expect(en.promises).toHaveLength(vi.promises.length);
    expect(en.coco).toHaveLength(vi.coco.length);
  });

  it("đúng bốn bước (trang có đúng bốn biểu tượng) và ba bài thử", () => {
    expect(startGuideVi.startGuide.steps).toHaveLength(4);
    expect(startGuideVi.startGuide.tries).toHaveLength(3);
    // Mỗi slug có đúng một câu "Hợp với" theo thứ tự.
    expect(START_GUIDE_TRY_SLUGS).toHaveLength(startGuideVi.startGuide.tries.length);
  });

  it.skipIf(!existsSync(dataDir))("mỗi bài thử tồn tại trong kho bài học", () => {
    for (const slug of START_GUIDE_TRY_SLUGS) {
      expect(existsSync(path.join(dataDir, `${slug}.json`)), slug).toBe(true);
    }
  });
});
