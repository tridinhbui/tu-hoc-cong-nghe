-- World Boss: cho phép sát thương thực sự trừ được máu.
--
-- Trước bản này thanh máu không thể sụt, vì hai lý do độc lập nhau và cả hai
-- đều nằm ở tầng dữ liệu:
--
--   1. Bảng world_bosses chỉ có policy SELECT và chỉ được grant SELECT. Route
--      /api/world-boss chạy bằng phiên của chính người dùng, nên câu UPDATE
--      current_hp bị RLS chặn - im lặng, không lỗi nào nổi lên giao diện.
--
--   2. Không có hàng boss nào đang hoạt động. Route rơi về FALLBACK_WORLD_BOSS
--      trong mã nguồn, mà id của nó là chuỗi "world-boss-titan-2026" trong khi
--      cột id là uuid - nên nó không bao giờ khớp một hàng nào, và nhánh trừ
--      máu bị bỏ qua hoàn toàn.
--
-- Cách chữa là một hàm SECURITY DEFINER: nó chạy bằng quyền của người tạo hàm
-- nên qua được RLS, mà vẫn không phải mở quyền UPDATE cho mọi người dùng - mở
-- ra thì ai cũng đặt được current_hp = 0.
--
-- Hàm cũng làm phép trừ NGUYÊN TỬ trong một câu lệnh. Bản cũ đọc current_hp
-- rồi ghi lại giá trị đã trừ; với một con boss "cả server cùng đánh" thì hai
-- người kết thúc cùng lúc sẽ cùng đọc một con số và người ghi sau xoá mất sát
-- thương của người ghi trước. Đó không phải trường hợp hiếm, đó là mặc định.

create or replace function public.apply_world_boss_damage(
  p_boss_id uuid,
  p_score int
)
returns table (boss_id uuid, current_hp int, max_hp int, damage_applied int)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_damage int;
  v_user uuid := auth.uid();
begin
  if v_user is null then
    raise exception 'Chưa đăng nhập';
  end if;

  -- Sát thương do MÁY CHỦ tính, không nhận từ trình duyệt. Điểm bị kẹp trong
  -- [0, 15] trước khi nhân, nên một client sửa điểm thành 9999 cũng chỉ gây
  -- đúng sát thương của một trận hoàn hảo.
  v_damage := least(greatest(coalesce(p_score, 0), 0), 15) * 6000;

  if v_damage <= 0 then
    raise exception 'Không có sát thương nào để ghi';
  end if;

  update public.world_bosses b
     set current_hp = greatest(0, b.current_hp - v_damage)
   where b.id = p_boss_id
     and b.is_active
  returning b.id, b.current_hp, b.max_hp, v_damage
    into boss_id, current_hp, max_hp, damage_applied;

  if boss_id is null then
    raise exception 'Không tìm thấy world boss đang hoạt động';
  end if;

  insert into public.world_boss_damage_logs (boss_id, user_id, damage_dealt, score)
  values (boss_id, v_user, v_damage, least(greatest(coalesce(p_score, 0), 0), 15));

  return next;
end;
$$;

grant execute on function public.apply_world_boss_damage(uuid, int) to authenticated;

-- Một con boss đang hoạt động, để route không phải rơi về bản dự phòng trong
-- mã nguồn nữa. Chỉ tạo khi chưa có con nào đang hoạt động, nên chạy lại
-- migration này không sinh thêm boss.
insert into public.world_bosses (name, description, boss_emoji, max_hp, current_hp, start_date, end_date, is_active)
select
  'Bạo Chúa Khủng Hoảng Tài Chính',
  'Trùm World Boss của cả server. Mọi người học cùng gây sát thương để hạ nó trong tuần.',
  '🌋',
  1000000,
  1000000,
  current_date,
  current_date + 7,
  true
where not exists (select 1 from public.world_bosses where is_active);
