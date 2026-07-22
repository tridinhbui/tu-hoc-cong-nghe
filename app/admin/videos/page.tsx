import { Play } from "lucide-react";
import VideosAdminClient from "./VideosAdminClient";

export const dynamic = "force-dynamic";

export default async function VideosAdminPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <Play className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Quản lý Video Bài Học</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">Thêm hoặc cập nhật video YouTube cho các bài học</p>
        </div>
      </div>

      <VideosAdminClient />
    </div>
  );
}
