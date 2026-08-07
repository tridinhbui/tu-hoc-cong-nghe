// Display labels that live inside lib/*.ts data modules rather than in a
// .tsx file - invisible to scripts/i18n-coverage.mjs, which only scores
// display positions in .tsx. Everything here sits under one top-level
// `libData` key, grouped by the module it labels:
//
//   lib/document-categories.ts        -> libData.documentCategories
//   lib/finance-cards.ts              -> libData.financeCards
//   lib/highlight-stage-grouping.ts   -> libData.highlightStages
//
// Keys are the modules' own stable ids (a document category's `value`, a
// finance card's `id`) so the dictionary lookup and the underlying data never
// drift apart by position.

export const libDataVi = {
  libData: {
    documentCategories: {
      "mau-bieu": "Mẫu biểu",
      ebook: "Ebook / Tài liệu đọc",
      checklist: "Checklist",
      "cong-cu": "Công cụ (Excel/Sheet)",
      khac: "Khác",
    },
    financeCards: {
      "card-fpt": {
        name: "Tập đoàn FPT",
        sector: "Công nghệ",
        description: "Doanh nghiệp công nghệ, viễn thông và giáo dục tiêu biểu của Việt Nam.",
        advantage: "Năng lực xuất khẩu phần mềm, hệ sinh thái giáo dục và nhu cầu chuyển đổi số dài hạn.",
        metrics: ["Doanh thu ký mới", "Biên lợi nhuận", "P/E forward"],
      },
      "card-vnm": {
        name: "Vinamilk",
        sector: "Sữa / FMCG",
        description: "Cổ phiếu tiêu dùng phòng thủ với thương hiệu và phân phối mạnh.",
        advantage: "Thương hiệu quốc gia, độ phủ bán lẻ rộng và dòng tiền vận hành ổn định.",
        metrics: ["Biên gộp", "ROE", "Dòng tiền tự do"],
      },
      "card-vcb": {
        name: "Vietcombank",
        sector: "Ngân hàng",
        description: "Ngân hàng đầu ngành với chất lượng tài sản và chi phí vốn nổi bật.",
        advantage: "CASA cao, kiểm soát nợ xấu tốt và vị thế dẫn dắt hệ thống.",
        metrics: ["NIM", "CASA", "Bao phủ nợ xấu"],
      },
      "card-hpg": {
        name: "Tập đoàn Hòa Phát",
        sector: "Thép",
        description: "Doanh nghiệp thép tích hợp quy mô lớn, nhạy với chu kỳ đầu tư.",
        advantage: "Lợi thế quy mô, chuỗi sản xuất khép kín và vị thế dẫn đầu thép xây dựng.",
        metrics: ["Sản lượng thép", "Biên EBITDA", "Chu kỳ hàng tồn kho"],
      },
      "card-mwg": {
        name: "Thế Giới Di Động",
        sector: "Bán lẻ",
        description: "Nhà bán lẻ hiện đại với năng lực vận hành chuỗi cửa hàng lớn.",
        advantage: "Quản trị vận hành, dữ liệu khách hàng và khả năng mở rộng chuỗi.",
        metrics: ["Doanh thu/cửa hàng", "Vòng quay tồn kho", "Biên EBIT"],
      },
      "card-msn": {
        name: "Tập đoàn Masan",
        sector: "Tiêu dùng",
        description: "Hệ sinh thái tiêu dùng, bán lẻ và hàng thiết yếu quy mô lớn.",
        advantage: "Danh mục thương hiệu mạnh và chiến lược tích hợp bán lẻ - tiêu dùng.",
        metrics: ["Tăng trưởng same-store", "Đòn bẩy", "Biên EBITDA"],
      },
      "card-vhm": {
        name: "Vinhomes",
        sector: "Bất động sản",
        description: "Nhà phát triển khu đô thị quy mô lớn, nhạy với lãi suất và pháp lý.",
        advantage: "Quỹ đất lớn, thương hiệu mạnh và năng lực triển khai đại dự án.",
        metrics: ["Backlog", "Dòng tiền bán hàng", "Nợ vay ròng"],
      },
      "card-ssi": {
        name: "Chứng khoán SSI",
        sector: "Chứng khoán",
        description: "Công ty chứng khoán đầu ngành, hưởng lợi khi thanh khoản thị trường tăng.",
        advantage: "Thị phần môi giới, ngân hàng đầu tư và năng lực quản trị rủi ro margin.",
        metrics: ["Thanh khoản thị trường", "Dư nợ margin", "Thị phần môi giới"],
      },
      "card-gas": {
        name: "PV Gas",
        sector: "Năng lượng",
        description: "Doanh nghiệp hạ tầng khí có vai trò quan trọng trong chuỗi năng lượng.",
        advantage: "Hạ tầng độc quyền tự nhiên và hợp đồng dài hạn với khách hàng lớn.",
        metrics: ["Sản lượng khí", "Giá dầu", "Biên lợi nhuận"],
      },
      "card-vic": {
        name: "Tập đoàn Vingroup",
        sector: "Tập đoàn đa ngành",
        description: "Tập đoàn đa ngành với hệ sinh thái bất động sản, công nghiệp và dịch vụ.",
        advantage: "Khả năng huy động vốn, thương hiệu lớn và hệ sinh thái nhiều mảng.",
        metrics: ["Dòng tiền hợp nhất", "Đòn bẩy", "CAPEX"],
      },
    },
    highlightStages: {
      other: {
        label: "Khác",
        name: "Bài case, bài bổ sung và nội dung ngoài lộ trình",
      },
    },
  },
};

export const libDataEn: typeof libDataVi = {
  libData: {
    documentCategories: {
      "mau-bieu": "Templates",
      ebook: "Ebook / Reading material",
      checklist: "Checklist",
      "cong-cu": "Tool (Excel/Sheet)",
      khac: "Other",
    },
    financeCards: {
      "card-fpt": {
        name: "FPT Corporation",
        sector: "Technology",
        description: "Vietnam's leading technology, telecom, and education conglomerate.",
        advantage: "Software export capability, an education ecosystem, and long-term digital transformation demand.",
        metrics: ["New contract revenue", "Profit margin", "Forward P/E"],
      },
      "card-vnm": {
        name: "Vinamilk",
        sector: "Dairy / FMCG",
        description: "A defensive consumer stock with a strong brand and distribution network.",
        advantage: "A national brand, wide retail coverage, and stable operating cash flow.",
        metrics: ["Gross margin", "ROE", "Free cash flow"],
      },
      "card-vcb": {
        name: "Vietcombank",
        sector: "Banking",
        description: "The leading bank in its sector, with standout asset quality and cost of capital.",
        advantage: "High CASA, strong bad-debt control, and a system-leading position.",
        metrics: ["NIM", "CASA", "Bad debt coverage"],
      },
      "card-hpg": {
        name: "Hoa Phat Group",
        sector: "Steel",
        description: "A large integrated steel company, sensitive to the investment cycle.",
        advantage: "Scale advantage, a closed production chain, and a leading position in construction steel.",
        metrics: ["Steel output", "EBITDA margin", "Inventory cycle"],
      },
      "card-mwg": {
        name: "Mobile World (MWG)",
        sector: "Retail",
        description: "A modern retailer with the operating capability to run a large store chain.",
        advantage: "Operational management, customer data, and the ability to scale the chain.",
        metrics: ["Revenue per store", "Inventory turnover", "EBIT margin"],
      },
      "card-msn": {
        name: "Masan Group",
        sector: "Consumer",
        description: "A large-scale consumer, retail, and essential-goods ecosystem.",
        advantage: "A strong brand portfolio and an integrated retail-consumer strategy.",
        metrics: ["Same-store growth", "Leverage", "EBITDA margin"],
      },
      "card-vhm": {
        name: "Vinhomes",
        sector: "Real estate",
        description: "A large-scale urban developer, sensitive to interest rates and legal approvals.",
        advantage: "A large land bank, a strong brand, and the capability to execute mega-projects.",
        metrics: ["Backlog", "Sales cash flow", "Net debt"],
      },
      "card-ssi": {
        name: "SSI Securities",
        sector: "Securities",
        description: "The leading securities firm, benefiting when market liquidity rises.",
        advantage: "Brokerage market share, investment banking, and margin risk management capability.",
        metrics: ["Market liquidity", "Margin debt", "Brokerage market share"],
      },
      "card-gas": {
        name: "PV Gas",
        sector: "Energy",
        description: "A gas infrastructure company with a key role in the energy chain.",
        advantage: "Natural monopoly infrastructure and long-term contracts with large customers.",
        metrics: ["Gas output", "Oil price", "Profit margin"],
      },
      "card-vic": {
        name: "Vingroup",
        sector: "Multi-sector conglomerate",
        description: "A multi-sector conglomerate spanning real estate, industry, and services.",
        advantage: "Capital-raising capability, a strong brand, and a multi-segment ecosystem.",
        metrics: ["Consolidated cash flow", "Leverage", "CAPEX"],
      },
    },
    highlightStages: {
      other: {
        label: "Other",
        name: "Case studies, supplementary lessons, and content outside the track",
      },
    },
  },
};
