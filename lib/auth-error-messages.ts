import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

/** Thông báo lỗi đăng nhập/đăng ký, theo đúng ngôn ngữ giao diện.
 *
 *  Chuỗi nằm ở lib/i18n/dictionaries/sections/misc-data.ts. Một người đang đọc
 *  giao diện tiếng Anh gõ sai mật khẩu phải nhận câu tiếng Anh - đây là màn hình
 *  đầu tiên của người chưa vào được ứng dụng, chỗ tệ nhất để lộ bản dịch dở.
 *
 *  Tệp này từng có thêm một bộ khớp regex trên CHUỖI LỖI TIẾNG ANH THÔ của dịch
 *  vụ xác thực cũ ("invalid login credentials", "email not confirmed"...). Nó
 *  đã gỡ cùng dịch vụ ấy: lớp xác thực trên D1 trả một MÃ lỗi ổn định, nên
 *  không còn câu tự do nào để đoán ý, và bộ khớp không còn ai gọi. */
/** Ánh xạ MÃ LỖI của lib/auth/service.ts (`AuthError.code`) sang câu đã dịch. */
const CODE_TO_KEY: Partial<Record<string, keyof Dictionary["authErrors"]>> = {
  email_invalid: "invalidEmail",
  email_taken: "alreadyRegistered",
  email_taken_unverified: "alreadyRegistered",
  password_too_short: "passwordTooShort",
  invalid_credentials: "badCredentials",
  account_disabled: "accountDisabled",
  reset_invalid: "resetInvalid",
};

export function translateAuthErrorCode(code: string | undefined | null, t: Dictionary): string {
  const key = code ? CODE_TO_KEY[code] : undefined;
  return key ? t.authErrors[key] : t.authErrors.generic;
}
