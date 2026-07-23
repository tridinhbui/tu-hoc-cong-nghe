-- Upgrade the lightweight community feed into a compact social feed with
-- richer reactions and comment threads.

create table if not exists public.community_post_comments (
  id bigint generated always as identity primary key,
  post_id bigint not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 300),
  created_at timestamp with time zone not null default now()
);

create index if not exists community_post_comments_post_id_created_at_idx
  on public.community_post_comments(post_id, created_at asc);

create index if not exists community_post_comments_user_id_idx
  on public.community_post_comments(user_id);

alter table public.community_post_comments enable row level security;

drop policy if exists "Anyone can view comments" on public.community_post_comments;
create policy "Anyone can view comments"
  on public.community_post_comments for select
  to authenticated
  using (true);

drop policy if exists "Users can create comments as themselves" on public.community_post_comments;
create policy "Users can create comments as themselves"
  on public.community_post_comments for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Users can delete their own comments" on public.community_post_comments;
create policy "Users can delete their own comments"
  on public.community_post_comments for delete
  to authenticated
  using (user_id = auth.uid());

grant select, insert, delete on public.community_post_comments to authenticated;

drop function if exists public.get_community_feed(int, bigint);
create function public.get_community_feed(p_limit int default 20, p_before_id bigint default null)
returns table (
  id bigint,
  user_id uuid,
  user_name text,
  user_avatar text,
  kind text,
  content text,
  metadata jsonb,
  created_at timestamptz,
  reaction_count bigint,
  my_reaction text,
  comment_count bigint,
  reaction_summary jsonb
)
language sql
security definer
set search_path = public
stable
as $$
  select
    p.id,
    p.user_id,
    coalesce(up.full_name, 'Người học'),
    up.avatar_url,
    p.kind,
    p.content,
    p.metadata,
    p.created_at,
    coalesce(r.reaction_count, 0),
    mine.emoji,
    coalesce(c.comment_count, 0),
    coalesce(r.reaction_summary, '[]'::jsonb)
  from public.community_posts p
  join public.user_profiles up on up.id = p.user_id
  left join lateral (
    select
      count(*) as reaction_count,
      coalesce(
        jsonb_agg(
          jsonb_build_object('emoji', emoji, 'count', emoji_count)
          order by emoji_count desc, emoji
        ),
        '[]'::jsonb
      ) as reaction_summary
    from (
      select cr.emoji, count(*) as emoji_count
      from public.community_post_reactions cr
      where cr.post_id = p.id
      group by cr.emoji
    ) reaction_groups
  ) r on true
  left join lateral (
    select count(*) as comment_count
    from public.community_post_comments cc
    where cc.post_id = p.id
  ) c on true
  left join public.community_post_reactions mine
    on mine.post_id = p.id and mine.user_id = auth.uid()
  where p.is_hidden = false
    and (p_before_id is null or p.id < p_before_id)
  order by p.id desc
  limit least(greatest(p_limit, 1), 50);
$$;

drop function if exists public.get_community_post_comments(bigint, int);
create function public.get_community_post_comments(p_post_id bigint, p_limit int default 30)
returns table (
  id bigint,
  post_id bigint,
  user_id uuid,
  user_name text,
  user_avatar text,
  content text,
  created_at timestamptz
)
language sql
security definer
set search_path = public
stable
as $$
  select
    c.id,
    c.post_id,
    c.user_id,
    coalesce(up.full_name, 'Người học'),
    up.avatar_url,
    c.content,
    c.created_at
  from public.community_post_comments c
  join public.user_profiles up on up.id = c.user_id
  join public.community_posts p on p.id = c.post_id
  where c.post_id = p_post_id
    and p.is_hidden = false
  order by c.created_at asc
  limit least(greatest(p_limit, 1), 100);
$$;

revoke all on function public.get_community_feed(int, bigint) from public, anon;
grant execute on function public.get_community_feed(int, bigint) to authenticated;

revoke all on function public.get_community_post_comments(bigint, int) from public, anon;
grant execute on function public.get_community_post_comments(bigint, int) to authenticated;
