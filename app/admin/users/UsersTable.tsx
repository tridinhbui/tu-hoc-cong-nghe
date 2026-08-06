"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Search, Users as UsersIcon, ShieldCheck, Ban, CheckCircle2, RefreshCw } from "lucide-react";
import type { AdminUserRow, UsersResult } from "@/lib/admin/users";
import { updateUserRoleAction, setUserDisabledAction, resyncAllUserStatsAction } from "./actions";
import EmptyState from "@/components/admin/EmptyState";
import Pagination from "@/components/admin/Pagination";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";

export default function UsersTable({
  result,
  initialSearch,
  currentAdminId,
}: {
  result: UsersResult;
  initialSearch: string;
  currentAdminId: string;
}) {
  const router = useRouter();
  const { t, locale } = useI18n();
  const tu = t.adminThree.usersTable;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);
  const [toToggle, setToToggle] = useState<AdminUserRow | null>(null);
  const [confirmResync, setConfirmResync] = useState(false);
  const [resyncing, setResyncing] = useState(false);

  function updateParams(patch: Record<string, string>) {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    startTransition(() => router.push(`${pathname}?${next.toString()}`));
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ q: search, page: "1" });
  }

  async function handleRoleChange(user: AdminUserRow, role: "user" | "admin") {
    try {
      await updateUserRoleAction(user.id, role);
      toast.success(format(tu.roleChanged, { name: user.full_name ?? user.email, role }));
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : tu.genericError);
    }
  }

  async function confirmToggleDisabled() {
    if (!toToggle) return;
    const nextDisabled = !toToggle.is_disabled;
    try {
      await setUserDisabledAction(toToggle.id, nextDisabled);
      toast.success(nextDisabled ? tu.accountDisabled : tu.accountEnabled);
      setToToggle(null);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : tu.genericError);
    }
  }

  async function handleResyncAll() {
    setResyncing(true);
    try {
      const affected = await resyncAllUserStatsAction();
      toast.success(
        affected > 0
          ? format(tu.resyncedSome, { count: affected })
          : tu.resyncedNone
      );
      setConfirmResync(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : tu.genericError);
    } finally {
      setResyncing(false);
    }
  }

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative max-w-sm flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tu.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500"
          />
        </form>
        <button
          onClick={() => setConfirmResync(true)}
          title={tu.resyncTooltip}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 transition-colors flex-shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {tu.resyncButton}
        </button>
      </div>

      {isPending && <div className="px-4 py-2 text-xs text-stone-400">{tu.loading}</div>}

      {result.users.length === 0 ? (
        <EmptyState icon={UsersIcon} title={tu.emptyTitle} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-left text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                <th className="px-4 py-3">{tu.colUser}</th>
                <th className="px-4 py-3">{tu.colRole}</th>
                <th className="px-4 py-3">{tu.colJoined}</th>
                <th className="px-4 py-3">{tu.colLastLogin}</th>
                <th className="px-4 py-3">{tu.colLessonsCompleted}</th>
                <th className="px-4 py-3">{tu.colStatus}</th>
                <th className="px-4 py-3 text-right">{tu.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {result.users.map((u) => (
                <tr key={u.id} className={u.is_disabled ? "opacity-60" : ""}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-stone-900 dark:text-stone-100">{u.full_name ?? tu.unnamedUser}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      disabled={u.id === currentAdminId}
                      onChange={(e) => handleRoleChange(u, e.target.value as "user" | "admin")}
                      className="text-xs font-bold rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-2 py-1.5 disabled:opacity-50"
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-400">
                    {new Date(u.created_at).toLocaleDateString(intlLocale(locale))}
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-400">
                    {u.last_login_at ? new Date(u.last_login_at).toLocaleDateString(intlLocale(locale)) : tu.neverLoggedIn}
                  </td>
                  <td className="px-4 py-3 text-stone-900 dark:text-stone-100 font-semibold">
                    {u.lessons_completed}
                  </td>
                  <td className="px-4 py-3">
                    {u.is_disabled ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                        <Ban className="w-3.5 h-3.5" /> {tu.disabled}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {tu.active}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setToToggle(u)}
                      disabled={u.id === currentAdminId}
                      className="text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {u.is_disabled ? tu.unlock : tu.lock}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="px-4 py-3 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 text-xs text-stone-400">
        <ShieldCheck className="w-3.5 h-3.5" />
        {tu.selfActionHint}
      </div>

      <Pagination page={result.page} totalPages={result.totalPages} onChange={(p) => updateParams({ page: String(p) })} />

      <ConfirmDialog
        open={!!toToggle}
        title={toToggle?.is_disabled ? tu.enableTitle : tu.disableTitle}
        message={format(tu.toggleMessage, {
          action: toToggle?.is_disabled ? tu.toggleActionEnable : tu.toggleActionDisable,
          email: toToggle?.email ?? "",
          extra: !toToggle?.is_disabled ? tu.disableExtraWarning : "",
        })}
        confirmLabel={toToggle?.is_disabled ? tu.unlock : tu.lock}
        danger={!toToggle?.is_disabled}
        onConfirm={confirmToggleDisabled}
        onCancel={() => setToToggle(null)}
      />

      <ConfirmDialog
        open={confirmResync}
        title={tu.resyncAllTitle}
        message={tu.resyncAllMessage}
        confirmLabel={tu.resyncNow}
        danger={false}
        loading={resyncing}
        onConfirm={handleResyncAll}
        onCancel={() => setConfirmResync(false)}
      />
    </div>
  );
}
