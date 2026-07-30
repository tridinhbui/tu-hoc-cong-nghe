import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { LEVEL_EXAMS } from "@/lib/level-exams";
import { gradeExamAnswerToken } from "@/lib/level-exam-tokens";

// Server-authoritative grading for the promotion exam. The browser never sees
// a correct answer (see app/api/level-exam/route.ts) and never reports a score:
// this route re-derives it from the tokens it issued, then writes
// user_level_exams with the service-role client - `authenticated` has no
// INSERT/UPDATE on that table (20260818_user_level_exams.sql), so this is the
// only path that can record a pass.

// Grace on top of the level's time limit, covering clock skew and the time the
// request itself takes. Generous enough not to punish a slow connection.
const TIME_LIMIT_GRACE_SECONDS = 120;

interface AnswerInput {
  token: string;
  selected: number;
}

function isAnswerInput(value: unknown): value is AnswerInput {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as AnswerInput).token === "string" &&
    Number.isInteger((value as AnswerInput).selected)
  );
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
  const level = Number(body?.level);
  const config = LEVEL_EXAMS[level];
  if (!Number.isInteger(level) || !config) {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }

  const total = config.questions.length;
  if (!Array.isArray(body?.answers) || body.answers.length !== total || !body.answers.every(isAnswerInput)) {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }
  const answers: AnswerInput[] = body.answers;

  let correct = 0;
  let earliestIssuedAt: number | null = null;
  const seenQuestionIds = new Set<string>();
  const review: { qid: string; correctIndex: number | null; selected: number; correct: boolean }[] = [];

  for (const answer of answers) {
    const graded = gradeExamAnswerToken(answer.token, answer.selected);

    // Unreadable/forged token, or a token minted for a different user or a
    // different level - scored as wrong rather than rejecting the attempt.
    if (!graded || graded.body.uid !== user.id || graded.body.level !== level) {
      review.push({ qid: graded?.body.qid ?? "", correctIndex: null, selected: answer.selected, correct: false });
      continue;
    }

    // One token per question: without this the same (known-good) token could be
    // replayed for every answer slot to fabricate a perfect score.
    if (seenQuestionIds.has(graded.body.qid)) {
      review.push({ qid: graded.body.qid, correctIndex: null, selected: answer.selected, correct: false });
      continue;
    }
    seenQuestionIds.add(graded.body.qid);

    if (earliestIssuedAt === null || graded.body.iat < earliestIssuedAt) {
      earliestIssuedAt = graded.body.iat;
    }
    if (graded.correct) correct++;
    review.push({
      qid: graded.body.qid,
      correctIndex: graded.correctIndex,
      selected: answer.selected,
      correct: graded.correct,
    });
  }

  // Time limit, enforced against the issuing timestamp inside the tokens.
  const elapsedSeconds =
    earliestIssuedAt === null ? Number.POSITIVE_INFINITY : (Date.now() - earliestIssuedAt) / 1000;
  const expired = elapsedSeconds > config.timeLimitSeconds + TIME_LIMIT_GRACE_SECONDS;

  const percent = Math.round((correct / total) * 100);
  const passed = !expired && percent >= config.minPassPercentage;

  if (passed) {
    const admin = createAdminClient();
    const { error } = await admin.from("user_level_exams").upsert(
      {
        user_id: user.id,
        level,
        score: percent,
        source: "server_graded",
        passed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,level" }
    );
    if (error) {
      // The learner passed; surface the failure rather than silently dropping
      // the certification.
      return NextResponse.json({ error: `Không lưu được kết quả: ${error.message}` }, { status: 500 });
    }
  }

  // Explanations are returned only now, with the result - not with the exam.
  const explanations: Record<string, string> = {};
  for (const question of config.questions) {
    explanations[question.id] = question.explanation;
  }

  return NextResponse.json({
    correct,
    total,
    percent,
    passed,
    expired,
    minPassPercentage: config.minPassPercentage,
    review,
    explanations,
  });
}
