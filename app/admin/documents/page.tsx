import { getDocuments } from "@/lib/admin/documents";
import DocumentsManager from "./DocumentsManager";

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage() {
  const documents = await getDocuments();

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Tài liệu giveaway</h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Tải lên mẫu biểu, ebook, checklist để học viên tải miễn phí ở trang "Tài liệu"
      </p>
      <DocumentsManager documents={documents} />
    </div>
  );
}
