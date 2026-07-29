-- Fourth pass on the "client-written value that recalculateUserStats trusts
-- as XP" class. Three findings, plus one migration-ordering bug that only
-- shows up on a database built from scratch.
--
--   1. user_stats.xp_spent - integer, no CHECK, and the client holds
--      UPDATE on user_stats. The formula SUBTRACTS it:
--        totalXp = ... + chestXp - xpSpent
--      so a negative value is not a discount, it is a mint. It also defeats
--      the shop: spend_xp gates on (total_xp - xp_spent) < price, which is
--      always false once xp_spent is negative, making every item free.
--
--   2. user_chests.xp_earned - integer, no CHECK, client holds INSERT and
--      UPDATE. getTotalChestXp sums it straight into total_xp. The richest
--      real chest is worth 15 XP (CHEST_REWARDS in lib/chests.ts).
--
--   3. user_chests.source - 20260729_study_group_missions_v1.sql added
--      'study_group', but 20260801 and 20260805 both redefine this
--      constraint afterwards and neither carries that value forward, so the
--      end state silently drops it. That is exactly the failure 20260801's
--      own comment describes for 'daily_login': earnChest() only logs the
--      23514 and returns false, so the chest is never granted and nothing
--      surfaces. lib/chests.ts#ChestSource already lists 'study_group'.

-- 1. xp_spent -----------------------------------------------------------

update public.user_stats set xp_spent = 0 where xp_spent < 0;

do $$ begin
  alter table public.user_stats
    add constraint user_stats_xp_spent_non_negative check (xp_spent >= 0);
exception when duplicate_object then null;
end $$;

-- 2. chest XP -----------------------------------------------------------

update public.user_chests
set xp_earned = least(greatest(coalesce(xp_earned, 0), 0), 25)
where xp_earned is distinct from least(greatest(coalesce(xp_earned, 0), 0), 25);

do $$ begin
  alter table public.user_chests
    add constraint user_chests_xp_earned_range check (xp_earned >= 0 and xp_earned <= 25);
exception when duplicate_object then null;
end $$;

-- 3. chest sources ------------------------------------------------------

-- The union of every source any migration has ever allowed, so a later
-- migration redefining this constraint can't quietly drop one again. Keep
-- this list in sync with ChestSource in lib/chests.ts.
alter table public.user_chests drop constraint if exists user_chests_source_check;
alter table public.user_chests add constraint user_chests_source_check
  check (source in (
    'weekly_quest',
    'milestone_exam',
    'daily_login',
    'shop_purchase',
    'study_group'
  ));
