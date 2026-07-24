-- Messenger-like message actions for study-room chat.
-- Senders can edit, pin/unpin, and recall their own non-bot messages.

drop policy if exists "Members can update pins in their room" on public.study_room_messages;
drop policy if exists "Senders can update their room messages" on public.study_room_messages;
create policy "Senders can update their room messages"
  on public.study_room_messages for update
  to authenticated
  using (sender_id = auth.uid() and is_bot = false)
  with check (
    sender_id = auth.uid()
    and is_bot = false
    and char_length(trim(content)) between 1 and 2000
    and
    exists (
      select 1 from public.study_room_members m
      where m.room_id = study_room_messages.room_id
        and m.user_id = auth.uid()
        and m.left_at is null
    )
  );

drop policy if exists "Senders can recall their room messages" on public.study_room_messages;
create policy "Senders can recall their room messages"
  on public.study_room_messages for delete
  to authenticated
  using (sender_id = auth.uid() and is_bot = false);

grant update (content, is_pinned), delete on public.study_room_messages to authenticated;
