-- Thanh điều hướng đọc ba bảng trong ba request, trên MỌI lượt tải trang.
--
-- AppNavbar nằm ở app/(app)/layout.tsx nên nó gắn ở mọi trang trong ứng dụng,
-- và lúc gắn nó hỏi ba chỗ: hồ sơ để vẽ tên/ảnh/XP/cấp/xu, số câu sai chưa ôn
-- để vẽ huy hiệu, và rương đăng nhập hằng ngày. Ba request đó độc lập nhau
-- nhưng luôn đi cùng nhau, nên chúng là một request được.
--
-- Cùng khuôn với get_dashboard_summary/get_lesson_state ở 20260804: không nhận
-- tham số, tự lấy `auth.uid()`. Đó là phần chống IDOR - một hàm nhận
-- `p_user_id` sẽ cho bất kỳ ai đọc hồ sơ của bất kỳ ai, vì security definer đã
-- bỏ qua RLS.
--
-- KHÔNG gộp phần TRAO rương vào đây. Hàm này chỉ ĐỌC, và `daily_chest_pending`
-- chỉ trả lời "hôm nay đã có rương đăng nhập chưa". Phần ghi vẫn ở
-- lib/chests.ts qua earnChest, chạy đúng một lần mỗi ngày thay vì mỗi lượt tải
-- trang. Một hàm read-only thì gọi lại bao nhiêu lần cũng không hỏng gì, và
-- đó là tính chất đáng giữ cho thứ chạy ở mọi trang.

create or replace function get_nav_state()
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_profile json;
  v_mistakes integer;
  v_chest_claimed boolean;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- 1. Hồ sơ. Đúng các cột AppNavbar vẽ, không phải select *.
  select row_to_json(p) into v_profile
  from (
    select full_name, email, avatar_url, total_xp, current_level, lessons_completed, coins
    from user_profiles
    where id = v_user_id
  ) p;

  -- 2. Số câu sai chưa giải quyết - con số trên huy hiệu.
  select count(*) into v_mistakes
  from quiz_mistakes
  where user_id = v_user_id
    and resolved = false;

  -- 3. Hôm nay đã nhận rương đăng nhập chưa. So theo ngày UTC cho khớp
  -- `earned_at`; phía client tự quyết định có trao hay không.
  select exists (
    select 1
    from user_chests
    where user_id = v_user_id
      and source = 'daily_login'
      and earned_at >= date_trunc('day', now())
  ) into v_chest_claimed;

  return json_build_object(
    'profile', v_profile,
    'unresolved_mistakes', coalesce(v_mistakes, 0),
    'daily_chest_claimed', v_chest_claimed
  );
end;
$$;

grant execute on function get_nav_state() to authenticated;
