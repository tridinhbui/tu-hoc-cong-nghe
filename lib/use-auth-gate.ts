"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";

// Shared client-side auth gate for pages that require a signed-in user
// (mirrors the pattern in components/DashboardClient.tsx). Resolves via the
// INITIAL_SESSION event instead of calling getSession() directly - a
// freshly-created browser client (e.g. right after redirecting from /login)
// can report a false "no session" before it finishes parsing the just-set
// auth cookie, so waiting for that event removes the race instead of just
// narrowing it. Redirects to /login if there's truly no session.
export function useAuthGate() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    const checkAuth = async () => {
      const session = await new Promise<Session | null>((resolve) => {
        let settled = false;
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, s) => {
          if (settled) return;
          if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
            settled = true;
            subscription.unsubscribe();
            resolve(s);
          }
        });
        setTimeout(async () => {
          if (settled) return;
          settled = true;
          subscription.unsubscribe();
          const {
            data: { session: fallback },
          } = await supabase.auth.getSession();
          resolve(fallback);
        }, 3000);
      });

      if (cancelled) return;
      if (!session) {
        router.replace("/login");
        return;
      }
      setUserId(session.user.id);
      setChecking(false);
    };

    checkAuth();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return { userId, checking };
}
