import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import HomePage from "@/components/home/HomePage";

export const dynamic = "force-dynamic";

// Logged-in visitors go straight to the dashboard. Signed-out visitors get
// the actual marketing landing page here (not a redirect to /login) - /login
// is now a dedicated, minimal auth screen, not the site's front door.
export default async function RootPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return <HomePage />;
}
