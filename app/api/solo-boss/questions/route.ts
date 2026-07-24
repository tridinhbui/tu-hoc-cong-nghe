import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonById } from "@/lib/lessons-loader";
import type { QuizQuestion } from "@/lib/lesson-types";

interface SoloBossQuestion {
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  lessonTitle: string;
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: progressRows, error } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("completed", true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const completedLessonIds = [...new Set((progressRows ?? []).map((row) => Number(row.lesson_id)).filter(Number.isFinite))];

  if (completedLessonIds.length === 0) {
    return NextResponse.json({ questions: [] });
  }

  const lessons = await Promise.all(shuffle(completedLessonIds).slice(0, 24).map((id) => getLessonById(id)));
  const questions: SoloBossQuestion[] = [];

  for (const lesson of lessons) {
    if (!lesson) continue;

    for (const question of lesson.quiz as QuizQuestion[]) {
      const order = shuffle(question.options.map((_, i) => i));
      const correct = order.indexOf(question.correct);

      questions.push({
        prompt: question.question,
        options: order.map((i) => question.options[i]),
        correct,
        explanation: question.explanation ?? "",
        lessonTitle: lesson.title,
      });
    }
  }

  return NextResponse.json({ questions: shuffle(questions).slice(0, 5) });
}
