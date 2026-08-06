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

import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

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

/** Phần CẤU TRÚC của bốn cú tác động: id và phép biến đổi số. Không có chữ
 *  hiển thị nào ở đây - chữ đến từ `t.districtContent.threeStatement.impacts`,
 *  xem lib/i18n/dictionaries/sections/district-content.ts. Tách riêng vì
 *  `driversAfter` và các bài test chỉ cần id/apply, không cần bản dịch nào. */
const IMPACT_DEFS: { id: string; apply: (d: Drivers) => Drivers }[] = [
  { id: "depreciation", apply: (d) => ({ ...d, depreciation: d.depreciation + 100 }) },
  {
    id: "revenue-credit",
    apply: (d) => ({ ...d, revenue: d.revenue + 200, receivables: d.receivables + 200 }),
  },
  { id: "buy-ppe", apply: (d) => ({ ...d, capex: d.capex - 300 }) },
  {
    id: "take-debt",
    apply: (d) => ({ ...d, debt: d.debt + 400, netBorrowing: d.netBorrowing + 400 }),
  },
];

/** Chỉ id, dùng khi không cần chữ hiển thị (driversAfter, test lặp theo id). */
export const IMPACT_IDS: string[] = IMPACT_DEFS.map((d) => d.id);

/** Bốn cú tác động kinh điển, mỗi cú lộ ra một mối nối khác nhau - kèm chữ
 *  hiển thị theo ngôn ngữ hiện tại của `t`. */
export function impactsOf(t: Dictionary): Impact[] {
  const copy = t.districtContent.threeStatement.impacts;
  return IMPACT_DEFS.map((def) => ({
    id: def.id,
    apply: def.apply,
    label: copy[def.id as keyof typeof copy].label,
    question: copy[def.id as keyof typeof copy].question,
    explain: {
      income: copy[def.id as keyof typeof copy].income,
      balance: copy[def.id as keyof typeof copy].balance,
      cashflow: copy[def.id as keyof typeof copy].cashflow,
      punchline: copy[def.id as keyof typeof copy].punchline,
    },
  }));
}

export function driversAfter(impactId: string | null, base: Drivers = BASE_DRIVERS): Drivers {
  if (!impactId) return base;
  const def = IMPACT_DEFS.find((i) => i.id === impactId);
  return def ? def.apply(base) : base;
}
