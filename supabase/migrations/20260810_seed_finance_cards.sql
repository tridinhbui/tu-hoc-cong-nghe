insert into public.gamification_assets
  (asset_key, asset_type, name, description, rarity, domain_type, metadata)
values
  ('card-fpt', 'card', 'Tập đoàn FPT', 'Thẻ doanh nghiệp công nghệ, viễn thông và giáo dục.', 'rare', 'valuation', '{"ticker":"FPT","sector":"Công nghệ"}'::jsonb),
  ('card-vnm', 'card', 'Vinamilk', 'Thẻ doanh nghiệp tiêu dùng phòng thủ.', 'epic', 'accounting', '{"ticker":"VNM","sector":"Sữa / FMCG"}'::jsonb),
  ('card-vcb', 'card', 'Vietcombank', 'Thẻ ngân hàng đầu ngành.', 'legendary', 'corporate_finance', '{"ticker":"VCB","sector":"Ngân hàng"}'::jsonb),
  ('card-hpg', 'card', 'Tập đoàn Hòa Phát', 'Thẻ doanh nghiệp thép chu kỳ.', 'rare', 'investment', '{"ticker":"HPG","sector":"Thép"}'::jsonb),
  ('card-mwg', 'card', 'Thế Giới Di Động', 'Thẻ doanh nghiệp bán lẻ hiện đại.', 'rare', 'valuation', '{"ticker":"MWG","sector":"Bán lẻ"}'::jsonb),
  ('card-msn', 'card', 'Tập đoàn Masan', 'Thẻ hệ sinh thái tiêu dùng.', 'epic', 'corporate_finance', '{"ticker":"MSN","sector":"Tiêu dùng"}'::jsonb),
  ('card-vhm', 'card', 'Vinhomes', 'Thẻ nhà phát triển bất động sản.', 'epic', 'risk_management', '{"ticker":"VHM","sector":"Bất động sản"}'::jsonb),
  ('card-ssi', 'card', 'Chứng khoán SSI', 'Thẻ công ty chứng khoán đầu ngành.', 'common', 'investment', '{"ticker":"SSI","sector":"Chứng khoán"}'::jsonb),
  ('card-gas', 'card', 'PV Gas', 'Thẻ hạ tầng khí và năng lượng.', 'rare', 'economics', '{"ticker":"GAS","sector":"Năng lượng"}'::jsonb),
  ('card-vic', 'card', 'Tập đoàn Vingroup', 'Thẻ tập đoàn đa ngành.', 'legendary', 'risk_management', '{"ticker":"VIC","sector":"Tập đoàn đa ngành"}'::jsonb)
on conflict (asset_key) do update set
  name = excluded.name,
  description = excluded.description,
  rarity = excluded.rarity,
  domain_type = excluded.domain_type,
  metadata = excluded.metadata;
