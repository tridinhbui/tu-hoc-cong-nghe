/** Booster XP phía server. Hệ số đọc từ `user_active_boosters` qua RPC
 *  `get_my_xp_multiplier` (lib/d1/rpc.ts), không bao giờ từ số client gửi.
 *
 *  Áp cho World Boss và Thử thách tuần - hai nguồn XP chấm ở server. Booster
 *  nhân TRƯỚC trần 50/loại game: `getTotalGameXp` kẹp lại ở 50 dù ván ghi bao
 *  nhiêu, nên nhân sau trần là hứa XP không bao giờ vào `total_xp`. Tác dụng
 *  thật của booster vì thế là đưa một ván yếu lên gần trần, không phải vượt nó. */
export interface MultiplierSource {
  rpc(fn: string, args?: Record<string, unknown>): PromiseLike<{ data: unknown; error: unknown }>;
}

export async function getXpMultiplier(client: MultiplierSource): Promise<number> {
  try {
    const { data, error } = await client.rpc("get_my_xp_multiplier", {});
    if (error) return 1;
    const row = (Array.isArray(data) ? data[0] : data) as { multiplier?: number } | null;
    const m = Number(row?.multiplier);
    return Number.isFinite(m) ? Math.min(3, Math.max(1, m)) : 1;
  } catch {
    return 1;
  }
}

export function applyBooster(baseXp: number, multiplier: number): number {
  return Math.floor(Math.max(0, baseXp) * Math.min(3, Math.max(1, multiplier)));
}
