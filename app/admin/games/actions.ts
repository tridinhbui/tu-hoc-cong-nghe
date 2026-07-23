"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

async function getAdminOrServerSupabase() {
  try {
    return createAdminClient();
  } catch {
    return await createServerSupabaseClient();
  }
}

export interface GameSessionStats {
  totalGamesPlayed: number;
  totalPlayersEngaged: number;
  averageScorePerGame: number;
  totalXpFromGames: number;
  mostPlayedGame: string;
  dailyActiveGamers: number;
  gameTypeStats: Array<{
    gameType: string;
    timesPlayed: number;
    totalXp: number;
    averageXp: number;
    averageScore: number;
  }>;
}

export async function getGameSessionStats(): Promise<GameSessionStats> {
  const supabase = await getAdminOrServerSupabase();

  try {
    // Total games played
    const { data: totalData, error: totalError } = await supabase
      .from("game_sessions")
      .select("id", { count: "exact" });

    if (totalError) throw totalError;
    const totalGamesPlayed = totalData?.length || 0;

    // Unique players
    const { data: playersData, error: playersError } = await supabase
      .from("game_sessions")
      .select("user_id", { count: "exact" })
      .not("user_id", "is", null);

    if (playersError) throw playersError;

    // Get unique player count
    const { data: uniquePlayersData, error: uniqueError } = await supabase
      .from("game_sessions")
      .select("user_id")
      .not("user_id", "is", null)
      .then((res) => {
        if (res.error) throw res.error;
        const uniqueIds = new Set((res.data || []).map((d) => d.user_id));
        return { data: Array.from(uniqueIds), error: null };
      });

    const totalPlayersEngaged = uniquePlayersData?.length || 0;

    // Average score and total XP
    const { data: statsData, error: statsError } = await supabase
      .from("game_sessions")
      .select("xp_earned, score, game_type");

    if (statsError) throw statsError;

    const sessions = statsData || [];
    const totalXpFromGames = sessions.reduce((sum, s) => sum + (s.xp_earned || 0), 0);
    const averageScorePerGame = sessions.length > 0 ? Math.round(sessions.reduce((sum, s) => sum + (s.score || 0), 0) / sessions.length) : 0;

    // Most played game
    const gameTypeCounts: Record<string, number> = {};
    sessions.forEach((s) => {
      if (s.game_type) {
        gameTypeCounts[s.game_type] = (gameTypeCounts[s.game_type] || 0) + 1;
      }
    });

    const mostPlayedGame = Object.entries(gameTypeCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";

    // Daily active gamers (played in last 24 hours)
    const { data: dailyData, error: dailyError } = await supabase
      .from("game_sessions")
      .select("user_id")
      .gt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (dailyError) throw dailyError;

    const dailyActiveSet = new Set((dailyData || []).map((d) => d.user_id));
    const dailyActiveGamers = dailyActiveSet.size;

    // Game type breakdown
    const gameTypeStats = Object.entries(gameTypeCounts).map(([gameType, timesPlayed]) => {
      const gameTypeSessions = sessions.filter((s) => s.game_type === gameType);
      const totalXp = gameTypeSessions.reduce((sum, s) => sum + (s.xp_earned || 0), 0);
      const averageXp = gameTypeSessions.length > 0 ? Math.round(totalXp / gameTypeSessions.length) : 0;
      const averageScore = gameTypeSessions.length > 0 ? Math.round(gameTypeSessions.reduce((sum, s) => sum + (s.score || 0), 0) / gameTypeSessions.length) : 0;

      return {
        gameType,
        timesPlayed,
        totalXp,
        averageXp,
        averageScore,
      };
    });

    return {
      totalGamesPlayed,
      totalPlayersEngaged,
      averageScorePerGame,
      totalXpFromGames,
      mostPlayedGame,
      dailyActiveGamers,
      gameTypeStats: gameTypeStats.sort((a, b) => b.timesPlayed - a.timesPlayed),
    };
  } catch (error) {
    console.error("Error fetching game stats:", error);
    throw error;
  }
}

export async function getGamePerformanceByType(gameType: string) {
  const supabase = await getAdminOrServerSupabase();

  try {
    const { data, error } = await supabase
      .from("game_sessions")
      .select("user_id, xp_earned, score, difficulty, created_at")
      .eq("game_type", gameType)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;

    const sessions = data || [];

    // Breakdown by difficulty
    const difficultyStats: Record<string, { count: number; avgXp: number; avgScore: number }> = {};

    sessions.forEach((s) => {
      const diff = s.difficulty || "unknown";
      if (!difficultyStats[diff]) {
        difficultyStats[diff] = { count: 0, avgXp: 0, avgScore: 0 };
      }
      difficultyStats[diff].count++;
      difficultyStats[diff].avgXp += s.xp_earned || 0;
      difficultyStats[diff].avgScore += s.score || 0;
    });

    // Normalize averages
    Object.keys(difficultyStats).forEach((key) => {
      const count = difficultyStats[key].count;
      difficultyStats[key].avgXp = Math.round(difficultyStats[key].avgXp / count);
      difficultyStats[key].avgScore = Math.round(difficultyStats[key].avgScore / count);
    });

    return {
      totalSessions: sessions.length,
      difficultyBreakdown: difficultyStats,
      recentSessions: sessions.slice(0, 10),
    };
  } catch (error) {
    console.error("Error fetching game performance:", error);
    throw error;
  }
}
