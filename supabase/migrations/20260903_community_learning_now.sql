-- Cộng đồng đang học gì, bằng người thật.
--
-- Màn hình "Học bài" hiện những con số kiểu "219 người đang học" mà không có
-- người nào thật đằng sau: chúng do getIllustrativeCount() trong
-- lib/illustrative-stats.ts băm slug bài học ra một số trong khoảng cho trước.
-- Chú thích của chính file đó viết "NOT real telemetry - purely a social-proof
-- visual". Cùng một bài học luôn ra cùng một con số, kể cả khi không một ai mở
-- nó suốt tuần.
--
-- Dữ liệu thật thì có đủ, và nhiều hơn con số bịa: 1.237 hàng user_streaks,
-- 19.459 hàng user_progress. Đo lúc viết bản này, 456 người còn chuỗi ngày
-- trong 7 ngày gần nhất và 161 người có hoạt động trong 24 giờ. Thiếu duy nhất
-- một đường đọc.
--
-- VÌ SAO PHẢI LÀ SECURITY DEFINER. Đây là cùng một lý do đã ghi ở
-- lib/supabase-user.ts: RLS của user_profiles chỉ cho `auth.uid() = id`. Một
-- câu join từ trình duyệt không trả về ít dòng hơn - nó trả về ĐÚNG MỘT DÒNG,
-- của chính người đang đăng nhập, vì embedded resource của PostgREST là inner
-- join nên mọi hàng không đọc được profile đều bị loại âm thầm. Không có lỗi
-- nào nổi lên giao diện; bảng xếp hạng từng chỉ hiện đúng một người vì thế.
--
-- Hàm chỉ trả về những cột đã công khai ở chỗ khác trong ứng dụng (tên hiển
-- thị, ảnh đại diện, chuỗi ngày, id bài học). KHÔNG có email, không có bio,
-- không có total_xp. Đây là lằn ranh đáng giữ: một hàm SECURITY DEFINER bỏ qua
-- RLS, nên danh sách cột của nó chính là policy.

create or replace function public.get_community_learning_now(
  p_limit int default 24,
  p_days int default 7
)
returns table (
  user_id uuid,
  name text,
  avatar_url text,
  current_streak int,
  -- bigint, KHONG phai int. `user_progress.lesson_id` là bigint (xem
  -- 00000000_base_schema_reconstructed.sql), còn `user_streaks.current_streak`
  -- là integer (20260705_lesson_locking_and_admin.sql). Khai lệch một cột thì
  -- Postgres báo "structure of query does not match function result type" -
  -- không phải lúc viết, mà lúc gọi, nên nó sống sót qua mọi lần đọc lại file.
  lesson_id bigint,
  completed_at timestamptz
)
language sql
security definer
set search_path = public
stable
as $$
  -- Người còn chuỗi ngày và còn hoạt động gần đây. `p_days` là bộ chặn quan
  -- trọng: không có nó thì danh sách đầy người có current_streak cao nhưng đã
  -- nghỉ hàng tháng, và "đang học" lại thành một câu nói sai theo cách khó thấy
  -- hơn cả con số bịa - vì nó có người thật đứng tên.
  with active as (
    select s.user_id, s.current_streak, s.last_activity_date
    from user_streaks s
    where s.current_streak > 0
      and s.last_activity_date >= (current_date - p_days)
    order by s.last_activity_date desc, s.current_streak desc
    limit p_limit
  ),
  -- Bài học hoàn thành gần nhất của từng người. distinct on cần order by khớp
  -- tiền tố, nên user_id đứng trước completed_at.
  latest as (
    select distinct on (p.user_id) p.user_id, p.lesson_id, p.completed_at
    from user_progress p
    join active a on a.user_id = p.user_id
    where p.completed = true and p.completed_at is not null
    order by p.user_id, p.completed_at desc
  )
  select
    a.user_id,
    nullif(btrim(coalesce(up.full_name, '')), '') as name,
    up.avatar_url,
    a.current_streak,
    l.lesson_id,
    l.completed_at
  from active a
  left join user_profiles up on up.id = a.user_id
  left join latest l on l.user_id = a.user_id
  -- Người bị vô hiệu hoá không xuất hiện. `is_disabled` có thể là null trên
  -- hàng cũ, nên phải so với `is not true` chứ không phải `= false`.
  where up.is_disabled is not true
  order by a.last_activity_date desc, a.current_streak desc;
$$;

comment on function public.get_community_learning_now(int, int) is
  'Người học còn chuỗi ngày và còn hoạt động trong p_days ngày, kèm bài hoàn thành gần nhất. Chỉ trả cột đã công khai ở chỗ khác: tên, ảnh, chuỗi ngày, id bài học.';

revoke all on function public.get_community_learning_now(int, int) from public;
grant execute on function public.get_community_learning_now(int, int) to authenticated;
