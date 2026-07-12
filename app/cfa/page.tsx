import Link from "next/link";
import { ChevronLeft, Construction } from "lucide-react";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";

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

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-950 z-10">
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

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 p-5">
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Track này ánh xạ các bài học đã có trong <strong>Tài chính cá nhân</strong> và{" "}
            <strong>Tài chính chuyên ngành</strong> vào đúng 10 môn thi CFA Level I chính thức, để bạn
            ôn theo đúng cấu trúc bài thi. Bài học không bị di chuyển hay đổi số ngày - chỉ được liệt kê
            lại ở đây. Môn nào chưa có bài phù hợp sẽ được xây dần trong tương lai.
          </p>
        </div>

        {CFA_LEVEL_1_SUBJECTS.map((subject) => {
          const lessons = subject.lessonIds
            .map((id) => lessonById.get(id))
            .filter((l): l is NonNullable<typeof l> => !!l && l.isVisible !== false);

          return (
            <section key={subject.id} className="rounded-2xl border-2 border-stone-200 dark:border-stone-800 overflow-hidden">
              <div className="px-6 py-4 bg-stone-900 dark:bg-stone-800 flex items-center justify-between gap-3">
                <h2 className="text-white font-extrabold text-base">{subject.name}</h2>
                <span className="text-xs font-bold text-stone-300 bg-white/10 px-2.5 py-1 rounded-full flex-shrink-0">
                  {subject.weight}
                </span>
              </div>

              {lessons.length === 0 ? (
                <div className="px-6 py-8 flex flex-col items-center text-center gap-2 bg-white dark:bg-stone-900">
                  <Construction className="w-5 h-5 text-stone-300 dark:text-stone-600" />
                  <p className="text-sm font-bold text-stone-400 dark:text-stone-500">Sẽ xây trong tương lai</p>
                  <p className="text-xs text-stone-400 dark:text-stone-600">Chưa có bài học nào khớp với môn này</p>
                </div>
              ) : (
                <div className="divide-y divide-stone-100 dark:divide-stone-800 bg-white dark:bg-stone-900">
                  {lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/bai-hoc/${lesson.slug}`}
                      className="flex items-center justify-between gap-3 px-6 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 truncate">{lesson.title}</p>
                        <p className="text-xs text-stone-400 dark:text-stone-500 truncate mt-0.5">{lesson.subtitle}</p>
                      </div>
                      <span className="text-xs text-stone-400 dark:text-stone-500 flex-shrink-0">{lesson.duration}</span>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
