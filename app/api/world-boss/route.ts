import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { BOSS_QUESTION_COUNT } from "@/lib/world-boss";

/** Cột id của world_bosses là uuid; chuỗi nào khác dạng đó thì không thể là
 *  một hàng thật, và gửi nó vào truy vấn chỉ tổ sinh lỗi kiểu từ Postgres. */
function isUuid(value: string | undefined): value is string {
  return !!value && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

// Mock Fallback World Boss Server
const FALLBACK_WORLD_BOSS = {
  id: "world-boss-titan-2026",
  name: "Bạo Chúa Khủng Hoảng Tài Chính (Financial Crisis Titan)",
  description: "Trùm World Boss Server hàng tuần cực mạnh sở hữu 1,000,000 HP. Toàn bộ người học trên server cùng nhau gây sát thương để giải cứu thị trường!",
  boss_emoji: "🌋",
  max_hp: 1000000,
  current_hp: 745000,
  start_date: new Date().toISOString().split("T")[0],
  end_date: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
  is_active: true,
  questions: [
    { prompt: "Khủng hoảng nợ dưới chuẩn (Subprime Mortgage) năm 2008 khởi nguồn chính từ đâu?", options: ["Nợ xấu chứng khoán hóa quá đà & Định giá tín nhiệm sai lầm", "Giá dầu mỏ giảm đột ngột", "Lạm phát tiền tệ ở Châu Âu"], correct: 0 },
    { prompt: "Khi Ngân hàng Trung ương liên tục nâng lãi suất điều hành (Hawk Policy), thị trường tài sản thường có xu hướng nào?", options: ["Biến động giảm do chi phí vốn tăng & định giá chiết khấu giảm", "Tăng trưởng bùng nổ ngay lập tức", "Không ảnh hưởng"], correct: 0 },
    { prompt: "Chỉ số VIX (Volatility Index) trên thị trường tài chính thường đại diện cho điều gì?", options: ["Chỉ số đo lường mức độ sợ hãi/biến động của thị trường", "Tỷ lệ lạm phát mục tiêu", "Tỷ lệ thất nghiệp"], correct: 0 },
    { prompt: "Trong mô hình Black-Scholes định giá quyền chọn, biến số nào tác động mạnh nhất đến Giá trị Thời gian (Time Value)?", options: ["Độ biến động lịch sử/nội hàm (Implied Volatility)", "Số dư tiền gửi", "Mệnh giá cổ phiếu"], correct: 0 },
    { prompt: "Chiến lược Hedging (Phòng hộ) bằng hợp đồng Tương lai (Futures Contract) giúp doanh nghiệp đạt mục tiêu gì?", options: ["Cố định chi phí/doanh thu rủi ro biến động giá trong tương lai", "Gia tăng nợ vay ngân hàng", "Trốn thuế doanh nghiệp"], correct: 0 },
    { prompt: "Khi lợi suất trái phiếu chính phủ Mỹ kỳ hạn 10 năm tăng mạnh, định giá cổ phiếu tăng trưởng thường chịu áp lực vì sao?", options: ["Tỷ lệ chiết khấu tăng làm giá trị hiện tại của dòng tiền tương lai giảm", "Doanh thu của doanh nghiệp tự động giảm ngay", "Cổ tức bắt buộc phải bị cắt"], correct: 0 },
    { prompt: "Một ngân hàng có tỷ lệ nợ xấu (NPL) tăng mạnh nhưng vẫn báo lợi nhuận đẹp. Nhà phân tích nên nghi ngờ điều gì đầu tiên?", options: ["Khả năng trích lập dự phòng chưa đủ hoặc ghi nhận lợi nhuận chưa phản ánh rủi ro tín dụng", "Ngân hàng chắc chắn đang tăng trưởng bền vững", "Chỉ số NPL không liên quan gì đến chất lượng lợi nhuận"], correct: 0 },
    { prompt: "Trong khủng hoảng thanh khoản, tài sản nào thường bị bán đầu tiên trong danh mục tổ chức?", options: ["Tài sản thanh khoản cao, dễ bán nhanh để lấy tiền mặt", "Tài sản vô hình không thể giao dịch", "Các khoản chi phí trả trước"], correct: 0 },
    { prompt: "Nếu spread tín dụng doanh nghiệp (credit spread) nới rộng đột ngột, tín hiệu phổ biến nhất là gì?", options: ["Thị trường đang yêu cầu premium rủi ro cao hơn vì lo ngại tín dụng/xác suất vỡ nợ tăng", "Doanh nghiệp tự động được nâng hạng tín nhiệm", "Chi phí vốn cổ phần giảm ngay"], correct: 0 },
    { prompt: "Một quỹ dùng đòn bẩy cao để ôm tài sản dài hạn nhưng tài trợ bằng vốn ngắn hạn. Rủi ro lớn nhất là gì?", options: ["Rủi ro mismatch kỳ hạn và bị ép thanh lý khi nguồn vốn ngắn hạn rút đi", "Rủi ro này luôn tốt vì ROE tăng", "Không có rủi ro nếu tài sản đang tăng giá"], correct: 0 },
    { prompt: "Khi thị trường rơi vào panic selling, chỉ báo nào thường phản ánh nhu cầu trú ẩn tăng lên?", options: ["Giá trái phiếu chính phủ tăng và lợi suất giảm", "P/E toàn thị trường mở rộng mạnh vì ai cũng lạc quan", "Margin lending tăng vọt do tâm lý hưng phấn"], correct: 0 },
    { prompt: "Trong phân tích khủng hoảng doanh nghiệp, chỉ số nào cảnh báo sớm áp lực thanh khoản ngắn hạn?", options: ["Current ratio và dòng tiền từ hoạt động kinh doanh suy yếu", "Số lượng nhân viên không đổi", "Logo thương hiệu mới"], correct: 0 },
    { prompt: "Một doanh nghiệp báo EBITDA tăng nhưng CFO âm kéo dài. Với boss tài chính, đây thường là dấu hiệu gì?", options: ["Lợi nhuận kế toán chưa chuyển hóa thành tiền mặt, cần soi chất lượng earnings", "Doanh nghiệp chắc chắn rẻ hơn", "Không ảnh hưởng gì đến rủi ro"], correct: 0 },
    { prompt: "Khi FED pivot từ hawkish sang dovish, nhóm tài sản nào thường phản ứng tích cực sớm nhất?", options: ["Tài sản nhạy cảm lãi suất như cổ phiếu tăng trưởng và trái phiếu dài hạn", "Tiền mặt không sinh lời", "Các khoản phải thu khách hàng"], correct: 0 },
    { prompt: "Một cú short squeeze xảy ra khi nào?", options: ["Người bán khống buộc phải mua lại cổ phiếu vì giá tăng mạnh, làm giá càng bị đẩy lên", "Doanh nghiệp mua lại toàn bộ nợ vay", "Lợi nhuận gộp giảm do giá nguyên liệu tăng"], correct: 0 }
  ]
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Câu hỏi của world boss, đọc từ bảng hoặc từ FALLBACK_WORLD_BOSS. */
interface BossQuestion {
  options: string[];
  correct?: number;
  [key: string]: unknown;
}

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  const { data: boss } = await supabase
    .from("world_bosses")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const activeBoss = boss || FALLBACK_WORLD_BOSS;

  // Shuffle question list and each question's option order so correct answer isn't always A
  const shuffledQuestions = shuffleArray(
    (activeBoss.questions || []).map((q: BossQuestion) => {
      const order = shuffleArray(q.options.map((_, i) => i));
      const correct = order.indexOf(q.correct ?? 0);
      return {
        ...q,
        options: order.map((idx) => q.options[Number(idx)]),
        correct,
      };
    })
  );

  const bossWithShuffledQuestions = {
    ...activeBoss,
    questions: shuffledQuestions,
  };

  // Lấy Top 10 Leaderboard Sát thương
  const { data: logs } = await supabase
    .from("world_boss_damage_logs")
    .select("user_id, damage_dealt, user_profiles(full_name, email, avatar_url)")
    .eq("boss_id", activeBoss.id)
    .order("damage_dealt", { ascending: false })
    .limit(10);

  interface DamageLogRow {
    user_id: string;
    damage_dealt: number;
    user_profiles?: { full_name: string | null; email: string | null; avatar_url: string | null } | null;
  }

  const leaderboard = (logs as unknown as DamageLogRow[] | null)?.map((log, index) => ({
    rank: index + 1,
    userId: log.user_id,
    name: log.user_profiles?.full_name || log.user_profiles?.email?.split("@")[0] || "Chiến binh Server",
    avatarUrl: log.user_profiles?.avatar_url,
    totalDamage: log.damage_dealt,
  })) || [
    { rank: 1, userId: "mock-1", name: "Sói Già Phố Wall", totalDamage: 45000, avatarUrl: null },
    { rank: 2, userId: "mock-2", name: "Thầy Giáo Định Giá", totalDamage: 38000, avatarUrl: null },
    { rank: 3, userId: "mock-3", name: "Chiến Thần CFA", totalDamage: 31000, avatarUrl: null },
  ];

  return NextResponse.json({
    boss: bossWithShuffledQuestions,
    leaderboard
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    bossId?: string;
    score?: number;
  } | null;

  // `damageDealt` từ trình duyệt bị bỏ qua có chủ ý: nó là con số ai cũng sửa
  // được. Máy chủ tính lại từ điểm, và giao diện hiện đúng con số máy chủ trả
  // về - trước đây hai bên tính hai kiểu nên người chơi thấy 78.700 trong khi
  // thanh máu chỉ nhận 15.000.
  const score = Math.max(0, Math.min(BOSS_QUESTION_COUNT, Math.floor(Number(body?.score ?? 0))));
  if (score <= 0) {
    return NextResponse.json({ error: "No damage dealt" }, { status: 400 });
  }

  // Boss phải là một hàng thật. Bản dự phòng trong mã nguồn có id là chuỗi
  // thường trong khi cột id là uuid, nên nó không bao giờ khớp hàng nào - và
  // nhánh trừ máu cũ bị bỏ qua đúng vì thế.
  const { data: activeBoss } = await supabase
    .from("world_bosses")
    .select("id")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const bossId = activeBoss?.id ?? (isUuid(body?.bossId) ? body?.bossId : null);
  if (!bossId) {
    // Nói thẳng thay vì trả success: im lặng ở đây chính là lý do lỗi này sống
    // được lâu - người chơi đánh xong, được chúc mừng, và không có gì thay đổi.
    return NextResponse.json(
      { error: "Chưa có world boss nào đang hoạt động - chạy migration 20260825 để tạo." },
      { status: 503 }
    );
  }

  // Trừ máu và ghi log trong MỘT lệnh, bằng hàm SECURITY DEFINER. Bảng chỉ
  // cấp quyền select cho người dùng, nên câu update trực tiếp bị RLS chặn im
  // lặng - đó là chỗ hỏng thứ hai, độc lập với chỗ trên.
  const { data: hit, error: rpcError } = await supabase
    .rpc("apply_world_boss_damage", { p_boss_id: bossId, p_score: score })
    .maybeSingle<{ current_hp: number; max_hp: number; damage_applied: number }>();

  if (rpcError || !hit) {
    return NextResponse.json(
      { error: rpcError?.message ?? "Không ghi được sát thương" },
      { status: 500 }
    );
  }

  const damageDealt = hit.damage_applied;

  // Thưởng XP & Coins cho user
  const xpReward = Math.min(50, Math.max(0, score * 5));
  const coinReward = score * 35;

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("coins")
    .eq("id", user.id)
    .single();

  const currentCoins = profile?.coins ?? 0;

  await supabase
    .from("user_profiles")
    .update({
      coins: currentCoins + coinReward,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  await supabase.from("game_sessions").insert({
    user_id: user.id,
    game_type: "world-boss-raid",
    score: damageDealt,
    total: hit.max_hp,
    xp_earned: xpReward,
  });

  return NextResponse.json({
    success: true,
    damageDealt,
    bossHp: hit.current_hp,
    bossMaxHp: hit.max_hp,
    xpReward,
    coinReward,
    newCoins: currentCoins + coinReward,
  });
}
