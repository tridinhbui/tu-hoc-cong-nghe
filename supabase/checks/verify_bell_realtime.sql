-- Xác nhận chuông thông báo đã thực sự phát realtime.
-- Chỉ đọc, chạy lại bao nhiêu lần cũng được.
--
-- Chạy sau khi apply 20260824_realtime_publication.sql. Nếu dòng
-- community_notifications không hiện "OK" thì badge sẽ vẫn chỉ nhảy lúc
-- reload trang, vì lib/supabase-community.ts vẫn nhận SUBSCRIBED nhưng
-- postgres_changes không bao giờ bắn cho bảng ngoài publication.

select
  t.tablename,
  case
    when p.tablename is null then '>>> THIẾU - realtime sẽ im lặng'
    else 'OK'
  end as trong_publication
from (values
  ('community_notifications'),   -- chuông  <- dòng quan trọng nhất
  ('community_posts'),
  ('community_post_comments'),
  ('community_post_reactions'),
  ('chat_messages'),
  ('user_friendships'),
  ('direct_messages'),
  ('study_room_members'),
  ('study_room_messages'),
  ('bug_reports'),
  ('bug_report_messages')
) as t(tablename)
left join pg_publication_tables p
  on p.pubname = 'supabase_realtime'
 and p.schemaname = 'public'
 and p.tablename = t.tablename
order by (t.tablename <> 'community_notifications'), t.tablename;
