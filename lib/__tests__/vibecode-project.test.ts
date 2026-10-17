import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { S67_A_LESSONS } from "@/lib/ai-work-lessons/s67-a";
import { S67_B_LESSONS } from "@/lib/ai-work-lessons/s67-b";
import { S67_C_LESSONS } from "@/lib/ai-work-lessons/s67-c";
import { S67_D_LESSONS } from "@/lib/ai-work-lessons/s67-d";
import { VIBECODE_PROJECT_EXERCISE } from "@/lib/ai-work-lessons/s67-project";
import { VIBECODE_PROJECT_LESSON_IDS, buildProjectSteps, projectExerciseIndex } from "@/lib/vibecode-project";

const LESSONS = [...S67_A_LESSONS, ...S67_B_LESSONS, ...S67_C_LESSONS, ...S67_D_LESSONS];

// Bảng tiến độ đọc lại các lần qua bài tập, nên nó chỉ đúng khi mỗi bài của
// chặng có ĐÚNG MỘT bài tập và đó chính là bước dự án của bài ấy.
describe("Chặng 67: dự án xuyên suốt", () => {
  it("có đủ mười bài, id liền nhau, đúng thứ tự Bài 1..10", () => {
    expect(LESSONS.map((l) => l.id)).toEqual([...VIBECODE_PROJECT_LESSON_IDS]);
    LESSONS.forEach((l, i) => expect(l.title, String(l.id)).toMatch(new RegExp(`^Chặng 67, Bài ${i + 1}:`)));
  });

  it("mỗi bài chứa đúng một bài tập, và nó là bước dự án của bài ấy", () => {
    for (const l of LESSONS) {
      const exercises = (l.sections ?? []).filter((b) => b.type === "exercise");
      expect(exercises, `bài ${l.id}`).toHaveLength(1);
      expect(exercises[0], `bài ${l.id}`).toBe(VIBECODE_PROJECT_EXERCISE[l.id]);
      expect(projectExerciseIndex(l.sections)).toBeGreaterThanOrEqual(0);
    }
  });

  it("bước dự án đánh số khớp thứ tự bài", () => {
    VIBECODE_PROJECT_LESSON_IDS.forEach((id, i) => {
      expect(VIBECODE_PROJECT_EXERCISE[id].title, String(id)).toMatch(new RegExp(`^Bước ${i + 1} của dự án`));
    });
  });

  it("mỗi bài tập: starter KHÔNG sẵn qua, solution in đúng expectedOutput (chạy thật ở audit:exercises)", () => {
    for (const id of VIBECODE_PROJECT_LESSON_IDS) {
      const ex = VIBECODE_PROJECT_EXERCISE[id];
      expect(ex.starter, String(id)).not.toBe(ex.solution);
      expect(ex.expectedOutput.trim().length, String(id)).toBeGreaterThan(0);
    }
  });

  describe("buildProjectSteps - một bước chỉ xong khi bài tập của nó đã đạt", () => {
    const lessons = LESSONS.map((l) => ({ id: l.id, slug: l.slug, title: l.title, sections: l.sections }));
    const idx = (id: number) => projectExerciseIndex(lessons.find((l) => l.id === id)!.sections);

    it("chưa đạt bài tập nào thì không bước nào xong", () => {
      expect(buildProjectSteps(lessons, []).filter((s) => s.done)).toHaveLength(0);
    });

    it("đạt bài tập của bài 2742 thì chỉ bước đó xong", () => {
      const steps = buildProjectSteps(lessons, [{ lesson_id: 2742, block_index: idx(2742) }]);
      expect(steps.filter((s) => s.done).map((s) => s.lessonId)).toEqual([2742]);
    });

    it("lần qua một khối KHÁC (quiz, aiLab, kịch bản) trong cùng bài không làm bước xong", () => {
      const other = idx(2742) + 1;
      expect(buildProjectSteps(lessons, [{ lesson_id: 2742, block_index: other }]).filter((s) => s.done)).toHaveLength(0);
    });

    it("lần qua bài tập của bài khác không làm bước này xong", () => {
      expect(buildProjectSteps(lessons, [{ lesson_id: 2741, block_index: idx(2742) }]).filter((s) => s.lessonId === 2742 && s.done)).toHaveLength(0);
    });
  });

  // `duration` viết tay bị generate-lesson-data.mjs thay bằng số phút ước tính
  // từ nội dung (sàn 10 phút). Nếu nguồn ghi một số khác, người đọc nguồn thấy
  // một con số không bao giờ hiện ra: bài "8 phút" trên trang là 16 phút.
  it("thời lượng ghi trong nguồn khớp số phút hệ thống tính và hiển thị", () => {
    for (const l of LESSONS) {
      const generated = JSON.parse(readFileSync(join(process.cwd(), "lib/lessons-data", `${l.slug}.json`), "utf8"));
      const g = Array.isArray(generated) ? generated[0] : generated;
      expect(l.duration, `bài ${l.id}`).toBe(g.duration);
    }
  });
});
