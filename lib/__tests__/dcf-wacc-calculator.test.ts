import { describe, it, expect } from "vitest";
import { calculateWACC, calculateDCF } from "../dcf-wacc-calculator";

describe("Corporate Finance DCF & WACC Calculator", () => {
  it("correctly calculates WACC with tax shield on debt", () => {
    const res = calculateWACC({
      equityValue: 6000, // E = 60%
      debtValue: 4000, // D = 40%
      costOfEquity: 12.5, // Ke = 12.5%
      costOfDebt: 8.0, // Kd = 8%
      taxRate: 20.0, // Tax = 20% -> After-tax Kd = 6.4%
    });

    // Expected WACC = 0.6 * 12.5% + 0.4 * 6.4% = 7.5% + 2.56% = 10.06%
    expect(res.equityWeight).toBe(60);
    expect(res.debtWeight).toBe(40);
    expect(res.afterTaxCostOfDebt).toBe(6.4);
    expect(res.wacc).toBe(10.06);
  });

  it("correctly calculates DCF Valuation and stock intrinsic price", () => {
    const res = calculateDCF({
      baseFCF: 500, // 500 billion VND
      forecastYears: 5,
      growthRate: 10, // 10%
      wacc: 10, // 10% discount rate
      perpetualGrowthRate: 2.5, // 2.5% terminal growth
      cashAndEquivalents: 300,
      totalDebt: 200,
      sharesOutstanding: 100, // 100 million shares
      currentMarketPrice: 65000, // Market price 65,000 VND
    });

    expect(res.yearlyFCF.length).toBe(5);
    expect(res.enterpriseValue).toBeGreaterThan(0);
    expect(res.intrinsicValuePerShare).toBeGreaterThan(0);
    expect(res.recommendation).toBeDefined();
  });
});
