import { createClient } from "@/lib/supabase";

export interface UserRankData {
  id: string;
  email: string;
  name: string;
  xp: number;
  lessonsCompleted: number;
  avgQuizScore: number;
}

// Get all users ranked by XP (client-side for now)
export async function getLeaderboardData(): Promise<UserRankData[]> {
  const supabase = createClient();

  // Fetch all users from auth (limited - in production, use a dedicated users table)
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  if (error || !users) {
    return [];
  }

  // Transform auth users to ranked data
  // In production, join with a user_stats table for real data
  const userData: UserRankData[] = users.map((user) => ({
    id: user.id,
    email: user.email || "",
    name: user.user_metadata?.full_name || user.email || "Người dùng",
    xp: user.user_metadata?.xp || 0,
    lessonsCompleted: user.user_metadata?.lessonsCompleted || 0,
    avgQuizScore: user.user_metadata?.avgQuizScore || 0,
  }));

  // Sort by XP descending
  return userData.sort((a, b) => b.xp - a.xp);
}

// Get current user's rank
export function getUserRank(users: UserRankData[], currentUserId: string): number {
  const index = users.findIndex((u) => u.id === currentUserId);
  return index >= 0 ? index + 1 : 0;
}
