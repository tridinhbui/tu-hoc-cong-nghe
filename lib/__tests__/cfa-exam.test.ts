import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";
import {
  CFA_EXAM,
  CFA_OPTION_COUNT,
  SUBJECT_OF_LESSON,
  SUBJECT_SHARE,
  SUBJECT_WEIGHTS,
  drawSubject,
  examSubjectPlan,
  parseWeight,
  pickCfaWeighted,
  scoreBySubject,
  toThreeOptions,
} from "@/lib/cfa-exam";

/** Cả file này tồn tại vì một lỗi không ai nhìn thấy được: đề luyện CFA gom
 *  phẳng 366 bài rồi xáo đều, nên FSA chiếm 24,9% số câu trong khi đề thi thật
 *  cho nó 11-14%, còn Ethics - môn nặng nhất - tụt xuống 12,1%. Nhìn màn hình
 *  thì mọi câu đều hợp lệ; chỉ đếm mới thấy.
 *
 *  Nên phép kiểm ở đây là ĐẾM PHÂN PHỐI, không phải xem hàm có chạy không. */

/** rng tất định để bốc ngẫu nhiên vẫn kiểm được. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

describe("trọng số môn", () => {
  it("đọc được cả gạch ngang dài trong cfa-track", () => {
    expect(parseWeight("15–20%")).toEqual({ lo: 15, hi: 20 });
    expect(parseWeight("6-9%")).toEqual({ lo: 6, hi: 9 });
  });

  it("phủ đủ 10 môn, không thiếu không thừa", () => {
    expect(SUBJECT_WEIGHTS).toHaveLength(CFA_LEVEL_1_SUBJECTS.length);
    expect(new Set(SUBJECT_WEIGHTS.map((w) => w.id)).size).toBe(10);
  });

  it("tỷ lệ chuẩn hoá cộng lại đúng 1", () => {
    const sum = SUBJECT_SHARE.reduce((n, s) => n + s.share, 0);
    expect(sum).toBeCloseTo(1, 10);
  });

  it("sau chuẩn hoá mọi môn VẪN nằm trong dải chính thức của nó", () => {
    // Các trung điểm cộng lại ra 102,5% nên phải chia lại; phép chia đó có thể
    // đẩy một môn ra khỏi dải của chính nó, và khi đó cả cách tiếp cận sai.
    for (const s of SUBJECT_SHARE) {
      const w = SUBJECT_WEIGHTS.find((x) => x.id === s.id)!;
      expect(s.share * 100).toBeGreaterThanOrEqual(w.lo);
      expect(s.share * 100).toBeLessThanOrEqual(w.hi);
    }
  });
});

describe("chia câu cho đề thi thử", () => {
  it("tổng đúng bằng số câu yêu cầu", () => {
    for (const n of [10, 30, 90, 180, 181]) {
      const plan = examSubjectPlan(n);
      expect([...plan.values()].reduce((a, b) => a + b, 0)).toBe(n);
    }
  });

  it("đề 180 câu: mọi môn nằm trong dải trọng số chính thức", () => {
    const plan = examSubjectPlan(CFA_EXAM.totalQuestions);
    for (const w of SUBJECT_WEIGHTS) {
      const share = ((plan.get(w.id) ?? 0) / CFA_EXAM.totalQuestions) * 100;
      expect(share, `${w.id} = ${share.toFixed(1)}%`).toBeGreaterThanOrEqual(w.lo);
      expect(share, `${w.id} = ${share.toFixed(1)}%`).toBeLessThanOrEqual(w.hi);
    }
  });

  it("không môn nào bị bỏ trắng trong đề 180 câu", () => {
    const plan = examSubjectPlan(180);
    for (const w of SUBJECT_WEIGHTS) expect(plan.get(w.id) ?? 0).toBeGreaterThan(0);
  });

  it("Ethics được nhiều câu nhất - đúng như trọng số đề thi", () => {
    const plan = examSubjectPlan(180);
    const max = Math.max(...plan.values());
    expect(plan.get("ethics")).toBe(max);
  });
});

describe("bốc môn cho đề ngắn", () => {
  it("qua nhiều phiên, tỷ lệ hội tụ về dải chính thức", () => {
    const rng = seeded(42);
    const count = new Map<string, number>();
    const N = 40_000;
    for (let i = 0; i < N; i += 1) {
      const id = drawSubject(rng);
      count.set(id, (count.get(id) ?? 0) + 1);
    }
    for (const w of SUBJECT_WEIGHTS) {
      const share = ((count.get(w.id) ?? 0) / N) * 100;
      expect(share, `${w.id} = ${share.toFixed(2)}%`).toBeGreaterThan(w.lo - 1);
      expect(share, `${w.id} = ${share.toFixed(2)}%`).toBeLessThan(w.hi + 1);
    }
  });

  it("mọi môn đều có cơ hội xuất hiện, kể cả môn nhẹ nhất", () => {
    const rng = seeded(7);
    const seen = new Set<string>();
    for (let i = 0; i < 5000; i += 1) seen.add(drawSubject(rng));
    expect(seen.size).toBe(10);
  });
});

describe("cắt về ba lựa chọn", () => {
  const q = { options: ["A", "B", "C", "D"], correct: 2 };

  it("còn đúng ba lựa chọn", () => {
    const rng = seeded(11);
    for (let i = 0; i < 200; i += 1) {
      expect(toThreeOptions(q, rng).options).toHaveLength(CFA_OPTION_COUNT);
    }
  });

  it("KHÔNG BAO GIỜ bỏ mất đáp án đúng, và chỉ số vẫn trỏ đúng nó", () => {
    const rng = seeded(23);
    for (let i = 0; i < 500; i += 1) {
      for (let correct = 0; correct < 4; correct += 1) {
        const src = { options: ["A", "B", "C", "D"], correct };
        const out = toThreeOptions(src, rng);
        expect(out.options).toContain(src.options[correct]);
        expect(out.options[out.correct]).toBe(src.options[correct]);
      }
    }
  });

  it("giữ nguyên thứ tự tương đối các lựa chọn còn lại", () => {
    const rng = seeded(9);
    for (let i = 0; i < 100; i += 1) {
      const out = toThreeOptions({ options: ["A", "B", "C", "D"], correct: 0 }, rng);
      const order = out.options.map((o) => "ABCD".indexOf(o));
      expect([...order].sort((a, b) => a - b)).toEqual(order);
    }
  });

  it("bỏ phương án nào là ngẫu nhiên, không theo quy tắc cố định", () => {
    // Bỏ theo quy tắc là tự tạo manh mối mới - đúng loại lỗi mà cổng kiểm
    // chất lượng quiz sinh ra để chặn.
    const rng = seeded(5);
    const droppedSets = new Set<string>();
    for (let i = 0; i < 300; i += 1) {
      droppedSets.add(toThreeOptions(q, rng).options.join(""));
    }
    // Bốn lựa chọn, một đúng: có đúng ba phương án sai để bỏ, nên phải thấy
    // đủ ba kết quả khác nhau.
    expect(droppedSets.size).toBe(3);
  });

  it("câu vốn đã ba lựa chọn thì để nguyên", () => {
    const three = { options: ["A", "B", "C"], correct: 1 };
    expect(toThreeOptions(three, seeded(3))).toEqual(three);
  });
});

describe("bản đồ bài → môn", () => {
  it("mỗi bài chỉ thuộc đúng một môn", () => {
    const all = CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds);
    expect(SUBJECT_OF_LESSON.size).toBe(new Set(all).size);
    expect(new Set(all).size).toBe(all.length);
  });
});

describe("chấm điểm theo môn", () => {
  it("gom đúng theo môn của từng bài", () => {
    const ethics = CFA_LEVEL_1_SUBJECTS.find((s) => s.id === "ethics")!.lessonIds[0];
    const quant = CFA_LEVEL_1_SUBJECTS.find((s) => s.id === "quant")!.lessonIds[0];
    const rows = scoreBySubject([
      { lessonId: ethics, correct: true },
      { lessonId: ethics, correct: false },
      { lessonId: quant, correct: true },
    ]);
    expect(rows.find((r) => r.id === "ethics")).toMatchObject({ correct: 1, total: 2 });
    expect(rows.find((r) => r.id === "quant")).toMatchObject({ correct: 1, total: 1 });
  });

  it("bỏ qua bài không thuộc môn CFA nào thay vì nổ", () => {
    expect(scoreBySubject([{ lessonId: 999999, correct: true }])).toEqual([]);
  });

  it("giữ thứ tự môn của đề cương, không sắp theo điểm", () => {
    const ids = CFA_LEVEL_1_SUBJECTS.map((s) => s.lessonIds[0]);
    const rows = scoreBySubject(ids.map((id) => ({ lessonId: id, correct: false })));
    expect(rows.map((r) => r.id)).toEqual(CFA_LEVEL_1_SUBJECTS.map((s) => s.id));
  });
});

describe("kích thước đề thi thử", () => {
  it("khớp đề thi thật: 180 câu, hai ca 90 câu / 135 phút", () => {
    expect(CFA_EXAM.totalQuestions).toBe(180);
    expect(CFA_EXAM.questionsPerSession).toBe(90);
    expect(CFA_EXAM.minutesPerSession).toBe(135);
  });
});

describe("chọn câu trên KHO CÂU HỎI THẬT", () => {
  // Đọc thẳng lib/lessons-data thay vì qua lessons-loader: loader là
  // server-only và ném lỗi ngay khi import từ vitest.
  const pool: Array<{ lessonId: number }> = (() => {
    const out: Array<{ lessonId: number }> = [];
    for (const f of readdirSync("lib/lessons-data")) {
      if (!f.endsWith(".json") || f === "_index.json") continue;
      const lesson = JSON.parse(readFileSync(`lib/lessons-data/${f}`, "utf8"));
      if (!SUBJECT_OF_LESSON.has(lesson.id)) continue;
      for (let i = 0; i < (lesson.quiz?.length ?? 0); i += 1) out.push({ lessonId: lesson.id });
    }
    return out;
  })();

  function shareOf(picked: Array<{ lessonId: number }>) {
    const count = new Map<string, number>();
    for (const q of picked) {
      const s = SUBJECT_OF_LESSON.get(q.lessonId)!;
      count.set(s, (count.get(s) ?? 0) + 1);
    }
    return (id: string) => ((count.get(id) ?? 0) / picked.length) * 100;
  }

  it("kho đủ lớn để chọn được đề 180 câu", () => {
    expect(pool.length).toBeGreaterThan(CFA_EXAM.totalQuestions * 5);
  });

  it("XÁO ĐỀU (cách cũ) làm lệch hẳn khỏi trọng số - đây là lỗi đang sửa", () => {
    // Giữ lại phép đo của cách cũ để nếu ai đó gỡ bỏ phần cân trọng số, test
    // bên dưới đỏ và test này giải thích vì sao.
    const share = shareOf(pool);
    expect(share("fsa")).toBeGreaterThan(14);
    expect(share("ethics")).toBeLessThan(15);
  });

  it("đề thi thử 180 câu: MỌI môn nằm trong dải trọng số chính thức", () => {
    const share = shareOf(pickCfaWeighted(pool, CFA_EXAM.totalQuestions, seeded(2026)));
    for (const w of SUBJECT_WEIGHTS) {
      expect(share(w.id), `${w.id} = ${share(w.id).toFixed(1)}%`).toBeGreaterThanOrEqual(w.lo);
      expect(share(w.id), `${w.id} = ${share(w.id).toFixed(1)}%`).toBeLessThanOrEqual(w.hi);
    }
  });

  it("luyện 5 câu: qua nhiều phiên vẫn hội tụ về dải trọng số", () => {
    const rng = seeded(99);
    const all: Array<{ lessonId: number }> = [];
    for (let i = 0; i < 3000; i += 1) all.push(...pickCfaWeighted(pool, 5, rng));
    const share = shareOf(all);
    for (const w of SUBJECT_WEIGHTS) {
      expect(share(w.id), `${w.id} = ${share(w.id).toFixed(2)}%`).toBeGreaterThan(w.lo - 1.5);
      expect(share(w.id), `${w.id} = ${share(w.id).toFixed(2)}%`).toBeLessThan(w.hi + 1.5);
    }
  });

  it("không trả về câu trùng trong cùng một đề", () => {
    const picked = pickCfaWeighted(pool.map((q, i) => ({ ...q, i })), 180, seeded(7));
    expect(new Set(picked.map((q) => q.i)).size).toBe(180);
  });

  it("kho nhỏ hơn số câu yêu cầu thì trả hết chứ không lặp lại", () => {
    const small = pool.slice(0, 12).map((q, i) => ({ ...q, i }));
    const picked = pickCfaWeighted(small, 50, seeded(3));
    expect(picked.length).toBe(12);
    expect(new Set(picked.map((q) => q.i)).size).toBe(12);
  });
});
