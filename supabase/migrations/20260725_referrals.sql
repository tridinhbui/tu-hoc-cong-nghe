-- "Mời bạn học cùng" (referral): a user shares their referral link
-- (?ref=<their user id>), and when someone signs up through it and
-- completes their first lesson (genuine engagement, not just a signup -
-- mirrors this app's existing anti-abuse pattern of gating XP on real
-- activity, not self-reported/free actions), both sides get a one-time XP
-- bonus. One referrer per person, ever (unique on referred_id) - the first
-- link someone signs up through wins, later ones are silently ignored.
create table if not exists public.referrals (
  id bigint generated always as identity primary key,
  referrer_id uuid not null references auth.users(id) on delete cascade,
  referred_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'rewarded')),
  created_at timestamp with time zone not null default now(),
  rewarded_at timestamp with time zone
);

create unique index if not exists referrals_referred_id_key on public.referrals(referred_id);
create index if not exists referrals_referrer_id_idx on public.referrals(referrer_id);

alter table public.referrals enable row level security;

drop policy if exists "Users can view referrals involving them" on public.referrals;
create policy "Users can view referrals involving them"
  on public.referrals for select
  to authenticated
  using (auth.uid() = referrer_id or auth.uid() = referred_id);

-- No insert/update policy for the client - both writes go through the
-- RPCs below (security definer, bound to auth.uid()) so a client can't
-- fabricate a referral for someone else or reward one early.
grant select on public.referrals to authenticated;

-- Called once by a newly signed-up user (auth.uid() = the referred person)
-- right after their first login, with the referrer's id read from the
-- ?ref= link they signed up through. Silently no-ops on self-referral, an
-- unknown referrer, or if this person already has a referrer on record -
-- callers don't need to pre-check any of that themselves.
create or replace function public.record_referral(p_referrer_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_referrer_id is null or p_referrer_id = auth.uid() then
    return;
  end if;
  if not exists (select 1 from public.user_profiles where id = p_referrer_id) then
    return;
  end if;
  insert into public.referrals (referrer_id, referred_id, status)
  values (p_referrer_id, auth.uid(), 'pending')
  on conflict (referred_id) do nothing;
end;
$$;

revoke all on function public.record_referral(uuid) from public, anon;
grant execute on function public.record_referral(uuid) to authenticated;

-- Called by the referred user themselves (via recalculateUserStats, once
-- they have at least one completed lesson) - only ever flips the caller's
-- OWN pending referral to rewarded, so this can't be used to force-reward
-- someone else's referral early.
create or replace function public.reward_my_referral()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.referrals
  set status = 'rewarded', rewarded_at = now()
  where referred_id = auth.uid() and status = 'pending';
end;
$$;

revoke all on function public.reward_my_referral() from public, anon;
grant execute on function public.reward_my_referral() to authenticated;
