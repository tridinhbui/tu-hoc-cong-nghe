-- Hai lựa chọn của /lo-trinh lên server.
--
-- Trang này tồn tại để hỏi người học đúng hai câu - học hướng nào, và giữ được
-- nhịp nào - rồi mọi con số trên đó tính từ hai câu trả lời ấy. Cả hai trước
-- giờ chỉ nằm trong localStorage: `activeTrack` và `thtcdn_path_pace`. Đổi máy,
-- đổi trình duyệt, hoặc xoá dữ liệu duyệt web là mất sạch, và người dùng quay
-- lại thấy mình "đang học Tiền của tôi, 1 bài, 5 ngày" dù chưa từng chọn thế.
--
-- Đặt cột trên user_profiles theo đúng tiền lệ `preferred_locale`, thay vì dựng
-- bảng tuỳ chọn riêng: hai giá trị vô hướng, đọc cùng lúc với hồ sơ, không có
-- quan hệ một-nhiều nào để cần bảng.
--
-- NULL nghĩa là CHƯA CHỌN, không phải mặc định. Phân biệt được hai thứ đó là
-- điều kiện để sau này biết ai đã thật sự đi qua trang này - một cột mặc định
-- 'personal' sẽ khiến mọi tài khoản trông như đã chọn.
--
-- Ràng buộc đặt ở cột chứ không chỉ ở tầng ứng dụng: đường ghi không phải chỉ
-- có một, và một giá trị rác lọt vào đây sẽ hỏng phép tính tuần ở cả /lo-trinh
-- lẫn khối tóm tắt trên /hoc-bai.

alter table public.user_profiles
  add column if not exists learning_track text,
  add column if not exists learning_pace_per_day smallint,
  add column if not exists learning_pace_days_per_week smallint;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'user_profiles_learning_track_check'
  ) then
    alter table public.user_profiles
      add constraint user_profiles_learning_track_check
      check (learning_track is null or learning_track in ('personal', 'professional'));
  end if;

  -- 1 hoặc 2 bài mỗi ngày: đúng hai lựa chọn trang đưa ra. Rộng hơn thì con số
  -- "khoảng N tuần" bên dưới thành vô nghĩa, vì không ai giữ được 5 bài/ngày.
  if not exists (
    select 1 from pg_constraint where conname = 'user_profiles_learning_pace_per_day_check'
  ) then
    alter table public.user_profiles
      add constraint user_profiles_learning_pace_per_day_check
      check (learning_pace_per_day is null or learning_pace_per_day between 1 and 2);
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'user_profiles_learning_pace_days_check'
  ) then
    alter table public.user_profiles
      add constraint user_profiles_learning_pace_days_check
      check (learning_pace_days_per_week is null or learning_pace_days_per_week between 1 and 7);
  end if;
end $$;

comment on column public.user_profiles.learning_track is
  '/lo-trinh: hướng học đã chọn. NULL = chưa chọn bao giờ.';
comment on column public.user_profiles.learning_pace_per_day is
  '/lo-trinh: số bài mỗi ngày người học tự đặt (1 hoặc 2). NULL = chưa chọn.';
comment on column public.user_profiles.learning_pace_days_per_week is
  '/lo-trinh: số ngày học mỗi tuần (1-7). NULL = chưa chọn.';
