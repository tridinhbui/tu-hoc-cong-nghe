import { createClient } from "./supabase";
import { getUserPassedExams, type UserExamRecord } from "./level-exams";

export interface LevelExamRow {
  level: number;
  score: number;
  source: "server_graded" | "legacy_local";
  passed_at: string;
}

export interface PassedLevelExam extends UserExamRecord {
  /** Whether the pass was graded by the server or imported from localStorage. */
  source: "server_graded" | "legacy_local";
}

function isMissingTableError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === "PGRST205" ||
    error.code === "42P01" ||
    Boolean(error.message?.includes("does not exist"))
  );
}

/**
 * Passed promotion exams for a user, keyed by level - the DB-backed replacement
 * for getUserPassedExams(). Falls back to the localStorage records so a learner
 * on an environment where the migration has not run yet still sees their passes.
 */
export async function getPassedLevelExams(userId: string): Promise<Record<number, PassedLevelExam>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_level_exams")
    .select("level, score, source, passed_at")
    .eq("user_id", userId);

  if (error) {
    if (!isMissingTableError(error)) {
      console.error("Error reading level exams:", error);
    }
    const local = getUserPassedExams(userId);
    const fallback: Record<number, PassedLevelExam> = {};
    for (const key of Object.keys(local)) {
      fallback[Number(key)] = { ...local[Number(key)], source: "legacy_local" };
    }
    return fallback;
  }

  const records: Record<number, PassedLevelExam> = {};
  for (const row of (data ?? []) as LevelExamRow[]) {
    records[row.level] = {
      passedLevel: row.level,
      passedAt: new Date(row.passed_at).getTime(),
      score: row.score,
      source: row.source,
    };
  }
  return records;
}

export interface ServedExamQuestion {
  id: string;
  question: string;
  options: string[];
  token: string;
}

export interface ServedExam {
  level: number;
  title: string;
  badgeEmoji: string;
  minPassPercentage: number;
  timeLimitSeconds: number;
  questions: ServedExamQuestion[];
}

/**
 * Fetches an exam from the server. Questions arrive shuffled with an opaque
 * answer token each - no correct index, no explanation (see
 * app/api/level-exam/route.ts).
 */
export async function fetchLevelExam(level: number): Promise<ServedExam> {
  const response = await fetch(`/api/level-exam?level=${level}`, { cache: "no-store" });
  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    throw new Error(detail?.error || "Không tải được đề thi. Vui lòng thử lại.");
  }
  return (await response.json()) as ServedExam;
}

export interface ExamReviewEntry {
  qid: string;
  correctIndex: number | null;
  selected: number;
  correct: boolean;
}

export interface LevelExamResult {
  correct: number;
  total: number;
  percent: number;
  passed: boolean;
  expired: boolean;
  minPassPercentage: number;
  review: ExamReviewEntry[];
  explanations: Record<string, string>;
}

/**
 * Submits an attempt for server-side grading. The score comes back from the
 * server - it is never computed here, and passing writes the certification
 * row server-side.
 */
export async function submitLevelExam(
  level: number,
  answers: { token: string; selected: number }[]
): Promise<LevelExamResult> {
  const response = await fetch("/api/level-exam/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ level, answers }),
  });
  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    throw new Error(detail?.error || "Không nộp được bài thi. Vui lòng thử lại.");
  }
  return (await response.json()) as LevelExamResult;
}

/**
 * Pushes promotion-exam passes that only exist in localStorage up to the
 * server, flagged as unverified. Safe to call repeatedly - the server skips any
 * level it already has a row for. Returns how many rows were imported.
 */
export async function syncLocalLevelExams(userId: string): Promise<number> {
  const local = getUserPassedExams(userId);
  const records = Object.keys(local).map((key) => local[Number(key)]);
  if (records.length === 0) return 0;

  const response = await fetch("/api/level-exam/import-legacy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ records }),
  });
  if (!response.ok) return 0;

  const result = (await response.json().catch(() => null)) as { imported?: number } | null;
  return result?.imported ?? 0;
}
