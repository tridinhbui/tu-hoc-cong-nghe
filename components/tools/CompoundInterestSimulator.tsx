"use client";

import { useState } from "react";
import { TrendingUp, Info } from "lucide-react";

export default function CompoundInterestSimulator() {
  const [initialAmount, setInitialAmount] = useState<number>(10000000); // 10 Million VND
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000000); // 1 Million VND
  const [years, setYears] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(7); // 7%

  // Calculate compound interest
  // P = initialAmount
  // PMT = monthlyContribution
  // r = annual interest rate / 12
  // n = years * 12
  const r = (interestRate / 100) / 12;
  const n = years * 12;

  const totalPrincipal = initialAmount + (monthlyContribution * n);
  let futureValue = initialAmount * Math.pow(1 + r, n);

  if (r > 0) {
    futureValue += monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
  } else {
    futureValue += monthlyContribution * n;
  }

  const totalInterest = Math.max(0, futureValue - totalPrincipal);

  // Format currency
  const formatVND = (num: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Math.round(num));
  };

  // Generate data for visualization (yearly intervals)
  const yearlyData = [];
  for (let y = 1; y <= Math.min(years, 30); y++) {
    const months = y * 12;
    const principal = initialAmount + (monthlyContribution * months);
    let val = initialAmount * Math.pow(1 + r, months);
    if (r > 0) {
      val += monthlyContribution * ((Math.pow(1 + r, months) - 1) / r);
    } else {
      val += monthlyContribution * months;
    }
    yearlyData.push({
      year: y,
      principal,
      total: val,
      interest: Math.max(0, val - principal)
    });
  }

  // Chart configuration
  const maxTotal = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1].total : 1;
  const chartHeight = 180;
  const chartWidth = 400;
  const padding = 30;

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-stone-900 dark:text-stone-100">Giả lập Sức mạnh Lãi kép</h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">Trực quan hóa tài sản sinh sôi khi tích lũy đều đặn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input parameters */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Số tiền ban đầu (VND)
            </label>
            <input
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-55 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-stone-400 mt-1 block">
              {formatVND(initialAmount)}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Tích lũy thêm mỗi tháng (VND)
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-55 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-stone-400 mt-1 block">
              {formatVND(monthlyContribution)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Thời gian (Năm)
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={years}
                onChange={(e) => setYears(Math.min(50, Math.max(1, Number(e.target.value))))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-55 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Lãi suất (% / Năm)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="30"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.min(30, Math.max(0, Number(e.target.value))))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-55 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Calculation results & visualization */}
        <div className="bg-stone-50 dark:bg-stone-950 rounded-2xl p-5 border border-stone-100 dark:border-stone-800/80 flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 block uppercase">
                Tổng gốc đóng góp
              </span>
              <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                {formatVND(totalPrincipal)}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 block uppercase">
                Tiền lãi sinh ra
              </span>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                {formatVND(totalInterest)}
              </span>
            </div>
            <div className="col-span-2 pt-3 border-t border-stone-200/60 dark:border-stone-800/80 space-y-0.5">
              <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 block uppercase">
                Tổng giá trị dự kiến (FV)
              </span>
              <span className="text-xl font-black text-stone-900 dark:text-stone-100">
                {formatVND(futureValue)}
              </span>
            </div>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="w-full pt-4 flex flex-col items-center">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible"
            >
              {yearlyData.map((d, i) => {
                const barWidth = Math.max(2, (chartWidth - padding * 2) / yearlyData.length - 4);
                const x = padding + i * ((chartWidth - padding * 2) / yearlyData.length);
                const principalHeight = (d.principal / maxTotal) * (chartHeight - padding * 2);
                const interestHeight = (d.interest / maxTotal) * (chartHeight - padding * 2);
                const yPrincipal = chartHeight - padding - principalHeight;
                const yInterest = yPrincipal - interestHeight;

                return (
                  <g key={d.year} className="group cursor-pointer">
                    {/* Principal portion (stone) */}
                    <rect
                      x={x}
                      y={yPrincipal}
                      width={barWidth}
                      height={principalHeight}
                      className="fill-stone-300 dark:fill-stone-700 transition-colors group-hover:fill-stone-400 dark:group-hover:fill-stone-600"
                      rx="1"
                    />
                    {/* Interest portion (emerald) */}
                    <rect
                      x={x}
                      y={yInterest}
                      width={barWidth}
                      height={interestHeight}
                      className="fill-emerald-500 transition-colors group-hover:fill-emerald-600"
                      rx="1"
                    />
                    {/* Tooltip hint text on hover */}
                    <title>{`Năm ${d.year}: ${formatVND(d.total)} (Gốc: ${formatVND(d.principal)}, Lãi: ${formatVND(d.interest)})`}</title>
                  </g>
                );
              })}

              {/* Axis labels */}
              <text
                x={padding}
                y={chartHeight - 10}
                className="text-[9px] fill-stone-400 font-bold"
                textAnchor="start"
              >
                Năm 1
              </text>
              <text
                x={chartWidth - padding}
                y={chartHeight - 10}
                className="text-[9px] fill-stone-400 font-bold"
                textAnchor="end"
              >
                Năm {years}
              </text>
              {/* Horizontal baseline */}
              <line
                x1={padding}
                y1={chartHeight - padding}
                x2={chartWidth - padding}
                y2={chartHeight - padding}
                className="stroke-stone-200 dark:stroke-stone-800"
                strokeWidth="1.5"
              />
            </svg>

            <div className="flex gap-4 justify-center mt-3 text-[10px] font-bold">
              <span className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400">
                <span className="w-2.5 h-2.5 bg-stone-300 dark:bg-stone-700 rounded" /> Tiền gốc đóng góp
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded" /> Tiền lãi sinh ra
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/40 text-xs text-amber-800 dark:text-amber-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          <strong>Lời khuyên sư phạm:</strong> Càng bắt đầu tích lũy sớm, phần lãi sinh ra càng phình to vượt trội so với tiền gốc bạn tự đóng góp. Đây chính là nguyên lý của quả cầu tuyết tài chính được Warren Buffett ứng dụng suốt sự nghiệp.
        </p>
      </div>
    </div>
  );
}
