import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createStorageClient } from "./storage";

export function getStorage() {
  const { env } = getCloudflareContext();
  if (!env.FILES) throw new Error("Thiếu binding FILES. Kiểm tra r2_buckets trong wrangler.jsonc.");
  // URL tệp lưu dạng TƯƠNG ĐỐI ("/api/files/<khoá>"), không ghép tên miền.
  //
  // Bản trước ghép NEXT_PUBLIC_SITE_URL vào, với dự phòng là
  // "https://tuhoccongnghe.vn" - một tên miền không phân giải được. Đo trên D1
  // thật: đúng 69 hàng (32 ảnh chat, 34 ảnh đại diện, 3 tệp tài liệu) trỏ về
  // đó, bằng đúng số tệp trong bucket - tức MỌI tệp đã chuyển sang R2 đều là
  // liên kết chết. Đường dẫn tương đối chạy trên mọi máy chủ phục vụ ứng dụng:
  // workers.dev hôm nay, tên miền riêng mai kia, localhost khi phát triển.
  //
  // Mọi chỗ dùng URL này đều là <img>/<a> trong ứng dụng; không email hay ảnh
  // chia sẻ nào nhúng nó. storagePathFromUrl (lib/admin/documents.ts) khớp được
  // cả dạng tương đối lẫn tuyệt đối, nên dọn tệp cũ vẫn chạy.
  return createStorageClient(env.FILES, "");
}
