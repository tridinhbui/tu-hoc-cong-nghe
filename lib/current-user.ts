import { createClient } from "@/lib/supabase";

/** Một chỗ hỏi "tôi là ai", dùng chung cho mọi component trên cùng một trang.
 *
 *  VÌ SAO. 32 component phía client gọi `supabase.auth.getUser()`, và trên một
 *  trang bài học có năm sáu cái cùng chạy lúc gắn - LessonNotes, BookmarkButton,
 *  LessonPageLayout, LessonStatsHover, ManualLessonFlagButton - mỗi cái mở một
 *  vòng mạng riêng ra Supabase Auth để hỏi đúng một câu, và nhận đúng một câu
 *  trả lời.
 *
 *  Hai thứ hàm này làm:
 *
 *  1. GỘP LỜI GỌI ĐANG BAY. Năm component gắn trong cùng một lượt render thì
 *     chỉ có một request; bốn cái còn lại chờ chung lời hứa đó.
 *  2. NHỚ KẾT QUẢ. Component gắn muộn hơn - panel mở ra, danh sách cuộn tới -
 *     lấy luôn kết quả đã có thay vì hỏi lại.
 *
 *  DÙNG getSession() CHỨ KHÔNG getUser(). `getUser()` gửi một request tới
 *  `/auth/v1/user` để máy chủ xác thực JWT; `getSession()` đọc phiên đã lưu sẵn
 *  và không đi mạng. Ở phía client thì phân biệt đó không mua được gì: người
 *  dùng nào cũng nói dối được với trình duyệt của chính mình, và thứ thật sự
 *  chặn là RLS trên từng truy vấn phía Supabase. Đây cũng là hướng dẫn của
 *  chính Supabase - `getUser()` cho phía máy chủ, `getSession()` cho phía
 *  client - và GlobalChatWrapper trong repo này đã làm đúng thế từ trước.
 *
 *  KHÔNG dùng cho quyết định phân quyền phía máy chủ. Ở đó vẫn phải là
 *  `getUser()` trên một server client, như proxy.ts và các route handler đang
 *  làm. */

export type CachedUser = {
  id: string;
  email: string | null;
  /** Dữ liệu do nhà cung cấp đăng nhập gắn kèm - `full_name`, `avatar_url` từ
   *  Google. UserProfile dùng nó làm hồ sơ dự phòng khi bảng `user_profiles`
   *  chưa có hàng cho người này. Giữ nguyên kiểu lỏng của Supabase vì nội dung
   *  phụ thuộc nhà cung cấp; đây không phải chỗ để siết nó. */
  user_metadata: Record<string, unknown> | undefined;
} | null;

let cached: { value: CachedUser } | null = null;
let inflight: Promise<CachedUser> | null = null;
let listening = false;

/** Quên kết quả đã nhớ. Gọi khi phiên đổi, và trong test. */
export function resetCurrentUserCache() {
  cached = null;
  inflight = null;
}

function listenOnce() {
  if (listening) return;
  listening = true;
  // Đăng nhập, đăng xuất, đổi phiên: bỏ hết phần đã nhớ. Không có dòng này thì
  // một người đăng xuất rồi đăng nhập bằng tài khoản khác trong cùng tab sẽ
  // thấy dữ liệu của tài khoản cũ cho tới khi tải lại trang.
  createClient().auth.onAuthStateChange(() => resetCurrentUserCache());
}

/** Người đang đăng nhập, hoặc null. Nhiều lời gọi cùng lúc chia chung một request. */
export async function getCurrentUser(): Promise<CachedUser> {
  listenOnce();
  if (cached) return cached.value;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const {
        data: { session },
      } = await createClient().auth.getSession();
      const value: CachedUser = session?.user
        ? {
            id: session.user.id,
            email: session.user.email ?? null,
            user_metadata: session.user.user_metadata,
          }
        : null;
      cached = { value };
      return value;
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}

/** Lối tắt cho phần lớn chỗ gọi, vốn chỉ cần id. */
export async function getCurrentUserId(): Promise<string | null> {
  return (await getCurrentUser())?.id ?? null;
}

/** Đọc một trường chuỗi trong `user_metadata`.
 *
 *  `user_metadata` là `Record<string, unknown>` vì nội dung do nhà cung cấp
 *  đăng nhập quyết định - đó là kiểu trung thực, và cái giá của nó là chỗ gọi
 *  phải tự ép kiểu. Hàm này nêu tên phép ép đó đúng một lần, và trả null cho
 *  cả trường thiếu lẫn trường có kiểu khác, thay vì để một `String(undefined)`
 *  lọt xuống thành chuỗi "undefined" hiện trên màn hình.
 */
export function metadataString(user: CachedUser, key: string): string | null {
  const value = user?.user_metadata?.[key];
  return typeof value === "string" && value.trim() !== "" ? value : null;
}
