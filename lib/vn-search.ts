/** So khớp chuỗi tiếng Việt bỏ dấu.
 *
 *  VÌ SAO. Ô tìm trong bộ chọn vị trí ở /phong-van-ky-thuat lọc trên 43 tên
 *  nghề tiếng Việt. Người Việt gõ nhanh thường không bỏ dấu - "tin dung",
 *  "ke toan", "dinh gia" - và một phép `includes` thẳng sẽ không ra gì cả.
 *  Ô tìm không tìm được là ô tìm tệ hơn không có, vì nó hứa một việc rồi
 *  không làm.
 *
 *  Dùng chuẩn hoá Unicode NFD để tách dấu thành ký tự tổ hợp rồi bỏ chúng đi.
 *  Riêng chữ đ phải xử lý tay: nó KHÔNG phải d cộng dấu, mà là một ký tự
 *  riêng, nên NFD không đụng tới nó và "dau tu" sẽ không khớp "Đầu tư". */

export function foldVietnamese(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

/** Chuỗi tìm có khớp với văn bản không, bỏ qua dấu và hoa thường. */
export function matchesVietnamese(haystack: string, query: string): boolean {
  const q = foldVietnamese(query);
  if (!q) return true;
  return foldVietnamese(haystack).includes(q);
}
