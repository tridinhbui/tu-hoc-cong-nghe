import { describe, expect, it } from "vitest";
import { getStreakMilestoneXp } from "@/lib/levels";

describe("getStreakMilestoneXp", () => {
  it("cộng dồn các mốc đã chạm theo kỷ lục", () => {
    expect(getStreakMilestoneXp(0)).toBe(0);
    expect(getStreakMilestoneXp(2)).toBe(0);
    expect(getStreakMilestoneXp(3)).toBe(5);
    expect(getStreakMilestoneXp(7)).toBe(15);
    expect(getStreakMilestoneXp(14)).toBe(40);
    expect(getStreakMilestoneXp(365)).toBe(90);
  });
});
