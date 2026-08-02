-- Chẩn đoán realtime + presence. Chỉ đọc, không sửa gì.
--
-- Toàn bộ phần truy vấn dữ liệu chạy qua EXECUTE động, vì bản trước tham chiếu
-- thẳng user_profiles.last_seen_at và chết ngay lúc parse trên chính môi trường
-- cần chẩn đoán nhất - nơi cột đó chưa tồn tại. Một script chẩn đoán không được
-- phép giả định thứ nó đang đi kiểm tra là có thật.

-- drop rồi create, không dùng "if not exists": nếu phiên trước còn bảng tạm với
-- cấu trúc khác thì "if not exists" giữ nguyên bảng cũ và insert bên dưới chết.
drop table if exists _diag;
create temp table _diag (
  muc      text,
  hang_muc text,
  ket_qua  text
);

do $$
declare
  t text;
  n bigint;
  has_col boolean;
  tables text[] := array[
    'community_notifications', 'community_posts', 'community_post_comments',
    'community_post_reactions', 'chat_messages', 'user_friendships',
    'direct_messages', 'study_room_members', 'study_room_messages',
    'bug_reports', 'bug_report_messages'
  ];
begin
  -- 1. Bảng nào đang thực sự phát realtime.
  --    in_publication = false nghĩa là mọi .on("postgres_changes") cho bảng đó
  --    im lặng không bao giờ bắn.
  foreach t in array tables loop
    if to_regclass('public.' || t) is null then
      insert into _diag values ('1. realtime', t, 'BẢNG CHƯA TỒN TẠI');
    else
      insert into _diag values (
        '1. realtime',
        t,
        -- ::text ở mọi nhánh: relreplident cũng là kiểu "char", và mọi thứ ở đây
        -- đều đi vào toán tử || nên để kiểu unknown/"char" là tự chuốc 42725.
        case when exists (
          select 1 from pg_publication_tables
          where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t
        ) then 'trong publication'::text else '>>> THIẾU trong publication'::text end
        || ' | replica identity: '::text ||
        coalesce((
          select case c.relreplident::text
            when 'd' then 'default (chỉ PK)'::text when 'f' then 'full'::text
            when 'n' then 'nothing'::text when 'i' then 'index'::text
            else 'relreplident=' || c.relreplident::text end
          from pg_class c join pg_namespace ns on ns.oid = c.relnamespace
          where ns.nspname = 'public' and c.relname = t
        ), '?'::text)
      );
    end if;
  end loop;

  -- 2. Presence: cột và hai RPC.
  has_col := exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'user_profiles' and column_name = 'last_seen_at'
  );
  insert into _diag values ('2. presence', 'cột last_seen_at',
    case when has_col then 'có' else '>>> THIẾU' end);
  insert into _diag values ('2. presence', 'rpc get_online_users',
    case when exists (select 1 from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
                      where ns.nspname = 'public' and p.proname = 'get_online_users')
         then 'có' else '>>> THIẾU' end);
  insert into _diag values ('2. presence', 'rpc get_online_count',
    case when exists (select 1 from pg_proc p join pg_namespace ns on ns.oid = p.pronamespace
                      where ns.nspname = 'public' and p.proname = 'get_online_count')
         then 'có' else '>>> THIẾU' end);

  -- 3. Presence có dữ liệu thật không - chỉ hỏi được khi cột đã tồn tại.
  --    Cột có mà online_5min = 0 thì heartbeat không ghi được (nghi RLS/grant),
  --    khác hẳn với trường hợp thiếu cột (thiếu migration).
  if has_col then
    execute 'select count(*) from public.user_profiles where last_seen_at > now() - interval ''5 minutes''' into n;
    insert into _diag values ('3. dữ liệu presence', 'online trong 5 phút', n::text);
    execute 'select count(*) from public.user_profiles where last_seen_at is not null' into n;
    insert into _diag values ('3. dữ liệu presence', 'từng có last_seen_at', n::text);
    execute 'select coalesce(max(last_seen_at)::text, ''(chưa có)'') from public.user_profiles' into t;
    insert into _diag values ('3. dữ liệu presence', 'gần nhất', t);
  else
    insert into _diag values ('3. dữ liệu presence', '(bỏ qua)', 'chưa có cột last_seen_at');
  end if;

  -- 4. Chuông: đã có notification nào được sinh ra chưa.
  --    Bảng rỗng => lỗi nằm ở trigger, ALTER PUBLICATION sẽ không cứu được gì.
  if to_regclass('public.community_notifications') is null then
    insert into _diag values ('4. chuông', '(bỏ qua)', 'chưa có bảng community_notifications');
  else
    execute 'select count(*) from public.community_notifications' into n;
    insert into _diag values ('4. chuông', 'tổng notification', n::text);
    execute 'select count(*) from public.community_notifications where read_at is null' into n;
    insert into _diag values ('4. chuông', 'chưa đọc', n::text);
    execute 'select coalesce(max(created_at)::text, ''(chưa có)'') from public.community_notifications' into t;
    insert into _diag values ('4. chuông', 'mới nhất', t);
  end if;

  -- 5. Hai trigger sinh notification.
  --    tgenabled là kiểu "char" chứ không phải text, nên phải ::text trước khi
  --    nối chuỗi - nếu không Postgres không chọn được toán tử || nào (42725).
  for t in select unnest(array['community_post_comments_notify', 'community_post_reactions_notify']) loop
    insert into _diag values ('5. trigger', t,
      coalesce((select case tg.tgenabled::text
                         when 'O' then 'bật'
                         when 'D' then '>>> ĐANG TẮT'
                         else 'tgenabled=' || tg.tgenabled::text
                       end
                from pg_trigger tg where tg.tgname = t), '>>> KHÔNG TỒN TẠI'));
  end loop;
end $$;

select * from _diag order by muc, hang_muc;
