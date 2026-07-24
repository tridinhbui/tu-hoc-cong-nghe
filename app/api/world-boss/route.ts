import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

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
    (activeBoss.questions || []).map((q: any) => {
      const order = shuffleArray(q.options.map((_: any, i: number) => i));
      const correct = order.indexOf(q.correct ?? 0);
      return {
        ...q,
        options: order.map((idx: any) => q.options[Number(idx)]),
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

  const leaderboard = logs?.map((log: any, index: number) => ({
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
    damageDealt?: number;
    score?: number;
  } | null;

  const bossId = body?.bossId || FALLBACK_WORLD_BOSS.id;
  const damageDealt = Number(body?.damageDealt ?? 0);
  const score = Number(body?.score ?? 0);

  if (damageDealt <= 0) {
    return NextResponse.json({ error: "No damage dealt" }, { status: 400 });
  }

  // 1. Trừ HP World Boss nếu có trong DB
  if (bossId !== FALLBACK_WORLD_BOSS.id) {
    const { data: boss } = await supabase
      .from("world_bosses")
      .select("current_hp")
      .eq("id", bossId)
      .single();

    if (boss) {
      const newHp = Math.max(0, boss.current_hp - damageDealt);
      await supabase
        .from("world_bosses")
        .update({ current_hp: newHp })
        .eq("id", bossId);
    }

    // Ghi log sát thương
    await supabase.from("world_boss_damage_logs").insert({
      boss_id: bossId,
      user_id: user.id,
      damage_dealt: damageDealt,
      score
    });
  }

  // 2. Thưởng XP & Coins cho User
  const xpReward = score * 80;
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
      updated_at: new Date().toISOString()
    })
    .eq("id", user.id);

  await supabase.from("game_sessions").insert({
    user_id: user.id,
    game_type: "world-boss-raid",
    score: damageDealt,
    total: FALLBACK_WORLD_BOSS.max_hp,
    xp_earned: xpReward,
  });

  return NextResponse.json({
    success: true,
    damageDealt,
    xpReward,
    coinReward,
    newCoins: currentCoins + coinReward
  });
}
