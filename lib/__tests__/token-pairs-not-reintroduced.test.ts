import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";

/**
 * Cổng một chiều cho tầng token màu.
 *
 * VẤN ĐỀ. 2.637 lớp đã được gộp từ các cặp `X dark:Y` thành một token. Nhưng
 * không có gì ngăn mã MỚI viết lại đúng cặp cũ - `text-stone-900
 * dark:text-stone-100` vẫn hợp lệ, vẫn hiện ra đúng màu, và không bộ kiểm nào
 * để ý. Sau vài chục màn hình mới, tầng token lại thành một hòn đảo giữa 14
 * nghìn lớp gắn cứng, và lần dọn sau phải làm lại từ đầu.
 *
 * CÁCH GÁC. `scripts/tokenize-ui.mjs` không có `--apply` thì chỉ ĐẾM chứ không
 * ghi gì. Nếu nó đếm ra số khác 0 nghĩa là có cặp KHỚP CHÍNH XÁC một token
 * đang tồn tại mà chưa được gộp - tức là ai đó vừa viết lại bằng tay.
 *
 * PHẠM VI HẸP CÓ CHỦ Ý. Cổng này KHÔNG đòi mọi màu phải là token: còn 8.600
 * lớp gắn cứng và phần lớn không có token tương ứng (đuôi dài 211 kiểu cặp,
 * mỗi kiểu vài lần). Nó chỉ chặn việc dùng lại đúng những cặp ĐÃ có tên.
 * Một cổng đòi hỏi nhiều hơn thế sẽ đỏ ngay hôm nay và bị tắt đi trong tuần.
 *
 * CÁCH SỬA KHI ĐỎ: chạy `node scripts/tokenize-ui.mjs --apply`.
 */
describe("không viết lại cặp màu đã có token", () => {
  it("scripts/tokenize-ui.mjs không tìm thấy cặp nào để gộp", () => {
    const out = execFileSync("node", ["scripts/tokenize-ui.mjs"], { encoding: "utf8" });
    const m = /sẽ gộp (\d+) cặp/.exec(out);
    expect(m, `không đọc được kết quả script:\n${out}`).toBeTruthy();

    const con = Number(m![1]);
    expect(
      con,
      `Có ${con} cặp khớp chính xác một token đang tồn tại nhưng viết bằng tay.\n` +
        `Sửa: node scripts/tokenize-ui.mjs --apply\n\n${out}`
    ).toBe(0);
  });
});

/**
 * Cổng thứ hai, cho một lớp lỗi khác hẳn.
 *
 * `converge-dark-pairs.mjs` từng dùng `dark:\1?` - vế sáng được mang một bổ ngữ
 * mà vế tối thì không - nên nó coi `hover:bg-stone-800 dark:bg-stone-100` là một
 * cặp sáng/tối. Đó là trạng thái hover của nền sáng đứng cạnh nền CƠ SỞ của nền
 * tối: hai thứ khác nhau. Gộp chúng xoá mất một trong hai, ở 37 chỗ. Tám nút mất
 * hover ở nền sáng (`hover:bg-stone-800` thành `hover:bg-stone-900`, trùng đúng
 * lớp nền nên hover vô hiệu); `OnboardingFlow` mất `dark:text-stone-600`.
 *
 * Không cái nào làm đỏ build hay bộ kiểm nào - chúng chỉ hiện sai màu, im lặng.
 *
 * Cổng: script phải BẤT ĐỘNG. Nếu nó còn muốn đổi gì nghĩa là có cặp mới trôi
 * ra khỏi bạn tối đã thống nhất, hoặc regex lại nới ra như cũ.
 */
describe("thống nhất bạn tối là bất động", () => {
  it("converge-dark-pairs.mjs không còn gì để đổi", () => {
    const out = execFileSync("node", ["scripts/converge-dark-pairs.mjs"], { encoding: "utf8" });
    const m = /sẽ đổi (\d+) chỗ/.exec(out);
    expect(m, `không đọc được kết quả script:\n${out}`).toBeTruthy();
    expect(Number(m![1]), `Sửa: node scripts/converge-dark-pairs.mjs --apply\n\n${out}`).toBe(0);
  });
});
