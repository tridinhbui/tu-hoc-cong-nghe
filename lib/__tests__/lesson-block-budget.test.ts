import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { planLessonBlocks } from "@/lib/lesson-block-budget";

const b = (type: string) => ({ type }) as unknown as LessonSectionBlock;

describe("planLessonBlocks", () => {
  it("giữ một khối thực hành và một khối hình ở mạch chính, dời phần còn lại", () => {
    const plan = planLessonBlocks([b("lead"), b("aiLab"), b("paragraph"), b("scenario"), b("flow"), b("chart"), b("feynman")]);
    expect(plan.main).toEqual([0, 1, 2, 4]);
    expect(plan.deep).toEqual([3, 5, 6]);
    expect(plan.hasMainPractice).toBe(true);
    expect(plan.hasMainVisual).toBe(true);
  });

  it("ưu tiên bài tập viết mã làm khối thực hành chính, kể cả khi nó đứng sau", () => {
    const plan = planLessonBlocks([b("scenario"), b("paragraph"), b("exercise")]);
    expect(plan.main).toEqual([1, 2]);
    expect(plan.deep).toEqual([0]);
  });

  it("feynman luôn vào mục gập; bài không có chart/flow thì báo để giữ sơ đồ tĩnh", () => {
    const plan = planLessonBlocks([b("paragraph"), b("feynman"), b("sim")]);
    expect(plan.deep).toEqual([1]);
    expect(plan.hasMainVisual).toBe(false);
  });

  it("mỗi khối nằm đúng một chỗ, theo đúng thứ tự gốc", () => {
    const plan = planLessonBlocks([b("exercise"), b("exercise"), b("flow"), b("heading"), b("flow")]);
    expect([...plan.main, ...plan.deep].sort((x, y) => x - y)).toEqual([0, 1, 2, 3, 4]);
    expect(plan.main).toEqual([...plan.main].sort((x, y) => x - y));
  });

  // Trên dữ liệu thật: mạch chính của MỌI bài vẫn có một khối thực hành, và
  // một khối hình (chart/flow) hoặc sơ đồ tĩnh - ngân sách không được để bài
  // nào chỉ còn chữ ở mạch chính.
  const dir = join(process.cwd(), "lib/lessons-data");
  const files = (() => {
    try {
      return readdirSync(dir).filter((f) => f.endsWith(".json"));
    } catch {
      return [];
    }
  })();
  it.skipIf(files.length === 0)("mọi bài giữ khối thực hành + khối hình ở mạch chính", () => {
    const bad: string[] = [];
    for (const f of files) {
      const lesson = JSON.parse(readFileSync(join(dir, f), "utf8"));
      if (!lesson.sections?.length) continue;
      const plan = planLessonBlocks(lesson.sections);
      const hasVisual = plan.hasMainVisual || (lesson.diagram?.length ?? 0) > 0;
      if (!plan.hasMainPractice || !hasVisual) bad.push(lesson.slug);
    }
    expect(bad).toEqual([]);
  });
});
