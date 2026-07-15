import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";
import CfaTrackView from "@/components/CfaTrackView";

export const dynamic = "force-dynamic";

// Third track: "Tài chính chứng chỉ" (CFA Level I). This page doesn't own
// any lessons of its own - it's a cross-reference over the existing 324
// personal/professional/bonus lessons, grouped by which of the 10 official
// CFA Level I subjects they happen to cover, so the personal and
// professional tracks stay completely untouched. Subjects with no matching
// lesson yet (e.g. Ethics - nothing in the curriculum covers professional
// conduct standards) show a "sẽ xây trong tương lai" placeholder.
export default async function CfaPage() {
  const allLessons = await getLessonsMeta();
  const lessonById = new Map(allLessons.map((l) => [l.id, l]));

  const subjects = CFA_LEVEL_1_SUBJECTS.map((subject) => ({
    subject,
    lessons: subject.lessonIds
      .map((id) => lessonById.get(id))
      .filter((l): l is NonNullable<typeof l> => !!l && l.isVisible !== false),
  }));

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
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Tài chính chứng chỉ</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">CFA Level I - 10 môn thi chính thức</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <CfaTrackView subjects={subjects} />
      </div>
    </div>
  );
}
