import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createAdminClient } from "@/lib/cloudflare-admin";

// Hộp thư tổng hợp: một trang admin ở repo khác (inbox-hub) gom tin nhắn khách
// của nhiều website. Mỗi website mở đúng route này, và hub gọi sang.
//
// Xác thực bằng một khoá riêng của từng site (INBOX_API_TOKEN, `wrangler
// secret put`), KHÔNG dùng phiên admin: hub là một máy gọi máy, không có cookie.
// Fail-closed như lib/cron-auth.ts - thiếu khoá thì từ chối, không mở toang.
//
// Chỉ ĐỌC và ĐÁNH DẤU ĐÃ ĐỌC. Trả lời khách vẫn ở /admin/messages của từng
// site, nên hub không bao giờ cần quyền ghi nội dung.

export const dynamic = "force-dynamic";

type InboxKind = "contact" | "bug" | "chat";

interface InboxItem {
  /** `<kind>:<id>` - duy nhất trong một site, dùng lại cho POST đánh dấu đã đọc. */
  id: string;
  kind: InboxKind;
  name: string | null;
  email: string | null;
  title: string | null;
  body: string;
  /** null = loại này không có cờ đã đọc (bug report). */
  isRead: boolean | null;
  createdAt: string;
}

function authorized(request: NextRequest): boolean {
  const token = process.env.INBOX_API_TOKEN;
  if (!token) {
    console.error("[inbox] INBOX_API_TOKEN is not set - refusing. Set it with `wrangler secret put`.");
    return false;
  }
  const got = Buffer.from(request.headers.get("authorization") ?? "");
  const want = Buffer.from(`Bearer ${token}`);
  return got.length === want.length && timingSafeEqual(got, want);
}

const LIMIT_DEFAULT = 100;
const LIMIT_MAX = 200;

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || LIMIT_DEFAULT, 1), LIMIT_MAX);
  const db = createAdminClient();

  const [contacts, bugs, chats] = await Promise.all([
    db
      .from("contact_messages")
      .select("id, name, email, subject, message, is_read, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    db
      .from("bug_reports")
      .select("id, user_id, title, description, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    // Chỉ tin do KHÁCH gửi: câu trả lời của admin không phải "tin nhắn tới".
    db
      .from("chat_messages")
      .select("id, user_id, content, read, created_at")
      .eq("sender", "user")
      .order("created_at", { ascending: false })
      .limit(limit),
  ]);

  // Bug report và chat chỉ có user_id; tên/email nằm ở user_profiles.
  const userIds = [
    ...new Set([
      ...((bugs.data ?? []) as { user_id: string }[]).map((r) => r.user_id),
      ...((chats.data ?? []) as { user_id: string }[]).map((r) => r.user_id),
    ]),
  ];
  const profiles = userIds.length
    ? ((await db.from("user_profiles").select("id, full_name, email").in("id", userIds)).data ?? [])
    : [];
  const byUser = new Map(
    (profiles as { id: string; full_name: string | null; email: string | null }[]).map((p) => [p.id, p]),
  );

  const items: InboxItem[] = [
    ...((contacts.data ?? []) as {
      id: number; name: string; email: string | null; subject: string | null; message: string; is_read: boolean; created_at: string;
    }[]).map((r): InboxItem => ({
      id: `contact:${r.id}`, kind: "contact", name: r.name, email: r.email, title: r.subject,
      body: r.message, isRead: Boolean(r.is_read), createdAt: r.created_at,
    })),
    ...((bugs.data ?? []) as {
      id: number; user_id: string; title: string; description: string; created_at: string;
    }[]).map((r): InboxItem => ({
      id: `bug:${r.id}`, kind: "bug", name: byUser.get(r.user_id)?.full_name ?? null,
      email: byUser.get(r.user_id)?.email ?? null, title: r.title, body: r.description,
      isRead: null, createdAt: r.created_at,
    })),
    ...((chats.data ?? []) as {
      id: number; user_id: string; content: string; read: boolean; created_at: string;
    }[]).map((r): InboxItem => ({
      id: `chat:${r.id}`, kind: "chat", name: byUser.get(r.user_id)?.full_name ?? null,
      email: byUser.get(r.user_id)?.email ?? null, title: null, body: r.content,
      isRead: Boolean(r.read), createdAt: r.created_at,
    })),
  ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return NextResponse.json({
    site: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    items: items.slice(0, limit),
  });
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = (await request.json().catch(() => null)) as { id?: unknown; isRead?: unknown } | null;
  const match = typeof body?.id === "string" ? /^(contact|chat):(\d+)$/.exec(body.id) : null;
  if (!match || typeof body?.isRead !== "boolean") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const db = createAdminClient();
  const [, kind, rawId] = match;
  const id = Number(rawId);
  const { error } =
    kind === "contact"
      ? await db.from("contact_messages").update({ is_read: body.isRead }).eq("id", id)
      : await db.from("chat_messages").update({ read: body.isRead }).eq("id", id).eq("sender", "user");

  if (error) return NextResponse.json({ error: "update_failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
