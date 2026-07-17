-- Community comparison for the net-worth audit tool (NetWorthTracker).
-- Returns only an aggregate percentile + average, computed server-side from
-- everyone's LATEST snapshot - never exposes other users' individual net
-- worth to the client (no anon/authenticated SELECT grant on
-- net_worth_snapshots itself for cross-user rows, RLS already restricts
-- that to auth.uid() = user_id).
create or replace function public.get_net_worth_percentile(p_net_worth numeric)
returns table (percentile numeric, average_net_worth numeric, sample_size bigint)
language sql
security definer
set search_path = public
as $$
  with latest as (
    select distinct on (user_id) user_id, net_worth
    from net_worth_snapshots
    order by user_id, created_at desc
  )
  select
    case when count(*) = 0 then null
      else round(100.0 * count(*) filter (where net_worth <= p_net_worth) / count(*), 1)
    end as percentile,
    round(avg(net_worth), 0) as average_net_worth,
    count(*) as sample_size
  from latest;
$$;

grant execute on function public.get_net_worth_percentile(numeric) to authenticated;
