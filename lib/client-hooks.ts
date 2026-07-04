"use client";

import { useSyncExternalStore, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, type User } from "./auth";
import { getProgress, type Progress } from "./progress";

const noopSubscribe = () => () => {};

// Cache snapshots so useSyncExternalStore gets referentially stable values
let cachedSession: import("./auth").User | null | undefined = undefined;
let cachedSessionRaw: string | null = null;

function getSessionSnapshot(): import("./auth").User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("thtcdn_session");
  if (raw === cachedSessionRaw && cachedSession !== undefined) return cachedSession;
  cachedSessionRaw = raw;
  try { cachedSession = raw ? JSON.parse(raw) : null; } catch { cachedSession = null; }
  return cachedSession ?? null;
}

let cachedProgress: import("./progress").Progress | undefined = undefined;
let cachedProgressRaw: string | null = null;

function getProgressSnapshot(): import("./progress").Progress {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  const raw = localStorage.getItem("thtcdn_progress");
  if (raw === cachedProgressRaw && cachedProgress !== undefined) return cachedProgress;
  cachedProgressRaw = raw;
  try { cachedProgress = raw ? JSON.parse(raw) : EMPTY_PROGRESS; } catch { cachedProgress = EMPTY_PROGRESS; }
  return cachedProgress ?? EMPTY_PROGRESS;
}

const EMPTY_PROGRESS: Progress = {
  completedLessons: [],
  streak: 0,
  lastStudiedDate: null,
  totalMinutes: 0,
};

export function useSession(): User | null {
  return useSyncExternalStore(noopSubscribe, getSessionSnapshot, () => null);
}

export function useProgress(): Progress {
  return useSyncExternalStore(noopSubscribe, getProgressSnapshot, () => EMPTY_PROGRESS);
}

export function useRequireAuth(): User | null {
  const router = useRouter();
  const user = useSession();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  return user;
}
