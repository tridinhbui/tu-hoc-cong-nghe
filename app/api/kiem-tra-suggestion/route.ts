import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { getCompletedLessons } from "@/lib/supabase-progress";
import { isLessonIdInTrack } from "@/lib/track-stages";
import type { QuizTrack, QuizDifficulty } from "@/lib/supabase-quiz-sessions";

// Picks one lesson at random from what the learner has ALREADY completed,
// and suggests a matching kiểm tra (track + difficulty) for it - this is
// what powers TaiTai's "thử kiểm tra bài này xem sao" prompt at the top of
// /kiem-tra, replacing the static "Đã học gì" stats table with something
// that nudges the learner toward a concrete next action instead of just
// reporting numbers back at them.
export async function GET() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ suggestion: null });
  }

  const [completedIds, lessonsMeta] = await Promise.all([
    getCompletedLessons(user.id, supabase),
    getLessonsMeta(),
  ]);

  if (completedIds.length === 0) {
    return NextResponse.json({ suggestion: null });
  }

  const lessonById = new Map(lessonsMeta.map((l) => [l.id, l]));
  const completedLessons = completedIds
    .map((id) => lessonById.get(id))
    .filter((l): l is NonNullable<typeof l> => !!l && l.isVisible !== false);

  if (completedLessons.length === 0) {
    return NextResponse.json({ suggestion: null });
  }

  const picked = completedLessons[Math.floor(Math.random() * completedLessons.length)];

  let track: QuizTrack = "personal";
  if (picked.track === "professional" || isLessonIdInTrack(picked.id, "professional")) {
    track = "professional";
  } else if (picked.track === "bonus") {
    // Bonus/case-study lessons (incl. the cfa-ethics-*/cfa-economics-* ones)
    // don't carry a personal/professional day-range - route those into the
    // CFA track since that's where most bonus-tagged CFA content lives.
    track = picked.slug.startsWith("cfa-") ? "cfa" : "personal";
  }

  const difficultyMap: Record<string, QuizDifficulty> = {
    "Dễ": "de",
    "Trung bình": "trung-binh",
    "Khó": "kho",
  };
  const difficulty = difficultyMap[picked.difficulty] ?? "tat-ca";

  return NextResponse.json({
    suggestion: {
      lessonTitle: picked.title,
      lessonSlug: picked.slug,
      track,
      difficulty,
      totalCompleted: completedLessons.length,
    },
  });
}
