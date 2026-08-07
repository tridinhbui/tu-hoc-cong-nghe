/**
 * Sao chép `text` vào bộ nhớ tạm, trả về `true` nếu thành công.
 *
 * VÌ SAO CẦN MỘT HÀM RIÊNG: `navigator.clipboard.writeText` hỏng theo hai
 * kiểu khác nhau, và mỗi nơi gọi chỉ nhớ một kiểu.
 *
 * 1. Promise bị từ chối - tab không được focus, quyền clipboard bị chặn.
 * 2. `navigator.clipboard` **không tồn tại** - trang chạy ở secure context
 *    không phải https/localhost. Đây là kiểu mà `?.` nuốt mất: cả chuỗi thành
 *    `undefined`, `.catch()` không bao giờ chạy, và nút im lặng.
 *
 * Cả hai kiểu đều dẫn tới cùng một hậu quả cho người dùng - không có gì trong
 * clipboard - nên chúng đáng được trả về cùng một câu trả lời. Nơi gọi chỉ cần
 * `if (await copyToClipboard(x)) toast.success(...) else toast.error(...)`.
 *
 * Không có nhánh nào ở đây tự bật toast: câu chữ thuộc về màn hình đang gọi
 * ("Đã sao chép link mời" khác "Đã sao chép công thức"), và một hàm trong
 * `lib/` thì không đọc được dictionary theo locale.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.clipboard) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
