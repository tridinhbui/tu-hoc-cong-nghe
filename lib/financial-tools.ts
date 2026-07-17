import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

// "Table not found in schema cache" (PostgREST) or "relation does not exist"
// (raw Postgres) - these tools are non-critical, so a missing table (not yet
// migrated) should degrade to "no data yet" instead of crashing the page.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

// Money inputs (net worth, budget, emergency fund) are plain <input
// type="number"> fields - `min` on the element only hints the UI, it
// doesn't stop someone from typing a leading "-" or a value so large it
// loses precision as a JS float. Clamp here so every save path (not just
// whichever component remembered to validate) writes a sane number; the DB
// CHECK constraints (20260714_financial_tools_constraints.sql) are the
// final backstop if this is ever bypassed.
const MAX_MONEY_VALUE = 1_000_000_000_000; // 1,000 tỷ VNĐ - generous ceiling, not a real financial limit
function clampMoney(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(0, value), MAX_MONEY_VALUE);
}

function clampBreakdown(values: Record<string, number>): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [key, value] of Object.entries(values)) {
    result[key] = clampMoney(value);
  }
  return result;
}

export interface NetWorthSnapshot {
  id: number;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  assetsBreakdown: Record<string, number>;
  liabilitiesBreakdown: Record<string, number>;
  createdAt: string;
}

export async function getNetWorthHistory(userId: string): Promise<NetWorthSnapshot[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("net_worth_snapshots")
    .select("id, total_assets, total_liabilities, net_worth, assets_breakdown, liabilities_breakdown, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw handleSupabaseError(error);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    totalAssets: Number(row.total_assets),
    totalLiabilities: Number(row.total_liabilities),
    netWorth: Number(row.net_worth),
    assetsBreakdown: (row.assets_breakdown as Record<string, number>) ?? {},
    liabilitiesBreakdown: (row.liabilities_breakdown as Record<string, number>) ?? {},
    createdAt: row.created_at,
  }));
}

export interface NetWorthCommunityStats {
  percentile: number | null;
  averageNetWorth: number;
  sampleSize: number;
}

// Computed server-side (see get_net_worth_percentile RPC) from everyone's
// latest snapshot - deliberately only an aggregate, never per-user rows.
export async function getNetWorthCommunityStats(netWorth: number): Promise<NetWorthCommunityStats | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_net_worth_percentile", { p_net_worth: netWorth });

  if (error) {
    if (isMissingTableError(error) || error.code === "42883") return null; // function not migrated yet
    throw handleSupabaseError(error);
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row || row.sample_size < 5) return null; // too few users to be a meaningful/anonymous comparison

  return {
    percentile: row.percentile === null ? null : Number(row.percentile),
    averageNetWorth: Number(row.average_net_worth),
    sampleSize: Number(row.sample_size),
  };
}

export async function saveNetWorthSnapshot(
  userId: string,
  assetsBreakdown: Record<string, number>,
  liabilitiesBreakdown: Record<string, number>
): Promise<void> {
  const supabase = createClient();
  const cleanAssets = clampBreakdown(assetsBreakdown);
  const cleanLiabilities = clampBreakdown(liabilitiesBreakdown);
  const totalAssets = Object.values(cleanAssets).reduce((sum, v) => sum + v, 0);
  const totalLiabilities = Object.values(cleanLiabilities).reduce((sum, v) => sum + v, 0);

  const { error } = await supabase.from("net_worth_snapshots").insert({
    user_id: userId,
    total_assets: totalAssets,
    total_liabilities: totalLiabilities,
    assets_breakdown: cleanAssets,
    liabilities_breakdown: cleanLiabilities,
  });

  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}

export interface BudgetPlan {
  monthlyIncome: number;
  needsAmount: number;
  wantsAmount: number;
  savingsAmount: number;
  updatedAt: string;
}

export async function getBudgetPlan(userId: string): Promise<BudgetPlan | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("budget_plans")
    .select("monthly_income, needs_amount, wants_amount, savings_amount, updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) return null;
    throw handleSupabaseError(error);
  }
  if (!data) return null;

  return {
    monthlyIncome: Number(data.monthly_income),
    needsAmount: Number(data.needs_amount),
    wantsAmount: Number(data.wants_amount),
    savingsAmount: Number(data.savings_amount),
    updatedAt: data.updated_at,
  };
}

export async function saveBudgetPlan(userId: string, plan: Omit<BudgetPlan, "updatedAt">): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("budget_plans").upsert({
    user_id: userId,
    monthly_income: clampMoney(plan.monthlyIncome),
    needs_amount: clampMoney(plan.needsAmount),
    wants_amount: clampMoney(plan.wantsAmount),
    savings_amount: clampMoney(plan.savingsAmount),
    updated_at: new Date().toISOString(),
  });

  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}

export interface EmergencyFund {
  monthlyExpenses: number;
  targetMonths: number;
  currentSaved: number;
  updatedAt: string;
}

export async function getEmergencyFund(userId: string): Promise<EmergencyFund | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("emergency_funds")
    .select("monthly_expenses, target_months, current_saved, updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) return null;
    throw handleSupabaseError(error);
  }
  if (!data) return null;

  return {
    monthlyExpenses: Number(data.monthly_expenses),
    targetMonths: Number(data.target_months),
    currentSaved: Number(data.current_saved),
    updatedAt: data.updated_at,
  };
}

export async function saveEmergencyFund(userId: string, fund: Omit<EmergencyFund, "updatedAt">): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("emergency_funds").upsert({
    user_id: userId,
    monthly_expenses: clampMoney(fund.monthlyExpenses),
    target_months: Math.min(Math.max(1, fund.targetMonths || 0), 60),
    current_saved: clampMoney(fund.currentSaved),
    updated_at: new Date().toISOString(),
  });

  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}
