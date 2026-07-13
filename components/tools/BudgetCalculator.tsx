"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getBudgetPlan, saveBudgetPlan } from "@/lib/financial-tools";

function formatVnd(value: number): string {
  return Math.round(value || 0).toLocaleString("vi-VN");
}

interface BudgetCalculatorProps {
  userId: string;
}

// 50/30/20 budgeting tool: user enters monthly income, we suggest the
// 50/30/20 split, then they can override with their real numbers to compare
// against the suggestion before saving.
export default function BudgetCalculator({ userId }: BudgetCalculatorProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [needsAmount, setNeedsAmount] = useState<string>("");
  const [wantsAmount, setWantsAmount] = useState<string>("");
  const [savingsAmount, setSavingsAmount] = useState<string>("");
  const [touched, setTouched] = useState(false);
  // Guards against a double-click firing two saves before the `saving`
  // state's re-render lands - `disabled={saving}` alone has a gap between
  // click and re-render that a fast double-click can slip through.
  const savingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const plan = await getBudgetPlan(userId);
        if (!cancelled && plan) {
          setMonthlyIncome(String(plan.monthlyIncome));
          setNeedsAmount(String(plan.needsAmount));
          setWantsAmount(String(plan.wantsAmount));
          setSavingsAmount(String(plan.savingsAmount));
          setTouched(true);
        }
      } catch {
        if (!cancelled) toast.error("Không thể tải ngân sách đã lưu.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const income = Number(monthlyIncome) || 0;
  const suggestedNeeds = income * 0.5;
  const suggestedWants = income * 0.3;
  const suggestedSavings = income * 0.2;

  // Once the user has an income, default the actual-amount inputs to the
  // suggestion so the comparison inputs aren't empty/zero by default.
  const handleIncomeChange = (value: string) => {
    setMonthlyIncome(value);
    if (!touched) {
      const num = Number(value) || 0;
      setNeedsAmount(String(Math.round(num * 0.5)));
      setWantsAmount(String(Math.round(num * 0.3)));
      setSavingsAmount(String(Math.round(num * 0.2)));
    }
  };

  const actualNeeds = Number(needsAmount) || 0;
  const actualWants = Number(wantsAmount) || 0;
  const actualSavings = Number(savingsAmount) || 0;

  const needsPct = income > 0 ? (actualNeeds / income) * 100 : 0;
  const wantsPct = income > 0 ? (actualWants / income) * 100 : 0;
  const savingsPct = income > 0 ? (actualSavings / income) * 100 : 0;

  const needsWarning = income > 0 && needsPct > 60;
  const wantsWarning = income > 0 && wantsPct > 40;
  const savingsWarning = income > 0 && savingsPct < 10;
  const totalPct = needsPct + wantsPct + savingsPct;
  const overBudgetWarning = income > 0 && totalPct > 100;

  const handleSave = async () => {
    if (income <= 0) {
      toast.error("Vui lòng nhập thu nhập hàng tháng.");
      return;
    }
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    try {
      await saveBudgetPlan(userId, {
        monthlyIncome: income,
        needsAmount: actualNeeds,
        wantsAmount: actualWants,
        savingsAmount: actualSavings,
      });
      toast.success("Đã lưu ngân sách");
    } catch {
      toast.error("Không thể lưu ngân sách. Vui lòng thử lại.");
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5">
        <label className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
          Thu nhập hàng tháng (VNĐ)
        </label>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={monthlyIncome}
          onChange={(e) => handleIncomeChange(e.target.value)}
          placeholder="VD: 15000000"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100"
        />
      </div>

      {income > 0 && (
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-4">
          <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
            Gợi ý theo quy tắc 50/30/20
          </p>

          <BudgetBar
            label="Nhu cầu thiết yếu (50%)"
            amount={suggestedNeeds}
            percent={50}
            colorClass="bg-stone-500"
          />
          <BudgetBar
            label="Mong muốn (30%)"
            amount={suggestedWants}
            percent={30}
            colorClass="bg-stone-400"
          />
          <BudgetBar
            label="Tiết kiệm / đầu tư (20%)"
            amount={suggestedSavings}
            percent={20}
            colorClass="bg-emerald-500"
          />
        </div>
      )}

      {income > 0 && (
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-4">
          <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
            Con số thực tế của bạn
          </p>

          <div>
            <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1.5">
              Nhu cầu thiết yếu
            </label>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={needsAmount}
              onChange={(e) => {
                setTouched(true);
                setNeedsAmount(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100"
            />
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {formatVnd(actualNeeds)} đ ({needsPct.toFixed(0)}% thu nhập)
            </p>
            {needsWarning && (
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1">
                Đang cao hơn nhiều so với khung gợi ý (50%). Cân nhắc rà soát lại chi tiêu thiết yếu.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1.5">
              Mong muốn
            </label>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={wantsAmount}
              onChange={(e) => {
                setTouched(true);
                setWantsAmount(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100"
            />
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {formatVnd(actualWants)} đ ({wantsPct.toFixed(0)}% thu nhập)
            </p>
            {wantsWarning && (
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1">
                Đang cao hơn nhiều so với khung gợi ý (30%).
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1.5">
              Tiết kiệm / đầu tư
            </label>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={savingsAmount}
              onChange={(e) => {
                setTouched(true);
                setSavingsAmount(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100"
            />
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {formatVnd(actualSavings)} đ ({savingsPct.toFixed(0)}% thu nhập)
            </p>
            {savingsWarning && (
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1">
                Đang thấp hơn khung gợi ý (20%). Thử tăng phần tiết kiệm nếu có thể.
              </p>
            )}
          </div>

          {overBudgetWarning && (
            <div className="rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 p-3">
              <p className="text-xs font-bold text-rose-700 dark:text-rose-400">
                Tổng 3 khoản đang chiếm {totalPct.toFixed(0)}% thu nhập - vượt quá 100%. Kiểm tra lại số liệu, có thể bạn đang chi nhiều hơn số tiền thực nhận.
              </p>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving || income <= 0}
        className="w-full py-3 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {saving ? "Đang lưu..." : "Lưu ngân sách"}
      </button>
    </div>
  );
}

function BudgetBar({
  label,
  amount,
  percent,
  colorClass,
}: {
  label: string;
  amount: number;
  percent: number;
  colorClass: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="font-semibold text-stone-700 dark:text-stone-300">{label}</span>
        <span className="font-bold text-stone-900 dark:text-stone-100">{formatVnd(amount)} đ</span>
      </div>
      <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} rounded-full`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
