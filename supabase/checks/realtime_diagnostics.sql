-- Chẩn đoán realtime. Chỉ đọc, chạy lại bao nhiêu lần cũng được.
--
-- Bổ sung cho verify_bell_realtime.sql: file kia chỉ trả lời "bảng đã vào
-- publication chưa", file này trả lời phần còn lại khi chuông vẫn im dù
-- publication đã đúng.
--
-- Bản trước còn kiểm tra presence (last_seen_at + get_online_users/
-- get_online_count). Phần đó đã bỏ: presence được gỡ theo quyết định sản phẩm,
-- nên đi tìm mấy đối tượng đó chỉ tạo ra một dòng ">>> THIẾU" vĩnh viễn cho
-- thứ cố ý không tồn tại - đúng kiểu cảnh báo giả làm người đọc mất lòng tin
-- vào cả bản báo cáo.
--
-- Bản trước cũng gom kết quả vào một bảng tạm bên trong một khối DO. Cách đó
-- có một nhược điểm đã tự bộc lộ: chỉ cần một lỗi ở bất kỳ dòng nào là cả khối
-- rollback và không thấy được gì, kể cả những mục đã chạy xong. Ở đây tách
-- thành các câu lệnh rời, câu nào lỗi thì chỉ mất câu đó.

-- ── 1. Publication + replica identity ──────────────────────────────────────
--
-- Cột replica_identity là thứ verify_bell_realtime.sql không kiểm. Bảng vào
-- publication rồi nhưng để "default" thì sự kiện DELETE chỉ mang theo khoá
-- chính, nên filter trên cột khác (vd `user_id=eq.…`) không khớp được và RLS
-- cũng không đánh giá được - sự kiện bị bỏ, vẫn im lặng như cũ.
-- Cột can_replica_full = true là những bảng có handler DELETE hoặc event "*",
-- tức là những bảng bắt buộc phải ở "full".
select
  t.tablename,
  case when p.tablename is null then '>>> THIẾU trong publication' else 'OK' end
    as trong_publication,
  coalesce((
    select case c.relreplident::text
      when 'd' then 'default (chỉ PK)' when 'f' then 'full'
      when 'n' then 'nothing' when 'i' then 'index'
      else 'relreplident=' || c.relreplident::text end
    from pg_class c
    join pg_namespace ns on ns.oid = c.relnamespace
    where ns.nspname = 'public' and c.relname = t.tablename
  ), '>>> BẢNG KHÔNG TỒN TẠI') as replica_identity,
  t.can_full as can_replica_full
from (values
  ('community_notifications', false),  -- chuông: chỉ nghe INSERT
  ('community_posts',         false),  -- chỉ nghe INSERT
  ('community_post_comments', true),   -- event "*"
  ('community_post_reactions',true),   -- event "*"
  ('chat_messages',           true),   -- có handler DELETE, filter user_id
  ('user_friendships',        true),   -- event "*", filter user_a/user_b
  ('direct_messages',         false),  -- chỉ nghe INSERT
  ('study_room_members',      true),   -- event "*"
  ('study_room_messages',     true),   -- event "*"
  ('bug_reports',             false),
  ('bug_report_messages',     false)
) as t(tablename, can_full)
left join pg_publication_tables p
  on p.pubname = 'supabase_realtime'
 and p.schemaname = 'public'
 and p.tablename = t.tablename
order by (p.tablename is not null), t.tablename;

-- ── 2. Hai trigger sinh notification ───────────────────────────────────────
--
-- tgenabled là kiểu "char" chứ không phải text, nên phải ::text trước khi nối
-- chuỗi - thiếu cast thì Postgres không chọn được toán tử || nào (lỗi 42725).
select
  t.tgname,
  coalesce((
    select case tg.tgenabled::text
      when 'O' then 'bật'
      when 'D' then '>>> ĐANG TẮT'
      else 'tgenabled=' || tg.tgenabled::text end
    from pg_trigger tg where tg.tgname = t.tgname
  ), '>>> KHÔNG TỒN TẠI') as trang_thai
from (values
  ('community_post_comments_notify'),
  ('community_post_reactions_notify')
) as t(tgname);

-- ── 3. Đã có notification nào được sinh ra chưa ────────────────────────────
--
-- Câu quyết định: nếu tổng = 0 thì lỗi nằm ở trigger chứ không phải realtime,
-- và ALTER PUBLICATION sẽ không cứu được gì.
--
-- Chạy qua EXECUTE động vì bảng có thể chưa tồn tại trên môi trường chưa apply
-- migration community_notifications - tham chiếu tĩnh sẽ làm sập câu lệnh ngay
-- lúc parse, đúng trên môi trường cần chẩn đoán nhất.
do $$
declare
  tong bigint;
  chua_doc bigint;
  moi_nhat text;
begin
  if to_regclass('public.community_notifications') is null then
    raise notice 'community_notifications: BẢNG KHÔNG TỒN TẠI';
    return;
  end if;
  execute 'select count(*) from public.community_notifications' into tong;
  execute 'select count(*) from public.community_notifications where read_at is null' into chua_doc;
  execute 'select coalesce(max(created_at)::text, ''(chưa có)'') from public.community_notifications'
    into moi_nhat;
  raise notice 'community_notifications: tổng=%, chưa đọc=%, mới nhất=%', tong, chua_doc, moi_nhat;
  if tong = 0 then
    raise notice '>>> Bảng rỗng: lỗi ở TRIGGER, không phải realtime.';
  end if;
end $$;
