import { describe, it, expect } from "vitest";
import { getLevelBadgeKeys, LEVEL_BADGE_DEFINITIONS } from "@/lib/badges";

describe("getLevelBadgeKeys", () => {
  it("returns no badges below level 2 (level 1 is the default starting point)", () => {
    expect(getLevelBadgeKeys(1)).toEqual([]);
  });

  it("returns exactly the level_2 badge at level 2", () => {
    expect(getLevelBadgeKeys(2)).toEqual(["level_2"]);
  });

  it("returns every earned badge up to and including the current level", () => {
    expect(getLevelBadgeKeys(4)).toEqual(["level_2", "level_3", "level_4"]);
  });

  it("keeps awarding past level 6 - every level on the scale has a badge", () => {
    // Ca này từng khẳng định cấp 9 chỉ nhận tới level_6, vì LEVEL_BADGE_DEFINITIONS
    // dừng ở đó trong khi lib/levels.ts có 15 cấp. Đó không phải một giới hạn có
    // chủ ý, nó là chỗ thiếu: người học qua cấp 6 thì số huy hiệu đứng yên mãi
    // mãi, và một người dùng đã báo lại đúng như vậy. Nay mọi cấp 2-15 đều có
    // mục, nên ca này giữ nguyên ý định cũ - không lỗi, không trả khoá thiếu
    // định nghĩa - nhưng ở đúng thang thật.
    const keys = getLevelBadgeKeys(9);
    expect(keys).toEqual([
      "level_2", "level_3", "level_4", "level_5",
      "level_6", "level_7", "level_8", "level_9",
    ]);
    for (const key of keys) {
      expect(LEVEL_BADGE_DEFINITIONS[key]).toBeDefined();
    }
  });

  it("awards all 14 badges at the top of the scale, and does not invent more above it", () => {
    // 15 cấp, huy hiệu bắt đầu từ cấp 2 => 14 huy hiệu là trần THẬT.
    const atMax = getLevelBadgeKeys(15);
    expect(atMax).toHaveLength(14);
    expect(atMax[atMax.length - 1]).toBe("level_15");

    // Trên trần vẫn phải im lặng trả về đúng bấy nhiêu: getLevelBadgeKeys lọc
    // theo LEVELS nên không có cấp 99 để bịa ra khoá, nhưng đó là thứ ca này
    // phải giữ, không phải thứ để suy luận.
    const aboveMax = getLevelBadgeKeys(99);
    expect(aboveMax).toEqual(atMax);
    for (const key of aboveMax) {
      expect(LEVEL_BADGE_DEFINITIONS[key]).toBeDefined();
    }
  });

  it("returns keys in ascending level order", () => {
    const keys = getLevelBadgeKeys(5);
    expect(keys).toEqual(["level_2", "level_3", "level_4", "level_5"]);
  });
});
