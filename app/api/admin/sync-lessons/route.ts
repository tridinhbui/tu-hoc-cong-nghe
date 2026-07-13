import { createAdminClient } from "@/lib/supabase-admin";
import { loadLessons } from "@/lib/lessons-loader";
import { NextRequest } from "next/server";

function isMissingAtomicSyncFunction(error: { code?: string } | null) {
  return error?.code === "PGRST202" || error?.code === "42883";
}

// Runs the lesson sync inside one Postgres function/transaction so we never
// expose a half-synced state or cascade-delete dependent data mid-request.
// This endpoint is still service-role + shared-secret only.
export async function POST(request: NextRequest) {
  const expectedSecret = process.env.ADMIN_SYNC_SECRET;
  const providedSecret = request.headers.get("x-admin-secret");

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const lessons = await loadLessons();

    const lessonData = lessons.map((lesson: { id: number; slug: string; title: string; subtitle: string; duration: string; difficulty: string; emoji: string; openingQuestion: string; openingOptions: string[]; correctOption: number; explanation: string; keyTakeaways: string[]; track?: string }) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      subtitle: lesson.subtitle,
      duration: lesson.duration,
      difficulty: lesson.difficulty,
      emoji: lesson.emoji,
      opening_question: lesson.openingQuestion,
      opening_options: lesson.openingOptions,
      correct_option: lesson.correctOption,
      explanation: lesson.explanation,
      key_takeaways: lesson.keyTakeaways,
      track: lesson.track || "professional",
      status: "published",
      stage_number: Math.ceil(lesson.id / 20),
      day_number: lesson.id,
    }));

    const { data, error } = await supabase.rpc("sync_lessons_atomic", {
      p_lessons: lessonData,
    });

    if (error) {
      if (isMissingAtomicSyncFunction(error)) {
        return Response.json(
          {
            error: "Missing required SQL function sync_lessons_atomic(jsonb). Run the latest Supabase migration first.",
            details: error.message,
          },
          { status: 500 }
        );
      }
      return Response.json(
        { error: error.message, details: error.details },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: `Synced ${typeof data === "number" ? data : lessonData.length} lessons to Supabase`,
      count: typeof data === "number" ? data : lessonData.length,
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
