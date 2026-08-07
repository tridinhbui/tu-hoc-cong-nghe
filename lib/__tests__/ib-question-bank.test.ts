import { describe, it, expect } from "vitest";
import {
  IB_QUESTION_BANK,
  IB_TECHNICAL_QUESTIONS,
  IB_BEHAVIORAL_QUESTIONS,
  IB_REWRITE_PENDING_COUNT,
  getIbCategoryCounts,
  isBehavioralCategory,
} from "@/lib/ib-question-bank";
import { IB_QUESTION_OVERRIDES } from "@/lib/ib-question-overrides";

// The bank was machine-scraped from a prose Q&A book, and the conversion left
// every question with a truncated correct answer and three distractors lifted
// verbatim from other questions. lib/ib-question-overrides.ts replaces those
// batch by batch; these tests pin the quality bar each rewritten batch has to
// clear, so a later batch can't quietly reintroduce the original problems.

const overriddenIds = Object.keys(IB_QUESTION_OVERRIDES).map(Number);
const rewritten = IB_QUESTION_BANK.filter((q) => overriddenIds.includes(q.id));

describe("IB_QUESTION_BANK structure", () => {
  it("gives every question four options and an in-range correct index", () => {
    for (const q of IB_QUESTION_BANK) {
      expect(q.options, `id ${q.id}`).toHaveLength(4);
      expect(q.correct, `id ${q.id}`).toBeGreaterThanOrEqual(0);
      expect(q.correct, `id ${q.id}`).toBeLessThan(q.options.length);
    }
  });

  it("has unique ids", () => {
    const ids = IB_QUESTION_BANK.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("never ships a question with no explanation", () => {
    for (const q of IB_QUESTION_BANK) {
      expect(q.explanation.trim().length, `id ${q.id}`).toBeGreaterThan(0);
    }
  });

  it("carries no competitor promotional links", () => {
    // The scrape pulled in marketing copy for a paid course, including a
    // members-only paywall URL. Those were stripped; this keeps them out.
    for (const q of IB_QUESTION_BANK) {
      const haystack = `${q.question} ${q.explanation} ${q.options.join(" ")}`;
      expect(haystack, `id ${q.id}`).not.toContain("breakingintowallstreet");
    }
  });
});

describe("rewritten questions (lib/ib-question-overrides.ts)", () => {
  it("covers every override id with a real question in the bank", () => {
    for (const id of overriddenIds) {
      expect(IB_QUESTION_BANK.find((q) => q.id === id), `override for unknown id ${id}`).toBeDefined();
    }
  });

  it("actually replaces the raw options", () => {
    expect(rewritten).toHaveLength(overriddenIds.length);
    for (const q of rewritten) {
      expect(q.options).toEqual(IB_QUESTION_OVERRIDES[q.id].options);
      expect(q.correct).toBe(IB_QUESTION_OVERRIDES[q.id].correct);
    }
  });

  it("leaves no option truncated mid-sentence", () => {
    // 90% of the raw options end in "...." with the sentence cut off, which is
    // what made several of them unanswerable.
    for (const q of rewritten) {
      for (const option of q.options) {
        expect(option.trimEnd(), `id ${q.id}`).not.toMatch(/\.\.\.\.?$/);
      }
    }
  });

  it("gives each question four distinct options", () => {
    for (const q of rewritten) {
      expect(new Set(q.options).size, `id ${q.id}`).toBe(4);
    }
  });

  it("does not reuse an option across different rewritten questions", () => {
    // The core defect of the raw bank: the entire option pool was just the set
    // of correct answers, so every distractor was another question's answer.
    const all = rewritten.flatMap((q) => q.options);
    expect(new Set(all).size).toBe(all.length);
  });

  it("applies a question-text override where one is set", () => {
    // The scrape cut five prompts mid-sentence, spilling the tail into the
    // start of `explanation`. Overrides may restore the full prompt.
    for (const id of overriddenIds) {
      const restored = IB_QUESTION_OVERRIDES[id].question;
      if (!restored) continue;
      expect(IB_QUESTION_BANK.find((q) => q.id === id)!.question).toBe(restored);
    }
  });

  it("leaves the prompt alone when no question override is set", () => {
    const untouched = overriddenIds.filter((id) => !IB_QUESTION_OVERRIDES[id].question);
    expect(untouched.length).toBeGreaterThan(0);
    for (const id of untouched) {
      const q = IB_QUESTION_BANK.find((x) => x.id === id)!;
      expect(q.question.trim().length).toBeGreaterThan(0);
    }
  });

  it("keeps options close enough in length that length isn't a tell", () => {
    for (const q of rewritten) {
      const lengths = q.options.map((o) => o.length);
      const shortest = Math.min(...lengths);
      const longest = Math.max(...lengths);
      // A correct answer 4x longer than its distractors is guessable without
      // reading the question.
      expect(longest / shortest, `id ${q.id}`).toBeLessThan(3);
    }
  });
});

describe("getIbCategoryCounts", () => {
  it("accounts for every question exactly once", () => {
    const total = getIbCategoryCounts().reduce((sum, c) => sum + c.count, 0);
    expect(total).toBe(IB_QUESTION_BANK.length);
  });

  it("sorts largest category first", () => {
    const counts = getIbCategoryCounts().map((c) => c.count);
    expect(counts).toEqual([...counts].sort((a, b) => b - a));
  });

  it("strips the literal quote characters some categories carry", () => {
    for (const { label } of getIbCategoryCounts()) {
      expect(label.startsWith('"')).toBe(false);
      expect(label.endsWith('"')).toBe(false);
    }
  });
});

describe("technical / behavioral split", () => {
  it("partitions the bank with nothing lost or double-counted", () => {
    expect(IB_TECHNICAL_QUESTIONS.length + IB_BEHAVIORAL_QUESTIONS.length).toBe(IB_QUESTION_BANK.length);
    const technicalIds = new Set(IB_TECHNICAL_QUESTIONS.map((q) => q.id));
    for (const q of IB_BEHAVIORAL_QUESTIONS) {
      expect(technicalIds.has(q.id), `id ${q.id} is in both halves`).toBe(false);
    }
  });

  it("keeps every behavioral category out of the technical pool", () => {
    for (const q of IB_TECHNICAL_QUESTIONS) {
      expect(isBehavioralCategory(q.category), `id ${q.id} (${q.category})`).toBe(false);
    }
  });

  it("only rewrites technical questions - behavioral options are never rendered", () => {
    for (const id of overriddenIds) {
      const q = IB_QUESTION_BANK.find((x) => x.id === id)!;
      expect(isBehavioralCategory(q.category), `id ${id} is behavioral, rewriting it is wasted work`).toBe(false);
    }
  });
});

describe("rewrite backlog", () => {
  it("counts only technical questions that still have raw scraped options", () => {
    // Behavioral questions are excluded on purpose: their options are scrape
    // artifacts that no surface renders, so they need no rewrite.
    expect(IB_REWRITE_PENDING_COUNT).toBe(IB_TECHNICAL_QUESTIONS.length - overriddenIds.length);
  });

  /** Tồn đọng chưa viết lại là CỔNG CỨNG ở 0, vì kho đã ở 0.
   *
   *  Bài ngay trên chỉ kiểm rằng phép trừ được tính đúng - nó xanh với mọi giá
   *  trị của con số, kể cả 0 hay 300, nên nó không chặn được gì. Không có cổng
   *  thì một câu kỹ thuật mới thêm vào ngân hàng mà chưa viết lại phương án sẽ
   *  mang nguyên bốn phương án cào từ sách về, và không có gì đỏ. Đây là ngân
   *  hàng nuôi interview_readiness và ib_readiness ở lib/career-competency.ts.
   *
   *  Không bao giờ nâng nó lên khỏi 0 để một build đỏ thành xanh: câu mới thì
   *  viết phương án cho nó trong lib/ib-question-overrides.ts. */
  it("stays at zero: a new technical question arrives with its options rewritten", () => {
    expect(IB_REWRITE_PENDING_COUNT).toBe(0);
  });
});

/** Đáp án đúng có phải phương án dài nhất - hay ngắn nhất - thường xuyên hơn
 *  may rủi không.
 *
 *  VÌ SAO BÀI NÀY TỒN TẠI. scripts/audit-ib-option-length.mjs nói trong chú
 *  thích đầu file rằng "the guard in lib/__tests__/ib-question-bank.test.ts
 *  enforces the ceiling". Không có trần nào cả: bài duy nhất về độ dài ở đây
 *  kiểm TỶ LỆ dài/ngắn của TỪNG câu, và chỉ chạy trên các câu đã viết lại. Nó
 *  không nói gì về phân bố - một ngân hàng mà mọi câu đều nằm trong tỷ lệ 3x
 *  vẫn có thể có đáp án đúng là phương án dài nhất ở 90% số câu. Bộ kiểm đo
 *  phân bố đó nhưng chỉ in ra và luôn thoát 0, nên suốt đời nó, con số này chỉ
 *  được nhìn khi có người nhớ chạy tay.
 *
 *  Đo bằng z chứ không bằng tỷ lệ, cùng lý do đã ghi trong AGENTS.md cho kho
 *  bài học: 315 câu và 2.469 câu có sàn nhiễu khác nhau nên một con số phần
 *  trăm nói hai chuyện khác nhau, và một trần một chiều mù với việc trôi xuống
 *  DƯỚI mức may rủi - chiều mà kho này đang nghiêng về.
 *
 *  Kỳ vọng có tính tới hoà: khi hai phương án dài bằng nhau thì không có
 *  "phương án dài nhất duy nhất" để chọn, nên câu đó đóng góp 0 vào kỳ vọng
 *  thay vì 0,25. So với một mức 25% phẳng sẽ thổi phồng phía dài.
 *
 *  Chỉ đo câu kỹ thuật: đó là tập duy nhất bài luyện có chấm điểm rút ra. */
describe("length bias across the technical bank", () => {
  /** Đặt ở 3,7 vì |z| tệ nhất của kho đang là 3,29 ở phía "ngắn nhất" - đúng
   *  luật của AGENTS.md, cổng đặt ở mức kho ĐÃ ĐẠT chứ không phải mức mong
   *  muốn, để nó gác đợt viết lại tiếp theo mà không đẩy kho hiện tại vào nợ.
   *  Khoảng đệm 0,4 là chỗ cho vài chục câu xê dịch, không phải chỗ cho một
   *  đợt trôi.
   *
   *  KHÔNG đọc con số −3,29 như một tồn đọng phải cày xuống. AGENTS.md đã ghi
   *  lại phép đo cho kho bài học: một z âm nhẹ là hệ quả số học của việc đáp án
   *  đúng phát biểu một mệnh đề trong khi mỗi phương án nhiễu phải mang theo
   *  cái sai sinh ra nó. Đóng nốt nó chỉ còn hai đường và cả hai làm hỏng câu
   *  hỏi: nhồi chữ vào đáp án đúng, hoặc rút lý lẽ khỏi phương án nhiễu. */
  const MAX_LENGTH_BIAS_Z = 3.7;

  function biasZ(questions: { options: string[]; correct: number }[], side: "longest" | "shortest") {
    let observed = 0;
    let expected = 0;
    let variance = 0;
    for (const q of questions) {
      const lengths = q.options.map((o) => o.length);
      const extreme = side === "longest" ? Math.max(...lengths) : Math.min(...lengths);
      // Hoà thì không có phương án cực trị DUY NHẤT, nên câu đó không mách nước
      // gì và cũng không đóng góp vào kỳ vọng.
      if (lengths.filter((l) => l === extreme).length !== 1) continue;
      const p = 1 / lengths.length;
      if (lengths[q.correct] === extreme) observed += 1;
      expected += p;
      variance += p * (1 - p);
    }
    return variance > 0 ? (observed - expected) / Math.sqrt(variance) : 0;
  }

  it("stays near chance on both sides", () => {
    const questions = IB_TECHNICAL_QUESTIONS.map((q) => ({ options: q.options, correct: q.correct }));
    const zLongest = biasZ(questions, "longest");
    const zShortest = biasZ(questions, "shortest");
    // Hai chiều đều khai thác được. Dương ở "longest": chọn phương án dài nhất
    // là ăn. Âm ở "longest" đi kèm dương ở "shortest": loại phương án dài nhất
    // rồi đoán trong ba - đúng cách kho bài học từng trôi tới z = −4,6 vì cắt
    // đáp án đúng cho ngắn. Đích là đáp án đúng nằm GIỮA nhóm.
    expect(Math.abs(zLongest), `z(longest) = ${zLongest.toFixed(2)}`).toBeLessThan(MAX_LENGTH_BIAS_Z);
    expect(Math.abs(zShortest), `z(shortest) = ${zShortest.toFixed(2)}`).toBeLessThan(MAX_LENGTH_BIAS_Z);
  });
});
