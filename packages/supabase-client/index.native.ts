import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

// React Native build of this package (Metro prefers *.native.ts over index.ts
// automatically). createBrowserClient from @supabase/ssr (used in index.ts)
// relies on document.cookie/window.localStorage, neither of which exist in
// RN, so sessions from that client don't actually survive an app restart.
// This client persists the session in AsyncStorage instead, and disables
// detectSessionInUrl (no browser URL to inspect on RN).
let client: SupabaseClient | undefined;

function getEnvVar(varName: string): string {
  if (typeof process !== "undefined" && process.env[`EXPO_PUBLIC_${varName}`]) {
    return process.env[`EXPO_PUBLIC_${varName}`]!;
  }
  return "";
}

export function createClient() {
  if (!client) {
    const url = getEnvVar("SUPABASE_URL");
    const key = getEnvVar("SUPABASE_ANON_KEY");

    if (!url || !key) {
      throw new Error("Missing Supabase credentials. Check .env.local.");
    }

    client = createSupabaseClient(url, key, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}

export function getSupabaseClient() {
  return client;
}

export function resetClient() {
  client = undefined;
}
