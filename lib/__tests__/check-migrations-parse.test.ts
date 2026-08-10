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

/** Function bị xoá hẳn.
 *
 *  `expected_functions` từng là HỢP của mọi `create function` từ trước tới nay,
 *  không có phép trừ. Một migration chỉ xoá mà không tạo lại sẽ để tên đó nằm
 *  lại vĩnh viễn, và verify_migrations.sql báo "thiếu function" trên một
 *  database đã chạy đúng mọi migration - một cổng kêu nhầm, đúng thứ AGENTS.md
 *  nói là sẽ bị học cách phớt lờ.
 *
 *  Không lộ ra lần nào vì mọi `drop function` trong repo tới lúc đó đều là
 *  xoá-rồi-tạo-lại để đổi chữ ký. Hai hình dạng ấy phải cho ra hai kết quả
 *  ngược nhau, nên cả hai đều được kiểm ở đây. */
describe("đọc function bị xoá", () => {
  it("đọc được drop function, cả dạng có if exists lẫn có tham số", () => {
    expect([...parseMigration("drop function if exists public.purchase_shop_item(text);").droppedFunctions]).toEqual([
      "purchase_shop_item",
    ]);
    expect([...parseMigration("drop function cu_the(bigint, int);").droppedFunctions]).toEqual(["cu_the"]);
  });

  it("xoá-rồi-tạo-lại thì tên nằm ở CẢ HAI tập, nên emitSql giữ lại", () => {
    // Hình dạng thật trong 20260902_quiz_mistake_question_hash.sql: xoá chữ ký
    // 3 tham số rồi tạo lại bản 4 tham số. Phép trừ ở emitSql bỏ qua tên nào
    // được tạo lại trong cùng file, và điều kiện đó đọc từ hai tập này.
    const sql = `
      drop function if exists public.record_quiz_mistake(bigint, int, boolean);
      create or replace function public.record_quiz_mistake(
        p_lesson_id bigint, p_question_index int, p_was_correct boolean, p_question_hash text
      ) returns void language plpgsql as $$ begin end $$;
    `;
    const m = parseMigration(sql);
    expect(m.functions.has("record_quiz_mistake")).toBe(true);
    expect(m.droppedFunctions.has("record_quiz_mistake")).toBe(true);
  });

  it("comment không xoá function", () => {
    expect([...parseMigration("-- drop function public.van_con_day(text);").droppedFunctions]).toEqual([]);
  });
});

/** Policy và trigger mang theo schema.
 *
 *  Một lượt chạy thật trên database trả về 27 dòng, và 11 trong số đó là lỗi
 *  của chính bộ kiểm chứ không phải migration chưa chạy. Sáu dòng là schema:
 *  policy nằm trên `storage.objects` và trigger nằm trên `auth.users` bị đối
 *  chiếu với `schemaname = 'public'`, nên chúng báo thiếu trên MỌI database,
 *  kể cả một database hoàn hảo. Bốn dòng nữa là policy đã bị migration sau xoá
 *  hẳn - đúng lỗi thiếu-phép-trừ đã sửa cho function. */
describe("policy và trigger có schema", () => {
  it("giữ đúng schema của policy trên storage.objects", () => {
    const sql = `create policy "Avatar images are publicly accessible" on storage.objects for select using (true);`;
    expect([...parseMigration(sql).policies]).toEqual(["storage|objects|Avatar images are publicly accessible"]);
  });

  it("không có schema thì mặc định là public", () => {
    expect([...parseMigration(`create policy "Anyone can view lessons" on lessons for select using (true);`).policies]).toEqual([
      "public|lessons|Anyone can view lessons",
    ]);
    expect([...parseMigration(`create policy "X" on public.user_stats for select using (true);`).policies]).toEqual([
      "public|user_stats|X",
    ]);
  });

  it("KHÔNG đọc ra bảng tên 'public' từ câu format() có %I", () => {
    // Cùng cái bẫy đã làm hỏng phần realtime: `public\.` tuỳ chọn lùi về rỗng
    // rồi IDENT khớp chính chữ "public". Tên bảng thật nằm trong biến `t`, đọc
    // tĩnh không biết được, nên không khớp gì mới là đúng.
    const sql = `execute format('create policy "CFA library is readable by signed-in users" on public.%I for select to authenticated using (true)', t);`;
    expect([...parseMigration(sql).policies]).toEqual([]);
  });

  it("đọc được drop policy để emitSql trừ đi", () => {
    const sql = `drop policy if exists "Users can insert own quiz sessions" on public.user_quiz_sessions;`;
    expect([...parseMigration(sql).droppedPolicies]).toEqual(["public|user_quiz_sessions|Users can insert own quiz sessions"]);
  });

  it("giữ đúng schema của trigger trên auth.users", () => {
    const sql = `create trigger on_auth_user_created after insert on auth.users for each row execute function public.create_profile_for_auth_user();`;
    expect([...parseMigration(sql).triggers]).toEqual(["auth|on_auth_user_created"]);
  });

  it("trigger trên bảng public giữ nguyên schema public", () => {
    const sql = `create trigger lesson_notes_updated_at before update on public.lesson_notes for each row execute function handle_updated_at();`;
    expect([...parseMigration(sql).triggers]).toEqual(["public|lesson_notes_updated_at"]);
  });
});
