import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { createServerCloudflareClient } from "@/lib/cloudflare-server";
import NotesOverviewClient from "@/components/NotesOverviewClient";
import HighlightNotebook from "@/components/HighlightNotebook";
import FlashcardClient from "@/components/flashcard/FlashcardClient";
import { NOTES_PAGE_SIZE, type LessonNote } from "@/lib/cloudflare-notes";
import type { Flashcard } from "@/lib/cloudflare-flashcards";
import type { LessonHighlight } from "@/lib/lesson-highlights";
import { APP_SYS } from "@/components/analytics/system-codes";
import { Sys, textLink } from "@/components/ui/system";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

// Auth-gated and reads Cloudflare env vars at render time - never prerender statically.
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
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const cloudflare = await createServerCloudflareClient();
  const {
    data: { user },
  } = await cloudflare.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const lessonsMeta = await getLessonsMeta();
  const lessonsById = Object.fromEntries(
    lessonsMeta.map((l) => [l.id, { slug: l.slug, title: l.title }])
  );

  // Fetch notes + flashcards here (server-side, same request as the page
  // itself) instead of letting each client component do its own fetch after
  // hydration. That used to mean the page painted its shell immediately but
  // then sat on two sequential "Đang tải..." spinners while two separate
  // client-side Cloudflare round trips ran - this is what made the page feel
  // slow on every visit, not just the first one. Fetching both in parallel
  // here means the page can render with data already in hand.
  const [notesResult, flashcardsResult, highlightsResult] = await Promise.all([
    // First page only - NotesOverviewClient loads more on demand and queries
    // the server directly when searching, so the whole notebook no longer has
    // to travel with the page.
    cloudflare
      .from("lesson_notes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .range(0, NOTES_PAGE_SIZE - 1),
    cloudflare
      .from("user_flashcards")
      .select("term, definition, interval, ease_factor, repetitions, next_review_at")
      .eq("user_id", user.id),
    // Highlighted passages, which read as notes the learner wrote by pointing
    // rather than typing - same page, grouped by chặng.
    cloudflare
      .from("lesson_highlights")
      .select("*")
      .eq("user_id", user.id)
      .eq("kind", "important")
      .order("created_at", { ascending: false }),
  ]);

  const initialNotes = (notesResult.data ?? []) as LessonNote[];
  const initialCards = (flashcardsResult.data ?? []) as Flashcard[];
  // A missing lesson_highlights table must not take the whole notebook down -
  // the read path in lib/lesson-highlights.ts makes the same allowance.
  const initialHighlights = (highlightsResult.data ?? []) as LessonHighlight[];

  // Laid out as one viewport-height card on xl+ (matching the dashboard
  // overview): the page itself never scrolls, and each of the two panels
  // scrolls inside its own cell. Below xl they stack and the page scrolls,
  // since neither panel is usable at a third of a phone screen.
  return (
    <div className="min-h-screen xl:h-screen xl:overflow-hidden bg-page dark:bg-stone-950">
      <div className="px-4 py-4 sm:px-5 sm:py-5 xl:h-full xl:flex xl:flex-col xl:min-h-0">
        <div className="mx-auto w-full max-w-[1500px] xl:flex-1 xl:min-h-0 xl:rounded-md xl:border xl:border-stone-300 xl:dark:border-stone-700 xl:bg-surface-raised xl:dark:bg-stone-900/40 xl:p-3.5 xl:grid xl:grid-cols-12 xl:grid-rows-[auto_minmax(0,1fr)] xl:gap-3.5">
          <div className="flex items-center justify-between gap-3 mb-5 xl:mb-0 xl:col-span-12">
            <div className="min-w-0">
              <Sys className="text-ink-muted">{APP_SYS.notes}</Sys>
              <h1 className="mt-1 text-xl font-black tracking-tight text-ink-max">{t.finalTwo.ghiChuPage.title}</h1>
              <p className="text-xs text-ink-muted mt-0.5">
                {t.finalTwo.ghiChuPage.subtitle}
              </p>
            </div>
            <Link
              href="/dashboard"
              className={`${textLink} shrink-0 text-xs`}
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
              {t.finalTwo.ghiChuPage.backLabel}
            </Link>
          </div>

          <section className="min-w-0 mb-8 xl:mb-0 xl:col-span-7 xl:min-h-0 xl:overflow-y-auto xl:rounded-md xl:border xl:border-stone-300 xl:dark:border-stone-700 xl:bg-white xl:dark:bg-stone-900 xl:p-3.5">
            <NotesOverviewClient lessonsById={lessonsById} userId={user.id} initialNotes={initialNotes} embedded />

            <div className="mt-6 pt-5 border-t border-line">
              <HighlightNotebook highlights={initialHighlights} lessonsById={lessonsById} />
            </div>
          </section>
          <section className="min-w-0 xl:col-span-5 xl:min-h-0 xl:overflow-y-auto xl:rounded-md xl:border xl:border-stone-300 xl:dark:border-stone-700 xl:bg-white xl:dark:bg-stone-900 xl:p-3.5">
            <FlashcardClient userId={user.id} initialCards={initialCards} embedded />
          </section>
        </div>
      </div>
    </div>
  );
}
