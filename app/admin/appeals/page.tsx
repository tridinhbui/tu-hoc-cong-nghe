import { listAppeals } from "@/lib/admin/appeals";
import { listAiReports } from "@/lib/admin/ai-reports";
import AppealsCombinedWrapper from "./AppealsCombinedWrapper";

export const dynamic = "force-dynamic";

export default async function AdminAppealsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; tab?: string }>;
}) {
  const { view = "pending", tab = "appeals" } = await searchParams;

  const [appeals, aiReports] = await Promise.all([
    listAppeals(view === "all" ? "all" : "pending").catch(() => []),
    listAiReports().catch(() => []),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
          Khiếu nại & Báo lỗi AI
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Quản lý yêu cầu khiếu nại bài học và danh sách văn bản bị báo lỗi nội dung AI từ người học
        </p>
      </div>

      <AppealsCombinedWrapper
        appeals={appeals}
        aiReports={aiReports}
        initialView={view}
        initialSection={tab}
      />
    </div>
  );
}
