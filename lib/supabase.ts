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
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return disabledSupabaseClient;

  if (!client) {
    client = createBrowserClient(url, key);
  }
  return client;
}

const emptyResult = Promise.resolve({ data: null, error: null });
const emptyListResult = Promise.resolve({ data: [], error: null });

function chain(): unknown {
  const target = {
    then: emptyListResult.then.bind(emptyListResult),
    catch: emptyListResult.catch.bind(emptyListResult),
    finally: emptyListResult.finally.bind(emptyListResult),
  };
  return new Proxy(target, {
    get(obj, prop) {
      if (prop in obj) return obj[prop as keyof typeof obj];
      if (prop === "single" || prop === "maybeSingle") return () => emptyResult;
      if (prop === "throwOnError") return () => chain();
      return () => chain();
    },
  });
}

const disabledSupabaseClient = {
  auth: {
    async getSession() {
      return { data: { session: null }, error: null };
    },
    async getUser() {
      return { data: { user: null }, error: null };
    },
    async signOut() {
      return { error: null };
    },
    async updateUser() {
      return { data: { user: null }, error: null };
    },
    onAuthStateChange() {
      return { data: { subscription: { unsubscribe() {} } } };
    },
  },
  from() {
    return chain();
  },
  rpc() {
    return emptyListResult;
  },
  channel() {
    return chain();
  },
  removeChannel() {
    return "ok";
  },
  storage: {
    from() {
      return chain();
    },
  },
} as unknown as SupabaseClient;
