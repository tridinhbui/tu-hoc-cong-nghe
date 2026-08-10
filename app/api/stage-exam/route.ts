import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { getLessonById, getLessonsMeta } from "@/lib/lessons-loader";
import { signQuestionToken, verifyQuestionToken } from "@/lib/quiz-tokens";
import {
  buildEligibility,
  findStage,
  getTrackStages,
  stageExamPassed,
  stageLessonIds,
  STAGE_EXAM_QUESTION_COUNT,
  STAGE_EXAM_RETRY_COOLDOWN_MS,
  retryCooldownRemaining,
  formatCooldown,
  type StageExamEligibility,
  type StageExamTrack,
} from "@/lib/stage-exam";

// "Thi vượt chặng": pass one exam, get the whole chặng credited as complete.
//
// Everything that decides the outcome runs here. The client sends back the
// signed tokens it was served plus the option it picked; it never sends a
// score, a pass flag, or the list of lessons to credit. That matters more
// here than for a normal quiz - one pass can complete 20+ lessons and mint
// the XP for all of them, so a client-side check would be worth farming.
//
// Two further constraints enforced below:
//   - Every token must belong to a lesson IN the claimed stage, so tokens
//     collected from an easy chặng can't be replayed against a hard one.
//   - Duplicate tokens count once, so the same correct answer can't be
//     submitted fifteen times.

export const dynamic = "force-dynamic";

const VALID_TRACKS: StageExamTrack[] = ["personal", "professional"];

function isValidTrack(value: string | null): value is StageExamTrack {
  return !!value && (VALID_TRACKS as string[]).includes(value);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Every (lessonId, questionIndex) pair in a stage that has a usable quiz. */
async function stageQuestionPool(lessonIds: number[]) {
  const lessons = await Promise.all(lessonIds.map((id) => getLessonById(id)));
  const pool: {
    lessonId: number;
    questionIndex: number;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[] = [];

  for (const lesson of lessons) {
    if (!lesson?.quiz?.length) continue;
    lesson.quiz.forEach((q, questionIndex) => {
      if (!q?.options?.length) return;
      pool.push({
        lessonId: lesson.id,
        questionIndex,
        question: q.question,
        options: q.options,
        correct: q.correct,
        explanation: q.explanation ?? "",
      });
    });
  }
  return pool;
}

/** When this learner last FAILED this stage, for the retry cooldown. Passes
 *  don't gate anything - re-taking a stage you already passed is harmless. */
async function lastFailedAt(
  admin: ReturnType<typeof createAdminClient>,
  userId: string,
  track: string,
  stageLabel: string
): Promise<string | null> {
  const { data, error } = await admin
    .from("user_stage_exam_attempts")
    .select("attempted_at")
    .eq("user_id", userId)
    .eq("track", track)
    .eq("stage_label", stageLabel)
    .eq("passed", false)
    .order("attempted_at", { ascending: false })
    .limit(1);
  // Table not migrated yet: degrade to "no cooldown" rather than blocking
  // every exam, same as every other optional table in this codebase.
  if (error || !data?.length) return null;
  return data[0].attempted_at as string;
}

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const track = searchParams.get("track");
  const stageLabel = searchParams.get("stage");
  if (!isValidTrack(track)) {
    return NextResponse.json({ error: "Invalid track" }, { status: 400 });
  }

  const meta = await getLessonsMeta();
  const allLessonIds = meta.map((l) => l.id);

  // No stage given: list what's available to test out of.
  if (!stageLabel) {
    const { data: progress } = await supabase
      .from("user_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("completed", true);
    const completed = new Set((progress ?? []).map((r) => r.lesson_id as number));

    const stages: StageExamEligibility[] = [];
    for (const stage of getTrackStages(track)) {
      const ids = stageLessonIds(stage, allLessonIds);
      const pool = await stageQuestionPool(ids);
      stages.push(buildEligibility(stage, ids, pool.length, completed));
    }
    return NextResponse.json({ stages });
  }

  const stage = findStage(track, stageLabel);
  if (!stage) {
    return NextResponse.json({ error: "Unknown stage" }, { status: 404 });
  }

  // Refuse to hand out a fresh draw while the cooldown is running. This is
  // the control that actually matters: the farm is re-rolling the random 15
  // until an easy set comes up, and that needs new questions each time.
  const cooldownMs = retryCooldownRemaining(
    await lastFailedAt(createAdminClient(), user.id, track, stage.label)
  );
  if (cooldownMs > 0) {
    return NextResponse.json(
      // Chỉ trả về CON SỐ, không trả câu: route chạy ở server và không biết
      // người dùng đang đọc ngôn ngữ nào. Client dựng câu từ `cooldownMs`.
      { error: "cooldown", cooldownMs },
      { status: 429 }
    );
  }

  const ids = stageLessonIds(stage, allLessonIds);
  const pool = await stageQuestionPool(ids);
  if (pool.length === 0) {
    return NextResponse.json({ questions: [], totalAvailable: 0 });
  }

  const picked = shuffle(pool).slice(0, Math.min(STAGE_EXAM_QUESTION_COUNT, pool.length));
  const questions = picked.map((q) => {
    // Reshuffle the options too, so repeat attempts don't memorise positions.
    const order = shuffle(q.options.map((_, i) => i));
    const correct = order.indexOf(q.correct);
    return {
      lessonId: q.lessonId,
      questionIndex: q.questionIndex,
      question: q.question,
      options: order.map((i) => q.options[i]),
      explanation: q.explanation,
      // questionIndex is what makes each token unique: without it two
      // questions from the same lesson sharing a correct-answer index sign
      // to identical tokens, and the de-duplication below would silently
      // discard one of them as a replay.
      token: signQuestionToken({ lessonId: q.lessonId, correct, questionIndex: q.questionIndex }),
    };
  });

  return NextResponse.json({
    stageLabel: stage.label,
    stageName: stage.name,
    lessonCount: ids.length,
    questions,
    totalAvailable: pool.length,
  });
}

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
  const track = body?.track;
  const stageLabel = body?.stageLabel;
  if (!isValidTrack(track) || typeof stageLabel !== "string") {
    return NextResponse.json({ error: "Invalid track/stage" }, { status: 400 });
  }
  if (!Array.isArray(body.answers) || body.answers.length === 0 || !body.answers.every(isAnswerInput)) {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }
  if (body.answers.length > STAGE_EXAM_QUESTION_COUNT) {
    return NextResponse.json({ error: "Too many answers" }, { status: 400 });
  }

  const stage = findStage(track, stageLabel);
  if (!stage) {
    return NextResponse.json({ error: "Unknown stage" }, { status: 404 });
  }

  const meta = await getLessonsMeta();
  const lessonIds = stageLessonIds(stage, meta.map((l) => l.id));
  const stageLessonSet = new Set(lessonIds);

  // Grade. A token is only counted if it verifies AND belongs to this stage,
  // and each token counts at most once.
  const seen = new Set<string>();
  let score = 0;
  let counted = 0;
  for (const answer of body.answers as AnswerInput[]) {
    if (seen.has(answer.token)) continue;
    seen.add(answer.token);
    const payload = verifyQuestionToken(answer.token);
    if (!payload || !stageLessonSet.has(payload.lessonId)) continue;
    counted++;
    if (payload.correct === answer.selected) score++;
  }

  // How many questions this stage's exam is worth. A submission has to carry
  // that many valid, distinct answers before it can pass - otherwise sending
  // a single correct answer scores 1/1, clears the 80% ratio, and credits the
  // whole chặng. Anything short of a full paper is a fail, not a small paper.
  const poolSize = (await stageQuestionPool(lessonIds)).length;
  const expected = Math.min(STAGE_EXAM_QUESTION_COUNT, poolSize);
  const passed = stageExamPassed(score, counted, expected);
  const admin = createAdminClient();

  // Log the attempt before anything else. A failure that isn't recorded is a
  // failure with no cooldown, which is the whole exploit.
  const { error: attemptError } = await admin.from("user_stage_exam_attempts").insert([
    { user_id: user.id, track, stage_label: stage.label, score, total: counted, passed },
  ]);
  if (attemptError) {
    console.error("Error logging stage exam attempt:", attemptError.message);
  }

  if (!passed) {
    return NextResponse.json({
      score,
      total: counted,
      expected,
      passed: false,
      creditedLessons: 0,
      retryAfterMs: STAGE_EXAM_RETRY_COOLDOWN_MS,
    });
  }

  // Credit the whole stage. Only rows that don't already exist as completed
  // are written, so re-taking a passed exam doesn't reset completed_at or
  // re-trigger downstream recalculation for lessons already done.
  const { data: existing } = await admin
    .from("user_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("completed", true)
    .in("lesson_id", lessonIds);
  const already = new Set((existing ?? []).map((r) => r.lesson_id as number));
  const toCredit = lessonIds.filter((id) => !already.has(id));

  if (toCredit.length > 0) {
    const now = new Date().toISOString();
    const { error } = await admin.from("user_progress").upsert(
      toCredit.map((lessonId) => ({
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
        completed_at: now,
        // Recorded so these are distinguishable from lessons actually read -
        // the score that earned the credit, not a per-lesson quiz result.
        quiz_score: Math.round((score / Math.max(1, counted)) * 100),
      })),
      { onConflict: "user_id,lesson_id" }
    );
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({
    score,
    total: counted,
    passed: true,
    creditedLessons: toCredit.length,
    alreadyCompleted: already.size,
  });
}
