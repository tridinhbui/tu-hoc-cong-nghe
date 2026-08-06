import { describe, it, expect } from "vitest";
import { groupAiReportsByLesson, type AdminAiReportRow } from "@/lib/admin/ai-report-grouping";

function row(over: Partial<AdminAiReportRow> & { id: number }): AdminAiReportRow {
  return {
    user_id: `u${over.id}`,
    lesson_id: 1,
    lesson_slug: "bai-mot",
    lesson_title: "Bài một",
    quote: "một đoạn sai",
    created_at: "2026-08-01T00:00:00.000Z",
    ...over,
  };
}

describe("groupAiReportsByLesson", () => {
  it("gộp mọi báo cáo của cùng một bài vào một thẻ", () => {
    const groups = groupAiReportsByLesson([
      row({ id: 1, quote: "đoạn A" }),
      row({ id: 2, quote: "đoạn B" }),
      row({ id: 3, lesson_id: 2, lesson_slug: "bai-hai", lesson_title: "Bài hai" }),
    ]);

    expect(groups).toHaveLength(2);
    expect(groups[0].lesson_id).toBe(1);
    expect(groups[0].total).toBe(2);
    expect(groups[0].quotes).toHaveLength(2);
  });

  it("gộp trùng đoạn văn và đếm số người báo", () => {
    const groups = groupAiReportsByLesson([
      row({ id: 1, quote: "đoạn sai", user_name: "An" }),
      row({ id: 2, quote: "đoạn sai", user_name: "Bình" }),
      row({ id: 3, quote: "đoạn khác", user_name: "Chi" }),
    ]);

    expect(groups[0].total).toBe(3);
    expect(groups[0].quotes[0].count).toBe(2);
    expect(groups[0].quotes[0].ids).toEqual([1, 2]);
    expect(groups[0].quotes[0].reporters).toEqual(["An", "Bình"]);
  });

  it("coi khác biệt khoảng trắng là cùng một đoạn", () => {
    const groups = groupAiReportsByLesson([
      row({ id: 1, quote: "  đoạn   sai " }),
      row({ id: 2, quote: "đoạn sai" }),
    ]);

    expect(groups[0].quotes).toHaveLength(1);
    expect(groups[0].quotes[0].count).toBe(2);
  });

  it("xếp bài bị báo nhiều nhất lên trước, dù bài kia mới hơn", () => {
    const groups = groupAiReportsByLesson([
      row({ id: 1, lesson_id: 9, lesson_slug: "moi", lesson_title: "Mới", created_at: "2026-08-05T00:00:00.000Z" }),
      row({ id: 2, quote: "a", created_at: "2026-08-01T00:00:00.000Z" }),
      row({ id: 3, quote: "b", created_at: "2026-08-02T00:00:00.000Z" }),
    ]);

    expect(groups[0].lesson_id).toBe(1);
    expect(groups[0].total).toBe(2);
    expect(groups[0].latest_at).toBe("2026-08-02T00:00:00.000Z");
  });

  it("không dồn các bài có slug rỗng vào chung một thẻ", () => {
    const groups = groupAiReportsByLesson([
      row({ id: 1, lesson_id: 41, lesson_slug: "" }),
      row({ id: 2, lesson_id: 42, lesson_slug: "" }),
    ]);

    expect(groups).toHaveLength(2);
  });
});
