-- Persists emoji reactions on the admin chat thread. Before this, reactions
-- lived only in ChatWithAdminWidget's local useState, so they vanished on
-- every reload. Mirrors the study_room_message_reactions design, but scoped by
-- thread owner (chat_messages.user_id) instead of room membership.

create table if not exists public.chat_message_reactions (
  id bigint generated always as identity primary key,
  message_id bigint not null references public.chat_messages(id) on delete cascade,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  emoji text not null check (char_length(emoji) between 1 and 16),
  created_at timestamp with time zone not null default now(),
  unique (message_id, user_id, emoji)
);

create index if not exists chat_message_reactions_message_idx
  on public.chat_message_reactions(message_id);

alter table public.chat_message_reactions enable row level security;

-- The thread owner can read every reaction on their own thread (their own and
-- the admin's). Admin reads go through the service-role client in lib/admin.
drop policy if exists "Thread owner can read chat reactions" on public.chat_message_reactions;
create policy "Thread owner can read chat reactions"
  on public.chat_message_reactions for select
  to authenticated
  using (
    exists (
      select 1
      from public.chat_messages msg
      where msg.id = chat_message_reactions.message_id
        and msg.user_id = auth.uid()
    )
  );

grant select on public.chat_message_reactions to authenticated;
grant usage on sequence public.chat_message_reactions_id_seq to authenticated;

-- Toggle + return the whole thread's reactions, so the client can replace its
-- map in one round trip instead of reconciling a delta.
create or replace function public.toggle_chat_message_reaction(p_message_id bigint, p_emoji text)
returns table (message_id bigint, emoji text, user_ids uuid[])
language plpgsql
security definer
set search_path = public
as $$
declare
  v_thread_owner uuid;
  v_exists boolean;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select msg.user_id into v_thread_owner from public.chat_messages msg where msg.id = p_message_id;
  if v_thread_owner is null then
    raise exception 'Message not found';
  end if;
  if v_thread_owner is distinct from auth.uid() then
    raise exception 'Not authorized';
  end if;

  select exists (
    select 1 from public.chat_message_reactions
    where chat_message_reactions.message_id = p_message_id
      and chat_message_reactions.user_id = auth.uid()
      and chat_message_reactions.emoji = p_emoji
  ) into v_exists;

  if v_exists then
    delete from public.chat_message_reactions
    where chat_message_reactions.message_id = p_message_id
      and chat_message_reactions.user_id = auth.uid()
      and chat_message_reactions.emoji = p_emoji;
  else
    insert into public.chat_message_reactions (message_id, user_id, emoji)
    values (p_message_id, auth.uid(), p_emoji)
    on conflict do nothing;
  end if;

  return query
    select
      r.message_id,
      r.emoji,
      array_agg(r.user_id order by r.created_at asc) as user_ids
    from public.chat_message_reactions r
    join public.chat_messages msg on msg.id = r.message_id
    where msg.user_id = v_thread_owner
    group by r.message_id, r.emoji;
end;
$$;

create or replace function public.get_chat_message_reactions(p_user_id uuid)
returns table (message_id bigint, emoji text, user_ids uuid[])
language sql
security definer
set search_path = public
as $$
  select
    r.message_id,
    r.emoji,
    array_agg(r.user_id order by r.created_at asc) as user_ids
  from public.chat_message_reactions r
  join public.chat_messages msg on msg.id = r.message_id
  where msg.user_id = p_user_id
    and p_user_id = auth.uid()
  group by r.message_id, r.emoji;
$$;

revoke all on function public.toggle_chat_message_reaction(bigint, text) from public, anon;
revoke all on function public.get_chat_message_reactions(uuid) from public, anon;

grant execute on function public.toggle_chat_message_reaction(bigint, text) to authenticated;
grant execute on function public.get_chat_message_reactions(uuid) to authenticated;
