-- Ngôn ngữ của người dùng, để email cron gửi đúng thứ tiếng họ đang đọc.
--
-- Giao diện đã dịch xong và bài học đang dịch dần, nhưng email thì không có
-- đường nào biết người nhận đọc tiếng gì: ngôn ngữ hiện chỉ nằm trong cookie
-- `thtcdn_locale` của trình duyệt, và cron chạy không có trình duyệt nào cả.
-- Nên năm route cron (`send-weekly-digest`, `send-reminders`,
-- `send-streak-milestones`, `morning-review`, `daily-study-group-update`)
-- dựng câu tiếng Việt ở server và gửi đi, bất kể người nhận đã chuyển sang
-- tiếng Anh từ lâu.
--
-- Cột này là bản sao BỀN của cookie, ghi khi người dùng đổi ngôn ngữ. Cookie
-- vẫn là nguồn cho việc dựng trang - nó đọc được ngay ở mọi request và không
-- cần đăng nhập; cột này chỉ để cho những thứ chạy KHI NGƯỜI DÙNG KHÔNG CÓ
-- MẶT.
--
-- Mặc định 'vi' khớp với DEFAULT_LOCALE trong lib/i18n/locales.ts: người chưa
-- từng đổi gì thì nhận tiếng Việt, đúng như khi họ vào web.

alter table public.user_profiles
  add column if not exists preferred_locale text not null default 'vi'
  check (preferred_locale in ('vi', 'en'));

comment on column public.user_profiles.preferred_locale is
  'Ngôn ngữ giao diện người dùng đã chọn. Dùng cho email/thông báo chạy nền, nơi không đọc được cookie thtcdn_locale.';
