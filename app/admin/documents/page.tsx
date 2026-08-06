import { getDocuments } from "@/lib/admin/documents";
import DocumentsManager from "./DocumentsManager";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage() {
  const documents = await getDocuments();
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const tp = t.adminThree.documentsPage;

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">{tp.title}</h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        {tp.subtitle}
      </p>
      <DocumentsManager documents={documents} />
    </div>
  );
}
