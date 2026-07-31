import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { getLessonById, getLessonsMeta } from "@/lib/lessons-loader";
import { signQuestionToken, verifyQuestionToken } from "@/lib/quiz-tokens";
import {
  buildEligibility,
  findStage,
  getTrackStages,
  passedStageExam,
  stageLessonIds,
  STAGE_EXAM_QUESTION_COUNT,
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
      token: signQuestionToken({ lessonId: q.lessonId, correct }),
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

  const passed = passedStageExam(score, counted);

  if (!passed) {
    return NextResponse.json({ score, total: counted, passed: false, creditedLessons: 0 });
  }

  // Credit the whole stage. Only rows that don't already exist as completed
  // are written, so re-taking a passed exam doesn't reset completed_at or
  // re-trigger downstream recalculation for lessons already done.
  const admin = createAdminClient();
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
