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
      toast.success(`Đã đổi vai trò của ${user.full_name ?? user.email} thành ${role}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  }

  async function confirmToggleDisabled() {
    if (!toToggle) return;
    const nextDisabled = !toToggle.is_disabled;
    try {
      await setUserDisabledAction(toToggle.id, nextDisabled);
      toast.success(nextDisabled ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản");
      setToToggle(null);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  }

  async function handleResyncAll() {
    setResyncing(true);
    try {
      const affected = await resyncAllUserStatsAction();
      toast.success(
        affected > 0
          ? `Đã đồng bộ lại XP cho ${affected} tài khoản bị lệch.`
          : "Kiểm tra xong - không có tài khoản nào bị lệch XP."
      );
      setConfirmResync(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
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
            placeholder="Tìm theo tên hoặc email..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500"
          />
        </form>
        <button
          onClick={() => setConfirmResync(true)}
          title="Tính lại lessons_completed/XP/level cho mọi tài khoản từ dữ liệu thật (bài học + quiz + game), sửa ngay các tài khoản bị lệch do lỗi mạng trước đây thay vì chờ họ đăng nhập lại"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 transition-colors flex-shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Đồng bộ lại XP toàn bộ
        </button>
      </div>

      {isPending && <div className="px-4 py-2 text-xs text-stone-400">Đang tải...</div>}

      {result.users.length === 0 ? (
        <EmptyState icon={UsersIcon} title="Không tìm thấy người dùng nào" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-left text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                <th className="px-4 py-3">Người dùng</th>
                <th className="px-4 py-3">Vai trò</th>
                <th className="px-4 py-3">Ngày tham gia</th>
                <th className="px-4 py-3">Đăng nhập gần nhất</th>
                <th className="px-4 py-3">Bài hoàn thành</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {result.users.map((u) => (
                <tr key={u.id} className={u.is_disabled ? "opacity-60" : ""}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-stone-900 dark:text-stone-100">{u.full_name ?? "Chưa đặt tên"}</p>
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
                    {new Date(u.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-400">
                    {u.last_login_at ? new Date(u.last_login_at).toLocaleDateString("vi-VN") : "- "}
                  </td>
                  <td className="px-4 py-3 text-stone-900 dark:text-stone-100 font-semibold">
                    {u.lessons_completed}
                  </td>
                  <td className="px-4 py-3">
                    {u.is_disabled ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                        <Ban className="w-3.5 h-3.5" /> Đã khóa
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Hoạt động
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setToToggle(u)}
                      disabled={u.id === currentAdminId}
                      className="text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {u.is_disabled ? "Mở khóa" : "Khóa"}
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
        Bạn không thể tự đổi vai trò hoặc khóa tài khoản của chính mình.
      </div>

      <Pagination page={result.page} totalPages={result.totalPages} onChange={(p) => updateParams({ page: String(p) })} />

      <ConfirmDialog
        open={!!toToggle}
        title={toToggle?.is_disabled ? "Mở khóa tài khoản" : "Khóa tài khoản"}
        message={`Bạn có chắc muốn ${toToggle?.is_disabled ? "mở khóa" : "khóa"} tài khoản "${toToggle?.email}"? ${
          !toToggle?.is_disabled ? "Người dùng sẽ không thể đăng nhập được nữa." : ""
        }`}
        confirmLabel={toToggle?.is_disabled ? "Mở khóa" : "Khóa"}
        danger={!toToggle?.is_disabled}
        onConfirm={confirmToggleDisabled}
        onCancel={() => setToToggle(null)}
      />

      <ConfirmDialog
        open={confirmResync}
        title="Đồng bộ lại XP toàn bộ"
        message="Tính lại số bài hoàn thành, tổng XP và level cho MỌI tài khoản dựa trên dữ liệu thật (bài học đã hoàn thành + phiên kiểm tra + phiên mini-game). Chỉ những tài khoản đang bị lệch mới thay đổi giá trị - việc này không thể hoàn tác nhưng an toàn để chạy nhiều lần."
        confirmLabel="Đồng bộ ngay"
        danger={false}
        loading={resyncing}
        onConfirm={handleResyncAll}
        onCancel={() => setConfirmResync(false)}
      />
    </div>
  );
}
