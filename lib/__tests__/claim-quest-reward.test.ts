import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Bug this guards against, reported by a learner: "Hôm nay mình làm nhiệm vụ
// hàng ngày ko có XP" (did the daily quest, no XP showed up). Root cause:
// claimQuestReward() returned a plain boolean, discarding the server's real
// `xpEarned` (which WEEKLY_QUEST_XP_CAP in lib/quest-rewards.ts can clamp
// below the quest's nominal reward, even to 0, once the week's budget is
// spent). Every caller then showed the quest's NOMINAL reward in its toast
// regardless of what actually got banked - so a learner who'd already used
// up the week's quest XP still saw "+10 XP" while their real total never
// moved.

vi.mock("./supabase", () => ({ createClient: () => ({}) }));
vi.mock("./supabase-user", () => ({ recalculateUserStats: vi.fn().mockResolvedValue(undefined) }));

// jsdom isn't a project dependency (vitest.config.ts runs environment:
// "node"), so localStorage - needed by the missing-table fallback path -
// is stubbed the same way lib/__tests__/supabase-flashcards.test.ts does.
class MemoryStorage {
  private store = new Map<string, string>();
  getItem(k: string) { return this.store.has(k) ? this.store.get(k)! : null; }
  setItem(k: string, v: string) { this.store.set(k, String(v)); }
  removeItem(k: string) { this.store.delete(k); }
  clear() { this.store.clear(); }
}
const localStorage = new MemoryStorage();
(globalThis as Record<string, unknown>).localStorage = localStorage;
(globalThis as Record<string, unknown>).window = { localStorage };

const USER = "user-1";

function mockFetchOnce(status: number, body: unknown) {
  (globalThis as Record<string, unknown>).fetch = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  });
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});

async function claimQuestReward(...args: Parameters<typeof import("../supabase-quests").claimQuestReward>) {
  const mod = await import("@/lib/supabase-quests");
  return mod.claimQuestReward(...args);
}

describe("claimQuestReward surfaces the server's real xpEarned", () => {
  it("returns the full nominal reward when the weekly cap isn't hit", async () => {
    mockFetchOnce(200, { claimed: true, xpEarned: 10 });
    const result = await claimQuestReward(USER, "daily_1", "2026-07-30");
    expect(result).toEqual({ claimed: true, xpEarned: 10 });
  });

  it("returns xpEarned: 0 when the weekly quest XP cap is already spent - this is the reported bug", async () => {
    // The route still writes the row (so the quest reads as claimed and
    // can't be retried tomorrow morning for a second payout), but the
    // amount is clamped to whatever's left in the weekly budget.
    mockFetchOnce(200, { claimed: true, xpEarned: 0 });
    const result = await claimQuestReward(USER, "daily_1", "2026-07-30");
    expect(result).toEqual({ claimed: true, xpEarned: 0 });
  });

  it("returns a partial amount when only part of the weekly budget is left", async () => {
    mockFetchOnce(200, { claimed: true, xpEarned: 3 });
    const result = await claimQuestReward(USER, "daily_3", "2026-07-30");
    expect(result.xpEarned).toBe(3);
  });

  it("returns claimed: false, xpEarned: 0 when the quest was already claimed today", async () => {
    mockFetchOnce(200, { claimed: false, xpEarned: 0 });
    const result = await claimQuestReward(USER, "daily_1", "2026-07-30");
    expect(result).toEqual({ claimed: false, xpEarned: 0 });
  });

  it("returns claimed: false on a genuine server error", async () => {
    mockFetchOnce(500, { error: "boom", code: "XX000" });
    const result = await claimQuestReward(USER, "daily_1", "2026-07-30");
    expect(result).toEqual({ claimed: false, xpEarned: 0 });
  });

  it("falls back to the nominal reward via localStorage when the table is missing", async () => {
    mockFetchOnce(500, { error: "relation does not exist", code: "42P01" });
    const result = await claimQuestReward(USER, "daily_1", "2026-07-30");
    expect(result.claimed).toBe(true);
    expect(result.xpEarned).toBe(10); // QUEST_XP_REWARDS.daily_1
    expect(localStorage.getItem(`quests_claimed_${USER}_2026-07-30`)).toContain("daily_1");
  });
});
