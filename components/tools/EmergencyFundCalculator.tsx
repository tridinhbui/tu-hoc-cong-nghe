"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getEmergencyFund, saveEmergencyFund } from "@/lib/financial-tools";

function formatVnd(value: number): string {
  return Math.round(value || 0).toLocaleString("vi-VN");
}

interface EmergencyFundCalculatorProps {
  userId: string;
}

// Emergency fund sizing tool: target = monthlyExpenses * targetMonths, shows
// how much is left to save and % progress toward that target.
export default function EmergencyFundCalculator({ userId }: EmergencyFundCalculatorProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [targetMonths, setTargetMonths] = useState<number>(6);
  const [currentSaved, setCurrentSaved] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fund = await getEmergencyFund(userId);
        if (!cancelled && fund) {
          setMonthlyExpenses(String(fund.monthlyExpenses));
          setTargetMonths(fund.targetMonths);
          setCurrentSaved(String(fund.currentSaved));
        }
      } catch {
        if (!cancelled) toast.error("Không thể tải quỹ khẩn cấp đã lưu.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const expenses = Number(monthlyExpenses) || 0;
  const saved = Number(currentSaved) || 0;
  const target = expenses * targetMonths;
  const remaining = target - saved;
  const progressPct = target > 0 ? Math.min(100, Math.max(0, (saved / target) * 100)) : 0;
  const isDone = target > 0 && saved >= target;

  const handleSave = async () => {
    if (expenses <= 0) {
      toast.error("Vui lòng nhập chi tiêu hàng tháng.");
      return;
    }
    setSaving(true);
    try {
      await saveEmergencyFund(userId, {
        monthlyExpenses: expenses,
        targetMonths,
        currentSaved: saved,
      });
      toast.success("Đã lưu quỹ khẩn cấp");
    } catch {
      toast.error("Không thể lưu. Vui lòng thử lại.");
    } finally {
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
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Quỹ khẩn cấp giúp bạn có tiền dự phòng khi mất việc hoặc ốm đau, thay vì phải vay nợ.
        </p>
      </div>

      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-4">
        <div>
          <label className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
            Chi tiêu hàng tháng (VNĐ)
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            placeholder="VD: 8000000"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Số tháng mục tiêu
            </label>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {targetMonths} tháng
            </span>
          </div>
          <input
            type="range"
            min={3}
            max={12}
            step={1}
            value={targetMonths}
            onChange={(e) => setTargetMonths(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-stone-400 dark:text-stone-500 mt-1">
            <span>3 tháng</span>
            <span>12 tháng</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
            Số tiền đã có (VNĐ)
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={currentSaved}
            onChange={(e) => setCurrentSaved(e.target.value)}
            placeholder="VD: 20000000"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100"
          />
        </div>
      </div>

      {expenses > 0 && (
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-stone-500 dark:text-stone-400">
              Mục tiêu quỹ khẩn cấp
            </span>
            <span className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {formatVnd(target)} đ
            </span>
          </div>

          <div>
            <div className="w-full h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${isDone ? "bg-emerald-500" : "bg-emerald-500/70"}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5">
              Đã đạt {progressPct.toFixed(0)}%
            </p>
          </div>

          {isDone ? (
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              Đã đủ (thậm chí vượt) mục tiêu quỹ khẩn cấp. Dư {formatVnd(-remaining)} đ.
            </p>
          ) : (
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              Còn thiếu {formatVnd(remaining)} đ để đạt mục tiêu.
            </p>
          )}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving || expenses <= 0}
        className="w-full py-3 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {saving ? "Đang lưu..." : "Lưu"}
      </button>
    </div>
  );
}
