import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Phục vụ công khai cho tệp lưu trong R2. Thay domain công khai tự động mà
 * Supabase Storage cấp cho mỗi bucket - R2 không có domain ấy trừ khi gắn
 * riêng, xem lib/r2/storage.ts.
 *
 * KHÔNG XÁC THỰC Ở ĐÂY, có chủ ý: cả ba bucket gốc (documents, avatars,
 * chat-images) đều public-read trong chính sách Supabase gốc - xem
 * supabase/migrations/20260706_documents.sql, 20260712_avatars_bucket.sql,
 * 20260718_chat_images.sql. Route này giữ nguyên tính chất đó, không thắt
 * chặt hơn bản gốc.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const key = path.join("/");
  // Chặn đi ngược thư mục sớm, trước khi chạm R2. Params đã được Next giải mã
  // URL, nên "%2e%2e" tới đây đã là "..".
  if (path.some((p) => p === ".." || p === "." || p === "")) {
    return new Response("Không tìm thấy.", { status: 404 });
  }

  const { env } = getCloudflareContext();
  const obj = await env.FILES.get(key);
  if (!obj) return new Response("Không tìm thấy.", { status: 404 });

  const headers = new Headers();
  if (obj.httpMetadata?.contentType) headers.set("Content-Type", obj.httpMetadata.contentType);
  headers.set(
    "Cache-Control",
    obj.httpMetadata?.cacheControl || "public, max-age=31536000, immutable"
  );
  headers.set("ETag", obj.httpEtag);

  return new Response(obj.body as unknown as BodyInit, { headers });
}
