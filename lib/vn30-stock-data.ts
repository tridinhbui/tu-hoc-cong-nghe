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
  { ticker: "FPT", name: "Tập đoàn FPT", sector: "Phần mềm & dịch vụ CNTT", basePrice: 135000, currentPrice: 135000, previousPrice: 135000, volatility: "medium", description: "Đầu ngành phần mềm xuất khẩu, chuyển đổi số và đào tạo kỹ sư.", dividendYield: 2.5 },
  { ticker: "VNG", name: "VNG Corporation", sector: "Nền tảng số & giải trí", basePrice: 68000, currentPrice: 68000, previousPrice: 68000, volatility: "high", description: "Zalo, trò chơi trực tuyến và dịch vụ đám mây trong nước.", dividendYield: 0.0 },
  { ticker: "CMG", name: "CMC Technology", sector: "Phần mềm & dịch vụ CNTT", basePrice: 28500, currentPrice: 28500, previousPrice: 28500, volatility: "medium", description: "Tích hợp hệ thống, an toàn thông tin và trung tâm dữ liệu.", dividendYield: 1.8 },
  { ticker: "VTP", name: "Viettel Post", sector: "Logistics công nghệ", basePrice: 92000, currentPrice: 92000, previousPrice: 92000, volatility: "low", description: "Hạ tầng kho vận thông minh và chia chọn tự động.", dividendYield: 1.5 },
  { ticker: "ELC", name: "Elcom", sector: "Thiết bị mạng & viễn thông", basePrice: 42000, currentPrice: 42000, previousPrice: 42000, volatility: "high", description: "Thiết bị hạ tầng viễn thông và giao thông thông minh.", dividendYield: 0.0 },
  { ticker: "ITD", name: "Công nghệ Tiên Phong", sector: "Thiết bị mạng & viễn thông", basePrice: 45000, currentPrice: 45000, previousPrice: 45000, volatility: "high", description: "Giải pháp điều khiển giao thông và tự động hoá.", dividendYield: 0.0 },
  { ticker: "NVDA", name: "NVIDIA", sector: "Bán dẫn & chip", basePrice: 65000, currentPrice: 65000, previousPrice: 65000, volatility: "high", description: "Chip đồ hoạ và bộ tăng tốc cho huấn luyện mô hình AI.", dividendYield: 1.2 },
  { ticker: "AMD", name: "AMD", sector: "Bán dẫn & chip", basePrice: 75000, currentPrice: 75000, previousPrice: 75000, volatility: "high", description: "Bộ xử lý máy chủ và chip đồ hoạ cạnh tranh trực tiếp.", dividendYield: 1.0 },
  { ticker: "TSM", name: "TSMC", sector: "Bán dẫn & chip", basePrice: 32000, currentPrice: 32000, previousPrice: 32000, volatility: "medium", description: "Xưởng đúc chip lớn nhất thế giới, tiến trình dưới 5nm.", dividendYield: 3.0 },
  { ticker: "MSFT", name: "Microsoft", sector: "Điện toán đám mây", basePrice: 185000, currentPrice: 185000, previousPrice: 185000, volatility: "low", description: "Azure, bộ Office và nền tảng phát triển cho doanh nghiệp.", dividendYield: 2.8 },
  { ticker: "AMZN", name: "Amazon", sector: "Điện toán đám mây", basePrice: 98000, currentPrice: 98000, previousPrice: 98000, volatility: "medium", description: "AWS dẫn đầu hạ tầng đám mây và thương mại điện tử toàn cầu.", dividendYield: 0.0 },
  { ticker: "GOOG", name: "Alphabet", sector: "Điện toán đám mây", basePrice: 124000, currentPrice: 124000, previousPrice: 124000, volatility: "medium", description: "Google Cloud, tìm kiếm và hệ điều hành Android.", dividendYield: 2.0 },
  { ticker: "SHOP", name: "Shopify", sector: "Thương mại điện tử", basePrice: 25000, currentPrice: 25000, previousPrice: 25000, volatility: "high", description: "Nền tảng dựng cửa hàng trực tuyến cho người bán nhỏ.", dividendYield: 3.2 },
  { ticker: "SE", name: "Sea Group", sector: "Thương mại điện tử", basePrice: 35000, currentPrice: 35000, previousPrice: 35000, volatility: "high", description: "Shopee, Garena và ví điện tử tại Đông Nam Á.", dividendYield: 2.2 },
  { ticker: "MELI", name: "MercadoLibre", sector: "Thương mại điện tử", basePrice: 48000, currentPrice: 48000, previousPrice: 48000, volatility: "medium", description: "Sàn thương mại và thanh toán số lớn nhất Mỹ Latinh.", dividendYield: 1.8 },
  { ticker: "SNOW", name: "Snowflake", sector: "Dữ liệu & phân tích", basePrice: 19500, currentPrice: 19500, previousPrice: 19500, volatility: "high", description: "Kho dữ liệu đám mây tách rời tính toán và lưu trữ.", dividendYield: 2.5 },
  { ticker: "DDOG", name: "Datadog", sector: "Giám sát & vận hành", basePrice: 26000, currentPrice: 26000, previousPrice: 26000, volatility: "medium", description: "Nền tảng giám sát, log và truy vết cho hệ thống phân tán.", dividendYield: 4.0 },
  { ticker: "MDB", name: "MongoDB", sector: "Cơ sở dữ liệu", basePrice: 115000, currentPrice: 115000, previousPrice: 115000, volatility: "high", description: "Cơ sở dữ liệu tài liệu và dịch vụ Atlas trên đám mây.", dividendYield: 3.0 },
  { ticker: "ORCL", name: "Oracle", sector: "Cơ sở dữ liệu", basePrice: 66000, currentPrice: 66000, previousPrice: 66000, volatility: "low", description: "Cơ sở dữ liệu doanh nghiệp và hạ tầng đám mây OCI.", dividendYield: 4.5 },
  { ticker: "CRWD", name: "CrowdStrike", sector: "An toàn thông tin", basePrice: 78000, currentPrice: 78000, previousPrice: 78000, volatility: "high", description: "Bảo vệ điểm cuối và phát hiện xâm nhập theo thời gian thực.", dividendYield: 4.8 },
  { ticker: "PANW", name: "Palo Alto Networks", sector: "An toàn thông tin", basePrice: 38000, currentPrice: 38000, previousPrice: 38000, volatility: "medium", description: "Tường lửa thế hệ mới và bảo mật hạ tầng đám mây.", dividendYield: 3.5 },
  { ticker: "NET", name: "Cloudflare", sector: "Mạng phân phối & CDN", basePrice: 58000, currentPrice: 58000, previousPrice: 58000, volatility: "high", description: "CDN, chống tấn công từ chối dịch vụ và hàm chạy ở biên.", dividendYield: 0.0 },
  { ticker: "AKAM", name: "Akamai", sector: "Mạng phân phối & CDN", basePrice: 24500, currentPrice: 24500, previousPrice: 24500, volatility: "low", description: "Mạng phân phối nội dung lâu đời và điện toán biên.", dividendYield: 5.0 },
  { ticker: "VMW", name: "Broadcom VMware", sector: "Ảo hoá & hạ tầng", basePrice: 36000, currentPrice: 36000, previousPrice: 36000, volatility: "medium", description: "Ảo hoá máy chủ và nền tảng hạ tầng cho doanh nghiệp.", dividendYield: 1.5 },
  { ticker: "RHT", name: "Red Hat", sector: "Mã nguồn mở doanh nghiệp", basePrice: 72000, currentPrice: 72000, previousPrice: 72000, volatility: "low", description: "Linux doanh nghiệp, Kubernetes và hỗ trợ dài hạn.", dividendYield: 2.0 },
  { ticker: "GTLB", name: "GitLab", sector: "Công cụ lập trình", basePrice: 27000, currentPrice: 27000, previousPrice: 27000, volatility: "high", description: "Quản lý mã nguồn, CI/CD và bảo mật trong một nền tảng.", dividendYield: 3.0 },
  { ticker: "TEAM", name: "Atlassian", sector: "Công cụ lập trình", basePrice: 21000, currentPrice: 21000, previousPrice: 21000, volatility: "medium", description: "Jira, Confluence và bộ công cụ cộng tác cho đội kỹ thuật.", dividendYield: 4.2 },
  { ticker: "TWLO", name: "Twilio", sector: "Nền tảng API", basePrice: 30000, currentPrice: 30000, previousPrice: 30000, volatility: "high", description: "API gửi tin nhắn, thoại và xác thực cho ứng dụng.", dividendYield: 2.0 },
  { ticker: "STRP", name: "Stripe Payments", sector: "Nền tảng API", basePrice: 11500, currentPrice: 11500, previousPrice: 11500, volatility: "high", description: "Hạ tầng API thanh toán cho nền tảng trực tuyến.", dividendYield: 3.0 },
  { ticker: "OPAI", name: "OpenAI Platform", sector: "Trí tuệ nhân tạo", basePrice: 85000, currentPrice: 85000, previousPrice: 85000, volatility: "high", description: "API mô hình ngôn ngữ và công cụ dựng ứng dụng AI.", dividendYield: 0.0 },
];

export interface MarketNewsEvent {
  headline: string;
  affectedSectors: string[];
  impactMultiplier: number; // e.g. +0.03 (+3%) or -0.025 (-2.5%)
  explanation: string;
}

export const MARKET_NEWS_POOL: MarketNewsEvent[] = [
  {
    headline: "📢 Nhu cầu chip tăng vọt vì làn sóng huấn luyện mô hình AI",
    affectedSectors: ["Bán dẫn & chip", "Trí tuệ nhân tạo"],
    impactMultiplier: 0.05,
    explanation: "Đơn hàng bộ tăng tốc kín tới hai năm, kéo biên lợi nhuận của cả xưởng đúc lẫn hãng thiết kế chip đi lên.",
  },
  {
    headline: "📊 Chi tiêu hạ tầng đám mây của doanh nghiệp tăng 18% so với cùng kỳ",
    affectedSectors: ["Điện toán đám mây", "Cơ sở dữ liệu", "Dữ liệu & phân tích"],
    impactMultiplier: 0.035,
    explanation: "Ngân sách chuyển từ máy chủ tự quản sang dịch vụ thuê, làm tăng doanh thu định kỳ của nhóm hạ tầng.",
  },
  {
    headline: "🛡️ Lộ dữ liệu diện rộng khiến ngân sách an toàn thông tin được duyệt gấp",
    affectedSectors: ["An toàn thông tin"],
    impactMultiplier: 0.045,
    explanation: "Sau một sự cố lớn, chi cho bảo mật là khoản hiếm hoi được duyệt nhanh vì rủi ro đã thành con số cụ thể.",
  },
  {
    headline: "🌐 Sự cố mạng lõi làm gián đoạn nhiều dịch vụ trong bốn giờ",
    affectedSectors: ["Mạng phân phối & CDN", "Điện toán đám mây"],
    impactMultiplier: -0.03,
    explanation: "Gián đoạn diện rộng khiến khách hàng lớn yêu cầu phương án đa nhà cung cấp, làm chậm tốc độ ký hợp đồng mới.",
  },
  {
    headline: "🛒 Doanh số thương mại điện tử mùa cao điểm vượt dự báo 12%",
    affectedSectors: ["Thương mại điện tử", "Logistics công nghệ", "Nền tảng API"],
    impactMultiplier: 0.028,
    explanation: "Lượng đơn tăng kéo theo cả khối lượng giao vận và số lượt gọi API thanh toán.",
  },
  {
    headline: "⚠️ Lãi suất neo cao, các công ty công nghệ chưa có lãi bị định giá lại",
    affectedSectors: ["Nền tảng số & giải trí", "Công cụ lập trình", "Nền tảng API"],
    impactMultiplier: -0.025,
    explanation: "Dòng tiền xa trong tương lai bị chiết khấu mạnh hơn, nên nhóm tăng trưởng chưa có lãi chịu áp lực trước tiên.",
  },
];
