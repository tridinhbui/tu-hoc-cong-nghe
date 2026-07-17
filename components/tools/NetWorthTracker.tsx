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

const ASSET_FIELDS = [
  "Tiền mặt/tiết kiệm",
  "Đầu tư (cổ phiếu/quỹ)",
  "Bất động sản",
  "Xe cộ",
  "Khác",
] as const;

const LIABILITY_FIELDS = [
  "Vay ngân hàng",
  "Nợ thẻ tín dụng",
  "Trả góp",
  "Vay người thân",
  "Khác",
] as const;

type AssetField = (typeof ASSET_FIELDS)[number];
type LiabilityField = (typeof LIABILITY_FIELDS)[number];

function emptyBreakdown(fields: readonly string[]): Record<string, string> {
  return Object.fromEntries(fields.map((f) => [f, ""]));
}

function toNumberMap(values: Record<string, string>): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [key, raw] of Object.entries(values)) {
    const num = Number(raw);
    result[key] = Number.isFinite(num) ? num : 0;
  }
  return result;
}

function sumValues(values: Record<string, string>): number {
  return Object.values(values).reduce((sum, raw) => {
    const num = Number(raw);
    return sum + (Number.isFinite(num) ? num : 0);
  }, 0);
}

function formatVND(value: number): string {
  return `${Math.round(value).toLocaleString("vi-VN")} ₫`;
}

function formatVNDCompact(value: number): string {
  return value.toLocaleString("vi-VN");
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100";

export default function NetWorthTracker({ userId }: { userId: string }) {
  const [history, setHistory] = useState<NetWorthSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [assets, setAssets] = useState<Record<string, string>>(emptyBreakdown(ASSET_FIELDS));
  const [liabilities, setLiabilities] = useState<Record<string, string>>(
    emptyBreakdown(LIABILITY_FIELDS)
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
            for (const field of ASSET_FIELDS) {
              const value = latest.assetsBreakdown[field];
              if (value !== undefined) next[field] = String(value);
            }
            return next;
          });
          setLiabilities((prev) => {
            const next = { ...prev };
            for (const field of LIABILITY_FIELDS) {
              const value = latest.liabilitiesBreakdown[field];
              if (value !== undefined) next[field] = String(value);
            }
            return next;
          });
        }
      } catch (err) {
        console.error("Error loading net worth history:", err);
        if (!cancelled) setError("Không thể tải lịch sử tài sản ròng.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

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
        date: new Date(snapshot.createdAt).toLocaleDateString("vi-VN"),
        netWorth: snapshot.netWorth,
      })),
    [history]
  );

  async function handleSave() {
    if (savingRef.current) return;
    if (totalAssets === 0 && totalLiabilities === 0) {
      setError("Nhập ít nhất một khoản tài sản hoặc nợ trước khi lưu.");
      return;
    }
    savingRef.current = true;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await saveNetWorthSnapshot(userId, toNumberMap(assets), toNumberMap(liabilities));
      const data = await getNetWorthHistory(userId);
      setHistory(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving net worth snapshot:", err);
      setError("Không thể lưu snapshot. Vui lòng thử lại.");
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-8 flex items-center justify-center gap-3 text-stone-500 dark:text-stone-400">
        <Loader2 className="h-5 w-5 animate-spin" />
        Đang tải dữ liệu tài sản ròng...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {chartData.length > 0 && (
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-5">
          <h3 className="text-lg font-black text-stone-950 dark:text-stone-50 mb-4">
            Xu hướng tài sản ròng theo thời gian
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
                  formatter={(value) => [formatVND(Number(value)), "Tài sản ròng"]}
                  labelFormatter={(label) => `Ngày ${label}`}
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
          <h3 className="text-lg font-black text-stone-950 dark:text-stone-50 mb-4">Tài sản</h3>
          <div className="space-y-4">
            {ASSET_FIELDS.map((field: AssetField) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  {field}
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
          <h3 className="text-lg font-black text-stone-950 dark:text-stone-50 mb-4">Nợ</h3>
          <div className="space-y-4">
            {LIABILITY_FIELDS.map((field: LiabilityField) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  {field}
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
              Tổng tài sản
            </p>
            <p className="mt-2 text-2xl font-black text-stone-950 dark:text-stone-50">
              {formatVND(totalAssets)}
            </p>
          </div>
          <div className="rounded-xl bg-stone-50 dark:bg-stone-800/50 p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
              Tổng nợ
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
              Tài sản ròng
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
            Tài sản ròng đang âm - đây là điểm bắt đầu, không phải điều đáng lo, hãy theo dõi xu hướng.
          </p>
        )}

        {communityStats && (
          <div className="mt-4 rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/20 p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-400 flex items-center gap-1.5 mb-2">
              <Users className="h-3.5 w-3.5" />
              So với cộng đồng
            </p>
            <p className="text-sm text-stone-700 dark:text-stone-300">
              {communityStats.percentile !== null ? (
                <>
                  Tài sản ròng của bạn cao hơn <strong className="text-sky-700 dark:text-sky-400">{communityStats.percentile}%</strong> người dùng đã ghi nhận trên nền tảng.
                </>
              ) : (
                "Chưa đủ dữ liệu để xếp hạng."
              )}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Trung bình cộng đồng: {formatVND(communityStats.averageNetWorth)} · dựa trên {communityStats.sampleSize} người dùng đã lưu snapshot
            </p>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-rose-700 dark:text-rose-400">{error}</p>}
        {saved && (
          <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-400">
            Đã lưu snapshot thành công.
          </p>
        )}

        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving || (totalAssets === 0 && totalLiabilities === 0)}
          className="mt-5 inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold rounded-xl px-6 py-3 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Đang lưu..." : "Lưu snapshot"}
        </button>
      </div>
    </div>
  );
}
