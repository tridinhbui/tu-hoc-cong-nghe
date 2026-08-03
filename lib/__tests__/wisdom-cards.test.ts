import { describe, expect, it } from "vitest";
import {
  WISDOM_CARDS,
  WISDOM_TONE_CARDS,
  getRandomWisdomCard,
  getWisdomCardForScore,
  selectWisdomTone,
} from "../wisdom-cards";

describe("selectWisdomTone", () => {
  it("diem tuyet doi thi an mung", () => {
    expect(selectWisdomTone(10, 10)).toBe("celebrate");
    expect(selectWisdomTone(1, 1)).toBe("celebrate");
  });

  it("duoi 70% thi chuyen sang giong dong vien", () => {
    expect(selectWisdomTone(6, 10)).toBe("encourage");
    expect(selectWisdomTone(0, 5)).toBe("encourage");
  });

  it("tu 70% den gan tuyet doi thi giu giong thuong", () => {
    expect(selectWisdomTone(7, 10)).toBe("steady");
    expect(selectWisdomTone(9, 10)).toBe("steady");
  });

  it("khong co cau hoi nao thi giu giong thuong, khong chia cho 0", () => {
    expect(selectWisdomTone(0, 0)).toBe("steady");
  });
});

describe("getWisdomCardForScore", () => {
  it("luon tra ve the dung giong", () => {
    const cases = [
      { score: 10, total: 10, tone: "celebrate" },
      { score: 3, total: 10, tone: "encourage" },
      { score: 8, total: 10, tone: "steady" },
      { score: 0, total: 0, tone: "steady" },
    ] as const;

    for (const { score, total, tone } of cases) {
      // Random pick - chạy nhiều lần để không lọt thẻ sai giọng trong pool.
      for (let i = 0; i < 60; i++) {
        const card = getWisdomCardForScore(score, total);
        expect(card.tone ?? "steady").toBe(tone);
        expect(card.text.length).toBeGreaterThan(0);
      }
    }
  });

  it("giong steady van lay tu pool 45 the goc", () => {
    const steadyIds = new Set(WISDOM_CARDS.map((c) => c.id));
    for (let i = 0; i < 60; i++) {
      expect(steadyIds.has(getWisdomCardForScore(8, 10).id)).toBe(true);
    }
  });
});

describe("pool", () => {
  it("khong trung id giua hai pool", () => {
    const all = [...WISDOM_CARDS, ...WISDOM_TONE_CARDS];
    expect(new Set(all.map((c) => c.id)).size).toBe(all.length);
  });

  it("moi giong co it nhat 5 the", () => {
    for (const tone of ["celebrate", "encourage"] as const) {
      expect(WISDOM_TONE_CARDS.filter((c) => c.tone === tone).length).toBeGreaterThanOrEqual(5);
    }
  });

  it("getRandomWisdomCard giu nguyen hanh vi cu", () => {
    const ids = new Set(WISDOM_CARDS.map((c) => c.id));
    for (let i = 0; i < 60; i++) {
      expect(ids.has(getRandomWisdomCard().id)).toBe(true);
    }
  });
});
