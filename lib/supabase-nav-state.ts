import { createClient } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Ba thứ thanh điều hướng cần lúc gắn, trong MỘT request.
 *
 *  VÌ SAO. AppNavbar nằm ở app/(app)/layout.tsx nên nó gắn ở mọi trang trong
 *  ứng dụng, và lúc gắn nó hỏi ba chỗ riêng biệt: `user_profiles`,
 *  `quiz_mistakes`, `user_chests`. Ba request ấy độc lập nhưng luôn đi cùng
 *  nhau và luôn cùng một người dùng - tức là chúng là một request được.
 *
 *  Đo trên Supabase Observability: 20.439 request API Gateway mỗi giờ, và mỗi
 *  lượt tải trang đóng góp ba trong số đó chỉ riêng cho thanh điều hướng.
 *
 *  CÙNG KHUÔN với lib/supabase-dashboard-optimized.ts: RPC không nhận tham số
 *  và tự lấy `auth.uid()` bên trong. Nhận `p_user_id` sẽ cho bất kỳ ai đọc hồ
 *  sơ của bất kỳ ai, vì `security definer` đã bỏ qua RLS.
 *
 *  HẠ CÁNH MỀM KHI CHƯA CHẠY MIGRATION. Migration trong repo này chạy TAY qua
 *  SQL Editor (xem scripts/check-migrations.mjs), nên khoảng giữa lúc deploy mã
 *  và lúc ai đó chạy SQL là chuyện thường. `PGRST202` nghĩa là chưa có hàm; khi
 *  đó rơi về đúng ba truy vấn cũ. Thanh điều hướng vẫn vẽ đủ, chỉ là chưa
 *  tiết kiệm được gì - thay vì trống trơn trên mọi trang. */

export type NavProfileRow = {
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  total_xp: number;
  current_level: number;
  lessons_completed: number;
  coins?: number;
};

export type NavState = {
  profile: NavProfileRow | null;
  unresolvedMistakes: number;
  /** Hôm nay đã có rương đăng nhập chưa. `true` thì phía gọi khỏi ghi gì cả. */
  dailyChestClaimed: boolean;
};

function isMissingFunction(error: { code?: string } | null): boolean {
  return error?.code === "PGRST202" || error?.code === "42883" || error?.code === "PGRST205";
}

type RpcShape = {
  profile: NavProfileRow | null;
  unresolved_mistakes: number;
  daily_chest_claimed: boolean;
};

/** Đường cũ: ba truy vấn, giữ nguyên hình dạng cũ. Chỉ chạy khi chưa có RPC. */
async function readSeparately(supabase: SupabaseClient, userId: string): Promise<NavState> {
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  const [profile, mistakes, chest] = await Promise.all([
    supabase
      .from("user_profiles")
      .select("full_name, email, avatar_url, total_xp, current_level, lessons_completed, coins")
      .eq("id", userId)
      .maybeSingle(),
    supabase
      .from("quiz_mistakes")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("resolved", false),
    supabase
      .from("user_chests")
      .select("id")
      .eq("user_id", userId)
      .eq("source", "daily_login")
      .gte("earned_at", dayStart.toISOString())
      .limit(1)
      .maybeSingle(),
  ]);

  return {
    profile: (profile.data as NavProfileRow | null) ?? null,
    unresolvedMistakes: mistakes.count ?? 0,
    dailyChestClaimed: Boolean(chest.data),
  };
}

export async function getNavState(userId: string): Promise<NavState> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_nav_state");

  if (error) {
    if (isMissingFunction(error)) return readSeparately(supabase, userId);
    // Không ném: thanh điều hướng hỏng không đáng làm hỏng cả trang. Phía gọi
    // đã có hồ sơ dự phòng dựng từ `user_metadata` của phiên.
    console.error("get_nav_state:", error.message);
    return { profile: null, unresolvedMistakes: 0, dailyChestClaimed: true };
  }

  const row = data as RpcShape | null;
  return {
    profile: row?.profile ?? null,
    unresolvedMistakes: row?.unresolved_mistakes ?? 0,
    // Mặc định `true` khi thiếu dữ liệu: không biết chắc thì ĐỪNG trao thêm
    // rương. Đoán nhầm chiều này chỉ làm chậm một phần thưởng tới lượt tải sau;
    // đoán nhầm chiều kia là trao hai rương cho một ngày.
    dailyChestClaimed: row?.daily_chest_claimed ?? true,
  };
}
