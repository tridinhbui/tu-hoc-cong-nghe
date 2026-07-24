import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonById, getLessonsMeta } from "@/lib/lessons-loader";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange } from "@/lib/track-stages";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";
import { signQuestionToken } from "@/lib/quiz-tokens";
import { NextRequest, NextResponse } from "next/server";

export interface ChallengeQuestion {
  lessonId: number;
  lessonTitle: string;
  lessonSlug: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  // Signed proof of `correct` for this specific delivered question -
  // submit it back (with the option the learner picked) to
  // /api/knowledge-challenge/submit so the server can grade the attempt
  // itself instead of trusting a client-computed score. See
  // lib/quiz-tokens.ts.
  token: string;
}

const QUESTION_COUNT = 5;

const DIFFICULTY_LABELS: Record<string, string> = {
  de: "Dễ",
  "trung-binh": "Trung bình",
  kho: "Khó",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function idsForTrack(track: "personal" | "professional" | "cfa"): Promise<Set<number>> {
  if (track === "cfa") {
    return new Set(CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds));
  }
  const allLessons = await getLessonsMeta();
  const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  const ids = allLessons
    .filter((l) => (l.track ? l.track === track : stages.some((stage) => isLessonInRange(l.id, stage))))
    .map((l) => l.id);
  return new Set(ids);
}

// Builds a randomized mini-quiz. Two modes:
// - No track/difficulty query params (the dashboard's quick "Thử thách
//   kiến thức" nudge): pulled from every lesson the user has actually
//   completed, so it tests what they've genuinely covered - falling back
//   to Day 1-10 for accounts with nothing completed yet.
// - track/difficulty provided (the standalone /kiem-tra page): pulled from
//   every lesson in that track matching that difficulty, regardless of
//   completion status - the whole point there is to self-test against a
//   track's material on demand, not just review what's already done.
// Runs server-side because loading full lesson bodies (including quiz
// arrays) for every source lesson would otherwise mean shipping that
// content to the client.
export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const track = searchParams.get("track");
  const difficulty = searchParams.get("difficulty");

  let sourceIds: number[];

  if (track === "personal" || track === "professional" || track === "cfa") {
    const trackIds = await idsForTrack(track);
    let candidateIds = Array.from(trackIds);
    if (difficulty && difficulty !== "tat-ca" && DIFFICULTY_LABELS[difficulty]) {
      const allLessons = await getLessonsMeta();
      const byId = new Map(allLessons.map((l) => [l.id, l]));
      candidateIds = candidateIds.filter((id) => byId.get(id)?.difficulty === DIFFICULTY_LABELS[difficulty]);
    }
    sourceIds = candidateIds;
  } else {
    const { data: progress, error: progressError } = await supabase
      .from("user_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (progressError) {
      return NextResponse.json({ error: progressError.message }, { status: 500 });
    }

    const completedIds = Array.from(new Set((progress ?? []).map((r) => r.lesson_id as number)));
    // Brand new accounts have nothing completed yet, which used to mean an
    // empty pool -> the modal just told them to go complete lessons first,
    // even though the whole point of opening this from the dashboard is to
    // try it right away. Fall back to the first 10 lessons (Day 1-10) so
    // there's always something to answer.
    sourceIds = completedIds.length > 0 ? completedIds : Array.from({ length: 10 }, (_, i) => i + 1);
  }

  // Fetched in parallel rather than one at a time in a loop - a track pool
  // can be 100-250 lessons (e.g. the CFA track), and each is an independent
  // file read with no ordering dependency, so awaiting them sequentially
  // just serializes disk I/O that could otherwise overlap.
  const lessons = await Promise.all(sourceIds.map((id) => getLessonById(id)));

  const pool: Omit<ChallengeQuestion, "token">[] = [];
  for (const lesson of lessons) {
    if (!lesson?.quiz?.length) continue;
    for (const q of lesson.quiz) {
      pool.push({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        lessonSlug: lesson.slug,
        question: q.question,
        options: q.options,
        correct: q.correct,
        explanation: q.explanation ?? "",
      });
    }
  }

  if (pool.length === 0) {
    return NextResponse.json({ questions: [], totalAvailable: 0 });
  }

  const picked = shuffle(pool).slice(0, Math.min(QUESTION_COUNT, pool.length));

  // Reshuffle each question's own options too, so revisiting the same
  // underlying quiz question in a later challenge doesn't always show the
  // correct answer in the same position as it did in the original lesson.
  const questions = picked.map((q) => {
    const order = shuffle(q.options.map((_, i) => i));
    const correct = order.indexOf(q.correct);
    return {
      ...q,
      options: order.map((i) => q.options[i]),
      correct,
      token: signQuestionToken({ lessonId: q.lessonId, correct }),
    };
  });

  return NextResponse.json({ questions, totalAvailable: pool.length });
}
