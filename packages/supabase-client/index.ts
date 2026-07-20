import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

function getEnvVar(varName: string): string {
  // Try Next.js naming
  if (typeof process !== "undefined" && process.env[`NEXT_PUBLIC_${varName}`]) {
    return process.env[`NEXT_PUBLIC_${varName}`]!;
  }
  // Try Expo naming
  if (typeof process !== "undefined" && process.env[`EXPO_PUBLIC_${varName}`]) {
    return process.env[`EXPO_PUBLIC_${varName}`]!;
  }
  // Try React Native naming
  if (typeof process !== "undefined" && process.env[`REACT_APP_${varName}`]) {
    return process.env[`REACT_APP_${varName}`]!;
  }
  return "";
}

export function createClient() {
  if (!client) {
    const url = getEnvVar("SUPABASE_URL");
    const key = getEnvVar("SUPABASE_ANON_KEY");

    if (!url || !key) {
      throw new Error("Missing Supabase credentials. Check .env files.");
    }

    client = createBrowserClient(url, key);
  }
  return client;
}

export function getSupabaseClient() {
  return client;
}

export function resetClient() {
  client = undefined;
}
