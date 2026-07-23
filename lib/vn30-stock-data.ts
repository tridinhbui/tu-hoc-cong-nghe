export interface StockItem {
  ticker: string;
  name: string;
  sector: string;
  basePrice: number; // VNĐ
  currentPrice: number; // VNĐ
  previousPrice: number; // VNĐ
  volatility: "low" | "medium" | "high";
  description: string;
  dividendYield: number; // %
}

export const INITIAL_VN30_STOCKS: StockItem[] = [
  { ticker: "FPT", name: "Tập đoàn FPT", sector: "Công nghệ & AI", basePrice: 135000, currentPrice: 135000, previousPrice: 135000, volatility: "medium", description: "Đầu ngành công nghệ thông tin, phần mềm xuất khẩu & đào tạo AI.", dividendYield: 2.5 },
  { ticker: "VNM", name: "Vinamilk", sector: "Hàng tiêu dùng", basePrice: 68000, currentPrice: 68000, previousPrice: 68000, volatility: "low", description: "Doanh nghiệp sữa hàng đầu Việt Nam, dòng tiền cổ tức tiền mặt dồi dào.", dividendYield: 5.2 },
  { ticker: "HPG", name: "Tập đoàn Hòa Phát", sector: "Thép & Công nghiệp", basePrice: 28500, currentPrice: 28500, previousPrice: 28500, volatility: "high", description: "Vua thép Việt Nam với tổ hợp lò cao BOF Dung Quất 2.", dividendYield: 1.8 },
  { ticker: "VCB", name: "Vietcombank", sector: "Ngân hàng", basePrice: 92000, currentPrice: 92000, previousPrice: 92000, volatility: "low", description: "Ngân hàng thương mại cổ phần có vốn hóa lớn nhất thị trường.", dividendYield: 1.5 },
  { ticker: "VHM", name: "Vinhomes", sector: "Bất động sản", basePrice: 42000, currentPrice: 42000, previousPrice: 42000, volatility: "high", description: "Nhà phát triển bất động sản đô thị quy mô hàng đầu Việt Nam.", dividendYield: 0.0 },
  { ticker: "VIC", name: "Tập đoàn Vingroup", sector: "Tập đoàn đa ngành", basePrice: 45000, currentPrice: 45000, previousPrice: 45000, volatility: "high", description: "Tập đoàn đa ngành hàng đầu sở hữu xe điện VinFast, Vinpearl.", dividendYield: 0.0 },
  { ticker: "MWG", name: "Thế Giới Di Động", sector: "Bán lẻ", basePrice: 65000, currentPrice: 65000, previousPrice: 65000, volatility: "medium", description: "Chuỗi bán lẻ điện thoại, điện máy Thế Giới Di Động & Bách Hóa Xanh.", dividendYield: 1.2 },
  { ticker: "MSN", name: "Tập đoàn Masan", sector: "Tiêu dùng & Thực phẩm", basePrice: 75000, currentPrice: 75000, previousPrice: 75000, volatility: "medium", description: "Hệ sinh thái hàng tiêu dùng WinMart, Masan Consumer & Chinsu.", dividendYield: 1.0 },
  { ticker: "SSI", name: "Chứng khoán SSI", sector: "Dịch vụ tài chính", basePrice: 32000, currentPrice: 32000, previousPrice: 32000, volatility: "high", description: "Công ty chứng khoán thị phần hàng đầu Việt Nam.", dividendYield: 3.0 },
  { ticker: "VND", name: "Chứng khoán VNDIRECT", sector: "Dịch vụ tài chính", basePrice: 18500, currentPrice: 18500, previousPrice: 18500, volatility: "high", description: "Hệ thống môi giới chứng khoán cá nhân năng động.", dividendYield: 2.8 },
  { ticker: "PNJ", name: "Vàng bạc PNJ", sector: "Bán lẻ trang sức", basePrice: 98000, currentPrice: 98000, previousPrice: 98000, volatility: "medium", description: "Thương hiệu chế tác và bán lẻ vàng bạc trang sức uy tín.", dividendYield: 3.5 },
  { ticker: "TCB", name: "Techcombank", sector: "Ngân hàng", basePrice: 24000, currentPrice: 24000, previousPrice: 24000, volatility: "medium", description: "Ngân hàng tư nhân dẫn đầu về hiệu quả CASA và ngân hàng số.", dividendYield: 2.0 },
  { ticker: "MBB", name: "MBBank", sector: "Ngân hàng", basePrice: 25000, currentPrice: 25000, previousPrice: 25000, volatility: "low", description: "Ngân hàng Quân Đội với tỷ lệ tăng trưởng người dùng số cao.", dividendYield: 3.2 },
  { ticker: "CTG", name: "VietinBank", sector: "Ngân hàng", basePrice: 35000, currentPrice: 35000, previousPrice: 35000, volatility: "medium", description: "Ngân hàng thương mại cổ phần Nhà nước lớn.", dividendYield: 2.2 },
  { ticker: "BID", name: "BIDV", sector: "Ngân hàng", basePrice: 48000, currentPrice: 48000, previousPrice: 48000, volatility: "low", description: "Ngân hàng thương mại sở hữu tổng tài sản top đầu Việt Nam.", dividendYield: 1.8 },
  { ticker: "VPB", name: "VPBank", sector: "Ngân hàng", basePrice: 19500, currentPrice: 19500, previousPrice: 19500, volatility: "high", description: "Ngân hàng có vốn chủ sở hữu lớn nhờ bán vốn cho SMBC.", dividendYield: 2.5 },
  { ticker: "ACB", name: "ACB Bank", sector: "Ngân hàng", basePrice: 26000, currentPrice: 26000, previousPrice: 26000, volatility: "low", description: "Ngân hàng quản trị rủi ro tín dụng hàng đầu, cổ tức tiền mặt đều.", dividendYield: 4.0 },
  { ticker: "DGC", name: "Hóa chất Đức Giang", sector: "Hóa chất", basePrice: 115000, currentPrice: 115000, previousPrice: 115000, volatility: "high", description: "Nhà sản xuất phốt pho vàng lớn nhất Đông Nam Á.", dividendYield: 3.0 },
  { ticker: "REE", name: "Cơ Điện Lạnh REE", sector: "Năng lượng & Hạ tầng", basePrice: 66000, currentPrice: 66000, previousPrice: 66000, volatility: "low", description: "Tập đoàn hạ tầng điện nước & năng lượng tái tạo phòng thủ vững chắc.", dividendYield: 4.5 },
  { ticker: "GAS", name: "PV GAS", sector: "Dầu khí", basePrice: 78000, currentPrice: 78000, previousPrice: 78000, volatility: "low", description: "Tổng công ty khí Việt Nam độc quyền phân phối khí tự nhiên LNG.", dividendYield: 4.8 },
  { ticker: "PLX", name: "Petrolimex", sector: "Phân phối xăng dầu", basePrice: 38000, currentPrice: 38000, previousPrice: 38000, volatility: "medium", description: "Tập đoàn xăng dầu chiếm 50% thị phần bán lẻ cả nước.", dividendYield: 3.5 },
  { ticker: "SAB", name: "Sabeco", sector: "Bia & Đồ uống", basePrice: 58000, currentPrice: 58000, previousPrice: 58000, volatility: "low", description: "Thương hiệu Bia Sài Gòn đầu ngành đồ uống giải khát.", dividendYield: 5.0 },
  { ticker: "VRE", name: "Vincom Retail", sector: "Bất động sản bán lẻ", basePrice: 24500, currentPrice: 24500, previousPrice: 24500, volatility: "medium", description: "Sở hữu và vận hành chuỗi trung tâm thương mại Vincom toàn quốc.", dividendYield: 0.0 },
  { ticker: "KDH", name: "Khang Điền", sector: "Bất động sản", basePrice: 36000, currentPrice: 36000, previousPrice: 36000, volatility: "medium", description: "Chủ đầu tư bất động sản nhà ở pháp lý chuẩn mực tại TP.HCM.", dividendYield: 1.5 },
  { ticker: "BCM", name: "Becamex IDC", sector: "BĐS Khu công nghiệp", basePrice: 72000, currentPrice: 72000, previousPrice: 72000, volatility: "low", description: "Chủ đầu tư chuỗi khu công nghiệp VSIP toàn quốc.", dividendYield: 2.0 },
  { ticker: "HDB", name: "HDBank", sector: "Ngân hàng", basePrice: 27000, currentPrice: 27000, previousPrice: 27000, volatility: "medium", description: "Ngân hàng thương mại duy trì tốc độ tăng trưởng cao liên tục.", dividendYield: 3.0 },
  { ticker: "VIB", name: "VIB Bank", sector: "Ngân hàng", basePrice: 21000, currentPrice: 21000, previousPrice: 21000, volatility: "medium", description: "Dẫn đầu phân khúc cho vay ô tô và thẻ tín dụng cá nhân.", dividendYield: 4.2 },
  { ticker: "LPB", name: "LPBank", sector: "Ngân hàng", basePrice: 30000, currentPrice: 30000, previousPrice: 30000, volatility: "high", description: "Ngân hàng Lộc Phát có mạng lưới điểm giao dịch rộng lớn.", dividendYield: 2.0 },
  { ticker: "SHB", name: "SHB Bank", sector: "Ngân hàng", basePrice: 11500, currentPrice: 11500, previousPrice: 11500, volatility: "high", description: "Ngân hàng thương mại quy mô tổng tài sản thuộc tốp lớn.", dividendYield: 3.0 },
  { ticker: "VTP", name: "Viettel Post", sector: "Logistics & Vận tải", basePrice: 85000, currentPrice: 85000, previousPrice: 85000, volatility: "medium", description: "Tổng công ty bưu chính Viettel phát triển hạ tầng kho vận thông minh.", dividendYield: 2.5 },
];

export interface MarketNewsEvent {
  headline: string;
  affectedSectors: string[];
  impactMultiplier: number; // e.g. +0.03 (+3%) or -0.025 (-2.5%)
  explanation: string;
}

export const MARKET_NEWS_POOL: MarketNewsEvent[] = [
  {
    headline: "📢 Ngân hàng Nhà nước hạ lãi suất điều hành 0.5%",
    affectedSectors: ["Ngân hàng", "Bất động sản", "Dịch vụ tài chính"],
    impactMultiplier: 0.035,
    explanation: "Lãi suất giảm giúp hạ chi phí vốn doanh nghiệp, kích thích dòng tiền đầu tư vào chứng khoán & bất động sản.",
  },
  {
    headline: "📊 Giá thép HRC thế giới phục hồi mạnh +6%",
    affectedSectors: ["Thép & Công nghiệp"],
    impactMultiplier: 0.045,
    explanation: "Giá thép tăng cải thiện biên lợi nhuận gộp cho các nhà sản xuất thép lớn như Hòa Phát.",
  },
  {
    headline: "🏬 Doanh thu bán lẻ tiêu dùng tăng trưởng 12% so với cùng kỳ",
    affectedSectors: ["Hàng tiêu dùng", "Bán lẻ", "Bán lẻ trang sức"],
    impactMultiplier: 0.028,
    explanation: "Sức mua tiêu dùng phục hồi thúc đẩy tăng trưởng cho MWG, MSN, PNJ, VNM.",
  },
  {
    headline: "🌐 FPT ký hợp đồng xuất khẩu phần mềm AI trị giá 100 triệu USD tại Mỹ",
    affectedSectors: ["Công nghệ & AI"],
    impactMultiplier: 0.05,
    explanation: "Các thương định công nghệ quốc tế nâng tầm giá trị định giá của mảng Công nghệ thông tin.",
  },
  {
    headline: "⛽ Giá dầu thô Brent tăng vọt vượt mốc 85 USD/thùng",
    affectedSectors: ["Dầu khí", "Phân phối xăng dầu"],
    impactMultiplier: 0.038,
    explanation: "Nhóm dầu khí và nhiên liệu hưởng lợi trực tiếp khi giá dầu thế giới leo dốc.",
  },
  {
    headline: "⚠️ Cục Dự trữ Liên bang Mỹ (FED) trì hoãn hạ lãi suất do lạm phát",
    affectedSectors: ["Ngân hàng", "Dịch vụ tài chính", "Bất động sản"],
    impactMultiplier: -0.025,
    explanation: "Áp lực tỷ giá tăng khiến dòng vốn ngoại rút ròng tạm thời khỏi thị trường mới nổi.",
  },
];
