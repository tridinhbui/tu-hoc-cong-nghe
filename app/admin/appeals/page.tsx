import { listAppeals } from "@/lib/admin/appeals";
import AppealsClient from "./AppealsClient";

export const dynamic = "force-dynamic";

export default async function AdminAppealsPage() {
  const appeals = await listAppeals("pending");

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Khiếu nại hoàn thành bài học</h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Học viên báo đã thực sự hoàn thành nhưng hệ thống chưa ghi nhận - duyệt để chuyển "Tự đánh dấu" thành hoàn thành thật + cộng XP.
      </p>
      <AppealsClient initialAppeals={appeals} />
    </div>
  );
}
