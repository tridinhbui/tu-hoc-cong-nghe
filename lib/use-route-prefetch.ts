"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type RoutePrefetchOptions = {
  enabled?: boolean;
  delayMs?: number;
};

function scheduleIdleTask(task: () => void, delayMs: number) {
  if (typeof window === "undefined") return () => {};

  const idleWindow = window as Window & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

  if (typeof idleWindow.requestIdleCallback === "function") {
    const id = idleWindow.requestIdleCallback(task, { timeout: delayMs });
    return () => idleWindow.cancelIdleCallback?.(id);
  }

  const timeoutId = window.setTimeout(task, delayMs);
  return () => window.clearTimeout(timeoutId);
}

export function useRoutePrefetch(routes: string[], options: RoutePrefetchOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const { enabled = true, delayMs = 300 } = options;
  const routeKey = routes.join("|");
  const routesRef = useRef(routes);

  useEffect(() => {
    routesRef.current = routes;
  }, [routeKey, routes]);

  useEffect(() => {
    if (!enabled) return;
    if (!pathname || pathname.startsWith("/login") || pathname.startsWith("/auth")) return;

    const uniqueRoutes = [...new Set(routesRef.current)].filter((href) => href !== pathname);
    if (uniqueRoutes.length === 0) return;

    let cancelled = false;
    const cancelTask = scheduleIdleTask(() => {
      if (cancelled) return;
      uniqueRoutes.forEach((href) => {
        try {
          router.prefetch(href);
        } catch (error) {
          console.error("Error prefetching route:", href, error);
        }
      });
    }, delayMs);

    return () => {
      cancelled = true;
      cancelTask();
    };
  }, [delayMs, enabled, pathname, routeKey, router]);
}
