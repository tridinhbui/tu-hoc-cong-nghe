import { getLessons } from "@/lib/admin/lessons";
import { getUnlockRequests } from "@/lib/admin/unlock-requests";
import LessonsTable from "./LessonsTable";
import UnlockRequestsPanel from "./UnlockRequestsPanel";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function AdminLessonsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.q ?? "";
  const page = Number(params.page ?? "1") || 1;

  const [result, unlockRequests] = await Promise.all([
    getLessons({ search, page, pageSize: 20 }),
    getUnlockRequests("pending"),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Bài học</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Quản lý trạng thái khóa/mở, điều kiện tiên quyết và khả năng hiển thị
        </p>
      </div>

      {unlockRequests.length > 0 && <UnlockRequestsPanel requests={unlockRequests} />}

      <LessonsTable result={result} initialSearch={search} />
    </div>
  );
}
