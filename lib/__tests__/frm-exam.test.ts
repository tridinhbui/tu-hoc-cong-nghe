import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { FRM_SUBJECTS } from "@/lib/frm-track";
import {
  FRM_EXAM,
  FRM_OPTION_COUNT,
  FRM_SUBJECT_OF_LESSON,
  FRM_SUBJECT_SHARE,
  FRM_SUBJECT_WEIGHTS,
  drawFrmSubject,
  frmLessonIds,
  frmPartsOfLesson,
  frmScoreBySubject,
  frmSubjectPlan,
  pickFrmWeighted,
  type FrmPart,
} from "@/lib/frm-exam";

/** Lỗi mà file này canh: đề FRM ra sai tỷ lệ môn, và đề Part I lẫn câu của
 *  Part II. Cả hai đều không lộ ra trên màn hình - mọi câu đều là câu hợp lệ.
 *
 *  Có một cái bẫy riêng của FRM mà tôi đã tự mắc khi đo lần đầu: gộp cả mười
 *  môn vào một mẫu số rồi so với trọng số. Hai phần thi là hai kỳ thi riêng,
 *  mỗi bộ môn cộng lại 100%, nên phép gộp cho ra kết luận "mọi môn đều thiếu
 *  10-15%" - một điều không thể đúng. Test dưới đây luôn tính theo TỪNG PHẦN. */

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const PARTS: FrmPart[] = ["I", "II"];

describe("trọng số hai phần thi", () => {
  for (const part of PARTS) {
    it(`Part ${part}: trọng số công bố cộng lại đúng 100%`, () => {
      const sum = FRM_SUBJECT_WEIGHTS[part].reduce((n, w) => n + (w.lo + w.hi) / 2, 0);
      expect(sum).toBeCloseTo(100, 6);
    });

    it(`Part ${part}: tỷ lệ chuẩn hoá cộng lại đúng 1`, () => {
      expect(FRM_SUBJECT_SHARE[part].reduce((n, s) => n + s.share, 0)).toBeCloseTo(1, 10);
    });
  }

  it("mỗi môn thuộc đúng một phần, không môn nào ở cả hai", () => {
    const inI = new Set(FRM_SUBJECT_WEIGHTS.I.map((w) => w.id));
    const inII = new Set(FRM_SUBJECT_WEIGHTS.II.map((w) => w.id));
    for (const id of inI) expect(inII.has(id)).toBe(false);
    expect(inI.size + inII.size).toBe(FRM_SUBJECTS.length);
  });
});

describe("chia câu cho đề thi thử", () => {
  for (const part of PARTS) {
    it(`Part ${part}: tổng đúng bằng số câu của đề thật`, () => {
      const plan = frmSubjectPlan(part, FRM_EXAM[part].questions);
      expect([...plan.values()].reduce((a, b) => a + b, 0)).toBe(FRM_EXAM[part].questions);
    });

    it(`Part ${part}: mọi môn khớp trọng số công bố trong phạm vi làm tròn`, () => {
      const total = FRM_EXAM[part].questions;
      const plan = frmSubjectPlan(part, total);
      for (const w of FRM_SUBJECT_WEIGHTS[part]) {
        const share = ((plan.get(w.id) ?? 0) / total) * 100;
        // Trọng số FRM là số cố định, không phải dải, nên chỉ chừa sai số làm
        // tròn của một câu.
        const tolerance = (1 / total) * 100 + 0.01;
        expect(share, `${w.id} = ${share.toFixed(1)}%`).toBeGreaterThanOrEqual(w.lo - tolerance);
        expect(share, `${w.id} = ${share.toFixed(1)}%`).toBeLessThanOrEqual(w.hi + tolerance);
      }
    });

    it(`Part ${part}: không môn nào bị bỏ trắng`, () => {
      const plan = frmSubjectPlan(part, FRM_EXAM[part].questions);
      for (const w of FRM_SUBJECT_WEIGHTS[part]) expect(plan.get(w.id) ?? 0).toBeGreaterThan(0);
    });
  }
});

describe("bốc môn cho đề ngắn", () => {
  for (const part of PARTS) {
    it(`Part ${part}: qua nhiều phiên hội tụ về trọng số`, () => {
      const rng = seeded(2026);
      const count = new Map<string, number>();
      const N = 40_000;
      for (let i = 0; i < N; i += 1) {
        const id = drawFrmSubject(part, rng);
        count.set(id, (count.get(id) ?? 0) + 1);
      }
      for (const w of FRM_SUBJECT_WEIGHTS[part]) {
        const share = ((count.get(w.id) ?? 0) / N) * 100;
        expect(share, `${w.id} = ${share.toFixed(2)}%`).toBeGreaterThan(w.lo - 1);
        expect(share, `${w.id} = ${share.toFixed(2)}%`).toBeLessThan(w.hi + 1);
      }
    });
  }
});

describe("chọn câu trên KHO CÂU HỎI THẬT", () => {
  const pool: Array<{ lessonId: number; n: number }> = (() => {
    const out: Array<{ lessonId: number; n: number }> = [];
    let n = 0;
    for (const f of readdirSync("lib/lessons-data")) {
      if (!f.endsWith(".json") || f === "_index.json") continue;
      const lesson = JSON.parse(readFileSync(`lib/lessons-data/${f}`, "utf8"));
      if (!FRM_SUBJECT_OF_LESSON.has(lesson.id)) continue;
      for (let i = 0; i < (lesson.quiz?.length ?? 0); i += 1) out.push({ lessonId: lesson.id, n: n++ });
    }
    return out;
  })();

  /** Tỷ lệ tính theo Ô MÔN mà câu được bốc cho, không phải theo tra ngược từ
   *  bài. Tra ngược là chính giả định sai đã bị bắt: một bài có thể nằm ở nhiều
   *  môn, nên tra ngược sẽ gán bừa và tỷ lệ đo ra không phải tỷ lệ thật của đề. */
  function shareOfSlots(picked: Array<{ subject: string }>) {
    const count = new Map<string, number>();
    for (const r of picked) count.set(r.subject, (count.get(r.subject) ?? 0) + 1);
    return (id: string) => ((count.get(id) ?? 0) / picked.length) * 100;
  }

  it("kho có đủ câu cho đề đầy đủ của cả hai phần", () => {
    for (const part of PARTS) {
      const inPart = pool.filter((q) => frmPartsOfLesson(q.lessonId).includes(part));
      expect(inPart.length).toBeGreaterThan(FRM_EXAM[part].questions);
    }
  });

  it("XÁO ĐỀU (cách cũ) làm lệch hẳn - đây là lỗi đang chặn trước khi nó phát tác", () => {
    // Đếm theo môn của Part I, chấp nhận một bài rơi vào nhiều môn: con số này
    // chỉ để cho thấy kho nghiêng về đâu, không phải để chấm điểm.
    const count = new Map<string, number>();
    for (const s of FRM_SUBJECTS.filter((x) => x.part === "I")) {
      const n = pool.filter((q) => s.lessonIds.includes(q.lessonId)).length;
      count.set(s.id, n);
    }
    const tot = [...count.values()].reduce((a, b) => a + b, 0);
    expect(((count.get("financial-markets-products") ?? 0) / tot) * 100).toBeGreaterThan(35);
  });

  for (const part of PARTS) {
    it(`Part ${part}: đề thi thử khớp trọng số trên kho thật`, () => {
      const picked = pickFrmWeighted(pool, FRM_EXAM[part].questions, part, seeded(7));
      expect(picked.length).toBe(FRM_EXAM[part].questions);
      const share = shareOfSlots(picked);
      for (const w of FRM_SUBJECT_WEIGHTS[part]) {
        expect(share(w.id), `${w.id} = ${share(w.id).toFixed(1)}%`).toBeGreaterThan(w.lo - 2);
        expect(share(w.id), `${w.id} = ${share(w.id).toFixed(1)}%`).toBeLessThan(w.hi + 2);
      }
    });

    it(`Part ${part}: mọi câu đến từ môn THUỘC phần thi đó`, () => {
      const allowed = new Set(FRM_SUBJECT_WEIGHTS[part].map((w) => w.id));
      const picked = pickFrmWeighted(pool, FRM_EXAM[part].questions, part, seeded(11));
      for (const r of picked) expect(allowed.has(r.subject)).toBe(true);
    });

    it(`Part ${part}: không trả về câu trùng, kể cả bài nằm ở nhiều môn`, () => {
      const picked = pickFrmWeighted(pool, FRM_EXAM[part].questions, part, seeded(3));
      expect(new Set(picked.map((r) => r.item.n)).size).toBe(picked.length);
    });
  }

  it("luyện 5 câu: qua nhiều phiên vẫn hội tụ về trọng số", () => {
    const rng = seeded(51);
    const all: Array<{ subject: string }> = [];
    for (let i = 0; i < 3000; i += 1) all.push(...pickFrmWeighted(pool, 5, "I", rng));
    const share = shareOfSlots(all);
    for (const w of FRM_SUBJECT_WEIGHTS.I) {
      expect(share(w.id), `${w.id} = ${share(w.id).toFixed(2)}%`).toBeGreaterThan(w.lo - 2);
      expect(share(w.id), `${w.id} = ${share(w.id).toFixed(2)}%`).toBeLessThan(w.hi + 2);
    }
  });
});

describe("phạm vi từng phần", () => {
  it("frmLessonIds trả bài mà phần đó thực sự tham chiếu", () => {
    for (const part of PARTS) {
      for (const id of frmLessonIds(part)) expect(frmPartsOfLesson(id)).toContain(part);
    }
  });

  it("hai phần CÓ dùng chung một số bài - Part II xây trên nền Part I", () => {
    // Ghi lại như một tính chất của dữ liệu, không phải lỗi. Nếu con số này về 0
    // thì ai đó đã cắt phần nền của Part II, và đề Part II sẽ hụt phạm vi.
    const a = new Set(frmLessonIds("I"));
    const shared = frmLessonIds("II").filter((id) => a.has(id));
    expect(shared.length).toBeGreaterThan(0);
  });

  it("không bài nào bị bỏ quên ngoài cả hai phần", () => {
    for (const s of FRM_SUBJECTS) {
      for (const id of s.lessonIds) expect(frmPartsOfLesson(id).length).toBeGreaterThan(0);
    }
  });
});

describe("chấm điểm theo môn", () => {
  it("gom theo Ô MÔN đã bốc, không tra ngược từ bài", () => {
    const rows = frmScoreBySubject([
      { subject: "market-risk", correct: true },
      { subject: "market-risk", correct: false },
      { subject: "credit-risk", correct: true },
    ]);
    expect(rows.find((r) => r.id === "market-risk")).toMatchObject({ correct: 1, total: 2 });
    expect(rows.find((r) => r.id === "credit-risk")).toMatchObject({ correct: 1, total: 1 });
  });

  it("bỏ qua môn không có thật thay vì nổ", () => {
    expect(frmScoreBySubject([{ subject: "khong-co-that" as never, correct: true }])).toEqual([]);
  });
});

describe("khuôn đề", () => {
  it("Part I 100 câu / 4 tiếng, Part II 80 câu / 4 tiếng", () => {
    expect(FRM_EXAM.I).toMatchObject({ questions: 100, minutes: 240 });
    expect(FRM_EXAM.II).toMatchObject({ questions: 80, minutes: 240 });
  });

  it("giữ bốn lựa chọn - khác CFA Level I vốn là đề ba lựa chọn", () => {
    expect(FRM_OPTION_COUNT).toBe(4);
  });
});
