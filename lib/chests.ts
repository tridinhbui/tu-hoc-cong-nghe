import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return true;
  const isDbMissing = error.code === "PGRST205" || error.code === "42P01" || error.code === "PGRST202";
  const isNetworkOrConnection = 
    error.message?.includes("Failed to fetch") || 
    error.message?.includes("fetch failed") || 
    error.message?.includes("TypeError") ||
    (!error.code && !error.message);
  return isDbMissing || isNetworkOrConnection;
}

export type ChestSource = "weekly_quest" | "milestone_exam" | "daily_login" | "shop_purchase" | "study_group";
export type ChestRewardType = "title" | "xp" | "theme";

export interface ChestReward {
  type: ChestRewardType;
  value: string;
  desc: string;
  xp: number; // 0 for non-xp rewards
}

// Đây là bản DUY NHẤT của các chuỗi danh hiệu và giao diện. Trước đây
// lib/shop.ts giữ một bản sao thứ hai để dựng catalog cửa hàng "từ đúng những
// chuỗi này", nhưng không tệp nào import lib/shop.ts, và cửa hàng thật
// (CosmeticStore) dựng catalog riêng từ `t.cosmeticStore.items`. Bản sao ấy đã
// bị xoá - nếu sau này có giao diện mua bằng XP, hãy tra `chestDescriptions`
// như CombinedRewardsWidget đang làm, đừng chép chuỗi ra lần nữa.
/* i18n-ignore-start: `value` và `desc` đã có lớp phủ trong
   lib/i18n/dictionaries/sections/lib-strings.ts (`chestTitles`,
   `chestDescriptions`), và CombinedRewardsWidget tra qua đó ở modal mở rương.
   Khoá của hai bảng ấy CHÍNH LÀ chuỗi tiếng Việt ở đây, vì `value` được ghi
   xuống cột `reward_value` của bảng `user_chests` - dịch nó tại chỗ sẽ làm mồ
   côi danh hiệu người chơi đã mở được. */
export const CHEST_REWARDS: ChestReward[] = [
  { type: "title", value: "Chiến thần tích lũy", desc: "Danh hiệu tôn vinh kỷ luật tích sản", xp: 0 },
  { type: "title", value: "Kẻ hủy diệt nợ nần", desc: "Danh hiệu dành cho người làm chủ tài chính", xp: 0 },
  { type: "title", value: "Sói già phố Wall", desc: "Danh hiệu của bậc thầy phân tích thị trường", xp: 0 },
  { type: "title", value: "Đại gia lãi kép", desc: "Danh hiệu dành cho tín đồ dòng tiền dài hạn", xp: 0 },
  { type: "title", value: "Bậc thầy định giá", desc: "Danh hiệu của chuyên gia đọc báo cáo tài chính", xp: 0 },
  { type: "xp", value: "10", desc: "Cộng nhẹ +10 XP vào tổng điểm tích lũy", xp: 10 },
  { type: "xp", value: "15", desc: "Cộng nhẹ +15 XP vào tổng điểm tích lũy", xp: 15 },
  { type: "theme", value: "gold", desc: "Mở khóa Giao diện Hoàng Kim quý tộc", xp: 0 },
  { type: "theme", value: "emerald", desc: "Mở khóa Giao diện Ngọc Lục Bảo đặc biệt", xp: 0 },
];/* i18n-ignore-end */


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
 *  here shouldn't block the toast/XP the triggering action already granted).
 *  Returns whether the insert actually succeeded - callers that gate a
 *  "don't show this again today" check on the row existing (like
 *  claimDailyLoginChest below) need to know, otherwise a silently failed
 *  insert (e.g. a source value the DB check constraint doesn't allow yet)
 *  looks identical to success and the caller re-fires every time. */
export async function earnChest(userId: string, source: ChestSource, count = 1): Promise<boolean> {
  const supabase = createClient();
  const rows = Array.from({ length: count }, () => ({ user_id: userId, source }));
  const { error } = await supabase.from("user_chests").insert(rows);
  if (error) {
    if (!isMissingTableError(error)) console.error("Error earning chest:", error);
    return false;
  }
  return true;
}

/**
 * Grants one chest for today's first login, if one hasn't already been
 * granted today - checked against user_chests directly (source +
 * earned_at date) rather than a separate tracking column, so there's one
 * source of truth for "did they already get today's chest". Called once
 * per session from AppNavbar (mounts once, persists across client-side
 * navigation), not tied to lesson completion like the streak - opening the
 * app is the whole signal here.
 */
export async function claimDailyLoginChest(userId: string): Promise<boolean> {
  const supabase = createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data: existing, error: checkError } = await supabase
    .from("user_chests")
    .select("id")
    .eq("user_id", userId)
    .eq("source", "daily_login")
    .gte("earned_at", todayStart.toISOString())
    .limit(1)
    .maybeSingle();

  if (checkError) {
    if (isMissingTableError(checkError)) return false;
    console.error("Error checking daily login chest:", checkError);
    return false;
  }
  if (existing) return false; // already claimed today

  return earnChest(userId, "daily_login", 1);
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
