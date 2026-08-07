import { describe, expect, it } from "vitest";
import {
  BONDS,
  STOCKS,
  minVarianceWeight,
  mix,
  rhoCasesOf,
  verdictFor,
} from "@/lib/portfolio-risk";
import { vi } from "@/lib/i18n/dictionaries/vi";

const FAKE_T = vi;
const RHO_CASES = rhoCasesOf(FAKE_T);

/** Mọi con số phòng rủi ro nói ra đều bị kiểm ở đây.
 *
 *  Cùng lý do với lib/__tests__/cash-cycle.test.ts: một con số nằm trong câu
 *  văn tiếng Việt là con số không ai kiểm lại. Đêm nay đã có 452 (thật ra là
 *  453) và ba slug bảo tàng dẫn tới 404 lọt qua đúng theo đường đó. */

describe("rủi ro danh mục hai tài sản", () => {
  it("lợi nhuận LUÔN đúng bằng trung bình có trọng số, ở mọi mức tương quan", () => {
    // Vế bất đối xứng: lợi nhuận cộng thẳng, rủi ro thì không. Nếu chỗ này
    // hỏng thì cả bài học của căn phòng hỏng theo.
    for (const rho of [-1, -0.5, 0, 0.3, 1]) {
      expect(mix(STOCKS, BONDS, { w: 0.6, rho }).ret).toBeCloseTo(0.6 * 0.12 + 0.4 * 0.05, 12);
    }
  });

  it("tương quan bằng 1 là trường hợp DUY NHẤT không cho gì", () => {
    const r = mix(STOCKS, BONDS, { w: 0.5, rho: 1 });
    expect(r.vol).toBeCloseTo(r.naiveVol, 12);
    expect(r.diversificationGain).toBeCloseTo(0, 12);
  });

  it("dưới 1 thì rủi ro luôn nằm DƯỚI trung bình có trọng số", () => {
    for (const rho of [-1, -0.5, 0, 0.5, 0.99]) {
      const r = mix(STOCKS, BONDS, { w: 0.5, rho });
      expect(r.vol, `rho=${rho}`).toBeLessThan(r.naiveVol);
      expect(r.diversificationGain, `rho=${rho}`).toBeGreaterThan(0);
    }
  });

  it("tương quan càng thấp thì cho càng nhiều", () => {
    const gains = [1, 0.5, 0, -0.5, -1].map(
      (rho) => mix(STOCKS, BONDS, { w: 0.5, rho }).diversificationGain
    );
    for (let i = 1; i < gains.length; i++) {
      expect(gains[i]).toBeGreaterThan(gains[i - 1]);
    }
  });

  it("dồn hết vào một tài sản thì danh mục chính là tài sản đó", () => {
    expect(mix(STOCKS, BONDS, { w: 1, rho: 0.3 }).vol).toBeCloseTo(STOCKS.vol, 12);
    expect(mix(STOCKS, BONDS, { w: 0, rho: 0.3 }).vol).toBeCloseTo(BONDS.vol, 12);
  });

  it("tương quan −1 với tỉ trọng đúng thì triệt tiêu hết dao động", () => {
    // Kết quả trên lý thuyết, không phải lời khuyên: nó ở đây vì nếu công thức
    // bị gõ sai một dấu thì bài này là bài đỏ sớm nhất.
    const w = minVarianceWeight(STOCKS, BONDS, -1);
    expect(mix(STOCKS, BONDS, { w, rho: -1 }).vol).toBeCloseTo(0, 10);
  });
});

describe("tỉ trọng ít dao động nhất", () => {
  it("thật sự là điểm thấp nhất, không phải một con số đoán", () => {
    const rho = 0.2;
    const w = minVarianceWeight(STOCKS, BONDS, rho);
    const best = mix(STOCKS, BONDS, { w, rho }).vol;
    // Dò 101 điểm: nếu công thức đóng sai thì sẽ có điểm thấp hơn.
    for (let i = 0; i <= 100; i++) {
      expect(mix(STOCKS, BONDS, { w: i / 100, rho }).vol).toBeGreaterThanOrEqual(best - 1e-12);
    }
  });

  it("không bao giờ đề xuất bán khống", () => {
    // Kẹp về [0,1] có chủ ý: w âm nghĩa là bán khống, và một căn phòng dạy
    // người mới không nên lặng lẽ đề xuất điều đó.
    for (const rho of [-1, -0.9, 0, 0.9, 1]) {
      const w = minVarianceWeight(STOCKS, BONDS, rho);
      expect(w, `rho=${rho}`).toBeGreaterThanOrEqual(0);
      expect(w, `rho=${rho}`).toBeLessThanOrEqual(1);
    }
  });
});

describe("bốn mức tương quan bày ra", () => {
  it("xếp từ cho nhiều nhất tới không cho gì", () => {
    const rhos = RHO_CASES.map((c) => c.rho);
    expect([...rhos].sort((a, b) => a - b)).toEqual(rhos);
  });

  it("có đúng một trường hợp không cho gì, và nó là ρ = 1", () => {
    const zero = RHO_CASES.filter(
      (c) => mix(STOCKS, BONDS, { w: 0.5, rho: c.rho }).diversificationGain < 1e-12
    );
    expect(zero.map((c) => c.rho)).toEqual([1]);
  });

  it("câu chốt đổi giọng đúng ở ρ = 1", () => {
    expect(verdictFor(1, FAKE_T)).toContain("không cho gì");
    expect(verdictFor(0.99, FAKE_T)).toContain("DƯỚI");
  });

  it("mức nào cũng hỏi trước khi trả lời, và giải thích đủ dài", () => {
    for (const c of RHO_CASES) {
      expect(c.question.trim().endsWith("?"), c.id).toBe(true);
      expect(c.meaning.length, c.id).toBeGreaterThan(60);
    }
  });
});
