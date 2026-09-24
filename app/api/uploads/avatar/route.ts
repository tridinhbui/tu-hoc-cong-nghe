import { requireUser } from "@/lib/auth/current-user";
import { getStorage } from "@/lib/r2/server";

const STORAGE_CACHE_CONTROL = "public, max-age=31536000, immutable";
const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Ghi ảnh đại diện vào R2, dưới danh nghĩa người đang đăng nhập.
 *
 * CHUYỂN TỪ CLIENT SANG SERVER. Bản Supabase gọi storage.from("avatars")
 * thẳng từ trình duyệt, an toàn vì RLS kiểm auth.uid() ở tầng cơ sở dữ liệu.
 * R2 không có RLS - ai cũng ghi được vào bất kỳ khoá nào nếu binding lộ ra
 * trình duyệt. Route này THAY CHO RLS: id trong đường dẫn lấy từ phiên đã
 * xác thực, không bao giờ từ dữ liệu người dùng gửi lên.
 */
export async function POST(req: Request) {
  const user = await requireUser().catch(() => null);
  if (!user) return Response.json({ error: "Chưa đăng nhập." }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Thiếu tệp." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Ảnh vượt quá 5MB." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "Chỉ nhận tệp ảnh." }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${user.id}-${Date.now()}.${ext}`;

  const storage = getStorage();
  const { error } = await storage.from("avatars").upload(path, await file.arrayBuffer(), {
    contentType: file.type || "image/jpeg",
    cacheControl: STORAGE_CACHE_CONTROL,
  });
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const { data } = storage.from("avatars").getPublicUrl(path);

  // Chỉ ghi tệp. KHÔNG cập nhật user_profiles.avatar_url ở đây - bảng đó vẫn
  // đang sống ở Supabase cho tới bước thay client (auth/DB) sang D1, và ghi
  // vào D1 song song lúc này tạo ra hai nguồn sự thật cùng lúc. Nơi gọi vẫn tự
  // cập nhật hồ sơ bằng con đường Supabase như trước.
  return Response.json({ publicUrl: data.publicUrl });
}
