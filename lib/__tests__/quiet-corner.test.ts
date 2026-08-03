import { describe, expect, it } from "vitest";
import {
  BREATH_CYCLES,
  BREATH_CYCLE_SECONDS,
  BREATH_PHASES,
  QUIET_CORNER_LIMITS,
  WORRY_REFRAMES,
} from "../quiet-corner";

describe("nhip tho", () => {
  it("la nhip hop 4-4-4-4, mot vong 16 giay", () => {
    expect(BREATH_PHASES.map((p) => p.seconds)).toEqual([4, 4, 4, 4]);
    expect(BREATH_CYCLE_SECONDS).toBe(16);
  });

  it("ca bai tho nam trong khoang mot phut, khong keo dai thanh nhiem vu", () => {
    const total = BREATH_CYCLE_SECONDS * BREATH_CYCLES;
    expect(total).toBeGreaterThanOrEqual(45);
    expect(total).toBeLessThanOrEqual(120);
  });

  it("vong tron phinh ra khi hit vao va co lai khi tho ra", () => {
    const [inhale, , exhale] = BREATH_PHASES;
    expect(inhale.scale).toBeGreaterThan(exhale.scale);
  });
});

describe("goc nhin cho noi lo tien bac", () => {
  it("khong trung id", () => {
    expect(new Set(WORRY_REFRAMES.map((w) => w.id)).size).toBe(WORRY_REFRAMES.length);
  });

  it("moi noi lo deu co goc nhin du dai de noi duoc mot y", () => {
    for (const item of WORRY_REFRAMES) {
      expect(item.worry.length).toBeGreaterThan(15);
      expect(item.reframe.length).toBeGreaterThan(60);
    }
  });

  // Trang này không được phép trượt thành tư vấn đầu tư - đó là ranh giới đã
  // ghi trong lib/quiet-corner.ts, nên khoá lại bằng test thay vì bằng lời hứa.
  it("khong goc nhin nao ra chi dan mua ban cu the", () => {
    const directives = [
      "bạn nên mua",
      "hãy mua",
      "nên bán",
      "hãy bán",
      "nên đầu tư vào",
      "cổ phiếu nên",
      "đảm bảo lợi nhuận",
      "chắc chắn sinh lời",
    ];
    for (const item of WORRY_REFRAMES) {
      const text = item.reframe.toLowerCase();
      for (const phrase of directives) {
        expect(text).not.toContain(phrase);
      }
    }
  });
});

describe("ranh gioi cua trang", () => {
  it("noi ro day khong phai tri lieu va co huong dan tim tro giup", () => {
    const body = QUIET_CORNER_LIMITS.body.toLowerCase();
    expect(body).toContain("không phải tư vấn tâm lý");
    expect(body).toContain("chuyên gia");
  });

  // Một số hotline sai hoặc đã ngừng hoạt động còn tệ hơn không có số nào.
  it("khong in so dien thoai nao chua duoc kiem chung", () => {
    expect(QUIET_CORNER_LIMITS.body).not.toMatch(/\d{4,}/);
  });
});
