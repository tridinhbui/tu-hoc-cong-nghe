/** Vốn từ vựng vật phẩm RPG: khoá món đồ, tên, ô trang bị, biểu tượng.
 *
 *  Tách khỏi FinanceCharacterAvatar để thế giới 3D dựng được đồ đeo từ ĐÚNG
 *  danh sách này. Trước đó nó là một const trong một client component, nên
 *  muốn dùng lại phải kéo cả component 2D vào cảnh three.js - và chép lại thì
 *  cửa hàng bán một tên còn nhân vật đeo một tên khác.
 *
 *  Khoá ở đây chính là `asset_key` trong bảng user_equipments, nên nó cũng là
 *  hợp đồng giữa cửa hàng, tủ đồ, hình 2D và hình 3D. */

export interface CharacterEquipments {
  weapon?: string;
  armor?: string;
  accessory?: string;
  companion?: string;
  watch?: string;
  suit?: string;
  laptop?: string;
  car?: string;
}

export const ITEM_DESCRIPTIONS: Record<string, { name: string; type: keyof CharacterEquipments; icon: string }> = {
  weapon_valuation_pen: { name: "Bút Định Giá Thần Kỳ", type: "weapon", icon: "🖊️" },
  weapon_lbo_sword: { name: "Kiếm Phân Tích LBO", type: "weapon", icon: "⚔️" },
  weapon_bell: { name: "Chuông Giao Dịch Sàn Wall", type: "weapon", icon: "🔔" },

  armor_risk_shield: { name: "Khiên Quản Trị Rủi Ro", type: "armor", icon: "🛡️" },
  armor_savings_vest: { name: "Áo Giáp Tích Sản", type: "armor", icon: "🎽" },

  acc_glasses: { name: "Kính Phân Tích BCTC", type: "accessory", icon: "👓" },
  acc_crown: { name: "Vương Miện CFO", type: "accessory", icon: "👑" },

  pet_bull: { name: "Linh vật Bò Tăng Trưởng", type: "companion", icon: "🐂" },
  pet_bear: { name: "Gấu Tiết Kiệm Thần Kỳ", type: "companion", icon: "🐻" },

  booster_xp_24h: { name: "Thẻ X2 XP Booster (24h)", type: "accessory", icon: "⚡" },
  title_vip_diamond: { name: "Huy Hiệu VIP Kim Cương", type: "accessory", icon: "💎" },
  chat_effect_dragon_fire: { name: "Khung Chat Rồng Lửa", type: "accessory", icon: "🔥" },
  chat_effect_diamond_glow: { name: "Khung Chat Kim Cương", type: "accessory", icon: "💎" },
};

/** Món đồ nào có hình khối trong thế giới 3D.
 *
 *  Không phải món nào cũng đeo được: booster là một hiệu ứng theo thời gian,
 *  khung chat là hiệu ứng quanh tin nhắn. Đeo chúng lên người sẽ phải bịa ra
 *  một hình dạng không ai đồng ý, nên chúng đứng ngoài danh sách này thay vì
 *  được vẽ đại. */
export const WEARABLE_IN_3D = new Set([
  "weapon_valuation_pen",
  "weapon_lbo_sword",
  "weapon_bell",
  "armor_risk_shield",
  "armor_savings_vest",
  "acc_glasses",
  "acc_crown",
  "pet_bull",
  "pet_bear",
  "title_vip_diamond",
]);

/** Giữ lại đúng những món vẽ được, để phần 3D không phải tự lọc ở mỗi chỗ. */
export function wearableGear(gear: CharacterEquipments | null | undefined): CharacterEquipments {
  if (!gear) return {};
  const out: CharacterEquipments = {};
  for (const [slot, key] of Object.entries(gear)) {
    if (typeof key === "string" && WEARABLE_IN_3D.has(key)) {
      out[slot as keyof CharacterEquipments] = key;
    }
  }
  return out;
}
