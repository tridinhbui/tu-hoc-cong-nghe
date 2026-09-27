/**
 * Độ dài mật khẩu tối thiểu - MỘT nguồn cho máy chủ, form và câu thông báo.
 *
 * Tách ra tệp riêng, không "server-only", để trang đăng ký và trang đặt lại mật
 * khẩu import được. Trước đây con số nằm rải ở ba tầng và lệch nhau: máy chủ
 * (lib/auth/service.ts) đòi 8, còn form kiểm `< 6` và bốn câu thông báo nói "ít
 * nhất 6" - mặc định của dịch vụ xác thực cũ, sót lại khi lớp xác thực được viết
 * mới. Mật khẩu 7 ký tự qua được form, rồi bị máy chủ từ chối kèm một câu nói
 * rằng 7 ký tự là đủ.
 *
 * lib/__tests__/password-policy.test.ts đỏ khi bất kỳ câu thông báo nào nêu một
 * con số khác hằng số này.
 */
export const MIN_PASSWORD_LENGTH = 8;
