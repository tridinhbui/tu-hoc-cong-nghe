-- World Boss Raid Schema Migration

-- 1. Table: world_bosses
create table if not exists public.world_bosses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  boss_emoji text default '🐉',
  max_hp integer not null default 1000000,
  current_hp integer not null default 1000000,
  start_date date not null,
  end_date date not null,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

alter table public.world_bosses enable row level security;
create policy "World Bosses readable by everyone" on public.world_bosses for select using (true);

-- 2. Table: world_boss_damage_logs
create table if not exists public.world_boss_damage_logs (
  id bigint primary key generated always as identity,
  boss_id uuid not null references public.world_bosses on delete cascade,
  user_id uuid not null references public.user_profiles on delete cascade,
  damage_dealt integer not null,
  score int not null, -- số câu đúng
  created_at timestamp with time zone default now()
);

create index if not exists world_boss_damage_boss_idx on public.world_boss_damage_logs(boss_id);
create index if not exists world_boss_damage_user_idx on public.world_boss_damage_logs(user_id);
alter table public.world_boss_damage_logs enable row level security;
create policy "Damage logs readable by everyone" on public.world_boss_damage_logs for select using (true);
create policy "Users can log their own damage" on public.world_boss_damage_logs for insert with check (auth.uid() = user_id);

-- Grants
grant select on public.world_bosses to authenticated;
grant select, insert on public.world_boss_damage_logs to authenticated;
