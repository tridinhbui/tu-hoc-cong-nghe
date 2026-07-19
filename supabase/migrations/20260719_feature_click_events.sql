-- Generic click/feature-usage tracking: lets the admin dashboard show which
-- features get clicked most, to guide what to build/improve next (see
-- lib/feature-events.ts for the client insert helper and
-- lib/admin/feature-events.ts for the admin aggregation query).
--
-- Deliberately a single generic table (event_name + jsonb metadata) rather
-- than a bespoke table per feature - the set of things worth tracking will
-- grow and change over time, and a fixed schema per feature would mean a
-- migration for every new click point. metadata.label is the one convention
-- call sites should follow: a short human-readable string identifying which
-- specific thing was clicked (a game id, a nav href, a career id) - the
-- admin dashboard groups by (event_name, metadata->>'label').
create table if not exists public.feature_click_events (
  id bigint generated always as identity primary key,
  -- Nullable: some tracked surfaces (landing page CTAs) are reachable
  -- signed-out. Admin reads bypass RLS via the service-role client, so this
  -- never needs to be joined against user_profiles under RLS.
  user_id uuid references public.user_profiles(id) on delete set null,
  event_name text not null check (char_length(event_name) between 1 and 100),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone not null default now()
);

create index if not exists feature_click_events_name_created_idx
  on public.feature_click_events(event_name, created_at desc);

create index if not exists feature_click_events_created_idx
  on public.feature_click_events(created_at desc);

alter table public.feature_click_events enable row level security;

-- Write-only from the client's perspective: anyone (signed in or not) can
-- log an event as themselves (or anonymously), but nobody can read this
-- table back through the public API - only the admin dashboard reads it,
-- via the service-role client which bypasses RLS entirely.
drop policy if exists "Anyone can log their own feature click events" on public.feature_click_events;
create policy "Anyone can log their own feature click events"
  on public.feature_click_events for insert
  to authenticated, anon
  with check (user_id is null or user_id = auth.uid());

grant insert on public.feature_click_events to authenticated, anon;
grant usage on sequence public.feature_click_events_id_seq to authenticated, anon;
