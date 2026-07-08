import { createClient } from "@/lib/supabase";

// Lesson feedback is a nice-to-have, not core functionality - if the
// migration adding this table hasn't been applied to this environment yet,
// fail silently rather than surfacing an error to a learner who just
// finished a lesson.
function isMissingSchemaError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01" || error?.code === "42703";
}

export async function submitLessonFeedback(
  userId: string | null,
  lessonId: number,
  rating: number,
  comment: string
): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from("lesson_feedback").insert({
    user_id: userId,
    lesson_id: lessonId,
    rating,
    comment: comment.trim() || null,
  });

  if (error) {
    if (!isMissingSchemaError(error)) {
      console.error("Error submitting lesson feedback:", error);
    }
    return false;
  }
  return true;
}
