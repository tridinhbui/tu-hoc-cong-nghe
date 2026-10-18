import { describe, expect, it, vi } from "vitest";

/**
 * D1: user_streaks.id là TEXT NOT NULL không có mặc định
 * (migrations-d1/0001_schema.sql). Insert thiếu id ném
 * "NOT NULL constraint failed: user_streaks.id" ngay lần hoàn thành bài đầu
 * tiên của một tài khoản mới.
 */
const inserted: Record<string, unknown>[] = [];

vi.mock("@/lib/cloudflare", () => {
  const chain = (result: unknown) => {
    const q: Record<string, unknown> = {};
    for (const m of ["select", "eq"]) q[m] = () => q;
    q.single = async () => result;
    return q;
  };
  return {
    createClient: () => ({
      from: () => ({
        select: () => chain({ data: null, error: { code: "PGRST116" } }),
        insert: (rows: Record<string, unknown>[]) => {
          inserted.push(...rows);
          return chain({ data: rows[0], error: null });
        },
      }),
    }),
  };
});

const { updateStreak } = await import("@/lib/cloudflare-streak");

describe("updateStreak - streak đầu tiên", () => {
  it("tự sinh id cho hàng user_streaks mới", async () => {
    await updateStreak("u-1");
    expect(inserted).toHaveLength(1);
    expect(inserted[0].id).toEqual(expect.any(String));
    expect((inserted[0].id as string).length).toBeGreaterThan(0);
    expect(inserted[0].user_id).toBe("u-1");
  });
});
