import { listAnnouncements } from "@/lib/admin/announcements";
import AnnouncementsClient from "./AnnouncementsClient";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
  const announcements = await listAnnouncements();

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Thông báo</h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Gửi thông báo quan trọng hiển thị cho toàn bộ tài khoản ngay khi họ vào dashboard
      </p>
      <AnnouncementsClient initialAnnouncements={announcements} />
    </div>
  );
}
