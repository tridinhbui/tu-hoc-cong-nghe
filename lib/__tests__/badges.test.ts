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

  it("stops at level_6, the highest defined level badge, even at max user level", () => {
    // LEVEL_BADGE_DEFINITIONS only goes up to level_6 - levels 7-9 don't
    // have their own badge, so asking for a very high level shouldn't error
    // or return keys that don't exist in the definitions.
    const keys = getLevelBadgeKeys(9);
    expect(keys).toEqual(["level_2", "level_3", "level_4", "level_5", "level_6"]);
    for (const key of keys) {
      expect(LEVEL_BADGE_DEFINITIONS[key]).toBeDefined();
    }
  });

  it("returns keys in ascending level order", () => {
    const keys = getLevelBadgeKeys(5);
    expect(keys).toEqual(["level_2", "level_3", "level_4", "level_5"]);
  });
});
