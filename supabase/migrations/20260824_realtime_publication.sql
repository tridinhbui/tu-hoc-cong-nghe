-- Realtime publication + presence repair.
--
-- Hai lỗi khác nhau, cùng biểu hiện "chết trên production":
--
-- 1. CHUÔNG THÔNG BÁO. lib/supabase-community.ts subscribeToCommunityNotifications
--    lắng nghe postgres_changes INSERT trên community_notifications. Nhưng
--    postgres_changes chỉ phát cho những bảng NẰM TRONG publication
--    `supabase_realtime`, và không migration nào trong repo từng thêm bảng vào đó
--    (grep `ALTER PUBLICATION supabase_realtime` = 0 kết quả). Subscribe vẫn báo
--    SUBSCRIBED, không có lỗi nào ở client - nó chỉ im lặng không bao giờ bắn.
--    Badge chỉ nhảy khi reload trang, vì lúc mount còn gọi getUnreadNotificationCount.
--
--    Việc bật toggle Realtime trong Dashboard → Database → Replication chính là
--    câu ALTER PUBLICATION dưới đây; làm bằng SQL để nó được version control,
--    không phải nhớ đi click lại mỗi lần dựng môi trường mới.
--
-- 2. PRESENCE. Không hề dùng realtime - lib/presence.ts ghi user_profiles.last_seen_at
--    mỗi 60s rồi đọc lại qua RPC get_online_users/get_online_count. Nếu nó chết thì
--    do 20260717_gamification_and_presence.sql chưa chạy trên production: thiếu cột
--    last_seen_at hoặc thiếu hai RPC. Đáng lưu ý là lib/presence.ts nuốt lỗi loại
--    này (isMissingError trả true cho 42P01/42883/42703) và getOnlineUsers trả []
--    - nên hỏng kiểu này không để lại dấu vết nào trong console.
--
--    Phần dưới dựng lại cả ba thứ đó, idempotent, chạy lại nhiều lần vô hại.

-- ── 1. Publication ─────────────────────────────────────────────────────────

-- Publication có sẵn trên mọi project Supabase, nhưng project dựng tay có thể
-- chưa có. Tạo rỗng rồi thêm từng bảng, thay vì FOR ALL TABLES (đưa cả bảng
-- nhạy cảm lên realtime là chuyện khác hẳn).
do $$
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
end $$;

-- Mỗi bảng ở đây tương ứng đúng một .on("postgres_changes", ...) trong code.
-- Thêm bảng không có subscriber chỉ tốn băng thông WAL, nên danh sách này bám
-- sát code chứ không quét toàn schema.
do $$
declare
  t text;
  realtime_tables text[] := array[
    'community_notifications',      -- NotificationBell (chuông)
    'community_posts',              -- feed cộng đồng
    'community_post_comments',
    'community_post_reactions',
    'chat_messages',                -- chat với admin
    'user_friendships',             -- đồ thị bạn bè
    'direct_messages',              -- nhắn tin riêng
    'study_room_members',           -- phòng học nhóm
    'study_room_messages',
    'bug_reports',                  -- báo lỗi
    'bug_report_messages'
  ];
begin
  foreach t in array realtime_tables loop
    -- bảng có thể chưa tồn tại nếu migration tương ứng chưa chạy; bỏ qua
    if not exists (
      select 1 from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relname = t and c.relkind = 'r'
    ) then
      raise notice 'bỏ qua %: bảng chưa tồn tại', t;
      continue;
    end if;

    if exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t
    ) then
      raise notice 'đã có sẵn: %', t;
      continue;
    end if;

    execute format('alter publication supabase_realtime add table public.%I', t);
    raise notice 'đã thêm: %', t;
  end loop;
end $$;

-- ── 2. REPLICA IDENTITY FULL cho các bảng có lắng nghe DELETE ──────────────
--
-- Mặc định REPLICA IDENTITY là primary key, nên sự kiện DELETE chỉ mang theo
-- khoá chính trong payload.old. Hai hệ quả, cả hai đều im lặng:
--   - filter trên cột khác PK (vd `user_id=eq.…` của chat_messages) không khớp
--     được vì cột đó không có trong payload → sự kiện bị bỏ.
--   - RLS không đánh giá được → sự kiện bị bỏ.
-- Các bảng dưới đây đều có handler event "*" hoặc "DELETE" trong code.
--
-- Đánh đổi: FULL ghi toàn bộ hàng cũ vào WAL mỗi lần UPDATE/DELETE. Với mấy
-- bảng nhắn tin/phản ứng cỡ này thì không đáng kể; đừng bê nguyên sang bảng lớn.
do $$
declare
  t text;
  full_identity_tables text[] := array[
    'chat_messages',                -- có handler DELETE, filter user_id
    'community_post_comments',      -- event "*"
    'community_post_reactions',     -- event "*"
    'user_friendships',             -- event "*", filter user_a/user_b
    'study_room_members',           -- event "*"
    'study_room_messages'           -- event "*"
  ];
begin
  foreach t in array full_identity_tables loop
    if exists (
      select 1 from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relname = t and c.relkind = 'r'
    ) then
      execute format('alter table public.%I replica identity full', t);
    end if;
  end loop;
end $$;

-- ── 3. Presence: ĐÃ BỎ ─────────────────────────────────────────────────────
--
-- Bản đầu của migration này còn dựng lại last_seen_at + hai RPC
-- get_online_users/get_online_count. Phần đó đã được gỡ theo quyết định sản
-- phẩm: chỉ giữ chuông thông báo realtime, không duy trì presence.
--
-- Phía ứng dụng đã gỡ tương ứng - pingPresence, getOnlineUsers và
-- lib/use-presence-heartbeat.ts không còn tồn tại, widget "Đang online" giờ
-- chỉ hiển thị con số dựng trong lib/presence.ts. Không có gì trong code đọc
-- hay ghi last_seen_at nữa, nên tạo các đối tượng đó ở đây sẽ là dựng lược đồ
-- cho một tính năng không còn.
