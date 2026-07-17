"use client";

import { useEffect } from "react";
import { pingPresence } from "@/lib/presence";

const HEARTBEAT_INTERVAL_MS = 60_000;

/** Pings presence on mount and every 60s while the tab is open/visible. */
export function usePresenceHeartbeat(userId: string | null | undefined) {
  useEffect(() => {
    if (!userId) return;

    void pingPresence(userId);
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void pingPresence(userId);
    }, HEARTBEAT_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [userId]);
}
