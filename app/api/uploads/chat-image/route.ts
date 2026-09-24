import { requireUser } from "@/lib/auth/current-user";
import { getStorage } from "@/lib/r2/server";
import { isAllowedChatImage, isAllowedChatFile } from "@/lib/supabase-chat";

const STORAGE_CACHE_CONTROL = "public, max-age=31536000, immutable";

/** Tái hiện giới hạn "200 ảnh mỗi người" mà migration 20260722 đặt bằng một
 *  policy RLS đếm hàng trong storage.objects. D1/R2 không có RLS, nên phần
 *  đếm chuyển hẳn sang đây - xem ghi chú count() trong lib/r2/storage.ts về
 *  giới hạn "nhất quán cuối cùng" của R2 list(). */
const MAX_IMAGES_PER_USER = 200;

export async function POST(req: Request) {
  const user = await requireUser().catch(() => null);
  if (!user) return Response.json({ error: "Chưa đăng nhập." }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Thiếu tệp." }, { status: 400 });

  // Cùng bucket chat-images chứa cả ảnh dán trực tiếp lẫn tệp đính kèm
  // (pdf, docx, zip...) - đúng cách bucket gốc trong Supabase được dùng.
  // Phân biệt bằng cờ "kind" trình duyệt gửi lên, vì hai hàm kiểm có luật
  // khác nhau (đuôi tệp so với danh sách MIME ảnh).
  const kind = form.get("kind") === "file" ? "file" : "image";
  const rejection = kind === "file" ? isAllowedChatFile(file) : isAllowedChatImage(file);
  if (rejection) return Response.json({ error: rejection }, { status: 400 });

  const storage = getStorage();
  const count = await storage.from("chat-images").count(`${user.id}/`);
  if (count >= MAX_IMAGES_PER_USER) {
    return Response.json({ error: "imageQuotaExceeded" }, { status: 429 });
  }

  const ext = file.name.split(".").pop() || "png";
  // Tiền tố id người dùng, đúng như bucket gốc: (storage.foldername(name))[1]
  // = auth.uid() là điều kiện policy INSERT trong migration hardening.
  const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await storage.from("chat-images").upload(path, await file.arrayBuffer(), {
    contentType: file.type || "image/png",
    cacheControl: STORAGE_CACHE_CONTROL,
  });
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const { data } = storage.from("chat-images").getPublicUrl(path);
  return Response.json({ publicUrl: data.publicUrl });
}
