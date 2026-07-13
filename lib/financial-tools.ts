import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";

// "Table not found in schema cache" (PostgREST) or "relation does not exist"
// (raw Postgres) - these tools are non-critical, so a missing table (not yet
// migrated) should degrade to "no data yet" instead of crashing the page.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
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

export async function saveNetWorthSnapshot(
  userId: string,
  assetsBreakdown: Record<string, number>,
  liabilitiesBreakdown: Record<string, number>
): Promise<void> {
  const supabase = createClient();
  const totalAssets = Object.values(assetsBreakdown).reduce((sum, v) => sum + (v || 0), 0);
  const totalLiabilities = Object.values(liabilitiesBreakdown).reduce((sum, v) => sum + (v || 0), 0);

  const { error } = await supabase.from("net_worth_snapshots").insert({
    user_id: userId,
    total_assets: totalAssets,
    total_liabilities: totalLiabilities,
    assets_breakdown: assetsBreakdown,
    liabilities_breakdown: liabilitiesBreakdown,
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
    monthly_income: plan.monthlyIncome,
    needs_amount: plan.needsAmount,
    wants_amount: plan.wantsAmount,
    savings_amount: plan.savingsAmount,
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
    monthly_expenses: fund.monthlyExpenses,
    target_months: fund.targetMonths,
    current_saved: fund.currentSaved,
    updated_at: new Date().toISOString(),
  });

  if (error && !isMissingTableError(error)) throw handleSupabaseError(error);
}
