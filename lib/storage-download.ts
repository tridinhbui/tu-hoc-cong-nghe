/**
 * Biến một public URL của Supabase Storage thành URL *tải về* thật sự.
 *
 * VÌ SAO CẦN: thuộc tính `download` trên thẻ `<a>` chỉ có tác dụng khi link
 * cùng origin với trang. Tệp đính kèm và tài liệu của app nằm trên Supabase
 * Storage - khác origin - nên trình duyệt **bỏ qua** `download` hoàn toàn:
 * nút "Tải xuống" mở tệp trong tab mới, và tên tệp gốc mà người gửi đặt bị
 * thay bằng tên ngẫu nhiên trong storage.
 *
 * Không có lỗi nào được ném ra, không có cảnh báo nào trong console - nút vẫn
 * "chạy", chỉ là làm việc khác với điều nó hứa. Đó là lý do nó sống lâu.
 *
 * Supabase Storage nhận tham số `?download=<tên tệp>` và trả về
 * `Content-Disposition: attachment; filename="<tên tệp>"`. Header do máy chủ
 * đặt thì cross-origin không còn là vấn đề, và tên tệp cũng do máy chủ nói.
 * Một tham số, không phải tải cả tệp về client rồi dựng blob.
 */
export function toDownloadUrl(fileUrl: string, filename?: string | null): string {
  // Không dùng `new URL()` với base: URL từ DB có thể rỗng hoặc méo, và ở đây
  // trả nguyên bản vẫn tốt hơn là ném lỗi giữa lúc người dùng bấm nút.
  if (!fileUrl) return fileUrl;
  const separator = fileUrl.includes("?") ? "&" : "?";
  // `?download` không kèm giá trị là hợp lệ - Supabase dùng tên tệp trong
  // storage. Chỉ đặt tên khi ta thực sự có một cái tên để đặt.
  const value = filename ? `=${encodeURIComponent(filename)}` : "";
  return `${fileUrl}${separator}download${value}`;
}
