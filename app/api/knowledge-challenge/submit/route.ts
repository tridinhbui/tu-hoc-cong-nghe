import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { verifyQuestionToken } from "@/lib/quiz-tokens";
import { STANDALONE_QUIZ_DAILY_XP_CAP, computeQuizXp } from "@/lib/supabase-quiz-sessions";

// Server-authoritative grading for both the standalone /kiem-tra quiz and
// the lesson-unlock gate challenge (components/KnowledgeChallengeModal.tsx).
// Both used to insert a client-computed score/xp/pass straight into
// Supabase from the browser - anyone could open devtools and write
// {score: 999, xp_earned: 999999} or fake a passing lesson-gate result.
// This route re-derives the score from signed per-question tokens (see
// lib/quiz-tokens.ts) and is the ONLY writer of these two tables now -
// direct insert from `authenticated` is revoked in
// supabase/migrations/20260714_harden_quiz_writes.sql, so this uses the
// service-role client to write on the verified user's behalf.

const MAX_ANSWERS = 50;
const GATE_PASS_RATIO = 0.6;
const VALID_TRACKS = new Set(["personal", "professional", "cfa"]);
const VALID_DIFFICULTIES = new Set(["de", "trung-binh", "kho", "tat-ca"]);

interface AnswerInput {
  token: string;
  selected: number;
}

function isAnswerInput(value: unknown): value is AnswerInput {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as AnswerInput).token === "string" &&
    typeof (value as AnswerInput).selected === "number"
  );
}

// Invalid/tampered tokens just score as wrong instead of failing the whole
// request - a single dropped/corrupted token shouldn't zero out an
// otherwise-legitimate submission.
function scoreAnswers(answers: AnswerInput[]): number {
  let score = 0;
  for (const answer of answers) {
    const payload = verifyQuestionToken(answer.token);
    if (payload && payload.correct === answer.selected) score++;
  }
  return score;
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.answers) || body.answers.length === 0 || body.answers.length > MAX_ANSWERS) {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }
  if (!body.answers.every(isAnswerInput)) {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }

  const answers: AnswerInput[] = body.answers;
  const score = scoreAnswers(answers);
  const total = answers.length;
  const admin = createAdminClient();

  if (body.mode === "gate") {
    const lessonId = Number(body.lessonId);
    if (!Number.isInteger(lessonId)) {
      return NextResponse.json({ error: "Invalid lessonId" }, { status: 400 });
    }

    const passed = score >= Math.ceil(total * GATE_PASS_RATIO);
    if (passed) {
      const { error } = await admin
        .from("user_challenge_passes")
        .upsert([{ user_id: user.id, lesson_id: lessonId, score, total }], { onConflict: "user_id,lesson_id" });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ score, total, passed });
  }

  // Default: standalone /kiem-tra quiz session.
  const track = body.track;
  const difficulty = body.difficulty;
  if (!VALID_TRACKS.has(track) || !VALID_DIFFICULTIES.has(difficulty)) {
    return NextResponse.json({ error: "Invalid track/difficulty" }, { status: 400 });
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { data: todayRows } = await admin
    .from("user_quiz_sessions")
    .select("xp_earned")
    .eq("user_id", user.id)
    .gte("completed_at", todayStart.toISOString());
  const earnedToday = (todayRows ?? []).reduce((sum, row) => sum + (Number(row.xp_earned) || 0), 0);
  const remainingDailyXp = Math.max(0, STANDALONE_QUIZ_DAILY_XP_CAP - earnedToday);
  const xpEarned = Math.min(computeQuizXp(score, total), remainingDailyXp);
  const { error } = await admin
    .from("user_quiz_sessions")
    .insert([{ user_id: user.id, track, difficulty, score, total, xp_earned: xpEarned }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ score, total, xpEarned });
}
