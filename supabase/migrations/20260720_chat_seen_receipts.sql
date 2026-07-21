-- Lets a user mark the admin's messages in their own thread as "seen",
-- reusing the existing chat_messages.read boolean bidirectionally:
-- sender='user' rows are marked read by the admin (see markThreadRead in
-- lib/admin/chat.ts), sender='admin' rows are marked read by the user via
-- this function. A SECURITY DEFINER RPC (rather than a broad UPDATE policy)
-- so a user can only flip the read flag on their own thread's admin
-- messages, not edit content or touch anyone else's rows.

create or replace function public.mark_admin_chat_messages_seen(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is distinct from p_user_id then
    raise exception 'not authorized';
  end if;

  update public.chat_messages
  set read = true
  where user_id = p_user_id
    and sender = 'admin'
    and read = false;
end;
$$;

revoke all on function public.mark_admin_chat_messages_seen(uuid) from public, anon;
grant execute on function public.mark_admin_chat_messages_seen(uuid) to authenticated;
