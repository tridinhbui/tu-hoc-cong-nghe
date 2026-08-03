-- Phiên ngồi học trong thế giới 3D.
--
-- Cho tới giờ, ngồi xuống bàn trong thư viện hay phòng nhóm rồi chạy hết 25
-- phút Pomodoro KHÔNG ghi lại ở đâu cả: đứng dậy là mất sạch. Cả ba thế giới
-- 3D vì thế là chỗ đẹp mà không có hậu quả, và đó là lý do người ta vào một
-- lần rồi thôi.
--
-- Hai mốc thời gian đều do SERVER đặt (`default now()` khi mở, `now()` khi
-- đóng). Client chỉ nói "tôi bắt đầu" và "tôi xong", không nói phiên dài bao
-- lâu - nên không có cách nào khai khống một phiên bốn tiếng ngoài việc ngồi
-- đó bốn tiếng thật.
create table if not exists public.focus_sessions (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  -- Thế giới và phòng, để biết người ta hay ngồi ở đâu. Chuỗi tự do vì id
  -- phòng của Phố nghề là hình học chứ không có bản ghi nào để tham chiếu.
  world text not null,
  room_key text,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  -- Số giây đã ngồi, do server tính lúc đóng phiên.
  seconds integer,
  created_at timestamptz not null default now()
);

create index if not exists focus_sessions_user_idx
  on public.focus_sessions(user_id, started_at desc);

-- Một người chỉ được có MỘT phiên đang mở. Mở phiên thứ hai mà không đóng
-- phiên cũ là dấu hiệu của hai tab cùng mở, và hai đồng hồ cùng chạy cho một
-- người thì tổng thời gian học thành số vô nghĩa.
create unique index if not exists focus_sessions_one_open_per_user
  on public.focus_sessions(user_id)
  where ended_at is null;

alter table public.focus_sessions enable row level security;

drop policy if exists "Users read own focus sessions" on public.focus_sessions;
create policy "Users read own focus sessions" on public.focus_sessions
  for select using (auth.uid() = user_id);

-- Không có policy insert/update cho `authenticated`: mọi thao tác ghi đi qua
-- /api/focus-session bằng service role, đúng cách các bảng điểm số đã làm sau
-- lần siết ở 20260714_harden_quiz_writes.sql. Cho client tự ghi thì trường
-- `seconds` lại thành thứ sửa được bằng devtools.
