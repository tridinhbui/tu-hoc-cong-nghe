export interface WACCInput {
  equityValue: number; // E (billion VND)
  debtValue: number; // D (billion VND)
  costOfEquity: number; // Ke (%)
  costOfDebt: number; // Kd (%)
  taxRate: number; // t (%)
}

export function calculateWACC(input: WACCInput): {
  wacc: number; // %
  equityWeight: number; // %
  debtWeight: number; // %
  afterTaxCostOfDebt: number; // %
} {
  const totalV = input.equityValue + input.debtValue;
  if (totalV <= 0) {
    return { wacc: 0, equityWeight: 0, debtWeight: 0, afterTaxCostOfDebt: 0 };
  }

  const eWeight = input.equityValue / totalV;
  const dWeight = input.debtValue / totalV;
  const afterTaxKd = (input.costOfDebt / 100) * (1 - input.taxRate / 100);
  const keFraction = input.costOfEquity / 100;

  const waccFraction = eWeight * keFraction + dWeight * afterTaxKd;

  return {
    wacc: Math.round(waccFraction * 10000) / 100, // %
    equityWeight: Math.round(eWeight * 10000) / 100,
    debtWeight: Math.round(dWeight * 10000) / 100,
    afterTaxCostOfDebt: Math.round(afterTaxKd * 10000) / 100,
  };
}

export interface DCFInput {
  baseFCF: number; // FCF0 in billion VND
  forecastYears: number; // e.g. 5
  growthRate: number; // g in %
  wacc: number; // discount rate in %
  perpetualGrowthRate: number; // terminal g in %
  cashAndEquivalents: number; // Cash in billion VND
  totalDebt: number; // Debt in billion VND
  sharesOutstanding: number; // Million shares
  currentMarketPrice: number; // VND per share
}

export interface DCFResult {
  yearlyFCF: Array<{ year: number; fcf: number; pv: number }>;
  sumPvFCF: number;
  terminalValue: number;
  pvTerminalValue: number;
  enterpriseValue: number;
  equityValue: number;
  intrinsicValuePerShare: number; // VND
  upsidePercentage: number; // %
  recommendation: "UNDERVALUED" | "FAIR" | "OVERVALUED";
}

export function calculateDCF(input: DCFInput): DCFResult {
  const r = input.wacc / 100;
  const g = input.growthRate / 100;
  const gTerm = input.perpetualGrowthRate / 100;

  const yearlyFCF: Array<{ year: number; fcf: number; pv: number }> = [];
  let sumPvFCF = 0;
  let currentFCF = input.baseFCF;

  for (let y = 1; y <= input.forecastYears; y++) {
    currentFCF = currentFCF * (1 + g);
    const pv = currentFCF / Math.pow(1 + r, y);
    yearlyFCF.push({ year: y, fcf: Math.round(currentFCF * 100) / 100, pv: Math.round(pv * 100) / 100 });
    sumPvFCF += pv;
  }

  // Terminal Value = FCF_N * (1 + gTerm) / (r - gTerm)
  const lastFCF = yearlyFCF[yearlyFCF.length - 1]?.fcf || input.baseFCF;
  const terminalValue = r > gTerm ? (lastFCF * (1 + gTerm)) / (r - gTerm) : 0;
  const pvTerminalValue = terminalValue / Math.pow(1 + r, input.forecastYears);

  const enterpriseValue = sumPvFCF + pvTerminalValue;
  const equityValue = enterpriseValue + input.cashAndEquivalents - input.totalDebt;

  // Intrinsic Value per share = Equity Value (billion VND) * 1e9 / (shares (million) * 1e6)
  // = (Equity Value * 1000) / shares (million)
  const intrinsicValuePerShare = input.sharesOutstanding > 0
    ? Math.round((equityValue * 1000) / input.sharesOutstanding)
    : 0;

  const upsidePercentage = input.currentMarketPrice > 0
    ? Math.round(((intrinsicValuePerShare - input.currentMarketPrice) / input.currentMarketPrice) * 1000) / 10
    : 0;

  let recommendation: "UNDERVALUED" | "FAIR" | "OVERVALUED" = "FAIR";
  if (upsidePercentage >= 15) recommendation = "UNDERVALUED";
  else if (upsidePercentage <= -15) recommendation = "OVERVALUED";

  return {
    yearlyFCF,
    sumPvFCF: Math.round(sumPvFCF * 100) / 100,
    terminalValue: Math.round(terminalValue * 100) / 100,
    pvTerminalValue: Math.round(pvTerminalValue * 100) / 100,
    enterpriseValue: Math.round(enterpriseValue * 100) / 100,
    equityValue: Math.round(equityValue * 100) / 100,
    intrinsicValuePerShare,
    upsidePercentage,
    recommendation,
  };
}
