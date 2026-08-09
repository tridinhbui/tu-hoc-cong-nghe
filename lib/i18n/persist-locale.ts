import { createClient } from "@/lib/supabase";
import type { Locale } from "./locales";

/** Ghi ngôn ngữ đang chọn vào hồ sơ người dùng.
 *
 *  Cookie `thtcdn_locale` đủ cho mọi thứ chạy TRONG một request: nó đọc được
 *  ngay ở server component và không cần đăng nhập. Nó không đủ cho những thứ
 *  chạy khi người dùng không có mặt - năm route cron gửi email không có trình
 *  duyệt nào để đọc cookie, nên trước đây chúng gửi tiếng Việt cho cả người
 *  đã chuyển sang tiếng Anh từ lâu.
 *
 *  Im lặng khi hỏng là CỐ Ý ở đây, khác với quy tắc thường: đây là ghi phụ
 *  cho một tính năng nền, còn thao tác người dùng vừa làm - đổi ngôn ngữ - đã
 *  thành công rồi. Báo lỗi đỏ vì email tuần sau có thể sai thứ tiếng thì
 *  đúng là làm phiền đúng người vào sai lúc. Khách chưa đăng nhập thì không
 *  có hồ sơ để ghi, và đó là trường hợp bình thường chứ không phải lỗi. */
export async function persistPreferredLocale(locale: Locale): Promise<void> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("user_profiles").update({ preferred_locale: locale }).eq("id", user.id);
  } catch {
    // Xem chú thích trên: cookie đã đổi, giao diện đã đổi.
  }
}
