-- Hai vòng phản hồi cụt phía người học, chữa bằng cùng một cơ chế.
--
-- 1. Khiếu nại hoàn thành bài (lesson_completion_appeals): học viên gửi đơn
--    rồi im lặng tuyệt đối. `getMyLessonAppeals` trong lib/lesson-appeals.ts
--    truy vấn sẵn cả `admin_note` nhưng KHÔNG có nơi nào gọi hàm đó, nên ô
--    "Lý do từ chối" mà admin gõ trong app/admin/appeals/AppealsClient.tsx
--    không bao giờ đến được người cần đọc nó.
-- 2. Báo lỗi nội dung AI (lesson_highlights, kind = 'ai_flag'): admin sửa bài
--    rồi bấm "Đã sửa bài này", người báo không nhận được gì. Đây là nhóm
--    người dùng chăm nhất - họ đang sửa giáo trình miễn phí - và im lặng là
--    cách chắc chắn nhất khiến họ ngừng báo.
--
-- Mở rộng community_notifications thay vì dựng bảng mới: NotificationBell đã
-- gắn sẵn trong AppNavbar trên mọi trang, đã có realtime, đã có luồng đánh
-- dấu đã đọc. Một bảng thứ hai nghĩa là chuông thứ hai, hoặc một component
-- phải trộn hai nguồn - cả hai đều đắt hơn việc nới bảng này ra.
--
-- Vẫn ghi bằng trigger SECURITY DEFINER như hai loại cũ, vì lý do y hệt
-- migration 20260821: cả hai đường ghi ở trên đều là thao tác của admin, và
-- client không được phép bịa hay chặn thông báo về chính mình.

-- 1. Nới cấu trúc ---------------------------------------------------------

-- post_id đang NOT NULL và tham chiếu community_posts, nên bảng chưa chở nổi
-- một sự kiện không thuộc về bài đăng nào.
alter table public.community_notifications
  alter column post_id drop not null;

-- actor_id cũng vậy: hai loại mới do admin gây ra, nhưng danh tính admin
-- không phải thứ người học cần thấy (và không nên thấy). Để NULL thay vì
-- trỏ vào hồ sơ admin.
alter table public.community_notifications
  alter column actor_id drop not null;

alter table public.community_notifications
  add column if not exists lesson_slug text,
  add column if not exists detail text;

comment on column public.community_notifications.lesson_slug is
  'Bài học liên quan, cho hai loại appeal_resolved/ai_report_resolved. Điều hướng tới /bai-hoc/<slug> thay vì /finsocial.';
comment on column public.community_notifications.detail is
  'Ghi chú admin (lý do từ chối khiếu nại). NULL khi được duyệt hoặc khi loại thông báo không có ghi chú.';

alter table public.community_notifications
  drop constraint if exists community_notifications_type_check;
alter table public.community_notifications
  add constraint community_notifications_type_check
  check (type in ('comment', 'reaction', 'appeal_approved', 'appeal_rejected', 'ai_report_resolved'));

-- Ràng buộc hình dạng theo loại: hai loại cũ luôn có post_id, ba loại mới
-- luôn có lesson_slug. Không có cái này thì một trigger viết sai sẽ tạo ra
-- thông báo bấm vào không đi đâu cả, và không gì phát hiện được.
alter table public.community_notifications
  drop constraint if exists community_notifications_shape_check;
alter table public.community_notifications
  add constraint community_notifications_shape_check
  check (
    case
      when type in ('comment', 'reaction') then post_id is not null and actor_id is not null
      else lesson_slug is not null
    end
  );

-- 2. Khiếu nại được xử lý -------------------------------------------------

create or replace function public.notify_on_appeal_reviewed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Chỉ bắn khi rời khỏi trạng thái chờ. Nút "Duyệt tất cả" trong trang quản
  -- trị chạy nhiều UPDATE liên tiếp, và AppealsClient còn cho sửa ghi chú sau
  -- khi đã xử lý - nếu không chốt điều kiện này thì một khiếu nại sẽ báo cho
  -- người học nhiều lần.
  if old.status = 'pending' and new.status in ('approved', 'rejected') then
    insert into public.community_notifications
      (recipient_id, actor_id, type, post_id, lesson_slug, detail)
    values (
      new.user_id,
      null,
      case when new.status = 'approved' then 'appeal_approved' else 'appeal_rejected' end,
      null,
      new.lesson_slug,
      -- Ghi chú chỉ có nghĩa khi bị từ chối: người học cần biết vì sao. Khi
      -- được duyệt thì bài đã mở, ghi chú nội bộ của admin không liên quan.
      case when new.status = 'rejected' then nullif(btrim(coalesce(new.admin_note, '')), '') end
    );
  end if;
  return new;
end;
$$;

drop trigger if exists notify_on_appeal_reviewed on public.lesson_completion_appeals;
create trigger notify_on_appeal_reviewed
  after update on public.lesson_completion_appeals
  for each row
  execute function public.notify_on_appeal_reviewed();

-- 3. Báo lỗi AI được xử lý ------------------------------------------------

create or replace function public.notify_on_ai_report_resolved()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Chỉ 'resolved', không phải 'ignored'. Báo "đã xem, không phải lỗi" cho
  -- người học là một cuộc tranh luận cần chỗ trả lời, mà chuông thì không có
  -- chỗ đó; im lặng ở nhánh này tốt hơn là mở một cuộc trao đổi một chiều.
  if old.report_status = 'open' and new.report_status = 'resolved' and new.kind = 'ai_flag' then
    insert into public.community_notifications
      (recipient_id, actor_id, type, post_id, lesson_slug, detail)
    values (new.user_id, null, 'ai_report_resolved', null, new.lesson_slug, null);
  end if;
  return new;
end;
$$;

drop trigger if exists notify_on_ai_report_resolved on public.lesson_highlights;
create trigger notify_on_ai_report_resolved
  after update on public.lesson_highlights
  for each row
  execute function public.notify_on_ai_report_resolved();
