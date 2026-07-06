import Link from "next/link";
import { ChevronLeft } from "lucide-react";
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
  image_url: string | null;
}

export default async function DocumentsGiveawayPage() {
  const supabase = await createServerSupabaseClient();

  // image_url was added by a later migration that may not have been applied
  // to every environment yet — select it optimistically and fall back to a
  // query without it rather than letting the whole page 500 (or, with the
  // previous "select *"-adjacent approach, silently return zero rows) if the
  // column doesn't exist.
  const withImage = await supabase
    .from("documents")
    .select("id, title, description, category, file_url, file_name, file_size, download_count, created_at, image_url")
    .order("created_at", { ascending: false });

  let documents: PublicDocument[] = [];
  if (!withImage.error) {
    documents = withImage.data ?? [];
  } else {
    const withoutImage = await supabase
      .from("documents")
      .select("id, title, description, category, file_url, file_name, file_size, download_count, created_at")
      .order("created_at", { ascending: false });
    documents = withoutImage.error
      ? []
      : (withoutImage.data ?? []).map((d) => ({ ...d, image_url: null }));
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Về trang chủ
          </Link>
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
