import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import RpgHubClient from "@/components/RpgHubClient";

export const dynamic = "force-dynamic";

export default async function RpgPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("full_name, email, avatar_url, total_xp, current_level, lessons_completed, coins")
    .eq("id", user.id)
    .single();

  const mergedProfile = {
    full_name: profile?.full_name || user.user_metadata?.full_name || null,
    email: profile?.email || user.email || "",
    avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url || null,
    total_xp: profile?.total_xp || 0,
    current_level: profile?.current_level || 1,
    lessons_completed: profile?.lessons_completed || 0,
    coins: profile?.coins || 0,
  };

  return <RpgHubClient userId={user.id} profile={mergedProfile} />;
}
