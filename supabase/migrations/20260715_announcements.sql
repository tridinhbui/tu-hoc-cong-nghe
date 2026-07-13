-- Admin -> all-users announcements ("important update" banners), e.g.
-- maintenance notices, new-track launches, policy changes. Read model: one
-- shared `announcements` row per broadcast + a per-user `announcement_reads`
-- row written only when a user actually dismisses it - not a fan-out insert
-- to every account on send, which doesn't scale nicely and has no
-- precedent elsewhere in this schema (badges/leaderboard are computed from
-- existing rows, not pre-fanned-out either).

create table if not exists public.announcements (
  id bigint generated always as identity primary key,
  title text not null,
  body text not null,
  severity text not null default 'info' check (severity in ('info', 'warning', 'critical')),
  created_by uuid references public.user_profiles(id) on delete set null,
  active boolean not null default true,
  expires_at timestamp with time zone,
  created_at timestamp with time zone not null default now()
);

create index if not exists announcements_active_idx on public.announcements(active, created_at desc);

alter table public.announcements enable row level security;

-- Every signed-in user can read active announcements (that's the whole
-- point); only admin code paths (via the service-role client in
-- lib/admin/announcements.ts) create/update rows, so there's no
-- insert/update policy for `authenticated` at all.
drop policy if exists "Anyone signed in can read announcements" on public.announcements;
create policy "Anyone signed in can read announcements"
  on public.announcements for select
  to authenticated
  using (true);

grant select on public.announcements to authenticated;

create table if not exists public.announcement_reads (
  announcement_id bigint not null references public.announcements(id) on delete cascade,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  read_at timestamp with time zone not null default now(),
  primary key (announcement_id, user_id)
);

create index if not exists announcement_reads_user_idx on public.announcement_reads(user_id);

alter table public.announcement_reads enable row level security;

drop policy if exists "Users can view their own announcement reads" on public.announcement_reads;
create policy "Users can view their own announcement reads"
  on public.announcement_reads for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can mark their own announcement reads" on public.announcement_reads;
create policy "Users can mark their own announcement reads"
  on public.announcement_reads for insert
  to authenticated
  with check (auth.uid() = user_id);

grant select, insert on public.announcement_reads to authenticated;
