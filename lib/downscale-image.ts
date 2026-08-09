/** Thu nhỏ ảnh ngay trong trình duyệt, trước khi tải lên.
 *
 *  VÌ SAO. `uploadChatImage` nhận ảnh tới 8MB và đẩy nguyên xi vào Supabase
 *  storage. Chỗ dựng chúng ra là một thẻ `<img>` với `max-h-40` - tức cao 160
 *  điểm ảnh. Nên một tấm ảnh chụp điện thoại 8MB được lưu trọn vẹn, rồi mỗi
 *  người trong nhóm tải về trọn vẹn 8MB đó, để nhìn một ảnh cao bằng một dòng
 *  chữ. Trả tiền hai lần cho cùng một thứ không ai nhìn: dung lượng lưu, và
 *  băng thông ra cho từng lượt xem.
 *
 *  1600 điểm ảnh cạnh dài vẫn thoải mái cho việc bấm vào ảnh mở tab mới xem
 *  cỡ thật - hành vi hiện có - trong khi một ảnh chụp màn hình điện thoại
 *  thường rơi từ vài megabyte xuống vài trăm kilobyte.
 *
 *  BA CHỖ KHÔNG ĐỘNG VÀO, và mỗi chỗ có lý do:
 *
 *  - **GIF giữ nguyên.** Vẽ lại qua canvas chỉ lấy được khung đầu, nên thu nhỏ
 *    một ảnh động là làm hỏng nó chứ không phải nén nó.
 *  - **Ảnh đã nhỏ hơn ngưỡng giữ nguyên.** Không có gì để cắt, và mã hoá lại
 *    một tấm PNG chụp màn hình sắc nét thành JPEG chỉ làm nó xấu đi.
 *  - **Kết quả không nhỏ hơn thì trả lại bản gốc.** Ảnh nhiều mảng phẳng - đúng
 *    kiểu ảnh chụp màn hình, thứ hay được dán vào chat nhất - có thể PHÌNH ra
 *    khi mã hoá lại. Đây là phần dễ quên nhất và cũng là phần khiến một hàm
 *    "tối ưu" âm thầm làm mọi thứ tệ hơn.
 *
 *  Hỏng thì trả lại bản gốc chứ không ném lỗi: người dùng đang cố gửi một tấm
 *  ảnh, và mất ảnh vì trình duyệt không giải mã được thì tệ hơn nhiều so với
 *  gửi một tệp to. */

export const MAX_EDGE_PX = 1600;
export const QUALITY = 0.82;

/** Kích thước sau khi thu, giữ nguyên tỉ lệ. Trả về null nếu không cần thu. */
export function targetDimensions(
  width: number,
  height: number,
  maxEdge = MAX_EDGE_PX
): { width: number; height: number } | null {
  if (width <= 0 || height <= 0) return null;
  const longest = Math.max(width, height);
  if (longest <= maxEdge) return null;

  const scale = maxEdge / longest;
  return {
    // Làm tròn xuống nhưng không bao giờ về 0: một ảnh 4000×1 vẫn phải còn
    // một điểm ảnh chiều cao, nếu không canvas ném lỗi.
    width: Math.max(1, Math.floor(width * scale)),
    height: Math.max(1, Math.floor(height * scale)),
  };
}

/** Có nên bỏ qua tệp này không - và vì sao. */
export function skipReason(file: { type: string; size: number }): string | null {
  if (file.type === "image/gif") return "gif-animation";
  if (file.size <= 300 * 1024) return "already-small";
  return null;
}

/** Bản đã thu có đáng dùng thay bản gốc không. */
export function isWorthReplacing(originalBytes: number, resizedBytes: number): boolean {
  // Đòi hơn hẳn chứ không chỉ nhỏ hơn một chút: đổi định dạng luôn kèm một lần
  // mã hoá lại, nên cắt được vài phần trăm không bù nổi phần chất lượng mất đi.
  return resizedBytes > 0 && resizedBytes < originalBytes * 0.9;
}

/** Tên tệp sau khi đổi sang WebP. */
export function webpName(originalName: string): string {
  const base = originalName.replace(/\.[^.]+$/, "") || "image";
  return `${base}.webp`;
}

async function loadBitmap(file: File): Promise<ImageBitmap | null> {
  if (typeof createImageBitmap !== "function") return null;
  try {
    return await createImageBitmap(file);
  } catch {
    return null;
  }
}

/**
 * Trả về một File nhỏ hơn khi thu được, hoặc chính `file` khi không.
 * Không bao giờ ném lỗi.
 */
export async function downscaleImage(file: File): Promise<File> {
  if (typeof document === "undefined") return file;
  if (skipReason(file)) return file;

  const bitmap = await loadBitmap(file);
  if (!bitmap) return file;

  try {
    const target = targetDimensions(bitmap.width, bitmap.height);
    if (!target) return file;

    const canvas = document.createElement("canvas");
    canvas.width = target.width;
    canvas.height = target.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, target.width, target.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", QUALITY)
    );
    if (!blob || !isWorthReplacing(file.size, blob.size)) return file;

    return new File([blob], webpName(file.name), { type: "image/webp" });
  } catch {
    return file;
  } finally {
    bitmap.close?.();
  }
}
