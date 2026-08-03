import { createClient } from "@/lib/supabase";
import { wearableGear, type CharacterEquipments } from "@/lib/rpg-items";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Đồ đang trang bị của một người, đọc từ bảng user_equipments.
 *
 *  Cùng bảng mà bản đồ game 2D đang đọc, nên cởi mũ ở /game là nhân vật trong
 *  thế giới 3D cũng bỏ mũ. Nếu để thế giới 3D có kho trang bị riêng thì người
 *  học sẽ mặc hai bộ đồ khác nhau ở hai nơi và không biết cái nào là thật.
 *
 *  Lọc qua wearableGear ngay tại đây: booster và khung chat không có hình khối
 *  nào để đeo, và trả chúng ra ngoài chỉ tạo cơ hội cho phần vẽ tự bịa hình. */
export async function getEquippedGear(
  userId: string,
  client?: SupabaseClient
): Promise<CharacterEquipments> {
  const supabase = client ?? createClient();
  const { data, error } = await supabase
    .from("user_equipments")
    .select("slot, asset_key")
    .eq("user_id", userId);
  // Chưa từng mua gì thì bảng không có dòng nào - đó là trạng thái bình
  // thường, không phải lỗi; và một lỗi đọc trang bị cũng không được chặn người
  // học vào phòng.
  if (error || !data) return {};
  const gear: CharacterEquipments = {};
  for (const row of data as Array<{ slot: string; asset_key: string }>) {
    gear[row.slot as keyof CharacterEquipments] = row.asset_key;
  }
  return wearableGear(gear);
}
