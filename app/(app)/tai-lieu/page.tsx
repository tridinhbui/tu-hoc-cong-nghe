import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import DocumentsList from "./DocumentsList";

export const dynamic = "force-dynamic";

export type DocumentStatus = "pending" | "approved" | "rejected";

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
  status: DocumentStatus;
  uploaded_by: string | null;
}

const BASE_COLUMNS = "id, title, description, category, file_url, file_name, file_size, download_count, created_at";

export default async function DocumentsGiveawayPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // image_url and status/uploaded_by (the community-upload columns) were
  // added by later migrations that may not have run on every environment
  // yet - select optimistically and fall back to narrower queries rather
  // than letting the whole page 500 (or silently return zero rows) if a
  // column doesn't exist.
  let documents: PublicDocument[] = [];

  const withAll = await supabase
    .from("documents")
    .select(`${BASE_COLUMNS}, image_url, status, uploaded_by`)
    .order("created_at", { ascending: false });

  if (!withAll.error) {
    documents = withAll.data ?? [];
  } else {
    const withoutImage = await supabase
      .from("documents")
      .select(`${BASE_COLUMNS}, status, uploaded_by`)
      .order("created_at", { ascending: false });

    if (!withoutImage.error) {
      documents = (withoutImage.data ?? []).map((d) => ({ ...d, image_url: null }));
    } else {
      const bare = await supabase
        .from("documents")
        .select(BASE_COLUMNS)
        .order("created_at", { ascending: false });
      documents = bare.error
        ? []
        : (bare.data ?? []).map((d) => ({ ...d, image_url: null, status: "approved" as const, uploaded_by: null }));
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Về trang chủ
          </Link>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Tài liệu miễn phí</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Mẫu biểu, ebook, checklist và công cụ hỗ trợ hành trình học tài chính của bạn - tải về hoàn toàn miễn phí.
            Đóng góp tài liệu của riêng bạn để chia sẻ cho cộng đồng nhé!
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <DocumentsList documents={documents} currentUserId={user?.id ?? null} />
      </div>
    </div>
  );
}
