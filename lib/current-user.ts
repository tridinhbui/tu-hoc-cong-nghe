"use client";

/** Một chỗ hỏi "tôi là ai", dùng chung cho mọi component trên cùng một trang.
 *  Thay bản Supabase - xem lib/auth/current-user.ts cho phía máy chủ.
 *
 *  VÌ SAO. 32 component phía client gọi hàm này, và trên một trang bài học có
 *  năm sáu cái cùng chạy lúc gắn - LessonNotes, BookmarkButton,
 *  LessonPageLayout, LessonStatsHover, ManualLessonFlagButton - mỗi cái hỏi
 *  đúng một câu "ai đang đăng nhập" và nhận đúng một câu trả lời.
 *
 *  Hai thứ hàm này làm, không đổi so với bản cũ:
 *
 *  1. GỘP LỜI GỌI ĐANG BAY. Năm component gắn trong cùng một lượt render thì
 *     chỉ có một request; bốn cái còn lại chờ chung lời hứa đó.
 *  2. NHỚ KẾT QUẢ. Component gắn muộn hơn - panel mở ra, danh sách cuộn tới -
 *     lấy luôn kết quả đã có thay vì hỏi lại.
 *
 *  KHÔNG CÒN onAuthStateChange ĐỂ LẮNG NGHE. Cookie phiên là httpOnly - trình
 *  duyệt không thấy nó đổi, nên không có sự kiện nào để lắng nghe nữa. Thay
 *  vào đó, MỌI THAO TÁC ĐỔI PHIÊN (đăng nhập, đăng xuất) phải tự gọi
 *  `resetCurrentUserCache()` ngay sau khi request xong - xem signOut() dưới
 *  đây và app/login/page.tsx sau khi đăng nhập/đăng ký thành công.
 */

export type CachedUser = {
  id: string;
  email: string;
  role: string;
  /** Trực tiếp từ user_profiles - không còn "metadata" của nhà cung cấp tách
   *  riêng khỏi hồ sơ như Supabase. Cả hai đường tạo tài khoản (đăng ký,
   *  Google) đều ghi thẳng vào đây ngay lúc tạo - xem lib/auth/service.ts. */
  fullName: string | null;
  avatarUrl: string | null;
} | null;

let cached: { value: CachedUser } | null = null;
let inflight: Promise<CachedUser> | null = null;

/** Quên kết quả đã nhớ. Gọi ngay sau bất kỳ thao tác nào đổi phiên. */
export function resetCurrentUserCache() {
  cached = null;
  inflight = null;
}

/** Người đang đăng nhập, hoặc null. Nhiều lời gọi cùng lúc chia chung một request. */
export async function getCurrentUser(): Promise<CachedUser> {
  if (cached) return cached.value;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const res = await fetch("/api/auth/me");
      const body = (await res.json().catch(() => ({ user: null }))) as { user: CachedUser };
      const value = body.user ?? null;
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

/**
 * Đăng xuất. Thay `supabase.auth.signOut()`.
 *
 * Gọi route máy chủ để THU HỒI PHIÊN THẬT SỰ (xem lib/auth/session.ts) rồi
 * mới quên bộ nhớ đệm cục bộ - làm ngược lại (quên trước, gọi sau) để lại một
 * khoảng ngắn nơi getCurrentUser() gọi lại và có thể vẫn thấy phiên cũ nếu
 * request đăng xuất chưa xong.
 */
export async function signOut(): Promise<void> {
  await fetch("/api/auth/sign-out", { method: "POST" }).catch(() => {});
  resetCurrentUserCache();
}
