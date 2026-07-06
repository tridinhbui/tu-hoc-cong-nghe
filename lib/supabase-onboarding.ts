import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

export interface UserOnboarding {
  id: string;
  user_id: string;
  completed: boolean;
  selected_track: "personal" | "professional" | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Check if user has completed onboarding
 */
export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_onboarding")
    .select("completed")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw handleSupabaseError(error);
  }

  return data?.completed || false;
}

/**
 * Mark onboarding as completed
 */
export async function completeOnboarding(
  userId: string,
  selectedTrack: "personal" | "professional"
): Promise<UserOnboarding> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_onboarding")
    .upsert([
      {
        user_id: userId,
        completed: true,
        selected_track: selectedTrack,
        completed_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    throw handleSupabaseError(error);
  }

  return data as UserOnboarding;
}

/**
 * Get user's selected track from onboarding
 */
export async function getUserSelectedTrack(userId: string): Promise<"personal" | "professional" | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_onboarding")
    .select("selected_track")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw handleSupabaseError(error);
  }

  return data?.selected_track || null;
}
