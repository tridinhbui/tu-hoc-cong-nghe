-- Shop: users spend XP to directly buy a specific cosmetic (title/theme),
-- instead of relying purely on chest RNG. Reuses user_chests as the single
-- ownership/inventory source of truth (see lib/chests.ts's
-- getUnlockedCosmetics) rather than a parallel purchases table - a
-- purchased row is inserted pre-opened with source='shop_purchase', so it's
-- indistinguishable from a chest-won reward to every existing "what does
-- this user own" query.
alter table public.user_chests drop constraint if exists user_chests_source_check;
alter table public.user_chests add constraint user_chests_source_check
  check (source in ('weekly_quest', 'milestone_exam', 'daily_login', 'shop_purchase'));

-- Catalog is intentionally hardcoded here (case block) rather than trusted
-- from the client, unlike chest RNG rewards (where the client never picks
-- the reward, only triggers the open). A purchase lets the client name
-- both the item AND implicitly its price, so - unlike every other XP path
-- in this app, which is an *earn* path self-healed by
-- recalculateUserStats() recomputing total_xp from scratch - this *spend*
-- path has no self-heal and must be validated server-side against a fixed
-- catalog instead of trusting client-supplied price/type/value.
--
-- p_item_id values and prices must stay in sync with lib/shop.ts's
-- SHOP_ITEMS array by hand - this list is small and rarely changes.
create or replace function public.purchase_shop_item(p_item_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reward_type text;
  v_reward_value text;
  v_price_xp integer;
  v_total_xp integer;
  v_xp_spent integer;
begin
  case p_item_id
    when 'title-chien-than' then v_reward_type := 'title'; v_reward_value := 'Chiến thần tích lũy'; v_price_xp := 150;
    when 'title-huy-diet-no' then v_reward_type := 'title'; v_reward_value := 'Kẻ hủy diệt nợ nần'; v_price_xp := 150;
    when 'title-soi-gia' then v_reward_type := 'title'; v_reward_value := 'Sói già phố Wall'; v_price_xp := 200;
    when 'title-dai-gia-lai-kep' then v_reward_type := 'title'; v_reward_value := 'Đại gia lãi kép'; v_price_xp := 200;
    when 'title-bac-thay-dinh-gia' then v_reward_type := 'title'; v_reward_value := 'Bậc thầy định giá'; v_price_xp := 250;
    when 'theme-gold' then v_reward_type := 'theme'; v_reward_value := 'gold'; v_price_xp := 400;
    when 'theme-emerald' then v_reward_type := 'theme'; v_reward_value := 'emerald'; v_price_xp := 400;
    else raise exception 'Sản phẩm không tồn tại trong cửa hàng.';
  end case;

  -- Locks this user's own user_stats row for the rest of the transaction,
  -- serializing concurrent purchase attempts (e.g. a double-click) by the
  -- same user - the second call blocks here until the first commits, then
  -- re-reads the post-purchase balance instead of racing it.
  select total_xp, xp_spent into v_total_xp, v_xp_spent
  from public.user_stats where user_id = auth.uid() for update;

  if v_total_xp is null then
    raise exception 'Không tìm thấy dữ liệu XP của bạn.';
  end if;

  if (v_total_xp - v_xp_spent) < v_price_xp then
    raise exception 'Không đủ XP để mua vật phẩm này.';
  end if;

  if exists (
    select 1 from public.user_chests
    where user_id = auth.uid() and opened = true
      and reward_type = v_reward_type and reward_value = v_reward_value
  ) then
    raise exception 'Bạn đã sở hữu vật phẩm này rồi.';
  end if;

  insert into public.user_chests (user_id, source, opened, opened_at, reward_type, reward_value, xp_earned)
  values (auth.uid(), 'shop_purchase', true, now(), v_reward_type, v_reward_value, 0);

  update public.user_stats set xp_spent = v_xp_spent + v_price_xp where user_id = auth.uid();
end;
$$;

revoke all on function public.purchase_shop_item(text) from public, anon;
grant execute on function public.purchase_shop_item(text) to authenticated;
