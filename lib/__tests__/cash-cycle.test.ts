import { describe, expect, it } from "vitest";
import { cycle, scenariosOf, verdict } from "@/lib/cash-cycle";
import { vi } from "@/lib/i18n/dictionaries/vi";

const SCENARIOS = scenariosOf(vi);

/** Mọi con số căn phòng vòng quay tiền nói ra đều bị kiểm ở đây.
 *
 *  Lý do có bài này giống hệt lý do lib/three-statement-model.ts có bài của
 *  nó: đêm nay đã hai lần một câu chữ trong cảnh 3D nói một con số mà không ai
 *  tính lại (452 thay vì 453, và ba slug bảo tàng dẫn tới 404). Con số nằm
 *  trong câu văn tiếng Việt là con số không ai kiểm - trừ khi có bài như thế
 *  này. */

describe("vòng quay tiền", () => {
  it("cộng đúng ba vế", () => {
    const r = cycle({ dso: 45, dio: 60, dpo: 40 });
    expect(r.operatingCycle).toBe(105);
    expect(r.ccc).toBe(65);
  });

  it("đổi ngày ra tiền theo doanh thu ngày", () => {
    expect(cycle({ dso: 30, dio: 0, dpo: 0 }, 200).workingCapitalNeed).toBe(6000);
  });

  it("vòng quay âm nghĩa là được khách tài trợ, không phải sai số", () => {
    // Bài 178 trong kho bài học nói vốn lưu động âm là ĐIỂM MẠNH của bán lẻ và
    // thuê bao. Nếu chỗ này đổi ý thì hai bài dạy ngược nhau.
    expect(verdict(cycle({ dso: 2, dio: 25, dpo: 55 }).ccc)).toBe("duoc-tai-tro");
    expect(verdict(0)).toBe("trung-tinh");
    expect(verdict(1)).toBe("can-von");
  });

  it("nhu cầu vốn âm khi vòng quay âm - tiền chảy VỀ chứ không đi ra", () => {
    expect(cycle({ dso: 0, dio: 0, dpo: 30 }, 100).workingCapitalNeed).toBe(-3000);
  });
});

describe("bốn mô hình mẫu", () => {
  it("mỗi con số nêu trong câu chốt đúng bằng số tính ra", () => {
    // Đây là bài duy nhất bắt được lỗi "câu văn nói một đằng, phép tính ra một
    // nẻo" - loại lỗi đã xảy ra thật với con số 452/453.
    const expected: Record<string, number> = {
      "xay-dung": 105,
      "san-xuat": 65,
      "ban-le": -28,
      "thue-bao": -30,
    };
    for (const s of SCENARIOS) {
      expect(cycle(s.inputs).ccc, s.id).toBe(expected[s.id]);
      const digits = Math.abs(expected[s.id]).toString();
      expect(s.punchline, `${s.id}: câu chốt không nhắc con số`).toContain(digits);
    }
  });

  it("có cả mô hình dương và mô hình âm", () => {
    // Bốn kịch bản cùng dấu thì căn phòng chỉ dạy được "ngắn thì tốt" - đúng
    // cái hiểu sai nó sinh ra để sửa.
    const signs = new Set(SCENARIOS.map((s) => Math.sign(cycle(s.inputs).ccc)));
    expect(signs.has(1)).toBe(true);
    expect(signs.has(-1)).toBe(true);
  });

  it("mô hình nào cũng hỏi trước khi trả lời", () => {
    for (const s of SCENARIOS) {
      expect(s.question.trim().endsWith("?"), s.id).toBe(true);
      expect(s.why.length, s.id).toBeGreaterThan(40);
    }
  });

  it("không có hai mô hình trùng id", () => {
    expect(new Set(SCENARIOS.map((s) => s.id)).size).toBe(SCENARIOS.length);
  });
});
