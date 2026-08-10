import { describe, expect, it } from "vitest";
import { parseMigration } from "@/scripts/check-migrations.mjs";

/** Phần đọc migration của scripts/check-migrations.mjs.
 *
 *  Chỉ kiểm loại đối tượng THỨ NĂM - bảng nằm trong publication
 *  `supabase_realtime`. Bốn loại kia (function, index, policy, trigger) khớp
 *  bằng những mẫu đã chạy đúng suốt, còn loại này vừa được thêm và vừa sai hai
 *  lần liên tiếp theo cùng một kiểu.
 *
 *  Vì sao đáng có bộ kiểm: một bảng bị BỎ SÓT ở đây thì realtime chết trong im
 *  lặng - subscribe vẫn báo SUBSCRIBED, không lỗi nào ở client, sự kiện không
 *  bao giờ bắn. Còn một tên GIẢ thì bộ kiểm tự sinh ra một phát hiện không có
 *  thật, và AGENTS.md đã nói rõ chuyện gì xảy ra với một cổng kêu nhầm. */

describe("đọc danh sách bảng realtime", () => {
  it("đọc được mảng realtime_tables trong khối do $$", () => {
    const sql = `
      do $$
      declare
        t text;
        realtime_tables text[] := array[
          'community_notifications',      -- chuông
          'direct_messages'               -- nhắn tin riêng
        ];
      begin
      end $$;
    `;
    expect([...parseMigration(sql).realtime].sort()).toEqual(["community_notifications", "direct_messages"]);
  });

  it("đọc được dạng alter publication thường", () => {
    expect([...parseMigration("alter publication supabase_realtime add table public.chat_messages;").realtime]).toEqual(
      ["chat_messages"]
    );
    expect([...parseMigration("alter publication supabase_realtime add table bug_reports;").realtime]).toEqual([
      "bug_reports",
    ]);
  });

  it("KHÔNG đọc ra tên giả từ câu format() có %I", () => {
    // Câu thật trong 20260824_realtime_publication.sql. Nó làm mẫu đầu tiên
    // sinh ra bảng "public" (tiền tố `public.` là tuỳ chọn nên engine lùi về
    // rỗng rồi khớp chính chữ đó), và mẫu thứ hai - chỉ chặn dấu chấm - sinh
    // ra bảng "publi", vì lùi thêm một ký tự nữa thì sau nó là "c" chứ không
    // phải ".". Chặn cả chữ lẫn dấu chấm mới hết đường lùi.
    const sql = `execute format('alter publication supabase_realtime add table public.%I', t);`;
    expect([...parseMigration(sql).realtime]).toEqual([]);
  });

  it("comment không tạo ra bảng", () => {
    const sql = `-- alter publication supabase_realtime add table khong_co_that;`;
    expect([...parseMigration(sql).realtime]).toEqual([]);
  });
});
