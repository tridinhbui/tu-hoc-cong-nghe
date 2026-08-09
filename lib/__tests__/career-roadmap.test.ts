import { describe, expect, it } from "vitest";
import { buildCareerRoadmap, categoryProgress, type LessonIndex, type LessonRef } from "@/lib/career-roadmap";
import type { FinanceCareer } from "@/lib/finance-careers";

/** Lộ trình nghề, và tiến độ của cả một nhóm nghề.
 *
 *  Phần dễ sai nhất là KHỬ TRÙNG: các nghề trong cùng nhóm dùng chung rất
 *  nhiều bài nền, và một bài có thể tới từ cả `relatedLessonSlugs` lẫn một môn
 *  CFA. Cộng dồn thay vì hợp lại sẽ cho một mẫu số lớn hơn số bài người học
 *  thật sự phải học, tức một con số phần trăm nói dối theo hướng bi quan. */

const lesson = (id: number, slug: string): LessonRef => ({
  id,
  slug,
  title: `Bài ${id}`,
  subtitle: "",
  duration: "5 phút",
});

const index: LessonIndex = {
  bySlug: {
    a: lesson(1, "a"),
    b: lesson(2, "b"),
    c: lesson(3, "c"),
  },
  byId: { 1: lesson(1, "a"), 2: lesson(2, "b"), 3: lesson(3, "c") },
};

const career = (over: Partial<FinanceCareer>): FinanceCareer =>
  ({
    id: "x",
    category: "investment",
    entryLevel: "Junior",
    relatedLessonSlugs: [],
    relatedCfaSubjectIds: [],
    ...over,
  }) as FinanceCareer;

describe("lộ trình một nghề", () => {
  it("giữ nguyên thứ tự các slug viết tay", () => {
    const rows = buildCareerRoadmap(career({ relatedLessonSlugs: ["c", "a", "b"] }), index);
    expect(rows.map((r) => r.slug)).toEqual(["c", "a", "b"]);
  });

  it("bỏ qua slug không trỏ tới bài nào", () => {
    // Đổi tên một bài mà quên sửa danh sách nghề thì lộ trình ngắn đi, chứ
    // không được ném lỗi hay chèn một hàng rỗng.
    const rows = buildCareerRoadmap(career({ relatedLessonSlugs: ["a", "khong-ton-tai", "b"] }), index);
    expect(rows.map((r) => r.slug)).toEqual(["a", "b"]);
  });

  it("không lặp lại một bài được kê hai lần", () => {
    const rows = buildCareerRoadmap(career({ relatedLessonSlugs: ["a", "a", "b"] }), index);
    expect(rows).toHaveLength(2);
  });

  it("nghề không có bài nào thì lộ trình rỗng", () => {
    expect(buildCareerRoadmap(career({}), index)).toEqual([]);
  });
});

describe("tiến độ cả nhóm", () => {
  it("hợp lại chứ không cộng dồn khi hai nghề dùng chung bài", () => {
    // Đây là phép đo quyết định con số phần trăm trên màn hình đầu tiên. Cộng
    // dồn sẽ ra mẫu số 4 thay vì 3, và người học đã xong cả nhóm vẫn thấy 75%.
    const a = career({ id: "a", relatedLessonSlugs: ["a", "b"] });
    const b = career({ id: "b", relatedLessonSlugs: ["b", "c"] });
    const p = categoryProgress([a, b], index, new Set([1, 2, 3]));
    expect(p.total).toBe(3);
    expect(p.done).toBe(3);
    expect(p.percent).toBe(100);
  });

  it("đếm đúng phần đã học", () => {
    const a = career({ relatedLessonSlugs: ["a", "b", "c"] });
    const p = categoryProgress([a], index, new Set([1]));
    expect(p).toEqual({ total: 3, done: 1, percent: 33 });
  });

  it("chưa học bài nào thì 0%", () => {
    const a = career({ relatedLessonSlugs: ["a", "b"] });
    expect(categoryProgress([a], index, new Set())).toEqual({ total: 2, done: 0, percent: 0 });
  });

  it("nhóm không có bài nào thì 0% chứ không phải NaN", () => {
    // Chia cho 0 lọt ra màn hình thành "NaN%".
    expect(categoryProgress([career({})], index, new Set([1]))).toEqual({
      total: 0,
      done: 0,
      percent: 0,
    });
  });

  it("bài đã học nhưng không thuộc nhóm thì không được tính", () => {
    const a = career({ relatedLessonSlugs: ["a"] });
    expect(categoryProgress([a], index, new Set([1, 2, 3])).done).toBe(1);
  });

  it("nhóm rỗng thì không vỡ", () => {
    expect(categoryProgress([], index, new Set([1])).total).toBe(0);
  });
});
