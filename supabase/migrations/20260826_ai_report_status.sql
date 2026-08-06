-- Trạng thái xử lý cho báo cáo nội dung AI (`kind = 'ai_flag'`).
--
-- Trước đây admin chỉ có một thao tác duy nhất: xoá cứng. Nghĩa là hàng đợi
-- không phân biệt được "chưa ai xem" với "đã xem và bỏ qua", không xử lý dở
-- dang được, và xoá xong là mất luôn bằng chứng bài nào từng bị báo - đúng
-- thứ cần có để biết bài nào hỏng đi hỏng lại.
--
-- Cột này chỉ có nghĩa với hàng `ai_flag`; hàng `important` là highlight cá
-- nhân của người học, không đi qua hàng đợi nào cả nên luôn nằm ở 'open' và
-- không ai đọc tới.

alter table public.lesson_highlights
  add column if not exists report_status text not null default 'open'
    check (report_status in ('open', 'resolved', 'ignored')),
  add column if not exists resolved_at timestamp with time zone,
  add column if not exists resolved_by uuid references public.user_profiles(id) on delete set null;

-- Hàng đợi admin luôn hỏi đúng một câu: còn báo cáo nào chưa xử lý không.
-- Partial index để nó không phình theo toàn bộ highlight cá nhân, vốn chiếm
-- phần lớn bảng này.
create index if not exists lesson_highlights_open_reports_idx
  on public.lesson_highlights(lesson_id, created_at desc)
  where kind = 'ai_flag' and report_status = 'open';

-- Không thêm policy RLS nào: admin đọc/ghi bảng này qua service-role client
-- (lib/supabase-admin.ts), vốn bỏ qua RLS. Ba policy sẵn có vẫn giới hạn
-- người học ở đúng hàng của họ, và họ không được cấp quyền update - tức là
-- người báo cáo không tự đóng được báo cáo của chính mình.
