import { describe, expect, it } from "vitest";
import {
  BOSS_QUESTION_COUNT,
  DAMAGE_PER_CORRECT,
  bossDamageFor,
  bossHpPercent,
} from "../world-boss";

describe("bossDamageFor", () => {
  it("mỗi câu đúng một lượng sát thương cố định", () => {
    expect(bossDamageFor(1)).toBe(DAMAGE_PER_CORRECT);
    expect(bossDamageFor(15)).toBe(15 * DAMAGE_PER_CORRECT);
  });

  it("trả lời sai hết thì không gây sát thương", () => {
    expect(bossDamageFor(0)).toBe(0);
  });

  it("điểm vượt số câu bị cắt về trần - client gửi 999 không phá được boss", () => {
    expect(bossDamageFor(999)).toBe(BOSS_QUESTION_COUNT * DAMAGE_PER_CORRECT);
  });

  it("điểm âm hoặc rác bị coi là 0 chứ không thành sát thương âm", () => {
    expect(bossDamageFor(-5)).toBe(0);
    expect(bossDamageFor(Number.NaN)).toBe(0);
    expect(bossDamageFor("abc" as unknown as number)).toBe(0);
  });

  it("một trận hoàn hảo không tự nó hạ nổi boss một triệu máu", () => {
    // Nếu một người chơi hạ được cả boss trong một trận thì "cả server cùng
    // đánh" không còn nghĩa gì. Giữ tỷ lệ này dưới 10%.
    expect(bossDamageFor(BOSS_QUESTION_COUNT)).toBeLessThan(100_000);
  });
});

describe("bossHpPercent", () => {
  it("khớp con số đang hiện trên thanh máu", () => {
    expect(bossHpPercent(745_000, 1_000_000)).toBe(75);
  });

  it("hết máu là 0, đầy máu là 100", () => {
    expect(bossHpPercent(0, 1_000_000)).toBe(0);
    expect(bossHpPercent(1_000_000, 1_000_000)).toBe(100);
  });

  it("không bao giờ vượt khỏi khoảng 0-100 dù dữ liệu hỏng", () => {
    expect(bossHpPercent(2_000_000, 1_000_000)).toBe(100);
    expect(bossHpPercent(-50, 1_000_000)).toBe(0);
  });

  it("máu tối đa bằng 0 thì trả 0 thay vì chia cho 0", () => {
    expect(bossHpPercent(10, 0)).toBe(0);
    expect(Number.isNaN(bossHpPercent(10, 0))).toBe(false);
  });
});
