import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonById } from "@/lib/lessons-loader";
import { NextResponse } from "next/server";

export interface ChallengeQuestion {
  lessonId: number;
  lessonTitle: string;
  lessonSlug: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTION_COUNT = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Builds a randomized mini-quiz pulled from every lesson the user has
// actually completed, so "ôn lại kiến thức" tests what they've genuinely
// covered instead of arbitrary content. Runs server-side because loading
// full lesson bodies (including quiz arrays) for every completed lesson
// would otherwise mean shipping that content to the client.
export async function GET() {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: progress, error: progressError } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("completed", true);

  if (progressError) {
    return NextResponse.json({ error: progressError.message }, { status: 500 });
  }

  const completedIds = Array.from(new Set((progress ?? []).map((r) => r.lesson_id as number)));

  const pool: ChallengeQuestion[] = [];
  for (const lessonId of completedIds) {
    const lesson = await getLessonById(lessonId);
    if (!lesson?.quiz?.length) continue;
    for (const q of lesson.quiz) {
      pool.push({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        lessonSlug: lesson.slug,
        question: q.question,
        options: q.options,
        correct: q.correct,
        explanation: q.explanation,
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
    return {
      ...q,
      options: order.map((i) => q.options[i]),
      correct: order.indexOf(q.correct),
    };
  });

  return NextResponse.json({ questions, totalAvailable: pool.length });
}
