import { createAdminClient } from "@/lib/supabase-admin";
import { lessons } from "@/lib/lessons";

export async function POST() {
  try {
    const supabase = createAdminClient();

    // Clear the table first: ids/slugs can be fully reshuffled between syncs
    // (e.g. curriculum renumbering), and upserting by id alone can collide
    // with the separate unique constraint on slug when a slug moves to a
    // different id in the same batch.
    const { error: deleteError } = await supabase
      .from("lessons")
      .delete()
      .gte("id", 0);

    if (deleteError) {
      return Response.json(
        { error: deleteError.message, details: deleteError.details },
        { status: 500 }
      );
    }

    // Sync all lessons to Supabase
    const lessonData = lessons.map((lesson) => ({
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

    const { data, error } = await supabase
      .from("lessons")
      .upsert(lessonData, { onConflict: "id" })
      .select();

    if (error) {
      return Response.json(
        { error: error.message, details: error.details },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: `Synced ${data?.length || 0} lessons to Supabase`,
      count: data?.length,
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
