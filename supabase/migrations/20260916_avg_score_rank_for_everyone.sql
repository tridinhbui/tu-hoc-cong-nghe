-- 20260915 đặt sàn 30 bài đã chấm cho bảng Điểm TB, và cho người chưa đủ sàn
-- KHÔNG có hàng nào - nên giao diện ẩn luôn dòng "Hạng của bạn". Yêu cầu tiếp
-- theo: ai cũng phải thấy được hạng của mình.
--
-- Chỗ khó nằm ở đây: trả hạng cho người chưa đủ sàn theo CÙNG thang với người
-- đủ sàn sẽ dựng lại đúng con bug vừa gỡ ở tab Huy hiệu. Một người làm 2 bài
-- đúng cả 2 có avg = 100, không ai vượt được, nên họ nhận #1 - trong khi danh
-- sách (get_leaderboard, vẫn lọc theo sàn) không hề có tên họ. Hạng #1 mà không
-- có mặt trong top 20 là chính xác thứ người dùng đã báo lỗi lần trước.
--
-- Nên thay vì hai thang riêng, đây là MỘT thứ tự duy nhất cho cả hai nhóm:
--
--     (đã đủ sàn trước, chưa đủ sàn sau) rồi mới tới (điểm giảm dần)
--
-- Người đủ sàn xếp y như cũ. Người chưa đủ đứng sau TOÀN BỘ nhóm đã đủ, rồi so
-- với nhau trong nhóm mình. Kết quả: ai cũng có một con số, và con số ấy không
-- bao giờ mâu thuẫn với bảng - hạng nằm trong top 20 thì chắc chắn có tên trong
-- top 20.
--
-- Hệ quả cần biết trước: người chưa đủ sàn sẽ thấy một con số lớn, kể cả khi
-- điểm của họ đang là 100. Đó là sự thật của bảng này - điểm ấy tính trên vài
-- câu và chưa so được với ai - chứ không phải một cách phạt. Làm đủ 30 bài có
-- chấm là họ nhảy thẳng vào thang chính.
--
-- get_leaderboard KHÔNG đổi trong bản này: danh sách vẫn chỉ hiện người đã đủ
-- sàn. Chỉ cách tính hạng đổi.

drop function if exists public.get_my_leaderboard_rank(text, uuid);

create or replace function public.get_my_leaderboard_rank(p_metric text, p_user_id uuid)
returns table(rank bigint, value numeric)
language plpgsql
security definer
set search_path = public
as $$
declare
  my_value numeric;
  my_graded int;
  eligible_count bigint;
  min_graded constant int := 30;
begin
  if p_metric = 'streak' then
    select s.current_streak into my_value
    from public.user_streaks s
    join public.user_profiles up on up.id = s.user_id
    where s.user_id = p_user_id
      and coalesce(up.is_disabled, false) = false
      and coalesce(up.role, 'user') <> 'admin';
    if my_value is null then return; end if;
    return query
      select (count(*) + 1)::bigint, my_value
      from public.user_streaks s
      join public.user_profiles up on up.id = s.user_id
      where s.current_streak > my_value
        and coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin';
    return;
  end if;

  select (case p_metric
            when 'lessons' then us.total_lessons_completed
            when 'avg_score' then us.avg_quiz_score
            else us.total_xp
          end)::numeric into my_value
  from public.user_stats us
  join public.user_profiles up on up.id = us.user_id
  where us.user_id = p_user_id
    and coalesce(up.is_disabled, false) = false
    and coalesce(up.role, 'user') <> 'admin';
  if my_value is null then return; end if;

  -- Mọi chỉ số khác 'avg_score' không có sàn, nên giữ nguyên cách đếm cũ.
  if p_metric <> 'avg_score' then
    return query
      select (count(*) + 1)::bigint, my_value
      from public.user_stats us
      join public.user_profiles up on up.id = us.user_id
      where (case p_metric
               when 'lessons' then us.total_lessons_completed
               else us.total_xp
             end) > my_value
        and coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin';
    return;
  end if;

  select count(*) into my_graded
  from public.user_progress p
  where p.user_id = p_user_id
    and p.quiz_score is not null;

  if coalesce(my_graded, 0) >= min_graded then
    -- Đã đủ sàn: đếm trong chính nhóm đủ sàn, y hệt 20260915.
    return query
      select (count(*) + 1)::bigint, my_value
      from public.user_stats us
      join public.user_profiles up on up.id = us.user_id
      left join (
        select p.user_id, count(*) as graded
        from public.user_progress p
        where p.quiz_score is not null
        group by p.user_id
      ) g on g.user_id = us.user_id
      where us.avg_quiz_score > my_value
        and coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin'
        and coalesce(g.graded, 0) >= min_graded;
    return;
  end if;

  -- Chưa đủ sàn: cả nhóm đã đủ đứng trước, không trừ trường hợp nào.
  select count(*) into eligible_count
  from public.user_stats us
  join public.user_profiles up on up.id = us.user_id
  left join (
    select p.user_id, count(*) as graded
    from public.user_progress p
    where p.quiz_score is not null
    group by p.user_id
  ) g on g.user_id = us.user_id
  where coalesce(up.is_disabled, false) = false
    and coalesce(up.role, 'user') <> 'admin'
    and coalesce(g.graded, 0) >= min_graded;

  return query
    select (coalesce(eligible_count, 0) + count(*) + 1)::bigint, my_value
    from public.user_stats us
    join public.user_profiles up on up.id = us.user_id
    left join (
      select p.user_id, count(*) as graded
      from public.user_progress p
      where p.quiz_score is not null
      group by p.user_id
    ) g on g.user_id = us.user_id
    where us.avg_quiz_score > my_value
      and coalesce(up.is_disabled, false) = false
      and coalesce(up.role, 'user') <> 'admin'
      and coalesce(g.graded, 0) < min_graded;
end;
$$;

revoke all on function public.get_my_leaderboard_rank(text, uuid) from public;
grant execute on function public.get_my_leaderboard_rank(text, uuid) to authenticated;
