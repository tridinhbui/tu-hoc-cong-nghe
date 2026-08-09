import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import { getTotalQuizXp } from "@/lib/supabase-quiz-sessions";
import { getTotalGameXp } from "@/lib/games";
import { getTotalReferralXp, rewardMyReferralIfPending } from "@/lib/referrals";
import { getTotalQuestXp } from "@/lib/supabase-quests";
import { getTotalChestXp } from "@/lib/chests";
import { getTotalCareerMissionXp } from "@/lib/career-profile";
import { getLevelByXp, XP_PER_LESSON } from "@/lib/levels";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";

const CFA_LESSON_IDS = new Set(CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds));

// "Table not found in schema cache" (PostgREST) or "relation does not exist"
// (raw Postgres) - the leaderboard is a non-critical feature, so a missing
// table should degrade to "no ranking data yet" instead of crashing the
// dashboard.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

// Public headline count for the signed-out homepage hero ("Hơn X người học
// đã tham gia"). Falls back to null (caller keeps its static copy) if the
// RPC isn't migrated in yet - this number is decoration, not something
// worth blocking the landing page render over.
export async function getTotalUserCount(): Promise<number | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_total_user_count");

  if (error) {
    if (isMissingTableError(error) || error.code === "PGRST202" || error.code === "42883") {
      return null;
    }
    throw handleSupabaseError(error);
  }

  return typeof data === "number" ? data : null;
}

// Public headline count for the signed-out homepage hero ("X bài học đã
// hoàn thành"). Same reasoning as getTotalUserCount above - falls back to
// null (caller keeps its static copy) if the RPC isn't migrated in yet.
export async function getTotalCompletedLessonsCount(): Promise<number | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_total_completed_lessons_count");

  if (error) {
    if (isMissingTableError(error) || error.code === "PGRST202" || error.code === "42883") {
      return null;
    }
    throw handleSupabaseError(error);
  }

  return typeof data === "number" ? data : null;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  current_level: number;
  total_xp: number;
  lessons_completed: number;
  avg_quiz_score: number;
  current_stage: number;
  preferred_track: string;
  dark_mode: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  id: number;
  user_id: string;
  total_lessons_completed: number;
  total_xp: number;
  current_level: number;
  avg_quiz_score: number;
  longest_streak: number;
  last_lesson_date: string | null;
  total_study_time_hours: number;
  created_at: string;
  updated_at: string;
}

// Tạo user profile khi đăng ký
export async function createUserProfile(userId: string, email: string, fullName?: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .insert([
      {
        id: userId,
        email,
        full_name: fullName,
        current_level: 1,
        total_xp: 0,
        lessons_completed: 0,
      },
    ])
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserProfile;
}

// Lấy user profile
export async function getUserProfile(userId: string) {
  const supabase = createClient();
  let { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  // PGRST116 ("0 rows") right after signup usually means the auth trigger
  // that creates this row hasn't finished yet, not that the account has no
  // profile - one short retry clears it without surfacing a spurious error
  // on every fresh account's first dashboard load.
  if (error?.code === "PGRST116") {
    await new Promise((resolve) => setTimeout(resolve, 600));
    ({ data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single());
  }

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserProfile;
}

// Cập nhật user profile
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserProfile;
}

// Lấy user stats
export async function getUserStats(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserStats;
}

// Tạo/cập nhật user stats
export async function upsertUserStats(userId: string, stats: Partial<UserStats>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_stats")
    .upsert(
      [
        {
          user_id: userId,
          ...stats,
        },
      ],
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserStats;
}

// Cập nhật dark mode
export async function setDarkMode(userId: string, darkMode: boolean) {
  return updateUserProfile(userId, { dark_mode: darkMode });
}

// Cập nhật preferred track
export async function setPreferredTrack(userId: string, track: "personal" | "professional") {
  return updateUserProfile(userId, { preferred_track: track });
}

export type LeaderboardMetric = "xp" | "lessons" | "avg_score" | "streak" | "badges";

export interface LeaderboardRow {
  user_id: string;
  value: number;
  name: string;
  avatarUrl: string | null;
}

// Both RPCs are SECURITY DEFINER Postgres functions (see
// supabase/migrations/20260711_leaderboard_rpc.sql) that only ever return
// user_id/name/value - never email or any other profile column. A plain
// client-side query joining user_stats to user_profiles doesn't work here:
// user_profiles' RLS only allows `auth.uid() = id`, and PostgREST's embedded
// resource is an inner join, so every row whose profile the caller can't
// see under RLS gets silently dropped - in practice the leaderboard only
// ever showed the current user's own row, never other learners.
export async function getLeaderboardByMetric(metric: LeaderboardMetric, limit: number = 10): Promise<LeaderboardRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_leaderboard", { p_metric: metric, p_limit: limit });

  if (error && isMissingTableError(error)) {
    return [];
  }
  if (error) {
    throw handleSupabaseError(error);
  }

  return ((data ?? []) as { user_id: string; name: string; value: number; avatar_url: string | null }[]).map((row) => ({
    user_id: row.user_id,
    value: row.value ?? 0,
    name: row.name || "Người học",
    avatarUrl: row.avatar_url ?? null,
  }));
}

// The weighted "overall" score - see
// supabase/migrations/20260819_composite_leaderboard.sql for the weights and
// why each component is normalised the way it is.
export async function getCompositeLeaderboard(limit: number = 20): Promise<LeaderboardRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_composite_leaderboard", { p_limit: limit });

  if (error) {
    // Migration not applied on this environment yet - the tab shows empty
    // rather than taking down the whole leaderboard widget.
    if (isMissingTableError(error) || error.code === "PGRST202") return [];
    throw handleSupabaseError(error);
  }

  return ((data ?? []) as { user_id: string; name: string; value: number; avatar_url: string | null }[]).map((row) => ({
    user_id: row.user_id,
    value: row.value ?? 0,
    name: row.name || "Người học",
    avatarUrl: row.avatar_url ?? null,
  }));
}

// Real community activity: posts + comments + reactions the learner made. See
// 20260820_community_contribution_leaderboard.sql - this tab used to display a
// number derived from XP, not from any community table.
export async function getCommunityContributionLeaderboard(limit: number = 20): Promise<LeaderboardRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_community_contribution_leaderboard", { p_limit: limit });

  if (error) {
    if (isMissingTableError(error) || error.code === "PGRST202") return [];
    throw handleSupabaseError(error);
  }

  return ((data ?? []) as { user_id: string; name: string; value: number; avatar_url: string | null }[]).map((row) => ({
    user_id: row.user_id,
    value: row.value ?? 0,
    name: row.name || "Người học",
    avatarUrl: row.avatar_url ?? null,
  }));
}

export async function getMyCommunityContributionRank(
  userId: string
): Promise<{ rank: number; value: number } | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_my_community_contribution_rank", { p_user_id: userId });

  if (error) {
    if (isMissingTableError(error) || error.code === "PGRST202") return null;
    throw handleSupabaseError(error);
  }

  const row = (data as { rank: number; value: number }[] | null)?.[0];
  return row ? { rank: row.rank, value: row.value ?? 0 } : null;
}

export interface CompositeRank {
  rank: number;
  value: number;
  /** Component breakdown, so the UI can explain the score. */
  learningXp: number;
  examPoints: number;
  accuracy: number;
  streakDays: number;
}

export async function getMyCompositeRank(userId: string): Promise<CompositeRank | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_my_composite_rank", { p_user_id: userId });

  if (error) {
    if (isMissingTableError(error) || error.code === "PGRST202") return null;
    throw handleSupabaseError(error);
  }

  const row = (
    data as
      | {
          rank: number;
          value: number;
          learning_xp: number;
          exam_points: number;
          accuracy: number;
          streak_days: number;
        }[]
      | null
  )?.[0];
  if (!row) return null;

  return {
    rank: row.rank,
    value: row.value ?? 0,
    learningXp: row.learning_xp ?? 0,
    examPoints: row.exam_points ?? 0,
    accuracy: row.accuracy ?? 0,
    streakDays: row.streak_days ?? 0,
  };
}

const SHOUTOUT_TEMPLATES = [
  (name: string, value: number) => `🎉 ${name} vừa đạt ${value} XP - một trong những học viên chăm chỉ nhất cộng đồng!`,
  (name: string, value: number) => `👏 Chúc mừng ${name} đã tích luỹ ${value} XP - hành trình học tập rất ấn tượng!`,
  (name: string, value: number) => `🔥 ${name} đang giữ phong độ cực tốt với ${value} XP tích luỹ được!`,
  (name: string, value: number) => `⭐ Vinh danh ${name} - đã đạt ${value} XP nhờ học đều đặn mỗi ngày!`,
] as const;

/** A random "shoutout" celebrating a real top learner, for the admin
 *  chatbot's greeting - pulls from the top of the real XP leaderboard so
 *  it's never a made-up name, and picks both a random learner and a random
 *  phrasing so it doesn't feel like the same canned message every time. */
export async function getRandomCommunityShoutout(): Promise<string | null> {
  const top = await getLeaderboardByMetric("xp", 15);
  if (top.length === 0) return null;

  const learner = top[Math.floor(Math.random() * top.length)];
  const template = SHOUTOUT_TEMPLATES[Math.floor(Math.random() * SHOUTOUT_TEMPLATES.length)];
  return template(learner.name, learner.value);
}

// Where the current user stands on one leaderboard category, even if they're
// not in the top N. Competition ranking: ties share the same (best) rank.
export async function getMyLeaderboardRank(
  metric: LeaderboardMetric,
  userId: string
): Promise<{ rank: number; value: number } | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_my_leaderboard_rank", { p_metric: metric, p_user_id: userId });

  if (error && isMissingTableError(error)) {
    return null;
  }
  if (error) {
    throw handleSupabaseError(error);
  }

  const row = (data as { rank: number; value: number }[] | null)?.[0];
  if (!row) {
    return null;
  }

  return { rank: row.rank, value: row.value };
}

// Ranks by count of completed lessons within a track's day ranges (see
// lib/track-stages.ts). Scoped to "personal"/"professional" only - CFA is
// deliberately excluded (see supabase/migrations/20260719_leaderboard_expansion.sql).
export async function getTrackLeaderboard(track: "personal" | "professional", limit: number = 10): Promise<LeaderboardRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_track_leaderboard", { p_track: track, p_limit: limit });

  if (error && isMissingTableError(error)) return [];
  if (error) throw handleSupabaseError(error);

  return ((data ?? []) as { user_id: string; name: string; value: number; avatar_url: string | null }[]).map((row) => ({
    user_id: row.user_id,
    value: row.value ?? 0,
    name: row.name || "Người học",
    avatarUrl: row.avatar_url ?? null,
  }));
}

export async function getMyTrackLeaderboardRank(
  track: "personal" | "professional",
  userId: string
): Promise<{ rank: number; value: number } | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_my_track_leaderboard_rank", { p_track: track, p_user_id: userId });

  if (error && isMissingTableError(error)) return null;
  if (error) throw handleSupabaseError(error);

  const row = (data as { rank: number; value: number }[] | null)?.[0];
  return row ? { rank: row.rank, value: row.value } : null;
}

// Ranks by count of completed lessons within a competency's lesson set (see
// lib/competency-leaderboard.ts). Same shape as getTrackLeaderboard, just
// keyed by an arbitrary lesson-id array instead of a track's day ranges.
export async function getCompetencyLeaderboard(lessonIds: number[], limit: number = 10): Promise<LeaderboardRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_competency_leaderboard", { p_lesson_ids: lessonIds, p_limit: limit });

  if (error && isMissingTableError(error)) return [];
  if (error) throw handleSupabaseError(error);

  return ((data ?? []) as { user_id: string; name: string; value: number; avatar_url: string | null }[]).map((row) => ({
    user_id: row.user_id,
    value: row.value ?? 0,
    name: row.name || "Người học",
    avatarUrl: row.avatar_url ?? null,
  }));
}

export async function getMyCompetencyLeaderboardRank(
  lessonIds: number[],
  userId: string
): Promise<{ rank: number; value: number } | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_my_competency_leaderboard_rank", {
    p_lesson_ids: lessonIds,
    p_user_id: userId,
  });

  if (error && isMissingTableError(error)) return null;
  if (error) throw handleSupabaseError(error);

  const row = (data as { rank: number; value: number }[] | null)?.[0];
  return row ? { rank: row.rank, value: row.value } : null;
}

// XP earned since a given timestamp (lessons*10 + quiz + game xp) -
// used for weekly/monthly leaderboards, same computation as
// app/api/cron/send-weekly-digest/route.ts's getWeeklyStats, moved server-side.
export async function getXpLeaderboardSince(since: Date, limit: number = 10): Promise<LeaderboardRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_xp_leaderboard_since", { p_since: since.toISOString(), p_limit: limit });

  if (error && isMissingTableError(error)) return [];
  if (error) throw handleSupabaseError(error);

  return ((data ?? []) as { user_id: string; name: string; value: number; avatar_url: string | null }[]).map((row) => ({
    user_id: row.user_id,
    value: row.value ?? 0,
    name: row.name || "Người học",
    avatarUrl: row.avatar_url ?? null,
  }));
}

export async function getMyXpRankSince(since: Date, userId: string): Promise<{ rank: number; value: number } | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_my_xp_rank_since", { p_since: since.toISOString(), p_user_id: userId });

  if (error && isMissingTableError(error)) return null;
  if (error) throw handleSupabaseError(error);

  const row = (data as { rank: number; value: number }[] | null)?.[0];
  return row ? { rank: row.rank, value: row.value } : null;
}

// Ranked among accepted friends only (plus the caller). No separate "my
// rank" call - friend lists are small enough that the caller's own row is
// just visible directly in this result.
export async function getFriendsLeaderboard(metric: LeaderboardMetric): Promise<LeaderboardRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_friends_leaderboard", { p_metric: metric });

  if (error && isMissingTableError(error)) return [];
  if (error) throw handleSupabaseError(error);

  return ((data ?? []) as { user_id: string; name: string; value: number; avatar_url: string | null }[]).map((row) => ({
    user_id: row.user_id,
    value: row.value ?? 0,
    name: row.name || "Người học",
    avatarUrl: row.avatar_url ?? null,
  }));
}

export interface LevelTopUser {
  name: string;
  avatarUrl: string | null;
  xp: number;
}

export interface LevelStats {
  levelCounts: Record<number, number>;
  topUsersByLevel: Record<number, LevelTopUser[]>;
  totalUsers: number;
  myRank: number | null;
  myTopPercent: number | null; // e.g. 12 means "top 12%"
}

// Powers the level roadmap card: how many users sit at each level, the top
// XP earners within each level (for the hover card), plus the current
// user's XP rank -> "top X%". Degrades to null (roadmap just hides the
// counts/percentile/hover) if the RPC hasn't been migrated in yet, same
// pattern as the leaderboard's isMissingTableError.
export async function getLevelStats(userId?: string): Promise<LevelStats | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_level_stats", { p_user_id: userId ?? null });

  if (error) {
    if (isMissingTableError(error) || error.code === "PGRST202" || error.code === "42883") {
      return null;
    }
    throw handleSupabaseError(error);
  }

  const rows = (data ?? []) as {
    level: number;
    user_count: number;
    total_users: number;
    my_rank: number | null;
    top_users: { name: string; avatar_url: string | null; xp: number }[] | null;
  }[];
  if (rows.length === 0) return null;

  const levelCounts: Record<number, number> = {};
  const topUsersByLevel: Record<number, LevelTopUser[]> = {};
  for (const row of rows) {
    levelCounts[row.level] = row.user_count;
    topUsersByLevel[row.level] = (row.top_users ?? []).map((u) => ({
      name: u.name,
      avatarUrl: u.avatar_url,
      xp: u.xp,
    }));
  }

  const totalUsers = rows[0].total_users ?? 0;
  const myRank = rows[0].my_rank ?? null;
  const myTopPercent =
    myRank !== null && totalUsers > 0 ? Math.max(1, Math.round((myRank / totalUsers) * 100)) : null;

  return { levelCounts, topUsersByLevel, totalUsers, myRank, myTopPercent };
}

// Cập nhật stats từ progress
// Shared with client components (UserStats, DashboardClient) so their
// locally-computed getLevelByXp(xp, cfaCompleted) matches what
// recalculateUserStats actually persisted as current_level, instead of
// silently defaulting cfaCompleted to 0 and under-displaying the L9+ gate.
export async function getCfaCompletedCount(userId: string): Promise<number> {
  const supabase = createClient();
  const [progressRes, cfaModuleRes] = await Promise.all([
    supabase.from("user_progress").select("lesson_id").eq("user_id", userId).eq("completed", true),
    supabase.from("cfa_module_progress").select("module_id").eq("user_id", userId).eq("completed", true),
  ]);
  const cfaLessonsDone = (progressRes.data ?? []).filter((p) => CFA_LESSON_IDS.has(p.lesson_id)).length;
  const cfaModulesDone = cfaModuleRes.data?.length ?? 0;
  return cfaLessonsDone + cfaModulesDone;
}

export async function recalculateUserStats(userId: string) {
  const supabase = createClient();

  // Lấy tất cả progress của user
  const { data: progress, error: progressError } = await supabase
    .from("user_progress")
    .select("completed, quiz_score, lesson_id")
    .eq("user_id", userId)
    .eq("completed", true);

  if (progressError) {
    throw handleSupabaseError(progressError);
  }

  const lessonsCompleted = progress?.length || 0;

  // A referral converts (both sides get their one-time XP bonus) once the
  // referred person has real engagement, not just a signup - completing
  // their first lesson. Checked/rewarded here, every recompute, rather than
  // only at the exact moment a lesson completes, so it's covered by the
  // same self-heal this function already provides for quiz/game XP.
  if (lessonsCompleted >= 1) {
    await rewardMyReferralIfPending();
  }

  // 10 XP per lesson, plus whatever's accumulated from standalone "Kiểm
  // tra" quiz sessions (lib/supabase-quiz-sessions.ts) - added here rather
  // than written once at quiz-completion time, since this function
  // recomputes total_xp from scratch on every call and would otherwise
  const [
    quizXp,
    gameXp,
    referralXp,
    gameSessionsRes,
    questXp,
    milestonesRes,
    recallsRes,
    chestXp,
    cfaModuleProgressRes,
    userStatsRes,
    careerMissionXp,
  ] = await Promise.all([
    getTotalQuizXp(userId).catch(() => 0), // "Kiểm tra" standalone quiz sessions
    getTotalGameXp(userId).catch(() => 0), // best-per-game mini-game XP (lib/games.ts)
    getTotalReferralXp(userId).catch(() => 0), // "Mời bạn học cùng" bonus - see lib/referrals.ts
    Promise.resolve(supabase.from("game_sessions").select("score, total").eq("user_id", userId)).catch(() => ({ data: null, error: null })),
    getTotalQuestXp(userId).catch(() => 0),
    Promise.resolve(supabase.from("user_milestone_exams").select("score").eq("user_id", userId)).catch(() => ({ data: null, error: null })),
    Promise.resolve(supabase.from("user_lesson_recalls").select("recall_stage").eq("user_id", userId)).catch(() => ({ data: null, error: null })),
    // "Rương quà" (chest) XP - see lib/chests.ts
    getTotalChestXp(userId).catch(() => 0),
    // Completed CFA modules
    Promise.resolve(supabase.from("cfa_module_progress").select("module_id").eq("user_id", userId).eq("completed", true)).catch(() => ({ data: null, error: null })),
    // XP permanently spent on streak restores
    Promise.resolve(supabase.from("user_stats").select("xp_spent").eq("user_id", userId).maybeSingle()).catch(() => ({ data: null, error: null })),
    // Weekly Career Mission payouts - see lib/weekly-career-mission.ts. The
    // ledger is written only by app/api/career-profile/claim/route.ts, which
    // re-derives both the amount and the "is it actually complete" check
    // server-side, so the sum needs no extra cap here.
    getTotalCareerMissionXp(userId).catch(() => 0),
  ]);

  // Academic game bonus: +3 XP for 100% correct, +1 XP for >= 80% correct, capped at +30 XP overall.
  let gameAcademicBonusXp = 0;
  const gameSessions = (gameSessionsRes as { data: { score: number; total: number }[] | null })?.data;

  if (gameSessions) {
    let perfectCount = 0;
    let highCount = 0;
    for (const session of gameSessions) {
      if (session.total > 0) {
        const ratio = session.score / session.total;
        if (ratio === 1) {
          perfectCount++;
        } else if (ratio >= 0.8) {
          highCount++;
        }
      }
    }
    gameAcademicBonusXp = Math.min(30, perfectCount * 3 + highCount * 1);
  }

  // Milestone Exam XP: +50 XP per milestone with score >= 0.8
  let milestoneXp = 0;
  try {
    const milestones = (milestonesRes as { data: { score: number }[] | null })?.data;
    if (milestones) {
      milestoneXp = milestones.filter((m) => Number(m.score) >= 0.8).length * 50;
    } else if (typeof window !== "undefined") {
      // Fallback: check all milestone tracks in localStorage
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(`milestones_${userId}_`)) {
          try {
            const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]");
            milestoneXp += parsed.filter((m: { score?: unknown }) => Number(m.score) >= 0.8).length * 50;
          } catch {}
        }
      }
    }
  } catch (err) {
    console.error("Error reading milestones for XP:", err);
  }

  // lib/track-stages.ts defines 26 stage labels across both tracks, so 1300
  // is the ceiling a real account can reach. track_id/stage_label are free
  // text written from the client, so this bounds the damage if someone gets
  // past the row cap in 20260813_harden_quest_and_recall_xp.sql (and bounds
  // the localStorage fallback path above, which has no DB constraint at all).
  milestoneXp = Math.min(1300, milestoneXp);

  // Active Recall XP: +10 XP per successfully completed recall level (recall_stage - 1)
  let recallXp = 0;
  try {
    const recalls = (recallsRes as { data: { recall_stage: number }[] | null })?.data;
    if (recalls) {
      recallXp = recalls.reduce((sum, r) => sum + Math.max(0, Number(r.recall_stage) - 1) * 10, 0);
    } else if (typeof window !== "undefined") {
      const localData = window.localStorage.getItem(`lesson_recalls_${userId}`);
      if (localData) {
        const parsed = JSON.parse(localData);
        recallXp = parsed.reduce((sum: number, r: { recall_stage?: unknown }) => sum + Math.max(0, Number(r.recall_stage) - 1) * 10, 0);
      }
    }
  } catch (err) {
    console.error("Error reading recalls for XP:", err);
  }

  const cfaLessonsDone = (progress ?? []).filter((p) => CFA_LESSON_IDS.has(p.lesson_id)).length;
  const cfaModulesData = (cfaModuleProgressRes as { data: { module_id: string }[] | null })?.data;
  const cfaModulesDone = cfaModulesData?.length ?? 0;
  const cfaCompletedCount = cfaLessonsDone + cfaModulesDone;

  // Clamped at 0 because this value is *subtracted*: user_stats.xp_spent has
  // no CHECK and the client holds UPDATE on the table, so a negative value
  // would flip the minus into a bonus and mint XP without touching any
  // activity table. 20260816_bound_xp_ledger_sources.sql adds the DB-side
  // constraint; this keeps the formula honest before that migration lands.
  const xpSpent = Math.max(0, (userStatsRes as { data: { xp_spent: number } | null })?.data?.xp_spent ?? 0);
  const totalXp = Math.max(
    0,
    (lessonsCompleted + cfaModulesDone) * XP_PER_LESSON + quizXp + gameXp + referralXp + gameAcademicBonusXp + questXp + milestoneXp + recallXp + chestXp + careerMissionXp - xpSpent
  );
  const quizScores = progress?.filter((p) => p.quiz_score !== null).map((p) => p.quiz_score) || [];
  const avgScore = quizScores.length > 0 ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length : 0;

  const currentLevel = getLevelByXp(totalXp, cfaCompletedCount).level;

  // Cập nhật user_profiles + user_stats
  const [, stats] = await Promise.all([
    updateUserProfile(userId, {
      lessons_completed: lessonsCompleted + cfaModulesDone,
      total_xp: totalXp,
      current_level: currentLevel,
      avg_quiz_score: Math.round(avgScore * 100) / 100,
    }).catch(() => null),
    upsertUserStats(userId, {
      total_lessons_completed: lessonsCompleted + cfaModulesDone,
      total_xp: totalXp,
      current_level: currentLevel,
      avg_quiz_score: Math.round(avgScore * 100) / 100,
    }).catch(() => null),
  ]);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("thtcdn:xp-updated", { detail: { currentLevel, totalXp } }));
  }

  return stats;
}
