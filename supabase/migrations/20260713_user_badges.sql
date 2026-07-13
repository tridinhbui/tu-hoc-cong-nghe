-- Canonical schema for earned badges. The table existed in docs and
-- production, but not in migrations, which made constraints/RLS easy to
-- drift between environments.

create table if not exists public.user_badges (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  badge_key text not null,
  badge_name text not null,
  badge_description text,
  badge_icon text not null default 'badge',
  earned_at timestamp with time zone not null default now()
);

create index if not exists user_badges_user_idx on public.user_badges(user_id);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.user_badges'::regclass
      and contype = 'u'
      and conkey = (
        select array_agg(attnum order by attnum)
        from pg_attribute
        where attrelid = 'public.user_badges'::regclass
          and attname in ('user_id', 'badge_key')
      )
  ) then
    alter table public.user_badges
      add constraint user_badges_user_id_badge_key_key unique (user_id, badge_key);
  end if;
end $$;

alter table public.user_badges enable row level security;

drop policy if exists "Users can view their own badges" on public.user_badges;
create policy "Users can view their own badges"
  on public.user_badges for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can earn their own badges" on public.user_badges;
create policy "Users can earn their own badges"
  on public.user_badges for insert
  to authenticated
  with check (auth.uid() = user_id);

grant select, insert on public.user_badges to authenticated;
grant usage, select on sequence user_badges_id_seq to authenticated;
