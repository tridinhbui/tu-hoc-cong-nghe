import { listBooks } from "@/lib/admin/cfa-library";
import CfaLibraryPanel from "./CfaLibraryPanel";

export const dynamic = "force-dynamic";

export default async function AdminCfaLibraryPage() {
  const books = await listBooks();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Thư viện CFA</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Quản lý sách, chương đọc, bài học, video, widget tương tác và câu hỏi luyện tập của thư viện giáo trình CFA
        </p>
      </div>

      <CfaLibraryPanel books={books} />
    </div>
  );
}
