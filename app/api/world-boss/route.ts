import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { BOSS_QUESTION_COUNT } from "@/lib/world-boss";
import { getServerDictionary } from "@/lib/i18n/server";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

/** Cột id của world_bosses là uuid; chuỗi nào khác dạng đó thì không thể là
 *  một hàng thật, và gửi nó vào truy vấn chỉ tổ sinh lỗi kiểu từ Postgres. */
function isUuid(value: string | undefined): value is string {
  return !!value && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

/** Boss dự phòng khi bảng world_bosses chưa có hàng nào active - chữ hiển thị
 *  (tên, mô tả, câu hỏi) sống trong `t.worldSpaces.worldBoss` vì route này gửi
 *  chữ đó xuống làm JSON cho client, không phải render trực tiếp; xem
 *  AGENTS.md mục "Translating the UI".
 *
 *  Route này tính lại mỗi request (không revalidate, không unstable_cache,
 *  không Cache-Control, không được ghi vào bảng nào) và còn tự xáo thứ tự
 *  câu hỏi/đáp án bằng Math.random() mỗi lần gọi - nên nó không thể cache
 *  được ngay cả khi muốn, và đọc locale tại đây (thay vì trả id cho client tự
 *  tra) là lựa chọn đúng: không có bản JSON nào bị đông cứng ở ngôn ngữ cũ. */
function fallbackWorldBoss(t: Dictionary) {
  const wb = t.worldSpaces.worldBoss;
  return {
    id: "world-boss-titan-2026",
    name: wb.fallbackName,
    description: wb.fallbackDescription,
    boss_emoji: "🌋",
    max_hp: 1000000,
    current_hp: 745000,
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    is_active: true,
    questions: wb.questions.map((q: { prompt: string; options: string[] }) => ({
      prompt: q.prompt,
      options: [...q.options],
      correct: 0,
    })),
  };
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Câu hỏi của world boss, đọc từ bảng hoặc từ fallbackWorldBoss(t). */
interface BossQuestion {
  options: string[];
  correct?: number;
  [key: string]: unknown;
}

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const t = await getServerDictionary();

  const { data: boss } = await supabase
    .from("world_bosses")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const activeBoss = boss || fallbackWorldBoss(t);

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
    name: log.user_profiles?.full_name || log.user_profiles?.email?.split("@")[0] || t.worldSpaces.worldBoss.defaultWarriorName,
    avatarUrl: log.user_profiles?.avatar_url,
    totalDamage: log.damage_dealt,
  })) ||
    t.worldSpaces.worldBoss.defaultLeaderboardNames.map((name: string, i: number) => ({
      rank: i + 1,
      userId: `mock-${i + 1}`,
      name,
      totalDamage: [45000, 38000, 31000][i],
      avatarUrl: null,
    }));

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
