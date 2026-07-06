import { createServerSupabaseClient } from "@/lib/supabase-server";
import DocumentsList from "./DocumentsList";

export const dynamic = "force-dynamic";

export interface PublicDocument {
  id: number;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  file_name: string;
  file_size: number;
  download_count: number;
  created_at: string;
}

export default async function DocumentsGiveawayPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("documents")
    .select("id, title, description, category, file_url, file_name, file_size, download_count, created_at")
    .order("created_at", { ascending: false });

  // Table not migrated yet, or genuinely empty — either way, render an empty
  // list rather than crashing the page.
  const documents: PublicDocument[] = error ? [] : (data ?? []);

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Tài liệu miễn phí</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Mẫu biểu, ebook, checklist và công cụ hỗ trợ hành trình học tài chính của bạn — tải về hoàn toàn miễn phí.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <DocumentsList documents={documents} />
      </div>
    </div>
  );
}
