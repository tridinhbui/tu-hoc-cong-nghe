"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import ChatWithAdminWidget from "./ChatWithAdminWidget";
import FloatingStudyGroupChat from "./FloatingStudyGroupChat";
import { usePathname } from "next/navigation";

export default function GlobalChatWrapper() {
  const [user, setUser] = useState<User | null>(null);
  const [activeChatWidget, setActiveChatWidget] = useState<"admin" | "group" | null>(null);
  const supabase = createClient();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Hide chat widgets on auth pages
  if (!user || pathname === "/login" || pathname === "/auth/reset-password") {
    return null;
  }

  return (
    <>
      <ChatWithAdminWidget
        isOpen={activeChatWidget === "admin"}
        onOpenChange={(open) => setActiveChatWidget(open ? "admin" : null)}
        hideTrigger={activeChatWidget === "group"}
      />
      <FloatingStudyGroupChat
        isOpen={activeChatWidget === "group"}
        onOpenChange={(open) => setActiveChatWidget(open ? "group" : null)}
        hideTrigger={activeChatWidget === "admin"}
      />
    </>
  );
}
