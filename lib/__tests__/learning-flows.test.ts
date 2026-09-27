import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LEARNING_FLOWS, flowLessonSlugs } from "@/lib/learning-flows";
import { vi as viDict } from "@/lib/i18n/dictionaries/vi";
import { en as enDict } from "@/lib/i18n/dictionaries/en";

type StepCopy = { title: string; intro: string; columns: string[]; rows: string[][]; oneLiner: string };

// Hành trình chỉ trỏ vào slug, nên một slug gõ sai là một đường dẫn 404 ngay
// trên trang người mới mở đầu tiên - và không gì khác trong repo bắt được nó.
describe("learning flows", () => {
  it("every lesson slug exists in lib/lessons-data", () => {
    const missing = LEARNING_FLOWS.flatMap((f) =>
      flowLessonSlugs(f).filter((s) => !existsSync(join(process.cwd(), "lib/lessons-data", `${s}.json`))).map((s) => `${f.id}: ${s}`)
    );
    expect(missing).toEqual([]);
  });

  // Chữ khoá theo id chặng. `tsc` bắt được flow thiếu, nhưng không bắt được
  // một id chặng trong lib/learning-flows.ts mà từ điển không có - vì trang
  // tra bằng chuỗi. Chặng đó sẽ lặng lẽ biến mất khỏi trang.
  for (const [name, dict] of [["vi", viDict], ["en", enDict]] as const) {
    it(`${name}: every step has a Feynman card with three-column rows`, () => {
      for (const flow of LEARNING_FLOWS) {
        const steps = dict.learningFlows.flows[flow.id].steps as Record<string, StepCopy>;
        expect(Object.keys(steps).sort(), flow.id).toEqual(flow.steps.map((s) => s.id).sort());
        for (const step of flow.steps) {
          const c = steps[step.id];
          expect(c.columns, `${flow.id}/${step.id}`).toHaveLength(3);
          expect(c.rows.length, `${flow.id}/${step.id}`).toBeGreaterThanOrEqual(3);
          for (const row of c.rows) expect(row, `${flow.id}/${step.id}`).toHaveLength(3);
          expect(c.oneLiner.length).toBeGreaterThan(0);
        }
      }
    });
  }

  it("English cards have the same number of rows as Vietnamese", () => {
    for (const flow of LEARNING_FLOWS) {
      const v = viDict.learningFlows.flows[flow.id].steps as Record<string, StepCopy>;
      const e = enDict.learningFlows.flows[flow.id].steps as Record<string, StepCopy>;
      for (const step of flow.steps) expect(e[step.id].rows.length, `${flow.id}/${step.id}`).toBe(v[step.id].rows.length);
    }
  });
});
