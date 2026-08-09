import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// `MOCK_OPPONENTS`, an unused block of Vietnamese display names, used to sit
// here. It was never referenced anywhere else in the codebase (confirmed by
// grep) - dead code, not a fallback path, so it is removed rather than
// translated.

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  const { data: topUsers } = await supabase
    .from("user_profiles")
    .select("id, full_name, email, avatar_url, total_xp, current_level")
    .order("total_xp", { ascending: false })
    .limit(10);

  interface ProfileRow {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
    current_level: number | null;
  }

  const leaderboard = (topUsers as ProfileRow[] | null)?.map((u, idx) => ({
    rank: idx + 1,
    name: u.full_name || u.email?.split("@")[0] || "Trader CFO",
    avatarUrl: u.avatar_url,
    level: u.current_level || 1,
    pvpScore: (u.current_level || 1) * 120 + 50,
  })) || [
    /* i18n-ignore-start: tên hiển thị giả lập, cùng loại với biệt danh meme tài chính ở Leaderboard - dịch ra là hỏng câu đùa */
    { rank: 1, name: "Thần Thoại Valuation", level: 10, pvpScore: 1850, avatarUrl: null },
    { rank: 2, name: "Master Corporate Finance", level: 8, pvpScore: 1520, avatarUrl: null },
    { rank: 3, name: "Vua Tích Sản VN30", level: 7, pvpScore: 1340, avatarUrl: null },
    /* i18n-ignore-end */
  ];

  return NextResponse.json({ leaderboard });
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
    wagerCoins?: number;
    score?: number;
    isWin?: boolean;
  } | null;

  const wagerCoins = Math.max(10, Math.min(200, Number(body?.wagerCoins ?? 50)));
  const score = Number(body?.score ?? 0);
  const safeScore = Math.max(0, Math.min(5, Math.floor(score)));
  const isWin = safeScore >= 4;

  // Lấy số coins hiện tại
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("coins")
    .eq("id", user.id)
    .single();

  const currentCoins = profile?.coins ?? 0;
  const xpReward = isWin ? 50 : 10;

  if (currentCoins < wagerCoins && !isWin) {
    return NextResponse.json({ error: "Insufficient coins" }, { status: 400 });
  }

  const coinDelta = isWin ? wagerCoins : -wagerCoins;
  const newCoins = Math.max(0, currentCoins + coinDelta);

  // Update profile
  await supabase
    .from("user_profiles")
    .update({
      coins: newCoins,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  // Record PvP log
  await supabase.from("pvp_duels").insert({
    challenger_id: user.id,
    winner_id: isWin ? user.id : null,
    wager_coins: wagerCoins,
    challenger_score: safeScore,
  });

  await supabase.from("game_sessions").insert({
    user_id: user.id,
    game_type: "pvp-duel",
    score: safeScore,
    total: 5,
    xp_earned: xpReward,
  });

  return NextResponse.json({
    success: true,
    isWin,
    coinDelta,
    newCoins,
    xpReward,
  });
}
