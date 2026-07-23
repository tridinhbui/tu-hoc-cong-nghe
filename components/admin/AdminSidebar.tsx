"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  ShieldQuestion,
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  Settings,
  Menu,
  X,
  ArrowLeft,
  Gamepad2,
  Play,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { href: "/admin/messages", label: "Tin nhắn & Thông báo", icon: MessageSquare },
  { href: "/admin/appeals", label: "Khiếu nại & Báo lỗi AI", icon: ShieldQuestion },
  { href: "/admin/users", label: "Người dùng", icon: Users },
  { href: "/admin/lessons", label: "Bài học", icon: BookOpen },
  { href: "/admin/videos", label: "Video", icon: Play },
  { href: "/admin/games", label: "Trò chơi", icon: Gamepad2 },
  { href: "/admin/cfa-library", label: "Thư viện CFA", icon: GraduationCap },
  { href: "/admin/documents", label: "Tài liệu", icon: FileText },
  { href: "/admin/settings", label: "Cài đặt", icon: Settings },
];

export default function AdminSidebar({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Prefetch all admin routes in the background on mount for zero-latency tab switching
    NAV_ITEMS.forEach((item) => {
      router.prefetch(item.href);
    });
  }, [router]);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const NavLinks = (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={true}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              active
                ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-stone-900 dark:text-stone-100">Admin</span>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          aria-label="Mở menu"
        >
          <Menu className="w-5 h-5 text-stone-700 dark:text-stone-300" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-stone-900 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 dark:border-stone-800">
              <span className="font-bold text-stone-900 dark:text-stone-100">Admin</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5 text-stone-700 dark:text-stone-300" />
              </button>
            </div>
            {NavLinks}
            <SidebarFooter adminEmail={adminEmail} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex-col z-20">
        <div className="px-4 py-4 border-b border-stone-200 dark:border-stone-800">
          <span className="font-bold text-lg text-stone-900 dark:text-stone-100">Admin Panel</span>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Tự Học Tài Chính</p>
        </div>
        {NavLinks}
        <SidebarFooter adminEmail={adminEmail} />
      </aside>

      {/* Spacer for mobile top bar */}
      <div className="lg:hidden h-14" />
    </>
  );
}

function SidebarFooter({ adminEmail }: { adminEmail: string }) {
  return (
    <div className="px-3 py-4 border-t border-stone-200 dark:border-stone-800 space-y-1">
      <p className="px-3 text-xs text-stone-500 dark:text-stone-400 truncate mb-1">{adminEmail}</p>
      <Link
        href="/dashboard"
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại app
      </Link>
    </div>
  );
}
