import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { FRM_SUBJECTS } from "@/lib/frm-track";
import { getCompletedLessons } from "@/lib/supabase-progress";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import FrmTrackView from "@/components/FrmTrackView";

export const dynamic = "force-dynamic";

// Fourth track: "FRM" (Financial Risk Manager, GARP Part I & II). Same
// cross-reference pattern as app/(app)/cfa/page.tsx - this page doesn't own
// any lessons of its own, it groups the existing lesson pool by which of
// the 10 official FRM subjects they happen to cover. Subjects with no
// matching lesson yet show a "sẽ xây trong tương lai" placeholder.
export default async function FrmPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [allLessons, completedLessonIds] = await Promise.all([
    getLessonsMeta(),
    user ? getCompletedLessons(user.id, supabase) : Promise.resolve<number[]>([]),
  ]);
  const lessonById = new Map(allLessons.map((l) => [l.id, l]));
  const completedSet = new Set(completedLessonIds);

  const subjects = FRM_SUBJECTS.map((subject) => {
    const lessons = subject.lessonIds
      .map((id) => lessonById.get(id))
      .filter((l): l is NonNullable<typeof l> => !!l && l.isVisible !== false);
    const nextLesson = lessons.find((l) => !completedSet.has(l.id)) ?? null;
    return {
      subject,
      lessons,
      completedCount: lessons.filter((l) => completedSet.has(l.id)).length,
      nextLessonSlug: nextLesson?.slug ?? null,
    };
  });

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-9 h-9 rounded-full text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            aria-label="Về Dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">FRM</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Financial Risk Manager - GARP Part I &amp; Part II</p>
          </div>
          {/* Sổ tay công thức là thứ duy nhất ở track này dùng được mà không
              cần mở một bài học, nên nó phải với tới được ngay từ đầu trang. */}
          <Link
            href="/frm/formulas"
            className="shrink-0 rounded-full border border-red-200 px-3.5 py-1.5 text-xs font-extrabold text-red-700 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40"
          >
            📐 Sổ tay công thức
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <FrmTrackView subjects={subjects} completedLessonIds={completedLessonIds} />
      </div>
    </div>
  );
}
