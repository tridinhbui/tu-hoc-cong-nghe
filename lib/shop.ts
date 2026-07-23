import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

export type ShopItemType = "title" | "theme";

export interface ShopItem {
  id: string; // must match a case value in the purchase_shop_item() SQL function
  type: ShopItemType;
  value: string; // must exactly match the corresponding CHEST_REWARDS[i].value
  desc: string;
  priceXp: number;
  emoji: string;
}

// Catalog is a static array (same "hardcoded content array" pattern as
// CHEST_REWARDS in lib/chests.ts) - reuses the exact same title/theme
// strings so an item "means" the same thing whether won from a chest or
// bought here. Item ids and prices must stay in sync by hand with the
// case block in supabase/migrations/20260805_shop_purchases.sql.
export const SHOP_ITEMS: ShopItem[] = [
  { id: "title-chien-than", type: "title", value: "Chiến thần tích lũy", desc: "Danh hiệu tôn vinh kỷ luật tích sản", priceXp: 150, emoji: "🏆" },
  { id: "title-huy-diet-no", type: "title", value: "Kẻ hủy diệt nợ nần", desc: "Danh hiệu dành cho người làm chủ tài chính", priceXp: 150, emoji: "⚔️" },
  { id: "title-soi-gia", type: "title", value: "Sói già phố Wall", desc: "Danh hiệu của bậc thầy phân tích thị trường", priceXp: 200, emoji: "🐺" },
  { id: "title-dai-gia-lai-kep", type: "title", value: "Đại gia lãi kép", desc: "Danh hiệu dành cho tín đồ dòng tiền dài hạn", priceXp: 200, emoji: "📈" },
  { id: "title-bac-thay-dinh-gia", type: "title", value: "Bậc thầy định giá", desc: "Danh hiệu của chuyên gia đọc báo cáo tài chính", priceXp: 250, emoji: "🎯" },
  { id: "theme-gold", type: "theme", value: "gold", desc: "Mở khóa Giao diện Hoàng Kim quý tộc", priceXp: 400, emoji: "👑" },
  { id: "theme-emerald", type: "theme", value: "emerald", desc: "Mở khóa Giao diện Ngọc Lục Bảo đặc biệt", priceXp: 400, emoji: "💎" },
];

/** Available XP balance = total_xp minus xp_spent (streak restores, shop
 *  purchases, etc) - never the raw total_xp shown elsewhere in the app. */
export async function getAvailableXp(userId: string): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_stats")
    .select("total_xp, xp_spent")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw handleSupabaseError(error);
  return (data?.total_xp ?? 0) - (data?.xp_spent ?? 0);
}

export interface PurchaseResult {
  ok: boolean;
  error?: string;
}

/** auth.uid()-bound server-side RPC - itemId is the only client input, and
 *  the function validates price/ownership/balance against its own hardcoded
 *  catalog, not anything the client sends. See migration
 *  20260805_shop_purchases.sql for the actual logic. */
export async function purchaseShopItem(itemId: string): Promise<PurchaseResult> {
  const supabase = createClient();
  const { error } = await supabase.rpc("purchase_shop_item", { p_item_id: itemId });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
