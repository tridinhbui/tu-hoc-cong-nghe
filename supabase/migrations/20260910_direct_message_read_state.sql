-- Đánh dấu đã đọc cho tin nhắn riêng.
--
-- Cột `read_by_recipient` đã có từ 20260713_social_friends_and_messages.sql và
-- chưa bao giờ được ghi: bảng đó chỉ có policy SELECT và INSERT, nên người
-- nhận không có đường nào lật cờ. Đếm "chưa đọc" trên một cột không ai xoá thì
-- huy hiệu sẽ sáng vĩnh viễn - tệ hơn hẳn không đếm, vì một huy hiệu không bao
-- giờ tắt là một huy hiệu người ta học cách phớt lờ.
--
-- Policy dưới đây hẹp theo đúng nghĩa: chỉ NGƯỜI NHẬN được cập nhật (điều kiện
-- `sender_id <> auth.uid()` ở cả USING lẫn WITH CHECK), và chỉ trong tình bạn
-- đã chấp nhận của chính mình. Người gửi không tự đánh dấu tin của mình là đã
-- đọc được, nên con số bên kia không giả được.
--
-- Postgres không cho giới hạn UPDATE theo CỘT trong policy. Ràng buộc "chỉ
-- được sửa read_by_recipient" vì thế đặt ở trigger bên dưới: mọi cột khác phải
-- giữ nguyên, nếu không thì báo lỗi. Không có nó, policy này vô tình cho người
-- nhận sửa cả `content` của tin người khác gửi.

alter table public.direct_messages enable row level security;

drop policy if exists "Recipients can mark direct messages read" on public.direct_messages;
create policy "Recipients can mark direct messages read"
  on public.direct_messages for update
  to authenticated
  using (
    sender_id <> auth.uid()
    and exists (
      select 1
      from public.user_friendships f
      where f.id = direct_messages.friendship_id
        and f.status = 'accepted'
        and (auth.uid() = f.user_a or auth.uid() = f.user_b)
    )
  )
  with check (
    sender_id <> auth.uid()
    and exists (
      select 1
      from public.user_friendships f
      where f.id = direct_messages.friendship_id
        and f.status = 'accepted'
        and (auth.uid() = f.user_a or auth.uid() = f.user_b)
    )
  );

create or replace function public.direct_messages_only_read_flag_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.id is distinct from old.id
     or new.friendship_id is distinct from old.friendship_id
     or new.sender_id is distinct from old.sender_id
     or new.content is distinct from old.content
     or new.created_at is distinct from old.created_at then
    raise exception 'direct_messages: chỉ được cập nhật read_by_recipient';
  end if;
  return new;
end;
$$;

drop trigger if exists direct_messages_only_read_flag on public.direct_messages;
create trigger direct_messages_only_read_flag
  before update on public.direct_messages
  for each row
  execute function public.direct_messages_only_read_flag_changes();

grant update (read_by_recipient) on public.direct_messages to authenticated;

-- Đếm chưa đọc chạy trên (friendship_id, read_by_recipient) chứ không phải chỉ
-- mục theo thời gian đã có: truy vấn của huy hiệu lọc theo cờ và theo tập tình
-- bạn của mình, không đụng tới created_at.
create index if not exists direct_messages_unread_idx
  on public.direct_messages(friendship_id, read_by_recipient)
  where read_by_recipient = false;
