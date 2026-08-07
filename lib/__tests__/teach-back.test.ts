import { describe, expect, it } from "vitest";
import { MIN_WORDS, evaluate, normalize, topicsOf } from "@/lib/teach-back";
import { vi } from "@/lib/i18n/dictionaries/vi";

const TOPICS = topicsOf(vi);

/** Bàn tròn giảng lại.
 *
 *  Cách chấm ở đây là dò từ khoá, tức là nó LỎNG - và bài test này tồn tại
 *  phần lớn để ghim đúng chỗ nó lỏng, thay vì để giả vờ rằng nó chặt. Điểm
 *  không đi vào `avg_quiz_score` hay phần trăm năng lực nào, và bài cuối cùng
 *  ở đây canh đúng điều đó. */

describe("bỏ dấu", () => {
  it("khớp bất kể dấu, hoa thường hay khoảng trắng thừa", () => {
    expect(normalize("  DÒNG   Tiền  ")).toBe("dong tien");
    expect(normalize("Đầu tư")).toBe("dau tu");
  });

  it("người gõ không dấu vẫn chạm được ý", () => {
    const t = TOPICS.find((x) => x.id === "lai-kep")!;
    const answer =
      "lai me de lai con chu khong phai chi von de ra lai nen no di theo cap so nhan " +
      "va phan lon so tien den o nam cuoi vi vay nen bat dau som moi la dieu quan trong nhat";
    expect(evaluate(t, answer).missed).toEqual([]);
  });
});

describe("chấm bài giảng", () => {
  it("bài trống thì thiếu hết, không phải chạm hết", () => {
    for (const t of TOPICS) {
      const r = evaluate(t, "");
      expect(r.hit, t.id).toEqual([]);
      expect(r.missed.length, t.id).toBe(t.points.length);
      expect(r.tooShort, t.id).toBe(true);
    }
  });

  it("bài quá ngắn bị đánh dấu, kể cả khi chạm trúng từ khoá", () => {
    // Đây là lỗ hiển nhiên nhất của cách dò từ khoá: dán vài chữ là chạm ý mà
    // chưa giải thích gì. MIN_WORDS không bịt được nó hoàn toàn, nhưng nó bịt
    // được trường hợp lười nhất.
    const t = TOPICS.find((x) => x.id === "loi-nhuan-vs-tien")!;
    const r = evaluate(t, "khấu hao tồn kho bán chịu trả nợ");
    expect(r.hit.length).toBe(4);
    expect(r.tooShort).toBe(true);
  });

  it("đếm từ đúng và qua ngưỡng khi đủ dài", () => {
    const t = TOPICS[0];
    const long = Array.from({ length: MIN_WORDS }, (_, i) => `từ${i}`).join(" ");
    const r = evaluate(t, long);
    expect(r.words).toBe(MIN_WORDS);
    expect(r.tooShort).toBe(false);
  });

  it("mỗi ý đều chạm được bằng ít nhất một cách diễn đạt của chính nó", () => {
    // Một dấu hiệu gõ sai chính tả thì cái ý đó KHÔNG BAO GIỜ chạm được, và
    // người học bị bảo là thiếu ý dù đã nói. Hỏng im lặng, không ai thấy.
    for (const t of TOPICS) {
      for (const p of t.points) {
        expect(p.markers.length, `${t.id}/${p.id}`).toBeGreaterThan(0);
        for (const m of p.markers) {
          expect(evaluate(t, m).hit, `${t.id}/${p.id}: "${m}"`).toContain(p.id);
        }
      }
    }
  });

  it("không có dấu hiệu nào chạm nhầm sang ý khác trong cùng đề", () => {
    // Hai ý dùng chung một từ thì phản hồi nói dối: viết một ý được tính hai.
    for (const t of TOPICS) {
      for (const p of t.points) {
        for (const m of p.markers) {
          expect(evaluate(t, m).hit, `${t.id}: "${m}" chạm nhiều ý`).toEqual([p.id]);
        }
      }
    }
  });
});

describe("nội dung ba đề", () => {
  it("đề nào cũng có người nghe cụ thể và câu hỏi thật", () => {
    // Người nghe tưởng tượng đổi thì cả bài giảng đổi. "Giải thích khái niệm
    // X" không phải một đề bài giảng lại, nó là một đề thi.
    for (const t of TOPICS) {
      expect(t.audience.length, t.id).toBeGreaterThan(15);
      expect(t.prompt, t.id).toContain("?");
      expect(t.points.length, t.id).toBeGreaterThanOrEqual(4);
    }
  });

  it("không trùng id, cả ở đề lẫn ở ý", () => {
    expect(new Set(TOPICS.map((t) => t.id)).size).toBe(TOPICS.length);
    for (const t of TOPICS) {
      expect(new Set(t.points.map((p) => p.id)).size, t.id).toBe(t.points.length);
    }
  });
});

describe("điểm không rò sang chỗ khác", () => {
  it("kết quả không mang theo số điểm nào", () => {
    // Bài canh có chủ ý: cách chấm này lỏng, và AGENTS.md nói rõ điểm quiz là
    // số chịu tải cho avg_quiz_score, cổng mở khoá và phần trăm năng lực. Ngày
    // nào đó có người thêm `score` vào đây rồi ghi nó vào hồ sơ, bài này đỏ
    // trước.
    const r = evaluate(TOPICS[0], "khấu hao là chi phí không chi tiền mặt");
    expect(Object.keys(r).sort()).toEqual(["hit", "missed", "tooShort", "words"]);
  });
});
