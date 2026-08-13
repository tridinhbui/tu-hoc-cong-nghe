-- `coins` là một cột thường trên user_profiles, và ai cũng ghi được vào đó.
--
-- 20260913 đã đưa việc MUA về server: giá nằm trong bảng, trừ tiền trong một
-- hàm security definer. Nhưng nó chỉ bịt đường tiêu. Đường NẠP vẫn mở toang:
-- policy "Users can update their own profile" cho phép cập nhật cả hàng, và
-- `coins` nằm trong hàng đó. Mở console lên, gọi một câu update, đặt số coin
-- tuỳ ý - rồi mua sạch cửa hàng bằng đúng cái hàm vừa được làm cho chặt chẽ.
--
-- Bốn đường ghi coin đang có, và ba trong số đó để CLIENT quyết số tiền:
--
--   FortuneWheelModal   gửi lên `prize.coins`, mà giải là do trình duyệt bốc
--   FinancialRpgWorldMap cộng thẳng `coins + 5` khi khám phá một khu
--   DashboardClient     cộng số coin của ván game, do client báo
--   api/career-profile/claim  chạy bằng service role, số tiền do server quyết
--
-- Ba cái đầu phải chuyển sang grant_coins(). Cái thứ tư giữ nguyên, và trigger
-- bên dưới cố ý KHÔNG chặn service role - xem lý do ở chỗ nó.

-- ---------------------------------------------------------------------------
-- 1. Trigger khoá cột
-- ---------------------------------------------------------------------------

-- ĐẶT LẠI GIÁ TRỊ CŨ, KHÔNG NÉM LỖI. PostgREST gửi cả object khi client gọi
-- update, nên một form đổi tên hiển thị hoàn toàn hợp lệ cũng có thể mang theo
-- `coins` trong payload mà không định đổi nó. Ném lỗi sẽ làm hỏng những lượt
-- ghi ấy; đặt lại về OLD thì phần còn lại vẫn chạy, chỉ riêng tiền không nhúc
-- nhích. Kẻ cố tình cũng nhận đúng kết quả đó: câu lệnh "thành công" và số dư
-- không đổi.
--
-- CHỈ CHẶN VAI TRÒ CỦA TRÌNH DUYỆT. `authenticated` và `anon` là hai vai trò mà
-- khoá API công khai chạy dưới đó - tức thứ duy nhất người dùng cầm trong tay.
-- service_role và postgres đi qua: chúng là mã của chính mình chạy ở server
-- (route claim thưởng nhiệm vụ nghề nghiệp), và chặn chúng chỉ có nghĩa là mọi
-- đường cấp tiền hợp lệ đều phải học cách bật cờ, để đổi lấy đúng không gì.
create or replace function public.guard_coins_column()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.coins is distinct from old.coins
     and current_user in ('authenticated', 'anon')
     and coalesce(current_setting('app.coin_write', true), '') <> 'on' then
    new.coins := old.coins;
  end if;
  return new;
end;
$$;

drop trigger if exists guard_coins_on_user_profiles on public.user_profiles;
create trigger guard_coins_on_user_profiles
  before update on public.user_profiles
  for each row execute function public.guard_coins_column();

-- ---------------------------------------------------------------------------
-- 2. purchase_cosmetic phải bật cờ, nếu không nó tự chặn chính mình
-- ---------------------------------------------------------------------------

-- Thân hàm giữ NGUYÊN như 20260913 - kể cả câu update có điều kiện
-- `coins >= v_price`, vốn là cách nó tránh đua mà không cần khoá hàng. Chỉ
-- thêm hai dòng set_config quanh nó.
--
-- `security definer` KHÔNG đủ để đi qua trigger: nó đổi quyền, không đổi
-- `current_user` được thấy trong trigger khi hàm do vai trò `authenticated`
-- gọi. Nên cờ là thứ bắt buộc, và `set_config(..., true)` giới hạn nó trong
-- giao dịch hiện tại - không rò sang lời gọi sau trên cùng kết nối.
create or replace function public.purchase_cosmetic(p_asset_key text)
returns table (asset_key text, coins_left integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user  uuid := auth.uid();
  v_asset uuid;
  v_price integer;
begin
  if v_user is null then
    raise exception 'Chưa đăng nhập';
  end if;

  select a.id, a.price into v_asset, v_price
    from public.gamification_assets a
   where a.asset_key = p_asset_key;

  if v_asset is null then
    raise exception 'Không có món nào tên %', p_asset_key;
  end if;

  if v_price is null then
    raise exception 'Món này không bán';
  end if;

  if exists (
    select 1 from public.user_inventories i
     where i.user_id = v_user and i.asset_id = v_asset
  ) then
    raise exception 'Bạn đã sở hữu món này';
  end if;

  perform set_config('app.coin_write', 'on', true);

  update public.user_profiles p
     set coins = p.coins - v_price
   where p.id = v_user
     and p.coins >= v_price
  returning p.coins into coins_left;

  perform set_config('app.coin_write', 'off', true);

  if coins_left is null then
    raise exception 'Không đủ coin';
  end if;

  insert into public.user_inventories (user_id, asset_id)
  values (v_user, v_asset);

  asset_key := p_asset_key;
  return next;
end;
$$;

grant execute on function public.purchase_cosmetic(text) to authenticated;

-- ---------------------------------------------------------------------------
-- 3. Sổ cấp coin, và hàm cấp duy nhất
-- ---------------------------------------------------------------------------

-- Sổ này vừa là bản ghi để đối chiếu, vừa là thứ chặn cấp trùng: khoá duy nhất
-- trên (user, source, ref) nghĩa là "khám phá khu X" trả tiền đúng một lần dù
-- client gọi bao nhiêu lần.
create table if not exists public.coin_grants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null,
  ref text,
  amount integer not null check (amount > 0),
  created_at timestamptz not null default now()
);

create unique index if not exists coin_grants_once_per_ref
  on public.coin_grants (user_id, source, ref) where ref is not null;
create index if not exists coin_grants_user_time
  on public.coin_grants (user_id, created_at desc);

alter table public.coin_grants enable row level security;

drop policy if exists "Users read their own coin grants" on public.coin_grants;
create policy "Users read their own coin grants" on public.coin_grants
  for select using (auth.uid() = user_id);
-- Cố ý không có policy insert: chỉ hàm bên dưới ghi được vào sổ này.

grant select on public.coin_grants to authenticated;

create or replace function public.grant_coins(p_source text, p_ref text, p_amount integer)
returns table (granted integer, coins_left integer, duplicate boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_cap  integer;
  v_give integer;
begin
  if v_user is null then
    raise exception 'Chưa đăng nhập';
  end if;

  -- TRẦN THEO NGUỒN, giữ ở đây chứ không ở client. Đây là thứ biến "đặt coin
  -- thành một triệu" thành "nhận nhiều nhất 100 cho một vòng quay". Con số lấy
  -- từ chính mức thưởng cao nhất có thật của mỗi nguồn, đo lúc viết bản này.
  v_cap := case p_source
             when 'building' then 5     -- FinancialRpgWorldMap, mỗi khu +5
             when 'wheel'    then 100   -- FortuneWheelModal, giải cao nhất
             when 'game'      then 50   -- thắng một ván trên dashboard
             when 'challenge' then 100  -- WeeklyChallengeWidget: 80 x 1.25
             else null
           end;

  if v_cap is null then
    raise exception 'Nguồn không hợp lệ: %', p_source;
  end if;

  v_give := least(greatest(coalesce(p_amount, 0), 0), v_cap);

  if v_give = 0 then
    select 0, p.coins, false into granted, coins_left, duplicate
      from public.user_profiles p where p.id = v_user;
    return next;
    return;
  end if;

  begin
    insert into public.coin_grants (user_id, source, ref, amount)
    values (v_user, p_source, p_ref, v_give);
  exception when unique_violation then
    -- Đã cấp cho đúng tham chiếu này rồi. Trả về bình thường chứ không ném:
    -- với giao diện thì thao tác ấy đã thành công từ lần trước, và một thông
    -- báo lỗi ở đây chỉ làm người dùng tưởng có gì hỏng.
    select 0, p.coins, true into granted, coins_left, duplicate
      from public.user_profiles p where p.id = v_user;
    return next;
    return;
  end;

  perform set_config('app.coin_write', 'on', true);
  update public.user_profiles p set coins = coalesce(p.coins, 0) + v_give
   where p.id = v_user
  returning p.coins into coins_left;
  perform set_config('app.coin_write', 'off', true);

  granted := v_give;
  duplicate := false;
  return next;
end;
$$;

revoke all on function public.grant_coins(text, text, integer) from public;
grant execute on function public.grant_coins(text, text, integer) to authenticated;

-- CÒN HỞ, ghi lại để không ai tưởng chỗ này đã kín hẳn:
--
-- `game` không có tham chiếu duy nhất nào, vì điểm số do client báo và server
-- không dựng lại được ván đấu. Trần 50 chặn "một ván ăn một triệu", không chặn
-- "gọi một trăm lần". Bịt hẳn thì phải đưa luật chơi sang server.
--
-- `wheel` cũng vậy cho tới khi chính lượt quay được quyết ở server: hiện client
-- bốc giải rồi báo lên, nên nó tự chọn được 100 mỗi lần thay vì để xác suất
-- quyết. Trần giữ nó ở mức giải cao nhất có thật, và sổ coin_grants để lại dấu
-- vết đọc được nếu có ai làm vậy.
--
-- Cả hai đều là bước tiếp theo, không phải thứ bản này giả vờ đã xong.
