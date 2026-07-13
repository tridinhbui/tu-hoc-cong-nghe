import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

/** Lesson ids the user has unlocked by passing their gate challenge. */
export async function getChallengePassedLessonIds(userId: string): Promise<number[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_challenge_passes")
    .select("lesson_id")
    .eq("user_id", userId);

  if (error && isMissingTableError(error)) return [];
  if (error) throw handleSupabaseError(error);

  return (data ?? []).map((r) => r.lesson_id as number);
}

export interface QuizAnswerSubmission {
  token: string;
  selected: number;
}

// Grades a lesson-unlock gate challenge server-side instead of trusting a
// client-computed score/pass - direct insert into user_challenge_passes is
// revoked for `authenticated` (see
// supabase/migrations/20260714_harden_quiz_writes.sql) so a passing result
// can no longer be fabricated to unlock a locked lesson without actually
// answering correctly. Returns the server's own verdict; callers must gate
// on the returned `passed`, not a locally-computed one.
export async function submitGateChallenge(
  lessonId: number,
  answers: QuizAnswerSubmission[]
): Promise<{ score: number; total: number; passed: boolean }> {
  const res = await fetch("/api/knowledge-challenge/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "gate", lessonId, answers }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Failed to submit gate challenge (${res.status})`);
  }

  return res.json();
}
