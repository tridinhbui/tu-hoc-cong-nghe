/** Ba báo cáo tài chính nối với nhau, ở dạng số thuần.
 *
 *  Đây là chủ đề bị hiểu sai nhiều nhất trong tài chính, và lý do gần như luôn
 *  là cùng một chỗ: người học nhìn ba bảng như ba thứ rời nhau. Sự thật là một
 *  bút toán chạm vào cả ba, và đó chính là thứ một trang giấy khó nói mà một
 *  căn phòng ba bức tường nói được.
 *
 *  File này KHÔNG vẽ gì cả, và đó là chủ ý: đây là chỗ duy nhất trong cả tính
 *  năng có thể SAI VỀ KẾ TOÁN, nên nó phải kiểm được bằng test mà không cần
 *  dựng cảnh 3D nào.
 *
 *  TIỀN MẶT VÀ VỐN CHỦ LÀ SỐ SUY RA, không phải số nhập vào. Bản đầu tiên của
 *  file này cho phép cú tác động sửa thẳng `cash` và `equity`, và bảng cân đối
 *  lệch ngay ở kịch bản đầu tiên - vì lợi nhuận không được chảy vào vốn chủ.
 *  Ở đây vốn chủ = vốn chủ đầu kỳ + LNST, và tiền = tiền đầu kỳ + CFO + CFI +
 *  CFF. Cân bằng không còn là thứ phải nhớ giữ, nó đúng theo cấu trúc. */

/** Những dòng người ta thực sự "nhập": doanh thu, chi phí, và các khoản trên
 *  bảng cân đối không phải tiền/vốn chủ. */
export interface Drivers {
  revenue: number;
  cogs: number;
  depreciation: number;
  interest: number;
  taxRate: number;
  receivables: number;
  inventory: number;
  payables: number;
  debt: number;
  /** Chi đầu tư trong kỳ (âm là chi tiền mua tài sản). */
  capex: number;
  /** Tiền vay thêm trong kỳ (dương là nhận tiền về). */
  netBorrowing: number;
}

/** Số dư đầu kỳ - thứ không đổi khi thử các kịch bản. */
export interface Opening {
  cash: number;
  equity: number;
  receivables: number;
  inventory: number;
  payables: number;
  ppe: number;
}

export interface Statements {
  incomeStatement: {
    revenue: number;
    cogs: number;
    grossProfit: number;
    depreciation: number;
    ebit: number;
    interest: number;
    ebt: number;
    tax: number;
    netIncome: number;
  };
  cashFlow: {
    netIncome: number;
    depreciation: number;
    workingCapitalChange: number;
    cfo: number;
    cfi: number;
    cff: number;
    netChange: number;
  };
  balanceSheet: {
    cash: number;
    receivables: number;
    inventory: number;
    ppe: number;
    totalAssets: number;
    payables: number;
    debt: number;
    equity: number;
    totalLiabilitiesEquity: number;
  };
  /** Chênh lệch hai vế bảng cân đối. Phải luôn bằng 0 - để lộ ra ngoài chứ
   *  không giấu, vì đó là thứ căn phòng dùng để chứng minh với người học rằng
   *  nó không nói dối. */
  balanceCheck: number;
}

export const OPENING: Opening = {
  cash: 300,
  equity: 830,
  receivables: 200,
  inventory: 150,
  payables: 120,
  ppe: 800,
};

/** Doanh nghiệp xuất phát: số tròn để người học nhẩm theo được. */
export const BASE_DRIVERS: Drivers = {
  revenue: 1000,
  cogs: 600,
  depreciation: 100,
  interest: 50,
  taxRate: 0.2,
  receivables: 200,
  inventory: 150,
  payables: 120,
  debt: 500,
  capex: 0,
  netBorrowing: 0,
};

/** Dựng cả ba báo cáo từ các dòng đầu vào.
 *
 *  Lưu chuyển tiền tệ là bản gián tiếp rút gọn: LNST + khấu hao (không chi
 *  tiền) − tăng vốn lưu động. Cố ý không mô phỏng thuế hoãn lại hay lãi vốn
 *  hoá: thêm vào thì bảng đúng hơn nhưng bài học biến mất dưới một đống dòng
 *  mà người mới không đọc nổi. */
export function buildStatements(d: Drivers, opening: Opening = OPENING): Statements {
  const grossProfit = d.revenue - d.cogs;
  const ebit = grossProfit - d.depreciation;
  const ebt = ebit - d.interest;
  const tax = Math.max(0, ebt) * d.taxRate;
  const netIncome = ebt - tax;

  // Vốn lưu động tăng thì tiền giảm: phải thu và tồn kho là tiền chưa về, phải
  // trả là tiền chưa đi.
  const workingCapitalChange =
    -(d.receivables - opening.receivables) -
    (d.inventory - opening.inventory) +
    (d.payables - opening.payables);

  const cfo = netIncome + d.depreciation + workingCapitalChange;
  const cfi = d.capex;
  const cff = d.netBorrowing;
  const netChange = cfo + cfi + cff;

  const cash = opening.cash + netChange;
  const equity = opening.equity + netIncome;
  // Tài sản cố định cuối kỳ là số SUY RA, không phải số nhập: đầu kỳ trừ khấu
  // hao cộng chi đầu tư. Bản trước để nó là số nhập, nên khấu hao ăn vào lợi
  // nhuận mà tài sản không giảm - bảng cân đối lệch đúng bằng số khấu hao, ngay
  // ở trạng thái gốc.
  const ppe = opening.ppe - d.depreciation - d.capex;

  const totalAssets = cash + d.receivables + d.inventory + ppe;
  const totalLiabilitiesEquity = d.payables + d.debt + equity;

  return {
    incomeStatement: {
      revenue: d.revenue,
      cogs: d.cogs,
      grossProfit,
      depreciation: d.depreciation,
      ebit,
      interest: d.interest,
      ebt,
      tax,
      netIncome,
    },
    cashFlow: {
      netIncome,
      depreciation: d.depreciation,
      workingCapitalChange,
      cfo,
      cfi,
      cff,
      netChange,
    },
    balanceSheet: {
      cash,
      receivables: d.receivables,
      inventory: d.inventory,
      ppe,
      totalAssets,
      payables: d.payables,
      debt: d.debt,
      equity,
      totalLiabilitiesEquity,
    },
    balanceCheck: Number((totalAssets - totalLiabilitiesEquity).toFixed(6)),
  };
}

export interface Impact {
  id: string;
  label: string;
  /** Câu hỏi cú tác động này trả lời - hỏi TRƯỚC khi cho xem kết quả. */
  question: string;
  apply: (d: Drivers) => Drivers;
  explain: {
    income: string;
    balance: string;
    cashflow: string;
    /** Câu chốt: thứ người học phải mang về. */
    punchline: string;
  };
}

/** Bốn cú tác động kinh điển, mỗi cú lộ ra một mối nối khác nhau. */
export const IMPACTS: Impact[] = [
  {
    id: "depreciation",
    label: "Khấu hao tăng 100",
    question: "Khấu hao là chi phí. Vậy tiền mặt tăng hay giảm?",
    apply: (d) => ({ ...d, depreciation: d.depreciation + 100 }),
    explain: {
      income: "Khấu hao +100 → EBIT −100 → lợi nhuận sau thuế −80 (thuế 20% gánh đỡ 20).",
      balance: "Tài sản cố định −100, vốn chủ −80 theo lợi nhuận, và tiền mặt +20.",
      cashflow: "CFO = LNST (−80) + khấu hao cộng lại (+100) = +20. Khấu hao không chi tiền.",
      punchline:
        "Tiền mặt TĂNG 20 chứ không giảm: khấu hao chỉ làm giảm thuế phải nộp, còn bản thân nó không ra khỏi két.",
    },
  },
  {
    id: "revenue-credit",
    label: "Bán chịu thêm 200",
    question: "Doanh thu +200 nhưng khách chưa trả tiền. Tiền mặt đi đâu?",
    apply: (d) => ({ ...d, revenue: d.revenue + 200, receivables: d.receivables + 200 }),
    explain: {
      income: "Doanh thu +200 → LNST +160. Kết quả kinh doanh trông rất đẹp.",
      balance: "Phải thu +200, vốn chủ +160.",
      cashflow: "CFO = LNST (+160) − tăng phải thu (−200) = −40. Tiền GIẢM.",
      punchline: "Lãi tăng mà tiền giảm. Đây là cách một doanh nghiệp đang có lãi vẫn chết vì hết tiền.",
    },
  },
  {
    id: "buy-ppe",
    label: "Mua máy 300 bằng tiền",
    question: "Chi 300 mua tài sản. Lợi nhuận năm nay giảm bao nhiêu?",
    apply: (d) => ({ ...d, capex: d.capex - 300 }),
    explain: {
      income: "Không đổi một đồng. Mua tài sản không phải chi phí - nó đổi hình dạng của tài sản.",
      balance: "Tài sản cố định +300, tiền mặt −300. Tổng tài sản không đổi.",
      cashflow: "CFI = −300. Tiền ra khỏi két đủ 300 ngay hôm nay.",
      punchline:
        "Lợi nhuận không giảm đồng nào, nhưng tiền mất 300. Chi phí sẽ đến dần qua khấu hao các năm sau.",
    },
  },
  {
    id: "take-debt",
    label: "Vay thêm 400",
    question: "Vay 400 về két. Phần thuộc về chủ sở hữu tăng bao nhiêu?",
    apply: (d) => ({ ...d, debt: d.debt + 400, netBorrowing: d.netBorrowing + 400 }),
    explain: {
      income: "Không đổi lúc vay. Lãi vay mới sẽ ăn vào lợi nhuận các kỳ sau.",
      balance: "Tiền mặt +400, nợ vay +400. Vốn chủ không đổi một đồng.",
      cashflow: "CFF = +400. Không có dòng nào của CFO hay CFI nhúc nhích - tiền này là tiền đi vay.",
      punchline: "Tiền trong két tăng 400 nhưng phần của chủ sở hữu không đổi - vay không làm ai giàu lên.",
    },
  },
];

export function driversAfter(impactId: string | null, base: Drivers = BASE_DRIVERS): Drivers {
  if (!impactId) return base;
  const impact = IMPACTS.find((i) => i.id === impactId);
  return impact ? impact.apply(base) : base;
}
