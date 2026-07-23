-- RPG Character Equipment & Coin Migration

-- 1. Add coins column to user_profiles if it doesn't exist
alter table public.user_profiles
  add column if not exists coins integer not null default 0;

-- 2. Create user_equipments table for equipped RPG gear
create table if not exists public.user_equipments (
  id bigint primary key generated always as identity,
  user_id uuid not null references public.user_profiles on delete cascade,
  slot text not null check (slot in ('weapon', 'armor', 'accessory', 'companion')),
  asset_key text not null,
  equipped_at timestamp with time zone default now(),
  unique(user_id, slot)
);

create index if not exists user_equipments_user_idx on public.user_equipments(user_id);
alter table public.user_equipments enable row level security;
create policy "Users can view their own equipments" on public.user_equipments for select using (auth.uid() = user_id);
create policy "Users can manage their own equipments" on public.user_equipments for all using (auth.uid() = user_id);

grant select, insert, update, delete on public.user_equipments to authenticated;
