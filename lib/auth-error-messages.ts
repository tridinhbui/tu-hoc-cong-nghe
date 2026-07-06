// Supabase Auth returns raw English error messages. This maps the common ones
// to Vietnamese so the login/signup form never mixes languages mid-sentence.
const KNOWN_PATTERNS: Array<[RegExp, string]> = [
  [/email .*invalid/i, "Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại."],
  [/email not confirmed/i, "Email chưa được xác nhận. Kiểm tra hộp thư của bạn hoặc gửi lại email xác nhận bên dưới."],
  [/invalid login credentials/i, "Email hoặc mật khẩu không đúng."],
  [/user already registered/i, "Email này đã có tài khoản. Hãy đăng nhập thay vì đăng ký."],
  [/password should be at least/i, "Mật khẩu phải có ít nhất 6 ký tự."],
  [/rate limit/i, "Bạn đã thử quá nhiều lần. Vui lòng đợi một chút rồi thử lại."],
  [/network/i, "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."],
];

export function translateAuthError(message: string | undefined | null): string {
  if (!message) return "Có lỗi xảy ra. Vui lòng thử lại.";
  for (const [pattern, vi] of KNOWN_PATTERNS) {
    if (pattern.test(message)) return vi;
  }
  return "Có lỗi xảy ra. Vui lòng thử lại.";
}

export function isUnconfirmedEmailError(message: string | undefined | null): boolean {
  return !!message && /email not confirmed/i.test(message);
}
