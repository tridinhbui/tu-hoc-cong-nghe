import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-only client that reads the user's session from request cookies —
// use this in Route Handlers / Server Components instead of the browser
// client from lib/supabase.ts, which has no cookie jar to read on the server.
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a context where cookies can't be set (ignore).
          }
        },
      },
    }
  );
}
