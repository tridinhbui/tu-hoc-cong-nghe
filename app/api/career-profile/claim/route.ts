import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { SKILL_DOMAINS } from "@/lib/career-competency";
import {
  CAREER_MISSION_PERFECT_WEEK_ID,
  WEEKLY_CAREER_MISSIONS,
  buildWeeklyMissionState,
  getCareerMissionReward,
  getWeekKey,
  getWeekStart,
  type CareerMissionCounts,
} from "@/lib/weekly-career-mission";

// Server-authoritative payout for the Weekly Career Mission list, same
// shape as app/api/quests/claim/route.ts: the amount comes from
// lib/weekly-career-mission.ts, never the request body, and the route
// re-derives the mission's progress from the progress tables before paying
// - a client that POSTs {missionId: "mock_interview"} without having done
// one gets a 400, not 40 XP. user_career_mission_claims has no INSERT
// grant for `authenticated` (20260814_career_profile.sql), so this is the
// only writer, and its unique constraint makes a double-claim a 23505.

export const dynamic = "force-dynamic";

const VALUATION_LESSON_IDS = new Set(SKILL_DOMAINS.find((d) => d.id === "valuation")?.lessonIds ?? []);

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { missionId?: unknown } | null;
  const missionId = typeof body?.missionId === "string" ? body.missionId : null;
  if (!missionId) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const reward = getCareerMissionReward(missionId);
  if (!reward) {
    return NextResponse.json({ error: "Unknown mission" }, { status: 400 });
  }

  const weekKey = getWeekKey();
  const weekStartIso = getWeekStart().toISOString();

  const [progressRes, quizRes, cvRes, caseRes, claimsRes] = await Promise.all([
    supabase
      .from("user_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("completed", true)
      .gte("completed_at", weekStartIso),
    supabase
      .from("user_quiz_sessions")
      .select("track, total")
      .eq("user_id", user.id)
      .gte("completed_at", weekStartIso),
    supabase.from("user_cv_bullets").select("id").eq("user_id", user.id).gte("created_at", weekStartIso),
    supabase
      .from("game_sessions")
      .select("id")
      .eq("user_id", user.id)
      .eq("game_type", "weekly-case-challenge")
      .gte("created_at", weekStartIso),
    supabase.from("user_career_mission_claims").select("mission_id").eq("user_id", user.id).eq("week_key", weekKey),
  ]);

  const quizRows = (quizRes.data ?? []) as { track: string; total: number }[];
  const counts: Partial<CareerMissionCounts> = {
    ib_questions: quizRows
      .filter((r) => r.track === "ib" || r.track === "mock-interview")
      .reduce((sum, r) => sum + (Number(r.total) || 0), 0),
    valuation_lessons: ((progressRes.data ?? []) as { lesson_id: number }[]).filter((r) =>
      VALUATION_LESSON_IDS.has(r.lesson_id)
    ).length,
    cv_bullets: (cvRes.data ?? []).length,
    mock_interview: quizRows.filter((r) => r.track === "mock-interview").length,
    company_case: (caseRes.data ?? []).length,
  };

  const state = buildWeeklyMissionState(
    counts,
    ((claimsRes.data ?? []) as { mission_id: string }[]).map((r) => r.mission_id),
    weekKey
  );

  const isPerfectWeek = missionId === CAREER_MISSION_PERFECT_WEEK_ID;
  const eligible = isPerfectWeek
    ? state.completedCount === WEEKLY_CAREER_MISSIONS.length
    : state.missions.find((m) => m.id === missionId)?.completed === true;

  if (!eligible) {
    return NextResponse.json({ code: "questNotComplete" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from("user_career_mission_claims").insert([
    {
      user_id: user.id,
      week_key: weekKey,
      mission_id: missionId,
      xp_earned: reward.xp,
      coin_earned: reward.coins,
    },
  ]);

  if (error) {
    // 23505 = already claimed this week. Not worth surfacing as an error;
    // the UI just shouldn't re-award.
    if (error.code === "23505") {
      return NextResponse.json({ claimed: false, xpEarned: 0, coinEarned: 0 });
    }
    return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  }

  // Coins live on user_profiles and have no ledger table of their own, so
  // they're incremented here rather than recomputed by
  // recalculateUserStats. Read-then-write is safe enough for a
  // once-per-week, one-row-per-user payout that the unique constraint above
  // has already made idempotent. XP is NOT written here - it's summed from
  // this ledger by recalculateUserStats, which the client calls next.
  let coinEarned = 0;
  if (reward.coins > 0) {
    const { data: profile } = await admin
      .from("user_profiles")
      .select("coins")
      .eq("id", user.id)
      .maybeSingle();
    const { error: coinError } = await admin
      .from("user_profiles")
      .update({ coins: (Number(profile?.coins) || 0) + reward.coins })
      .eq("id", user.id);
    if (!coinError) coinEarned = reward.coins;
  }

  return NextResponse.json({ claimed: true, xpEarned: reward.xp, coinEarned });
}
