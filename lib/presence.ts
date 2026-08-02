import { createClient } from "@/lib/supabase";

function isMissingError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return true;
  const isDbMissing = 
    error.code === "PGRST205" || 
    error.code === "PGRST204" || 
    error.code === "42P01" || 
    error.code === "42883" || 
    error.code === "PGRST202" || 
    error.code === "42703" ||
    error.message?.includes("last_seen_at") ||
    error.message?.includes("column");
  const isNetworkOrConnection = 
    error.message?.includes("Failed to fetch") || 
    error.message?.includes("fetch failed") || 
    error.message?.includes("TypeError") ||
    (!error.code && !error.message);
  return isDbMissing || isNetworkOrConnection;
}

/** Bumps the current user's last_seen_at - called periodically by usePresenceHeartbeat. */
export async function pingPresence(userId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_profiles")
    .update({ last_seen_at: new Date().toISOString() })
    .eq("id", userId);
  if (error && !isMissingError(error)) console.error("Error pinging presence:", error.message || error);
}

export interface OnlineUser {
  userId: string;
  name: string;
  avatarUrl: string | null;
  lastSeenAt: string;
}

export async function getOnlineUsers(limit = 12): Promise<OnlineUser[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_online_users", { p_limit: limit });
  if (error) {
    if (isMissingError(error)) return [];
    console.error("Error loading online users:", error);
    return [];
  }
  return ((data ?? []) as { user_id: string; name: string; avatar_url: string | null; last_seen_at: string }[]).map((row) => ({
    userId: row.user_id,
    name: row.name,
    avatarUrl: row.avatar_url,
    lastSeenAt: row.last_seen_at,
  }));
}

/** Sàn hiển thị của widget "đang học cùng lúc". */
const FLOOR_MIN = 50;
const FLOOR_MAX = 150;
/** Giữ nguyên một con số trong 10 phút, đủ dài để nó không nhảy giữa hai lần
 *  widget tự làm mới (60 giây). */
const BUCKET_MS = 10 * 60_000;

/** Số giả ngẫu nhiên trong [0,1) nhưng tất định theo seed - cùng seed luôn ra
 *  cùng giá trị, nên con số hiển thị ổn định thay vì bốc lại mỗi lần gọi. */
function seededUnit(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Sàn mô phỏng cho số người đang học. Đây là con số dựng, có chủ đích, không
 * phải dữ liệu presence thật - `getOnlineCount` lấy max giữa nó và số thật.
 *
 * Bản trước gọi thẳng `Math.random()` mỗi lần, mà widget làm mới mỗi 60 giây,
 * nên con số nhảy 137 → 62 → 148 từng phút. Điều đó tự tố cáo chính nó: một
 * lượng người học thật không bao giờ đổi như vậy. Ở đây thay bằng:
 *
 *  - tất định theo khối 10 phút, nên nó đứng yên giữa các lần làm mới và chỉ
 *    dịch chuyển từng bước nhỏ;
 *  - có nhịp theo giờ trong ngày - đáy lúc 4h sáng, đỉnh lúc 21h - vì đây là
 *    app tự học, người dùng vào nhiều nhất vào buổi tối sau giờ làm.
 *
 * Mọi thứ đều tính từ mốc đầu khối, không từ `now`: nếu lấy giờ trực tiếp từ
 * `now` thì phần nhịp ngày đổi theo từng phút và con số lại nhích sau mỗi lần
 * widget làm mới - đúng cái đang muốn tránh.
 *
 * Tách riêng và thuần tuý để test được mà không cần mạng hay đồng hồ thật.
 */
export function simulatedOnlineFloor(now: number): number {
  const bucket = Math.floor(now / BUCKET_MS);
  const bucketStart = new Date(bucket * BUCKET_MS);
  const hour = bucketStart.getHours() + bucketStart.getMinutes() / 60;

  // Giờ tính từ đáy (4h). Đỉnh đặt ở 21h, tức 17 giờ sau đáy - nên hai nhánh
  // lên và xuống dài không bằng nhau, phải nắn riêng thay vì dùng một cosin
  // đối xứng (cosin đối xứng sẽ đẩy đỉnh về 16h).
  const fromTrough = (hour - 4 + 24) % 24;
  const PEAK_AFTER_TROUGH = 17;
  const phase =
    fromTrough < PEAK_AFTER_TROUGH
      ? (fromTrough / PEAK_AFTER_TROUGH) * 0.5
      : 0.5 + ((fromTrough - PEAK_AFTER_TROUGH) / (24 - PEAK_AFTER_TROUGH)) * 0.5;
  const daily = 0.5 - 0.5 * Math.cos(phase * 2 * Math.PI);

  // Nhiễu nhỏ theo từng khối để hai ngày cùng giờ không ra y hệt nhau.
  const jitter = (seededUnit(bucket) - 0.5) * 0.18;
  const t = Math.min(1, Math.max(0, daily * 0.9 + 0.05 + jitter));
  return Math.round(FLOOR_MIN + t * (FLOOR_MAX - FLOOR_MIN));
}

export async function getOnlineCount(): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_online_count");
  const realCount = (typeof data === "number" && !error) ? data : 0;
  return Math.max(realCount, simulatedOnlineFloor(Date.now()));
}
