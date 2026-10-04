/** Ba bài thử của trang /lo-trinh/huong-dan, theo đúng thứ tự `tries` trong từ
 *  điển (lib/i18n/dictionaries/sections/start-guide.ts). Slug nằm ở đây chứ không
 *  nằm trong từ điển: nó là dữ liệu cấu trúc giống nhau ở mọi ngôn ngữ, và để nó
 *  trong từ điển thì bộ kiểm dictionary-parity đỏ vì "bản dịch" trùng bản Việt.
 *
 *  Đây là ba bài đợt 1 được bốc thăm cho người đọc ngoài ngành
 *  (HUONG-DAN-NGUOI-DOC-MAU.md). lib/__tests__/start-guide.test.ts giữ chúng khớp
 *  với kho bài. */
export const START_GUIDE_TRY_SLUGS = [
  "hoc-nhanh-mang-viec-moi-bang-ai",
  "doi-chieu-sao-ke-ngan-hang-voi-so-sach",
  "lap-ngan-sach-phong-ban-voi-gia-dinh-ro-rang",
] as const;
