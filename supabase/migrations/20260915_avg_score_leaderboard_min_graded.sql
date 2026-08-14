-- Bảng "Điểm TB" xếp hạng bằng một tỉ lệ, và tỉ lệ tính trên mẫu nhỏ thì vô
-- nghĩa. Một người học làm 2 bài, đúng cả 2, có avg_quiz_score = 100 và đứng
-- trên người làm 500 bài đạt 92. Người dùng báo lại đúng hiện tượng đó: top 20
-- toàn tài khoản mới ở level 1, vào làm vài bài dễ rồi thôi, và vì điểm không
-- bao giờ bị pha loãng nữa nên họ nằm lại trên đỉnh vĩnh viễn.
--
-- lib/supabase-user.ts: avg_quiz_score là trung bình cộng của
-- user_progress.quiz_score trên các hàng có điểm. Nên MẪU SỐ chính là số bài đã
-- được chấm, và đó là thứ phải đặt sàn - không phải level hay XP.
--
-- Vì sao KHÔNG chặn bằng level/XP như góp ý ban đầu đề xuất: total_xp cộng từ
-- mười nguồn (bài học, quiz, game, giới thiệu, rương, nhiệm vụ, mốc, recall,
-- chest, career) và current_level suy ra từ chính total_xp. Nên "level >= 6"
-- hay "xp > 1500" đều đạt được mà gần như không trả lời câu quiz nào - chơi
-- game và mở rương là đủ. Hai mốc ấy chặn "người mới", nhưng không chặn được
-- cái đang hỏng, và vẫn để lọt đúng nhóm 100%-từ-vài-câu.
--
-- Sàn chỉ áp cho 'avg_score'. Các bảng khác xếp bằng số cộng dồn (XP, số bài,
-- chuỗi ngày) - nhiều hơn thì thật sự là nhiều hơn, không có thiên lệch mẫu
-- nhỏ nào để sửa, và đặt sàn ở đó chỉ tổ đuổi người mới khỏi bảng của chính họ.
--
-- Cùng một sàn được áp ở CẢ HAI hàm. Lệch nhau thì "Hạng của bạn" lại mâu thuẫn
-- với danh sách - đúng lỗi mà tab Huy hiệu vừa dính.
--
-- NỀN CỦA BẢN NÀY: 20260719_leaderboard_expansion.sql, không phải
-- 20260724_leaderboard_exclude_disabled.sql, dù 20260724 có tên muộn hơn.
-- 20260719 được VIẾT SAU (chú thích của nó tham chiếu tới 20260724) và là bản
-- đang chạy trên production: nó có kẹp giới hạn `limit`, có quyền cho anon, còn
-- 20260724 thì không. Xếp theo tên file sẽ chọn nhầm bản.
--
-- Nhánh 'badges' bị bỏ khỏi bản này: tab đã gỡ khỏi giao diện và
-- LeaderboardMetric trong lib/supabase-user.ts không còn nhận giá trị đó nữa.
-- Chỉ số ấy chặn trên ở 5 nên xếp hạng bằng nó là xếp một giá trị ai cũng bằng
-- nhau; giữ lại nhánh chỉ để đó là giữ một câu trả lời sai còn gọi được.

drop function if exists public.get_leaderboard(text, int);

create or replace function public.get_leaderboard(p_metric text, p_limit int default 10)
returns table(user_id uuid, name text, value numeric, avatar_url text)
language plpgsql
security definer
set search_path = public
as $$
declare
  -- Số bài ĐÃ CHẤM tối thiểu để được lên bảng Điểm TB.
  min_graded constant int := 30;
begin
  if p_metric = 'streak' then
    return query
      select s.user_id,
             coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
             s.current_streak::numeric as value,
             up.avatar_url
      from public.user_streaks s
      join public.user_profiles up on up.id = s.user_id
      where coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin'
      order by s.current_streak desc
      limit greatest(1, least(coalesce(p_limit, 10), 50));
  else
    return query
      select us.user_id,
             coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
             (case p_metric
                when 'lessons' then us.total_lessons_completed
                when 'avg_score' then us.avg_quiz_score
                else us.total_xp
              end)::numeric as value,
             up.avatar_url
      from public.user_stats us
      join public.user_profiles up on up.id = us.user_id
      -- Gộp một lần rồi join, thay vì truy vấn con tương quan chạy lại cho từng
      -- hàng. user_progress là bảng lớn nhất trong lược đồ này.
      left join (
        select p.user_id, count(*) as graded
        from public.user_progress p
        where p.quiz_score is not null
        group by p.user_id
      ) g on g.user_id = us.user_id
      where coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin'
        and (p_metric <> 'avg_score' or coalesce(g.graded, 0) >= min_graded)
      order by value desc
      limit greatest(1, least(coalesce(p_limit, 10), 50));
  end if;
end;
$$;

revoke all on function public.get_leaderboard(text, int) from public;
grant execute on function public.get_leaderboard(text, int) to authenticated;
grant execute on function public.get_leaderboard(text, int) to anon;

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
  else
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

    -- Chưa đủ bài đã chấm thì KHÔNG trả hạng nào. Giao diện ẩn hẳn dòng "Hạng
    -- của bạn" khi không có hàng, và đó là điều đúng: hiện một thứ hạng tính
    -- trên ba bài rồi vẫn giấu người ta khỏi danh sách thì lại là mâu thuẫn
    -- giữa hạng và bảng, đúng thứ vừa phải đi sửa ở tab Huy hiệu.
    if p_metric = 'avg_score' then
      select count(*) into my_graded
      from public.user_progress p
      where p.user_id = p_user_id
        and p.quiz_score is not null;
      if coalesce(my_graded, 0) < min_graded then return; end if;
    end if;

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
      where (case p_metric
               when 'lessons' then us.total_lessons_completed
               when 'avg_score' then us.avg_quiz_score
               else us.total_xp
             end) > my_value
        and coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin'
        and (p_metric <> 'avg_score' or coalesce(g.graded, 0) >= min_graded);
  end if;
end;
$$;

revoke all on function public.get_my_leaderboard_rank(text, uuid) from public;
grant execute on function public.get_my_leaderboard_rank(text, uuid) to authenticated;

-- Chỉ mục riêng phần cho phép gộp ở trên chỉ đọc những hàng có điểm, thay vì
-- quét cả user_progress. Hai hàm trên chạy mỗi lần ai đó mở một bảng xếp hạng.
create index if not exists user_progress_graded_user_idx
  on public.user_progress(user_id)
  where quiz_score is not null;
