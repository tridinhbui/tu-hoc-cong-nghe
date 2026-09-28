/** Ghép bản dịch lên một câu hỏi ĐÃ ĐƯỢC GIAO, giữ nguyên ô đáp án.
 *
 *  Tách ra thành một hàm riêng vì hai bên phải dùng CHUNG một luật:
 *  app/(app)/phong-van-ky-thuat gọi nó khi dịch lại tại chỗ, và
 *  lib/__tests__/interview-option-order.test.ts gác nó. Bản trước của bộ kiểm
 *  ấy chép lại luật thay vì gọi nó, nên sửa trang mà quên sửa bộ kiểm thì bộ
 *  kiểm vẫn xanh - đúng hình dạng "bản in và cổng trôi khỏi nhau" mà AGENTS.md
 *  ghi cho phép đo lệch bản dịch.
 *
 *  Vấn đề nó giải: /api/knowledge-challenge XÁO thứ tự phương án lúc giao và
 *  ánh xạ lại `correct` theo hoán vị ấy, trong khi bản dịch đọc thẳng từ kho
 *  câu hỏi nên nó ở thứ tự TÁC GIẢ. Thay thẳng mảng dịch vào mà giữ nguyên
 *  `correct` là đánh dấu vào một ô bất kỳ: với câu bốn phương án, 23 trong 24
 *  hoán vị cho ra ô SAI, và `results` cũng so bằng chính `correct` đó nên
 *  người chọn đúng theo nội dung bị chấm sai. */
export function applyOptionOrder(
  deliveredOptions: readonly string[],
  optionOrder: readonly number[] | undefined,
  translatedOptions: readonly string[]
): string[] {
  const safe =
    Array.isArray(optionOrder) &&
    optionOrder.length === deliveredOptions.length &&
    translatedOptions.length === deliveredOptions.length &&
    optionOrder.every((i) => Number.isInteger(i) && i >= 0 && i < translatedOptions.length) &&
    new Set(optionOrder).size === optionOrder.length;
  // Không đủ điều kiện thì giữ nguyên phương án của máy chủ thay vì đoán hoán
  // vị: sai ngôn ngữ ở bốn dòng còn sửa được bằng một lượt bấm, sai đáp án thì
  // không. Trường hợp thật là phản hồi từ một bản máy chủ cũ hơn bản gửi kèm
  // `optionOrder`, còn `new Set(...)` chặn một mảng đúng độ dài nhưng lặp chỉ
  // số - thứ sẽ nhân bản một phương án và làm mất một phương án khác.
  return safe ? optionOrder!.map((i) => translatedOptions[i]) : [...deliveredOptions];
}
