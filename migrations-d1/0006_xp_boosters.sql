-- Booster XP có hạn: mỗi lần kích hoạt trả coin và nối thêm 24 giờ.
--
-- Trước đây booster là một món trong user_inventories (mua một lần, unique)
-- rồi "kích hoạt" bằng một mốc hết hạn trong localStorage - không nơi nào ở
-- server đọc mốc đó, nên booster không nhân XP nào cả. Bảng này là nguồn duy
-- nhất; chỉ RPC activate_booster ghi, route tính thưởng đọc qua
-- get_my_xp_multiplier.
CREATE TABLE IF NOT EXISTS "user_active_boosters" (
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "kind" TEXT NOT NULL,
  "multiplier" REAL NOT NULL CHECK ("multiplier" >= 1 AND "multiplier" <= 3),
  "expires_at" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("user_id", "kind")
);
