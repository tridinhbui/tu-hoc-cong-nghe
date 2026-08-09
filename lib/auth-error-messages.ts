import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

/** Supabase Auth trả về thông báo lỗi tiếng Anh thô. Bảng này ánh xạ những
 *  lỗi hay gặp sang câu của người dùng, để form đăng nhập/đăng ký không trộn
 *  hai ngôn ngữ giữa một câu.
 *
 *  Trước đây câu trả về là chuỗi tiếng Việt viết cứng ngay trong bảng, nên một
 *  người đang đọc giao diện tiếng Anh gõ sai mật khẩu vẫn nhận một câu tiếng
 *  Việt. Đây là màn hình đầu tiên của bất kỳ ai chưa vào được ứng dụng, tức
 *  chỗ tệ nhất để lộ ra rằng bản dịch chưa xong.
 *
 *  Chuỗi nằm ở lib/i18n/dictionaries/sections/misc-data.ts, do phiên chạy song
 *  song dựng sẵn cùng lập luận vì sao bản tiếng Anh KHÔNG phải chuỗi thô của
 *  Supabase mà là câu đã viết lại. File này chỉ nối dây, không dựng khoá mới.
 *
 *  MẪU KHỚP GIỮ NGUYÊN TIẾNG ANH và không dịch: chúng khớp với thông báo do
 *  Supabase sinh ra, không phải với chữ người dùng nhìn thấy. Dịch chúng là
 *  làm mọi phép khớp trượt hết và ai cũng nhận câu chung chung. */
const KNOWN_PATTERNS: Array<[RegExp, keyof Dictionary["authErrors"]]> = [
  [/email .*invalid/i, "invalidEmail"],
  [/email not confirmed/i, "notConfirmed"],
  [/invalid login credentials/i, "badCredentials"],
  [/user already registered/i, "alreadyRegistered"],
  [/password should be at least/i, "passwordTooShort"],
  [/rate limit/i, "rateLimit"],
  [/network/i, "network"],
];

export function translateAuthError(message: string | undefined | null, t: Dictionary): string {
  if (!message) return t.authErrors.generic;
  for (const [pattern, key] of KNOWN_PATTERNS) {
    if (pattern.test(message)) return t.authErrors[key];
  }
  return t.authErrors.generic;
}

export function isUnconfirmedEmailError(message: string | undefined | null): boolean {
  return !!message && /email not confirmed/i.test(message);
}
