"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

interface UserMenuProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export default function UserMenu({ name, email, avatarUrl }: UserMenuProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const displayName = name || email || "Người dùng";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full overflow-hidden bg-stone-200 hover:bg-stone-300 transition-colors flex items-center justify-center text-xs font-extrabold text-stone-700 border border-stone-300"
      >
        {avatarUrl ? (
          <Image src={avatarUrl} alt={displayName} width={36} height={36} className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-stone-200 rounded-xl shadow-lg z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-stone-200">
            <p className="text-sm font-bold text-stone-900">{displayName}</p>
            <p className="text-xs text-stone-500 mt-0.5 truncate">{email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
            >
              Hồ sơ
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm font-semibold text-stone-900 hover:bg-stone-50 transition-colors"
            >
              Cài đặt
            </Link>
          </div>

          {/* Logout */}
          <div className="px-4 py-2 border-t border-stone-200">
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-2 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
