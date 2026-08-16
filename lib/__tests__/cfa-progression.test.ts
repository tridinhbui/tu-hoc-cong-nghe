import { describe, it, expect } from "vitest";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";
import { XP_PER_LESSON } from "@/lib/levels";
import {
  buildCfaCampaign,
  CFA_SUBJECT_ORDER,
  SUBJECT_ADVANCE_PERCENT,
} from "@/lib/cfa-progression";

const subjectOf = (id: string) => CFA_LEVEL_1_SUBJECTS.find((s) => s.id === id)!;

/** Học đúng `n` bài đầu của một môn. */
function completeFirst(subjectId: string, n: number): number[] {
  return subjectOf(subjectId).lessonIds.slice(0, n);
}

describe("thứ tự và dữ liệu nền", () => {
  it("mười môn, đúng thứ tự giáo trình, Ethics trước Portfolio sau", () => {
    expect(CFA_SUBJECT_ORDER).toHaveLength(10);
    expect(CFA_SUBJECT_ORDER[0]).toBe("ethics");
    expect(CFA_SUBJECT_ORDER[CFA_SUBJECT_ORDER.length - 1]).toBe("portfolio");
  });

  it("mọi môn đều có bài - một môn rỗng sẽ làm phần trăm chia cho 0", () => {
    for (const s of CFA_LEVEL_1_SUBJECTS) {
      expect(s.lessonIds.length, `${s.id} không có bài nào`).toBeGreaterThan(0);
    }
  });
});

describe("trạng thái môn", () => {
  it("chưa học gì: môn đầu `open`, các môn sau `upcoming`", () => {
    const c = buildCfaCampaign(new Set());
    expect(c.subjects[0].state).toBe("open");
    expect(c.subjects[1].state).toBe("upcoming");
    expect(c.currentSubjectId).toBe("ethics");
    expect(c.doneLessons).toBe(0);
    expect(c.percent).toBe(0);
  });

  it("học hết một môn thì `mastered`, và môn kế tiếp tới lượt", () => {
    const c = buildCfaCampaign(new Set(subjectOf("ethics").lessonIds));
    expect(c.subjects[0].state).toBe("mastered");
    expect(c.currentSubjectId).toBe("quant");
    expect(c.subjects[1].state).toBe("open");
  });

  it("qua ngưỡng đi tiếp nhưng chưa trọn thì `proficient`, không phải `mastered`", () => {
    const total = subjectOf("ethics").lessonIds.length;
    const needed = Math.ceil((total * SUBJECT_ADVANCE_PERCENT) / 100);
    const c = buildCfaCampaign(new Set(completeFirst("ethics", needed)));
    expect(c.subjects[0].state).toBe("proficient");
    expect(c.subjects[0].lessonsToAdvance).toBe(0);
    expect(c.currentSubjectId).toBe("quant");
  });

  it("học dở dang thì `inProgress` và vẫn là môn đang học", () => {
    const c = buildCfaCampaign(new Set(completeFirst("ethics", 1)));
    expect(c.subjects[0].state).toBe("inProgress");
    expect(c.currentSubjectId).toBe("ethics");
  });

  it("học vượt cấp - làm môn sau trước - thì môn đó KHÔNG bị ghi là upcoming", () => {
    // Khoá ở đây là mềm, nên trạng thái phải phản ánh việc đã làm thật chứ
    // không phải thứ tự đề nghị.
    const c = buildCfaCampaign(new Set(completeFirst("equity", 3)));
    const equity = c.subjects.find((s) => s.subject.id === "equity")!;
    expect(equity.state).toBe("inProgress");
    expect(c.currentSubjectId).toBe("ethics");
  });
});

describe("mốc kế tiếp", () => {
  it("nói đúng số bài còn thiếu, XP tương ứng, và môn sẽ mở ra", () => {
    const total = subjectOf("ethics").lessonIds.length;
    const needed = Math.ceil((total * SUBJECT_ADVANCE_PERCENT) / 100);
    const c = buildCfaCampaign(new Set(completeFirst("ethics", needed - 2)));
    expect(c.nextMilestone).toEqual({
      subjectId: "ethics",
      lessonsLeft: 2,
      xpReward: 2 * XP_PER_LESSON,
      unlocksSubjectId: "quant",
    });
  });

  it("môn cuối cùng thì không mở ra môn nào nữa", () => {
    const done = CFA_SUBJECT_ORDER.slice(0, 9).flatMap((id) => subjectOf(id).lessonIds);
    const c = buildCfaCampaign(new Set(done));
    expect(c.currentSubjectId).toBe("portfolio");
    expect(c.nextMilestone?.unlocksSubjectId).toBeNull();
  });

  it("xong hết thì hết mốc", () => {
    const all = CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds);
    const c = buildCfaCampaign(new Set(all));
    expect(c.currentSubjectId).toBeNull();
    expect(c.nextMilestone).toBeNull();
    expect(c.percent).toBe(100);
  });
});

describe("sẵn sàng thi - cân theo trọng số, không phải đếm bài", () => {
  it("xong hết là 100, chưa gì là 0", () => {
    expect(buildCfaCampaign(new Set()).examReadiness).toBe(0);
    const all = CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds);
    expect(buildCfaCampaign(new Set(all)).examReadiness).toBe(100);
  });

  it("đây là ca biện minh cho cả hàm: FSA nhiều bài gấp bốn Economics, nhưng KHÔNG nặng gấp bốn", () => {
    const fsa = buildCfaCampaign(new Set(subjectOf("fsa").lessonIds));
    const eco = buildCfaCampaign(new Set(subjectOf("economics").lessonIds));

    // FSA có ĐÚNG gấp 4 lần số bài của Economics (80 so với 20), nên nếu mức
    // sẵn sàng thi là phép đếm bài thì tỷ lệ hai con số dưới đây cũng phải là
    // 4. Nó không phải, và đó là toàn bộ lý do hàm này tồn tại.
    expect(subjectOf("fsa").lessonIds.length).toBe(subjectOf("economics").lessonIds.length * 4);
    // Trọng số đề thi thật: 11-14% so với 6-9%, tức chưa tới gấp đôi.
    expect(fsa.examReadiness).toBeLessThan(eco.examReadiness * 2.5);
    expect(fsa.examReadiness).toBeGreaterThan(eco.examReadiness);
  });

  it("phần trăm đếm bài và mức sẵn sàng thi là HAI con số khác nhau", () => {
    const c = buildCfaCampaign(new Set(subjectOf("fsa").lessonIds));
    expect(c.percent).not.toBe(c.examReadiness);
  });
});

describe("XP", () => {
  it("bằng đúng số bài đã học nhân XP_PER_LESSON - cùng công thức recalculateUserStats", () => {
    const c = buildCfaCampaign(new Set(completeFirst("ethics", 5)));
    expect(c.xpFromCfa).toBe(5 * XP_PER_LESSON);
  });

  it("bài dùng chung giữa hai môn chỉ tính XP một lần", () => {
    const all = CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds);
    const unique = new Set(all).size;
    const c = buildCfaCampaign(new Set(all));
    expect(c.xpFromCfa).toBe(unique * XP_PER_LESSON);
    expect(c.doneLessons).toBe(unique);
  });
});
