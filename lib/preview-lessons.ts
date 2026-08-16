/** Những bài học đọc được khi CHƯA đăng nhập.
 *
 *  proxy.ts chặn mặc định mọi đường dẫn, nên trước đây `/bai-hoc/*` nằm sau
 *  tường đăng ký nguyên khối: 719 bài, không bài nào khách xem được một chữ.
 *  Cái nút hướng vào đúng người còn đang phân vân - "Xem thử bài học" trên
 *  trang chủ - trỏ tới `/bai-hoc/${TRACKS.personal.previewSlug}` và bị đá về
 *  `/login`, tức là lời mời xem thử dẫn thẳng vào form đăng ký.
 *
 *  Hai slug đầu KHÔNG phải chọn tuỳ ý: chúng là `previewSlug` của hai track
 *  trong lib/tracks.ts, tức là hai đích mà giao diện đã hứa từ trước. Đổi
 *  chúng ở đây mà không đổi bên kia thì lời hứa gãy lại - có bài test giữ hai
 *  danh sách khớp nhau.
 *
 *  Bốn bài, không nhiều hơn: đủ để một người đọc thật và tự quyết định, chưa
 *  đủ để thay thế việc có tài khoản. Cả bốn đều là bài dữ liệu (không có trang
 *  viết tay trong app/bai-hoc/<slug>/), nên chúng đi qua LessonPageLayout và
 *  nhận được phần xử lý "khách chưa đăng nhập" ở đó. */
export const PREVIEW_LESSON_SLUGS = [
  "he-dieu-hanh-lam-gi", // TRACKS.personal.previewSlug
  "ke-toan-la-gi", // TRACKS.professional.previewSlug
  "tai-chinh-la-gi",
  "lai-suat-la-gi",
] as const;

const PREVIEW_SET: ReadonlySet<string> = new Set(PREVIEW_LESSON_SLUGS);

export function isPreviewLessonSlug(slug: string): boolean {
  return PREVIEW_SET.has(slug);
}

/** `/bai-hoc/<slug>` có phải một bài xem thử không.
 *
 *  Cắt chuỗi thủ công thay vì dùng regex: hàm này chạy trong proxy, trên mọi
 *  request, và nó phải từ chối cả `/bai-hoc/tai-chinh-la-gi/gi-do` lẫn
 *  `/bai-hoc/tai-chinh-la-gi/` - một regex `startsWith` lỏng tay ở đây là cách
 *  mở toang cả thư mục con mà không ai thấy. */
export function isPreviewLessonPath(pathname: string): boolean {
  const prefix = "/bai-hoc/";
  if (!pathname.startsWith(prefix)) return false;
  const rest = pathname.slice(prefix.length);
  if (rest.length === 0 || rest.includes("/")) return false;
  return isPreviewLessonSlug(rest);
}
