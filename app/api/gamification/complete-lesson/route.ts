import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getDomainLevelByXp, calculateOverallLevel, DOMAINS, DomainType } from "@/lib/levels";
import { getUnlockedSkills, drawRandomReward } from "@/lib/gamification";

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    lessonId?: number;
    score?: number; // 0 - 100
    timeSpentSeconds?: number;
    domainType?: DomainType;
  } | null;

  const lessonId = Number(body?.lessonId);
  const score = Number(body?.score ?? 0);
  const timeSpentSeconds = Number(body?.timeSpentSeconds ?? 0);
  const domainType = body?.domainType;

  if (!lessonId || !domainType || !DOMAINS.includes(domainType)) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const existingProgress = await supabase
    .from("user_progress")
    .select("completed")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .eq("completed", true)
    .maybeSingle();
  const alreadyCompleted = Boolean(existingProgress.data?.completed);

  // 1. Calculate XP Earned. Keep this legacy endpoint aligned with the
  // canonical recalculateUserStats formula: lessons are worth 10 XP once,
  // while high quiz scores improve avg_score rather than minting large XP.
  const baseXp = alreadyCompleted ? 0 : 10;
  const quizBonus = !alreadyCompleted && score >= 80 ? 5 : 0;
  
  // Tính Streak Bonus (lấy từ database hoặc mặc định)
  const { data: streakRow } = await supabase
    .from("user_streaks")
    .select("current_streak")
    .eq("user_id", user.id)
    .maybeSingle();
  const currentStreak = streakRow?.current_streak ?? 1;
  const streakBonus = !alreadyCompleted && currentStreak >= 7 ? 5 : 0;

  // Tính Time Bonus
  const timeBonus = 0;

  const xpEarned = Math.min(20, baseXp + quizBonus + streakBonus + timeBonus);

  // 2. Update user_progress
  const { error: progressError } = await supabase
    .from("user_progress")
    .upsert({
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString(),
      quiz_score: score,
      time_spent_seconds: timeSpentSeconds
    }, { onConflict: "user_id,lesson_id" });

  if (progressError) {
    return NextResponse.json({ error: progressError.message }, { status: 500 });
  }

  // 3. Update user_domain_mastery for the specific domain
  const { data: domainRow } = await supabase
    .from("user_domain_mastery")
    .select("current_xp")
    .eq("user_id", user.id)
    .eq("domain_type", domainType)
    .maybeSingle();

  const currentDomainXp = domainRow?.current_xp ?? 0;
  const newDomainXp = currentDomainXp + xpEarned;
  const newDomainLevel = getDomainLevelByXp(newDomainXp);

  const { error: domainError } = await supabase
    .from("user_domain_mastery")
    .upsert({
      user_id: user.id,
      domain_type: domainType,
      current_xp: newDomainXp,
      current_level: newDomainLevel,
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id,domain_type" });

  if (domainError) {
    return NextResponse.json({ error: domainError.message }, { status: 500 });
  }

  // 4. Recalculate Overall Level
  const { data: allDomains } = await supabase
    .from("user_domain_mastery")
    .select("domain_type, current_level")
    .eq("user_id", user.id);

  const domainLevels = {} as Record<DomainType, number>;
  DOMAINS.forEach((d) => {
    domainLevels[d] = 1; // Default
  });
  allDomains?.forEach((row) => {
    if (DOMAINS.includes(row.domain_type as DomainType)) {
      domainLevels[row.domain_type as DomainType] = row.current_level;
    }
  });
  
  // Set current domain since we just upserted it
  domainLevels[domainType] = newDomainLevel;

  const newOverallLevel = calculateOverallLevel(domainLevels);

  // Update Overall level and total XP in user_profiles & user_stats
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("total_xp, coins")
    .eq("id", user.id)
    .single();

  const newTotalXp = (profile?.total_xp ?? 0) + xpEarned;
  /** `coins` chỉ tồn tại sau một migration nhất định, nên payload được dựng
   *  động thay vì khai cứng - unknown giữ được kiểm tra ở chỗ ghi vào. */
  const updatePayload: Record<string, unknown> = {
    current_level: newOverallLevel,
    total_xp: newTotalXp,
    updated_at: new Date().toISOString()
  };
  const profileCoins = (profile as { coins?: number } | null)?.coins;
  if (profileCoins !== undefined) {
    updatePayload.coins = profileCoins + 10;
  }

  await supabase
    .from("user_profiles")
    .update(updatePayload)
    .eq("id", user.id);

  await supabase
    .from("user_stats")
    .upsert({
      user_id: user.id,
      total_xp: newTotalXp,
      current_level: newOverallLevel,
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });

  // 5. Draw Random Reward
  const rewardResult = await drawRandomReward(user.id);
  if (rewardResult.hasReward) {
    if (rewardResult.rewardType === "coin") {
      // Award coins (e.g. increase user stats coin balance if available, or just log/return to frontend)
      // Giả sử cộng coin trực tiếp vào metadata của user_profiles hoặc trường coins nếu có.
      // Tạm thời trả về để Front-end hiển thị và nhận.
    } else if (rewardResult.rewardType === "card" && typeof rewardResult.rewardValue === "string") {
      // Award Card: insert card asset into user inventory
      const { data: asset } = await supabase
        .from("gamification_assets")
        .select("id")
        .eq("asset_key", rewardResult.rewardValue)
        .eq("asset_type", "card")
        .maybeSingle();

      if (asset) {
        try {
          await supabase
            .from("user_inventories")
            .insert({
              user_id: user.id,
              asset_id: asset.id
            });
        } catch {
          // Bỏ qua nếu đã tồn tại
        }
      }
    }
  }

  // 6. Check for newly unlocked skills
  const unlockedSkills = await getUnlockedSkills(user.id);

  return NextResponse.json({
    success: true,
    xpEarned,
    newDomainXp,
    newDomainLevel,
    newOverallLevel,
    reward: rewardResult,
    unlockedSkills
  });
}
