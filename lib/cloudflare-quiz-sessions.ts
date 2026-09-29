import { createClient } from "@/lib/cloudflare";
import { handleCloudflareError } from "@/lib/errors";

// "mock-interview" is a full timed interview run from
// components/MockInterviewModal.tsx, kept distinct from the 5-question "interview"
// drill on /kiem-tra because Interview readiness weights the two very
// differently (lib/career-competency.ts).
// "cert" là luyện một miền thi trên /chung-chi/<certId> - câu lấy từ quiz của
// đúng những bài thuộc miền đó (lib/cert-tracks.ts).
export type QuizTrack = "personal" | "professional" | "interview" | "mock-interview" | "cert";

/** Giá trị `track` cũ đã lưu trong user_quiz_sessions trước khi đổi tên. */
export const LEGACY_QUIZ_TRACK_ALIASES: Partial<Record<QuizTrack, string[]>> = { interview: ["ib"] };

/** Nhận cả id cũ từ client/URL: "ib" → "interview". */
export function normalizeQuizTrack(track: unknown): string | null {
  if (typeof track !== "string") return null;
  return track === "ib" ? "interview" : track;
}
export type QuizDifficulty = "de" | "trung-binh" | "kho" | "tat-ca";

// "Table not found in schema cache" (PostgREST) or "relation does not
// exist" (raw Postgres) - user_quiz_sessions is a new table
// (cloudflare/migrations/20260712_user_quiz_sessions.sql) that may not be
// applied to every environment yet. Quiz XP is a nice-to-have on top of
// lesson-completion XP, not something worth crashing the quiz page over,
// so a missing table degrades to "0 bonus XP" instead of throwing.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

// 5 XP per correct answer - a full 5-question quiz with a perfect score
// earns 25 XP, roughly 2.5x a single lesson completion (10 XP), which
// feels proportional to "reviewed material across a whole track" rather
// than "read one lesson".
const XP_PER_CORRECT_ANSWER = 5;
export const STANDALONE_QUIZ_DAILY_XP_CAP = 30;

/** XP mỗi câu đúng theo độ khó, để giao diện hiện "+5 XP / câu". Bản công nghệ
 *  không phân XP theo độ khó (computeQuizXp bên dưới), nên cả bốn mức bằng
 *  nhau - khai thành bảng để giao diện tra theo độ khó. */
export const QUIZ_XP_PER_CORRECT: Record<QuizDifficulty, number> = {
  de: XP_PER_CORRECT_ANSWER,
  "trung-binh": XP_PER_CORRECT_ANSWER,
  kho: XP_PER_CORRECT_ANSWER,
  "tat-ca": XP_PER_CORRECT_ANSWER,
};

export function computeQuizXp(score: number, total: number): number {
  if (total <= 0) return 0;
  return score * XP_PER_CORRECT_ANSWER;
}

export interface QuizAnswerSubmission {
  token: string;
  selected: number;
}

// Grades and records a quiz session server-side (app/api/knowledge-challenge/submit)
// instead of inserting a client-computed score/xp_earned directly - direct
// insert is revoked for `authenticated` (see
// cloudflare/migrations/20260714_harden_quiz_writes.sql) precisely so a
// score/XP value can no longer be fabricated from devtools. `answers` are
// the signed per-question tokens from the /api/knowledge-challenge
// response, each paired with the option index the learner picked - the
// server re-derives the score from those tokens, it never trusts a score
// computed in the browser.
export async function submitQuizSession(
  track: QuizTrack,
  difficulty: QuizDifficulty,
  answers: QuizAnswerSubmission[],
  /** Chỉ cho track "cert": miền đang luyện, để máy chủ ghi bằng chứng năng lực
   *  thực hành (lib/practical-skill.ts). Máy chủ chỉ tính câu thuộc đúng miền này. */
  certScope?: { cert: string; domain: string }
): Promise<{ score: number; total: number; xpEarned: number }> {
  const res = await fetch("/api/knowledge-challenge/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "quiz", track, difficulty, answers, ...certScope }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Failed to submit quiz session (${res.status})`);
  }

  return res.json();
}

/** Sum of XP earned from all past standalone quiz sessions - added on top
 *  of lesson-completion XP in recalculateUserStats. Returns 0 (not an
 *  error) if the table isn't there yet. */
export async function getTotalQuizXp(userId: string): Promise<number> {
  const cloudflare = createClient();
  const { data, error } = await cloudflare
    .from("user_quiz_sessions")
    .select("xp_earned")
    .eq("user_id", userId);

  if (error) {
    if (isMissingTableError(error)) return 0;
    throw handleCloudflareError(error);
  }
  return (data ?? []).reduce((sum, row) => sum + (row.xp_earned as number), 0);
}

/** Thống kê các lượt trắc nghiệm đứng riêng, tuỳ chọn lọc theo track - bảng
 *  "tiến độ của bạn" ở /phong-van-ky-thuat đọc từ đây thay vì số gõ cứng. */
export interface QuizStats {
  rounds: number;
  solved: number;
  correct: number;
  /** `null` khi chưa làm câu nào: khác với 0% (đã làm và sai hết). */
  accuracyPct: number | null;
  xp: number;
}

export const EMPTY_QUIZ_STATS: QuizStats = { rounds: 0, solved: 0, correct: 0, accuracyPct: null, xp: 0 };

export async function getQuizStats(userId: string, track?: QuizTrack): Promise<QuizStats> {
  const cloudflare = createClient();
  let query = cloudflare.from("user_quiz_sessions").select("score, total, xp_earned").eq("user_id", userId);
  if (track) query = query.in("track", [track, ...(LEGACY_QUIZ_TRACK_ALIASES[track] ?? [])]);
  const { data, error } = await query;
  if (error) {
    if (isMissingTableError(error)) return EMPTY_QUIZ_STATS;
    throw handleCloudflareError(error);
  }
  const list = (data ?? []) as { score: number; total: number; xp_earned: number }[];
  const solved = list.reduce((n, r) => n + (Number(r.total) || 0), 0);
  const correct = list.reduce((n, r) => n + (Number(r.score) || 0), 0);
  return {
    rounds: list.length,
    solved,
    correct,
    accuracyPct: solved > 0 ? Math.round((correct / solved) * 100) : null,
    xp: list.reduce((n, r) => n + (Number(r.xp_earned) || 0), 0),
  };
}
