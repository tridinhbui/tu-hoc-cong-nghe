-- `get_nav_state` tự cắt mốc ngày bằng `date_trunc('day', now())`, và mốc đó
-- là NỬA ĐÊM UTC. Người học ở Việt Nam là UTC+7, nên nửa đêm UTC rơi vào 07:00
-- sáng giờ địa phương.
--
-- Hậu quả đi đúng hướng xấu: cửa sổ "hôm nay" bị NỚI RỘNG về quá khứ, nên một
-- rương nhận chiều hôm trước vẫn nằm trong đó.
--
--   Ví dụ. 03:00 ngày 10/8 giờ VN = 20:00 ngày 9/8 UTC.
--   date_trunc('day', now()) = 00:00 ngày 9/8 UTC = 07:00 ngày 9/8 giờ VN.
--   Rương nhận lúc 17:00 ngày 9/8 giờ VN nằm TRONG cửa sổ đó.
--   → hàm trả "đã nhận rồi", và người học mất rương của ngày 10/8.
--
-- Ai học từ 00:00 tới 07:00 giờ VN đều dính. Bản cũ ở lib/chests.ts tính mốc
-- bằng `setHours(0,0,0,0)` phía trình duyệt, tức nửa đêm ĐỊA PHƯƠNG, và không
-- có lỗi này.
--
-- Sửa bằng cách trả mốc ngày về đúng chỗ cả repo đang để nó: PHÍA CLIENT. Mọi
-- phép cắt ngày khác trong repo (lib/supabase-streak.ts, lib/content-rotation.ts,
-- lib/weekly-career-mission.ts, lib/supabase-analytics.ts) đều tính ở trình
-- duyệt; không migration nào trước đây cắt ngày trong SQL. Một hàm cắt theo UTC
-- nằm giữa đám đó là thứ lệch pha, không phải chuẩn mới.
--
-- NHẬN THAM SỐ CÓ AN TOÀN KHÔNG. Có. Quy tắc "không nhận tham số" ở
-- 20260804_dashboard_optimized_rpcs.sql là để chống IDOR - nó nói về tham số
-- DANH TÍNH, và `auth.uid()` vẫn là thứ duy nhất quyết định đọc dữ liệu của ai.
-- `p_day_start` chỉ hẹp/nới một cửa sổ thời gian trên dữ liệu của CHÍNH người
-- gọi. Người gọi có nói dối mốc đó cũng không đọc thêm được gì; thứ họ có thể
-- làm là tự nhận thêm rương, mà việc ấy hôm nay đã làm được rồi vì `earnChest`
-- chèn thẳng vào `user_chests` không qua phép kiểm ngày nào ở máy chủ.
--
-- `create or replace` KHÔNG đổi được danh sách tham số, nên phải drop trước.

drop function if exists get_nav_state();

create or replace function get_nav_state(p_day_start timestamptz)
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

  select row_to_json(p) into v_profile
  from (
    select full_name, email, avatar_url, total_xp, current_level, lessons_completed, coins
    from user_profiles
    where id = v_user_id
  ) p;

  select count(*) into v_mistakes
  from quiz_mistakes
  where user_id = v_user_id
    and resolved = false;

  select exists (
    select 1
    from user_chests
    where user_id = v_user_id
      and source = 'daily_login'
      and earned_at >= p_day_start
  ) into v_chest_claimed;

  return json_build_object(
    'profile', v_profile,
    'unresolved_mistakes', coalesce(v_mistakes, 0),
    'daily_chest_claimed', v_chest_claimed
  );
end;
$$;

grant execute on function get_nav_state(timestamptz) to authenticated;
