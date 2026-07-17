import { listAppeals } from "@/lib/admin/appeals";
import AppealsClient from "./AppealsClient";
import AppealsAllClient from "./AppealsAllClient";

export const dynamic = "force-dynamic";

export default async function AdminAppealsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "pending" } = await searchParams;

  // Load pending or all appeals based on view param
  const appeals = await listAppeals(view === "all" ? "all" : "pending");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Khiếu nại hoàn thành bài học</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
          Học viên báo đã thực sự hoàn thành nhưng hệ thống chưa ghi nhận - duyệt để chuyển "Tự đánh dấu" thành hoàn thành thật + cộng XP.
        </p>

        {/* View Toggle */}
        <div className="flex gap-2">
          <a
            href="/admin/appeals?view=pending"
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              view !== "all"
                ? "bg-emerald-600 text-white"
                : "bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700"
            }`}
          >
            Chờ duyệt ({appeals.filter(a => a.status === 'pending').length})
          </a>
          <a
            href="/admin/appeals?view=all"
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              view === "all"
                ? "bg-emerald-600 text-white"
                : "bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700"
            }`}
          >
            Toàn bộ ({appeals.length})
          </a>
        </div>
      </div>

      {view === "all" ? (
        <AppealsAllClient initialAppeals={appeals} />
      ) : (
        <AppealsClient initialAppeals={appeals.filter(a => a.status === 'pending')} />
      )}
    </div>
  );
}
