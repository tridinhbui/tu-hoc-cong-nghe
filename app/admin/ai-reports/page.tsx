import { listAiReports } from "@/lib/admin/ai-reports";
import AiReportsClient from "./AiReportsClient";

export const dynamic = "force-dynamic";

export default async function AdminAiReportsPage() {
  const reports = await listAiReports();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
          Báo cáo nội dung AI
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Danh sách các đoạn văn bản mà học viên bôi đen và báo cáo là do AI viết. Duyệt để sửa lại hoặc xóa báo cáo.
        </p>
      </div>

      <AiReportsClient initialReports={reports} />
    </div>
  );
}
