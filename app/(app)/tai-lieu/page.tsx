import Link from "next/link";
import { ChevronLeft, Gift } from "lucide-react";
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

  // A rejected submission still belongs to its uploader under RLS (so they
  // could previously see it flagged "Đã từ chối" in their own giveaway
  // feed), but that's just clutter once the decision is made - there's
  // nothing actionable left to do with it. Drop it from the feed entirely
  // rather than showing a dead entry; "pending" rows stay so the uploader
  // can still see their submission is awaiting review.
  documents = documents.filter((d) => d.status !== "rejected");

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
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100">Kho Tài liệu Miễn phí</h1>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/20 animate-bounce">
              Miễn phí 100% 🎁
            </span>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            Mẫu biểu, ebook, checklist và công cụ hỗ trợ hành trình học tài chính của bạn - tải về hoàn toàn miễn phí không giới hạn.
            Đóng góp tài liệu của riêng bạn để chia sẻ cho cộng đồng nhé!
          </p>
          <div className="mt-4 p-4 rounded-xl border border-rose-250 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 flex items-start gap-3 shadow-[0_0_12px_rgba(244,63,94,0.05)]">
            <Gift className="w-5 h-5 text-rose-500 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <p className="text-xs font-black text-rose-700 dark:text-rose-450 uppercase tracking-wider">Món quà tri thức từ cộng đồng</p>
              <p className="text-xs text-rose-600/90 dark:text-rose-350 mt-1 leading-relaxed">
                Tất cả tài liệu, ebook, biểu mẫu Excel và checklist tại đây đều được chia sẻ hoàn toàn miễn phí để phục vụ mục đích học tập cá nhân.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <DocumentsList documents={documents} currentUserId={user?.id ?? null} />
      </div>
    </div>
  );
}
