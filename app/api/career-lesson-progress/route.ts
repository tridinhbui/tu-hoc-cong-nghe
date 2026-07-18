import { NextRequest, NextResponse } from "next/server";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// Backs both the /su-nghiep career detail view's "học các bài này để chuẩn
// bị" checklist and the dashboard's career-goal progress widget - given a
// career's relatedLessonSlugs (lib/finance-careers.ts), resolves them to
// real lesson ids/titles (server-side, via the same generated lesson index
// every lesson page reads) and cross-references against the caller's own
// completed lessons. Auth-scoped: completion data always comes from the
// session, never a client-supplied userId, so one visitor can't read
// another's progress.
export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { slugs?: unknown } | null;
  const slugs = Array.isArray(body?.slugs) ? body.slugs.filter((s): s is string => typeof s === "string") : [];
  if (slugs.length === 0) {
    return NextResponse.json({ total: 0, completed: 0, lessons: [] });
  }

  const allLessons = await getLessonsMeta();
  const bySlug = new Map(allLessons.map((l) => [l.slug, l]));
  const matched = slugs.map((slug) => bySlug.get(slug)).filter((l): l is NonNullable<typeof l> => !!l);

  const { data: progressRows } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("completed", true)
    .in(
      "lesson_id",
      matched.map((l) => l.id)
    );

  const completedIds = new Set((progressRows ?? []).map((r) => r.lesson_id as number));

  const lessons = matched.map((l) => ({
    slug: l.slug,
    title: l.title,
    completed: completedIds.has(l.id),
  }));

  return NextResponse.json({
    total: matched.length,
    completed: lessons.filter((l) => l.completed).length,
    lessons,
  });
}
