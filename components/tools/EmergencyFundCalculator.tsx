"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getEmergencyFund, saveEmergencyFund } from "@/lib/financial-tools";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";

interface EmergencyFundCalculatorProps {
  userId: string;
}

// Emergency fund sizing tool: target = monthlyExpenses * targetMonths, shows
// how much is left to save and % progress toward that target.
export default function EmergencyFundCalculator({ userId }: EmergencyFundCalculatorProps) {
  const { t, locale } = useI18n();
  const formatVnd = (value: number): string =>
    Math.round(value || 0).toLocaleString(intlLocale(locale));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [targetMonths, setTargetMonths] = useState<number>(6);
  const [currentSaved, setCurrentSaved] = useState<string>("");
  const savingRef = useRef(false);

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
        if (!cancelled) toast.error(t.emergencyFund.loadError);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, t.emergencyFund.loadError]);

  const expenses = Number(monthlyExpenses) || 0;
  const saved = Number(currentSaved) || 0;
  const target = expenses * targetMonths;
  const remaining = target - saved;
  const progressPct = target > 0 ? Math.min(100, Math.max(0, (saved / target) * 100)) : 0;
  const isDone = target > 0 && saved >= target;

  const handleSave = async () => {
    if (expenses <= 0) {
      toast.error(t.emergencyFund.expensesRequired);
      return;
    }
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    try {
      await saveEmergencyFund(userId, {
        monthlyExpenses: expenses,
        targetMonths,
        currentSaved: saved,
      });
      toast.success(t.emergencyFund.saveSuccess);
    } catch {
      toast.error(t.emergencyFund.saveError);
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
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {t.emergencyFund.intro}
        </p>
      </div>

      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-4">
        <div>
          <label className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
            {t.emergencyFund.monthlyExpensesLabel}
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            placeholder={t.emergencyFund.monthlyExpensesPlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-stone-900 dark:text-stone-100">
              {t.emergencyFund.targetMonthsLabel}
            </label>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {format(t.emergencyFund.monthsUnit, { months: targetMonths })}
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
            <span>{t.emergencyFund.monthsUnitMin}</span>
            <span>{t.emergencyFund.monthsUnitMax}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
            {t.emergencyFund.currentSavedLabel}
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={currentSaved}
            onChange={(e) => setCurrentSaved(e.target.value)}
            placeholder={t.emergencyFund.currentSavedPlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100"
          />
        </div>
      </div>

      {expenses > 0 && (
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-stone-500 dark:text-stone-400">
              {t.emergencyFund.targetTitle}
            </span>
            <span className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {format(t.emergencyFund.targetAmount, { amount: formatVnd(target) })}
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
              {format(t.emergencyFund.progressLabel, { pct: progressPct.toFixed(0) })}
            </p>
          </div>

          {isDone ? (
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {format(t.emergencyFund.doneMessage, { amount: formatVnd(-remaining) })}
            </p>
          ) : (
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              {format(t.emergencyFund.remainingMessage, { amount: formatVnd(remaining) })}
            </p>
          )}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving || expenses <= 0}
        className="w-full py-3 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {saving ? t.emergencyFund.savingButton : t.emergencyFund.saveButton}
      </button>
    </div>
  );
}
