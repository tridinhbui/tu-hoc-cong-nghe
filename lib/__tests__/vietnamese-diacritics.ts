/** Dấu tiếng Việt, để bộ kiểm bản dịch trả lời "chuỗi này còn là tiếng Việt à?".
 *
 *  Tách ra vì bốn bộ kiểm lớp phủ đã chép lại cùng một dãy 67 ký tự, và một dãy
 *  chép bốn lần là một dãy sẽ có lần thứ năm thiếu vài ký tự - lúc đó phép kiểm
 *  vẫn xanh trong khi vài chuỗi tiếng Việt lọt qua.
 *
 *  Nó KHÔNG bắt được chuỗi tiếng Việt không dấu ("Xong", "Hot"). Đó là giới hạn
 *  cố hữu của cách này; `scripts/i18n-coverage.mjs` mới là chỗ đo theo vị trí
 *  hiển thị và không phụ thuộc ngôn ngữ. */
export const VIETNAMESE_DIACRITICS =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

export function hasVietnameseDiacritics(value: string): boolean {
  return VIETNAMESE_DIACRITICS.test(value);
}
