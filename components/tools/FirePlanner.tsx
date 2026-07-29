"use client";

import { useState } from "react";
import { Sparkles, Info } from "lucide-react";

export default function FirePlanner() {
  const [currentAge, setCurrentAge] = useState<number>(25);
  const [targetAge, setTargetAge] = useState<number>(50);
  const [monthlyExpense, setMonthlyExpense] = useState<number>(15000000); // 15 Million VND
  const [safeWithdrawalRate, setSafeWithdrawalRate] = useState<number>(4); // 4% SWR
  const [inflationRate, setInflationRate] = useState<number>(4); // 4% inflation (typical in VN)
  const [investmentReturn, setInvestmentReturn] = useState<number>(9); // 9% return rate (stock/fund portfolio)

  const yearsToRetire = Math.max(1, targetAge - currentAge);

  // Math calculations
  // 1. Calculate future monthly expense (adjusted for inflation)
  const futureMonthlyExpense = monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetire);
  const futureAnnualExpense = futureMonthlyExpense * 12;

  // 2. Calculate FIRE target = Annual Expense / SWR
  const fireTarget = futureAnnualExpense / (safeWithdrawalRate / 100);

  // 3. Calculate monthly savings required to hit target
  // FV = PMT * [((1 + r)^n - 1) / r]
  // PMT = FV / [((1 + r)^n - 1) / r]
  // Monthly r_net = (investmentReturn - inflationRate) / 100 / 12
  // Or: keep it simple and standard: use nominal rate, then the target is in future VND
  const monthlyRate = (investmentReturn / 100) / 12;
  const totalMonths = yearsToRetire * 12;

  let monthlySavingsNeeded = 0;
  if (monthlyRate > 0) {
    monthlySavingsNeeded = fireTarget / ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  } else {
    monthlySavingsNeeded = fireTarget / totalMonths;
  }

  // Format currency
  const formatVND = (num: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Math.round(num));
  };

  // Timeline representation
  const timelineData = [];
  const midPoints = 5;
  for (let i = 0; i <= midPoints; i++) {
    const age = Math.round(currentAge + (yearsToRetire / midPoints) * i);
    const yearsElapsed = age - currentAge;
    const expense = monthlyExpense * Math.pow(1 + inflationRate / 100, yearsElapsed) * 12 / (safeWithdrawalRate / 100);
    timelineData.push({ age, expense });
  }

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-stone-900 dark:text-stone-100">Kế Hoạch Tự Do Tài Chính (FIRE)</h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">Xác định con số đích đến để nghỉ hưu sớm</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input variables */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Tuổi hiện tại
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-55 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Tuổi mục tiêu nghỉ hưu
              </label>
              <input
                type="number"
                value={targetAge}
                onChange={(e) => setTargetAge(Math.max(currentAge + 1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-55 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Chi tiêu hàng tháng hiện tại (VND)
            </label>
            <input
              type="number"
              value={monthlyExpense}
              onChange={(e) => setMonthlyExpense(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-55 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
            />
            <span className="text-[11px] text-stone-400 mt-1 block">
              {formatVND(monthlyExpense)} / tháng
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-stone-600 dark:text-stone-400 mb-1 leading-tight">
                Lãi suất đầu tư (%/năm)
              </label>
              <input
                type="number"
                step="0.5"
                value={investmentReturn}
                onChange={(e) => setInvestmentReturn(Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-55 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-600 dark:text-stone-400 mb-1 leading-tight">
                Tỷ lệ lạm phát (%/năm)
              </label>
              <input
                type="number"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-55 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-600 dark:text-stone-400 mb-1 leading-tight">
                Tỷ lệ rút an toàn (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={safeWithdrawalRate}
                onChange={(e) => setSafeWithdrawalRate(Math.max(0.1, Number(e.target.value)))}
                className="w-full px-2 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-55 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="bg-amber-500/[0.02] dark:bg-amber-500/[0.01] rounded-2xl p-5 border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 block uppercase">
                Chi tiêu tháng lúc nghỉ hưu (Đã bù lạm phát)
              </span>
              <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                {formatVND(futureMonthlyExpense)}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 block uppercase">
                Mục tiêu quỹ tài sản FIRE cần tích lũy
              </span>
              <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                {formatVND(fireTarget)}
              </span>
              <span className="text-[10px] text-stone-400 block">
                (Đủ để rút {safeWithdrawalRate}% chi tiêu trọn đời không lo hết tiền)
              </span>
            </div>
            <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/80 space-y-0.5">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 block uppercase">
                Số tiền cần đầu tư/tiết kiệm thêm mỗi tháng
              </span>
              <span className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                {formatVND(monthlySavingsNeeded)}
              </span>
              <span className="text-[10px] text-stone-400 block">
                (Tích lũy liên tục trong {yearsToRetire} năm tới với hiệu suất {investmentReturn}%/năm)
              </span>
            </div>
          </div>

          {/* Timeline visualization */}
          <div className="pt-2">
            <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider block mb-2 text-center">
              Lộ trình quỹ tài sản mục tiêu theo tuổi
            </span>
            <div className="relative flex justify-between items-center px-2">
              <div className="absolute left-0 right-0 h-0.5 bg-stone-200 dark:bg-stone-800 top-1/2 -translate-y-1/2 -z-10" />
              {timelineData.map((pt, idx) => (
                <div key={idx} className="flex flex-col items-center group relative cursor-help">
                  <div className="w-5 h-5 rounded-full border border-amber-300 bg-white dark:bg-stone-900 flex items-center justify-center text-[9px] font-black text-stone-800 dark:text-stone-200 group-hover:bg-amber-500 group-hover:text-white transition-all">
                    {pt.age}
                  </div>
                  <span className="text-[8px] text-stone-400 dark:text-stone-500 font-bold mt-1">
                    Tuổi
                  </span>
                  <title>{`Tại tuổi ${pt.age}: Quỹ mục tiêu tương đương ${formatVND(pt.expense)}`}</title>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/40 text-xs text-amber-800 dark:text-amber-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          <strong>Lưu ý quan trọng:</strong> Tỷ lệ lạm phát ở Việt Nam (trung bình 3-4% hàng năm) sẽ làm giảm sức mua của đồng tiền đáng kể. Do đó, con số FIRE được tính toán trên đã được phóng to để bù đắp lạm phát, đảm bảo mức sống lúc nghỉ hưu vẫn tương đương với chi tiêu {formatVND(monthlyExpense)} ở thời điểm hiện tại.
        </p>
      </div>
    </div>
  );
}
