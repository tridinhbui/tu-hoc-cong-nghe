import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export type ChestSource = "weekly_quest" | "milestone_exam";
export type ChestRewardType = "title" | "xp" | "theme";

export interface ChestReward {
  type: ChestRewardType;
  value: string;
  desc: string;
  xp: number; // 0 for non-xp rewards
}

const CHEST_REWARDS: ChestReward[] = [
  { type: "title", value: "Chiến thần tích lũy", desc: "Danh hiệu tôn vinh kỷ luật tích sản", xp: 0 },
  { type: "title", value: "Kẻ hủy diệt nợ nần", desc: "Danh hiệu dành cho người làm chủ tài chính", xp: 0 },
  { type: "title", value: "Sói già phố Wall", desc: "Danh hiệu của bậc thầy phân tích thị trường", xp: 0 },
  { type: "title", value: "Đại gia lãi kép", desc: "Danh hiệu dành cho tín đồ dòng tiền dài hạn", xp: 0 },
  { type: "title", value: "Bậc thầy định giá", desc: "Danh hiệu của chuyên gia đọc báo cáo tài chính", xp: 0 },
  { type: "xp", value: "30", desc: "Cộng ngay +30 XP vào tổng điểm tích lũy", xp: 30 },
  { type: "xp", value: "50", desc: "Cộng ngay +50 XP vào tổng điểm tích lũy", xp: 50 },
  { type: "theme", value: "gold", desc: "Mở khóa Giao diện Hoàng Kim quý tộc", xp: 0 },
  { type: "theme", value: "emerald", desc: "Mở khóa Giao diện Ngọc Lục Bảo đặc biệt", xp: 0 },
];

export async function getUnopenedChestCount(userId: string): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from("user_chests")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("opened", false);

  if (error) {
    if (isMissingTableError(error)) return 0;
    throw handleSupabaseError(error);
  }
  return count ?? 0;
}

/** Awards a new unopened chest - called from the two real places a chest is
 *  actually earned: finishing all 3 daily quests for the week's tracker, and
 *  passing a stage milestone exam. Best-effort by design (a failed insert
 *  here shouldn't block the toast/XP the triggering action already granted). */
export async function earnChest(userId: string, source: ChestSource, count = 1): Promise<void> {
  const supabase = createClient();
  const rows = Array.from({ length: count }, () => ({ user_id: userId, source }));
  const { error } = await supabase.from("user_chests").insert(rows);
  if (error && !isMissingTableError(error)) {
    console.error("Error earning chest:", error);
  }
}

export interface OpenChestResult {
  ok: boolean;
  reward?: ChestReward;
}

/** Opens the oldest unopened chest: picks a random reward, then UPDATEs
 *  that specific row `where opened = false` - if another tab/request beat
 *  this one to it, the update matches zero rows and this returns ok:false
 *  instead of silently double-granting a reward. */
export async function openNextChest(userId: string): Promise<OpenChestResult> {
  const supabase = createClient();
  const { data: pending, error: fetchError } = await supabase
    .from("user_chests")
    .select("id")
    .eq("user_id", userId)
    .eq("opened", false)
    .order("earned_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (fetchError || !pending) return { ok: false };

  const reward = CHEST_REWARDS[Math.floor(Math.random() * CHEST_REWARDS.length)];

  const { data: updated, error: updateError } = await supabase
    .from("user_chests")
    .update({
      opened: true,
      opened_at: new Date().toISOString(),
      reward_type: reward.type,
      reward_value: reward.value,
      xp_earned: reward.xp,
    })
    .eq("id", pending.id)
    .eq("opened", false)
    .select("id")
    .maybeSingle();

  if (updateError || !updated) return { ok: false };
  return { ok: true, reward };
}

/** Sum of xp_earned across every opened chest - folded into
 *  recalculateUserStats' total_xp formula the same way quiz/game/referral/
 *  milestone XP already are. */
export async function getTotalChestXp(userId: string): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_chests")
    .select("xp_earned")
    .eq("user_id", userId)
    .eq("opened", true);

  if (error) {
    if (isMissingTableError(error)) return 0;
    throw handleSupabaseError(error);
  }
  return (data ?? []).reduce((sum, row) => sum + (row.xp_earned as number), 0);
}

export interface ChestCosmetics {
  titles: string[];
  themes: string[];
}

/** Titles/themes are cosmetic (no XP/anti-abuse concern), so they're just
 *  derived from the same opened-chest history rather than needing their own
 *  table - still server-persisted and cross-device now, unlike the old
 *  localStorage-only version. */
export async function getUnlockedCosmetics(userId: string): Promise<ChestCosmetics> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_chests")
    .select("reward_type, reward_value")
    .eq("user_id", userId)
    .eq("opened", true)
    .in("reward_type", ["title", "theme"]);

  if (error) {
    if (isMissingTableError(error)) return { titles: [], themes: [] };
    throw handleSupabaseError(error);
  }

  const rows = (data ?? []) as { reward_type: string; reward_value: string }[];
  return {
    titles: Array.from(new Set(rows.filter((r) => r.reward_type === "title").map((r) => r.reward_value))),
    themes: Array.from(new Set(rows.filter((r) => r.reward_type === "theme").map((r) => r.reward_value))),
  };
}
