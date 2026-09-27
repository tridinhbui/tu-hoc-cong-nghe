import Link from "next/link";
import { ChevronLeft, Gift } from "lucide-react";
import { createServerCloudflareClient } from "@/lib/cloudflare-server";
import { getServerDictionary } from "@/lib/i18n/server";
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

/* i18n-ignore-start: Cloudflare select() column list, not display copy */
const BASE_COLUMNS = "id, title, description, category, file_url, file_name, file_size, download_count, created_at";
/* i18n-ignore-end */

export default async function DocumentsGiveawayPage() {
  const t = await getServerDictionary();
// Generate placeholder image URL based on category
function getPlaceholderImageUrl(category: string): string {
  // Nét vẽ icon Lucide (viewBox 24), chép tay vì đây là chuỗi SVG data-URI
  // chứ không phải JSX. Trước đây là emoji vẽ bằng <text>, mỗi hệ điều hành
  // vẽ một kiểu.
  /* i18n-ignore-start: SVG path data, not display copy */
  const FILE_TEXT = '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>';
  const BOOK_OPEN = '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>';
  const categoryIcons: Record<string, string> = {
    "excel": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    "checklist": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    "ebook": BOOK_OPEN,
    "template": '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
    "guide": '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
    "worksheet": '<path d="M13 21h8"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
    "cheat-sheet": FILE_TEXT,
    "tool": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',
  };
  /* i18n-ignore-end */

  const icon = categoryIcons[(category || "").toLowerCase()] || FILE_TEXT;

  // Generate a simple SVG placeholder with a line icon
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#grad)"/>
    <rect x="10" y="10" width="180" height="260" rx="8" fill="white" stroke="#d1d5db" stroke-width="1"/>
    <circle cx="100" cy="140" r="44" fill="#f3f7fc"/>
    <g transform="translate(76 116) scale(2)" fill="none" stroke="#2961b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon}</g>
  </svg>`;

  const encoded = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${encoded}`;
}

  const cloudflare = await createServerCloudflareClient();
  const {
    data: { user },
  } = await cloudflare.auth.getUser();

  // image_url and status/uploaded_by (the community-upload columns) were
  // added by later migrations that may not have run on every environment
  // yet - select optimistically and fall back to narrower queries rather
  // than letting the whole page 500 (or silently return zero rows) if a
  // column doesn't exist.
  let documents: PublicDocument[] = [];

  const withAll = await cloudflare
    .from("documents")
    .select(`${BASE_COLUMNS}, image_url, status, uploaded_by`)
    .order("created_at", { ascending: false });

  if (!withAll.error) {
    documents = withAll.data ?? [];
  } else {
    const withoutImage = await cloudflare
      .from("documents")
      .select(`${BASE_COLUMNS}, status, uploaded_by`)
      .order("created_at", { ascending: false });

    if (!withoutImage.error) {
      documents = (withoutImage.data ?? []).map((d) => ({ ...d, image_url: null }));
    } else {
      const bare = await cloudflare
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
  documents = documents
    .filter((d) => d.status !== "rejected")
    .map((d) => ({
      ...d,
      image_url: d.image_url || getPlaceholderImageUrl(d.category),
    }));

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-line">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-ink mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {t.finalOne.taiLieuPage.backHome}
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-black text-ink">{t.finalOne.taiLieuPage.title}</h1>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/20 animate-bounce">
              {t.finalOne.taiLieuPage.freeBadge}
            </span>
          </div>
          <p className="text-sm text-ink-muted mt-2">
            {t.finalOne.taiLieuPage.subtitle}
          </p>
          <div className="mt-4 p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 flex items-start gap-3 shadow-[0_0_12px_rgba(244,63,94,0.05)]">
            <Gift className="w-5 h-5 text-rose-500 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <p className="text-xs font-black text-alert-strong uppercase tracking-wider">{t.finalOne.taiLieuPage.giftTitle}</p>
              <p className="text-xs text-rose-600/90 dark:text-rose-300 mt-1 leading-relaxed">
                {t.finalOne.taiLieuPage.giftBody}
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
