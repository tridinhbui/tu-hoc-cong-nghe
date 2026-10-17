import { describe, expect, it } from "vitest";
import { lessons as LESSONS } from "../lessons";
import { TRACK_PERSONAL, isLessonInRange } from "../track-stages";
import { T01_ADDITIONS } from "../lesson-block-additions/t01";
import { T02_ADDITIONS } from "../lesson-block-additions/t02";
import { T03_ADDITIONS } from "../lesson-block-additions/t03";
import { T04_ADDITIONS } from "../lesson-block-additions/t04";
import { T05_ADDITIONS } from "../lesson-block-additions/t05";
import type { LessonSectionBlock } from "../lesson-types";

// Hai bất biến của đợt rà soát giáo trình công nghệ (TECH-CURRICULUM-AUDIT.md).
//
// 1. Sàn bài tập chấm được ở những chặng từng KHÔNG có dòng mã nào.
//    Trước đợt này Chặng 13 (đám mây), 16 (an toàn thông tin) có 0 bài tập viết
//    mã, Chặng 51-59 (tự động hoá, bảng tính, trang web, gỡ lỗi, đưa lên mạng)
//    có 5/20, 0/20 ... Các số dưới đây là mức đã đo sau đợt đó. Chúng chỉ được
//    TĂNG: hạ một con số để cho test qua là xoá đi chính thứ test này bảo vệ.
//    Bài tập được chạy thật trong CI bởi `npm run audit:exercises`; test này chỉ
//    giữ cho chúng không bị gỡ đi lặng lẽ.
//
// 2. Lời giải của câu quiz không được gọi phương án bằng VỊ TRÍ. Chi tiết và
//    số đo nằm ở OPTION_POSITION_RE trong scripts/audit-lesson-content.mjs; đây
//    là lớp thứ hai chạy trên nguồn lib/lessons.ts để lỗi hiện ngay ở `vitest`
//    chứ không chỉ ở bước audit.

const hasExercise = (blocks: LessonSectionBlock[] | undefined) => (blocks ?? []).some((b) => b.type === "exercise");

const MIN_LESSONS_WITH_EXERCISE: Record<string, number> = {
  "Chặng 13": 5,
  "Chặng 16": 3,
  "Chặng 51": 5,
  "Chặng 52": 7,
  "Chặng 56": 5,
  "Chặng 57": 4,
  "Chặng 58": 9,
  "Chặng 59": 3,
};

describe("bài tập chấm được ở các chặng từng không có dòng mã", () => {
  for (const [label, floor] of Object.entries(MIN_LESSONS_WITH_EXERCISE)) {
    it(`${label}: ít nhất ${floor} bài có bài tập viết mã`, () => {
      const stage = TRACK_PERSONAL.stages.find((s) => s.label === label);
      expect(stage, label).toBeTruthy();
      const inStage = LESSONS.filter((l) => isLessonInRange(l.id, stage!));
      expect(inStage.length, `${label} không có bài nào`).toBeGreaterThan(0);
      const withExercise = inStage.filter((l) => hasExercise(l.sections));
      expect(withExercise.length, `${label}: ${withExercise.length}/${inStage.length}`).toBeGreaterThanOrEqual(floor);
    });
  }
});

describe("đợt t01-t05 của lib/lesson-block-additions", () => {
  const batch = Object.entries({ ...T01_ADDITIONS, ...T02_ADDITIONS, ...T03_ADDITIONS, ...T04_ADDITIONS, ...T05_ADDITIONS });

  it("có đủ số bài và không slug nào nằm ở hai tệp", () => {
    const total = [T01_ADDITIONS, T02_ADDITIONS, T03_ADDITIONS, T04_ADDITIONS, T05_ADDITIONS].reduce((n, f) => n + Object.keys(f).length, 0);
    expect(batch.length).toBe(total);
    expect(total).toBeGreaterThanOrEqual(41);
  });

  it("mỗi bài là heading -> exercise -> callout 'Vì sao đúng', và mã khởi đầu khác lời giải", () => {
    for (const [slug, blocks] of batch) {
      expect(blocks.map((b) => b.type), slug).toEqual(["heading", "exercise", "callout"]);
      const [, ex, note] = blocks;
      if (ex.type !== "exercise" || note.type !== "callout") continue;
      expect(note.label, slug).toBe("Vì sao đúng");
      expect(ex.starter.trim(), slug).not.toBe(ex.solution.trim());
      expect(ex.expectedOutput.trim().length, slug).toBeGreaterThan(0);
      expect(ex.hints?.length ?? 0, slug).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("lời giải quiz không gọi phương án bằng vị trí", () => {
  // Cùng biểu thức với OPTION_POSITION_RE. Giữ hai bản đồng bộ bằng mắt là chấp
  // nhận được: bản trong audit có chú thích dài và một ngoại lệ ("phương án trên bàn").
  const POSITION = /(?:phương án|đáp án|lựa chọn)\s+(?:cuối|đầu|trên(?!\s+bàn)|dưới|thứ (?:nhất|hai|ba|tư))/iu;

  it("0 câu quiz trong kho nói 'lựa chọn thứ ba', 'phương án cuối'...", () => {
    const bad: string[] = [];
    for (const lesson of LESSONS) {
      (lesson.quiz ?? []).forEach((q, i) => {
        if (q.explanation && POSITION.test(q.explanation)) bad.push(`${lesson.slug} #${i + 1}`);
      });
    }
    expect(bad).toEqual([]);
  });
});
