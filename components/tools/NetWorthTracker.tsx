"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Loader2, Save, TrendingDown, TrendingUp, Wallet, Users } from "lucide-react";
import {
  getNetWorthHistory,
  saveNetWorthSnapshot,
  getNetWorthCommunityStats,
  type NetWorthSnapshot,
  type NetWorthCommunityStats,
} from "@/lib/financial-tools";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Storage keys are kept as the original Vietnamese strings on purpose: they
// are already persisted in `assets_breakdown` / `liabilities_breakdown` JSON
// for existing users, and swapping them for English ids would silently
// orphan every snapshot saved before this change (the old keys would no
// longer match, so saved amounts would render as blank). Only the on-screen
// label is translated, via a stable id that maps to both a Vietnamese
// storage key and a dictionary entry.
const ASSET_FIELD_IDS = ["cash", "investment", "realEstate", "vehicle", "other"] as const;
const LIABILITY_FIELD_IDS = ["bankLoan", "creditCard", "installment", "familyLoan", "other"] as const;

type AssetField = (typeof ASSET_FIELD_IDS)[number];
type LiabilityField = (typeof LIABILITY_FIELD_IDS)[number];

/* i18n-ignore-start: these are the KEYS inside each user's saved
   assets_breakdown / liabilities_breakdown JSON, not labels. Translating one
   renames the key and orphans every snapshot already stored - a net worth that
   silently reads zero. The displayed labels come from t.netWorth.* instead. */
const ASSET_STORAGE_KEYS: Record<AssetField, string> = {
  cash: "Tiền mặt/tiết kiệm",
  investment: "Đầu tư (cổ phiếu/quỹ)",
  realEstate: "Bất động sản",
  vehicle: "Xe cộ",
  other: "Khác",
};

const LIABILITY_STORAGE_KEYS: Record<LiabilityField, string> = {
  bankLoan: "Vay ngân hàng",
  creditCard: "Nợ thẻ tín dụng",
  installment: "Trả góp",
  familyLoan: "Vay người thân",
  other: "Khác",
};
/* i18n-ignore-end */

function assetFieldLabel(t: Dictionary, field: AssetField): string {
  const labels: Record<AssetField, string> = {
    cash: t.netWorth.assetCash,
    investment: t.netWorth.assetInvestment,
    realEstate: t.netWorth.assetRealEstate,
    vehicle: t.netWorth.assetVehicle,
    other: t.netWorth.assetOther,
  };
  return labels[field];
}

function liabilityFieldLabel(t: Dictionary, field: LiabilityField): string {
  const labels: Record<LiabilityField, string> = {
    bankLoan: t.netWorth.liabilityBankLoan,
    creditCard: t.netWorth.liabilityCreditCard,
    installment: t.netWorth.liabilityInstallment,
    familyLoan: t.netWorth.liabilityFamilyLoan,
    other: t.netWorth.liabilityOther,
  };
  return labels[field];
}

function emptyBreakdown(fields: readonly string[]): Record<string, string> {
  return Object.fromEntries(fields.map((f) => [f, ""]));
}

/** Converts the id-keyed UI state to the Vietnamese storage keys the backend expects. */
function toStorageNumberMap<F extends string>(
  values: Record<string, string>,
  storageKeys: Record<F, string>
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [id, raw] of Object.entries(values)) {
    const num = Number(raw);
    result[storageKeys[id as F]] = Number.isFinite(num) ? num : 0;
  }
  return result;
}

function sumValues(values: Record<string, string>): number {
  return Object.values(values).reduce((sum, raw) => {
    const num = Number(raw);
    return sum + (Number.isFinite(num) ? num : 0);
  }, 0);
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100";

export default function NetWorthTracker({ userId }: { userId: string }) {
  const { t, locale } = useI18n();
  const formatVND = (value: number): string =>
    `${Math.round(value).toLocaleString(intlLocale(locale))} ${t.netWorth.currencySuffix}`;
  const formatVNDCompact = (value: number): string => value.toLocaleString(intlLocale(locale));

  const [history, setHistory] = useState<NetWorthSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [assets, setAssets] = useState<Record<string, string>>(emptyBreakdown(ASSET_FIELD_IDS));
  const [liabilities, setLiabilities] = useState<Record<string, string>>(
    emptyBreakdown(LIABILITY_FIELD_IDS)
  );
  const [communityStats, setCommunityStats] = useState<NetWorthCommunityStats | null>(null);
  // Guards against a double-click/2-tab race inserting two snapshots before
  // the `saving` state's re-render lands (net_worth_snapshots is
  // insert-only, no upsert to naturally collapse duplicates).
  const savingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await getNetWorthHistory(userId);
        if (cancelled) return;
        setHistory(data);

        if (data.length > 0) {
          const latest = data[data.length - 1];
          setAssets((prev) => {
            const next = { ...prev };
            for (const field of ASSET_FIELD_IDS) {
              const value = latest.assetsBreakdown[ASSET_STORAGE_KEYS[field]];
              if (value !== undefined) next[field] = String(value);
            }
            return next;
          });
          setLiabilities((prev) => {
            const next = { ...prev };
            for (const field of LIABILITY_FIELD_IDS) {
              const value = latest.liabilitiesBreakdown[LIABILITY_STORAGE_KEYS[field]];
              if (value !== undefined) next[field] = String(value);
            }
            return next;
          });
        }
      } catch (err) {
        console.error("Error loading net worth history:", err);
        if (!cancelled) setError(t.netWorth.loadError);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [userId, t.netWorth.loadError]);

  useEffect(() => {
    if (history.length === 0) {
      setCommunityStats(null);
      return;
    }
    const latestNetWorth = history[history.length - 1].netWorth;
    getNetWorthCommunityStats(latestNetWorth)
      .then(setCommunityStats)
      .catch((err) => console.error("Error loading net worth community stats:", err));
  }, [history]);

  const totalAssets = useMemo(() => sumValues(assets), [assets]);
  const totalLiabilities = useMemo(() => sumValues(liabilities), [liabilities]);
  const netWorth = totalAssets - totalLiabilities;

  const chartData = useMemo(
    () =>
      history.map((snapshot) => ({
        date: new Date(snapshot.createdAt).toLocaleDateString(intlLocale(locale)),
        netWorth: snapshot.netWorth,
      })),
    [history, locale]
  );

  async function handleSave() {
    if (savingRef.current) return;
    if (totalAssets === 0 && totalLiabilities === 0) {
      setError(t.netWorth.saveEmptyError);
      return;
    }
    savingRef.current = true;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await saveNetWorthSnapshot(
        userId,
        toStorageNumberMap(assets, ASSET_STORAGE_KEYS),
        toStorageNumberMap(liabilities, LIABILITY_STORAGE_KEYS)
      );
      const data = await getNetWorthHistory(userId);
      setHistory(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving net worth snapshot:", err);
      setError(t.netWorth.saveError);
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-8 flex items-center justify-center gap-3 text-stone-500 dark:text-stone-400">
        <Loader2 className="h-5 w-5 animate-spin" />
        {t.netWorth.loading}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {chartData.length > 0 && (
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-5">
          <h3 className="text-lg font-black text-stone-950 dark:text-stone-50 mb-4">
            {t.netWorth.trendTitle}
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 12, bottom: 0 }}>
                <defs>
                  <linearGradient id="netWorthGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e7e5e4" strokeDasharray="4 4" opacity={0.7} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#78716c" }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#78716c" }}
                  tickFormatter={(value) => formatVNDCompact(Number(value))}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 18,
                    border: "1px solid rgba(214,211,209,0.8)",
                    background: "rgba(255,255,255,0.96)",
                    boxShadow: "0 20px 40px -24px rgba(28,25,23,0.35)",
                  }}
                  formatter={(value) => [formatVND(Number(value)), t.netWorth.tooltipNetWorth]}
                  labelFormatter={(label) => format(t.netWorth.tooltipDatePrefix, { date: String(label) })}
                />
                <Area
                  type="monotone"
                  dataKey="netWorth"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#netWorthGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-5">
          <h3 className="text-lg font-black text-stone-950 dark:text-stone-50 mb-4">{t.netWorth.assetsTitle}</h3>
          <div className="space-y-4">
            {ASSET_FIELD_IDS.map((field: AssetField) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  {assetFieldLabel(t, field)}
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="0"
                  className={inputClass}
                  value={assets[field]}
                  onChange={(e) => setAssets((prev) => ({ ...prev, [field]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-5">
          <h3 className="text-lg font-black text-stone-950 dark:text-stone-50 mb-4">{t.netWorth.liabilitiesTitle}</h3>
          <div className="space-y-4">
            {LIABILITY_FIELD_IDS.map((field: LiabilityField) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  {liabilityFieldLabel(t, field)}
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="0"
                  className={inputClass}
                  value={liabilities[field]}
                  onChange={(e) => setLiabilities((prev) => ({ ...prev, [field]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-stone-50 dark:bg-stone-800/50 p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
              {t.netWorth.totalAssets}
            </p>
            <p className="mt-2 text-2xl font-black text-stone-950 dark:text-stone-50">
              {formatVND(totalAssets)}
            </p>
          </div>
          <div className="rounded-xl bg-stone-50 dark:bg-stone-800/50 p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
              {t.netWorth.totalLiabilities}
            </p>
            <p className="mt-2 text-2xl font-black text-stone-950 dark:text-stone-50">
              {formatVND(totalLiabilities)}
            </p>
          </div>
          <div
            className={`rounded-xl p-4 border-2 ${
              netWorth < 0
                ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900"
                : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900"
            }`}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5" />
              {t.netWorth.netWorthLabel}
            </p>
            <p
              className={`mt-2 text-2xl font-black flex items-center gap-2 ${
                netWorth < 0
                  ? "text-rose-700 dark:text-rose-400"
                  : "text-emerald-700 dark:text-emerald-400"
              }`}
            >
              {netWorth < 0 ? (
                <TrendingDown className="h-5 w-5" />
              ) : (
                <TrendingUp className="h-5 w-5" />
              )}
              {formatVND(netWorth)}
            </p>
          </div>
        </div>

        {netWorth < 0 && (
          <p className="mt-4 text-sm text-rose-700 dark:text-rose-400">
            {t.netWorth.negativeNetWorthHint}
          </p>
        )}

        {communityStats && (
          <div className="mt-4 rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/20 p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-400 flex items-center gap-1.5 mb-2">
              <Users className="h-3.5 w-3.5" />
              {t.netWorth.communityCompareTitle}
            </p>
            <p className="text-sm text-stone-700 dark:text-stone-300">
              {communityStats.percentile !== null ? (
                <>
                  {t.netWorth.communityPercentilePart1}{" "}
                  <strong className="text-sky-700 dark:text-sky-400">{communityStats.percentile}</strong>
                  {t.netWorth.communityPercentilePart2}
                </>
              ) : (
                t.netWorth.communityNotEnoughData
              )}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {format(t.netWorth.communityAverage, {
                average: formatVND(communityStats.averageNetWorth),
                sampleSize: communityStats.sampleSize,
              })}
            </p>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-rose-700 dark:text-rose-400">{error}</p>}
        {saved && (
          <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-400">
            {t.netWorth.saveSuccess}
          </p>
        )}

        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving || (totalAssets === 0 && totalLiabilities === 0)}
          className="mt-5 inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold rounded-xl px-6 py-3 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? t.netWorth.savingButton : t.netWorth.saveButton}
        </button>
      </div>
    </div>
  );
}
