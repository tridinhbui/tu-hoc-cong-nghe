/**
 * Id cũ đã được LƯU (URL đã chia sẻ, localStorage, cột game_type) trước khi
 * đổi tên sang id công nghệ. Đọc qua đây để giá trị cũ vẫn mở đúng toà nhà và
 * ván chơi cũ vẫn được tính. Dữ liệu trên D1 được đổi luôn trong
 * migrations-d1/0008_drop_finance_tables.sql; bảng này lo phần còn lại.
 */
export const LEGACY_BUILDING_IDS: Readonly<Record<string, string>> = {
  "goldman-sachs": "capacity-lab",
  "fed-vault": "backbone-hub",
  "cme-commodities": "resource-floor",
  "swiss-haven": "data-haven",
  "capitol-hill": "cloud-capital",
};

export const LEGACY_GAME_TYPES: Readonly<Record<string, string>> = {
  "goldman-pitch": "capacity-sizing",
  "fed-vault-sim": "backbone-routing",
  "scenario-cme-commodities": "scenario-resource-floor",
  "scenario-swiss-haven": "scenario-data-haven",
  "scenario-capitol-hill": "scenario-cloud-capital",
};

export function normalizeBuildingId(id: string): string;
export function normalizeBuildingId(id: string | null): string | null;
export function normalizeBuildingId(id: string | null): string | null {
  return id === null ? null : (LEGACY_BUILDING_IDS[id] ?? id);
}

export function normalizeGameType(gameType: string): string {
  return LEGACY_GAME_TYPES[gameType] ?? gameType;
}
