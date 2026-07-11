import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

// Singleton: ~20 components each called createClient() independently,
// meaning every mount created its own GoTrueClient instance - Supabase warns
// against this ("Multiple GoTrueClient instances detected") because each
// instance runs its own auth-refresh timer/lock against the same
// localStorage-backed session. With several alive at once (e.g. dashboard
// components plus whatever the previous page mounted, still tearing down),
// one instance could observe a session mid-refresh from another and briefly
// report null - this is what caused the login-page flash when navigating
// back from /tai-lieu to /dashboard: DashboardClient's auth check raced a
// stale instance and lost. A single shared client removes the race.
let client: SupabaseClient | undefined;

export function createClient() {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return client;
}
