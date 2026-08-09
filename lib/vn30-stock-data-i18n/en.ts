import type { Vn30Translation } from "./index";

/**
 * Bản tiếng Anh của danh sách VN30 và bể tin thị trường.
 *
 * Tên doanh nghiệp dùng TÊN TIẾNG ANH CHÍNH THỨC của chính doanh nghiệp đó, không
 * dịch từng chữ: "Tập đoàn Hòa Phát" là "Hoa Phat Group", không phải "Peaceful
 * Development Group". Doanh nghiệp nào vốn đã mang tên quốc tế (Vinamilk,
 * Techcombank, Sabeco) thì giữ nguyên - dịch chúng là đặt cho doanh nghiệp một
 * cái tên không tồn tại.
 *
 * `sectors` phải phủ ĐỦ 18 ngành. Thiếu một ngành thì cả cổ phiếu và tin thị
 * trường của ngành đó giữ tiếng Việt - không vỡ phép ghép, nhưng người đọc tiếng
 * Anh thấy một ô tiếng Việt giữa bảng. Bộ kiểm đi kèm bắt buộc đủ 18.
 */
export const vn30En: Vn30Translation = {
  sectors: {
    "Công nghệ & AI": "Technology & AI",
    "Hàng tiêu dùng": "Consumer staples",
    "Thép & Công nghiệp": "Steel & industrials",
    "Ngân hàng": "Banking",
    "Bất động sản": "Real estate",
    "Tập đoàn đa ngành": "Diversified conglomerate",
    "Bán lẻ": "Retail",
    "Tiêu dùng & Thực phẩm": "Consumer & food",
    "Dịch vụ tài chính": "Financial services",
    "Bán lẻ trang sức": "Jewellery retail",
    "Hóa chất": "Chemicals",
    "Năng lượng & Hạ tầng": "Energy & infrastructure",
    "Dầu khí": "Oil & gas",
    "Phân phối xăng dầu": "Fuel distribution",
    "Bia & Đồ uống": "Beer & beverages",
    "Bất động sản bán lẻ": "Retail real estate",
    "BĐS Khu công nghiệp": "Industrial park real estate",
    "Logistics & Vận tải": "Logistics & transport",
  },

  stocks: {
    FPT: {
      name: "FPT Corporation",
      description:
        "The leading IT company in Vietnam: software exports and AI training.",
    },
    VNM: {
      name: "Vinamilk",
      description: "Vietnam's largest dairy company, with plentiful cash dividend flow.",
    },
    HPG: {
      name: "Hoa Phat Group",
      description: "Vietnam's steel king, built around the Dung Quat 2 BOF complex.",
    },
    VCB: {
      name: "Vietcombank",
      description: "The commercial bank with the largest market capitalisation.",
    },
    VHM: {
      name: "Vinhomes",
      description: "Vietnam's largest developer of master-planned urban property.",
    },
    VIC: {
      name: "Vingroup",
      description:
        "The leading diversified conglomerate, owner of VinFast electric vehicles and Vinpearl.",
    },
    MWG: {
      name: "Mobile World Group",
      description:
        "The phone and electronics retail chains Thế Giới Di Động and Bách Hóa Xanh.",
    },
    MSN: {
      name: "Masan Group",
      description: "The consumer goods ecosystem behind WinMart, Masan Consumer and Chinsu.",
    },
    SSI: {
      name: "SSI Securities",
      description: "The brokerage with the largest market share in Vietnam.",
    },
    VND: {
      name: "VNDIRECT Securities",
      description: "An aggressive retail brokerage platform.",
    },
    PNJ: {
      name: "PNJ Jewellery",
      description: "A trusted brand in crafting and retailing gold and jewellery.",
    },
    TCB: {
      name: "Techcombank",
      description:
        "The leading private bank on CASA efficiency and digital banking.",
    },
    MBB: {
      name: "MBBank",
      description: "The Military Bank, growing its digital user base quickly.",
    },
    CTG: { name: "VietinBank", description: "A large state-owned joint stock commercial bank." },
    BID: {
      name: "BIDV",
      description: "A commercial bank with total assets among Vietnam's largest.",
    },
    VPB: {
      name: "VPBank",
      description: "A bank with unusually large equity after selling a stake to SMBC.",
    },
    ACB: {
      name: "ACB Bank",
      description:
        "A leader in credit risk management, paying cash dividends consistently.",
    },
    DGC: {
      name: "Duc Giang Chemicals",
      description: "Southeast Asia's largest producer of yellow phosphorus.",
    },
    REE: {
      name: "REE Corporation",
      description:
        "A defensive infrastructure group in power, water and renewable energy.",
    },
    GAS: {
      name: "PV GAS",
      description:
        "Vietnam's gas corporation, the monopoly distributor of natural gas and LNG.",
    },
    PLX: {
      name: "Petrolimex",
      description: "The fuel group holding 50% of the national retail market.",
    },
    SAB: {
      name: "Sabeco",
      description: "The Bia Sài Gòn brand, at the front of the beverage industry.",
    },
    VRE: {
      name: "Vincom Retail",
      description: "Owns and operates the nationwide Vincom shopping centre chain.",
    },
    KDH: {
      name: "Khang Dien House",
      description:
        "A residential property developer known for clean legal paperwork in Ho Chi Minh City.",
    },
    BCM: {
      name: "Becamex IDC",
      description: "Developer of the nationwide VSIP industrial park chain.",
    },
    HDB: {
      name: "HDBank",
      description: "A commercial bank sustaining high growth year after year.",
    },
    VIB: {
      name: "VIB Bank",
      description: "The leader in car loans and personal credit cards.",
    },
    LPB: {
      name: "LPBank",
      description: "Lộc Phát Bank, with an unusually wide branch network.",
    },
    SHB: {
      name: "SHB Bank",
      description: "A commercial bank whose total assets rank among the largest.",
    },
    VTP: {
      name: "Viettel Post",
      description:
        "Viettel's postal arm, building smart warehousing and logistics infrastructure.",
    },
  },

  news: [
    {
      headline: "📢 The State Bank cuts its policy rate by 0.5%",
      explanation:
        "Lower rates cut the cost of capital for companies and push money towards equities and property.",
    },
    {
      headline: "📊 Global HRC steel prices rebound sharply, up 6%",
      explanation:
        "Higher steel prices widen gross margins for large steel producers such as Hoa Phat.",
    },
    {
      headline: "🏬 Consumer retail sales grow 12% year on year",
      explanation:
        "Recovering purchasing power drives growth at MWG, MSN, PNJ and VNM.",
    },
    {
      headline: "🌐 FPT signs a USD 100 million AI software export contract in the US",
      explanation:
        "International technology deals lift the valuation of the IT segment.",
    },
    {
      headline: "⛽ Brent crude jumps past USD 85 a barrel",
      explanation:
        "Oil, gas and fuel names benefit directly when world crude prices climb.",
    },
    {
      headline: "⚠️ The US Federal Reserve delays rate cuts on inflation",
      explanation:
        "Pressure on the exchange rate causes foreign capital to pull out of emerging markets for a time.",
    },
  ],
};
