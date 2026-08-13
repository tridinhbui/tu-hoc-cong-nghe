-- Cửa hàng trang phục: làm cho nút "Mua" thực sự mua được.
--
-- Trước bản này KHÔNG món nào trong components/CosmeticStore.tsx mua được, và
-- nó hỏng trong im lặng tuyệt đối - không toast thành công, không toast lỗi.
-- Bốn tầng chặn độc lập nhau, mỗi tầng một mình đã đủ làm hỏng:
--
--   1. Không migration nào seed 10 asset_key của cửa hàng vào
--      gamification_assets. Câu `select ... eq(asset_key)` luôn không thấy gì.
--
--   2. Không thấy thì client `insert` một hàng mới. gamification_assets bật
--      RLS với đúng một policy SELECT (20260806), và chỉ được
--      `grant select ... to authenticated`. Câu insert bị chặn.
--
--   3. Kể cả nếu qua được (2), CHECK trên asset_type chỉ nhận
--      ('card','avatar_frame','profile_theme','title'), trong khi 8 trong 10
--      món dùng weapon/armor/accessory/companion/booster/chat_effect. Ràng
--      buộc sẽ từ chối.
--
--   4. supabase-js KHÔNG throw khi lỗi, nó trả { data, error }. Mã cũ bỏ qua
--      `error` ở cả ba lệnh, nên `asset` là null, khối `if (asset)` không chạy,
--      hàm return. `catch` không bao giờ được gọi. Đó là lý do người dùng chỉ
--      thấy nút bấm không phản ứng gì.
--
-- Chữa bằng cách đưa catalog và giá về phía máy chủ, rồi mua qua một hàm
-- SECURITY DEFINER. KHÔNG mở quyền insert gamification_assets cho client: một
-- client tạo được asset là một client tự đặt được giá.

-- 1. Mở CHECK cho các loại mà cửa hàng thật đang bán.
--
-- Thêm chứ không thay: 'card' đang có 10 hàng thẻ doanh nghiệp từ
-- 20260810_seed_finance_cards.sql, còn avatar_frame/profile_theme/title nằm
-- trong hợp đồng của bảng từ đầu.
alter table public.gamification_assets
  drop constraint if exists gamification_assets_asset_type_check;

alter table public.gamification_assets
  add constraint gamification_assets_asset_type_check
  check (asset_type in (
    'card', 'avatar_frame', 'profile_theme', 'title',
    'weapon', 'armor', 'accessory', 'companion', 'booster', 'chat_effect'
  ));

-- 2. Giá nằm ở bảng, không nằm ở trình duyệt.
--
-- Mã cũ gửi `item.price` từ client rồi tự trừ coin bằng một câu UPDATE cũng từ
-- client. Cả hai vế đều do người mua kiểm soát. `price is null` nghĩa là món đó
-- không bán - thẻ doanh nghiệp rơi từ rương chứ không mua, nên chúng giữ null
-- và hàm bên dưới sẽ từ chối chúng.
alter table public.gamification_assets
  add column if not exists price integer check (price is null or price > 0);

-- 3. Seed đúng 10 món của cửa hàng.
--
-- name/description ở đây là bản dự phòng: giao diện render qua
-- t.cosmeticStore.items[...] nên người học thấy chuỗi theo ngôn ngữ của họ.
-- Giữ đồng bộ với lib/i18n/dictionaries/sections/cosmetics-duel.ts để một
-- truy vấn thẳng vào bảng vẫn đọc được, và với giá trong
-- components/CosmeticStore.tsx - giá ở ĐÂY mới là giá có hiệu lực.
insert into public.gamification_assets
  (asset_key, asset_type, name, description, rarity, price)
values
  ('booster_xp_24h',           'booster',     '⚡ Thẻ X2 XP Booster (24 giờ)',      'Nhân đôi XP nhận được khi hoàn thành bài học và bài thi trong 24 giờ.', 'legendary', 250),
  ('title_vip_diamond',        'title',       '💎 Huy Hiệu VIP Kim Cương',          'Danh hiệu VIP Kim Cương hiện trên Bảng Xếp Hạng và Hồ Sơ Cá Nhân.',    'legendary', 500),
  ('chat_effect_dragon_fire',  'chat_effect', '🔥 Khung Chat Rồng Lửa (Phòng 3D)',  'Hiệu ứng ngọn lửa rồng quanh tin nhắn trong Phòng Học Nhóm 3D.',       'epic',      300),
  ('chat_effect_diamond_glow', 'chat_effect', '💎 Khung Chat Kim Cương Vô Cực',     'Hiệu ứng viền kim cương lấp lánh khi trò chuyện trong phòng học 3D.',  'legendary', 450),
  ('weapon_valuation_pen',     'weapon',      'Bút Định Giá Thần Kỳ',               'Bút thần gia tăng 20% sát thương khi giải câu hỏi định giá.',          'rare',      150),
  ('weapon_lbo_sword',         'weapon',      'Kiếm Phân Tích LBO',                 'Vũ khí sắc bén chém tan các cấu trúc nợ phức tạp.',                    'epic',      350),
  ('armor_risk_shield',        'armor',       'Khiên Quản Trị Rủi Ro',              'Bảo vệ tài khoản khỏi các cú sụt giảm thị trường.',                    'rare',      200),
  ('acc_glasses',              'accessory',   'Kính Phân Tích BCTC',                'Nhìn thấu mọi chi tiết ẩn trong Báo cáo tài chính.',                   'common',    100),
  ('acc_crown',                'accessory',   'Vương Miện CFO',                     'Vương miện vinh danh các bậc thầy giám đốc tài chính.',                'legendary', 600),
  ('pet_bull',                 'companion',   'Linh vật Bò Tăng Trưởng',            'Linh vật mang lại may mắn và tăng điểm thưởng XP.',                    'epic',      400)
on conflict (asset_key) do update set
  asset_type  = excluded.asset_type,
  name        = excluded.name,
  description = excluded.description,
  rarity      = excluded.rarity,
  price       = excluded.price;

-- 4. Mua trong MỘT giao dịch.
--
-- Bản cũ ghi user_inventories rồi mới trừ coin bằng hai lệnh rời từ client:
-- lệnh đầu xong, lệnh sau hỏng, người mua có món đồ miễn phí. Ở đây cả hai nằm
-- trong cùng một hàm, nên hoặc cùng xong hoặc cùng không.
--
-- Trừ coin bằng một câu UPDATE có điều kiện `coins >= giá` chứ không đọc-rồi-ghi:
-- hai tab cùng bấm mua sẽ có đúng một tab thắng, thay vì cả hai cùng đọc số dư
-- cũ rồi cùng ghi đè.
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

  -- price null = không bày bán (thẻ doanh nghiệp rơi từ rương). Chặn ở đây,
  -- nếu không thì mọi asset_key trong bảng đều mua được với giá null.
  if v_price is null then
    raise exception 'Món này không bán';
  end if;

  -- Đã sở hữu thì dừng TRƯỚC khi trừ tiền. unique(user_id, asset_id) sẽ chặn
  -- hàng trùng, nhưng nếu để nó chặn thì câu update coin ở dưới đã chạy rồi.
  if exists (
    select 1 from public.user_inventories i
     where i.user_id = v_user and i.asset_id = v_asset
  ) then
    raise exception 'Bạn đã sở hữu món này';
  end if;

  update public.user_profiles p
     set coins = p.coins - v_price
   where p.id = v_user
     and p.coins >= v_price
  returning p.coins into coins_left;

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
