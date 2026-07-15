import { redirect } from "next/navigation";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import NotesOverviewClient from "@/components/NotesOverviewClient";

// Auth-gated and reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

// Server Component: only pulls id/slug/title out of lesson metadata, so the
// full lesson bodies never need to reach this page's client bundle. Also
// resolves the user session here (one server round trip, already in-flight
// with the page request) instead of NotesOverviewClient doing its own
// client-side getSession() before it could even start fetching notes - that
// used to be two sequential round trips after hydration (session check,
// then the actual notes query) instead of one, which is what made this page
// specifically feel slower to load than the rest of the app.
export default async function GhiChuPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const lessonsMeta = await getLessonsMeta();
  const lessonsById = Object.fromEntries(
    lessonsMeta.map((l) => [l.id, { slug: l.slug, title: l.title }])
  );

  return <NotesOverviewClient lessonsById={lessonsById} userId={user.id} />;
}
