import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import NotesOverviewClient from "@/components/NotesOverviewClient";
import FlashcardClient from "@/components/flashcard/FlashcardClient";

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

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg px-3 py-2 -ml-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2">Ghi chú</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-10">
        <NotesOverviewClient lessonsById={lessonsById} userId={user.id} embedded />
        <FlashcardClient userId={user.id} embedded />
      </div>
    </div>
  );
}
